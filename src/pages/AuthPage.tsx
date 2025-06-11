import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const AuthPage: React.FC = () => {
  const { language, font } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                {isLogin ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              {isLogin ? getText('Welcome Back', 'স্বাগতম') : getText('Create Account', 'অ্যাকাউন্ট তৈরি করুন')}
            </h1>
            
            <p className="text-purple-600 dark:text-purple-400">
              {isLogin 
                ? getText('Sign in to continue to কথাকুঞ্জ', 'কথাকুঞ্জে চালিয়ে যেতে সাইন ইন করুন')
                : getText('Join the কথাকুঞ্জ community today', 'আজই কথাকুঞ্জ কমিউনিটিতে যোগ দিন')
              }
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white/80 dark:bg-purple-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/20 dark:border-purple-700/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                    {getText('Full Name', 'পূর্ণ নাম')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-purple-700/60 border border-purple-200/50 dark:border-purple-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-purple-800 dark:text-purple-200"
                      placeholder={getText('Enter your full name', 'আপনার পূর্ণ নাম লিখুন')}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                  {getText('Email Address', 'ইমেইল ঠিকানা')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-purple-700/60 border border-purple-200/50 dark:border-purple-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-purple-800 dark:text-purple-200"
                    placeholder={getText('Enter your email', 'আপনার ইমেইল লিখুন')}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                  {getText('Password', 'পাসওয়ার্ড')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/60 dark:bg-purple-700/60 border border-purple-200/50 dark:border-purple-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-purple-800 dark:text-purple-200"
                    placeholder={getText('Enter your password', 'আপনার পাসওয়ার্ড লিখুন')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                    {getText('Confirm Password', 'পাসওয়ার্ড নিশ্চিত করুন')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-purple-700/60 border border-purple-200/50 dark:border-purple-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-purple-800 dark:text-purple-200"
                      placeholder={getText('Confirm your password', 'আপনার পাসওয়ার্ড নিশ্চিত করুন')}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {isLogin ? getText('Sign In', 'সাইন ইন') : getText('Create Account', 'অ্যাকাউন্ট তৈরি করুন')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-8 text-center">
              <p className="text-purple-600 dark:text-purple-400">
                {isLogin 
                  ? getText("Don't have an account?", "অ্যাকাউন্ট নেই?")
                  : getText("Already have an account?", "ইতিমধ্যে অ্যাকাউন্ট আছে?")
                }
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200"
                >
                  {isLogin 
                    ? getText('Sign Up', 'সাইন আপ')
                    : getText('Sign In', 'সাইন ইন')
                  }
                </button>
              </p>
            </div>

            {/* Social Login Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-300 dark:border-purple-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 dark:bg-purple-800/80 text-purple-500 dark:text-purple-400">
                    {getText('Or continue with', 'অথবা চালিয়ে যান')}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-purple-300 dark:border-purple-600 rounded-xl shadow-sm bg-white/60 dark:bg-purple-700/60 text-sm font-medium text-purple-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-600 transition-colors duration-200">
                  <span className="text-lg">🔍</span>
                  <span className="ml-2">Google</span>
                </button>
                
                <button className="w-full inline-flex justify-center py-3 px-4 border border-purple-300 dark:border-purple-600 rounded-xl shadow-sm bg-white/60 dark:bg-purple-700/60 text-sm font-medium text-purple-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-600 transition-colors duration-200">
                  <span className="text-lg">📘</span>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="text-purple-600 dark:text-purple-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              ← {getText('Back to Home', 'হোমে ফিরে যান')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;