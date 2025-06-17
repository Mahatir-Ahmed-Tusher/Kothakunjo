import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import SearchEngine from './pages/SearchEngine';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import BlogPage from './pages/BlogPage';
import BlogPostInclusiveAI from './pages/blog/BlogPostInclusiveAI';
import BlogPostAIProcessing from './pages/blog/BlogPostAIProcessing';
import BlogPostAILiterature from './pages/blog/BlogPostAILiterature';
import BlogPostKathaKunj from './pages/blog/BlogPostKathaKunj';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/search" element={<SearchEngine />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Placeholder route for future blog posts */}
            <Route path="/blog/BlogPostInclusiveAI" element={<BlogPostInclusiveAI />} />
            <Route path="/blog/BlogPostAIProcessing" element={<BlogPostAIProcessing />} />
            <Route path="/blog/BlogPostAILiterature" element={<BlogPostAILiterature />} />
            <Route path="/blog/BlogPostKathaKunj" element={<BlogPostKathaKunj />} />
            
            {/* Catch-all route for 404 Not Found */}
            {/* Placeholder routes for footer links */}
            <Route path="/privacy" element={<div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950"><div className="text-center"><h1 className="text-4xl font-bold text-purple-800 dark:text-purple-200 mb-4">Privacy Policy</h1><p className="text-purple-600 dark:text-purple-400">Coming Soon</p></div></div>} />
            <Route path="/terms" element={<div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950"><div className="text-center"><h1 className="text-4xl font-bold text-purple-800 dark:text-purple-200 mb-4">Terms of Service</h1><p className="text-purple-600 dark:text-purple-400">Coming Soon</p></div></div>} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;