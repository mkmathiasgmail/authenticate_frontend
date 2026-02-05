import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full text-center space-y-8"
            >
                <div className="flex justify-center">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                        <ShieldCheck size={48} className="text-white" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        Authentification <span className="text-blue-600">Moderne</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Une interface sécurisée, rapide et élégante construite avec Laravel 11 et React.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button 
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                    >
                        <LogIn size={20} />
                        Se connecter
                    </button>
                    <button 
                        onClick={() => navigate('/register')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all hover:shadow-lg active:scale-95"
                    >
                        <UserPlus size={20} />
                        Créer un compte
                    </button>
                </div>

                <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                    {[
                        { title: "Sécurisé", desc: "Protection avancée des données" },
                        { title: "Rapide", desc: "Optimisé pour la performance" },
                        { title: "Élégant", desc: "Design moderne et épuré" }
                    ].map((feature, i) => (
                        <div key={i} className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-slate-100">
                            <h3 className="font-bold text-slate-900">{feature.title}</h3>
                            <p className="text-sm text-slate-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
