'use client';

import { Plus, MessageSquare, Settings, LogOut, History, X, Trash2, Edit2, MoreVertical, Heart, Sparkles, Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { translations, Language } from '../../lib/translations';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: { id: number; title: string; date: string }[];
  activeChat: number;
  onChatSelect: (id: number) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenCharacterCreation: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  isKinnoriMode: boolean;
  onToggleAyanabajiMode: () => void;
  onDeleteChat: (id: number) => void;
  onDeleteAllChats: () => void;
  onRenameChat: (id: number, newTitle: string) => void;
}

export function Sidebar({
  isOpen, onClose, chatHistory, activeChat, onChatSelect, onNewChat, onOpenSettings, onOpenAbout, onOpenCharacterCreation,
  isLoggedIn, onLogout, isKinnoriMode: isAyanabajiMode, onToggleAyanabajiMode, onDeleteChat, onDeleteAllChats, onRenameChat
}: SidebarProps) {
  const { language } = useLanguage();
  const t = translations[language as Language];

  const [longPressedId, setLongPressedId] = useState<number | null>(null);
  const pressTimer = useRef<any>(null);

  const handleTouchStart = (id: number) => {
    pressTimer.current = setTimeout(() => {
      setLongPressedId(id);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  useEffect(() => {
    const handleClickOutside = () => setLongPressedId(null);
    if (longPressedId) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [longPressedId]);

  const handleDelete = (id: number) => {
    if (window.confirm(t.confirmDeleteChat)) {
      onDeleteChat(id);
      setLongPressedId(null);
    }
  };

  const handleRename = (id: number, currentTitle: string) => {
    const newTitle = window.prompt(t.promptNewTitle, currentTitle);
    if (newTitle && newTitle.trim()) {
      onRenameChat(id, newTitle.trim());
      setLongPressedId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 bottom-0 w-[85%] sm:w-80 bg-white/90 backdrop-blur-2xl border-r border-blue-200/50 flex flex-col z-50 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-blue-200/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative size-8">
                    <Image
                      src="/kothakunjo_logo.png"
                      alt="Kothakunjo Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {t.appName}
                  </h1>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-blue-900 transition-all active:scale-95"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Mode Toggle Section */}
                <div className="p-3">
                  <button
                    onClick={onToggleAyanabajiMode}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all border shadow-sm ${isAyanabajiMode
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-pink-300/50 text-pink-700'
                      : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-300/50 text-blue-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {isAyanabajiMode ? <Sparkles className="size-5" /> : <Heart className="size-5" />}
                      <span className="font-semibold">{isAyanabajiMode ? t.kinnoriMode : t.normalMode}</span>
                    </div>
                    <div className={`size-4 rounded-full ${isAyanabajiMode ? 'bg-pink-500 animate-pulse' : 'bg-blue-500'}`} />
                  </button>
                </div>

                <div className="px-3 pb-3 mt-4">
                  <button
                    onClick={onOpenCharacterCreation}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-blue-100 text-blue-900 transition-all shadow-sm active:scale-95"
                  >
                    <img
                      src="https://i.postimg.cc/5tCmPFPZ/image.png"
                      alt="Ayanabaji"
                      className="size-6 object-contain"
                    />
                    <span className="font-medium">{t.characterCreation}</span>
                  </button>
                </div>

                {/* New Chat Button */}
                <div className="px-3 pb-3">
                  <button
                    onClick={onNewChat}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white transition-all shadow-lg shadow-blue-200 active:scale-95"
                  >
                    <img
                      src="https://i.postimg.cc/FzDq9LX7/image.png"
                      alt="New Chat"
                      className="size-6 object-contain"
                    />
                    <span className="font-medium">{t.newChat}</span>
                  </button>
                </div>

                {/* Chat History */}
                <div className="px-3">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-blue-600/70 font-bold uppercase tracking-wider mb-2">
                    <div className="flex items-center gap-2">
                      <History className="size-4" />
                      <span>{t.chatHistory}</span>
                    </div>
                    {chatHistory.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm(t.confirmClearHistory)) {
                            onDeleteAllChats();
                          }
                        }}
                        className="p-1 text-red-400 rounded-lg transition-all"
                        title={t.delete}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 pb-4">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className="relative">
                        <div
                          onClick={() => onChatSelect(chat.id)}
                          onTouchStart={() => handleTouchStart(chat.id)}
                          onTouchEnd={handleTouchEnd}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setLongPressedId(chat.id);
                          }}
                          className={`w-full group flex items-start gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeChat === chat.id
                            ? 'bg-blue-500/10 border border-blue-400/30 shadow-inner'
                            : 'border border-transparent'
                            } text-blue-900 text-left`}
                        >
                          <MessageSquare className={`size-4 mt-0.5 flex-shrink-0 ${activeChat === chat.id ? 'text-blue-600' : 'text-blue-400'}`} />
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="text-sm truncate font-medium">{chat.title}</div>
                            <div className="text-[10px] text-blue-600/50 mt-0.5 font-bold uppercase">{chat.date}</div>
                          </div>

                          {/* Desktop Actions */}
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRename(chat.id, chat.title);
                              }}
                              className="p-1.5 text-blue-400 rounded-lg transition-all"
                              title="নাম পরিবর্তন করুন"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(chat.id);
                              }}
                              className="p-1.5 text-red-400 rounded-lg transition-all"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>

                          <div className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-300 opacity-50">
                            <MoreVertical className="size-4" />
                          </div>
                        </div>

                        {/* Mobile Long Press Menu */}
                        <AnimatePresence>
                          {longPressedId === chat.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white rounded-2xl shadow-2xl border border-blue-100 p-2 flex items-center gap-1 z-[60] min-w-[140px]"
                            >
                              <button
                                onClick={() => handleRename(chat.id, chat.title)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 hover:bg-blue-50 text-blue-600 rounded-xl transition-all"
                              >
                                <Edit2 className="size-4" />
                                <span className="text-xs font-bold">{t.rename}</span>
                              </button>
                              <div className="w-px h-6 bg-slate-100" />
                              <button
                                onClick={() => handleDelete(chat.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 hover:bg-red-50 text-red-600 rounded-xl transition-all"
                              >
                                <Trash2 className="size-4" />
                                <span className="text-xs font-bold">{t.delete}</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-blue-200/50 space-y-1 bg-gray-50/50">
                <button
                  onClick={onOpenSettings}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-blue-900 transition-all group active:scale-95"
                >
                  <Settings className="size-5 text-gray-500" />
                  <span className="font-medium">{t.settings}</span>
                </button>

                <button
                  onClick={onOpenAbout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-blue-900 transition-all group active:scale-95"
                >
                  <Info className="size-5 text-gray-500" />
                  <span className="font-medium">{t.about}</span>
                </button>

                {isLoggedIn && (
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 transition-all border border-red-100 active:scale-95 group"
                  >
                    <LogOut className="size-5" />
                    <span className="font-bold">{t.logout}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}