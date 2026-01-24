import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar({ onOpenForm }) {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => setOpen(!open)

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-[#0f0f0f]/80 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="relative">
                        <img
                            src="/logo.png"
                            alt="Trovina Web Studio Logo"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain rounded-full"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />
                    </div>

                    <span
                        className="hidden sm:block text-xl md:text-2xl font-bold 
                        bg-gradient-to-r from-[#6B21A8] via-[#A855F7] to-[#C084FC] 
                        bg-clip-text text-transparent"
                    >
                        Trovina.io
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { path: '/', label: 'Home' },
                        { path: '/services', label: 'Services' },
                        { path: '/about', label: 'About Us' },
                        { path: '/contact', label: 'Contact Us' },
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                                    : 'text-gray-300 hover:text-white transition-colors font-medium'
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOpenForm}
                        className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all shadow-lg"
                    >
                        Request Quote
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden text-white"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#0f0f0f]/95 border-t border-gray-800"
                    >
                        <div className="flex flex-col gap-4 py-6 px-6">
                            {[
                                { path: '/', label: 'Home' },
                                { path: '/services', label: 'Services' },
                                { path: '/about', label: 'About Us' },
                                { path: '/contact', label: 'Contact Us' },
                            ].map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white font-semibold text-center py-2'
                                            : 'text-gray-300 hover:text-white transition-colors font-medium text-center py-2'
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    onOpenForm()
                                }}
                                className="mx-auto mt-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all shadow-lg w-full max-w-xs"
                            >
                                Request Quote
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
