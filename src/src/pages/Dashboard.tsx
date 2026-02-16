import { useState, useEffect, useRef } from 'react';
import { useTikTok } from '../context/TikTokContext';
import { Coins, Heart, MessageCircle, Radio, ArrowRight, Activity, DollarSign, X, Trophy, TrendingUp, Users, Calendar, History } from 'lucide-react';

const Dashboard = () => {
    const [targetId, setTargetId] = useState('');
    const { messages, gifts, likes, isConnected, activeId, connect, endStream, lastSession, pastSessions, clearSession } = useTikTok();
    const [totalPoints, setTotalPoints] = useState(12450);
    const [liveCoins, setLiveCoins] = useState(0);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const giftEndRef = useRef<HTMLDivElement>(null);

    const USD_PER_COIN = 0.005;
    const TRY_RATE = 34.0;

    useEffect(() => {
        const sessionTotal = gifts.reduce((acc, g) => acc + (g.diamondCount || 1) * (g.repeatCount || 1), 0);
        setLiveCoins(sessionTotal);
    }, [gifts]);

    // Daily totals calculation
    const today = new Date().setHours(0, 0, 0, 0);
    const todaySessions = pastSessions.filter(s => s.startTime >= today);

    const dailyCoins = todaySessions.reduce((acc, s) => acc + s.totalCoins, 0);
    const dailyEarningsTRY = dailyCoins * USD_PER_COIN * TRY_RATE;
    const dailyLikes = todaySessions.reduce((acc, s) => acc + s.totalLikes, 0);

    const estimatedEarningsUSD = liveCoins * USD_PER_COIN;
    const estimatedEarningsTRY = estimatedEarningsUSD * TRY_RATE;

    const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom(chatEndRef);
    }, [messages]);

    useEffect(() => {
        scrollToBottom(giftEndRef);
    }, [gifts]);

    const handleConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (targetId.trim()) {
            connect(targetId.trim());
        }
    };

    const stats = [
        { label: 'Günlük Toplam', value: `₺${dailyEarningsTRY.toFixed(2)}`, icon: <Calendar className="text-secondary" />, trend: 'GÜNLÜK', detail: `${dailyCoins.toLocaleString()} Jeton` },
        { label: 'Tahmini Kazanç', value: `₺${estimatedEarningsTRY.toFixed(2)}`, icon: <DollarSign className="text-emerald-400" />, trend: 'BU YAYIN', detail: `$${estimatedEarningsUSD.toFixed(2)}` },
        { label: 'Anlık Jeton', value: liveCoins.toLocaleString(), icon: <Activity className="text-emerald-500" />, trend: 'CANLI', detail: 'Diamonds' },
        { label: 'Beğeni Sayısı', value: likes.toLocaleString(), icon: <Heart className="text-rose-500" />, trend: 'CANLI', detail: 'Yayın Boyu' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Yayıncı Paneli</h1>
                    <p className="text-slate-500 font-medium mt-1">Günü ve canlı yayını profesyonel metriklerle takip et.</p>
                </div>

                {!isConnected && (
                    <form onSubmit={handleConnect} className="flex gap-3 w-full xl:w-auto animate-in slide-in-from-right-4">
                        <div className="relative flex-1 xl:w-80">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50 font-black">@</span>
                            <input
                                type="text"
                                value={targetId}
                                onChange={(e) => setTargetId(e.target.value)}
                                placeholder="TikTok Kullanıcı Adı"
                                className="w-full pl-10 pr-5 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-600 shadow-2xl shadow-emerald-500/5"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
                        >
                            Sisteme Bağla <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                {isConnected && (
                    <button
                        onClick={endStream}
                        className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all active:scale-[0.98] animate-in slide-in-from-right-4"
                    >
                        Yayını Bitir <X size={20} />
                    </button>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="premium-card p-8 rounded-[2rem] flex flex-col gap-6 group hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform">
                            {stat.icon}
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                                {stat.icon}
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend === 'GÜNLÜK' ? 'text-amber-500' : 'text-emerald-500'}`}>{stat.trend}</span>
                                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-1">{stat.detail}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white mt-1 tracking-tighter tabular-nums text-glow group-hover:text-emerald-400 transition-colors">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chat & Gifts Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass p-10 rounded-[2.5rem] border border-slate-800/50 flex flex-col h-[500px] group">
                        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">
                            <MessageCircle size={24} className="text-emerald-500" />
                            Live Stream Chat
                        </h2>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-6 custom-scrollbar">
                            {!isConnected && messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-6 opacity-40">
                                    <MessageCircle size={64} strokeWidth={1} />
                                    <p className="font-black uppercase tracking-[0.3em] text-sm italic">Connect to start tracking</p>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, i) => (
                                        <div key={i} className="bg-slate-900/30 p-5 rounded-2xl border border-white/[0.02] animate-in slide-in-from-left-4 duration-500 hover:border-emerald-500/10 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{msg.nickname}</span>
                                                <div className="w-1 h-1 bg-slate-800 rounded-full" />
                                                <span className="text-[10px] text-slate-600 font-bold">{new Date().toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-slate-300 text-sm font-medium leading-relaxed">{msg.comment}</p>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Broadcast History Table */}
                    <div className="premium-card p-10 rounded-[2.5rem] border border-slate-800/50 group">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3 group-hover:text-amber-500 transition-colors">
                                <History size={24} className="text-amber-500" />
                                Geçmiş Yayınlar
                            </h2>
                            <span className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Son {pastSessions.length} Yayın
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-800/50">
                                        <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tarih</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">TikTok ID</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Jeton</th>
                                        <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Kazanç</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/30">
                                    {pastSessions.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-10 text-center text-slate-600 font-bold uppercase tracking-widest text-xs opacity-40">
                                                Henüz yayın kaydı bulunamadı
                                            </td>
                                        </tr>
                                    ) : (
                                        pastSessions.slice(0, 5).map((session, i) => (
                                            <tr key={i} className="group/row hover:bg-slate-900/30 transition-colors">
                                                <td className="py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-500 shadow-lg">
                                                            <Calendar size={18} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-white">{new Date(session.startTime).toLocaleDateString()}</span>
                                                            <span className="text-[10px] text-slate-600 font-bold uppercase">{new Date(session.startTime).toLocaleTimeString()}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5 font-black text-slate-400 text-xs">@{session.uniqueId}</td>
                                                <td className="py-5 text-right font-black text-white tabular-nums">{session.totalCoins.toLocaleString()}</td>
                                                <td className="py-5 text-right font-black text-emerald-500 tabular-nums">₺{(session.totalCoins * USD_PER_COIN * TRY_RATE).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="glass p-10 rounded-[2.5rem] border border-slate-800/50 flex flex-col h-[500px] group">
                    <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter group-hover:text-amber-500 transition-colors">
                        <Coins size={24} className="text-amber-500" />
                        Donations
                    </h2>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                        {!isConnected && gifts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-700 gap-6 opacity-40">
                                <Trophy size={64} strokeWidth={1} />
                                <p className="font-black uppercase tracking-[0.3em] text-sm italic">Waiting for connection</p>
                            </div>
                        ) : (
                            <>
                                {gifts.slice().reverse().map((gift, i) => (
                                    <div key={i} className="flex items-center gap-5 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 animate-in zoom-in-95 duration-500 hover:border-amber-500/20 transition-all">
                                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg text-2xl group-hover:scale-110 transition-transform">
                                            🎁
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-black text-white uppercase tracking-tighter text-sm truncate">{gift.nickname}</p>
                                            <p className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-widest mt-0.5 truncate">{gift.giftName} • {gift.diamondCount} Coins</p>
                                        </div>
                                        <div className="bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-xl font-black text-xs shadow-lg">
                                            x{gift.repeatCount}
                                        </div>
                                    </div>
                                ))}
                                <div ref={giftEndRef} />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Analysis Modal */}
            {lastSession && (
                <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="w-full max-w-2xl premium-card rounded-[3rem] border-emerald-500/20 p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-500">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                                <TrendingUp size={40} />
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Yayın Özeti</h2>
                            <p className="text-slate-400 mt-2 font-medium tracking-wide">Tebrikler! İşte bu yayındaki performansın:</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 flex flex-col gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Toplam Jeton</span>
                                <div className="flex items-center gap-2">
                                    <Coins size={20} className="text-amber-500" />
                                    <span className="text-2xl font-black text-white tracking-tighter">{lastSession.totalCoins.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 flex flex-col gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tahmini Kazanç</span>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={20} className="text-emerald-500" />
                                    <span className="text-2xl font-black text-white tracking-tighter">₺{(lastSession.totalCoins * USD_PER_COIN * TRY_RATE).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 flex flex-col gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Etkileşim</span>
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={20} className="text-primary" />
                                    <span className="text-2xl font-black text-white tracking-tighter">{(lastSession.totalMessages + (lastSession.totalLikes / 100)).toFixed(0)} Skor</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800/50 flex flex-col gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">En Büyük Destekçi</span>
                                <div className="flex items-center gap-2">
                                    <Users size={20} className="text-rose-500" />
                                    <span className="text-sm font-black text-white uppercase tracking-tight truncate">{lastSession.topGifter ? lastSession.topGifter.nickname : 'Henüz Yok'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2rem] text-center">
                            <p className="text-emerald-500 text-sm font-bold leading-relaxed">
                                "{lastSession.totalCoins > 1000 ? 'Muazzam bir akış! Ajansın seninle gurur duyuyor.' : 'Potansiyelin yüksek, bir dahaki sefere daha çok etkileşim dene!'}"
                            </p>
                        </div>

                        <button
                            onClick={clearSession}
                            className="w-full bg-emerald-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 active:scale-[0.98]"
                        >
                            Paneli Temizle ve Devam Et
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
