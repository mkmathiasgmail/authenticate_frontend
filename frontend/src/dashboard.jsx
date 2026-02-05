import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, User, Settings, Bell, Search } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // navigate('/login'); // Uncomment if you want to force login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-xl text-slate-900">AdminPanel</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {[
                        { icon: LayoutDashboard, label: 'Tableau de bord', active: true },
                        { icon: User, label: 'Profil', active: false },
                        { icon: Settings, label: 'Paramètres', active: false },
                    ].map((item, i) => (
                        <button 
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                item.active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">{user?.name || 'Utilisateur'}</p>
                                <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Bienvenue sur votre tableau de bord</h1>
                            <p className="text-slate-500">Voici un aperçu de votre activité récente.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Sessions actives', value: '12', color: 'bg-blue-500' },
                                { label: 'Notifications', value: '4', color: 'bg-amber-500' },
                                { label: 'Temps passé', value: '2.5h', color: 'bg-emerald-500' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                                    <div className={`h-1 w-12 ${stat.color} rounded-full mt-4`}></div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900">Activité récente</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                                <User size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-900">Connexion réussie</p>
                                                <p className="text-xs text-slate-500">Il y a {i + 1} heure(s)</p>
                                            </div>
                                            <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full">Succès</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
