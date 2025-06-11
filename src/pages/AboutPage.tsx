import React from 'react';
import { Heart, Users, Target, Zap, Globe, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const AboutPage: React.FC = () => {
  const { language, font } = useApp();

  const getText = (en: string, bn: string) => language === 'en' ? en : bn;
  const fontClass = font === 'solaiman-lipi' ? 'font-solaiman' : 'font-hind';

  const features = [
  {
    icon: Heart,
    title: getText('Built with Love', 'ভালোবাসায় গড়ে তোলা'),
    description: getText(
      'Created specifically for the Bengali-speaking community with care and attention to detail',
      'বাংলাভাষী সম্প্রদায়ের জন্য যত্ন ও খুঁটিনাটি মাথায় রেখে তৈরি করা হয়েছে'
    )
  },
  {
    icon: Users,
    title: getText('Community First', 'কমিউনিটিই অগ্রাধিকার'),
    description: getText(
      'Designed to serve and empower the Bengali community with accessible AI technology',
      'সহজলভ্য AI প্রযুক্তির মাধ্যমে বাংলা কমিউনিটিকে সেবা ও ক্ষমতায়নের লক্ষ্যেই ডিজাইন করা হয়েছে'
    )
  },
  {
    icon: Target,
    title: getText('Purpose Driven', 'উদ্দেশ্যনির্ভর'),
    description: getText(
      'Our mission is to make AI accessible and useful for Bengali speakers worldwide',
      'বিশ্বজুড়ে বাংলাভাষীদের জন্য AI সহজলভ্য ও কার্যকর করে তোলাই আমাদের লক্ষ্য'
    )
  },
  {
    icon: Zap,
    title: getText('Cutting Edge', 'সর্বাধুনিক প্রযুক্তি'),
    description: getText(
      'Powered by the latest AI technology while maintaining simplicity and ease of use',
      'সর্বশেষ AI প্রযুক্তির দ্বারা চালিত, কিন্তু ব্যবহারে সহজ ও সরল রাখার প্রতিশ্রুতি রয়েছে'
    )
  },
  {
    icon: Globe,
    title: getText('Global Reach', 'বিশ্বব্যাপী সংযোগ'),
    description: getText(
      'Connecting Bengali speakers across the globe through intelligent conversation',
      'বুদ্ধিমত্তাপূর্ণ কথোপকথনের মাধ্যমে সারা বিশ্বের বাংলাভাষীদের একত্রিত করা'
    )
  },
  {
    icon: Shield,
    title: getText('Privacy First', 'গোপনীয়তা সর্বাগ্রে'),
    description: getText(
      'Your conversations and data are protected with enterprise-grade security',
      'আপনার কথোপকথন ও তথ্য এন্টারপ্রাইজ-গ্রেড নিরাপত্তার মাধ্যমে সুরক্ষিত রাখা হয়'
    )
  }
];



  return (
    <div className={`min-h-screen pt-16 ${fontClass} bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            {getText('About কথাকুঞ্জ', 'কথাকুঞ্জ সম্পর্কে')}
          </h1>
          <p className="text-xl text-purple-600 dark:text-purple-300 max-w-3xl mx-auto leading-relaxed">
            {getText(
              'কথাকুঞ্জ is more than just an AI assistant - it\'s a bridge connecting Bengali speakers to the future of intelligent technology.',
              'আমাদের এই কথাকুঞ্জ একটি মোটামুটি শক্তিশালী চ্যাটবট। যদিও একে ‘অসাধারণ’ বলা যাবে না, তবুও দৈনন্দিন জীবনের নানা সমস্যার ছোটখাটো সমাধানে এটি আপনার সহায়ক হতে পারে বলে আমাদের বিশ্বাস। সবচেয়ে বড় ব্যাপার হলো—কথাকুঞ্জ কথা বলে আপনার মাতৃভাষায়। তাই মনের কথা খুলে বলুন, আড্ডা দিন নির্ভারভাবে। শুভকামনা রইল!'
            )}
          </p>
        </div>

        {/* Mission Statement */}
<div className="mb-16 text-center">
  <div className="max-w-4xl mx-auto p-8 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-3xl border border-purple-200/20 dark:border-purple-700/20">
    <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">
      {getText('Our Mission', 'আমাদের লক্ষ্য')}
    </h2>
    <p className="text-lg text-purple-700 dark:text-purple-300 leading-relaxed">
      {getText(
        'Our mission is to bring technology closer to people through the power of language. Kothakunjo is designed so that anyone can interact with AI in their own words, in their own language. We believe AI becomes truly meaningful when it speaks your language, understands your culture, and supports your everyday life with intelligence and empathy.',
        'আমাদের লক্ষ্য হলো ভাষার শক্তিকে ভিত্তি করে প্রযুক্তিকে মানুষের আরও কাছাকাছি নিয়ে আসা। ‘কথাকুঞ্জ’ এমনভাবে তৈরি করা হয়েছে যেন আপনি নিজ ভাষায়, নিজস্ব কথায় কৃত্রিম বুদ্ধিমত্তার সাথে মিশতে পারেন। আমরা বিশ্বাস করি, AI তখনই সত্যিকার অর্থে মানবিক ও প্রাসঙ্গিক হয়, যখন তা আপনার ভাষায় কথা বলে, আপনার সংস্কৃতিকে বোঝে, এবং দৈনন্দিন জীবনে বুদ্ধিমত্তা ও সহমর্মিতার সহায়তা দেয়।'
      )}
    </p>
  </div>
</div>


        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-700/20 hover:bg-white/80 dark:hover:bg-purple-800/80 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  {feature.title}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
<div className="mb-16">
  <h2 className="text-3xl font-bold text-center text-purple-800 dark:text-purple-200 mb-12">
    {getText('Our Team', 'আমাদের টিম')}
  </h2>
  <div className="flex justify-center">
    <div className="text-center p-6 bg-white/60 dark:bg-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-200/20 dark:border-purple-700/20 max-w-lg">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Users className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
        {getText('Mahatir Ahmed Tusher', 'মাহাথির আহমেদ তুষার')}
      </h3>
      <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
        {getText('Developer', 'ডেভেলপার')}
      </p>
      <p className="text-purple-600 dark:text-purple-400 text-sm leading-relaxed mb-4">
        {getText(
          "The developer behind Kothakunjo is Mahatir Ahmed Tusher. In personal life, he doesn’t have any grand achievements to boast about. His youth was driven by a hunger for greatness and a longing for immortality. As he grew up, he also learned to compromise with mediocrity. Still, almost every day, he wonders if he could leave behind something on this blue planet—something that would make people remember him, something worthy of fresh flowers on his grave. But somehow, nothing ever quite gets done. And so, life goes on. To connect with the developer, follow the links to his LinkedIn and GitHub below. Wishing you a beautiful journey with Kothakunjo.",
          "কথাকুঞ্জের ডেভেলপার হচ্ছেন মাহাথির আহমেদ তুষার। ব্যক্তিগত জীবনে অর্জন বলতে তেমন কিছুই নেই। কৈশোর কেটেছে শ্রেষ্ঠত্বের ক্ষুধা নিয়ে, অমরত্বের ইচ্ছা নিয়ে। বড় হওয়ার সাথে সাথে মিডিওক্রিটির সাথে আপোস করাও শেখা হয়ে গেলো। এই তুচ্ছ, অর্থহীন জীবনেও প্রায় প্রতিদিনই ভাবেন—এই নীল গ্রহ থেকে চলে যাওয়ার আগে এমন কিছু রেখে যাওয়া যায় কীনা, যার জন্যে মানুষ তাকে মনে রাখবে; তার কবরের এপিটাফে থাকবে তাজা ফুল, পৃথিবীর মানুষ জানবে যে সে একদিন এই পৃথিবীর পাড়ে বেঁচে ছিল। কিন্তু, কখনোই কিছু করে হয়ে ওঠে না তার পক্ষে। এভাবেই চলে যায় জীবন। ডেভেলপারের সাথে সংযুক্ত হতে চাইলে নিচের লিংকড-ইন ও গিটহাব প্রোফাইলে ক্লিক করুন। কথাকুঞ্জের সাথে আপনার যাত্রা শুভ হোক।"
        )}
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://github.com/Mahatir-Ahmed-Tusher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            className="w-8 h-8 hover:scale-110 transition-transform"
          />
        </a>
        <a
          href="https://www.linkedin.com/authwall?trk=gf&trkInfo=AQHjNZ_DyJ49VgAAAZdfm6ewTm6ymQE6V-dGg8PN-m4ZHewo1OgGliVVry3m7XvxA4C_HDMvmyRE0SfPVo_ZF38md-dagy7AlPYa9rMyiAvYe3e8DHzYVzr0lZ3ydK0i9L01a9o=&original_referer=&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2Fin%2Fmahatir-ahmed-tusher-5a5524257"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
            className="w-8 h-8 hover:scale-110 transition-transform"
          />
        </a>
      </div>
    </div>
  </div>
</div>


        {/* Vision Section */}
<div className="text-center bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 dark:from-purple-500/5 dark:via-blue-500/5 dark:to-green-500/5 p-12 rounded-3xl border border-purple-200/20 dark:border-purple-700/20">
  <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-6">
    {getText('Our Vision', 'আমাদের দৃষ্টিভঙ্গি')}
  </h2>
  <p className="text-lg text-purple-700 dark:text-purple-300 max-w-4xl mx-auto leading-relaxed mb-8">
    {getText(
      'We envision a future where every Bengali speaker, regardless of their location or technical background, has access to powerful AI tools that understand their language, culture, and context. কথাকুঞ্জ is our step towards making AI truly inclusive and accessible.',
      'আমরা এমন এক ভবিষ্যতের স্বপ্ন দেখি, যেখানে একজন বাংলা ভাষাভাষী মানুষ—সে যেখানেই থাকুক কিংবা যেকোনো প্রযুক্তিগত জ্ঞানের স্তরেই থাকুক—সহজেই এমন এক AI-এর সঙ্গে কথা বলতে পারবে, যে তার ভাষা বোঝে, তার সংস্কৃতি জানে, এবং তার বাস্তবতা বুঝে সাড়া দিতে পারে। কথাকুঞ্জ সেই অন্তর্ভুক্তিমূলক ও সহজলভ্য প্রযুক্তির দিকেই আমাদের এগিয়ে যাওয়া।'
    )}
  </p>
  <div className="flex justify-center">
    <div className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl font-semibold">
      {getText('Building the Future Together', 'একসাথে ভবিষ্যৎ গড়ে তুলি')}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default AboutPage;