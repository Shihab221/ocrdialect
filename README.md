# বাংলা বলে (Bangla Bole) 🎙️📄

> **Voice + Image-based Document Q&A in Bangla Dialect**

Ask questions about any document in Bangla voice & get answers in natural Bangla dialect!

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 📄 **Document Image Upload (OCR)** - Upload PDF or images, AI extracts text automatically
- 🎙️ **Voice Question in Bangla Dialect** - Ask questions in any Bangla dialect
- 🧠 **Smart Bangla Understanding** - AI deeply understands Bangla language
- 💬 **Natural Bangla Spoken Answer** - Get answers in text and voice
- 🌈 **Full Bangla Dialect Support** - Dhaka, Sylhet, Chittagong styles
- ⚡ **Instant Response** - Get answers in seconds with voice output

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ocrdialect.git

# Navigate to project directory
cd ocrdialect

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: react-dropzone
- **Confetti**: canvas-confetti
- **Theme**: next-themes

### AI/ML Stack (Backend - Future)

- **ASR**: Whisper / Hugging Face ASR
- **OCR**: IndicOCR / Tesseract
- **LLM**: Custom fine-tuned model for Bangla
- **TTS**: Coqui TTS / Google TTS

## 📁 Project Structure

```
ocrdialect/
├── app/
│   ├── (main)/
│   │   ├── page.tsx          # Home page
│   │   ├── try/
│   │   │   └── page.tsx      # Try it page
│   │   ├── about/
│   │   │   └── page.tsx      # About page
│   │   └── layout.tsx        # Main layout
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   └── cta-section.tsx
│   ├── ui/
│   │   └── button.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts
├── tailwind.config.ts
└── package.json
```

## 🎨 Design Features

- **Vibrant Colors**: Purple, Pink, Cyan, Orange, Teal gradients
- **Glassmorphism**: Beautiful blur effects on cards
- **Animations**: Smooth Framer Motion animations
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design
- **Bangla Typography**: Kalpurush font for perfect Bangla text

## 🌐 Pages

1. **Home Page** (`/`)
   - Hero section with animated gradient
   - Feature highlights (6 cards)
   - How it works (4 steps)
   - Call-to-action section

2. **Try It Page** (`/try`)
   - Document upload zone (drag & drop)
   - Voice recording with pulse animation
   - Live transcription display
   - Answer with TTS playback
   - Suggested questions

3. **About Page** (`/about`)
   - Mission statement
   - Core values
   - Tech stack badges
   - Team section
   - Open source & contact

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Made with Love

Made with ❤️ for Bangla speakers worldwide.

---

**বাংলা বলে** - মাতৃভাষায় তথ্য সবার অধিকার! 🇧🇩

