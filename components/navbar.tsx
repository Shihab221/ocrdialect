"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, Mic, FileText, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

const navLinksData = {
  bn: [
    { href: "/", label: "হোম" },
    { href: "/try", label: "চেষ্টা করুন" },
    { href: "/civic-detector", label: "হটস্পট ডিটেক্টর" },
    { href: "/assistant", label: "AI সহকারী" },
    { href: "/about", label: "আমাদের সম্পর্কে" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/try", label: "Try It" },
    { href: "/civic-detector", label: "Civic Detector" },
    { href: "/assistant", label: "AI Assistant" },
    { href: "/about", label: "About" },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = navLinksData[lang];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 navbar-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center shadow-lg">
                <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-bangla-orange-500 flex items-center justify-center">
                <FileText className="w-2.5 h-2.5 text-white" />
              </div>
            </motion.div>
            <span className={cn(
              "text-lg md:text-xl font-bold gradient-text",
              lang === "bn" && "bangla-text"
            )}>
              {lang === "bn" ? "বাংলা বলে" : "Bangla Bole"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative px-4 py-2 rounded-xl font-medium transition-colors",
                    pathname === link.href
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-bangla-purple-600 dark:hover:text-bangla-purple-400"
                  )}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 text-sm",
                    lang === "bn" && "bangla-text"
                  )}>
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLang}
                className="relative w-10 h-10 md:w-auto md:h-10 md:px-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 overflow-hidden group"
                title={lang === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
              >
                <Globe className="w-4 h-4 text-bangla-purple-500" />
                <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                  {lang === "bn" ? "বাং" : "EN"}
                </span>
              </motion.button>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden group"
              >
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "dark" ? 0 : -30,
                    opacity: theme === "dark" ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Moon className="w-5 h-5 text-bangla-purple-400" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "dark" ? 30 : 0,
                    opacity: theme === "dark" ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Sun className="w-5 h-5 text-bangla-orange-500" />
                </motion.div>
              </motion.button>
            )}

            {/* CTA Button - Desktop */}
            <Link href="/try" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-5 py-2.5 rounded-xl bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow",
                  lang === "bn" && "bangla-text"
                )}
              >
                <span className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>{lang === "bn" ? "এখনই শুরু করুন" : "Get Started"}</span>
                </span>
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-700"
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-3 rounded-xl transition-colors",
                  pathname === link.href
                    ? "bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                  lang === "bn" && "bangla-text"
                )}
              >
                <span className="font-medium">{link.label}</span>
              </motion.div>
            </Link>
          ))}
          
          {/* Mobile Language Toggle */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={toggleLang}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-bangla-purple-500" />
            <span className="font-medium">
              {lang === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
            </span>
          </motion.button>

          <Link href="/try" onClick={() => setMobileMenuOpen(false)}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white font-semibold",
                lang === "bn" && "bangla-text"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <Mic className="w-4 h-4" />
                <span>{lang === "bn" ? "এখনই শুরু করুন" : "Get Started"}</span>
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
