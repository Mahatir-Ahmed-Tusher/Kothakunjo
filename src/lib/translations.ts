export type Language = 'bn' | 'en';

export const translations: Record<Language, any> = {
    bn: {
        // App Name
        appName: 'কথাকুঞ্জ',

        // Navigation
        menu: 'মেনু',
        settings: 'সেটিংস',
        logout: 'লগ আউট',
        login: 'লগ ইন',

        // Sidebar
        newChat: 'নতুন চ্যাট',
        chatHistory: 'চ্যাট ইতিহাস',
        characterCreation: 'আয়নাবাজি',
        rename: 'নাম পরিবর্তন',
        delete: 'মুছে ফেলুন',
        confirmDeleteChat: 'আপনি কি এই চ্যাটটি মুছে ফেলতে চান?',
        confirmClearHistory: 'আপনি কি সব চ্যাট হিস্ট্রি মুছে ফেলতে চান?',
        promptNewTitle: 'নতুন শিরোনাম লিখুন:',

        // Chat Interface
        typeMessage: 'লিখে ফেলুন নির্দ্বিধায়!',
        send: 'পাঠান',
        loginToContinue: 'চালিয়ে যেতে লগ ইন করুন',
        welcomeMessage: 'কথাকুঞ্জে স্বাগতম',
        aiCompanion: 'কথা বলুন আপনারই মাতৃভাষায়',
        canMakeMistakes: 'কথাকুঞ্জ ভুল করতে পারে। গুরুত্বপূর্ণ তথ্য যাচাই করুন।',
        loading: 'লোডিং...',
        today: 'আজ',

        // Character Creation
        profilePicture: 'প্রোফাইল ছবি',
        clickToChange: 'ইমোজি পরিবর্তন করতে ক্লিক করুন',
        name: 'নাম',
        enterName: 'নাম লিখুন...',
        gender: 'লিঙ্গ',
        female: 'মহিলা',
        male: 'পুরুষ',
        other: 'অন্যান্য',
        role: 'ভুমিকা',
        roleExample: 'जैसे- বন্ধু, শিক্ষক, সহায়ক...',
        age: 'বয়স',
        enterAge: 'বয়স লিখুন...',
        history: 'ইতিহাস/পটভূমি',
        historyPlaceholder: 'তাদের পটভূমি, ব্যক্তিত্ব, আগ্রহ সম্পর্কে বলুন...',
        relationship: 'আপনার সাথে সম্পর্ক',
        relationshipPlaceholder: 'আপনার সম্পর্ক এবং ভাগ করা ইতিহাস বর্ণনা করুন...',
        chooseTheme: 'থিম নির্বাচন করুন',
        startChatting: 'এবার গপ্পো হোক',
        back: 'ফিরে যান',
        chooseEmoji: 'ইমোজি পছন্দ করুন',
        imageSizeError: 'অনুগ্রহ করে ২ মেগাবাইটের চেয়ে ছোট ছবি আপলোড করুন।',
        userMemory: 'ব্যবহারকারীর স্মৃতি (User Memory)',
        resultPreference: 'ফলাফল পছন্দ (Result Preference)',
        memoryPlaceholder: "আপনার সম্পর্কে কিছু তথ্য দিন (যেমন: 'আমার বিড়াল পছন্দ', 'আমি ঢাকায় থাকি')। এটি এআই-কে সঠিক উত্তর দিতে সাহায্য করবে।",
        preferencePlaceholder: "এআই-এর উত্তর কেমন হওয়া উচিত? (যেমন: 'উত্তরে সবসময় ইমোজি ব্যবহার করো', 'সবসময় ফর্মাল ভাষায় কথা বলো')।",
        save: 'সেভ করুন',
        saveSuccess: 'সফলভাবে সেভ হয়েছে!',
        offlineError: 'আপনি বর্তমানে অফলাইনে আছেন। ইন্টারনেট সংযোগ ফিরে এলে আবার চেষ্টা করুন।',
        permissionError: 'আপনার এই তথ্য সেভ করার অনুমতি নেই। আবার লগইন করে দেখুন।',
        saveError: 'সেভ করার সময় একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',

        // Character Defaults
        defaultCharName: 'কথাকুঞ্জ',
        defaultCharRole: 'এআই সহায়ক',
        defaultCharAge: 'কালজয়ী',
        defaultCharHistory: 'একটি বন্ধুত্বপূর্ণ এবং সহায়ক এআই সহায়ক যা যেকোনো বিষয়ে সাহায্য করতে প্রস্তুত',
        defaultCharRelationship: 'আপনার সহায়ক সঙ্গী',

        // Settings
        account: 'অ্যাকাউন্ট',
        email: 'ইমেইল',
        changePassword: 'পাসওয়ার্ড পরিবর্তন করুন',
        manageAccount: 'অ্যাকাউন্ট পরিচালনা',
        appearance: 'চেহারা',
        currentTheme: 'বর্তমান থিম',
        notifications: 'নোটিফিকেশন',
        desktopNotifications: 'ডেস্কটপ নোটিফিকেশন',
        soundEffects: 'সাউন্ড ইফেক্ট',
        privacySecurity: 'গোপনীয়তা ও নিরাপত্তা',
        clearChatHistory: 'চ্যাট ইতিহাস মুছে ফেলুন',
        exportData: 'ডেটা এক্সপোর্ট করুন',
        deleteAccount: 'অ্যাকাউন্ট মুছে ফেলুন',
        about: 'সম্পর্কে',
        version: 'ভার্সন',
        language: 'ভাষা (Language)',
        bangla: 'বাংলা',
        english: 'English',
        fontSelection: 'ফন্ট নির্বাচন (Fonts)',
        personalization: 'ব্যক্তিগতকরণ (Personalization)',
        ayanabajiActiveNote: 'দ্রষ্টব্য: আয়নাবাজি মোড বর্তমানে সক্রিয়। সাধারণ মোডে ফিরে গেলে আপনার কাস্টম থিম দেখতে পাবেন।',
        logoutDesc: 'আপনার সেশন শেষ করুন',
        madeBy: 'Kothakunjo Team-এর পক্ষ থেকে 💙 দিয়ে তৈরি',

        // About Page
        aboutContent: {
            p1: "কথাকুঞ্জ হলো আপনার আমার মতোই বাংলায় সাবলীল, প্রাঞ্জল একটা চ্যাটবট। ধরে নিন, আপনার কোনো অনলাইনের বন্ধু, যার সাথে আপনি কখনো আড্ডা দেবেন নিজের জীবনের সুখ, দুঃখ নিয়ে। কিংবা মাঝে মাঝে মেতে যাবেন প্রযুক্তি, রাজনীতি, দর্শন, বিজ্ঞান ইত্যাদি নার্ডি সব বিষয় নিয়ে।",
            p2: "সাধারণত ইংরেজিতে ভালো কাজ করে, এমন এআই মডেল আছে অনেক। কিন্তু বাংলা ভাষার জন্য ডেডিকেটেড এমন এআই চ্যাটবট নেই বললেই চলে। এ সমস্যা নিসরণ উদ্দ্যেশ্যেই আমি মাহাথির আহমেদ তুষার ভাষার মাস কে শ্রদ্ধা জানিয়ে এ উদ্যোগ নিয়েছি।",
            p3: "এটা খুবই স্বাভাবিক যে, আপনি বাঙালী হওয়া সত্ত্বেও কথাকুঞ্জ শব্দটির অর্থ জানেন না এখনও। কথাকুঞ্জ শব্দটি কথা এবং কুঞ্জ- এই দুই শব্দের সমন্বয়ে গঠিত। কথা শব্দের অর্থ হলো বচন, গল্প, আখ্যান। আর কুঞ্জ অর্থ লতাদি দ্বারা আচ্ছাদিত গৃহাকার স্থান; লতাগৃহ, উপবন ইত্যাদি বোঝায়। দুটো মিলিয়ে বোঝায়, যেখানে সম্ভার ঘটেছে কথার।",
            p4: "এই কৃত্রিম বুদ্ধিমত্তা আপনার সাথে কথা বলবে, আপনার কথা শুনবে। আপনাকে গল্প শোনাাবে, ইতিহাস, বিজ্ঞান, দর্শন, সাহিত্য শেখাবে। এবং সেটা আপনার মায়ের ভাষায়। মধুর ভাষায়।",
            visionLabel: "আমাদের স্বপ্ন",
            vision: "আমরা এমন এক ভবিষ্যতের স্বপ্ন দেখি, যেখানে একজন বাংলা ভাষাভাষী মানুষ—সে যেখানেই থাকুক কিংবা যেকোনো প্রযুক্তিগত জ্ঞানের স্তরেই থাকুক—সহজেই এমন এক AI-এর সঙ্গে কথা বলতে পারবে, যে তার ভাষা বোঝে, তার সংস্কৃতি জানে, এবং তার বাস্তবতা বুঝে সাড়া দিতে পারে। কথাকুঞ্জ সেই অন্তর্ভুক্তিমূলক ও সহজলভ্য প্রযুক্তির দিকেই আমাদের এগিয়ে যাওয়া।",
            founder: "প্রতিষ্ঠাতা ও ডেভেলপার"
        },

        // Themes
        themes: {
            default: 'Default',
            defaultDesc: 'Soothing Light Blue',
            wallflower: 'Wallflower',
            wallflowerDesc: 'Soft pink and lavender tones',
            punkRock: 'Punk Rock',
            punkRockDesc: 'Dark with neon green accents',
            okayBoomer: 'Okay Boomer',
            okayBoomerDesc: 'Clean white/gray minimal design',
            dinosaur: 'Dinosaur シ',
            dinosaurDesc: '80s Eliza-style retro terminal',
        },

        // Plugins
        plugins: 'প্লাগইন',
        selectPlugins: 'আপনার চ্যাট উন্নত করতে প্লাগইন নির্বাচন করুন',
        webSearch: 'ওয়েব সার্চ',
        webSearchDesc: 'রিয়েল-টাইম তথ্যের জন্য ইন্টারনেট অনুসন্ধান করুন',
        factCheck: 'ফ্যাক্টচেক',
        factCheckDesc: 'তথ্য যাচাই এবং তথ্য পরীক্ষা করুন',
        imageGeneration: 'ছবি তৈরি',
        imageGenerationDesc: 'বর্ণনার উপর ভিত্তি করে ছবি তৈরি করুন',
        deepSearch: 'ডিপ সার্চ',
        deepSearchDesc: 'গভীর গবেষণা এবং বিশ্লেষণ',

        // Kinnori Mode
        kinnoriMode: 'আয়নাবাজি মোড',
        normalMode: 'সাধারণ মোড',
        switchToNormal: 'সাধারণ মোডে ফিরে যান',
        switchToKinnori: 'আয়নাবাজি মোডে যান',
    },
    en: {
        // App Name
        appName: 'KothaKunjo',

        // Navigation
        menu: 'Menu',
        settings: 'Settings',
        logout: 'Log Out',
        login: 'Log In',

        // Sidebar
        newChat: 'New Chat',
        chatHistory: 'Chat History',
        characterCreation: 'Ayanabaji',
        rename: 'Rename',
        delete: 'Delete',
        confirmDeleteChat: 'Are you sure you want to delete this chat?',
        confirmClearHistory: 'Are you sure you want to clear all chat history?',
        promptNewTitle: 'Enter new title:',

        // Chat Interface
        typeMessage: 'Type freely...',
        send: 'Send',
        loginToContinue: 'Login to continue',
        welcomeMessage: 'Welcome to KothaKunjo',
        aiCompanion: 'Talk in your own language',
        canMakeMistakes: 'KothaKunjo can make mistakes. Verify important info.',
        loading: 'Loading...',
        today: 'Today',

        // Character Creation
        profilePicture: 'Profile Picture',
        clickToChange: 'Click to change emoji',
        name: 'Name',
        enterName: 'Enter name...',
        gender: 'Gender',
        female: 'Female',
        male: 'Male',
        other: 'Other',
        role: 'Role',
        roleExample: 'e.g., Friend, Teacher, Assistant...',
        age: 'Age',
        enterAge: 'Enter age...',
        history: 'History/Background',
        historyPlaceholder: 'Tell about their background, personality, interests...',
        relationship: 'Relationship with you',
        relationshipPlaceholder: 'Describe your relationship and shared history...',
        chooseTheme: 'Choose Theme',
        startChatting: 'Start Chatting',
        back: 'Back',
        chooseEmoji: 'Choose an emoji',
        imageSizeError: 'Please upload an image smaller than 2MB.',
        userMemory: 'User Memory',
        resultPreference: 'Result Preference',
        memoryPlaceholder: "Tell the AI about yourself (e.g., 'I like cats', 'I live in Dhaka'). This helps the AI personalize its responses.",
        preferencePlaceholder: "How should the AI respond? (e.g., 'Always use emojis', 'Keep it formal').",
        save: 'Save',
        saveSuccess: 'Saved successfully!',
        offlineError: 'You are currently offline. Please try again once you are back online.',
        permissionError: "You don't have permission to save this data. Please try logging in again.",
        saveError: 'Something went wrong while saving. Please try again.',

        // Character Defaults
        defaultCharName: 'KothaKunjo',
        defaultCharRole: 'AI Assistant',
        defaultCharAge: 'Timeless',
        defaultCharHistory: 'A friendly and helpful AI assistant ready to help with anything',
        defaultCharRelationship: 'Your helpful companion',

        // Settings
        account: 'Account',
        email: 'Email',
        changePassword: 'Change Password',
        manageAccount: 'Manage Account',
        appearance: 'Appearance',
        currentTheme: 'Current Theme',
        notifications: 'Notifications',
        desktopNotifications: 'Desktop Notifications',
        soundEffects: 'Sound Effects',
        privacySecurity: 'Privacy & Security',
        clearChatHistory: 'Clear Chat History',
        exportData: 'Export Data',
        deleteAccount: 'Delete Account',
        about: 'About',
        version: 'Version',
        language: 'Language',
        bangla: 'Bengali',
        english: 'English',
        fontSelection: 'Font Selection',
        personalization: 'Personalization',
        ayanabajiActiveNote: 'Note: Ayanabaji mode is currently active. Switch back to Normal mode to see your custom theme.',
        logoutDesc: 'End your session',
        madeBy: 'Made with 💙 by Kothakunjo Team',

        // About Page
        aboutContent: {
            p1: "KothaKunjo is a conversational AI that is fluent and natural in Bengali, just like us. Think of it as your online friend with whom you can chat about your life's joys and sorrows, or dive deep into tech, politics, philosophy, science, and more.",
            p2: "While many AI models excel in English, dedicated conversational AI for the Bengali language is rare. To bridge this gap, I, Mahatir Ahmed Tusher, took this initiative as a tribute to the month of the Language Movement.",
            p3: "The word 'KothaKunjo' is composed of two words: 'Kotha' (speech/story) and 'Kunjo' (a bower or a garden-like place). Together, it signifies a place where stories and conversations blossom.",
            p4: "This AI will talk with you, listen to you, tell you stories, and teach you about history, science, philosophy, and literature—all in your mother tongue.",
            visionLabel: "Our Vision",
            vision: "We envision a future where every Bengali-speaking person—regardless of their location or technical expertise—can easily communicate with an AI that understands their language, culture, and reality. KothaKunjo is our step towards that inclusive and accessible technology.",
            founder: "Founder & Developer"
        },

        // Themes
        themes: {
            default: 'Default',
            defaultDesc: 'Soothing Light Blue',
            wallflower: 'Wallflower',
            wallflowerDesc: 'Soft pink and lavender tones',
            punkRock: 'Punk Rock',
            punkRockDesc: 'Dark with neon green accents',
            okayBoomer: 'Okay Boomer',
            okayBoomerDesc: 'Clean white/gray minimal design',
            dinosaur: 'Dinosaur シ',
            dinosaurDesc: '80s Eliza-style retro terminal',
        },

        // Plugins
        plugins: 'Plugins',
        selectPlugins: 'Select plugins to enhance your chat',
        webSearch: 'Web Search',
        webSearchDesc: 'Search the internet for real-time info',
        factCheck: 'Fact Check',
        factCheckDesc: 'Verify facts and check information',
        imageGeneration: 'Image Gen',
        imageGenerationDesc: 'Generate images based on descriptions',
        deepSearch: 'Deep Search',
        deepSearchDesc: 'Deep research and analysis',

        // Kinnori Mode
        kinnoriMode: 'Ayanabaji Mode',
        normalMode: 'Normal Mode',
        switchToNormal: 'Back to Normal Mode',
        switchToKinnori: 'Go to Ayanabaji Mode',
    }
};

export const bn = translations.bn; // Legacy support

