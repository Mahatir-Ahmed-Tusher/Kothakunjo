'use client';

import { X, Heart, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl z-[110] overflow-hidden flex flex-col"
                    >
                        {/* Hero Section */}
                        <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500" />
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                backgroundSize: '24px 24px'
                            }} />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative size-24 mb-4"
                                >
                                    <Image
                                        src="/kothakunjo_logo.png"
                                        alt="Kothakunjo Logo"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </motion.div>
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold hind-siliguri-bold tracking-tight"
                                >
                                    কথাকুঞ্জ
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-blue-100 text-sm font-medium uppercase tracking-widest mt-1"
                                >
                                    Version 3.0.0
                                </motion.p>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all active:scale-90"
                            >
                                <X className="size-6" />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                            <div className="space-y-6 text-slate-700 leading-relaxed hind-siliguri-regular text-lg">
                                <p>
                                    কথাকুঞ্জ হলো আপনার আমার মতোই বাংলায় সাবলীল, প্রাঞ্জল একটা চ্যাটবট। ধরে নিন, আপনার কোনো অনলাইনের বন্ধু, যার সাথে আপনি কখনো আড্ডা দেবেন নিজের জীবনের সুখ, দুঃখ নিয়ে। কিংবা মাঝে মাঝে মেতে যাবেন প্রযুক্তি, রাজনীতি, দর্শন, বিজ্ঞান ইত্যাদি নার্ডি সব বিষয় নিয়ে।
                                </p>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                                    <Globe className="size-6 text-blue-600 mt-1 shrink-0" />
                                    <p className="text-base text-blue-900/80">
                                        সাধারণত ইংরেজিতে ভালো কাজ করে, এমন এআই মডেল আছে অনেক। কিন্তু বাংলা ভাষার জন্য ডেডিকেটেড এমন এআই চ্যাটবট নেই বললেই চলে। এ সমস্যা নিসরণের উদ্দ্যেশ্যেই আমি মাহাথির আহমেদ তুষার ভাষার মাস কে শ্রদ্ধা জানিয়ে এ উদ্যোগ নিয়েছি।
                                    </p>
                                </div>

                                <p>
                                    এটা খুবই স্বাভাবিক যে, আপনি বাঙালী হওয়া সত্ত্বেও কথাকুঞ্জ শব্দটির অর্থ জানেন না এখনও। কথাকুঞ্জ শব্দটি কথা এবং কুঞ্জ- এই দুই শব্দের সমন্বয়ে গঠিত। কথা শব্দের অর্থ হলো বচন, গল্প, আখ্যান। আর কুঞ্জ অর্থ লতাদি দ্বারা আচ্ছাদিত গৃহাকার স্থান; লতাগৃহ, উপবন ইত্যাদি বোঝায়। দুটো মিলিয়ে বোঝায়, যেখানে সম্ভার ঘটেছে কথার।
                                </p>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100">
                                    <Sparkles className="size-6 text-cyan-600 mt-1 shrink-0" />
                                    <p className="text-base text-cyan-900/80">
                                        এই কৃত্রিম বুদ্ধিমত্তা আপনার সাথে কথা বলবে, আপনার কথা শুনবে। আপনাকে গল্প শোনাবে, ইতিহাস, বিজ্ঞান, দর্শন, সাহিত্য শেখাবে। এবং সেটা আপনার মায়ের ভাষায়। মধুর ভাষায়।
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-px bg-slate-100 w-full" />
                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Our Vision</p>
                                    <p>
                                        আমরা এমন এক ভবিষ্যতের স্বপ্ন দেখি, যেখানে একজন বাংলা ভাষাভাষী মানুষ—সে যেখানেই থাকুক কিংবা যেকোনো প্রযুক্তিগত জ্ঞানের স্তরেই থাকুক—সহজেই এমন এক AI-এর সঙ্গে কথা বলতে পারবে, যে তার ভাষা বোঝে, তার সংস্কৃতি জানে, এবং তার বাস্তবতা বুঝে সাড়া দিতে পারে। কথাকুঞ্জ সেই অন্তর্ভুক্তিমূলক ও সহজলভ্য প্রযুক্তির দিকেই আমাদের এগিয়ে যাওয়া।
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="h-px bg-slate-100 w-full" />
                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Founder & Developer</p>
                                    <div className="flex flex-col gap-2 text-base">
                                        <p className="font-bold text-slate-900">Mahatir Ahmed Tusher</p>
                                        <div className="flex flex-col gap-1 text-slate-600">
                                            <p>Email: <a href="mailto:mahatirtusher@gmail.com" className="text-blue-600 hover:underline">mahatirtusher@gmail.com</a></p>
                                            <div className="flex gap-4">
                                                <a href="https://in.linkedin.com/in/mahatir-ahmed-tusher-5a5524257" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">LinkedIn</a>
                                                <a href="https://scholar.google.com/citations?user=k8hhhx4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Google Scholar</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-center">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                © 2026 Kothakunjo Team
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
