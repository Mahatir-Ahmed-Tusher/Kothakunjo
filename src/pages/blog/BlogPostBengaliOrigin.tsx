import React from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const BlogPostBengaliOrigin: React.FC = () => {
  const { language, font } = useApp();
  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const author = getText('Humayun Azad', 'হুমায়ুন আজাদ');
  const date = getText('June 12, 2025', '১২ জুন, ২০২৫');
  const readTime = getText('8 min read', '৮ মিনিট পড়া');
  const category = getText('Language', 'ভাষা');
  const tags = ['Bengali Language', 'Language Evolution', 'Linguistics', 'History'];

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
            {getText('The Origin of Bengali', 'বাংলার উৎপত্তি')}
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
                'To discuss the origin of the Bengali language, we must first note that it belongs to the Indo-European language family. So, the question arises: where did Bengali come from?',
                'বাংলা ভাষার উৎপত্তি সম্পর্কে আলোচনা করতে গেলে প্রথমেই বলতে হয় যে, এই ভাষা ইন্দো-ইউরোপীয় ভাষা পরিবারের অন্তর্গত। তো, প্রশ্ন আসেই, কোথা থেকে এলো বাংলা?'
              )}
            </p>
            <p>
              {getText(
                'Where did our Bengali language come from? Does a language take birth like a human? Or does it grow like a tree from a seed? No, a language does not take birth like a human or a tree. Bengali did not take birth like a human or a tree, nor did it come from some mythical heaven. The Bengali we speak today was not the same a thousand years ago. It will not remain the same a thousand years from now. The nature of a language is to change. Before Bengali, there were other languages in this land. People spoke in those languages, sang songs, and composed poetry. The sound of a language changes through oral transmission. The form of words changes, and their meanings evolve. Over a long period, it feels like the language has become a new one. And through such changes, the Bengali language was born.',
                'কোথা থেকে এসেছে আমাদের বাংলা ভাষা ? ভাষা কি জন্ম নেয় মানুষের মতো ? বা যেমন বীজ থেকে গাছ জন্মে তেমনভাবে জন্ম নেয় ভাষা ? না, ভাষা মানুষ বা তরুর মতো জন্ম নেয় না। বাংলা ভাষাও মানুষ বা তরুর মতো জন্ম নেয়নি, কোনো কল্পিত স্বর্গ থেকেও আসেনি। এখন আমরা যে বাংলা ভাষা বলি এক হাজার বছর আগে তা ঠিক এমন ছিল না। এক হাজার বছর পরও ঠিক এমন থাকবে না। ভাষার ধর্মই বদলে যাওয়া। বাংলা ভাষার আগেও এদেশে ভাষা ছিল। সে ভাষায় এদেশের মানুষ কথা বলত, গান গাইত, কবিতা বানাত। মানুষের মুখে মুখে বদলে যায় ভাষার ধ্বনি। রূপ বদলে যায় শব্দের, বদল ঘটে অর্থের। অনেকদিন কেটে গেলে মনে হয় ভাষাটি একটি নতুন ভাষা হয়ে উঠেছে। আর সে ভাষার বদল ঘটেই জন্ম হয়েছে বাংলা ভাষার।'
              )}
            </p>
            <p>
              {getText(
                'Even a hundred years ago, no one had a clear idea about the history of the Bengali language. No one knew how old this language was. Many Sanskrit words are used in Bengali. Some people believed that Sanskrit was the mother of Bengali. Bengali was Sanskrit’s daughter—a naughty daughter who didn’t follow her mother’s ways and became different. However, in the 19th century, another group of people believed that Bengali’s connection to Sanskrit was quite distant. According to them, Bengali was not directly Sanskrit’s daughter. In other words, Bengali did not originate directly from Sanskrit but from another language. Sanskrit was the written language of the elite. It was not spoken. People spoke in various “Prakrit” languages. Prakrit was the everyday spoken language of common people. They believed that Bengali originated not from Sanskrit but from a Prakrit language.',
                'আজ থেকে এক শ বছর আগেও কারও কোনো স্পষ্ট ধারণা ছিল না বাংলা ভাষার ইতিহাস সম্পর্কে। কেউ জানত না কত বয়স এ ভাষার। সংস্কৃত ভাষার অনেক শব্দ ব্যবহৃত হয় বাংলা ভাষায়। এক দল লোক মনে করতেন ওই সংস্কৃত ভাষাই বাংলার জননী। বাংলা সংস্কৃতের মেয়ে। তবে দুষ্টু মেয়ে, যে মায়ের কথামতো চলেনি। না চলে চলে অন্য রকম হয়ে গেছে। তবে উনিশ শতকেই আরেক দল লোক ছিলেন, যাঁরা মনে করতেন বাংলার সাথে সংস্কৃতের সম্পর্ক বেশ দূরের। তাঁদের মতে, বাংলা ঠিক সংস্কৃতের কন্যা নয়। অর্থাৎ সরাসরি সংস্কৃত ভাষা থেকে উৎপত্তি ঘটেনি বাংলার। ঘটেছে অন্য কোনো ভাষা থেকে। সংস্কৃত ছিল সমাজের উঁচুশ্রেণির মানুষের লেখার ভাষা। তা কথ্য ছিল না। কথা বলত মানুষেরা নানা রকম ‘প্রাকৃত’ ভাষায়। প্রাকৃত ভাষা হচ্ছে সাধারণ মানুষের দৈনন্দিন জীবনের কথ্য ভাষা। তাঁরা বিশ্বাস করতেন যে, সংস্কৃত থেকে নয়, প্রাকৃত ভাষা থেকেই উদ্ভব ঘটেছে বাংলা ভাষার।'
              )}
            </p>
            <p>
              {getText(
                'But there were various Prakrits in different regions of India. So, which Prakrit did Bengali originate from? The first clear opinion on this was expressed by George Abraham Grierson. Among many Prakrits, one was called Magadhi Prakrit. According to him, Bengali was born from an eastern form of Magadhi Prakrit. Later, Dr. Suniti Kumar Chattopadhyay wrote a detailed history of the origin and development of Bengali, making its history clear to us. To tell that history, we need to go back a bit—back at least a few thousand years.',
                'কিন্তু নানা রকম প্রাকৃত ছিল ভারতবর্ষের বিভিন্ন অঞ্চলে। তাহলে কোন প্রাকৃত থেকে উদ্ভব ঘটেছিল বাংলার ? এ সম্পর্কে প্রথম স্পষ্ট মত প্রকাশ করেন জর্জ আব্রাহাম গ্রিয়ারসন। বহু প্রাকৃতের একটির নাম মাগধী প্রাকৃত। তাঁর মতে, মাগধী প্রাকৃতের কোনো পূর্বাঞ্চলীয় রূপ থেকে জন্ম নেয় বাংলা ভাষা। পরে বাংলা ভাষার উদ্ভব ও বিকাশের বিস্তৃত ইতিহাস রচনা করেন ডক্টর সুনীতিকুমার চট্টোপাধ্যায় এবং আমাদের চোখে স্পষ্ট ধরা দেয় বাংলা ভাষার ইতিহাস। যে ইতিহাস বলার জন্য আমাদের একটু পিছিয়ে যেতে হবে। পিছিয়ে যেতে হবে অন্তত কয়েক হাজার বছর।'
              )}
            </p>
            <p>
              {getText(
                'A deep similarity can be observed in the sounds and words of several languages in Europe and Asia. These languages, spread from Europe in the west to India and Bangladesh in the east, are considered members of one language family by linguists. This family is called the Indo-European or Indo-European language family. The Indo-European family has many language branches, one of which is the Indo-Aryan language. The ancient languages of the Indo-Aryan branch are called Old Indo-Aryan. The ancient form of Old Indo-Aryan is found in the hymns of the Rigveda, likely written around 1000 BCE, a thousand years before the birth of Jesus Christ. Followers considered these Vedic hymns sacred and memorized them. Centuries passed, and the language people used in daily life began to change. Eventually, the Vedic language became incomprehensible to common people. Grammarians then created a standardized language with rules. This language was called “Sanskrit,” meaning regulated, refined, pure language. By 400 BCE, this language was formalized.',
                'ইউরোপ ও এশিয়ার বেশ কিছু ভাষার ধ্বনিতে, শব্দে লক্ষ করা যায় গভীর মিল। এ ভাষাগুলো যে সব অঞ্চলে ছিল ও এখন আছে, তার সবচেয়ে পশ্চিমে ইউরোপ আর সবচেয়ে পূর্বে ভারত ও বাংলাদেশ। ভাষাতাত্ত্বিকেরা এ ভাষাগুলোকে একটি ভাষাবংশের সদস্য বলে মনে করেন। ওই ভাষাবংশটির নাম ইন্দো-ইউরোপীয় ভাষাবংশ বা ভারতী-ইউরোপীয় ভাষাবংশ। ইন্দো-ইউরোপীয় ভাষাবংশে আছে অনেকগুলো ভাষা-শাখা, যার একটি হচ্ছে ভারতীয় আর্যভাষা। ভারতীয় আর্যভাষার প্রাচীন ভাষাগুলোকে বলা হয় প্রাচীন ভারতীয় আর্যভাষা। প্রাচীন ভারতীয় আর্যভাষার প্রাচীন রূপ পাওয়া যায় ঋগ্বেদের মন্ত্রগুলোতে। এগুলো সম্ভবত লিখিত হয়েছিল যিশুখ্রিস্টের জন্মেরও এক হাজার বছর আগে, অর্থাৎ ১০০০ খ্রিস্টপূর্বাব্দে। বেদের শ্লোকগুলো পবিত্র বিবেচনা করে তার অনুসারীরা সেগুলো মুখস্থ করে রাখত। শতাব্দীর পর শতাব্দী কেটে যেতে থাকে। মানুষ দৈনন্দিন জীবনে যে ভাষা ব্যবহার করত বদলে যেতে থাকে সে ভাষা। এক সময় সাধারণ মানুষের কাছে দুর্বোধ্য হয়ে ওঠে বেদের ভাষা বা বৈদিক ভাষা। তখন ব্যাকরণবিদরা নানা নিয়ম বিধিবদ্ধ করে একটি মানসম্পন্ন ভাষা সৃষ্টি করেন। এই ভাষার নাম ‘সংস্কৃত’, অর্থাৎ বিধিবদ্ধ, পরিশীলিত, শুদ্ধ ভাষা। খ্রিস্টপূর্ব ৪০০ অব্দের আগেই এ ভাষা বিধিবদ্ধ হয়েছিল।'
              )}
            </p>
            <p>
              {getText(
                'Before the birth of Jesus, three levels of Indo-Aryan languages are found. The first is Vedic or Vedic Sanskrit, from 1200 BCE to 800 BCE. Then comes Sanskrit, which began to be formalized around 800 BCE and was fully standardized by the grammarian Panini around 400 BCE. Vedic and Sanskrit are called Old Indo-Aryan. Prakrit languages are called Middle Indo-Aryan, roughly spoken and written in India from 450 BCE to 1000 CE. The final stage of Prakrit is called Apabhramsha, meaning “greatly corrupted.” Various modern Indo-Aryan languages—Bengali, Hindi, Gujarati, Marathi, Punjabi, etc.—originated from different Apabhramshas. Dr. Suniti Kumar Chattopadhyay believes Bengali, along with Assamese and Odia, evolved from Eastern Magadhi Apabhramsha. Thus, Bengali has a close relationship with Assamese and Odia. Bengali also shares close ties with other languages like Maithili, Magahi, and Bhojpuri, which evolved from other branches of Magadhi Apabhramsha. Dr. Muhammad Shahidullah, however, holds a slightly different view. He mentions a Prakrit called Gaudi Prakrit, believing that Bengali originated from its evolved form, Gauda Apabhramsha.',
                'যিশুর জন্মের আগেই পাওয়া যায় ভারতীয় আর্যভাষার তিনটি স্তর। প্রথম স্তরটির নাম বৈদিক বা বৈদিক সংস্কৃত। খ্রিস্টপূর্ব ১২০০ অব্দ থেকে খ্রিস্টপূর্ব ৮০০ অব্দ এ ভাষার কাল। তারপর পাওয়া যায় সংস্কৃত। খ্রিস্টপূর্ব ৮০০ অব্দের দিকে এটি সম্ভবত বিধিবদ্ধ হতে থাকে এবং খ্রিস্টপূর্ব ৪০০ অব্দের দিকে ব্যাকরণবিদ পাণিনির হাতেই এটি চূড়ান্তভাবে বিধিবদ্ধ হয়। বৈদিক ও সংস্কৃতকে বলা হয় প্রাচীন ভারতীয় আর্যভাষা। প্রাকৃত ভাষাগুলোকে বলা হয় মধ্যভারতীয় আর্যভাষা। মোটামুটিভাবে খ্রিস্টপূর্ব ৪৫০ অব্দ থেকে ১০০০ খ্রিস্টাব্দ পর্যন্ত এ ভাষাগুলো কথ্য ও লিখিত ভাষারূপে ভারতের বিভিন্ন স্থানে প্রচলিত থাকে। এ প্রাকৃত ভাষাগুলোর শেষ স্তরের নাম অপভ্রংশ অর্থাৎ যা খুব বিকৃত হয়ে গেছে। বিভিন্ন অপভ্রংশ থেকেই উৎপন্ন হয়েছে নানান আধুনিক ভারতীয় আর্যভাষা- বাংলা, হিন্দি, গুজরাটি, মারাঠি, পাঞ্জাবি প্রভৃতি ভাষা। ডক্টর সুনীতিকুমার চট্টোপাধ্যায় মনে করেন, পূর্ব মাগধী অপভ্রংশ থেকে উদ্ভূত হয়েছে বাংলা; আর আসামি ও ওড়িয়া ভাষা। তাই বাংলার সাথে খুব ঘনিষ্ঠ সম্পর্ক আসামি ও ওড়িয়ার। আর কয়েকটি ভাষার ঘনিষ্ঠ আত্মীয়তা রয়েছে বাংলার সঙ্গে; কেননা সেগুলোও জন্মেছিল মাগধী অপভ্রংশের অন্য দুটি শাখা থেকে। ওই ভাষাগুলো হচ্ছে মৈথিলি, মগহি, ভোজপুরিয়া। ডক্টর মুহম্মদ শহীদুল্লাহ্ বাংলা ভাষার উৎপত্তি সম্পর্কে অবশ্য একটু ভিন্ন মত পোষণ করেন। তিনি একটি প্রাকৃতের নাম বলেন গৌড়ী প্রাকৃত। তিনি মনে করেন, গৌড়ী প্রাকৃতেরই পরিণত অবস্থা গৌড় অপভ্রংশ থেকে উৎপত্তি ঘটে বাংলা ভাষার।'
              )}
            </p>
            <p>
              {getText(
                'The story of Bengali’s birth—Humayun Azad; this essay is excerpted from Humayun Azad’s *কতো নদী সরোবর বা বাঙলা ভাষার জীবনী*.',
                'বাংলা ভাষার জন্মকথা-হুমায়ুন আজাদ; প্রবন্ধটি হুমায়ুন আজাদের ‘কতো নদী সরোবর বা বাঙলা ভাষার জীবনী’ গ্রন্থ থেকে সংকলন করা হয়েছে।'
              )}
            </p>

            <h2>{getText('Language Evolution', 'ভাষার বিবর্তন')}</h2>
            <p>
              {getText(
                'The history of the Bengali language can be roughly divided into three eras:',
                'বাংলা ভাষার ইতিহাসকে মোটামুটি তিনটি যুগে ভাগ করা যায়:'
              )}
            </p>
            <ul>
              <li><strong>{getText('Old Bengali (950–1350 CE)', 'প্রাচীন বাংলা (৯৫০-১৩৫০ খ্রিষ্টাব্দ)')}</strong></li>
              <li><strong>{getText('Middle Bengali (1350–1800 CE)', 'মধ্য বাংলা (১৩৫০-১৮০০ খ্রিষ্টাব্দ)')}</strong></li>
              <li><strong>{getText('Modern Bengali (1800 CE–present)', 'আধুনিক বাংলা (১৮০০ খ্রিষ্টাব্দ থেকে বর্তমান)')}</strong></li>
            </ul>

            <h2>{getText('Old Bengali', 'প্রাচীন বাংলা')}</h2>
            <p>
              {getText(
                'Evidence of Old Bengali is found in the *Charyapada*, songs composed by Buddhist Sahajiya saints. These are believed to have been written between 950 and 1200 CE.',
                'প্রাচীন বাংলার নিদর্শন পাওয়া যায় চর্যাপদে। চর্যাপদ বৌদ্ধ সহজিয়া সাধকদের রচিত গান। এগুলো ৯৫০-১২০০ খ্রিষ্টাব্দের মধ্যে রচিত হয়েছিল বলে মনে করা হয়।'
              )}
            </p>

            <h2>{getText('Middle Bengali', 'মধ্য বাংলা')}</h2>
            <p>
              {getText(
                'In the Middle Bengali era, Bengali literature flourished through Vaishnava Padavali, Mangalkavya, and translated literature. During this time, the Bengali language underwent significant changes.',
                'মধ্য বাংলা যুগে বাংলা সাহিত্য সমৃদ্ধ হয় বৈষ্ণব পদাবলী, মঙ্গলকাব্য ও অনুবাদ সাহিত্যের মাধ্যমে। এ সময় বাংলা ভাষায় ব্যাপক পরিবর্তন আসে।'
              )}
            </p>

            <h2>{getText('Modern Bengali', 'আধুনিক বাংলা')}</h2>
            <p>
              {getText(
                'The era of Modern Bengali began with the establishment of Fort William College. From this time, the development of Bengali prose started, and Bengali language and literature gained a new dimension.',
                'আধুনিক বাংলার যুগ শুরু হয় ফোর্ট উইলিয়াম কলেজের প্রতিষ্ঠার মধ্য দিয়ে। এ সময় থেকে বাংলা গদ্যের বিকাশ শুরু হয়। বাংলা ভাষা ও সাহিত্য নতুন মাত্রা পায়।'
              )}
            </p>

            <h2>{getText('Current Status', 'বর্তমান অবস্থা')}</h2>
            <p>
              {getText(
                'Currently, Bengali is the sixth largest language in the world. It is the national language of Bangladesh and one of the main languages of West Bengal, Tripura, and Assam in India. Around 300 million people worldwide speak this language.',
                'বর্তমানে বাংলা বিশ্বের ষষ্ঠ বৃহত্তম ভাষা। এটি বাংলাদেশের জাতীয় ভাষা এবং ভারতের পশ্চিমবঙ্গ, ত্রিপুরা ও আসামের অন্যতম প্রধান ভাষা। বিশ্বে প্রায় ৩০ কোটি মানুষ এই ভাষায় কথা বলে।'
              )}
            </p>

            <h2>{getText('Language Movement', 'ভাষা আন্দোলন')}</h2>
            <p>
              {getText(
                'The Language Movement of 1952 is a milestone in the history of the Bengali language. As a result of this movement, Bengali gained new prestige, and in 1956, it was recognized as one of Pakistan’s state languages.',
                '১৯৫২ সালের ভাষা আন্দোলন বাংলা ভাষার ইতিহাসে একটি মাইলফলক। এই আন্দোলনের ফলে বাংলা ভাষা নতুন মর্যাদা পায় এবং ১৯৫৬ সালে বাংলা পাকিস্তানের অন্যতম রাষ্ট্রভাষা হিসেবে স্বীকৃতি পায়।'
              )}
            </p>

            <h2>{getText('International Mother Language Day', 'আন্তর্জাতিক মাতৃভাষা দিবস')}</h2>
            <p>
              {getText(
                'February 21 is now observed as International Mother Language Day. In 2000, UNESCO declared this day as International Mother Language Day.',
                '২১শে ফেব্রুয়ারি এখন আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে পালিত হয়। ২০০০ সালে ইউনেস্কো এই দিনটিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে।'
              )}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostBengaliOrigin;