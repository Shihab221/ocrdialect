"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mic,
  FileImage,
  Sparkles,
  ArrowRight,
  Volume2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingElements = [
  { icon: "📄", delay: 0, x: "10%", y: "20%" },
  { icon: "🎙️", delay: 0.5, x: "85%", y: "15%" },
  { icon: "🧠", delay: 1, x: "75%", y: "75%" },
  { icon: "💬", delay: 1.5, x: "15%", y: "70%" },
  { icon: "🌈", delay: 2, x: "50%", y: "85%" },
  { icon: "⚡", delay: 2.5, x: "90%", y: "50%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient-bg opacity-20" />
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bangla-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bangla-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bangla-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: el.delay, duration: 0.5 }}
          style={{ left: el.x, top: el.y }}
          className="absolute text-3xl md:text-4xl float-element hidden md:block"
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="bangla-text">নতুন AI-চালিত বাংলা অ্যাপ!</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bangla-text leading-tight"
          >
            <span className="gradient-text">আপনার ডকুমেন্টের</span>
            <br />
            <span className="text-slate-900 dark:text-white">
              প্রশ্নের উত্তর{" "}
            </span>
            <span className="gradient-text-warm">বাংলায় শুনুন!</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8"
          >
            Ask questions about any document in{" "}
            <span className="text-bangla-purple-500 font-semibold">
              Bangla voice
            </span>{" "}
            & get answers in natural{" "}
            <span className="text-bangla-pink-500 font-semibold">
              Bangla dialect
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/try">
              <Button size="xl" className="group">
                <span className="bangla-text">এখনই চেষ্টা করুন — ফ্রি!</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="xl">
                <span className="bangla-text">কিভাবে কাজ করে?</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Cards Preview */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="glass-card p-6 md:p-8 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FileImage className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 bangla-text">
                  ডকুমেন্ট আপলোড করুন
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text">
                  PDF বা ছবি টেনে আনুন অথবা ক্লিক করে আপলোড করুন
                </p>
              </div>
            </div>
            <div className="mt-6 border-2 border-dashed border-bangla-purple-300/50 dark:border-bangla-purple-600/50 rounded-2xl p-6 flex flex-col items-center justify-center group-hover:border-bangla-pink-400 transition-colors">
              <Upload className="w-10 h-10 text-bangla-purple-400 mb-2" />
              <span className="text-sm text-slate-500 dark:text-slate-400 bangla-text">
                এখানে ফাইল ড্রপ করুন
              </span>
            </div>
          </motion.div>

          {/* Voice Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{ scale: 1.02, rotateY: -5 }}
            className="glass-card p-6 md:p-8 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 bangla-text">
                  বাংলায় প্রশ্ন করুন
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text">
                  মাইক বাটনে ক্লিক করে আপনার প্রশ্ন বলুন
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500 flex items-center justify-center shadow-xl cursor-pointer">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-bangla-pink-500/30 animate-ping" />
              </motion.div>
              <div className="flex items-center gap-2 mt-4 text-slate-600 dark:text-slate-400">
                <Volume2 className="w-4 h-4" />
                <span className="text-sm bangla-text">
                  উত্তর বাংলায় শুনুন
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            className="fill-white/50 dark:fill-slate-800/50"
          />
        </svg>
      </div>
    </section>
  );
}

