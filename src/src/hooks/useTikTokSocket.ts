import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useTikTokSocket = (uniqueId: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [gifts, setGifts] = useState<any[]>([]);
    const [likes, setLikes] = useState(0);
    const [roomInfo, setRoomInfo] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!uniqueId) return;

        const newSocket = io('http://localhost:8081');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Proxy connected');
            newSocket.emit('join-room', uniqueId);
        });

        newSocket.on('connected', (data) => {
            setIsConnected(true);
            setRoomInfo(data);
        });

        newSocket.on('chat', (data) => {
            setMessages((prev) => [...prev.slice(-49), data]);
        });

        newSocket.on('gift', (data) => {
            setGifts((prev) => [...prev.slice(-19), data]);
        });

        newSocket.on('like', (data) => {
            // like event usually contains totalLikeCount or similar
            if (data.totalLikeCount) {
                setLikes(data.totalLikeCount);
            } else {
                setLikes((prev) => prev + (data.likeCount || 1));
            }
        });

        newSocket.on('error', (err) => {
            console.error('Socket error:', err);
            setIsConnected(false);
        });

        return () => {
            newSocket.close();
        };
    }, [uniqueId]);

    return { messages, gifts, likes, roomInfo, isConnected };
};
