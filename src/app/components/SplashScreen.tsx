'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { translations, Language } from '../../lib/translations';

interface SplashScreenProps {
    onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { language } = useLanguage();
    const t = translations[language as Language];

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();

        // If not mobile, skip splash immediately
        if (window.innerWidth >= 768) {
            setIsVisible(false);
            onComplete();
            return;
        }

        // Auto-hide splash after animation
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isMobile) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[200] bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Background Circles */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 4, opacity: 0.1 }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-white"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 3, opacity: 0.05 }}
                            transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-white"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0.08 }}
                            transition={{ duration: 2, delay: 0.4, ease: 'easeOut' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-white"
                        />
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: '100vh',
                                    x: `${Math.random() * 100}vw`,
                                    opacity: 0
                                }}
                                animate={{
                                    y: '-20vh',
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: Math.random() * 1,
                                    ease: 'easeOut',
                                }}
                                className="absolute size-2 rounded-full bg-white/40"
                            />
                        ))}
                    </div>

                    {/* Logo Container */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="relative z-10"
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(255,255,255,0.4)',
                                    '0 0 0 30px rgba(255,255,255,0)',
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                            className="relative size-32 rounded-full bg-white/20 backdrop-blur-xl p-4 ring-4 ring-white/30"
                        >
                            <Image
                                src="/kothakunjo_logo.png"
                                alt="Kothakunjo"
                                fill
                                className="object-contain p-3 drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* App Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-8 text-4xl font-bold text-white drop-shadow-lg"
                    >
                        {t.appName}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="mt-3 text-blue-100 text-lg"
                    >
                        {t.aiCompanion}
                    </motion.p>

                    {/* Loading Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-16 flex flex-col items-center gap-4"
                    >
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15
                                    }}
                                    className="size-2.5 rounded-full bg-white"
                                />
                            ))}
                        </div>
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-xs text-white/70 font-medium uppercase tracking-widest"
                        >
                            {t.loading}
                        </motion.p>
                    </motion.div>

                    {/* Bottom Branding */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-6 text-[10px] text-white/50 font-bold uppercase tracking-[0.3em]"
                    >
                        Kothakunjo Team © 2026
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
