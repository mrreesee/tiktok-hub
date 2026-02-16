import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'streamer';

interface User {
    id: string;
    username: string;
    role: Role;
    nickname: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('hub_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Simulating login logic
        // Admin: admin / admin123
        // Streamer: streamer / login123
        if (username === 'admin' && password === 'admin123') {
            const adminUser: User = { id: '1', username: 'admin', role: 'admin', nickname: 'Başkan' };
            setUser(adminUser);
            localStorage.setItem('hub_user', JSON.stringify(adminUser));
            return true;
        } else if (username === 'streamer' && password === 'login123') {
            const streamerUser: User = { id: '2', username: 'streamer', role: 'streamer', nickname: 'Popüler Yayıncı' };
            setUser(streamerUser);
            localStorage.setItem('hub_user', JSON.stringify(streamerUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hub_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
