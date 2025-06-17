import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const BlogPostInclusiveAI: React.FC = () => {
  const { language, font } = useApp();
  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const author = getText('Fatima Khan', 'ফাতিমা খান');
  const date = getText('March 10, 2024', '১০ মার্চ, ২০২৪');
  const readTime = getText('7 min read', '৭ মিনিট পড়া');
  const category = getText('Research', 'গবেষণা');
  const tags = ['Inclusion', 'Community', 'AI Ethics'];

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
              'Building Inclusive AI: A Bengali Perspective',
              'অন্তর্ভুক্তিমূলক AI তৈরি: একটি বাংলা দৃষ্টিভঙ্গি'
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
                'The answer to the question of how we can create AI systems that truly understand and serve the Bengali-speaking community worldwide lies in technological justice, preserving linguistic diversity, and fostering equality in the future digital society. Despite Bengali being the sixth most spoken language globally, most artificial intelligence systems have so far been primarily focused on English or European language datasets. This results in limited accuracy, relevance, and usability of AI for Bengali speakers.',
                'আমরা কীভাবে এমন AI সিস্টেম তৈরি করতে পারি যা সত্যিকারের বিশ্বব্যাপী বাংলা ভাষী সম্প্রদায়কে বুঝে এবং সেবা করে—এই প্রশ্নের উত্তর খোঁজার মধ্যেই নিহিত রয়েছে প্রযুক্তিগত ন্যায়বিচার, ভাষাগত বৈচিত্র্য রক্ষা, এবং ভবিষ্যতের ডিজিটাল সমাজে সমতা আনার আশাবাদ। বাংলা বিশ্বের ষষ্ঠ সর্বাধিক কথিত ভাষা হওয়া সত্ত্বেও, অধিকাংশ কৃত্রিম বুদ্ধিমত্তা সিস্টেম এখনও পর্যন্ত মূলত ইংরেজিভাষী বা ইউরোপীয় ভাষার তথ্যভাণ্ডারকেন্দ্রিক। এর ফলে বাংলা ভাষাভাষীদের জন্য AI-এর যথার্থতা, প্রাসঙ্গিকতা এবং ব্যবহারযোগ্যতা সীমিত হয়ে পড়ে।'
              )}
            </p>

            <h2>
              {getText(
                'Linguistic Diversity and Challenges',
                'ভাষাগত বৈচিত্র্য এবং চ্যালেঞ্জ'
              )}
            </h2>
            <p>
              {getText(
                'The regional variations, dialects, and social contexts of the Bengali language, which lead to differences in pronunciation or meaning, pose significant challenges in developing AI models. Dialects such as Dhakaia or Chittagonian in Bangladesh, or Rarhi Bengali, Sylheti, or Koch Behari in India, exhibit distinct phonetic and lexical forms. An inclusive AI will respect these differences, embracing not just "standard" Bengali but the entire spectrum of the language’s diversity.',
                'বাংলা ভাষার আঞ্চলিক রূপ, উপভাষা, এবং সামাজিক প্রসঙ্গে উচ্চারণ বা অর্থের পার্থক্য AI মডেল তৈরির সময় বড় চ্যালেঞ্জ হয়ে দাঁড়ায়। বাংলাদেশের ঢাকাইয়া, চাটগাঁইয়া, বা ভারতের রাঢ়ী বাংলা, সিলেটি কিংবা কোচবিহারী উপভাষাগুলো ভিন্ন ভিন্ন ধ্বনিগত ও শব্দগত রূপ ধারণ করে। একটি অন্তর্ভুক্তিমূলক AI এসব পার্থক্যকে সম্মান করবে, শুধুমাত্র "স্ট্যান্ডার্ড" বাংলা নয়, বরং পুরো ভাষার বৈচিত্র্যকে ধারণ করবে।'
              )}
            </p>

            <h2>
              {getText(
                'Need for Data Corpus',
                'তথ্যভাণ্ডারের প্রয়োজনীয়তা'
              )}
            </h2>
            <p>
              {getText(
                'Building AI systems requires vast amounts of high-quality linguistic data (corpus). However, such datasets for Bengali are still limited—particularly for regional, colloquial, or niche topics. Addressing this requires local community participation, collaboration among linguists, educators, and technologists to create open and equitable datasets for the Bengali language.',
                'AI সিস্টেম তৈরি করতে দরকার বিশাল পরিমাণে গুণগত মানসম্পন্ন ভাষাগত তথ্য (corpus)। কিন্তু বাংলা ভাষার জন্য এমন ডেটাসেট এখনও সীমিত — বিশেষত অঞ্চলভিত্তিক, কথ্য ভাষার, বা অপ্রচলিত বিষয়ের ওপর ভিত্তিক ডেটা। এই সমস্যা সমাধানে দরকার স্থানীয় কমিউনিটির অংশগ্রহণ, ভাষাবিজ্ঞানী, শিক্ষাবিদ, ও প্রযুক্তিবিদদের সমন্বয়ে বাংলা ভাষার জন্য উন্মুক্ত ও ন্যায়সংগত ডেটাসেট নির্মাণ।'
              )}
            </p>

            <h2>
              {getText(
                'Cultural Context and Ethics',
                'সাংস্কৃতিক প্রসঙ্গ ও নৈতিকতা'
              )}
            </h2>
            <p>
              {getText(
                'For AI to understand a society’s language, it must grasp the culture, customs, and emotional nuances of that society. For instance, if an AI chatbot responds to an emotionally charged question from a Bengali user with a culturally inappropriate or mechanical answer, it would be deemed a failure. Thus, teaching Bengali AI “sensitivity,” “contextual awareness,” and “cultural understanding” is crucial.',
                'AI যদি কোনো সমাজের ভাষা বুঝতে চায়, তবে তাকে সেই সমাজের সংস্কৃতি, রীতি-নীতি, এবং অনুভূতির সূক্ষ্মতা বুঝতে হবে। উদাহরণস্বরূপ, AI চ্যাটবট যদি বাঙালি ব্যবহারকারীর আবেগপ্রবণ প্রশ্নের জবাবে সংস্কৃতি-বিরোধী বা যান্ত্রিক উত্তর দেয়, তাহলে তা ব্যর্থতা হিসেবেই গণ্য হবে। তাই বাংলা AI-কে “সংবেদনশীলতা”, “ভাষার প্রেক্ষাপট” এবং “সাংস্কৃতিক বোধ” শেখানো অত্যন্ত জরুরি।'
              )}
            </p>

            <h2>
              {getText(
                'Potential Applications of Bengali AI',
                'বাংলা AI-এর সম্ভাব্য প্রয়োগ'
              )}
            </h2>
            <p>
              {getText(
                'Education: AI-based Bengali tutoring platforms can provide learning opportunities for students in remote areas.\n' +
                'Healthcare: Affordable Bengali-language healthcare chatbots can assist patients in rural regions.\n' +
                'Agriculture: AI apps capable of providing agricultural advice in local dialects can be developed.\n' +
                'Legal Aid: Systems offering legal information in Bengali can help ordinary people access justice in their native language.',
                'শিক্ষা: AI-ভিত্তিক বাংলা টিউটর প্ল্যাটফর্ম দূরদূরান্তের ছাত্রছাত্রীদের শেখার সুযোগ করে দিতে পারে।\n' +
                'স্বাস্থ্যসেবা: গ্রামীণ অঞ্চলের রোগীদের জন্য স্বল্পমূল্যের বাংলা ভাষাভিত্তিক স্বাস্থ্য সহায়ক চ্যাটবট তৈরি হতে পারে।\n' +
                'কৃষি: কৃষকদের স্থানীয় উপভাষায় কৃষি পরামর্শ দিতে সক্ষম AI অ্যাপ তৈরি হতে পারে।\n' +
                'আইনি সহায়তা: সাধারণ মানুষ যাতে তাদের মাতৃভাষায় ন্যায়বিচার পেতে পারেন, তার জন্য বাংলা ভাষায় আইনি তথ্য প্রদানকারী সহায়ক সিস্টেম তৈরি করা যেতে পারে।'
              )}
            </p>

            <h2>
              {getText(
                'Conclusion',
                'উপসংহার'
              )}
            </h2>
            <p>
              {getText(
                'Building inclusive AI is not just about technological advancement; it is also a form of linguistic justice. By respecting every layer, region, and user of the Bengali language, if we can develop AI systems, only then will they be truly inclusive. Achieving this goal requires collective effort—active participation from technologists, policymakers, social workers, and the Bengali-speaking community. The diversity of the Bengali language is its strength, and if we can harness this strength through artificial intelligence, it will position us uniquely on the global stage.',
                'অন্তর্ভুক্তিমূলক AI গড়ে তোলা মানে কেবল প্রযুক্তির উন্নয়ন নয়, এটি এক ধরনের ভাষাগত ন্যায়বিচারও। বাংলা ভাষার প্রতিটি স্তর, প্রতিটি অঞ্চল, প্রতিটি ব্যবহারকারীর প্রতি সম্মান দেখিয়ে, আমরা যদি AI সিস্টেমকে গড়ে তুলতে পারি — তাহলে তবেই সেটি সত্যিকার অর্থে অন্তর্ভুক্তিমূলক হবে। এই লক্ষ্য অর্জনের জন্য দরকার সম্মিলিত প্রচেষ্টা — প্রযুক্তিবিদ, নীতিনির্ধারক, সমাজকর্মী, এবং ভাষাভাষী জনগণের সক্রিয় অংশগ্রহণ। বাংলা ভাষার বৈচিত্র্যই তার শক্তি — এবং এই শক্তিকে আমরা যদি কৃত্রিম বুদ্ধিমত্তার মাধ্যমে প্রযুক্তির অংশ করতে পারি, তবে তা বিশ্বদরবারে আমাদের এক অনন্য অবস্থানে পৌঁছে দেবে।'
              )}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostInclusiveAI;