import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

const BlogPage: React.FC = () => {
  const { language, font } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: getText('The Future of AI in Bengali Language Processing', 'বাংলা ভাষা প্রক্রিয়াকরণে AI এর ভবিষ্যৎ'),
      excerpt: getText(
        'Exploring how artificial intelligence is revolutionizing Bengali language understanding and processing capabilities.',
        'কৃত্রিম বুদ্ধিমত্তা কীভাবে বাংলা ভাষা বোঝা এবং প্রক্রিয়াকরণের ক্ষমতায় বিপ্লব আনছে তা অন্বেষণ করা।'
      ),
      content: getText(
        'Artificial Intelligence has made remarkable strides in natural language processing, and Bengali language processing is no exception...',
        'কৃত্রিম বুদ্ধিমত্তা প্রাকৃতিক ভাষা প্রক্রিয়াকরণে উল্লেখযোগ্য অগ্রগতি করেছে, এবং বাংলা ভাষা প্রক্রিয়াকরণও এর ব্যতিক্রম নয়...'
      ),
      author: getText('Dr. Rahman', 'ড. রহমান'),
      date: getText('March 15, 2024', '১৫ মার্চ, ২০২ৄ'),
      readTime: getText('5 min read', '৫ মিনিট পড়া'),
      category: getText('Technology', 'প্রযুক্তি'),
      tags: ['AI', 'Bengali', 'NLP'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: getText('Building Inclusive AI: A Bengali Perspective', 'অন্তর্ভুক্তিমূলক AI তৈরি: একটি বাংলা দৃষ্টিভঙ্গি'),
      excerpt: getText(
        'How we can create AI systems that truly understand and serve the Bengali-speaking community worldwide.',
        'আমরা কীভাবে এমন AI সিস্টেম তৈরি করতে পারি যা সত্যিকারের বিশ্বব্যাপী বাংলা ভাষী সম্প্রদায়কে বুঝে এবং সেবা করে।'
      ),
      content: getText(
        'Creating inclusive AI systems requires understanding cultural nuances, linguistic patterns, and community needs...',
        'অন্তর্ভুক্তিমূলক AI সিস্টেম তৈরি করতে সাংস্কৃতিক সূক্ষ্মতা, ভাষাগত প্যাটার্ন এবং সম্প্রদায়ের প্রয়োজন বোঝা প্রয়োজন...'
      ),
      author: getText('Fatima Khan', 'ফাতিমা খান'),
      date: getText('March 10, 2024', '১০ মার্চ, ২০২৪'),
      readTime: getText('7 min read', '৭ মিনিট পড়া'),
      category: getText('Research', 'গবেষণা'),
      tags: ['Inclusion', 'Community', 'AI Ethics'],
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: getText('কথাকুঞ্জ: Behind the Scenes', 'কথাকুঞ্জ: পর্দার আড়ালে'),
      excerpt: getText(
        'A deep dive into the development process and technical challenges of building কথাকুঞ্জ.',
        'কথাকুঞ্জ তৈরির উন্নয়ন প্রক্রিয়া এবং প্রযুক্তিগত চ্যালেঞ্জগুলির গভীর বিশ্লেষণ।'
      ),
      content: getText(
        'Building কথাকুঞ্জ involved numerous technical challenges, from language model training to user interface design...',
        'কথাকুঞ্জ তৈরিতে ভাষা মডেল প্রশিক্ষণ থেকে ব্যবহারকারী ইন্টারফেস ডিজাইন পর্যন্ত অসংখ্য প্রযুক্তিগত চ্যালেঞ্জ জড়িত ছিল...'
      ),
      author: getText('Development Team', 'ডেভেলপমেন্ট টিম'),
      date: getText('March 5, 2024', '৫ মার্চ, ২০২৪'),
      readTime: getText('10 min read', '১০ মিনিট পড়া'),
      category: getText('Development', 'ডেভেলপমেন্ট'),
      tags: ['Development', 'Technical', 'Behind the Scenes'],
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: getText('The Impact of AI on Bengali Literature', 'বাংলা সাহিত্যে AI এর প্রভাব'),
      excerpt: getText(
        'Exploring how artificial intelligence is changing the landscape of Bengali literature and creative writing.',
        'কৃত্রিম বুদ্ধিমত্তা কীভাবে বাংলা সাহিত্য এবং সৃজনশীল লেখার ল্যান্ডস্কেপ পরিবর্তন করছে তা অন্বেষণ করা।'
      ),
      content: getText(
        'AI tools are becoming increasingly sophisticated in understanding and generating Bengali literature...',
        'AI টুলগুলি বাংলা সাহিত্য বোঝা এবং তৈরি করার ক্ষেত্রে ক্রমশ আরও পরিশীলিত হয়ে উঠছে...'
      ),
      author: getText('Prof. Nasir Ahmed', 'প্রফেসর নাসির আহমেদ'),
      date: getText('February 28, 2024', '২৮ ফেব্রুয়ারি, ২০২৪'),
      readTime: getText('6 min read', '৬ মিনিট পড়া'),
      category: getText('Literature', 'সাহিত্য'),
      tags: ['Literature', 'Creative Writing', 'AI'],
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const categories = [
    { id: 'all', name: getText('All', 'সব') },
    { id: 'technology', name: getText('Technology', 'প্রযুক্তি') },
    { id: 'research', name: getText('Research', 'গবেষণা') },
    { id: 'development', name: getText('Development', 'ডেভেলপমেন্ট') },
    { id: 'literature', name: getText('Literature', 'সাহিত্য') }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            {getText('কথাকুঞ্জ Blog', 'কথাকুঞ্জ ব্লগ')}
          </h1>
          <p className="text-xl text-purple-600 dark:text-purple-300 max-w-3xl mx-auto leading-relaxed">
            {getText(
              'Insights, updates, and stories from the world of Bengali AI and technology',
              'বাংলা AI এবং প্রযুক্তির জগত থেকে অন্তর্দৃষ্টি, আপডেট এবং গল্প'
            )}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getText('Search articles...', 'আর্টিকেল খুঁজুন...')}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-purple-800/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-purple-800 dark:text-purple-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/60 dark:bg-purple-800/60 text-purple-700 dark:text-purple-300 hover:bg-white/80 dark:hover:bg-purple-800/80 border border-purple-200/50 dark:border-purple-700/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white/80 dark:bg-purple-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-purple-200/20 dark:border-purple-700/20 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-purple-500 dark:text-purple-400 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-purple-600 dark:text-purple-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-400 text-xs rounded-lg"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button className="group/btn flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300">
                  {getText('Read More', 'আরও পড়ুন')}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
              {getText('No articles found', 'কোনো আর্টিকেল পাওয়া যায়নি')}
            </h3>
            <p className="text-purple-600 dark:text-purple-400">
              {getText('Try adjusting your search or filter criteria', 'আপনার সার্চ বা ফিল্টার মানদণ্ড সামঞ্জস্য করার চেষ্টা করুন')}
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {getText('Stay Updated', 'আপডেট থাকুন')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {getText(
              'Subscribe to our newsletter to get the latest articles and updates from কথাকুঞ্জ',
              'কথাকুঞ্জ থেকে সর্বশেষ আর্টিকেল এবং আপডেট পেতে আমাদের নিউজলেটার সাবস্ক্রাইব করুন'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={getText('Enter your email', 'আপনার ইমেইল লিখুন')}
              className="flex-1 px-4 py-3 rounded-xl text-purple-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
              {getText('Subscribe', 'সাবস্ক্রাইব')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;