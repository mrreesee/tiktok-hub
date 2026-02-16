const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { WebcastPushConnection } = require('tiktok-live-connector');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 8081;

// Global connection pool
const connections = {};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-room', (uniqueId) => {
        console.log(`Connecting to TikTok user: ${uniqueId}`);

        if (connections[uniqueId]) {
            connections[uniqueId].disconnect();
        }

        let tiktokConn = new WebcastPushConnection(uniqueId);

        tiktokConn.connect().then(state => {
            console.info(`Connected to room ${state.roomId}`);
            socket.emit('connected', { roomId: state.roomId });
        }).catch(err => {
            console.error('Failed to connect', err);
            socket.emit('error', 'Connection failed');
        });

        tiktokConn.on('chat', data => {
            socket.emit('chat', data);
        });

        tiktokConn.on('gift', data => {
            console.log(`[GIFT] ${data.giftName} received from ${data.nickname} (Repeat: ${data.repeatCount})`);

            try {
                // Ensure correct relative path from proxy/index.js to src/src/data/gift_data.json
                const giftDb = require('../src/src/data/gift_data.json');
                const giftExists = giftDb.find(g => g.name === data.giftName || g.id === data.giftId);

                if (!giftExists) {
                    console.warn(`[!] UNKNOWN GIFT: ${data.giftName} (ID: ${data.giftId})`);
                    data.isUnknown = true;
                    // If unknown, default to 1 diamond for safety
                    if (!data.diamondCount) data.diamondCount = 1;
                } else {
                    // Enrich data if needed
                    data.diamondCount = giftExists.coins || data.diamondCount;
                }
            } catch (err) {
                console.error('Error loading gift database:', err.message);
            }

            // Important: Send data to client
            socket.emit('gift', data);
        });

        tiktokConn.on('like', data => {
            socket.emit('like', data);
        });

        connections[uniqueId] = tiktokConn;
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`TikTok Proxy Server running on port ${PORT}`);
});
