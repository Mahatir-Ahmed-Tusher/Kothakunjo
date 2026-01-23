'use client';

import { Menu, Settings, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { Character } from '@/app/page';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translations, Language } from '../../lib/translations';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  character: Character;
  themeColors: any;
  isKinnoriMode?: boolean;
}

export function Navbar({ onToggleSidebar, onOpenSettings, character, themeColors, isKinnoriMode: isAyanabajiMode }: NavbarProps) {
  const { user, loginWithGoogle } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as Language];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`relative z-30 backdrop-blur-xl ${themeColors.navbar} border-b ${themeColors.border} shadow-lg shadow-blue-100/20 shrink-0`}
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3">
        {/* Left - Menu Button */}
        <button
          onClick={onToggleSidebar}
          className={`p-2 md:p-2.5 rounded-xl ${themeColors.text} transition-all active:scale-95`}
        >
          <Menu className="size-5 md:size-6" />
        </button>

        {/* Center - Logo and Name */}
        <div className="flex items-center gap-2">
          <div className="relative size-8 md:size-9">
            <Image
              src="/kothakunjo_logo.png"
              alt="Kothakunjo Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className={`font-bold text-lg md:text-xl bg-gradient-to-r ${themeColors.gradient} bg-clip-text text-transparent`}>
            {isAyanabajiMode ? character.name : t.appName}
          </h1>
        </div>

        {/* Right - Settings & Login */}
        <div className="flex items-center gap-1 sm:gap-2">
          {!user && (
            <button
              onClick={() => loginWithGoogle()}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${themeColors.gradient} text-white shadow-md active:scale-95 transition-all text-xs md:text-sm font-bold`}
            >
              <LogIn className="size-3.5 md:size-4" />
              {t.login}
            </button>
          )}
          <button
            onClick={onOpenSettings}
            className={`p-2 md:p-2.5 rounded-xl ${themeColors.text} transition-all active:scale-95`}
          >
            <Settings className="size-4 md:size-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}