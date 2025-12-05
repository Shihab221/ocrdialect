"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail, Mic, FileText } from "lucide-react";

const footerLinks = {
  product: [
    { label: "চেষ্টা করুন", href: "/try" },
    { label: "বৈশিষ্ট্য", href: "/#features" },
    { label: "কিভাবে কাজ করে", href: "/#how-it-works" },
  ],
  company: [
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "যোগাযোগ", href: "/about#contact" },
    { label: "ওপেন সোর্স", href: "https://github.com" },
  ],
  legal: [
    { label: "গোপনীয়তা নীতি", href: "#" },
    { label: "শর্তাবলী", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@banglabole.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bangla-purple-50/50 to-bangla-pink-50/50 dark:via-bangla-purple-900/10 dark:to-bangla-pink-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center shadow-lg">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-bangla-orange-500 flex items-center justify-center">
                  <FileText className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold gradient-text bangla-text">
                  বাংলা বলে
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text mb-4">
              আপনার ডকুমেন্টের প্রশ্নের উত্তর বাংলায় শুনুন। মাতৃভাষায় তথ্য সবার জন্য সহজলভ্য করছি।
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 bangla-text">
              পণ্য
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors bangla-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 bangla-text">
              কোম্পানি
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors bangla-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 bangla-text">
              আইনগত
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-bangla-purple-500 dark:hover:text-bangla-purple-400 transition-colors bangla-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 bangla-text">
              © ২০২৪ বাংলা বলে। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              Powered by SWARDVERSE
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
