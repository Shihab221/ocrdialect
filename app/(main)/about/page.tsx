"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Globe2,
  Users,
  Code2,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Target,
  Lightbulb,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const techStack = [
  { name: "Next.js 14", color: "bg-slate-900 dark:bg-white dark:text-slate-900" },
  { name: "React", color: "bg-bangla-purple-500" },
  { name: "Tailwind CSS", color: "bg-bangla-pink-500" },
  { name: "Framer Motion", color: "bg-bangla-purple-600" },
  { name: "TypeScript", color: "bg-bangla-purple-700" },
  { name: "Whisper ASR", color: "bg-bangla-pink-600" },
  { name: "IndicOCR", color: "bg-bangla-orange-500" },
  { name: "Coqui TTS", color: "bg-bangla-purple-500" },
  { name: "shadcn/ui", color: "bg-slate-700" },
  { name: "Hugging Face", color: "bg-bangla-pink-500" },
];

const values = [
  {
    icon: Target,
    title: "অভিগম্যতা",
    titleEn: "Accessibility",
    description:
      "মাতৃভাষায় তথ্য সবার জন্য সহজলভ্য করা — বিশেষ করে গ্রামীণ ও উপভাষা-ভাষী বাংলা ব্যবহারকারীদের জন্য।",
    gradient: "from-bangla-purple-500 to-bangla-purple-600",
  },
  {
    icon: Lightbulb,
    title: "উদ্ভাবন",
    titleEn: "Innovation",
    description:
      "সর্বাধুনিক AI প্রযুক্তি ব্যবহার করে বাংলা ভাষা প্রক্রিয়াকরণে নতুন মাত্রা যোগ করা।",
    gradient: "from-bangla-pink-500 to-bangla-pink-600",
  },
  {
    icon: Shield,
    title: "গোপনীয়তা",
    titleEn: "Privacy",
    description:
      "আপনার ডকুমেন্ট সম্পূর্ণ নিরাপদ। আমরা কোনো তথ্য সংরক্ষণ করি না।",
    gradient: "from-bangla-purple-500 to-bangla-pink-500",
  },
];

const team = [
  {
    name: "রহিম আহমেদ",
    nameEn: "Rahim Ahmed",
    role: "Founder & Lead Developer",
    avatar: "👨‍💻",
    gradient: "from-bangla-purple-500 to-bangla-pink-500",
  },
  {
    name: "সুমাইয়া খান",
    nameEn: "Sumaiya Khan",
    role: "AI/ML Engineer",
    avatar: "👩‍🔬",
    gradient: "from-bangla-pink-500 to-bangla-orange-500",
  },
  {
    name: "করিম হোসেন",
    nameEn: "Karim Hossain",
    role: "UX Designer",
    avatar: "🎨",
    gradient: "from-bangla-purple-500 to-bangla-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bangla-purple-100/50 via-white to-bangla-pink-100/50 dark:from-bangla-purple-900/20 dark:via-slate-900 dark:to-bangla-pink-900/20" />
        
        {/* Decorative */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-bangla-purple-200/30 to-transparent dark:from-bangla-purple-800/20" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-bangla-pink-200/30 to-transparent dark:from-bangla-pink-800/20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            <span className="bangla-text">আমাদের গল্প</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bangla-text"
          >
            <span className="gradient-text">বাংলা বলে</span>
            <span className="text-slate-900 dark:text-white">
              {" "}
              কেন তৈরি করলাম?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto bangla-text leading-relaxed"
          >
            আমাদের লক্ষ্য হলো মাতৃভাষায় তথ্য সবার জন্য সহজলভ্য করা — বিশেষ করে
            যারা ইংরেজি বা আনুষ্ঠানিক বাংলায় স্বাচ্ছন্দ্য বোধ করেন না, তাদের
            জন্য। গ্রামের মানুষ, বয়স্ক মানুষ, এবং যারা বিভিন্ন উপভাষায় কথা বলেন
            — সবাই যেন সহজে ডকুমেন্ট বুঝতে পারেন।
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center">
              <Globe2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text bangla-text">
              আমাদের মিশন
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto bangla-text leading-relaxed">
              &ldquo;Make information accessible in mother tongue, especially for
              rural & dialect-speaking Bangla users.&rdquo;
            </p>
            <p className="text-xl text-slate-900 dark:text-white mt-4 font-medium bangla-text">
              মাতৃভাষায় তথ্য — সবার অধিকার!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4 bangla-text">
              ✨ আমাদের মূল্যবোধ
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bangla-text">
              <span className="gradient-text">যা আমাদের চালিত করে</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 bangla-text">
                  {value.title}
                </h3>
                <p className="text-sm text-bangla-purple-600 dark:text-bangla-purple-400 mb-3">
                  {value.titleEn}
                </p>
                <p className="text-slate-600 dark:text-slate-400 bangla-text">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-transparent to-bangla-purple-50/30 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4">
              <Code2 className="w-4 h-4 inline mr-1" />
              Tech Stack
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bangla-text">
              <span className="gradient-text">আমরা যা ব্যবহার করি</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className={`px-4 py-2 rounded-full ${tech.color} text-white font-medium shadow-lg cursor-default`}
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4 bangla-text">
              <Users className="w-4 h-4 inline mr-1" />
              আমাদের টিম
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bangla-text">
              <span className="gradient-text">যারা এটি তৈরি করেছেন</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl shadow-lg`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white bangla-text">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {member.nameEn}
                </p>
                <p className="text-sm text-bangla-purple-600 dark:text-bangla-purple-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Source & Contact Section */}
      <section id="contact" className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Open Source Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Github className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Open Source
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 bangla-text">
                    সম্পূর্ণ ওপেন সোর্স
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 bangla-text">
                বাংলা বলে সম্পূর্ণ ওপেন সোর্স। আপনি চাইলে কোড দেখতে পারেন,
                অবদান রাখতে পারেন, এবং নিজের প্রয়োজনে ব্যবহার করতে পারেন।
              </p>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="group">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bangla-pink-500 to-bangla-purple-500 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white bangla-text">
                    যোগাযোগ করুন
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Get in Touch
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 bangla-text">
                প্রশ্ন, পরামর্শ, বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
                আমরা সবসময় শুনতে আগ্রহী!
              </p>
              <div className="flex items-center gap-3">
                <motion.a
                  href="mailto:hello@banglabole.ai"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-bangla-pink-500 dark:hover:text-bangla-pink-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto text-bangla-purple-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bangla-text">
              <span className="gradient-text">
                এখনই বাংলা বলে ব্যবহার করুন!
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 bangla-text">
              আপনার ডকুমেন্ট থেকে প্রশ্ন করুন, উত্তর পান বাংলায়।
            </p>
            <Link href="/try">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="xl">
                  <span className="bangla-text">এখনই শুরু করুন</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
