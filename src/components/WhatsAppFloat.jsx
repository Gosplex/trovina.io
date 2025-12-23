import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
    const phoneNumber = '234XXXXXXXXXX'
    const message = encodeURIComponent(
        'Hello, I would like to know more about your services.'
    )

    const [showHint, setShowHint] = useState(true)

    useEffect(() => {
        // Play sound on load
        const audio = new Audio('/sounds/pop.mp3')
        audio.volume = 0.4
        audio.play().catch(() => { })

        // Hide hint after 4s
        const timer = setTimeout(() => {
            setShowHint(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
            {/* Tooltip */}
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
                    >
                        Message us on WhatsApp
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Button */}
            <motion.a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center"
            >
                <MessageCircle size={28} />
            </motion.a>
        </motion.div>
    )
}
