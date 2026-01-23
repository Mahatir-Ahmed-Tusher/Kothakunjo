'use client';

import { useState, useEffect } from 'react';
import { ChatInterface } from '@/app/components/ChatInterface';
import { Sidebar } from '@/app/components/Sidebar';
import { SettingsPanel } from '@/app/components/SettingsPanel';
import { Navbar } from '@/app/components/Navbar';
import { CharacterCreation } from '@/app/components/CharacterCreation';
import { SplashScreen } from '@/app/components/SplashScreen';
import { AboutModal } from '@/app/components/AboutModal';
import { useAuth } from '@/app/context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import { translations, Language } from '../lib/translations';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

export interface Character {
    name: string;
    profilePicture: string;
    gender: 'female' | 'male' | 'other';
    role: string;
    age: string;
    history: string;
    relationship: string;
    theme: 'default' | 'wallflower' | 'punk-rock' | 'okay-boomer' | 'dinosaur';
}

export default function Home() {
    const { user, loginWithGoogle, logout } = useAuth();
    const { language } = useLanguage();
    const t = translations[language as Language];

    const isLoggedIn = !!user;
    const [showSplash, setShowSplash] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'chat' | 'character-creation'>('chat');
    const [isAyanabajiMode, setIsAyanabajiMode] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<'default' | 'wallflower' | 'punk-rock' | 'okay-boomer' | 'dinosaur'>('default');
    const [currentFont, setCurrentFont] = useState<'hind' | 'tiro'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('kothakunjo_font');
            return (saved === 'tiro' ? 'tiro' : 'hind');
        }
        return 'hind';
    });

    const [character, setCharacter] = useState<Character>({
        name: t.defaultCharName,
        profilePicture: 'https://i.postimg.cc/5tCmPFPZ/image.png',
        gender: 'other',
        role: t.defaultCharRole,
        age: t.defaultCharAge,
        history: t.defaultCharHistory,
        relationship: t.defaultCharRelationship,
        theme: 'default'
    });

    const [chatHistory, setChatHistory] = useState<{ id: number; title: string; date: string }[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('kothakunjo_history');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [activeChat, setActiveChat] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('kothakunjo_active_chat');
            return saved ? parseInt(saved) : (chatHistory.length > 0 ? chatHistory[0].id : Date.now());
        }
        return Date.now();
    });

    // Unified Cloud Sync: Fetch history from Firestore when user logs in
    useEffect(() => {
        if (user) {
            const fetchCloudHistory = async () => {
                try {
                    const chatsRef = collection(db, 'users', user.uid, 'chats');
                    const q = query(chatsRef, orderBy('lastUpdated', 'desc'));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const cloudHistory = querySnapshot.docs.map(doc => {
                            const data = doc.data();
                            const lastUpdated = data.lastUpdated instanceof Timestamp ? data.lastUpdated.toDate() : new Date();

                            // Simple date formatting for the sidebar
                            const now = new Date();
                            const isToday = lastUpdated.toDateString() === now.toDateString();
                            const dateLabel = isToday ? t.today : lastUpdated.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US');

                            return {
                                id: parseInt(doc.id),
                                title: data.title || t.newChat,
                                date: dateLabel
                            };
                        });

                        // Merge cloud history with local history, favoring cloud for existing IDs
                        setChatHistory(prev => {
                            const combined = [...cloudHistory];
                            prev.forEach(localChat => {
                                if (!combined.find(c => c.id === localChat.id)) {
                                    combined.push(localChat);
                                }
                            });
                            const sorted = combined.sort((a, b) => b.id - a.id);

                            // Switch to most recent cloud chat on first login
                            if (cloudHistory.length > 0 && activeChat !== cloudHistory[0].id) {
                                setActiveChat(cloudHistory[0].id);
                            }

                            return sorted;
                        });
                    }
                } catch (error) {
                    console.error("Error fetching cloud history:", error);
                }
            };
            fetchCloudHistory();
        }
    }, [user, language]);

    // Initialize first chat if history is empty
    useEffect(() => {
        if (chatHistory.length === 0) {
            const initialId = Date.now();
            const initialChat = { id: initialId, title: language === 'bn' ? 'নতুন চ্যাট' : 'New Chat', date: language === 'bn' ? 'আজ' : 'Today' };
            setChatHistory([initialChat]);
            setActiveChat(initialId);
            localStorage.setItem('kothakunjo_history', JSON.stringify([initialChat]));
            localStorage.setItem('kothakunjo_active_chat', initialId.toString());
        }
    }, [language]);

    // Save history, active chat and font to localStorage
    useEffect(() => {
        localStorage.setItem('kothakunjo_history', JSON.stringify(chatHistory));
        localStorage.setItem('kothakunjo_active_chat', activeChat.toString());
        localStorage.setItem('kothakunjo_font', currentFont);
    }, [chatHistory, activeChat, currentFont]);

    const getThemeColors = () => {
        const theme = isAyanabajiMode ? character.theme : currentTheme;
        switch (theme) {
            case 'wallflower':
                return {
                    primary: 'from-pink-50 via-purple-50 to-lavender-100',
                    navbar: 'bg-pink-100/60',
                    gradient: 'from-pink-500 to-purple-600',
                    text: 'text-pink-900',
                    blur: 'bg-pink-400',
                    border: 'border-pink-200/50'
                };
            case 'punk-rock':
                return {
                    primary: 'from-gray-900 via-green-950 to-emerald-950',
                    navbar: 'bg-gray-900/80',
                    gradient: 'from-green-600 to-emerald-700',
                    text: 'text-green-100',
                    blur: 'bg-green-600',
                    border: 'border-green-700/50'
                };
            case 'okay-boomer':
                return {
                    primary: 'from-gray-50 via-slate-50 to-zinc-100',
                    navbar: 'bg-white/80',
                    gradient: 'from-gray-600 to-slate-700',
                    text: 'text-gray-900',
                    blur: 'bg-gray-300',
                    border: 'border-gray-200/50'
                };
            case 'dinosaur':
                return {
                    primary: 'from-amber-50 via-yellow-50 to-lime-100',
                    navbar: 'bg-amber-100/60',
                    gradient: 'from-amber-600 to-orange-600',
                    text: 'text-amber-900',
                    blur: 'bg-amber-400',
                    border: 'border-amber-300/50'
                };
            default:
                return {
                    primary: 'from-blue-50 via-cyan-50 to-sky-100',
                    navbar: 'bg-white/60',
                    gradient: 'from-blue-500 to-cyan-600',
                    text: 'text-blue-900',
                    blur: 'bg-blue-400',
                    border: 'border-blue-200/50'
                };
        }
    };

    const themeColors = getThemeColors();

    const handleDeleteChat = async (id: number) => {
        const newHistory = chatHistory.filter(chat => chat.id !== id);
        setChatHistory(newHistory);
        localStorage.removeItem(`kothakunjo_messages_${id}`);

        // Sync deletion to cloud if logged in
        if (user) {
            try {
                await deleteDoc(doc(db, 'users', user.uid, 'chats', String(id)));
            } catch (error) {
                console.error("Error deleting chat from cloud:", error);
            }
        }

        if (activeChat === id) {
            if (newHistory.length > 0) {
                setActiveChat(newHistory[0].id);
            } else {
                const newId = Date.now();
                const initialChat = { id: newId, title: language === 'bn' ? 'নতুন চ্যাট' : 'New Chat', date: language === 'bn' ? 'আজ' : 'Today' };
                setChatHistory([initialChat]);
                setActiveChat(newId);
            }
        }
    };

    const handleDeleteAllChats = () => {
        // Clear all message stores from localStorage
        chatHistory.forEach(chat => {
            localStorage.removeItem(`kothakunjo_messages_${chat.id}`);
        });

        const newId = Date.now();
        const initialChat = { id: newId, title: language === 'bn' ? 'নতুন চ্যাট' : 'New Chat', date: language === 'bn' ? 'আজ' : 'Today' };
        setChatHistory([initialChat]);
        setActiveChat(newId);
    };

    const handleRenameChat = async (id: number, newTitle: string) => {
        setChatHistory(prev => prev.map(chat =>
            chat.id === id ? { ...chat, title: newTitle } : chat
        ));

        // Sync rename to cloud if logged in
        if (user) {
            try {
                const chatDocRef = doc(db, 'users', user.uid, 'chats', String(id));
                await updateDoc(chatDocRef, {
                    title: newTitle,
                    lastUpdated: Timestamp.now()
                });
            } catch (error) {
                console.error("Error renaming chat in cloud:", error);
            }
        }
    };

    const activeTheme = isAyanabajiMode ? character.theme : currentTheme;

    return (
        <div className={`h-dvh w-full flex flex-col bg-gradient-to-br ${themeColors.primary} overflow-hidden ${currentFont === 'tiro' ? 'font-tiro-active tiro-bangla-regular' : 'hind-siliguri-regular'} ${activeTheme === 'dinosaur' ? 'theme-dinosaur-active' : ''}`}>
            {/* Splash Screen (Mobile Only) */}
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

            {/* Background texture */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }} />
            </div>
            <div className="fixed inset-0 backdrop-blur-[40px] pointer-events-none opacity-40">
                <div className={`absolute top-20 left-10 w-96 h-96 ${themeColors.blur} rounded-full blur-3xl`} />
                <div className={`absolute bottom-20 right-10 w-96 h-96 ${themeColors.blur} rounded-full blur-3xl`} />
                <div className={`absolute top-1/2 left-1/2 w-96 h-96 ${themeColors.blur} rounded-full blur-3xl`} />
            </div>

            {currentView === 'chat' && (
                <div className="flex flex-col h-full flex-1">
                    <Navbar
                        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                        isLoggedIn={isLoggedIn}
                        onLogout={logout}
                        character={character}
                        themeColors={themeColors}
                        isKinnoriMode={isAyanabajiMode}
                    />

                    <main className="flex-1 flex flex-col min-h-0 relative overflow-x-hidden">
                        <Sidebar
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            chatHistory={chatHistory}
                            activeChat={activeChat}
                            onChatSelect={(id: number) => {
                                setActiveChat(id);
                                setIsSidebarOpen(false);
                            }}
                            onNewChat={() => {
                                const newId = Date.now();
                                setChatHistory([{ id: newId, title: language === 'bn' ? 'নতুন চ্যাট' : 'New Chat', date: language === 'bn' ? 'আজ' : 'Today' }, ...chatHistory]);
                                setActiveChat(newId);
                                setIsSidebarOpen(false);
                            }}
                            onOpenSettings={() => {
                                setIsSettingsOpen(true);
                                setIsSidebarOpen(false);
                            }}
                            onOpenAbout={() => {
                                setIsAboutOpen(true);
                                setIsSidebarOpen(false);
                            }}
                            onOpenCharacterCreation={() => {
                                setCurrentView('character-creation');
                                setIsSidebarOpen(false);
                            }}
                            isLoggedIn={isLoggedIn}
                            onLogout={logout}
                            isKinnoriMode={isAyanabajiMode}
                            onToggleAyanabajiMode={() => setIsAyanabajiMode(!isAyanabajiMode)}
                            onDeleteChat={handleDeleteChat}
                            onDeleteAllChats={handleDeleteAllChats}
                            onRenameChat={handleRenameChat}
                        />

                        <ChatInterface
                            character={isAyanabajiMode ? character : { ...character, name: language === 'bn' ? 'কথাকুঞ্জ' : 'KothaKunjo', theme: currentTheme }}
                            themeColors={themeColors}
                            isAyanabajiMode={isAyanabajiMode}
                            chatId={activeChat}
                            chatTitle={chatHistory.find(c => c.id === activeChat)?.title || (language === 'bn' ? 'নতুন চ্যাট' : 'New Chat')}
                            onUpdateChatTitle={(title: string) => {
                                setChatHistory(prev => prev.map(c => c.id === activeChat ? { ...c, title } : c));
                            }}
                        />

                        <SettingsPanel
                            isOpen={isSettingsOpen}
                            onClose={() => setIsSettingsOpen(false)}
                            currentTheme={currentTheme}
                            onThemeChange={setCurrentTheme}
                            currentFont={currentFont}
                            onFontChange={setCurrentFont}
                            isAyanabajiMode={isAyanabajiMode}
                            onOpenAbout={() => {
                                setIsAboutOpen(true);
                                setIsSettingsOpen(false);
                            }}
                        />

                        <AboutModal
                            isOpen={isAboutOpen}
                            onClose={() => setIsAboutOpen(false)}
                        />
                    </main>
                </div>
            )}

            {currentView === 'character-creation' && (
                <CharacterCreation
                    character={character}
                    onSave={(newCharacter: Character) => {
                        setCharacter(newCharacter);
                        setIsAyanabajiMode(true);
                        setCurrentView('chat');
                    }}
                    onBack={() => setCurrentView('chat')}
                    themeColors={themeColors}
                />
            )}
        </div>
    );
}
