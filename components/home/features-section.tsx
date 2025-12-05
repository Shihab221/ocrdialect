"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Mic,
  Brain,
  MessageSquare,
  Globe2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ডকুমেন্ট ছবি আপলোড",
    titleEn: "Document Image Upload (OCR)",
    description:
      "PDF বা ছবি আপলোড করুন। আমাদের AI স্বয়ংক্রিয়ভাবে টেক্সট পড়ে নেয়।",
    gradient: "from-bangla-purple-500 to-bangla-purple-600",
    bgGradient: "from-bangla-purple-50 to-bangla-purple-100",
    darkBgGradient: "dark:from-bangla-purple-900/30 dark:to-bangla-purple-800/30",
  },
  {
    icon: Mic,
    title: "বাংলায় ভয়েস প্রশ্ন",
    titleEn: "Voice Question in Bangla Dialect (ASR)",
    description:
      "মাইকে ক্লিক করে আপনার প্রশ্ন বাংলায় বলুন। যেকোনো উপভাষায়!",
    gradient: "from-bangla-pink-500 to-bangla-pink-600",
    bgGradient: "from-bangla-pink-50 to-bangla-pink-100",
    darkBgGradient: "dark:from-bangla-pink-900/30 dark:to-bangla-pink-800/30",
  },
  {
    icon: Brain,
    title: "স্মার্ট বাংলা বোঝাপড়া",
    titleEn: "Smart Bangla Understanding",
    description:
      "আমাদের AI বাংলা ভাষা গভীরভাবে বোঝে এবং সঠিক উত্তর খুঁজে দেয়।",
    gradient: "from-bangla-purple-600 to-bangla-pink-500",
    bgGradient: "from-bangla-purple-50 to-bangla-pink-50",
    darkBgGradient: "dark:from-bangla-purple-900/30 dark:to-bangla-pink-900/30",
  },
  {
    icon: MessageSquare,
    title: "স্বাভাবিক বাংলা উত্তর",
    titleEn: "Natural Bangla Spoken Answer",
    description:
      "উত্তর লেখা ও কথায় পাবেন — একদম স্বাভাবিক বাংলায়!",
    gradient: "from-bangla-pink-500 to-bangla-orange-500",
    bgGradient: "from-bangla-pink-50 to-bangla-orange-50",
    darkBgGradient: "dark:from-bangla-pink-900/30 dark:to-bangla-orange-900/30",
  },
  {
    icon: Globe2,
    title: "সব উপভাষায় সাপোর্ট",
    titleEn: "Full Bangla Dialect Support",
    description:
      "ঢাকাইয়া, সিলেটি, চট্টগ্রামী — আপনার উপভাষায় কথা বলুন!",
    gradient: "from-bangla-purple-500 to-bangla-pink-500",
    bgGradient: "from-bangla-purple-50 to-bangla-pink-50",
    darkBgGradient: "dark:from-bangla-purple-900/30 dark:to-bangla-pink-900/30",
  },
  {
    icon: Zap,
    title: "তাৎক্ষণিক উত্তর",
    titleEn: "Instant Response with Voice Output",
    description:
      "মাত্র কয়েক সেকেন্ডে পান আপনার প্রশ্নের উত্তর — ভয়েস সহ!",
    gradient: "from-bangla-orange-500 to-bangla-pink-500",
    bgGradient: "from-bangla-orange-50 to-bangla-pink-50",
    darkBgGradient: "dark:from-bangla-orange-900/30 dark:to-bangla-pink-900/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-bangla-purple-50/30 dark:from-slate-800 dark:to-slate-900" />
      
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
            ✨ বৈশিষ্ট্যসমূহ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bangla-text">
            <span className="gradient-text">কেন বাংলা বলে?</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto bangla-text">
            আমাদের শক্তিশালী ফিচারগুলো আপনার ডকুমেন্ট বোঝা সহজ করে দেয়
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`feature-card bg-gradient-to-br ${feature.bgGradient} ${feature.darkBgGradient}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-4`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 bangla-text">
                {feature.title}
              </h3>
              <p className="text-xs text-bangla-purple-600 dark:text-bangla-purple-400 mb-3">
                {feature.titleEn}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
