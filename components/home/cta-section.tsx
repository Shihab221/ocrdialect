"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bangla-purple-600 via-bangla-pink-500 to-bangla-purple-600" />

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-4 border-white" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full border-4 border-white" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span className="bangla-text">সম্পূর্ণ বিনামূল্যে!</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 bangla-text leading-tight"
        >
          এখনই শুরু করুন
          <br />
          <span className="text-white/90">আপনার ডকুমেন্ট জিজ্ঞাসাবাদ!</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          No signup required. Just upload, speak, and get answers in Bangla!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/try">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 rounded-2xl bg-white font-bold text-xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <span className="flex items-center gap-3 gradient-text bangla-text">
                এখনই চেষ্টা করুন — ফ্রি!
                <ArrowRight className="w-6 h-6 text-bangla-purple-500 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <span className="bangla-text">নিরাপদ ও গোপনীয়</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="bangla-text">তাৎক্ষণিক উত্তর</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg">🌐</span>
            <span className="bangla-text">সব উপভাষায়</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
