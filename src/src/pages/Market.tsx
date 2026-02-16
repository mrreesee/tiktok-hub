import { Store, Gift, Search, ArrowRight, Coins } from 'lucide-react';

const Market = () => {
    const rewards = [
        { id: 1, name: 'Premium Discord Rolü', price: 500, category: 'Dijital', color: 'bg-emerald-500' },
        { id: 2, name: 'Sanal Hediye Paketi', price: 1200, category: 'TikTok', color: 'bg-amber-500' },
        { id: 3, name: 'Ajans Tişörtü', price: 5000, category: 'Fiziksel', color: 'bg-blue-500' },
        { id: 4, name: 'Özel Yayın Danışmanlığı', price: 10000, category: 'Hizmet', color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Ödül Marketi</h1>
                    <p className="text-slate-500 font-medium mt-1">Puanlarını harika ödüllerle takas et.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Ödül ara..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-emerald-500 transition-all font-bold"
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {rewards.map((reward) => (
                    <div key={reward.id} className="premium-card rounded-[2.5rem] overflow-hidden group cursor-pointer hover:translate-y-[-8px] transition-all duration-500">
                        <div className={`h-48 ${reward.color}/10 flex items-center justify-center relative overflow-hidden`}>
                            <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60`} />
                            <Gift size={64} className={`${reward.color.replace('bg-', 'text-')} group-hover:scale-125 transition-transform duration-700`} />
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{reward.category}</span>
                                <h3 className="text-xl font-black text-white mt-1 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{reward.name}</h3>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                                        <Coins size={16} />
                                    </div>
                                    <span className="text-lg font-black text-white tabular-nums">{reward.price.toLocaleString()}</span>
                                </div>
                                <button className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl transition-all">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Market;
