"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Camera,
  Mic,
  Activity,
  FileText,
  AlertTriangle,
  Droplets,
  Wind,
  Car,
  Trash2,
  Building2,
  MapIcon,
  ArrowRight,
  Sparkles,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

const translations = {
  bn: {
    badge: "নতুন ফিচার",
    title: "সিভিক হটস্পট ডিটেক্টর",
    subtitle: "বাংলাদেশের নাগরিক সমস্যা শনাক্তকরণ ও রিপোর্টিং",
    description: "ছবি, ভয়েস এবং সেন্সর ডেটা ব্যবহার করে স্বয়ংক্রিয়ভাবে গর্ত, জলাবদ্ধতা, আবর্জনা এবং অন্যান্য নাগরিক সমস্যা শনাক্ত করুন। AI-ভিত্তিক বিশ্লেষণ এবং ইন্টারেক্টিভ ম্যাপ দিয়ে সমস্যার তীব্রতা মূল্যায়ন করুন।",
    cta: "হটস্পট শনাক্ত করুন",
    features: [
      {
        icon: Camera,
        title: "মাল্টিমোডাল ইনপুট",
        description: "ছবি, ভিডিও, কণ্ঠস্বর এবং টেক্সট দিয়ে রিপোর্ট করুন",
      },
      {
        icon: Activity,
        title: "লাইভ সেন্সর ডেটা",
        description: "পানির স্তর, বায়ুর মান এবং আবহাওয়া মনিটরিং",
      },
      {
        icon: MapIcon,
        title: "ইন্টারেক্টিভ ম্যাপ",
        description: "হিটম্যাপ ও ক্লাস্টার সহ সমস্যার মানচিত্র",
      },
      {
        icon: FileText,
        title: "বাংলায় রিপোর্ট",
        description: "স্বয়ংক্রিয় তীব্রতা বিশ্লেষণ ও সুপারিশ",
      },
    ],
    issueTypes: [
      { icon: Droplets, label: "জলাবদ্ধতা", color: "text-blue-500" },
      { icon: AlertTriangle, label: "গর্ত", color: "text-orange-500" },
      { icon: Trash2, label: "আবর্জনা", color: "text-lime-500" },
      { icon: Wind, label: "বায়ু দূষণ", color: "text-purple-500" },
      { icon: Car, label: "যানজট", color: "text-amber-500" },
      { icon: Building2, label: "অবৈধ নির্মাণ", color: "text-red-500" },
    ],
  },
  en: {
    badge: "New Feature",
    title: "Civic Hotspot Detector",
    subtitle: "Bangladesh Civic Issue Detection & Reporting",
    description: "Automatically detect potholes, waterlogging, garbage, and other civic issues using images, voice, and sensor data. Evaluate issue severity with AI-powered analysis and interactive maps.",
    cta: "Detect Hotspots",
    features: [
      {
        icon: Camera,
        title: "Multimodal Input",
        description: "Report via images, video, voice, and text",
      },
      {
        icon: Activity,
        title: "Live Sensor Data",
        description: "Water level, air quality, and weather monitoring",
      },
      {
        icon: MapIcon,
        title: "Interactive Map",
        description: "Issue visualization with heatmap and clusters",
      },
      {
        icon: FileText,
        title: "Bangla Reports",
        description: "Auto severity analysis and recommendations",
      },
    ],
    issueTypes: [
      { icon: Droplets, label: "Waterlogging", color: "text-blue-500" },
      { icon: AlertTriangle, label: "Potholes", color: "text-orange-500" },
      { icon: Trash2, label: "Garbage", color: "text-lime-500" },
      { icon: Wind, label: "Air Pollution", color: "text-purple-500" },
      { icon: Car, label: "Traffic Jam", color: "text-amber-500" },
      { icon: Building2, label: "Illegal Build", color: "text-red-500" },
    ],
  },
};

export function CivicDetectorSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bangla-purple-50/30 to-transparent dark:via-bangla-purple-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 text-red-600 dark:text-red-400 text-sm font-medium mb-4",
            lang === "bn" && "bangla-text"
          )}>
            <Radio className="w-4 h-4 animate-pulse" />
            {t.badge}
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
            lang === "bn" && "bangla-text"
          )}>
            <span className="gradient-text">{t.title}</span>
          </h2>
          <p className={cn(
            "text-lg text-slate-600 dark:text-slate-400 mb-2",
            lang === "bn" && "bangla-text"
          )}>
            {t.subtitle}
          </p>
          <p className={cn(
            "text-sm text-slate-500 dark:text-slate-500 max-w-2xl mx-auto",
            lang === "bn" && "bangla-text"
          )}>
            {t.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Mock Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-4 md:p-6">
              {/* Mock Map */}
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 opacity-50" />
                
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />

                {/* Mock Heatmap Circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-red-500/30"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-orange-500/30"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.35, 0.55, 0.35],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-1/3 left-1/2 w-20 h-20 rounded-full bg-yellow-500/30"
                />

                {/* Mock Markers */}
                {[
                  { top: "25%", left: "35%", color: "bg-red-500", size: "w-4 h-4" },
                  { top: "55%", left: "70%", color: "bg-orange-500", size: "w-3.5 h-3.5" },
                  { top: "40%", left: "55%", color: "bg-yellow-500", size: "w-3 h-3" },
                  { top: "70%", left: "30%", color: "bg-blue-500", size: "w-3.5 h-3.5" },
                  { top: "35%", left: "80%", color: "bg-purple-500", size: "w-3 h-3" },
                ].map((marker, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={cn(
                      "absolute rounded-full shadow-lg",
                      marker.color,
                      marker.size
                    )}
                    style={{ top: marker.top, left: marker.left }}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: "inherit" }} />
                  </motion.div>
                ))}

                {/* Current Location */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 border-3 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </motion.div>

                {/* Mock Controls */}
                <div className="absolute top-3 right-3 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-bold">+</div>
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-bold">−</div>
                </div>

                {/* Mock Legend */}
                <div className="absolute bottom-3 left-3 p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 text-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-slate-600 dark:text-slate-400">{lang === "bn" ? "জরুরি" : "Critical"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-slate-600 dark:text-slate-400">{lang === "bn" ? "উচ্চ" : "High"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-slate-600 dark:text-slate-400">{lang === "bn" ? "মাঝারি" : "Medium"}</span>
                  </div>
                </div>
              </div>

              {/* Issue Type Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {t.issueTypes.map((issue, i) => {
                  const Icon = issue.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800",
                        lang === "bn" && "bangla-text"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", issue.color)} />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{issue.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {t.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="glass-card p-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={cn(
                      "text-sm font-semibold text-slate-800 dark:text-white mb-1",
                      lang === "bn" && "bangla-text"
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-xs text-slate-500 dark:text-slate-400",
                      lang === "bn" && "bangla-text"
                    )}>
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <Link href="/civic-detector">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full py-6 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className={lang === "bn" ? "bangla-text" : ""}>{t.cta}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

