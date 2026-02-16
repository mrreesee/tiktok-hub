import { useState } from 'react';
import { UserPlus, Settings, Users, ShieldCheck, Activity, Trash2, Edit } from 'lucide-react';

const Admin = () => {
    const [streamers, setStreamers] = useState([
        { id: '1', username: 'john_doe', nickname: 'John Live', status: 'Online', points: 12450 },
        { id: '2', username: 'jane_stream', nickname: 'Jane Gaming', status: 'Offline', points: 8320 },
    ]);

    const [newStreamer, setNewStreamer] = useState({ username: '', nickname: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleAddStreamer = (e: React.FormEvent) => {
        e.preventDefault();
        if (newStreamer.username && newStreamer.nickname) {
            const id = (streamers.length + 1).toString();
            setStreamers([...streamers, { ...newStreamer, id, status: 'Offline', points: 0 }]);
            setNewStreamer({ username: '', nickname: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Ajans Yönetimi</h1>
                    <p className="text-slate-500 font-medium mt-1">Sistemdeki yayıncıları yönet ve performansları analiz et.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                >
                    <UserPlus size={20} /> Yayıncı Ekle
                </button>
            </header>

            {isAdding && (
                <div className="glass p-8 rounded-[2rem] border border-emerald-500/20 animate-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleAddStreamer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Kullanıcı Adı (@)</label>
                            <input
                                type="text"
                                value={newStreamer.username}
                                onChange={(e) => setNewStreamer({ ...newStreamer, username: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                placeholder="john_doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Takma Ad</label>
                            <input
                                type="text"
                                value={newStreamer.nickname}
                                onChange={(e) => setNewStreamer({ ...newStreamer, nickname: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                                placeholder="John Live"
                            />
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full bg-emerald-500 text-slate-950 py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-emerald-400 transition-all">
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card p-10 rounded-[2.5rem]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                            <Users size={24} className="text-emerald-500" />
                            Aktif Yayıncılar
                        </h2>
                        <span className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Total: {streamers.length}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800/50">
                                    <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Yayıncı</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Durum</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Puan</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {streamers.map((s) => (
                                    <tr key={s.id} className="group hover:bg-slate-900/30 transition-colors">
                                        <td className="py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500 font-black text-lg">
                                                    {s.nickname[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{s.nickname}</span>
                                                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">@{s.username}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${s.status === 'Online' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                                                <span className={`text-xs font-bold ${s.status === 'Online' ? 'text-emerald-500' : 'text-slate-500'}`}>{s.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right font-black text-white tabular-nums">{s.points.toLocaleString()}</td>
                                        <td className="py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-slate-900 text-slate-400 hover:text-emerald-500 rounded-lg border border-slate-800 hover:border-emerald-500/30 transition-all">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 bg-slate-900 text-slate-400 hover:text-red-500 rounded-lg border border-slate-800 hover:border-red-500/30 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="premium-card p-10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-emerald-500/10 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={120} />
                        </div>
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Sistem Durumu</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white tracking-tighter italic">99.9%</span>
                            <span className="text-emerald-500 text-xs font-black uppercase">Online</span>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800/50">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Proxy Connection</span>
                                <span className="text-emerald-500">Secure</span>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card p-10 rounded-[2.5rem] border border-emerald-500/10">
                        <Activity className="text-emerald-500 mb-6" size={32} />
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Hızlı İşlemler</h3>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed mb-6">Ajans ayarlarını ve güvenlik protokollerini buradan hızlıca yapılandırabilirsin.</p>
                        <button className="w-full bg-slate-900 border border-slate-800 py-4 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                            Sistem Ayarları
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
