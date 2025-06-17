import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const BlogPostKathaKunj: React.FC = () => {
  const { language, font } = useApp();
  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const author = getText('Development Team', 'ডেভেলপমেন্ট টিম');
  const date = getText('March 5, 2024', '৫ মার্চ, ২০২৪');
  const readTime = getText('10 min read', '১০ মিনিট পড়া');
  const category = getText('Development', 'ডেভেলপমেন্ট');
  const tags = ['Development', 'Technical', 'Behind the Scenes', 'Bengali AI', 'DeepSeek', 'Mistral'];

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
            {getText('KathaKunj: Behind the Scenes', 'কথাকুঞ্জ: পর্দার আড়ালে')}
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
                'A deep dive into the development process and technical challenges of building KathaKunj.',
                'কথাকুঞ্জ তৈরির উন্নয়ন প্রক্রিয়া এবং প্রযুক্তিগত চ্যালেঞ্জগুলির গভীর বিশ্লেষণ।'
              )}
            </p>

            <h2>🔍 {getText('Introduction: In Search of a New Voice', 'ভূমিকা: একটা নতুন কণ্ঠের খোঁজে')}</h2>
            <p>
              {getText(
                '“Where is an AI that speaks your language?”—this question marked the beginning of our journey.',
                '“আপনার ভাষায় কথা বলা এআই কোথায়?”—এই প্রশ্নটাই আমাদের যাত্রার সূচনা।'
              )}
            </p>
            <p>
              {getText(
                'KathaKunj is not just another chatbot. It is a Bengali-language-based artificial intelligence companion that respects the user’s language, culture, and thought process. We didn’t want another skin of GPT. We wanted a bot that “actually” understands you—in Bengali, the Bengali way.',
                'কথাকুঞ্জ কোনো কেবলমাত্র আরেকটা চ্যাটবট নয়। এটি এমন একটি বাংলা-ভাষাভিত্তিক কৃত্রিম বুদ্ধিমত্তা সহচর, যা ব্যবহারকারীর ভাষা, সংস্কৃতি এবং চিন্তাধারাকে সম্মান করে। আমরা চাইনি GPT-এর আরেকটা স্কিন। আমরা চেয়েছি এমন একটি বট, যা আপনার "আসলে" কথা বোঝে—বাংলায়, বাংলার মতো করে।'
              )}
            </p>
            <p>
              {getText(
                'In this article, we will share—',
                'এই প্রবন্ধে আমরা জানাবো—'
              )}
            </p>
            <ul>
              <li>{getText('How KathaKunj was built', 'কথাকুঞ্জ কীভাবে তৈরি হলো')}</li>
              <li>{getText('Which models, tools, and APIs we used', 'কোন কোন মডেল, টুলস, এবং API ব্যবহার করেছি')}</li>
              <li>{getText('What obstacles we overcame in this journey', 'কী কী বাধা পেরিয়ে আমাদের এই সফর')}</li>
              <li>{getText('And the future horizon', 'এবং ভবিষ্যতের দিগন্ত')}</li>
            </ul>

            <h2>🧠 {getText('Infrastructure: The Complexity of the Brain', 'পরিকাঠামো: মস্তিষ্কের জটিলতা')}</h2>
            <h3>১. {getText('Chatbot Module: deepseek/deepseek-r1-0528:free', 'চ্যাটবট মডিউল: deepseek/deepseek-r1-0528:free')}</h3>
            <p>
              {getText(
                'We chose the DeepSeek R1 version, specifically its 0528:free instance, as our main dialogue model.',
                'আমাদের প্রধান সংলাপ মডেল হিসেবে বেছে নেওয়া হয় DeepSeek R1 সংস্করণ, বিশেষ করে এর 0528:free ইনস্ট্যান্স।'
              )}
            </p>
            <p><strong>{getText('Why DeepSeek?', 'কেন DeepSeek?')}</strong></p>
            <ul>
              <li>{getText('It is instruction-tuned, delivering near GPT-4 performance', 'এটা instruction-tuned, GPT-4-এর কাছাকাছি performance দেয়')}</li>
              <li>{getText('Its token processing efficiency is excellent (low latency, high vocabulary structuring capability)', 'এর token processing efficiency চমৎকার (কম latency, উচ্চ শব্দাবলীর গঠনক্ষমতা)')}</li>
              <li>{getText('Open-weight, meaning it can be self-hosted—ensuring privacy & customization', 'open-weight, অর্থাৎ self-hosting করা যায়—privacy & customization নিশ্চিত করে')}</li>
            </ul>
            <p><strong>{getText('Usage Pattern:', 'ব্যবহার প্যাটার্ন:')}</strong></p>
            <ul>
              <li>{getText('User input comes in Bengali', 'ইউজারের ইনপুট আসে বাংলায়')}</li>
              <li>{getText('Input prompt is pre-processed for context enrichment (example: persona, tone)', 'ইনপুট prompt pre-processed করে context enrichment করা হয় (example: persona, tone)')}</li>
              <li>{getText('DeepSeek responds in English or Bengali', 'DeepSeek response দেয় ইংরেজিতে বা বাংলায়')}</li>
              <li>{getText('Then it is formatted and rendered in the UI', 'তারপর তা formatting ও rendering করা হয় UI-তে')}</li>
            </ul>
            <p><strong>{getText('Challenges:', 'চ্যালেঞ্জ:')}</strong></p>
            <ul>
              <li>{getText('DeepSeek is still somewhat behind in understanding “humor,” “proverbs,” and “polysemous words” in Bengali', 'DeepSeek এখনও বাংলা ভাষায় “রসবোধ”, “প্রবচন”, এবং “বহু অর্থযুক্ত শব্দ” বোঝায় কিছুটা পিছিয়ে')}</li>
              <li>{getText('When given excessive context, it tends to “hallucinate”', 'অতিরিক্ত context দিলে “hallucination” করার প্রবণতা বাড়ে')}</li>
            </ul>

            <h3>২. {getText('Search Intelligence: Mistral Small + SerpAPI', 'সার্চ বুদ্ধিমত্তা: Mistral Small + SerpAPI')}</h3>
            <p>
              {getText(
                'Like Perplexity.ai, KathaKunj doesn’t just chat—it provides reliable and relevant information.',
                'Perplexity.ai-এর মতো, কথাকুঞ্জ আপনাকে শুধু গল্প করে না—তথ্য দেয়, বিশ্বাসযোগ্য এবং প্রাসঙ্গিকভাবে।'
              )}
            </p>
            <p><strong>{getText('How it works:', 'কীভাবে কাজ করে:')}</strong></p>
            <ul>
              <li>{getText('User writes: “When did Bangabandhu give his speech?”', 'ইউজার লিখলো: “বঙ্গবন্ধু কত সালে ভাষণ দেন?”')}</li>
              <li>{getText('We send it to SerpAPI (Google Search Results API)', 'আমরা এটি প্রেরণ করি SerpAPI-তে (Google Search Results API)')}</li>
              <li>{getText('JSON response comes: title, snippet, URL', 'JSON রেসপন্স আসে: title, snippet, URL সহ')}</li>
              <li>{getText('This response is fed to Mistral Small (latest) model', 'এই রেসপন্স feed করা হয় Mistral Small (latest) মডেলে')}</li>
              <li>{getText('The model concisely explains relevant information in Bengali', 'মডেল সংক্ষেপে প্রাসঙ্গিক তথ্য বাংলায় ব্যাখ্যা করে')}</li>
            </ul>
            <p><strong>{getText('Why Mistral Small?', 'কেন Mistral Small?')}</strong></p>
            <ul>
              <li>{getText('Highly efficient (~7B parameters, among the smartest)', 'খুবই efficient (~7B parameters এর মধ্যে অন্যতম স্মার্ট)')}</li>
              <li>{getText('Low-latency', 'Low-latency')}</li>
              <li>{getText('Large context window, so it can process multiple snippets together', 'context window বড়, তাই multiple snippet একসাথে process করতে পারে')}</li>
              <li>{getText('Proven good multilingual understanding', 'multilingual understanding প্রমাণিতভাবে ভালো')}</li>
            </ul>

            <h2>🔗 {getText('Technical Stack Overview', 'প্রযুক্তিগত স্ট্যাক (Tech Stack Overview)')}</h2>
            <table className="table-auto w-full border-collapse border border-purple-200 dark:border-purple-700">
              <thead>
                <tr className="bg-purple-100 dark:bg-purple-900">
                  <th className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Category', 'Category')}</th>
                  <th className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Tool / Library', 'Tool / Library')}</th>
                  <th className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Purpose', 'Purpose')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Frontend', 'Frontend')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">React, Tailwind CSS, TypeScript</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Responsive UI, Bengali font rendering', 'Responsive UI, Bengali font rendering')}</td>
                </tr>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Backend', 'Backend')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">FastAPI</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Model API Gateway', 'Model API Gateway')}</td>
                </tr>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('LLMs', 'LLMs')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">DeepSeek R1 0528, Mistral Small</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Chatbot & Search reasoning', 'Chatbot & Search reasoning')}</td>
                </tr>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Search', 'Search')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">SerpAPI</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('External info fetching', 'External info fetching')}</td>
                </tr>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Translation', 'Translation')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Custom prompt-wrapping & postprocessing', 'Custom prompt-wrapping & postprocessing')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('English→Bengali inference formatting', 'English→Bengali inference formatting')}</td>
                </tr>
                <tr>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Deployment', 'Deployment')}</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">Docker, Uvicorn, Nginx</td>
                  <td className="border border-purple-200 dark:border-purple-700 px-4 py-2">{getText('Production pipeline', 'Production pipeline')}</td>
                </tr>
              </tbody>
            </table>

            <h2>🧩 {getText('Problems We Had to Solve', 'সমস্যাগুলি যেগুলোর সমাধান করতে হয়েছে')}</h2>
            <h3>১. {getText('Bengali Text Pre-processing', 'বাংলা টেক্সট প্রি-প্রসেসিং')}</h3>
            <p>
              {getText(
                'Each input had to undergo Unicode normalization and vowel sign decoding during tokenization. For example:',
                'প্রতিটি ইনপুট টোকেনাইজ করার সময় Unicode normalization এবং vowel sign decoding করতে হতো। উদাহরণস্বরূপ:'
              )}
            </p>
            <ul>
              <li>{getText('“কি” and “কী” are different yet contextually interchangeable—AI makes mistakes in understanding', '“কি” ও “কী” ভিন্ন অথচ contextually interchangeable—AI বুঝতে ভুল করে')}</li>
            </ul>
            <p><strong>{getText('Solution:', 'সমাধান:')}</strong></p>
            <ul>
              <li>{getText('Built a Normalizer pipeline that performs NFKC-based Bengali normalization', 'Normalizer pipeline বানিয়েছি যা NFKC-based বাংলা normalization করে')}</li>
              <li>{getText('Added a spell variation mapper', 'Spell variation mapper যোগ করি')}</li>
            </ul>

            <h3>২. {getText('Translation Drift', 'Translation Drift')}</h3>
            <p>
              {getText(
                'Since DeepSeek often responds in English, we translate it to Bengali in post-processing. But sometimes semantic nuances are lost.',
                'যেহেতু DeepSeek প্রায়শই ইংরেজিতে উত্তর দেয়, আমরা তা বাংলায় অনুবাদ করি post-processing এ। কিন্তু এতে কখনও semantic nuance হারিয়ে যায়।'
              )}
            </p>
            <p><strong>{getText('Solution:', 'সমাধান:')}</strong></p>
            <ul>
              <li>{getText('Created a custom prompting strategy tailored for Bengali', 'বাংলা উপযোগী custom prompting স্ট্রাটেজি তৈরি করেছি')}</li>
              <li>{getText('Injected “answer in Bangla in a friendly tone” consistently', '“answer in Bangla in a friendly tone” — consistent ইনজেকশন')}</li>
              <li>{getText('Used Bengali fine-tuned Mistral as a fallback in some cases', 'fallback হিসেবে Bengali fine-tuned Mistral ব্যবহার করি কিছু ক্ষেত্রে')}</li>
            </ul>

            <h3>৩. {getText('Latency Management', 'Latency Management')}</h3>
            <p>
              {getText(
                'LLM querying is inherently slow—causing delays in chat.',
                'LLM querying inherently slow — এর ফলে চ্যাটে delay হতো।'
              )}
            </p>
            <p><strong>{getText('Solution:', 'সমাধান:')}</strong></p>
            <ul>
              <li>{getText('Multiple async pipelines run in parallel', 'একাধিক async pipeline parallel করে')}</li>
              <li>{getText('Used “thinking animation” to reduce perceived delay', '“thinking animation” ব্যবহার করে perceived delay কমানো')}</li>
              <li>{getText('Cached responses for similarity-based hits (vector search pending)', 'responses cache করি similarity-based হিটে (vector search pending)')}</li>
            </ul>

            <h2>📈 {getText('User Feedback and Improvements', 'ব্যবহারকারীর প্রতিক্রিয়া এবং উন্নয়ন')}</h2>
            <p>
              {getText(
                'After the Beta release, we observed some interesting uses:',
                'Beta রিলিজের পর কিছু ইন্টারেস্টিং ব্যবহার দেখা গেছে:'
              )}
            </p>
            <ul>
              <li>{getText('One user asked for a poem to write a birthday wish for their mother', 'একজন user মাকে birthday wish লেখার জন্য কবিতা তৈরি করতে বলেছেন')}</li>
              <li>{getText('Many requested “memory stories,” “consolation letters,” etc.—not as a chatbot, but as a friend', 'অনেকে “স্মৃতির গল্প”, “সান্ত্বনার চিঠি” ইত্যাদি চাইছেন—চ্যাটবট হিসেবে নয়, মনোবন্ধু হিসেবে')}</li>
              <li>{getText('Many used KathaKunj to check Bengali spelling or grammar', 'বাংলা বানান বা ব্যাকরণ যাচাইয়ের জন্যও অনেকে ব্যবহার করছেন কথাকুঞ্জ')}</li>
            </ul>
            <p>
              {getText(
                'This made us realize—Bengali AI is not just a source of knowledge but a companion of empathy.',
                'আমরা এটি দেখেই উপলব্ধি করেছি—বাংলা AI শুধু জ্ঞানের উৎস নয়, সহমর্মিতার সঙ্গী।'
              )}
            </p>

            <h2>🔮 {getText('Future Plans', 'ভবিষ্যৎ পরিকল্পনা')}</h2>
            <ul>
              <li>✅ {getText('Deeper Bengali fine-tuning (Bengali literature, folklore, regional dialogues)', 'গভীরতর বাংলা ফাইনটিউনিং (বাংলা সাহিত্য, লোককথা, অঞ্চলভিত্তিক সংলাপ)')}</li>
              <li>✅ {getText('Democratic data collection—user-contributed Q&A database', 'গণতান্ত্রিক ডেটা সংগ্রহ—user-contributed Q&A ডেটাবেস')}</li>
              <li>✅ {getText('Songs, rhymes, and responses in folk tunes', 'গান, ছড়া, লোকজ সুরে প্রতিক্রিয়া')}</li>
              <li>✅ {getText('Voice integration (TTS/STT)', 'voice integration (TTS/STT)')}</li>
              <li>✅ {getText('Mobile app and offline mode', 'মোবাইল অ্যাপ এবং offline mode')}</li>
            </ul>

            <h2>🪔 {getText('Conclusion: Language, Intelligence, and Future', 'উপসংহার: ভাষা, বুদ্ধিমত্তা ও ভবিষ্যৎ')}</h2>
            <p>
              {getText(
                'KathaKunj is not just a project for us—it is a promise for the Bengali language.',
                'কথাকুঞ্জ আমাদের জন্য কেবল একটা প্রজেক্ট নয়—এটা বাংলা ভাষার জন্য একটি প্রতিজ্ঞা।'
              )}
            </p>
            <p>
              {getText(
                'We want AI that speaks Bengali to be more than a fun gimmick—a reliable friend who understands, helps, and listens to you in your language.',
                'আমরা চাই, বাংলা ভাষায় কথা বলার মতো AI শুধু মজার গিমিক না হয়ে উঠুক একটি বিশ্বস্ত বন্ধু—যে বুঝতে পারে, সাহায্য করতে পারে, এবং আপনার ভাষায় আপনাকে শুনতে পারে।'
              )}
            </p>
            <p>
              {getText(
                'Language carries history, identity, and emotion. Only when AI can immerse itself in that language can it truly become human-like.',
                'ভাষার মধ্যে আছে ইতিহাস, আত্মপরিচয়, এবং আবেগ। AI সেই ভাষার মধ্যে ডুবে যেতে পারলেই মানুষের মতো মানবিক হতে পারে।'
              )}
            </p>

            <h3>{getText('Related Articles', 'আরও পড়ুন')}</h3>
            <ul>
              <li>
                <Link
                  to="/blog/BlogPostAIProcessing"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
                >
                  {getText('The Future of AI in Bengali Language Processing', 'বাংলা ভাষা প্রক্রিয়াকরণে AI এর ভবিষ্যৎ')}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/BlogPostInclusiveAI"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
                >
                  {getText('Building Inclusive AI: A Bengali Perspective', 'অন্তর্ভুক্তিমূলক AI তৈরি: একটি বাংলা দৃষ্টিভঙ্গি')}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/BlogPostAILiterature"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
                >
                  {getText('The Impact of AI on Bengali Literature', 'বাংলা সাহিত্যে AI এর প্রভাব')}
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostKathaKunj;