import React from 'react';
import { Globe, Palette, Type, Moon, Sun, Monitor } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const SettingsPage: React.FC = () => {
  const { language, setLanguage, theme, setTheme, font, setFont } = useApp();

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const SettingCard: React.FC<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }> = ({ title, description, icon: Icon, children }) => (
    <div className="p-6 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-700/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">{title}</h3>
          <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {getText('Settings', 'সেটিংস')}
          </h1>
          <p className="text-purple-600 dark:text-purple-300">
            {getText('Customize your কথাকুঞ্জ experience', 'আপনার কথাকুঞ্জ অভিজ্ঞতা কাস্টমাইজ করুন')}
          </p>
        </div>

        {/* Settings */}
        <div className="space-y-8">
          {/* Language Settings */}
          <SettingCard
            title={getText('Language', 'ভাষা')}
            description={getText('Choose your preferred language', 'আপনার পছন্দের ভাষা বেছে নিন')}
            icon={Globe}
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage('bn')}
                className={`p-3 rounded-xl text-left transition-all duration-200 ${
                  language === 'bn'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="font-semibold">বাংলা</div>
                <div className="text-sm opacity-75">Bengali</div>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl text-left transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="font-semibold">English</div>
                <div className="text-sm opacity-75">ইংরেজি</div>
              </button>
            </div>
          </SettingCard>

          {/* Theme Settings */}
          <SettingCard
            title={getText('Theme', 'থিম')}
            description={getText('Choose your preferred color scheme', 'আপনার পছন্দের রঙের স্কিম বেছে নিন')}
            icon={Palette}
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                  theme === 'light'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <Sun className="w-5 h-5" />
                <div>
                  <div className="font-semibold">{getText('Light', 'হালকা')}</div>
                  <div className="text-sm opacity-75">{getText('Bright theme', 'উজ্জ্বল থিম')}</div>
                </div>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                  theme === 'dark'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <Moon className="w-5 h-5" />
                <div>
                  <div className="font-semibold">{getText('Dark', 'গাঢ়')}</div>
                  <div className="text-sm opacity-75">{getText('Dark theme', 'অন্ধকার থিম')}</div>
                </div>
              </button>
            </div>
          </SettingCard>

          {/* Font Settings */}
          <SettingCard
            title={getText('Bengali Font', 'বাংলা ফন্ট')}
            description={getText('Choose your preferred Bengali font', 'আপনার পছন্দের বাংলা ফন্ট বেছে নিন')}
            icon={Type}
          >
            <div className="space-y-3">
              <button
                onClick={() => setFont('hind-siliguri')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  font === 'hind-siliguri'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="font-semibold mb-1">Hind Siliguri</div>
                <div className="text-lg font-hind">আমি বাংলায় গান গাই</div>
                <div className="text-sm opacity-75 mt-1">
                  {getText('Modern and clean Bengali font', 'আধুনিক এবং পরিষ্কার বাংলা ফন্ট')}
                </div>
              </button>
              
              <button
                onClick={() => setFont('solaiman-lipi')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  font === 'solaiman-lipi'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500'
                    : 'bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="font-semibold mb-1">Solaiman Lipi</div>
                <div className="text-lg font-solaiman">আমি বাংলায় গান গাই</div>
                <div className="text-sm opacity-75 mt-1">
                  {getText('Traditional Bengali font style', 'ঐতিহ্যবাহী বাংলা ফন্ট স্টাইল')}
                </div>
              </button>
            </div>
          </SettingCard>

          {/* Preview Section */}
          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl border border-purple-200/20 dark:border-purple-700/20">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
              {getText('Preview', 'প্রিভিউ')}
            </h3>
            <div className="p-4 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-xl border border-purple-200/20 dark:border-purple-700/20">
              <p className="text-purple-800 dark:text-purple-200 leading-relaxed">
                {getText(
                  'This is how your text will appear with the current settings. কথাকুঞ্জ makes AI accessible for everyone.',
                  'বর্তমান সেটিংসের সাথে আপনার টেক্সট এভাবে দেখাবে। কথাকুঞ্জ সবার জন্য AI কে সহজলভ্য করে তোলে।'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Save Notice */}
        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-xl text-center">
          <p className="text-sm">
            {getText(
              '✓ Settings are automatically saved',
              '✓ সেটিংস স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;