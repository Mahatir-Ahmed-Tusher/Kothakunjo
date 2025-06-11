import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  font: 'hind-siliguri' | 'solaiman-lipi';
  setFont: (font: 'hind-siliguri' | 'solaiman-lipi') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'bn'>('bn');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [font, setFont] = useState<'hind-siliguri' | 'solaiman-lipi'>('hind-siliguri');

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') as 'en' | 'bn' | null;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedFont = localStorage.getItem('font') as 'hind-siliguri' | 'solaiman-lipi' | null;

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setTheme(savedTheme);
    if (savedFont) setFont(savedFont);

    // Apply theme to document
    document.documentElement.className = savedTheme || 'light';
  }, []);

  const handleLanguageChange = (lang: 'en' | 'bn') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const handleFontChange = (newFont: 'hind-siliguri' | 'solaiman-lipi') => {
    setFont(newFont);
    localStorage.setItem('font', newFont);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        theme,
        setTheme: handleThemeChange,
        font,
        setFont: handleFontChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};