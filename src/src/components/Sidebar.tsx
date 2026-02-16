import { LayoutDashboard, Store, ShieldCheck, LogOut, Sun, Moon, User } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <LayoutDashboard size={22} />, label: 'Yayıncı Paneli', path: '/dashboard' },
        { icon: <Store size={22} />, label: 'Ödül Marketi', path: '/market' },
    ];

    if (user?.role === 'admin') {
        menuItems.push({ icon: <ShieldCheck size={22} />, label: 'Ajans Yönetimi', path: '/admin' });
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-72 glass border-r border-slate-800/50 h-screen sticky top-0 p-8 flex flex-col transition-all">
            <div className="flex items-center justify-center mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        H
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-white tracking-tighter uppercase leading-none">TikTok Hub</span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em] mt-1">Agency Pro</span>
                    </div>
                </div>
            </div>

            <div className="mb-8 p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500">
                    <User size={20} />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold text-white truncate">{user?.nickname}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role}</span>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)]'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-bold tracking-tight">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="pt-6 space-y-3 border-t border-slate-800/50">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-4 px-5 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-2xl w-full transition-all duration-300"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span className="font-bold text-sm tracking-tight">{theme === 'light' ? 'Gece Modu' : 'Gündüz Modu'}</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-5 py-3 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 rounded-2xl w-full transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-bold text-sm tracking-tight">Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
