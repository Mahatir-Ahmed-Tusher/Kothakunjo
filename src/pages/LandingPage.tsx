import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Search, Sparkles, Globe, Shield, ArrowRight, ExternalLink, Settings, FileText, Info, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const LandingPage: React.FC = () => {
  const { language, font } = useApp();

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const features = [
  {
    icon: MessageCircle,
    title: getText('Smart Conversations', 'বুদ্ধিদৃপ্ত আলাপচারিতা'),
    description: getText(
      'Engage in natural conversations in Bengali with our advanced AI',
      'আমাদের উন্নত AI-এর সঙ্গে সহজ ও স্বতঃস্ফূর্ত বাংলায় কথোপকথনে অংশ নিন'
    ),
    color: 'from-pink-500 to-rose-600'
  },
  {
    icon: Search,
    title: getText('AI Search Engine', 'এআই পাওয়ার্ড সার্চ ইঞ্জিন'),
    description: getText(
      'Get accurate search results in Bengali, powered by AI',
      'আমাদের কৃত্রিম বুদ্ধিমত্তা দিয়ে বাংলায় খুঁজে পান দ্রুত ও নির্ভুল ফলাফল'
    ),
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Globe,
    title: getText('Multilingual Support', 'একাধিক ভাষার সাপোর্ট'),
    description: getText(
      'Switch seamlessly between English and Bengali',
      'ইংরেজি ও বাংলার মধ্যে অনায়াসে ভাষা পরিবর্তন করুন'
    ),
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Shield,
    title: getText('Secure & Private', 'নিরাপদ ও ব্যক্তিগত'),
    description: getText(
      'Your data is protected with enterprise-grade security',
      'আপনার তথ্য থাকছে এন্টারপ্রাইজ-মানের নিরাপত্তায় সম্পূর্ণ সুরক্ষিত'
    ),
    color: 'from-purple-500 to-indigo-600'
  }
];



  const socialLinks = [
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/r/kothakunjo/?share_id=ewt7dK_np9-4lBgMwCrBd&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1',
      color: 'from-orange-500 to-red-600',
      icon: <img src="https://i.postimg.cc/vZJfJpHg/image.png" alt="Reddit Icon" className="w-6 h-6" />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/kothakunjo',
      color: 'from-blue-500 to-cyan-600',
      icon: <img src="https://i.postimg.cc/13VDnrJN/image.png" alt="Telegram Icon" className="w-6 h-6" />
    },
    {
      name: 'Discord',
      url: 'https://discord.com/invite/GHUkTejd',
      color: 'from-indigo-500 to-purple-600',
      icon: <img src="https://i.postimg.cc/c463rsvt/image.png" alt="Discord Icon" className="w-6 h-6" />
    }
  ];

  const footerLinks = [
    {
      title: getText('Quick Links', 'দ্রুত লিংক'),
      links: [
        { name: getText('Chat', 'চ্যাট'), href: '/chat', icon: MessageCircle },
        { name: getText('Search', 'সার্চ'), href: '/search', icon: Search },
        { name: getText('Blog', 'ব্লগ'), href: '/blog', icon: BookOpen },
        { name: getText('About Us', 'আমাদের সম্পর্কে'), href: '/about', icon: Info },
      ]
    },
    {
      title: getText('Settings & Support', 'সেটিংস ও সমর্থন'),
      links: [
        { name: getText('Settings', 'সেটিংস'), href: '/settings', icon: Settings },
        { name: getText('Privacy Policy', 'গোপনীয়তা নীতি'), href: '/privacy', icon: Shield },
        { name: getText('Terms of Service', 'সেবার শর্তাবলী'), href: '/terms', icon: FileText },
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-purple-950 dark:to-indigo-950 overflow-hidden`}>
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-4">
        {/* Blurry Background Image */}
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/63CYx4qJ/pngegg.png')] bg-cover bg-center opacity-10 blur-md pointer-events-none"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Hero Content */}
            <div className="mb-0">
            <img 
              src="/assets/logo.png"
              alt="কথাকুঞ্জ"
              className="h-24 md:h-24 mx-auto mb-10"
            />
            <div className="space-y-6 mb-10">
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-semibold text-gray-800 dark:text-gray-200 ${fontClass}`}>
                <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {getText(
                'From literature to science, history to technology — কথাকুঞ্জ is here to chat with you on any topic, along with our AI-powered search engine',
                'সাহিত্য থেকে বিজ্ঞান, ইতিহাস থেকে প্রযুক্তি — যে কোন বিষয়ে আড্ডা দিতে আপনার সাথেই আছে কথাকুঞ্জ, সাথে ব্যবহার করুন আমাদের এআই ভিত্তিক সার্চ ইঞ্জিন'
                )}
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
              to="/chat"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 flex items-center gap-3 animate-pulse hover:animate-none glow-effect"
              >
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              {getText('Get Started', 'কথা শুরু করুন')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <style>
                {`
                .glow-effect {
                box-shadow: 0 0 5px rgba(128, 90, 213, 0.6), 0 0 10px rgba(128, 90, 213, 0.4), 0 0 15px rgba(128, 90, 213, 0.2);
                }
                .glow-effect:hover {
                box-shadow: 0 0 10px rgba(128, 90, 213, 0.8), 0 0 20px rgba(128, 90, 213, 0.6), 0 0 30px rgba(128, 90, 213, 0.4);
                }
                `}
              </style>
              
              <Link
              to="/search"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 flex items-center gap-3"
              >
              <Search className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
              কথাকুঞ্জ সার্চ ইঞ্জিন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* How to Start Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white/70 dark:bg-purple-900/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-purple-200/30 dark:border-purple-700/30">
              <div className="text-4xl font-bold text-orange-600 mb-2">১</div>
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">বিষয় বাছাই</h3>
              <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                সাহিত্য, বিজ্ঞান, ইতিহাস - যে কোন বিষয়ে কথা বলতে পারেন। কেবল খোশগল্পের জন্যেও দ্বারস্থ হতে পারেন কথাকুঞ্জের কাছে।
              </p>
              </div>
              <div className="p-6 bg-white/70 dark:bg-purple-900/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-purple-200/30 dark:border-purple-700/30">
              <div className="text-4xl font-bold text-pink-600 mb-2">২</div>
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">প্রশ্ন করুন</h3>
              <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                আপনার মনের কথা, জিজ্ঞাসা বা কৌতূহল নিয়ে প্রশ্ন করুন। কথাকুঞ্জ সর্বদা আপনার পাশে আছে।
              </p>
              </div>
              <div className="p-6 bg-white/70 dark:bg-purple-900/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-purple-200/30 dark:border-purple-700/30">
              <div className="text-4xl font-bold text-blue-600 mb-2">৩</div>
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">জ্ঞান সংরক্ষণ</h3>
              <p className="text-purple-600 dark:text-purple-300 leading-relaxed">
                আপনার উত্তর পেয়ে যাওয়ার পর ডক ফাইল আকারে সংরক্ষণ করুন। নতুন কিছু শিখুন, জানুন, বুঝুন।
              </p>
              </div>
            </div>
            </div>
        </div>
      </div>

      {/* Features Section */}
      
      <div className="py-20 px-4 bg-gradient-to-r from-white/60 to-purple-50/60 dark:from-purple-900/30 dark:to-violet-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent ${fontClass}`}>
              {getText('Powerful Features', 'কথাকুঞ্জের অনন্যতা')}
            </h2>
            <p className={`text-xl text-purple-700 dark:text-purple-300 max-w-3xl mx-auto ${fontClass}`}>
              {getText('Discover what makes কথাকুঞ্জ the perfect AI companion for Bengali speakers', 'দেখে নেয়া যাক, বাংলা এআই হিসেবে কথাকুঞ্জের বিশেষত্ব কী কী')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white/80 dark:bg-purple-900/50 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl border border-purple-200/50 dark:border-purple-700/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-200 mb-4 ${fontClass}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-purple-600 dark:text-purple-300 leading-relaxed ${fontClass}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <a
        href="https://drive.google.com/file/d/1K0Ws07l8TEqvhAKk3sRjyCF5I-3dSaaH/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
          >
        <img
          src="/assets/download app.png"
          alt="Download কথাকুঞ্জ Android App"
          className="w-full max-w-5xl mx-auto"
        />
          </a>
          <a
        href="https://drive.google.com/file/d/1K0Ws07l8TEqvhAKk3sRjyCF5I-3dSaaH/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8"
          >
        <button
          className={`px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40 focus:outline-none focus:ring-4 focus:ring-pink-300 relative glow-download-btn ${fontClass}`}
          style={{
            boxShadow:
          "0 0 16px 4px rgba(236, 72, 153, 0.4), 0 0 32px 8px rgba(139, 92, 246, 0.2)",
          }}
        >
          <span className="drop-shadow-lg">
            {language === 'en' ? 'Download' : 'ডাউনলোড'}
          </span>
        </button>
        <style>
          {`
            .glow-download-btn {
          box-shadow: 0 0 16px 4px rgba(236, 72, 153, 0.4), 0 0 32px 8px rgba(139, 92, 246, 0.2);
            }
            .glow-download-btn:hover {
          box-shadow: 0 0 32px 8px rgba(236, 72, 153, 0.6), 0 0 48px 16px rgba(139, 92, 246, 0.3);
            }
          `}
        </style>
          </a>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-purple-200/60 to-pink-200/60 dark:from-purple-900/40 dark:to-violet-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${fontClass}`}>
            {getText('Join Our Community', 'যুক্ত হোন আপনিও')}
          </h2>
          <p className={`text-xl text-purple-700 dark:text-purple-300 mb-12 max-w-2xl mx-auto ${fontClass}`}>
            {getText(
              'Connect with fellow কথাকুঞ্জ users, share experiences, and stay updated with the latest features',
              'একা একা-ই কথাকুঞ্জের সাথে আড্ডা দেবেন, তা কী করে হয়? যুক্ত হোন আপনার মতো আরও কথাকুঞ্জ বন্ধুদের সাথে পৃথিবীর নানান প্রান্ত থেকে।'
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 px-8 py-4 bg-gradient-to-r ${social.color} text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${fontClass}`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{social.icon}</span>
                {social.name}
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className={`text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${fontClass}`}>
                  কথাকুঞ্জ
                </span>
              </div>
              <p className={`text-purple-200 leading-relaxed mb-6 ${fontClass}`}>
                {getText(
                  'Your intelligent Bengali AI assistant, making artificial intelligence accessible for everyone.',
                  'বাংলা ভাষাভাষীদের জন্য বিশেষভাবে তৈরি, আপনার যেকোনো প্রশ্নের দ্রুত ও বুদ্ধিমত্তাপূর্ণ উত্তর দেওয়ার AI বন্ধু।'
                )}
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-800 hover:bg-purple-700 rounded-xl flex items-center justify-center transition-colors duration-200"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className={`text-xl font-bold text-purple-200 mb-6 ${fontClass}`}>{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => {
                    const Icon = link.icon;
                    return (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className={`flex items-center justify-center md:justify-start gap-3 text-purple-300 hover:text-white transition-colors duration-200 group ${fontClass}`}
                        >
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-purple-700 mt-12 pt-8 text-center">
            <p className={`text-purple-300 ${fontClass}`}>
              © 2025 কথাকুঞ্জ. {getText('All rights reserved.', 'সকল অধিকার সংরক্ষিত।')}
            </p>
            <p className={`text-purple-400 text-sm mt-2 ${fontClass}`}>
              {getText(
                'Made with ❤️ for the Bengali community',
                'আ-মরি বাংলা ভাষা'
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;