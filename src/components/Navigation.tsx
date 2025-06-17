import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Search, Info, Settings, Menu, X, Sun, Moon, Globe, LogIn, BookOpen, Home } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Navigation: React.FC = () => {
  const { language, setLanguage, theme, setTheme, font } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const navItems = [
    { 
      to: '/', 
      icon: Home, 
      label: getText('Home', 'হোম'),
      isActive: location.pathname === '/'
    },
    { 
      to: '/chat', 
      icon: MessageCircle, 
      label: getText('Chat', 'চ্যাট'),
      isActive: location.pathname === '/chat'
    },
    { 
      to: '/search', 
      icon: Search, 
      label: getText('Search', 'সার্চ'),
      isActive: location.pathname === '/search'
    },
    { 
      to: '/blog', 
      icon: BookOpen, 
      label: getText('Blog', 'ব্লগ'),
      isActive: location.pathname === '/blog'
    },
    { 
      to: '/about', 
      icon: Info, 
      label: getText('About', 'সম্পর্কে'),
      isActive: location.pathname === '/about'
    },
    { 
      to: '/settings', 
      icon: Settings, 
      label: getText('Settings', 'সেটিংস'),
      isActive: location.pathname === '/settings'
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-purple-900/90 backdrop-blur-xl border-b border-purple-200/30 dark:border-purple-700/30 shadow-lg ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
              কথাকুঞ্জ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    item.isActive
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 shadow-md'
                      : 'text-purple-700 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 rounded-xl hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40 transition-all duration-300 shadow-md"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'বাং' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl hover:from-yellow-200 hover:to-orange-200 dark:hover:from-yellow-800/40 dark:hover:to-orange-800/40 transition-all duration-300 shadow-md"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="text-sm font-medium">{theme === 'light' ? getText('Dark', 'গাঢ়') : getText('Light', 'হালকা')}</span>
            </button>

            {/* Login Button */}
            <Link
              to="/auth"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-medium">{getText('Login', 'লগইন')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-200/30 dark:border-purple-700/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    item.isActive
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400'
                      : 'text-purple-700 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Controls */}
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-purple-200/30 dark:border-purple-700/30">
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 rounded-xl"
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{language === 'en' ? 'বাংলা' : 'English'}</span>
              </button>
              
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="font-medium">{theme === 'light' ? getText('Dark Mode', 'গাঢ় মোড') : getText('Light Mode', 'হালকা মোড')}</span>
              </button>
              
              <Link
                to="/auth"
                className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">{getText('Login', 'লগইন')}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;