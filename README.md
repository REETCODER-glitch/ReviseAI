# ✦ REVISEAI — AI-Powered Student Revision App

> Turn any lesson into quizzes, flashcards, and summaries. Built with Next.js 14 + Claude AI.

---

## 🚀 Quick Start (3 steps)

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
```bash
cp .env.local.example .env.local
```
Then open `.env.local` and replace `your_anthropic_api_key_here` with your real key from [console.anthropic.com](https://console.anthropic.com).

### 3. Run the app
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. That's it! 🎉

---

## 📁 Project Structure

```
reviseai/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Main study page (quiz, flashcards, summary)
│   │   ├── notes/page.tsx        ← Notes manager
│   │   ├── pricing/page.tsx      ← Pricing plans
│   │   ├── partners/page.tsx     ← School partnerships
│   │   ├── api/
│   │   │   ├── generate/route.ts ← AI generation endpoint
│   │   │   └── upload/route.ts   ← File upload + text extraction
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Quiz.tsx          ← Interactive quiz with scoring
│   │       ├── Flashcards.tsx    ← 3D flip cards with spaced repetition
│   │       ├── Summary.tsx       ← AI lesson summary
│   │       └── FileUpload.tsx    ← Drag & drop PDF/DOCX upload
│   ├── lib/
│   │   ├── anthropic.ts          ← Claude AI client
│   │   ├── types.ts              ← TypeScript types
│   │   └── utils.ts              ← Utility functions
│   └── styles/
│       └── globals.css
├── .env.local.example            ← Copy this to .env.local
├── package.json
└── README.md
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI Quiz Generator** | Creates multiple-choice questions with explanations |
| 🃏 **Flashcards** | 3D flip cards with spaced repetition ratings |
| 📋 **Smart Summaries** | Key points, overview and exam tips |
| 📝 **Notes Manager** | Create, tag, colour-code and search notes |
| 📄 **Document Upload** | Extract text from PDF, DOCX, TXT, MD files |
| 💰 **Pricing Page** | Basic (free) + Premium + School plans |
| 🏫 **Partners Page** | School integrations and testimonials |

---

## 🌐 Deploy to Vercel (Free)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up (free)
3. Click **"New Project"** → import your GitHub repo
4. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
5. Click **Deploy** — your app is live in ~2 minutes! 🚀

---

## 🔑 Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for a free account
3. Go to **API Keys** → **Create Key**
4. Copy the key and paste it in `.env.local`

> **Note:** New accounts get free credits to get started.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** Anthropic Claude (claude-opus-4-5)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion ready
- **Charts:** Recharts
- **File parsing:** pdf-parse + mammoth
- **Notifications:** react-hot-toast
- **Drag & drop:** react-dropzone
- **Language:** TypeScript

---

## 📧 Support

Email: hello@reviseai.app

---

Made with ❤️ for students everywhere.
