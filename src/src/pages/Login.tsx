import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight, Activity } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Minimum UI feedback delay
        setTimeout(async () => {
            const success = await login(username, password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Geçersiz kullanıcı adı veya şifre.');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-slate-950">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-6 shadow-2xl shadow-emerald-500/20 animate-pulse">
                        <Activity className="text-emerald-500" size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">TikTok Hub</h1>
                    <p className="text-slate-400 mt-3 font-medium">Ajans Yönetimi ve Yayıncı Paneli</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Kullanıcı Adı</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="admin veya streamer"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1 uppercase tracking-widest">Şifre</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-shake">
                                <ShieldCheck size={18} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Giriş Yapılıyor...' : 'Sisteme Sız'} <ArrowRight size={22} />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        <span>Security V4.2</span>
                        <span>Agency Restricted</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
