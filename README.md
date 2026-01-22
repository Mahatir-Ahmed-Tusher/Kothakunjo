# কথাকুঞ্জ (Kothakunjo) - v3.0.0

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://kothakunjo.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Next.js%2016-Tailwind%204-blue?style=for-the-badge&logo=next.js)](https://nextjs.org)

**কথাকুঞ্জ** (Kothakunjo) is your friendly AI companion, designed specifically for the Bengali language. Version 3 brings significant advancements in user experience, visual aesthetics, and interactive features.

## 🚀 Key Advancements in Version 3.0.0

- **Dynamic Suggestive UI**: Replaced static welcome messages with a dynamic prompt system and interactive suggestion cards that refresh on every session.
- **Delayed Login Flow**: Allows users to interact with the AI immediately. A professional login overlay onlyappears on the first message attempt, preserving user input and providing a seamless transition.
- **Theme Engine**: Five distinct themes (Default, Wallflower, Punk Rock, Okay Boomer, Dinosaur) with unique color palettes, icons, and specialized font pairings.
- **Ayanabaji Branding**: Rebranded the AI companion to "আয়নাবাজি" with custom avatars and personalized settings.
- **Advanced Plugin System**: Integrated support for Web Search, Fact Checking, and AI Image Generation.
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop experiences with a focus on fluid animations.

## 🛠 Tech Stack

- **Frontend**: 
  - Framework: [Next.js](https://nextjs.org) (App Router)
  - Styling: [Tailwind CSS](https://tailwindcss.com) (v4)
  - Animations: [Framer Motion](https://motion.dev) (`motion/react`)
  - Icons: [Lucide React](https://lucide.dev)
- **Backend & Services**:
  - API: Next.js API Routes (Edge Runtime optimized)
  - AI Models: [Google Gemini](https://ai.google.dev), [Groq](https://groq.com)
  - Search Provider: [Serper.dev](https://serper.dev)
  - Image Generation: [Pollinations.ai](https://pollinations.ai)
  - Database & Auth: [Firebase](https://firebase.google.com) (Firestore, Authentication)
- **Fonts**: 
  - [Hind Siliguri](https://fonts.google.com/specimen/Hind+Siliguri) (Primary)
  - [Tiro Bangla](https://fonts.google.com/specimen/Tiro+Bangla) (Elegant Secondary)
  - [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) & [Bornomala Vintage](https://banglawebfonts.pages.dev) (Dinosaur Theme)

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/            # Serverless API routes (Chat, Plugins)
│   ├── components/     # UI Components (Sidebar, Navbar, Settings, Modals)
│   ├── context/        # Global state (Authentication via AuthContext)
│   ├── layout.tsx      # Root layout and font configurations
│   └── page.tsx        # Main application entry point
├── lib/
│   ├── firebase.ts     # Firebase initialization
│   ├── translations.ts # Centralized Bengali localization
│   └── utils.ts        # Helper functions
└── styles/
    ├── index.css       # Tailwind entry and global styles
    └── fonts.css       # Custom font-face and theme-specific overrides
```

## 👨‍💻 Founder & Developer

**Mahatir Ahmed Tusher**  
The sole visionary and developer behind Kothakunjo. Originally launched to celebrate the month of language, Kothakunjo has evolved into a sophisticated AI platform for Bengali speakers.

- 📧 Email: [mahatirtusher@gmail.com](mailto:mahatirtusher@gmail.com)
- 🔗 LinkedIn: [linkedin.com/in/mahatir-ahmed-tusher-5a5524257](https://in.linkedin.com/in/mahatir-ahmed-tusher-5a5524257)
- 🎓 Google Scholar: [scholar.google.com/citations?user=k8hhhx4AAAAJ](https://scholar.google.com/citations?user=k8hhhx4AAAAJ&hl=en)

---
*© 2026 Kothakunjo. Built with ❤️ for the Bengali Language.*