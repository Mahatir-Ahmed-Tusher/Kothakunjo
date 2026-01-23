'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Send, Plus, LogIn, Sparkles, User, Bot, CheckCircle2, Copy, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PluginSelector } from '@/app/components/PluginSelector';
import { Character } from '@/app/page';
import { translations, Language } from '../../lib/translations';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion, Timestamp } from 'firebase/firestore';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  plugins?: string[];
  searchResults?: Array<{ title: string; link: string; snippet: string }>;
  generatedImage?: string;
  factCheck?: {
    verdict: string;
    report: string;
    sources: any[];
    claim: string;
  };
}

interface ChatInterfaceProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  character: Character;
  themeColors: any;
  isAyanabajiMode: boolean;
  chatId: number;
  chatTitle: string;
  onUpdateChatTitle: (title: string) => void;
}

export function ChatInterface({ character, themeColors, isAyanabajiMode, chatId, chatTitle, onUpdateChatTitle }: Omit<ChatInterfaceProps, 'isLoggedIn' | 'onLogin'>) {
  const { user, loginWithGoogle } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as Language];

  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPluginSelectorOpen, setIsPluginSelectorOpen] = useState(false);
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFactCheckProcessing, setIsFactCheckProcessing] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userConfig, setUserConfig] = useState<{ memory?: string, preference?: string } | null>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load messages from Firestore whenever chatId or user changes
  useEffect(() => {
    if (!isMounted || !user) return;

    const chatDocRef = doc(db, 'users', user.uid, 'chats', String(chatId));

    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.messages) {
          const messagesWithDates = data.messages.map((msg: any) => ({
            ...msg,
            timestamp: msg.timestamp instanceof Timestamp ? msg.timestamp.toDate() : new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        }
      } else {
        setMessages([]); // Ensure clean state for new chats
      }
    }, (error) => {
      console.error("Error loading chat from Firestore:", error);
      setMessages([]);
    });

    return () => unsubscribe();
  }, [chatId, isMounted, user]);

  // Load and sync user configuration (Memory & Preferences)
  useEffect(() => {
    if (!isMounted || !user) {
      setUserConfig(null);
      return;
    }

    const configDocRef = doc(db, 'users', user.uid, 'settings', 'userConfig');

    const unsubscribe = onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserConfig(docSnap.data());
      } else {
        setUserConfig({});
      }
    }, (error) => {
      console.warn("Firestore config sync error:", error);
      setUserConfig({});
    });

    return () => unsubscribe();
  }, [isMounted, user]);

  // Effect to automatically send pending message after login
  useEffect(() => {
    if (user && isLoginPending) {
      setIsLoginPending(false);
      const timeoutId = setTimeout(() => {
        handleSend();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [user, isLoginPending]);

  const allSuggestions = [
    { id: 'img', label: language === 'bn' ? 'ছবি জেনারেট' : 'Image Gen', icon: 'https://i.postimg.cc/d1FVzz9g/image.png', plugin: 'image-generation' },
    { id: 'fact', label: language === 'bn' ? 'ফ্যাক্টচেক' : 'Fact Check', icon: 'https://i.postimg.cc/xdDfzWBP/image.png', plugin: 'fact-check' },
    { id: 'know', label: language === 'bn' ? 'জানতে চাই' : 'I want to know', icon: 'https://i.postimg.cc/MHFxK4y7/image.png', prefix: language === 'bn' ? 'জানতে চাই: ' : 'I want to know: ' },
    { id: 'search', label: language === 'bn' ? 'সার্চ' : 'Search', icon: 'https://i.postimg.cc/k4MdN9sG/image.png', plugin: 'web-search' },
    { id: 'sum', label: language === 'bn' ? 'সারাংশ' : 'Summary', icon: 'https://i.postimg.cc/jqFrfp7S/image.png', prefix: language === 'bn' ? 'এটার সারাংশ বলো: ' : 'Tell me the summary: ' },
    { id: 'movie', label: language === 'bn' ? 'রিসেন্ট মুভি সাজেস্ট' : 'Recent Movies', icon: 'https://i.postimg.cc/d0wMvvbM/image.png', plugin: 'web-search' },
  ];

  const [activeSuggestions, setActiveSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (isMounted) {
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
      setActiveSuggestions(shuffled.slice(0, 3));
    }
  }, [isMounted, language]);

  const handleSuggestionClick = (s: any) => {
    if (s.plugin) {
      if (!selectedPlugins.includes(s.plugin)) {
        setSelectedPlugins([...selectedPlugins, s.plugin]);
      }
    }
    if (s.prefix) {
      setInput(s.prefix);
      textareaRef.current?.focus();
    }
  };

  // Save messages to Firestore whenever they change
  useEffect(() => {
    if (isMounted && user && messages.length > 1) {
      const saveMessages = async () => {
        try {
          const chatDocRef = doc(db, 'users', user.uid, 'chats', String(chatId));
          await setDoc(chatDocRef, {
            title: chatTitle,
            messages: messages.map(msg => {
              const sanitize = (obj: any): any => {
                if (Array.isArray(obj)) return obj.map(sanitize);
                if (obj !== null && typeof obj === 'object' && !(obj instanceof Date) && !(obj instanceof Timestamp)) {
                  return Object.fromEntries(
                    Object.entries(obj)
                      .filter(([_, v]) => v !== undefined)
                      .map(([k, v]) => [k, sanitize(v)])
                  );
                }
                return obj;
              };

              const sanitized = sanitize(msg);
              return {
                ...sanitized,
                timestamp: Timestamp.fromDate(msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp))
              };
            }),
            lastUpdated: Timestamp.now(),
            characterId: character.name,
          }, { merge: true });
        } catch (e) {
          console.error("Error saving chat to Firestore:", e);
        }
      };

      const timeoutId = setTimeout(saveMessages, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, chatId, isMounted, user, character.name]);

  const scrollToBottom = (force = false) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 150;

    if (force || isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!user) {
      setIsLoginPending(true);
      return;
    }

    if (messages.length <= 1) {
      try {
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input,
            isTitleGen: true,
            userConfig: userConfig
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.title) {
              onUpdateChatTitle(data.title.replace(/"/g, ''));
            }
          })
          .catch(err => console.error('Title gen error:', err));
      } catch (e) {
        console.error('Title generation failed', e);
      }
    }

    const userMessageTime = new Date();
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: userMessageTime,
      plugins: selectedPlugins.length > 0 ? selectedPlugins : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    const currentPlugins = [...selectedPlugins];
    setInput('');
    setIsLoading(true);

    setTimeout(() => scrollToBottom(true), 100);

    const factCheckTriggers = ["factcheck", "fact check", "verify", "ফ্যাক্টচেক", "যাচাই"];
    const isFactCheck = currentPlugins.includes('fact-check') || factCheckTriggers.some(t => currentInput.toLowerCase().includes(t.toLowerCase()));
    if (isFactCheck) setIsFactCheckProcessing(true);

    const imageTriggers = ["generate image", "create image", "ছবি বানাও", "জেনারেট"];
    const isImage = currentPlugins.includes('image-generation') || imageTriggers.some(t => currentInput.toLowerCase().includes(t.toLowerCase()));
    if (isImage) setIsImageProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map(msg => ({ role: msg.role, content: msg.content })),
          character: isAyanabajiMode ? character : undefined,
          plugins: currentPlugins,
          userConfig: userConfig
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response || (language === 'bn' ? 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।' : 'Sorry, I cannot respond at the moment.'),
        timestamp: new Date(),
        searchResults: data.searchResults,
        generatedImage: data.generatedImage || undefined,
        factCheck: data.factCheck || undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: language === 'bn' ? 'দুঃখিত, একটি ত্রুটি ঘটেছে।' : 'Sorry, an error occurred.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsFactCheckProcessing(false);
      setIsImageProcessing(false);
      setSelectedPlugins([]);
    }
  };

  const handleDownloadImage = useCallback((url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className={`flex-1 flex flex-col min-h-0 relative z-10 overflow-hidden ${character.theme === 'dinosaur' ? 'theme-dinosaur-active' : ''}`}>
      <AnimatePresence>
        {isLoginPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-white/20 backdrop-blur-md transition-all duration-500"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] border border-blue-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] max-w-sm w-full text-center mx-4"
            >
              <div className="relative size-20 mx-auto mb-6 drop-shadow-xl">
                <Image src="/kothakunjo_logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{language === 'bn' ? 'চালিয়ে যেতে গুগল লগইন করুন' : 'Login with Google to continue'}</h3>
              <p className="text-slate-500 text-sm mb-8 text-center">{language === 'bn' ? 'আপনার বার্তাটি সংরক্ষিত আছে, লগইন করার পরেই এটি আয়নাবাজির কাছে পৌঁছে যাবে।' : 'Your message is saved and will be sent to the character once you log in.'}</p>
              <button
                onClick={() => loginWithGoogle()}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${themeColors.gradient} text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all`}
              >
                <LogIn className="size-5" />
                {language === 'bn' ? 'গুগল দিয়ে লগইন' : 'Login with Google'}
              </button>
              <button
                onClick={() => setIsLoginPending(false)}
                className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest"
              >
                {language === 'bn' ? 'এখন নয়' : 'Not Now'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:py-8 custom-scrollbar overscroll-contain"
      >
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-10 w-full min-h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 sm:py-20 text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative size-16 sm:size-20 mx-auto transition-transform hover:scale-110 duration-500">
                  <Image src="/kothakunjo_logo.png" alt="Logo" fill className="object-contain drop-shadow-xl" />
                </div>
                <h2 className={`text-xl sm:text-3xl ${character.theme === 'punk-rock' ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'bn' ? 'আজকে আমার সাথে কী নিয়ে গপ্পো-সপ্পো করবেন?' : 'What would you like to chat about today?'}
                </h2>
              </motion.div>

              <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-4">
                {activeSuggestions.map((s) => (
                  <motion.button
                    key={s.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(s)}
                    className="flex flex-row items-center gap-2 py-2 px-3 transition-all text-left group"
                  >
                    <div className="size-8 sm:size-12 shrink-0 flex items-center justify-center transition-opacity">
                      <img src={s.icon} alt={s.label} className="size-full object-contain" />
                    </div>
                    <span className={`text-sm sm:text-lg font-semibold transition-colors ${character.theme === 'punk-rock' ? 'text-white' : 'text-slate-600'}`}>
                      {s.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <MessageList
                messages={messages}
                isAyanabajiMode={isAyanabajiMode}
                character={character}
                themeColors={themeColors}
                isMounted={isMounted}
                downloadImage={handleDownloadImage}
                isLoading={isLoading}
                isFactCheckProcessing={isFactCheckProcessing}
                isImageProcessing={isImageProcessing}
                language={language}
              />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="px-4 pb-6 pt-2 sm:px-6 sm:pb-8 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-end gap-2 sm:gap-4 bg-white border border-blue-100 p-2 sm:p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-[2.5rem] focus-within:ring-4 ring-blue-500/10 transition-all group relative">
            <div className="relative flex items-center shrink-0">
              <button
                onClick={() => setIsPluginSelectorOpen(!isPluginSelectorOpen)}
                className={`p-3 rounded-2xl text-blue-600 transition-all active:scale-95 flex flex-col items-center gap-1 ${isPluginSelectorOpen ? 'bg-blue-50 rotate-90' : 'bg-transparent'}`}
              >
                <Plus className="size-6" />
              </button>

              <PluginSelector
                isOpen={isPluginSelectorOpen}
                onClose={() => setIsPluginSelectorOpen(false)}
                selectedPlugins={selectedPlugins}
                onPluginToggle={(plugin) => {
                  if (selectedPlugins.includes(plugin)) {
                    setSelectedPlugins(selectedPlugins.filter(p => p !== plugin));
                  } else {
                    setSelectedPlugins([...selectedPlugins, plugin]);
                  }
                }}
              />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              {selectedPlugins.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2 px-2">
                  {selectedPlugins.map(p => {
                    let lbl = p;
                    if (p === 'web-search') lbl = t.webSearch;
                    else if (p === 'fact-check') lbl = t.factCheck;
                    else if (p === 'image-generation') lbl = t.imageGeneration;
                    else if (p === 'deep-search') lbl = t.deepSearch;

                    return (
                      <span key={p} className="group/tag inline-flex items-center gap-1 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase transition-colors">
                        {lbl}
                        <button
                          onClick={() => setSelectedPlugins(selectedPlugins.filter(id => id !== p))}
                          className="hover:text-blue-900 transition-colors p-0.5"
                        >
                          <X className="size-2.5" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t.typeMessage}
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none py-3 px-2 max-h-48 resize-none text-sm sm:text-base message-content-text"
              />
            </div>

            <div className="flex items-center gap-2 pr-1">
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-3.5 rounded-2xl bg-gradient-to-r ${themeColors.gradient} text-white shadow-lg transition-all active:scale-90 disabled:opacity-50 shrink-0`}
              >
                <Send className="size-5" />
              </button>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-slate-400 text-center font-bold uppercase tracking-widest px-4">
            {t.canMakeMistakes}
          </p>
        </div>
      </div>
    </div>
  );
}

const MessageItem = memo(({ message, isAyanabajiMode, character, themeColors, isMounted, downloadImage, language }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-4 w-full`}
    >
      {message.role === 'assistant' && (
        <div className={`shrink-0 size-8 sm:size-10 flex items-center justify-center text-xl relative overflow-hidden grayscale-[0.2] ${isAyanabajiMode && character.profilePicture && (character.profilePicture.startsWith('data:') || character.profilePicture.startsWith('http')) ? 'rounded-full' : ''}`}>
          {isAyanabajiMode ? (
            character.profilePicture && (character.profilePicture.startsWith('data:') || character.profilePicture.startsWith('http')) ? (
              <img src={character.profilePicture || undefined} alt={character.name} className="size-full object-cover" />
            ) : (
              character.profilePicture
            )
          ) : (
            <div className="relative size-full">
              <Image src="/kothakunjo_logo.png" alt="Logo" fill className="object-contain p-1" />
            </div>
          )}
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] break-words`}>
        <div
          className={`px-5 py-4 rounded-[1.5rem] shadow-xl break-words message-content-text ${message.role === 'user'
            ? `bg-gradient-to-br ${themeColors.gradient} text-white rounded-tr-none`
            : 'bg-white/90 text-slate-800 border border-blue-100/50 rounded-tl-none backdrop-blur-xl'
            }`}
        >
          <div className="prose prose-sm sm:prose-base max-w-none message-content-text dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {message.generatedImage && (
            <div className="mt-4 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-blue-100 shadow-inner group">
                <img src={message.generatedImage || undefined} alt="AI Generated" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => downloadImage(message.generatedImage!, `kothakunjo_ai_image_${message.id}.png`)}
                    className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold text-sm shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {language === 'bn' ? 'ডাউনলোড' : 'Download'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100/50 pt-2">
            <div className={`text-[10px] font-bold uppercase tracking-wider ${message.role === 'user' ? 'opacity-60 text-white' : 'text-blue-500/50'}`}>
              {isMounted ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            </div>

            {message.role === 'assistant' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(message.content);
                    alert(language === 'bn' ? 'কপি করা হয়েছে!' : 'Copied!');
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-all active:scale-90"
                >
                  <Copy className="size-3.5" />
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([message.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `kothakunjo_${message.id}.txt`;
                    link.click();
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-all active:scale-90"
                >
                  <Download className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const MessageList = memo(({ messages, isAyanabajiMode, character, themeColors, isMounted, downloadImage, isLoading, isFactCheckProcessing, isImageProcessing, language }: any) => {
  return (
    <AnimatePresence mode="popLayout">
      {messages.map((message: any) => (
        <MessageItem
          key={message.id}
          message={message}
          isAyanabajiMode={isAyanabajiMode}
          character={character}
          themeColors={themeColors}
          isMounted={isMounted}
          downloadImage={downloadImage}
          language={language}
        />
      ))}
      {isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className={`size-10 rounded-2xl bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center shadow-lg animate-pulse`}>
              <Bot className="size-5 text-white" />
            </div>
            <div className="px-6 py-4 bg-white/50 rounded-full flex gap-1 items-center">
              <span className="size-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="size-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="size-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
          {isFactCheckProcessing && (
            <div className="ml-14 text-xs font-bold text-blue-600/70 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50 w-fit">
              {language === 'bn' ? 'ফ্যাক্টচেক করা হচ্ছে...' : 'Fact checking in progress...'}
            </div>
          )}
          {isImageProcessing && (
            <div className="ml-14 text-xs font-bold text-pink-600/70 bg-pink-50/50 px-3 py-1.5 rounded-lg border border-pink-100/50 w-fit">
              {language === 'bn' ? 'ছবি তৈরি করা হচ্ছে...' : 'Generating image...'}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});