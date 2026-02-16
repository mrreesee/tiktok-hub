import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface StreamSession {
    uniqueId: string;
    totalCoins: number;
    totalGifts: number;
    totalLikes: number;
    totalMessages: number;
    startTime: number;
    endTime: number | null;
    topGifter: { nickname: string; amount: number } | null;
}

interface TikTokContextType {
    messages: any[];
    gifts: any[];
    likes: number;
    isConnected: boolean;
    activeId: string | null;
    connect: (uniqueId: string) => void;
    disconnect: () => void;
    endStream: () => void;
    lastSession: StreamSession | null;
    pastSessions: StreamSession[];
    clearSession: () => void;
}

const TikTokContext = createContext<TikTokContextType | undefined>(undefined);

export const TikTokProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [gifts, setGifts] = useState<any[]>([]);
    const [likes, setLikes] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [lastSession, setLastSession] = useState<StreamSession | null>(null);
    const [pastSessions, setPastSessions] = useState<StreamSession[]>([]);
    const [startTime, setStartTime] = useState<number>(0);
    const socketRef = useRef<Socket | null>(null);

    // Persistence: Load history on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('hub_broadcast_history');
        if (savedHistory) {
            try {
                setPastSessions(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Save history whenever it changes
    useEffect(() => {
        localStorage.setItem('hub_broadcast_history', JSON.stringify(pastSessions));
    }, [pastSessions]);

    const connect = (uniqueId: string) => {
        if (socketRef.current) {
            socketRef.current.close();
        }

        setActiveId(uniqueId);
        setStartTime(Date.now());
        setMessages([]);
        setGifts([]);
        setLikes(0);
        setLastSession(null);

        const newSocket = io('http://localhost:8081');
        socketRef.current = newSocket;

        newSocket.on('connect', () => {
            newSocket.emit('join-room', uniqueId);
        });

        newSocket.on('connected', () => {
            setIsConnected(true);
        });

        newSocket.on('chat', (data) => {
            setMessages((prev) => [...prev.slice(-49), data]);
        });

        newSocket.on('gift', (data) => {
            setGifts((prev) => [...prev.slice(-49), data]);
        });

        newSocket.on('like', (data) => {
            if (data.totalLikeCount) {
                setLikes(data.totalLikeCount);
            } else {
                setLikes((prev) => prev + (data.likeCount || 1));
            }
        });

        newSocket.on('error', () => {
            setIsConnected(false);
        });
    };

    const endStream = () => {
        if (!isConnected) return;

        const totalCoins = gifts.reduce((acc, g) => acc + (g.diamondCount || 1) * (g.repeatCount || 1), 0);

        // Find top gifter
        const gifterMap: Record<string, number> = {};
        gifts.forEach(g => {
            gifterMap[g.nickname] = (gifterMap[g.nickname] || 0) + (g.diamondCount || 1) * (g.repeatCount || 1);
        });

        let topGifter = null;
        let max = 0;
        for (const [nickname, amount] of Object.entries(gifterMap)) {
            if (amount > max) {
                max = amount;
                topGifter = { nickname, amount };
            }
        }

        const newSession: StreamSession = {
            uniqueId: activeId || 'unknown',
            totalCoins,
            totalGifts: gifts.length,
            totalLikes: likes,
            totalMessages: messages.length,
            startTime,
            endTime: Date.now(),
            topGifter
        };

        setLastSession(newSession);
        setPastSessions(prev => [newSession, ...prev].slice(0, 50)); // Keep last 50
        disconnect();
    };

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        setIsConnected(false);
        setActiveId(null);
    };

    const clearSession = () => setLastSession(null);

    return (
        <TikTokContext.Provider value={{
            messages, gifts, likes, isConnected, activeId,
            connect, disconnect, endStream, lastSession, pastSessions, clearSession
        }}>
            {children}
        </TikTokContext.Provider>
    );
};

export const useTikTok = () => {
    const context = useContext(TikTokContext);
    if (context === undefined) {
        throw new Error('useTikTok must be used within a TikTokProvider');
    }
    return context;
};
