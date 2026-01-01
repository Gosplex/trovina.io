import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Zap } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-[#f9f9f9] flex items-center justify-center relative overflow-hidden font-poppins">

            {/* Animated background blobs */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-1/3 w-80 h-80 bg-white rounded-full blur-3xl opacity-5"
                />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-gray-900/80 via-[#0f0f0f]/90 to-black/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 shadow-2xl"
                >

                    {/* Logo / Brand */}
                    <div className="text-center mb-10">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-6 shadow-lg"
                        >
                            <Zap className="w-9 h-9 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
                        <p className="text-gray-400 mt-2 text-sm">
                            Secure access to Trovina.io dashboard
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-900/30 border border-red-800/50 rounded-xl text-red-400 text-sm flex items-center gap-3"
                        >
                            <Lock className="w-5 h-5" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="xxxxxxx@xxxxxx.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-5 py-4 bg-gray-800/70 border border-gray-700 rounded-xl focus:outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-5 py-4 bg-gray-800/70 border border-gray-700 rounded-xl focus:outline-none focus:border-white focus:ring-4 focus:ring-white/10 transition-all placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-white text-black font-bold rounded-xl shadow-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <motion.div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <LogIn className="w-5 h-5" />
                            )}
                            {isLoading ? "Signing in..." : "Sign In"}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-500 mt-10">
                        Protected access • Only authorized personnel
                    </p>
                </motion.div>

                {/* Subtle bottom glow */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
