"use client";

import { motion } from "framer-motion";
import { Upload, Mic, Cpu, Volume2, ArrowDown } from "lucide-react";

const steps = [
  {
    number: "১",
    icon: Upload,
    title: "ডকুমেন্ট আপলোড করুন",
    titleEn: "Upload Document",
    description:
      "PDF বা ছবি আপলোড করুন → OCR স্বয়ংক্রিয়ভাবে টেক্সট বের করে নেয়",
    gradient: "from-bangla-purple-500 to-bangla-purple-600",
  },
  {
    number: "২",
    icon: Mic,
    title: "বাংলায় প্রশ্ন বলুন",
    titleEn: "Speak Your Question",
    description:
      "মাইকে ক্লিক করে আপনার প্রশ্ন বাংলায় বলুন → ASR টেক্সটে রূপান্তর করে",
    gradient: "from-bangla-pink-500 to-bangla-pink-600",
  },
  {
    number: "৩",
    icon: Cpu,
    title: "AI বিশ্লেষণ করে",
    titleEn: "AI Analyzes",
    description:
      "AI ডকুমেন্ট পড়ে + আপনার প্রশ্ন বোঝে → সঠিক উত্তর খুঁজে দেয়",
    gradient: "from-bangla-purple-500 to-bangla-pink-500",
  },
  {
    number: "৪",
    icon: Volume2,
    title: "বাংলায় উত্তর শুনুন",
    titleEn: "Hear Answer in Bangla",
    description:
      "উত্তর স্বাভাবিক বাংলায় পান — লেখায় ও কথায় (TTS)!",
    gradient: "from-bangla-pink-500 to-bangla-orange-500",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bangla-purple-50/30 to-white dark:from-slate-900 dark:to-slate-800" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-bangla-purple-100/50 to-transparent dark:from-bangla-purple-900/20" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-bangla-pink-100/50 to-transparent dark:from-bangla-pink-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4 bangla-text">
            🔄 কিভাবে কাজ করে
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bangla-text">
            <span className="gradient-text">চার ধাপে সব সমাধান</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto bangla-text">
            খুব সহজ প্রক্রিয়ায় আপনার ডকুমেন্ট থেকে উত্তর পান
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 transform -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <ArrowDown className="w-6 h-6 text-bangla-purple-400" />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 text-center h-full hover:shadow-xl transition-shadow"
                >
                  {/* Number Badge */}
                  <div
                    className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 bangla-text`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.gradient}/20 flex items-center justify-center mb-4`}
                  >
                    <step.icon className="w-8 h-8 text-bangla-purple-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 bangla-text">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {step.titleEn}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
