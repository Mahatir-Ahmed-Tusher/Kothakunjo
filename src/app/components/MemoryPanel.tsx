'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { Save, Brain, Settings2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MemoryPanel() {
    const { user } = useAuth();
    const [memory, setMemory] = useState('');
    const [preference, setPreference] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const loadData = async () => {
                const docRef = doc(db, 'users', user.uid, 'settings', 'userConfig');
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setMemory(data.memory || '');
                        setPreference(data.preference || '');
                    }
                } catch (err: any) {
                    console.warn("Firestore fetch error (likely offline):", err);
                }
            };
            loadData();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        setError(null);
        try {
            const docRef = doc(db, 'users', user.uid, 'settings', 'userConfig');
            await setDoc(docRef, {
                memory,
                preference,
                updatedAt: Timestamp.now()
            }, { merge: true });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err: any) {
            console.error("Error saving user config:", err);
            if (err.code === 'unavailable' || !navigator.onLine) {
                setError("আপনি বর্তমানে অফলাইনে আছেন। ইন্টারনেট সংযোগ ফিরে এলে আবার চেষ্টা করুন।");
            } else if (err.code === 'permission-denied') {
                setError("আপনার এই তথ্য সেভ করার অনুমতি নেই। আবার লগইন করে দেখুন।");
            } else {
                setError("সেভ করার সময় একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 ml-1">
                    <Brain className="w-4 h-4 text-purple-500" />
                    ব্যবহারকারীর স্মৃতি (User Memory)
                </label>
                <textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="আপনার সম্পর্কে কিছু তথ্য দিন (যেমন: 'আমার বিড়াল পছন্দ', 'আমি ঢাকায় থাকি')। এটি এআই-কে সঠিক উত্তর দিতে সাহায্য করবে।"
                    className="w-full min-h-[100px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-4 ring-purple-500/10 outline-none transition-all text-sm resize-none"
                />
            </div>

            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 ml-1">
                    <Settings2 className="w-4 h-4 text-teal-500" />
                    ফলাফল পছন্দ (Result Preference)
                </label>
                <textarea
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    placeholder="এআই-এর উত্তর কেমন হওয়া উচিত? (যেমন: 'উত্তরে সবসময় ইমোজি ব্যবহার করো', 'সবসময় ফর্মাল ভাষায় কথা বলো')।"
                    className="w-full min-h-[100px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-4 ring-teal-500/10 outline-none transition-all text-sm resize-none"
                />
            </div>

            <div className="flex items-center justify-between pt-2">
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            সফলভাবে সেভ হয়েছে!
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-bold max-w-[250px]"
                        >
                            <span className="shrink-0">⚠️</span>
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50 ml-auto"
                >
                    {isSaving ? (
                        <Sparkles className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="size-4" />
                    )}
                    সেভ করুন
                </button>
            </div>
        </div>
    );
}
