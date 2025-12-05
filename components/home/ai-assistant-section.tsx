"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  MessageSquare,
  Globe,
  Zap,
  Brain,
  BookOpen,
  Code,
  Sparkles,
  ArrowRight,
  Languages,
  Clock,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

const translations = {
  bn: {
    badge: "নতুন ফিচার",
    title: "AI সহকারী",
    titleHighlight: "আপনার ব্যক্তিগত",
    subtitle: "Google Gemini দ্বারা চালিত শক্তিশালী AI চ্যাটবট - বাংলা ও ইংরেজি উভয় ভাষায় কথা বলুন",
    cta: "এখনই চ্যাট করুন",
    features: [
      {
        icon: Languages,
        title: "দ্বিভাষিক সাপোর্ট",
        description: "বাংলা ও ইংরেজি উভয় ভাষায় প্রশ্ন করুন এবং উত্তর পান",
      },
      {
        icon: Zap,
        title: "দ্রুত উত্তর",
        description: "Gemini 2.0 Flash দিয়ে কয়েক সেকেন্ডে উত্তর পান",
      },
      {
        icon: Brain,
        title: "বুদ্ধিমান AI",
        description: "জটিল প্রশ্নের বিস্তারিত ও সঠিক উত্তর",
      },
      {
        icon: BookOpen,
        title: "শিক্ষা সহায়ক",
        description: "যেকোনো বিষয়ে শিখুন - ইতিহাস, বিজ্ঞান, গণিত",
      },
      {
        icon: Code,
        title: "কোডিং সাহায্য",
        description: "প্রোগ্রামিং সমস্যার সমাধান ও কোড লেখা",
      },
      {
        icon: MessageSquare,
        title: "কথোপকথন",
        description: "স্বাভাবিক কথোপকথনের মতো চ্যাট করুন",
      },
    ],
    capabilities: [
      "প্রশ্নের উত্তর দেওয়া",
      "কবিতা ও গল্প লেখা",
      "অনুবাদ করা",
      "কোড লেখা ও ডিবাগ",
      "গণিত সমস্যা সমাধান",
      "রেসিপি ও টিপস",
    ],
    capabilitiesTitle: "আমাদের AI যা করতে পারে:",
  },
  en: {
    badge: "New Feature",
    title: "AI Assistant",
    titleHighlight: "Your Personal",
    subtitle: "Powerful AI chatbot powered by Google Gemini - chat in both Bengali and English",
    cta: "Start Chatting",
    features: [
      {
        icon: Languages,
        title: "Bilingual Support",
        description: "Ask questions and get answers in both Bengali and English",
      },
      {
        icon: Zap,
        title: "Fast Responses",
        description: "Get answers in seconds with Gemini 2.0 Flash",
      },
      {
        icon: Brain,
        title: "Intelligent AI",
        description: "Detailed and accurate answers to complex questions",
      },
      {
        icon: BookOpen,
        title: "Learning Helper",
        description: "Learn about any topic - history, science, math",
      },
      {
        icon: Code,
        title: "Coding Help",
        description: "Solve programming problems and write code",
      },
      {
        icon: MessageSquare,
        title: "Natural Chat",
        description: "Chat naturally like a conversation",
      },
    ],
    capabilities: [
      "Answer questions",
      "Write poems & stories",
      "Translate text",
      "Write & debug code",
      "Solve math problems",
      "Recipes & tips",
    ],
    capabilitiesTitle: "What our AI can do:",
  },
};

export function AiAssistantSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bangla-purple-50/50 to-transparent dark:via-bangla-purple-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4",
              lang === "bn" && "bangla-text"
            )}
          >
            <Sparkles className="w-4 h-4" />
            {t.badge}
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              lang === "bn" && "bangla-text"
            )}
          >
            <span className="text-slate-900 dark:text-white">{t.titleHighlight}</span>{" "}
            <span className="gradient-text">{t.title}</span>
          </h2>
          <p
            className={cn(
              "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto",
              lang === "bn" && "bangla-text"
            )}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="glass-card p-6 md:p-8">
              {/* Chat Preview Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-semibold text-slate-900 dark:text-white",
                      lang === "bn" && "bangla-text"
                    )}
                  >
                    {t.title}
                  </h3>
                  <p className="text-sm text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              {/* Mock Chat Messages */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 text-white">
                    <p className="bangla-text text-sm">
                      {lang === "bn" ? "বাংলাদেশের জাতীয় ফুল কী?" : "What is the national flower of Bangladesh?"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex"
                >
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-slate-100 dark:bg-slate-800">
                    <p className="bangla-text text-sm text-slate-900 dark:text-white">
                      {lang === "bn" 
                        ? "বাংলাদেশের জাতীয় ফুল হলো শাপলা (Nymphaea nouchali)। এটি একটি জলজ ফুল যা বাংলাদেশের বিল, হাওর ও জলাশয়ে প্রচুর পরিমাণে জন্মে। 🌸"
                        : "The national flower of Bangladesh is the Water Lily (Nymphaea nouchali). It's an aquatic flower that grows abundantly in the lakes, haors, and water bodies of Bangladesh. 🌸"
                      }
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 text-white">
                    <p className="bangla-text text-sm">
                      {lang === "bn" ? "ধন্যবাদ! 🙏" : "Thank you! 🙏"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Capabilities Tags */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p
                  className={cn(
                    "text-xs text-slate-500 dark:text-slate-400 mb-3",
                    lang === "bn" && "bangla-text"
                  )}
                >
                  {t.capabilitiesTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.capabilities.map((cap, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={cn(
                        "px-3 py-1 rounded-full bg-bangla-purple-100 dark:bg-bangla-purple-900/30 text-bangla-purple-700 dark:text-bangla-purple-300 text-xs",
                        lang === "bn" && "bangla-text"
                      )}
                    >
                      {cap}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-bangla-pink-400/30 to-bangla-orange-400/30 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-bangla-purple-400/30 to-bangla-pink-400/30 rounded-full -z-10" />
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-bangla-purple-300 dark:hover:border-bangla-purple-700 transition-all hover:shadow-lg"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl mb-3 flex items-center justify-center",
                    index % 3 === 0
                      ? "bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500"
                      : index % 3 === 1
                      ? "bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500"
                      : "bg-gradient-to-br from-bangla-purple-600 to-bangla-purple-400"
                  )}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3
                  className={cn(
                    "font-semibold text-slate-900 dark:text-white mb-1",
                    lang === "bn" && "bangla-text"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "text-sm text-slate-600 dark:text-slate-400",
                    lang === "bn" && "bangla-text"
                  )}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/assistant">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow text-lg",
                lang === "bn" && "bangla-text"
              )}
            >
              <Bot className="w-5 h-5" />
              {t.cta}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

