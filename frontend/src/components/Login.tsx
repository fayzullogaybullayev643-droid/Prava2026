import React, { useState } from 'react';
import { Car, Lock, User, ArrowRight, UserPlus } from 'lucide-react';
import axios from 'axios';

import { API_BASE_URL } from '../config';

interface LoginProps {
    onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const endpoint = isLogin ? `${API_BASE_URL}/auth/login` : `${API_BASE_URL}/auth/register`;


        try {
            const response = await axios.post(endpoint, { username, password });
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                onLogin(response.data.user);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Xatolik yuz berdi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop")',
            }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-white/20 transition-all duration-300">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-4 rounded-xl shadow-lg mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                        <Car className="text-white w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Prava2026</h1>
                    <p className="text-gray-500 font-medium mt-2">
                        {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
                    </p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => { setIsLogin(true); setError(''); }}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Kirish
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError(''); }}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Ro'yxatdan o'tish
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{isLogin ? "Email yoki Login" : "Email"}</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                            <input
                                type={isLogin ? 'text' : 'email'}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-800"
                                placeholder={isLogin ? "Foydalanuvchi nomi yoki Email" : "Masalan: ali@gmail.com"}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Parol</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-800"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl flex items-center gap-2 animate-shake">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Yuklanmoqda..." : (
                            <>
                                {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                                {isLogin ? <ArrowRight size={20} /> : <UserPlus size={20} />}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
