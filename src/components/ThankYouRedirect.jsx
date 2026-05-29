import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export default function ThankYouRedirect({
    open,
    onClose,
    redirectUrl,
    startFrom = 5,
}) {
    const [counter, setCounter] = useState(startFrom)

    useEffect(() => {
        if (!open) return

        const interval = setInterval(() => {
            setCounter((prev) => prev - 1)
        }, 1000)

        const timeout = setTimeout(() => {
            window.open(redirectUrl, '_blank')
            onClose()
        }, startFrom * 1000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [open, redirectUrl, onClose, startFrom])

    if (!open) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 40 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-full max-w-lg rounded-3xl border border-border bg-surface p-10 text-center shadow-card"
                >
                    <h2 className="mb-4 text-3xl font-bold text-foreground">
                        🎉 Thank You!
                    </h2>

                    <p className="mb-6 text-lg leading-relaxed text-muted">
                        Your request has been successfully submitted.
                        <br />
                        Please select a date and time convenient for you so we can reach
                        out and discuss your project.
                    </p>

                    <div className="text-sm text-muted">
                        Redirecting you to our calendar in{' '}
                        <span className="text-lg font-bold text-foreground">
                            {counter}
                        </span>{' '}
                        second{counter !== 1 ? 's' : ''}…
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
