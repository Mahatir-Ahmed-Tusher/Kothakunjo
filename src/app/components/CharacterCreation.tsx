'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Upload, User, Briefcase, Calendar, BookOpen, Heart, Palette, Sparkles, Check, Camera, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../page';
import { translations, Language } from '../../lib/translations';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

interface CharacterCreationProps {
  character: Character;
  onSave: (character: Character) => void;
  onBack: () => void;
  themeColors: any;
}

const themes = [
  { id: 'default' as const, name: 'Default', colors: 'from-blue-400 to-cyan-500', icon: 'https://i.postimg.cc/MG5GJ9rG/image.png' },
  { id: 'wallflower' as const, name: 'Wallflower', colors: 'from-pink-400 to-purple-500', icon: 'https://i.postimg.cc/xd694ccz/image.png' },
  { id: 'punk-rock' as const, name: 'Punk Rock', colors: 'from-gray-700 to-green-600', icon: 'https://i.postimg.cc/MGHGx7kQ/image.png' },
  { id: 'okay-boomer' as const, name: 'Okay Boomer', colors: 'from-gray-400 to-slate-600', icon: 'https://i.postimg.cc/rF9yrnMC/image.png' },
  { id: 'dinosaur' as const, name: 'Dinosaur シ', colors: 'from-amber-500 to-orange-600', icon: 'https://i.postimg.cc/15WhSLyY/image.png' },
];

const profileEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🦋', '🐱', '🦊', '🐼', '🦄', '✨', '💫', '⭐', '🌙', '☀️', '🌈', '🍦', '🍓', '🥑', '🎾', '🎨', '🎭', '🎤', '🎧', '💻', '🔮', '🚀', '💌', '🧸', '🎈'];

export function CharacterCreation({ character, onSave, onBack, themeColors }: CharacterCreationProps) {
  const { language } = useLanguage();
  const t = translations[language as Language];
  const [formData, setFormData] = useState<Character>(character);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(t.imageSizeError);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const isImage = (str: string) => str.startsWith('data:') || str.startsWith('http');

  return (
    <div className="flex-1 flex flex-col relative z-20 h-screen overflow-hidden bg-white/30 backdrop-blur-3xl">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-blue-100 shadow-sm">
        <div className="px-4 py-3 sm:py-4 flex items-center justify-between max-w-4xl mx-auto w-full">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl hover:bg-blue-50 text-slate-600 transition-all active:scale-90"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative size-7">
              <Image src="/kothakunjo_logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hind-siliguri-bold">
              {t.characterCreation}
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:py-8 custom-scrollbar">
        <div className="max-w-xl mx-auto space-y-8 pb-32">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative group flex gap-4 items-end">
                <div className="relative">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`size-28 sm:size-32 rounded-[2.5rem] bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center text-5xl shadow-2xl hover:scale-105 transition-all active:scale-95 ring-8 ring-white overflow-hidden`}
                  >
                    {formData.profilePicture && isImage(formData.profilePicture) ? (
                      <div className="relative size-full">
                        <img
                          src={formData.profilePicture || undefined}
                          alt="Profile"
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      formData.profilePicture || '👤'
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-[2.5rem] flex items-center justify-center">
                      <Palette className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 size-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-pink-500 hover:text-pink-600 hover:scale-110 active:scale-90 transition-all border border-pink-100 ring-4 ring-white"
                  >
                    <Camera className="size-6" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-800 text-lg hind-siliguri-semibold">{t.profilePicture}</h3>
                <p className="text-slate-400 text-sm hind-siliguri-regular">{t.clickToChange}</p>
              </div>
            </div>

            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 border-t border-slate-100 pt-6"
                >
                  <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-bold hind-siliguri-medium uppercase tracking-wider">
                    <Sparkles className="size-4 text-pink-500" />
                    {t.chooseEmoji}
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 overflow-hidden">
                    {profileEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setFormData({ ...formData, profilePicture: emoji });
                          setShowEmojiPicker(false);
                        }}
                        className={`size-11 sm:size-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all ${formData.profilePicture === emoji ? 'border-pink-400 bg-pink-50' : 'border-transparent hover:bg-slate-100'
                          }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white space-y-6"
          >
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                <User className="size-4 text-pink-500" />
                {t.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-pink-300 focus:ring-4 ring-pink-500/5 focus:outline-none text-slate-800 transition-all hind-siliguri-regular"
                placeholder={t.enterName}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                <User className="size-4 text-pink-500" />
                {t.gender}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['female', 'male', 'other'] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setFormData({ ...formData, gender })}
                    className={`px-4 py-3 rounded-2xl transition-all border-2 font-bold hind-siliguri-medium text-sm ${formData.gender === gender
                      ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-inner scale-[0.98]'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-pink-200'
                      }`}
                  >
                    {gender === 'female' ? t.female : gender === 'male' ? t.male : t.other}
                  </button>
                ))}
              </div>
            </div>

            {/* Role & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                  <Briefcase className="size-4 text-pink-500" />
                  {t.role}
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-pink-300 focus:outline-none text-slate-800 transition-all hind-siliguri-regular"
                  placeholder={t.roleExample}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                  <Calendar className="size-4 text-pink-500" />
                  {t.age}
                </label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-pink-300 focus:outline-none text-slate-800 transition-all hind-siliguri-regular"
                  placeholder={t.enterAge}
                />
              </div>
            </div>
          </motion.div>

          {/* Personality & History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white space-y-6"
          >
            <div>
              <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                <BookOpen className="size-4 text-pink-500" />
                {t.history}
              </label>
              <textarea
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                rows={4}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-pink-300 focus:outline-none text-slate-800 transition-all resize-none hind-siliguri-regular"
                placeholder={t.historyPlaceholder}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-3 text-slate-700 font-bold hind-siliguri-medium">
                <Heart className="size-4 text-pink-500" />
                {t.relationship}
              </label>
              <textarea
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                rows={3}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-pink-300 focus:outline-none text-slate-800 transition-all resize-none hind-siliguri-regular"
                placeholder={t.relationshipPlaceholder}
              />
            </div>
          </motion.div>

          {/* Theme Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 shadow-xl border border-white"
          >
            <div className="flex items-center gap-2 mb-6 text-slate-700 font-bold hind-siliguri-medium">
              <Palette className="size-5 text-pink-500" />
              {t.chooseTheme}
            </div>
            <div className="space-y-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setFormData({ ...formData, theme: theme.id })}
                  className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all border-2 ${formData.theme === theme.id
                    ? 'border-pink-400 bg-pink-50'
                    : 'border-slate-50 bg-white hover:border-pink-100'
                    }`}
                >
                  <div className="size-14 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white shrink-0">
                    <img src={theme.icon} alt={theme.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-slate-800 hind-siliguri-medium">{theme.name}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 hind-siliguri-regular">{theme.desc}</div>
                  </div>
                  {formData.theme === theme.id && (
                    <div className="size-8 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-200">
                      <Check className="size-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="h-20" />
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={handleSubmit}
            className="w-full py-5 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg sm:text-xl hover:shadow-[0_20px_40px_rgba(236,72,153,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 group hind-siliguri-bold"
          >
            <Sparkles className="size-6 group-hover:rotate-12 transition-transform" />
            {t.startChatting}
          </motion.button>
        </div>
      </div>
    </div>
  );
}