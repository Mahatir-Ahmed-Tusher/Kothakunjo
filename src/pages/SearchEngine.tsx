import React, { useState } from 'react';
import { Search, Globe, Filter, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  timestamp: string;
}

const SearchEngine: React.FC = () => {
  const { language, font } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setShowSuggestions(false);

    // Use Render backend URL in production, fallback to localhost for development
    const backendUrl = process.env.NODE_ENV === 'production'
      ? 'https://kothakunjo-search-engine-backend.onrender.com/api/search'
      : 'http://localhost:8025/api/search';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, language: 'bn' }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const processedResults: SearchResult[] = [
        {
          id: '1',
          title: data.summary.split('\n')[0] || 'নির্দিষ্ট শিরোনাম নেই',
          url: data.sources[0] || '',
          snippet: data.summary.split('\n').slice(1).join('\n') || 'কোনো সারাংশ নেই',
          timestamp: 'সাম্প্রতিক',
        },
      ].filter(result => result.url); // Filter out results without URL

      setResults(processedResults.length > 0 ? processedResults : []);
    } catch {
      setError(getText('Failed to fetch results', 'ফলাফল আনতে ব্যর্থ'));
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const suggestions = [
    'বাংলাদেশের ইতিহাস',
    'চুকনগর গণহত্যা',
    'বঙ্গবন্ধু শেখ মুজিবুর রহমান',
    'জাতীয় সংগীত',
    'ঢাকা বিশ্ববিদ্যালয়',
  ];

  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            কথাকুঞ্জ সার্চ ইঞ্জিন
          </h1>
          
          <p className="text-xl text-purple-700 dark:text-purple-300 mb-8 max-w-2xl mx-auto">
            {getText(
              'Find accurate information in Bengali, powered by advanced AI technology',
              'উন্নত AI প্রযুক্তি দ্বারা চালিত বাংলায় নির্ভুল তথ্য খুঁজুন'
            )}
          </p>

          {/* Search Bar with Suggestions */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyPress={handleKeyPress}
                placeholder={getText('Search in Bengali...', 'বাংলায় সার্চ করুন...')}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white/80 dark:bg-purple-800/80 backdrop-blur-sm border border-purple-200/20 dark:border-purple-700/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-purple-800 dark:text-purple-200"
              />
            </div>
            {showSuggestions && (
              <div className="absolute z-20 w-full bg-white/90 dark:bg-purple-900/90 backdrop-blur-sm border border-purple-200/20 dark:border-purple-700/20 rounded-xl mt-1 shadow-lg">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(suggestion);
                      setShowSuggestions(false);
                      handleSearch();
                    }}
                    className="px-4 py-2 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={handleSearch}
              disabled={!query.trim() || isLoading}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? getText('Searching...', 'সার্চ করা হচ্ছে...') : getText('Search', 'সার্চ')}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-purple-600 dark:text-purple-400">
                  {getText('Searching for accurate results...', 'নির্ভুল ফলাফল খোঁজা হচ্ছে...')}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-200 dark:bg-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">{error}</h3>
                <p className="text-purple-600 dark:text-purple-400">
                  {getText('Please try again later', 'দয়া করে পরে আবার চেষ্টা করুন')}
                </p>
              </div>
            ) : (
              <>
                {/* Results Stats */}
                <div className="mb-6 text-purple-600 dark:text-purple-400">
                  <p>
                    {getText(
                      `About ${results.length} results found`,
                      `প্রায় ${results.length}টি ফলাফল পাওয়া গেছে`
                    )}
                  </p>
                </div>

                {/* Results List */}
                <div className="space-y-6">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="p-6 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-700/20 hover:bg-white/80 dark:hover:bg-purple-800/80 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                          {result.title}
                        </a>
                        <div className="flex items-center text-sm text-purple-500 dark:text-purple-400 ml-4">
                          <Clock className="w-4 h-4 mr-1" />
                          {result.timestamp}
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <Globe className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 dark:text-green-400">{result.url}</span>
                      </div>
                      
                      <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                        {result.snippet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {results.length === 0 && !error && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      {getText('No results found', 'কোনো ফলাফল পাওয়া যায়নি')}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400">
                      {getText('Try different keywords or check your spelling', 'ভিন্ন কীওয়ার্ড চেষ্টা করুন বা বানান পরীক্ষা করুন')}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Features */}
        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white/40 dark:bg-purple-800/40 backdrop-blur-sm rounded-2xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                {getText('Smart Search', 'স্মার্ট সার্চ')}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                {getText('AI-powered search understanding', 'AI চালিত সার্চ বোঝাপড়া')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/40 dark:bg-purple-800/40 backdrop-blur-sm rounded-2xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                {getText('Bengali Focus', 'বাংলা ফোকাস')}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                {getText('Optimized for Bengali content', 'বাংলা কন্টেন্টের জন্য অপ্টিমাইজড')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/40 dark:bg-purple-800/40 backdrop-blur-sm rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                {getText('Accurate Results', 'সঠিক ফলাফল')}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                {getText('Filtered and verified information', 'ফিল্টার করা এবং যাচাইকৃত তথ্য')}
              </p>
            </div>
          </div>
        )}

        {/* Unique Features Section */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto mt-16 p-6 bg-white/50 dark:bg-purple-800/50 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-700/20">
            <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
              {getText('Why Kothakunjo is Different', 'কথাকুঞ্জ কেন অন্যরকম')}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-purple-700 dark:text-purple-300">
              <li>{getText('Powered by advanced AI for precise Bengali results', 'উন্নত এআই প্রযুক্তি ব্যবহার করে সঠিক বাংলায় ফলাফল দেয়')}</li>
              <li>{getText('Customized for Bengali language and culture', 'বাংলা ভাষা ও সংস্কৃতির উপযোগী করে গড়ে তোলা হয়েছে')}</li>
              <li>{getText('Real-time translation and summarization', 'রিয়েল-টাইমে অনুবাদ ও সারাংশ তৈরি করে')}</li>
              <li>{getText('Focus on verified historical and cultural content', 'যাচাই করা ঐতিহাসিক ও সাংস্কৃতিক তথ্যকে গুরুত্ব দেয়')}</li>
              <li>{getText('User-friendly interface with contextual suggestions', 'সহজ ব্যবহারযোগ্য ইন্টারফেস, সঙ্গে প্রাসঙ্গিক পরামর্শ')}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;