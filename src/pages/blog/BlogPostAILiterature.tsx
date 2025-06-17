import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const BlogPostAILiterature: React.FC = () => {
  const { language, font } = useApp();
  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const author = getText('Prof. Nasir Ahmed', 'প্রফেসর নাসির আহমেদ');
  const date = getText('February 28, 2024', '২৮ ফেব্রুয়ারি, ২০২৪');
  const readTime = getText('6 min read', '৬ মিনিট পড়া');
  const category = getText('Literature', 'সাহিত্য');
  const tags = getText('Literature, Creative Writing, AI, Bengali', 'সাহিত্য, সৃজনশীল লেখা, AI, বাংলা').split(', ');

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
            {getText('The Impact of AI on Bengali Literature', 'বাংলা সাহিত্যে AI এর প্রভাব')}
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
              <strong>
                {getText(
                  'Exploring how artificial intelligence is changing the landscape of Bengali literature and creative writing.',
                  'কৃত্রিম বুদ্ধিমত্তা কীভাবে বাংলা সাহিত্য এবং সৃজনশীল লেখার ল্যান্ডস্কেপ পরিবর্তন করছে তা অন্বেষণ করা।'
                )}
              </strong>
            </p>

            <h2>
              {getText('Introduction: The Intersection of Technology and Imagination', 'ভূমিকা: প্রযুক্তি ও কল্পনার সংযোগ')}
            </h2>
            <p>
              {getText(
                'Bengali literature has long reflected human emotions, society, history, and culture in profound ways. However, over the past decade, technology, particularly artificial intelligence (AI), has ushered Bengali literature into a new chapter. The question is—Is AI merely aiding literature, or is it redefining the essence of literary creativity?',
                'বাংলা সাহিত্য দীর্ঘদিন ধরে মানবজগতের অনুভূতি, সমাজ, ইতিহাস ও সংস্কৃতিকে গভীরভাবে প্রতিফলিত করে এসেছে। তবে গত এক দশকে প্রযুক্তি, বিশেষ করে কৃত্রিম বুদ্ধিমত্তা (AI), বাংলা সাহিত্যকে এক নতুন অধ্যায়ে নিয়ে এসেছে। প্রশ্ন হচ্ছে—AI কি কেবল সাহিত্যকে সাহায্য করছে, না কি এটি সাহিত্যিক সৃজনশীলতার সংজ্ঞা বদলে দিচ্ছে?'
              )}
            </p>

            <h2>
              {getText('AI’s Role in Literary Creation', 'সাহিত্য সৃষ্টিতে AI-এর ভূমিকা')}
            </h2>
            <p>
              {getText(
                'Currently, AI is being used to write poetry, stories, and even plays. Models like GPT (Generative Pre-trained Transformer) can generate metrical poetry and story frameworks in Bengali.',
                'বর্তমানে AI ব্যবহার করে লেখা হচ্ছে কবিতা, গল্প এমনকি নাটকও। GPT (Generative Pre-trained Transformer) এর মতো মডেল বাংলা ভাষায়ও রচনা করতে পারছে ছন্দোবদ্ধ কবিতা থেকে শুরু করে গল্পের কাঠামো।'
              )}
            </p>
            <ul>
              <li>
                <strong>{getText('Example', 'উদাহরণ')}:</strong>{' '}
                {getText(
                  'An open-source project called “PoetAI” uses GPT-3 to write Bengali poetry and rewrites based on reader feedback (Ahmed et al., 2022).',
                  '“কবিতাএআই” নামক একটি ওপেন সোর্স প্রজেক্ট, যেখানে GPT-3 ব্যবহার করে বাংলা কবিতা লেখা হয় এবং পাঠকের প্রতিক্রিয়ার ভিত্তিতে পুনর্লিখন করা হয় (Ahmed et al., 2022)।'
                )}
              </li>
              <li>
                <strong>{getText('AI’s Advantages', 'AI-এর সুবিধাসমূহ')}:</strong>{' '}
                {getText(
                  'Context understanding, drawing inspiration from vast data, quick writing assistance, overcoming writer’s block, language preservation, and style imitation.',
                  'কনটেক্সট বোঝার ক্ষমতা, প্রচুর ডেটা থেকে অনুপ্রেরণা গ্রহণ, দ্রুত লেখার সহায়তা, লেখকের ব্লক কাটাতে সহায়ক, ভাষা সংরক্ষণ ও স্টাইল অনুকরণ।'
                )}
              </li>
            </ul>

            <h2>
              {getText('AI in Literary Analysis', 'সাহিত্য বিশ্লেষণে AI')}
            </h2>
            <p>
              {getText(
                'AI is not only used for writing but also for literary analysis. Using Machine Learning and Natural Language Processing (NLP), it is now possible to examine the style, themes, word usage, and even changes in literary movements in Bengali literature.',
                'AI শুধু লেখা নয়, সাহিত্য বিশ্লেষণেও ব্যবহৃত হচ্ছে। Machine Learning এবং Natural Language Processing (NLP) পদ্ধতি ব্যবহার করে এখন বাংলা সাহিত্যের বিভিন্ন লেখকের রচনার স্টাইল, থিম, শব্দের ব্যবহার, এমনকি সাহিত্য আন্দোলনের পরিবর্তন নিরীক্ষণ করা সম্ভব।'
              )}
            </p>
            <ul>
              <li>
                <strong>{getText('Research', 'গবেষণা')}:</strong>{' '}
                {getText(
                  'Jahan et al. (2021) demonstrated that AI-based Text Mining tools can analyze linguistic differences and trends in the works of Rabindranath Tagore and Kazi Nazrul Islam.',
                  'Jahan et al. (2021) দেখিয়েছেন যে AI ভিত্তিক Text Mining টুল দিয়ে রবীন্দ্রনাথ ঠাকুর ও কাজী নজরুল ইসলামের রচনায় ভাষার পার্থক্য ও ধারা বিশ্লেষণ সম্ভব।'
                )}
              </li>
              <li>
                <strong>{getText('BRAC University NLP Lab', 'BRAC University NLP Lab')}:</strong>{' '}
                {getText(
                  'Developed a Sentiment Analysis Model for analyzing Bengali novels and short stories.',
                  'বাংলা উপন্যাস ও ছোটগল্প বিশ্লেষণের জন্য Sentiment Analysis Model তৈরি করেছে।'
                )}
              </li>
            </ul>

            <h2>
              {getText('The Question of Creativity: Writer vs. Machine', 'সৃজনশীলতার প্রশ্ন: লেখক বনাম মেশিন')}
            </h2>
            <p>
              {getText(
                'When AI writes poetry or stories, the question arises—Who owns this work? The writer, the programmer, or the model itself?',
                'AI যখন কবিতা বা গল্প লেখে, তখন প্রশ্ন ওঠে—এই লেখার মালিক কে? লেখক, না কি প্রোগ্রামার, না কি মডেল নিজেই?'
              )}
            </p>
            <p>
              <strong>{getText('Debate', 'Debate')}:</strong>{' '}
              {getText(
                'Is AI truly “creative”? Or does it merely mimic human writing?',
                'AI কি আসলেই “সৃজনশীল”? নাকি এটি মানুষের লেখা অনুকরণ করে চলে?'
              )}
            </p>
            <blockquote>
              {getText(
                '“AI can never replace the heart of a writer, but it can help expand their thoughts.” — Dr. Shabnam Ferdousi, Literary Researcher, University of Dhaka',
                '“AI কখনও সাহিত্যিকের হৃদয়ের বিকল্প হতে পারবে না, কিন্তু এটি তার চিন্তাকে প্রসারিত করতে সাহায্য করতে পারে।” — ড. শবনম ফেরদৌসী, সাহিত্য গবেষক, ঢাকা বিশ্ববিদ্যালয়'
              )}
            </blockquote>

            <h2>
              {getText('AI’s Potential in Bengali Literature', 'বাংলা সাহিত্যে AI-এর সম্ভাবনা')}
            </h2>
            <ol>
              <li>{getText('Assisting new writers', 'নতুন লেখকদের সহায়তা')}</li>
              <li>{getText('Preserving and digitizing traditional literature', 'প্রচলিত সাহিত্যের সংরক্ষণ ও ডিজিটালাইজেশন')}</li>
              <li>{getText('Multilingual translation', 'বহুভাষিক অনুবাদ')}</li>
              <li>{getText('Literary games and interactive fiction', 'সাহিত্যিক খেলা ও ইন্টার‍্যাকটিভ ফিকশন')}</li>
              <li>{getText('AI guides in literary education', 'সাহিত্য শিক্ষায় AI গাইড')}</li>
            </ol>

            <h2>
              {getText('Challenges and Ethical Considerations', 'চ্যালেঞ্জ ও নৈতিক দিক')}
            </h2>
            <ul>
              <li>{getText('Plagiarism and copyright', 'প্ল্যাজারিজম ও স্বত্বাধিকার')}</li>
              <li>{getText('AI bias', 'AI-এর পক্ষপাত (bias)')}</li>
              <li>{getText('Future of the literary profession', 'সাহিত্যিক পেশার ভবিষ্যৎ')}</li>
            </ul>

            <h2>
              {getText('Conclusion', 'উপসংহার')}
            </h2>
            <p>
              {getText(
                'AI has opened new horizons in Bengali literature—but it is not the “end of human creation” but rather a collaborative force. If writers embrace AI as a partner, it can become a source of unprecedented creative experiences.',
                'AI বাংলা সাহিত্যে একটি নতুন দিগন্ত উন্মোচন করেছে—তবে এটি কোনো “মানব সৃষ্টির অবসান” নয়, বরং একটি সহযোগী শক্তি। লেখক যদি AI-কে সহকর্মী হিসেবে নেন, তবে সেটি হতে পারে অভাবনীয় সৃজনশীল অভিজ্ঞতার উৎস।'
              )}
            </p>

            <h3>
              {getText('References', 'রেফারেন্স')}
            </h3>
            <ul>
              <li>
                {getText(
                  'Ahmed, N., & Islam, T. (2022). PoetAI: Automated Bengali Poetry Generation using GPT-3. Dhaka NLP Symposium.',
                  'Ahmed, N., & Islam, T. (2022). কবিতাএআই: GPT-3 ব্যবহার করে স্বয়ংক্রিয় বাংলা কবিতা তৈরি। ঢাকা NLP সিম্পোজিয়াম।'
                )}
              </li>
              <li>
                {getText(
                  'Jahan, F., Rahman, M., & Alam, M. (2021). Comparative Stylometry Analysis in Bengali Literary Corpus. BRAC University NLP Lab.',
                  'Jahan, F., Rahman, M., & Alam, M. (2021). বাংলা সাহিত্য কপার্সে তুলনামূলক স্টাইলোমেট্রি বিশ্লেষণ। BRAC University NLP Lab।'
                )}
              </li>
              <li>
                {getText(
                  'Ferdousi, S. (2023). AI and Creativity in Bengali Literary Discourse. DU Journal of Modern Letters.',
                  'Ferdousi, S. (2023). বাংলা সাহিত্যিক বক্তৃতায় AI এবং সৃজনশীলতা। DU Journal of Modern Letters।'
                )}
              </li>
            </ul>

            <h3>
              {getText('Read More', 'আরও পড়ুন')}
            </h3>
            <ul>
              <li>
                <Link
                  to="/blog/BlogPostAIProcessing"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
                >
                  {getText(
                    'The Future of AI in Bengali Language Processing',
                    'বাংলা ভাষা প্রক্রিয়াকরণে AI এর ভবিষ্যৎ'
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

export default BlogPostAILiterature;