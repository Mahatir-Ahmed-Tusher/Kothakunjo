'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Send, Plus, LogIn, Sparkles, User, Bot, CheckCircle2, Copy, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PluginSelector } from '@/app/components/PluginSelector';
import { Character } from '@/app/page';
import { bn } from '@/lib/translations';
import Image from 'next/image';
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
  const { user, loginWithGoogle, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPluginSelectorOpen, setIsPluginSelectorOpen] = useState(false);
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFactCheckProcessing, setIsFactCheckProcessing] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

    // Use onSnapshot for real-time updates or just getDoc for initial load
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
      // Fail silently for user config, we'll just have no memory/prefs
      console.warn("Firestore config sync error:", error);
      setUserConfig({});
    });

    return () => unsubscribe();
  }, [isMounted, user]);

  // Effect to automatically send pending message after login
  useEffect(() => {
    if (user && isLoginPending) {
      setIsLoginPending(false);
      // We use a small timeout to ensure Firestore and other states are ready
      const timeoutId = setTimeout(() => {
        handleSend();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [user, isLoginPending]);

  const allSuggestions = [
    { id: 'img', label: 'ছবি জেনারেট', icon: 'https://i.postimg.cc/d1FVzz9g/image.png', plugin: 'image-generation' },
    { id: 'fact', label: 'ফ্যাক্টচেক', icon: 'https://i.postimg.cc/xdDfzWBP/image.png', plugin: 'fact-check' },
    { id: 'know', label: 'জানতে চাই', icon: 'https://i.postimg.cc/MHFxK4y7/image.png', prefix: 'জানতে চাই: ' },
    { id: 'search', label: 'সার্চ', icon: 'https://i.postimg.cc/k4MdN9sG/image.png', plugin: 'web-search' },
    { id: 'sum', label: 'সারাংশ', icon: 'https://i.postimg.cc/jqFrfp7S/image.png', prefix: 'এটার সারাংশ বলো: ' },
    { id: 'movie', label: 'রিসেন্ট মুভি সাজেস্ট', icon: 'https://i.postimg.cc/d0wMvvbM/image.png', plugin: 'web-search' },
  ];

  const [activeSuggestions, setActiveSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (isMounted) {
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
      setActiveSuggestions(shuffled.slice(0, 3));
    }
  }, [isMounted]);

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
              // Deeply remove undefined fields while preserving Firestore-compatible types
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
            characterId: character.name, // Link to character
          }, { merge: true });
        } catch (e) {
          console.error("Error saving chat to Firestore:", e);
        }
      };

      const timeoutId = setTimeout(saveMessages, 2000); // Debounce saves
      return () => clearTimeout(timeoutId);
    }
  }, [messages, chatId, isMounted, user, character.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Update title on first message using LLM
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

    const factCheckTriggers = [
      "ফ্যাক্টচেক করো", "ফ্যাক্টচেক", "ফ্যাক্ট চেক", "যাচাই করে জানাও", "fact check it",
      "factcheck it", "verify it", "ভেরিফাই করো", "ভেরিফাই কর", "ভ্যারিফাই করো",
      "ভ্যারিফাই কর", "সত্যি কীনা", "এই দাবিটা সত্যি কিনা", "is the claim true",
      "verify the claim", "এই দাবিটা যাচাই করো", "এই দাবিটা যাচাই কর"
    ];
    const isFactCheck = currentPlugins.includes('fact-check') || factCheckTriggers.some(t => currentInput.toLowerCase().includes(t.toLowerCase()));
    if (isFactCheck) setIsFactCheckProcessing(true);

    const imageTriggers = [
      "generate image", "ছবি বানাও", "ছবি জেনারেট করো", "generate pic", "generate an image",
      "generate a photo", "generate photo", "ছবি আঁকো", "ফটো বানাও", "জেনারেট কর",
      "জেনারেট করো", "জেনারেট করেন", "জেনারেট করুন", "আঁকো", "draw an image",
      "draw a photo", "make a photo", "make an image", "aako", "aak", "ako",
      "draw koro", "draw kro", "draw kor", "eke dao", "aika dao", "aika daw",
      "eke daw", "create an image", "ছবি বানান", "ছবি বানা"
    ];
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
      let generatedImageUrl = data.generatedImage || '';

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response || 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।',
        timestamp: new Date(),
        searchResults: data.searchResults,
        generatedImage: generatedImageUrl || undefined,
        factCheck: data.factCheck || undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'দুঃখিত, একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।',
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

  const onUpdateTitle = useCallback((title: string) => {
    onUpdateChatTitle(title);
  }, [onUpdateChatTitle]);
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
              <h3 className="text-2xl font-bold text-slate-800 mb-2 hind-siliguri-bold text-center">চালিয়ে যেতে গুগল লগইন করুন</h3>
              <p className="text-slate-500 text-sm mb-8 hind-siliguri-regular text-center">আপনার বার্তাটি সংরক্ষিত আছে, লগইন করার পরেই এটি আয়নাবাজির কাছে পৌঁছে যাবে।</p>
              <button
                onClick={() => loginWithGoogle()}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${themeColors.gradient} text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <LogIn className="size-5" />
                গুগল দিয়ে লগইন
              </button>
              <button
                onClick={() => setIsLoginPending(false)}
                className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest"
              >
                এখন নয়
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:py-8 custom-scrollbar overscroll-contain">
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
                <h2 className={`text-xl sm:text-3xl hind-siliguri-regular ${character.theme === 'punk-rock' ? 'text-white' : 'text-slate-800'}`}>
                  আজকে আমার সাথে কী নিয়ে গপ্পো-সপ্পো করবেন?
                </h2>
              </motion.div>

              <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-4">
                {activeSuggestions.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(s)}
                    className="flex flex-row items-center gap-2 py-2 px-3 transition-all text-left group"
                  >
                    <div className="size-8 sm:size-12 shrink-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <img src={s.icon} alt={s.label} className="size-full object-contain" />
                    </div>
                    <span className={`text-sm sm:text-lg font-semibold transition-colors hind-siliguri-medium ${character.theme === 'punk-rock' ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'}`}>
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
              />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 pt-2 sm:px-6 sm:pb-8 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-end gap-2 sm:gap-4 bg-white border border-blue-100 p-2 sm:p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-[2.5rem] focus-within:ring-4 ring-blue-500/10 transition-all group relative">
            <div className="relative flex items-center shrink-0">
              <button
                onClick={() => setIsPluginSelectorOpen(!isPluginSelectorOpen)}
                className={`p-3 rounded-2xl hover:bg-blue-50 text-blue-600 transition-all active:scale-95 flex flex-col items-center gap-1 ${isPluginSelectorOpen ? 'bg-blue-50 rotate-90' : ''}`}
                title="প্লাগইন বিকল্পগুলি"
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
                  {selectedPlugins.map(p => (
                    <span key={p} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">
                      {p}
                    </span>
                  ))}
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
                placeholder={bn.typeMessage}
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 outline-none py-3 px-2 max-h-48 resize-none hind-siliguri-regular text-sm sm:text-base message-content-text"
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

          <p className="text-[10px] sm:text-xs text-slate-400 text-center font-bold uppercase tracking-widest hind-siliguri-medium px-4">
            {bn.canMakeMistakes}
          </p>
        </div>
      </div>
    </div>
  );
}

const MessageItem = memo(({ message, isAyanabajiMode, character, themeColors, isMounted, downloadImage }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ willChange: 'transform, opacity' }}
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
              <Image
                src="/kothakunjo_logo.png"
                alt="Logo"
                fill
                className="object-contain p-1"
              />
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
          <div className="prose prose-sm sm:prose-base max-w-none hind-siliguri-regular dark:prose-invert message-content-text">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt, ...props }) => {
                  if (!src) return null;
                  return <img src={src} alt={alt || 'Image'} {...props} />;
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Generated AI Image */}
          {message.generatedImage && (
            <div className="mt-4 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-blue-100 shadow-inner group">
                <img
                  src={message.generatedImage || undefined}
                  alt="AI Generated"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => downloadImage(message.generatedImage!, `kothakunjo_ai_image_${message.id}.png`)}
                    className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold text-sm shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="size-4 rotate-45" /> Download
                  </button>
                </div>
              </div>
              <button
                onClick={() => downloadImage(message.generatedImage!, `kothakunjo_ai_image_${message.id}.png`)}
                className="w-full sm:hidden py-3 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <Plus className="size-4 rotate-45" /> Download Image
              </button>
            </div>
          )}

          {/* Search Results References */}
          {message.searchResults && message.searchResults.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-100">
              <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">
                🔍 Search References
              </div>
              <div className="space-y-2">
                {message.searchResults.map((result: any, index: number) => (
                  <a
                    key={index}
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-lg bg-blue-50/50 hover:bg-blue-100/70 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 size-5 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-blue-900 group-hover:text-blue-600 transition-colors line-clamp-1 message-content-text">
                          {result.title}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 message-content-text">
                          {result.link ? new URL(result.link).hostname : ''}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Fact Check Results */}
          {message.factCheck && (
            <div className="mt-4 pt-4 border-t border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-blue-600" /> Fact Check
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${message.factCheck.verdict === 'true' ? 'bg-green-100 text-green-700' :
                  message.factCheck.verdict === 'false' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                  {message.factCheck.verdict}
                </div>
              </div>
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 shadow-inner">
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Claim:</div>
                <div className="text-sm font-medium text-slate-700 mb-3 italic message-content-text">"{message.factCheck.claim}"</div>
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Analysis:</div>
                <div className="prose prose-xs text-slate-600 leading-relaxed hind-siliguri-regular message-content-text">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.factCheck.report}
                  </ReactMarkdown>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200/50 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
                  Fact checked by <a href="https://khoj-bd.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">khoj</a>
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
                    alert('কপি করা হয়েছে!');
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                  title="কপি করুন"
                >
                  <Copy className="size-3.5" />
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([message.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `kothakunjo_response_${message.id}.txt`;
                    link.click();
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                  title="ডাউনলোড করুন"
                >
                  <Download className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {message.role === 'user' && (
        <div className="shrink-0 size-0" />
      )}
    </motion.div>
  );
});

const MessageList = memo(({ messages, isAyanabajiMode, character, themeColors, isMounted, downloadImage, isLoading, isFactCheckProcessing, isImageProcessing }: any) => {
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
        />
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-4">
            <div className={`size-10 rounded-2xl bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center shadow-lg ring-4 ring-white/50 animate-pulse`}>
              <Bot className="size-5 text-white" />
            </div>
            <div className="px-6 py-4 bg-white/50 rounded-full flex gap-1 items-center">
              <span className="size-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="size-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="size-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
          {isFactCheckProcessing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-14 text-xs font-bold text-blue-600/70 hind-siliguri-medium bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50 w-fit"
            >
              আপনি ফ্যাক্টচেক করতে চেয়েছেন, তাই একটু দাঁড়ান, ফ্যাক্টচেক করে নিই
            </motion.div>
          )}
          {isImageProcessing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-14 text-xs font-bold text-pink-600/70 hind-siliguri-medium bg-pink-50/50 px-3 py-1.5 rounded-lg border border-pink-100/50 w-fit"
            >
              আপনার জন্য কথাকুঞ্জ ছবি বানাচ্ছে...
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});