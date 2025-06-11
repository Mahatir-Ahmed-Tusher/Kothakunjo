import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, X, Plus, Copy, Download, Check, Settings, Menu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: string[];
  isLoading?: boolean;
  error?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  titleBn?: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

interface Settings {
  temperature: number;
  responsePreference: string;
}

// Markdown formatting utility
const formatMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">$1</a>')
    .replace(/\n/g, '<br>')
    .replace(/#{1,6}\s*/g, '')
    .replace(/\*{3,}/g, '');
};

// Create numbered/bulleted lists
const formatLists = (text: string): string => {
  const lines = text.split('\n');
  let formatted = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (/^\d+\.\s/.test(line)) {
      if (!inList) {
        formatted += '<ol class="list-decimal list-inside ml-4 space-y-1">';
        inList = true;
      }
      formatted += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
    }
    else if (/^[-*]\s/.test(line)) {
      if (!inList) {
        formatted += '<ul class="list-disc list-inside ml-4 space-y-1">';
        inList = true;
      }
      formatted += `<li>${line.replace(/^[-*]\s/, '')}</li>`;
    }
    else {
      if (inList) {
        formatted += '</ol></ul>';
        inList = false;
      }
      if (line) formatted += line + '\n';
    }
  }
  
  if (inList) {
    formatted += '</ol></ul>';
  }
  
  return formatted;
};

const ChatPage: React.FC = () => {
  const { language, font } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'New Chat',
      titleBn: 'নতুন চ্যাট',
      lastMessage: '',
      timestamp: new Date(),
      messages: [],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({ temperature: 0.7, responsePreference: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || conversations[0];

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const suggestions = [
    getText('What is artificial intelligence?', 'কৃত্রিম বুদ্ধিমত্তা কী জিনিস?'),
    getText('Tell me about Bangladesh', 'তুমি কে? তোমার পরিচয় দাও'),
    getText('How to learn programming?', 'প্রোগ্রামিং কীভাবে শিখবো?'),
    getText('Write a poem in Bengali', 'জীবনানন্দ টাইপ একটা কবিতা লিখে ফেলো দেখি'),
    getText('Explain quantum physics', 'আমাকে কোয়ান্টাম ফিজিক্স এমন ভাবে বুঝাও যেন আমি ১১ বছরের বাচ্চা'),
    getText('Help me with my studies', 'তোমার সাথে ক্যাজুয়ালিই আড্ডা দিতে চাই'),
  ];

  const SYSTEM_PROMPT = `You are KothaKunjo (কথাকুঞ্জ), a friendly and intelligent Bengali AI assistant developed by Bangladeshis. You are here to chat in Bengali about literature, science, history, technology, studies, and any other topics. You can communicate in both Bengali and English, but you have a special affinity for Bengali language and culture. You are knowledgeable, helpful, and always ready for meaningful conversations. Please provide well-formatted responses using markdown when appropriate. If the user ask any question in english then respond in english, if the users ask any question in bengali, then respond in bengali. Remember, you are a bengali chatbot. Response preference: ${settings.responsePreference || 'Provide clear, concise, and accurate answers.'}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages]);

  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Handle sidebar dragging and resizing
  const handleMouseDown = () => {
    if (!isMobile) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && sidebarRef.current && isMobile) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= window.innerWidth * 0.8) {
        setSidebarWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleCreateNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      titleBn: 'নতুন আলাপ',
      lastMessage: '',
      timestamp: new Date(),
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
    if (isMobile) setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    const remainingConversations = conversations.filter(conv => conv.id !== id);
    setConversations(remainingConversations);
    
    if (activeConversationId === id) {
      if (remainingConversations.length > 0) {
        setActiveConversationId(remainingConversations[0].id);
      } else {
        handleCreateNewConversation();
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: `temp-${Date.now()}`,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              title: conv.messages.length === 0 ? inputText.slice(0, 30) : conv.title,
              titleBn: conv.messages.length === 0 ? inputText.slice(0, 30) : conv.titleBn,
              messages: [...conv.messages, userMessage, loadingMessage],
              lastMessage: inputText,
              timestamp: new Date(),
            }
          : conv
      )
    );

    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...activeConversation.messages.map(msg => ({ 
          role: msg.sender === 'user' ? 'user' : 'assistant', 
          content: msg.text 
        })),
        { role: 'user', content: currentInput },
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': encodeURIComponent('https://kothakunjo.com'),
          'X-Title': encodeURIComponent('কথাকুঞ্জ'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: messages,
          temperature: settings.temperature,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const botMessage = data.choices[0]?.message?.content || getText('Sorry, no response received.', 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।');

      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages.filter(msg => !msg.isLoading),
                  { id: `m${Date.now()}`, text: botMessage, sender: 'bot', timestamp: new Date() },
                ],
              }
            : conv
        )
      );
    } catch (error) {
      console.error('API Error:', error);
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages.filter(msg => !msg.isLoading),
                  {
                    id: `m${Date.now()}`,
                    text: getText('Error: Could not connect to the AI service.', 'ত্রুটি: এআই পরিষেবার সাথে সংযোগ করা যায়নি।'),
                    sender: 'bot',
                    timestamp: new Date(),
                    error: true,
                  },
                ],
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      const userMessage: Message = {
        id: Date.now().toString(),
        text: getText('Uploaded files:', 'আপলোড করা ফাইল:') + ' ' + fileNames.join(', '),
        sender: 'user',
        timestamp: new Date(),
        attachments: fileNames,
      };

      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, userMessage], lastMessage: userMessage.text, timestamp: new Date() }
            : conv
        )
      );

      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      // eslint-disable-next-line no-irregular-whitespace
      const plainText = text.replace(/<[^>]*>/g, '').replace(/ /g, ' ');
      await navigator.clipboard.writeText(plainText);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadAsText = (text: string, messageId: string) => {
    // eslint-disable-next-line no-irregular-whitespace
    const plainText = text.replace(/<[^>]*>/g, '').replace(/ /g, ' ');
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kothakunjo-response-${messageId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSettingsSave = (newSettings: Settings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} relative bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 text-base`}
    >
      <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-900/10 backdrop-blur-sm"></div>
      
      <div className="relative flex h-screen">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              ref={sidebarRef}
              initial={{ x: isMobile ? -sidebarWidth : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -sidebarWidth : 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`${isMobile ? 'fixed' : 'relative'} h-full bg-purple-100/95 dark:bg-purple-800/95 backdrop-blur-lg z-50 lg:z-0 border-r border-purple-300/50 dark:border-purple-600/50 shadow-lg glow-effect`}
              style={{ width: isMobile ? sidebarWidth : 320 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-purple-300/50 dark:border-purple-600/50">
                <h2 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {getText('Conversations', 'কথোপকথন')}
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-purple-200/50 dark:hover:bg-purple-700/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-purple-700 dark:text-purple-200" />
                </button>
              </div>

              <div className="p-4">
                <button
                  onClick={handleCreateNewConversation}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 rounded-xl transition-all duration-300 text-white font-semibold shadow-md glow-button"
                >
                  <Plus className="w-5 h-5" />
                  {getText('New Chat', 'নতুন আলাপ')}
                </button>
              </div>

              <div className="px-2 pb-2">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-purple-200/40 dark:hover:bg-purple-700/40 transition-all duration-300"
                >
                  <Settings className="w-4 h-4 text-purple-700 dark:text-purple-200" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {getText('Settings', 'সেটিংস')}
                  </span>
                </button>
              </div>

              <div className="px-2 pb-4 space-y-2 overflow-y-auto h-[calc(100%-180px)]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group px-3 py-3 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-300 ${
                      activeConversationId === conv.id 
                        ? 'bg-purple-300/50 dark:bg-purple-600/50 shadow-md' 
                        : 'hover:bg-purple-200/40 dark:hover:bg-purple-700/40'
                    }`}
                    onClick={() => {
                      setActiveConversationId(conv.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-200 flex-shrink-0" />
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100 truncate">
                        {conv.titleBn ? getText(conv.title, conv.titleBn) : conv.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-purple-700 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {isMobile && (
                <div
                  className="absolute top-0 right-0 w-2 h-full bg-purple-400/50 dark:bg-purple-600/50 cursor-ew-resize"
                  onMouseDown={handleMouseDown}
                />
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white dark:bg-purple-800/95 backdrop-blur-lg p-6 rounded-2xl max-w-md w-full mx-4 shadow-xl glow-effect"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100">
                    {getText('Settings', 'সেটিংস')}
                  </h2>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-purple-200/50 dark:hover:bg-purple-700/50 rounded-lg"
                  >
                    <X className="w-5 h-5 text-purple-700 dark:text-purple-200" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      {getText('Creativity Level', 'সৃজনশীলতার মাত্রা')}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-purple-700 dark:text-purple-300 mt-1">
                      <span>{getText('Accurate', 'নির্ভুল')}</span>
                      <span>{getText('Creative', 'সৃজনশীল')}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      {getText('Response Preference', 'যেমন উত্তর চান')}
                    </label>
                    <textarea
                      value={settings.responsePreference}
                      onChange={(e) => setSettings({ ...settings, responsePreference: e.target.value })}
                      placeholder={getText('How would you like the responses to be? (e.g., concise, detailed)', 'আপনি উত্তরগুলো কীভাবে চান? (যেমন, সংক্ষিপ্ত, বিস্তারিত)')}
                      className="w-full p-3 bg-purple-100/90 dark:bg-purple-700/80 border border-purple-300/50 dark:border-purple-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-900 dark:text-purple-100"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-300 dark:hover:bg-purple-600"
                  >
                    {getText('Cancel', 'বাতিল')}
                  </button>
                  <button
                    onClick={() => handleSettingsSave(settings)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 glow-button"
                  >
                    {getText('Save', 'সংরক্ষণ করুন')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <header className="flex items-center justify-between p-4 bg-purple-100/95 dark:bg-purple-800/95 backdrop-blur-lg border-b border-purple-300/50 dark:border-purple-600/50 shadow-sm glow-effect">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-purple-200/50 dark:hover:bg-purple-700/50 rounded-lg transition-colors glow-button"
              >
                <Menu className="w-5 h-5 text-purple-700 dark:text-purple-200" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    {getText('KothaKunjo', 'কথাকুঞ্জ')}
                  </h1>
                </div>
              </div>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-gradient-to-b from-purple-200/50 to-purple-300/50 dark:from-purple-800/50 dark:to-purple-900/50">
            {activeConversation.messages.length === 0 && (
              <div className="relative">
                {/* Fixed Logo Container */}
                <div className="pt-20"></div> {/* Added padding to create space between the navbar and welcome texts */}
                {/* Content below logo with padding */}
                <div className="pt-48"> {/* Increased padding to account for fixed logo */}
                  <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                      {getText('Welcome to KothaKunjo!', 'কথাকুঞ্জে স্বাগতম!')}
                    </h2>
                    <p className="text-purple-700 dark:text-purple-200 mb-6 text-lg max-w-md">
                      {getText(
                        'Your intelligent Bengali AI assistant, ready to chat about literature, science, history, technology, and studies.',
                        'কথাকুঞ্জ আপনার আড্ডার সঙ্গী। সাহিত্য, বিজ্ঞান, ইতিহাস, প্রযুক্তি কিংবা পড়াশুনা- যেকোনো বিষয়ে আপনার মাতৃভাষায় কথা বলুন'
                      )}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="p-4 bg-purple-100/90 dark:bg-purple-700/90 backdrop-blur-md rounded-xl text-left hover:bg-purple-200/90 dark:hover:bg-purple-600/90 transition-all duration-300 border border-purple-300/50 dark:border-purple-600/50 hover:scale-105 hover:shadow-lg glow-button"
                        >
                          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div
                  className={`max-w-[85%] lg:max-w-[70%] px-4 py-3 rounded-2xl relative group shadow-md glow-effect ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
                      : message.error
                      ? 'bg-red-100/80 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200/50 dark:border-red-800/50 backdrop-blur-md'
                      : 'bg-white/90 dark:bg-purple-950/90 backdrop-blur-md text-purple-900 dark:text-purple-100 border border-purple-300/50 dark:border-purple-600/50'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex space-x-2 py-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="text-sm leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: formatLists(formatMarkdown(message.text))
                        }}
                      />
                      {message.sender === 'bot' && !message.isLoading && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => copyToClipboard(message.text, message.id)}
                            className="p-1.5 bg-purple-200/50 dark:bg-purple-700/50 hover:bg-purple-300/50 dark:hover:bg-purple-600/50 rounded-md transition-colors shadow-sm glow-button"
                            title={getText('Copy', 'কপি করুন')}
                          >
                            {copiedMessageId === message.id ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-purple-700 dark:text-purple-200" />
                            )}
                          </button>
                          <button
                            onClick={() => downloadAsText(message.text, message.id)}
                            className="p-1.5 bg-purple-200/50 dark:bg-purple-700/50 hover:bg-purple-300/50 dark:hover:bg-purple-600/50 rounded-md transition-colors shadow-sm glow-button"
                            title={getText('Download', 'ডাউনলোড করুন')}
                          >
                            <Download className="w-3 h-3 text-purple-700 dark:text-purple-200" />
                          </button>
                        </div>
                      )}
                      {message.attachments && (
                        <div className="mt-2 text-xs opacity-75">
                          {getText('Attachments:', 'সংযুক্তি:')} {message.attachments.join(', ')}
                        </div>
                      )}
                      <div className={`text-xs mt-2 opacity-75`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-purple-100/95 dark:bg-purple-800/95 backdrop-blur-lg border-t border-purple-300/50 dark:border-purple-600/50 shadow-sm glow-effect">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept="image/*,application/pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleFileUpload}
                  className="p-3 bg-purple-200/90 dark:bg-purple-700/90 hover:bg-purple-300/90 dark:hover:bg-purple-600/90 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-sm glow-button"
                >
                  <Paperclip className="w-5 h-5 text-purple-700 dark:text-purple-200" />
                </button>

                <div className="flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={getText('Type your message...', 'কী লিখতে চান লিখে ফেলুন...')}
                    className="w-full p-4 pr-12 bg-purple-100/90 dark:bg-purple-700/80 backdrop-blur-md border border-purple-300/50 dark:border-purple-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none max-h-32 text-purple-900 dark:text-purple-100 placeholder-purple-600 dark:placeholder-purple-300 transition-all duration-200 shadow-sm"
                    rows={1}
                    style={{
                      minHeight: '52px',
                      height: 'auto',
                    }}
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-white dark:disabled:bg-purple-700/90 text-white rounded-full transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 shadow-md glow-button"
                >
                  <img
                  src="/assets/send.png" 
                  alt="Send"
                  className="w-5 h-5"
                  onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // 1x1 transparent pixel as fallback
                  }}
                  />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Sidebar Toggle Button (Visible when Sidebar is Closed) */}
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setSidebarOpen(true)}
            className="fixed top-16 left-4 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 glow-button"
            style={{ width: '36px', height: '36px' }}
          >
            <Menu className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Inline CSS for Glow Effect */}
      <style>{`
        .glow-effect {
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2);
        }
        .glow-button:hover {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5), 0 0 25px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ChatPage;