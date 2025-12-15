"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "bn" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en"); // Default English

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "bn" || saved === "en")) {
      setLang(saved);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "bn" ? "en" : "bn"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

