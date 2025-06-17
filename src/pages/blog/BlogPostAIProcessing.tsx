import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const BlogPostAIProcessing: React.FC = () => {
  const { language, font } = useApp();
  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const author = getText('Dr. Rahman', 'ড. রহমান');
  const date = getText('March 15, 2024', '১৫ মার্চ, ২০২৪');
  const readTime = getText('5 min read', '৫ মিনিট পড়া');
  const category = getText('Technology', 'প্রযুক্তি');
  const tags = ['AI', 'Bengali', 'NLP', 'Language Technology'];

  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white/80 dark:bg-purple-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-200/20 dark:border-purple-700/20 p-8">
          {/* Category */}
          <div className="mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-full">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-200 mb-6">
            {getText(
              'The Future of AI in Bengali Language Processing',
              'বাংলা ভাষা প্রক্রিয়াকরণে AI এর ভবিষ্যৎ'
            )}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-purple-500 dark:text-purple-400 mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-400 text-xs rounded-lg"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-purple dark:prose-invert max-w-none text-purple-600 dark:text-purple-400 leading-relaxed">
            <p>
              {getText(
                'Bengali is one of the world’s richest languages, spoken by over 300 million people as their native tongue. Yet, its role in technological advancements has remained limited. However, artificial intelligence (AI) is rapidly changing this landscape. In particular, advances in Natural Language Processing (NLP) have ushered in a new era for Bengali language processing.',
                'বাংলা বিশ্বের অন্যতম সমৃদ্ধ ভাষা—প্রায় ৩০ কোটিরও বেশি মানুষের মাতৃভাষা। অথচ প্রযুক্তির অগ্রগতিতে বাংলা ভাষার ভূমিকা এখনও সীমিত। তবে, AI তথা কৃত্রিম বুদ্ধিমত্তা দ্রুত সেই চিত্র পাল্টে দিচ্ছে। বিশেষ করে Natural Language Processing (NLP) এর অগ্রগতির ফলে বাংলা ভাষা প্রক্রিয়াকরণে এক নতুন যুগের সূচনা হয়েছে।'
              )}
            </p>

            <h2>
              {getText(
                'Why is NLP a Challenge for Bengali?',
                'কেন বাংলা ভাষায় NLP একটি চ্যালেঞ্জ?'
              )}
            </h2>
            <p>
              {getText(
                'Bengali is a highly precise and grammatically rich language. Its morphology (word formation), syntax (sentence structure), and semantics (meaning) are extremely complex. Additionally, the following factors pose challenges for AI models to accurately learn and understand Bengali:',
                'বাংলা একটি অত্যন্ত নিখুঁত ও ব্যাকরণসমৃদ্ধ ভাষা। এর morphology (শব্দরূপ গঠন), syntax (বাক্য গঠন), এবং semantics (অর্থগত দিক) অত্যন্ত জটিল। তাছাড়া, এসব বিষয় একটি AI মডেলকে বাংলা ভাষা ঠিকমতো শিখতে এবং বুঝতে চ্যালেঞ্জের মুখে ফেলে দেয়।'
              )}
            </p>
            <ul>
              <li><strong>{getText('Multiple dialects and pronunciation variations', 'বহুবিধ উপভাষা ও উচ্চারণ পার্থক্য')}</strong></li>
              <li><strong>{getText('Gap between colloquial and literary Bengali', 'প্রচলিত ও সাহিত্যিক বাংলার ব্যবধান')}</strong></li>
              <li><strong>{getText('Local proverbs, idioms, and social context', 'স্থানীয় প্রবাদ, বাগধারা ও সামাজিক প্রসঙ্গ')}</strong></li>
            </ul>

            <h2>
              {getText(
                'Recent Advances',
                'সাম্প্রতিক অগ্রগতি'
              )}
            </h2>
            <p>
              {getText(
                'In recent years, several notable advancements have been observed:',
                'গত কয়েক বছরে কিছু উল্লেখযোগ্য অগ্রগতি লক্ষ্য করা গেছে:'
              )}
            </p>
            <ul>
              <li>
                {getText(
                  'Bengali BERT and IndicBERT: Organizations like Google and AI4Bharat are developing transformer-based models for Bengali.',
                  'বাংলা BERT ও IndicBERT: গুগল ও AI4Bharat-এর মতো সংস্থা বাংলা ভাষার জন্য transformer-ভিত্তিক মডেল তৈরি করছে।'
                )}
              </li>
              <li>
                {getText(
                  'Large Dataset Projects: Some research teams and open-source projects are building datasets with billions of tokens for Bengali.',
                  'বড় ডেটাসেট প্রকল্প: কিছু গবেষণা দল এবং ওপেন সোর্স প্রকল্প বাংলা ভাষার জন্য কোটি-কোটি টোকেনের ডেটাসেট নির্মাণ করছে।'
                )}
              </li>
              <li>
                {getText(
                  'Text-to-Speech (TTS) and Speech Recognition: Voice recognition and natural reading in Bengali have significantly improved.',
                  'Text-to-Speech (TTS) ও Speech Recognition: বাংলা ভাষায় কণ্ঠস্বর সনাক্তকরণ ও প্রাকৃতিকভাবে পাঠ করা এখন অনেক উন্নত হয়েছে।'
                )}
              </li>
            </ul>

            <h2>
              {getText(
                'Areas of Potential',
                'সম্ভাবনার ক্ষেত্র'
              )}
            </h2>
            <ol>
              <li>
                {getText(
                  'Education and E-Learning: It is possible to create context-aware tutors for Bengali-speaking students.',
                  'শিক্ষা ও ই-লার্নিং: বাংলা ভাষাভাষী ছাত্রছাত্রীর জন্য কনটেক্সট-আওয়ারে টিউটর তৈরি করা সম্ভব।'
                )}
              </li>
              <li>
                {getText(
                  'Healthcare: Healthbots capable of communicating with patients in their local language.',
                  'স্বাস্থ্যসেবা: রোগীর সঙ্গে স্থানীয় ভাষায় কথা বলার সক্ষমতা সম্পন্ন হেলথবট।'
                )}
              </li>
              <li>
                {getText(
                  'Digital Journalism and News Analysis: Automatically analyzing Bengali news to identify trends or fake news.',
                  'ডিজিটাল সাংবাদিকতা ও সংবাদ বিশ্লেষণ: স্বয়ংক্রিয়ভাবে বাংলা খবর বিশ্লেষণ করে ট্রেন্ড বা ভুয়া খবর চিহ্নিত করা।'
                )}
              </li>
              <li>
                {getText(
                  'Sentiment Analysis and Customer Support: Responding to customer emotions in customer care.',
                  'আবেগ বিশ্লেষণ ও গ্রাহক সহায়তা: কাস্টমার কেয়ারে গ্রাহকের আবেগ বুঝে প্রতিক্রিয়া দেওয়া।'
                )}
              </li>
            </ol>

            <h2>
              {getText(
                'Future Challenges and Actions Needed',
                'সামনের চ্যালেঞ্জ ও করণীয়'
              )}
            </h2>
            <ul>
              <li>
                {getText(
                  'Creating high-quality open datasets',
                  'মানসম্মত ওপেন ডেটাসেট তৈরি করা'
                )}
              </li>
              <li>
                {getText(
                  'Engaging Bengali-speaking researchers',
                  'বাংলাভাষী গবেষকদের সম্পৃক্ত করা'
                )}
              </li>
              <li>
                {getText(
                  'Including regional language speakers',
                  'আঞ্চলিক ভাষাভাষীদের অন্তর্ভুক্ত করা'
                )}
              </li>
              <li>
                {getText(
                  'Ensuring ethical use of AI',
                  'AI এর নৈতিক ব্যবহার নিশ্চিত করা'
                )}
              </li>
            </ul>
            <p>
              {getText(
                'To enhance AI’s effectiveness in Bengali, research, development, and application must occur at the local level. Not just foreign models—localized, context-aware AI engines built for the Bengali context are the key to the future.',
                'বাংলা ভাষায় AI-এর কার্যকারিতা বাড়াতে হলে দরকার স্থানীয় পরিসরে গবেষণা, উন্নয়ন, এবং প্রয়োগ। শুধু বিদেশি মডেল নয়—বাংলা ভাষার প্রেক্ষাপটে তৈরি লোকালাইজড, কনটেক্সট-সচেতন AI ইঞ্জিনই ভবিষ্যতের চাবিকাঠি।'
              )}
            </p>

            {/* Related Article */}
            <h3>
              {getText('Read More', 'আরও পড়ুন')}
            </h3>
            <ul>
              <li>
                <Link
                  to="/blog/BlogPostInclusiveAI"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
                >
                  {getText(
                    'Building Inclusive AI: A Bengali Perspective',
                    'অন্তর্ভুক্তিমূলক AI তৈরি: একটি বাংলা দৃষ্টিভঙ্গি'
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostAIProcessing;