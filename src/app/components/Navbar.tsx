'use client';

import { Menu, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { Character } from '@/app/page';
import Image from 'next/image';

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
          className={`p-2 md:p-2.5 rounded-xl hover:bg-blue-100/50 ${themeColors.text} transition-all active:scale-95`}
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
          <h1 className={`font-bold text-lg md:text-xl bg-gradient-to-r ${themeColors.gradient} bg-clip-text text-transparent hind-siliguri-semibold`}>
            {isAyanabajiMode ? character.name : 'কথাকুঞ্জ'}
          </h1>
        </div>

        {/* Right - Settings */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            className={`p-2 md:p-2.5 rounded-xl hover:bg-blue-100/50 ${themeColors.text} transition-all active:scale-95`}
          >
            <Settings className="size-4 md:size-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}