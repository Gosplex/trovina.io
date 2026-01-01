import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const names = [
    "John", "Aisha", "Chinedu", "Samuel", "Blessing",
    "Fatima", "Emeka", "Grace", "Ibrahim", "Daniel",
];

const cities = [
    "Lagos", "Port Harcourt", "Abuja", "Ibadan",
    "Benin City", "Owerri", "Uyo", "Abeokuta",
    "Asaba", "Onitsha",
];

const actions = [
    "requested a free website",
    "submitted an application",
    "just claimed a free website",
];

const timeAgoOptions = [
    "2 minutes ago",
    "5 minutes ago",
    "8 minutes ago",
    "Just now",
];

const randomItem = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

export default function SocialProofPopup({ pause }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        if (pause) return;

        let hideTimeout;
        let interval;
        let firstTimeout;

        const showPopup = () => {
            setMessage(
                `${randomItem(names)} from ${randomItem(cities)} just ${randomItem(actions)}`
            );
            setTimeAgo(randomItem(timeAgoOptions));
            setVisible(true);

            hideTimeout = setTimeout(() => {
                setVisible(false);
            }, 5000);
        };

        // 🔥 FIRST POPUP — FAST (3–6s)
        firstTimeout = setTimeout(() => {
            showPopup();
        }, Math.floor(Math.random() * (6000 - 3000)) + 3000);

        // 🔁 FOLLOW-UP POPUPS — RANDOM 20–45s
        interval = setInterval(() => {
            showPopup();
        }, Math.floor(Math.random() * (45000 - 20000)) + 20000);

        return () => {
            clearTimeout(firstTimeout);
            clearInterval(interval);
            clearTimeout(hideTimeout);
        };
    }, [pause]);


    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40"
                >
                    {/* Animated border */}
                    <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-white/20 via-white to-white/20 animate-border">
                        <div className="bg-gray-900 rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-xl max-w-[260px] md:max-w-sm">

                            {/* Header */}
                            {/* <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    Live activity
                                </span>
                            </div> */}

                            {/* Message */}
                            <p className="text-sm md:text-base text-white font-medium leading-snug">
                                {message}
                            </p>

                            {/* Time */}
                            <p className="text-xs text-gray-400 mt-1">
                                {timeAgo}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
