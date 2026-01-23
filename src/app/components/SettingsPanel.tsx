'use client';

import { X, Palette, User, Bell, Lock, Info, Check, Sparkles, LogIn, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MemoryPanel } from './MemoryPanel';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'default' | 'wallflower' | 'punk-rock' | 'okay-boomer' | 'dinosaur';
  onThemeChange: (theme: 'default' | 'wallflower' | 'punk-rock' | 'okay-boomer' | 'dinosaur') => void;
  currentFont: 'hind' | 'tiro';
  onFontChange: (font: 'hind' | 'tiro') => void;
  isAyanabajiMode: boolean;
  onOpenAbout: () => void;
}

export function SettingsPanel({ isOpen, onClose, currentTheme, onThemeChange, currentFont, onFontChange, isAyanabajiMode,
  onOpenAbout
}: SettingsPanelProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = translations[language as Language];

  const themes = [
    { id: 'default', name: t.themes.default, desc: t.themes.defaultDesc, color: 'bg-blue-400', icon: 'https://i.postimg.cc/MG5GJ9rG/image.png' },
    { id: 'wallflower', name: t.themes.wallflower, desc: t.themes.wallflowerDesc, color: 'bg-pink-400', icon: 'https://i.postimg.cc/xd694ccz/image.png' },
    { id: 'punk-rock', name: t.themes.punkRock, desc: t.themes.punkRockDesc, color: 'bg-green-600', icon: 'https://i.postimg.cc/MGHGx7kQ/image.png' },
    { id: 'okay-boomer', name: t.themes.okayBoomer, desc: t.themes.okayBoomerDesc, color: 'bg-gray-200', icon: 'https://i.postimg.cc/rF9yrnMC/image.png' },
    { id: 'dinosaur', name: t.themes.dinosaur, desc: t.themes.dinosaurDesc, color: 'bg-amber-500', icon: 'https://i.postimg.cc/15WhSLyY/image.png' },
  ];

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
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 w-[90%] max-w-md bg-white/95 backdrop-blur-2xl border-l border-blue-200/50 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-blue-200/50 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <div className="relative size-8">
                  <Image
                    src="/kothakunjo_logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.settings}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all active:scale-95"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Language Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Languages className="size-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.language}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border ${language === 'bn'
                      ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                      : 'bg-white border-slate-100'
                      }`}
                  >
                    <span className="text-base font-bold">{t.bangla}</span>
                    {language === 'bn' && <Check className="size-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border ${language === 'en'
                      ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                      : 'bg-white border-slate-100'
                      }`}
                  >
                    <span className="text-base font-bold">{t.english}</span>
                    {language === 'en' && <Check className="size-4 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* Appearance */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="size-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.appearance}</h3>
                </div>
                {isAyanabajiMode && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs italic">
                    {t.ayanabajiActiveNote}
                  </div>
                )}
                <div className="space-y-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(theme.id as any)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border ${currentTheme === theme.id
                        ? 'bg-blue-50 border-blue-400 shadow-sm'
                        : 'bg-white border-slate-100'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-xl overflow-hidden shadow-lg border-2 ${currentTheme === theme.id ? 'border-blue-400' : 'border-transparent'}`}>
                          <img src={theme.icon} alt={theme.name} className="size-full object-cover" />
                        </div>
                        <div className="text-left">
                          <div className={`font-bold ${currentTheme === theme.id ? 'text-blue-900' : 'text-slate-700'}`}>
                            {theme.name}
                          </div>
                          <div className="text-xs text-slate-400">{theme.desc}</div>
                        </div>
                      </div>
                      {currentTheme === theme.id && <Check className="size-5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="size-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.fontSelection}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onFontChange('hind')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border ${currentFont === 'hind'
                      ? 'bg-blue-50 border-blue-400 shadow-sm'
                      : 'bg-white border-slate-100'
                      }`}
                  >
                    <span className="text-xl font-bold hind-siliguri-bold">অ</span>
                    <span className="text-xs font-medium">Hind Siliguri</span>
                    {currentFont === 'hind' && <Check className="size-4 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => onFontChange('tiro')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border ${currentFont === 'tiro'
                      ? 'bg-purple-50 border-purple-400 shadow-sm'
                      : 'bg-white border-slate-100'
                      }`}
                  >
                    <span className="text-xl font-bold tiro-bangla-regular">অ</span>
                    <span className="text-xs font-medium">Tiro Bangla</span>
                    {currentFont === 'tiro' && <Check className="size-4 text-purple-600" />}
                  </button>
                </div>
              </div>

              {/* Memory & Personalization */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="size-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.personalization}</h3>
                </div>
                <MemoryPanel />
              </div>

              {/* Account Settings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="size-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.account}</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-blue-100">
                      <img
                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}`}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">{t.email}</div>
                      <div className="font-bold text-slate-700 text-sm">{user?.email || 'Guest User'}</div>
                    </div>
                  </div>
                  {user && (
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-all font-bold group"
                    >
                      <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                        <LogIn className="size-5 rotate-180" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm">{t.logout}</div>
                        <div className="text-[10px] opacity-70 font-medium">{t.logoutDesc}</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="size-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.about}</h3>
                </div>
                <button
                  onClick={onOpenAbout}
                  className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 text-white shadow-xl relative overflow-hidden group active:scale-[0.98] transition-all"
                >
                  <div className="relative z-10">
                    <h4 className="font-bold text-xl mb-1">{t.appName}</h4>
                    <p className="text-blue-100 text-xs mb-4">Version 3.0.0 (2026 Update)</p>

                  </div>
                  <div className="absolute top-[-20px] right-[-20px] size-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </button>
              </div>

              {/* Privacy */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="size-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">{t.privacySecurity}</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (confirm(t.confirmClearHistory)) {
                        localStorage.removeItem('kothakunjo_history');
                        window.location.reload();
                      }
                    }}
                    className="w-full p-4 rounded-2xl hover:bg-slate-50 text-slate-700 text-left transition-all font-medium border border-transparent hover:border-slate-200"
                  >
                    {t.clearChatHistory}
                  </button>
                  <button className="w-full p-4 rounded-2xl hover:bg-red-50 text-red-500 text-left transition-all font-bold border border-transparent hover:border-red-100">
                    {t.deleteAccount}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <div className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-[0.2em]">
                {t.madeBy}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}