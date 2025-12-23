import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar({ onOpenForm }) {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => setOpen(!open)

    return (
        <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-[#0f0f0f]/80 border-b border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                            className="w-12 h-12 object-contain rounded-full"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />
                    </div>
                    <span className="text-2xl font-bold text-white hidden sm:block">
                        Trovina.io
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-gray-300 hover:text-white transition-colors font-medium'
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-gray-300 hover:text-white transition-colors font-medium'
                        }
                    >
                        Services
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-gray-300 hover:text-white transition-colors font-medium'
                        }
                    >
                        About Us
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-gray-300 hover:text-white transition-colors font-medium'
                        }
                    >
                        Contact Us
                    </NavLink>

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
                >
                    {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden mt-6 flex flex-col gap-4 pb-4"
                >
                    {['/', '/services', '/about', '/contact'].map((path, idx) => (
                        <NavLink
                            key={idx}
                            to={path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-white font-semibold text-center py-2'
                                    : 'text-gray-300 hover:text-white transition-colors font-medium text-center py-2'
                            }
                        >
                            {path === '/'
                                ? 'Home'
                                : path.replace('/', '').replace('-', ' ')}
                        </NavLink>
                    ))}

                    <button
                        onClick={() => {
                            setOpen(false)
                            onOpenForm()
                        }}
                        className="mx-auto px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition-all shadow-lg w-3/4"
                    >
                        Request Quote
                    </button>
                </motion.div>
            )}
        </nav>
    )
}
