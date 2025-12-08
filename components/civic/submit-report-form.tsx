"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  MapPin,
  AlertTriangle,
  Send,
  Loader2,
  CheckCircle,
  Droplets,
  Wind,
  Car,
  Trash2,
  Building2,
  Lightbulb,
  Construction,
  TrafficCone,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GpsCoordinates, translations } from "./types";
import { useCrowdReports } from "./crowd-reports-context";

interface SubmitReportFormProps {
  lang: "bn" | "en";
  coordinates: GpsCoordinates | null;
}

const issueTypeOptions = [
  { value: "pothole", icon: TrafficCone, color: "text-orange-500" },
  { value: "waterlogging", icon: Droplets, color: "text-blue-500" },
  { value: "garbage", icon: Trash2, color: "text-lime-500" },
  { value: "illegalConstruction", icon: Building2, color: "text-violet-500" },
  { value: "brokenStreetlight", icon: Lightbulb, color: "text-yellow-500" },
  { value: "openManhole", icon: AlertCircle, color: "text-red-500" },
  { value: "trafficJam", icon: Car, color: "text-amber-500" },
  { value: "airPollution", icon: Wind, color: "text-gray-500" },
  { value: "flooding", icon: Droplets, color: "text-cyan-500" },
  { value: "roadDamage", icon: Construction, color: "text-red-600" },
];

export function SubmitReportForm({ lang, coordinates }: SubmitReportFormProps) {
  const t = translations[lang];
  const { addReport } = useCrowdReports();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState(5);
  const [reporterName, setReporterName] = useState("");

  const resetForm = () => {
    setSelectedType("");
    setDescription("");
    setSeverity(5);
    setReporterName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !description || !coordinates) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    addReport({
      type: selectedType,
      description,
      severity,
      coordinates: {
        lat: coordinates.lat + (Math.random() - 0.5) * 0.01,
        lng: coordinates.lng + (Math.random() - 0.5) * 0.01,
      },
      reporter: reporterName || (lang === "bn" ? "অজ্ঞাত" : "Anonymous"),
    });

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      resetForm();
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed z-50 inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 p-4 flex items-center justify-between">
                <h2 className={cn("text-lg font-bold text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
                  <AlertTriangle className="w-5 h-5" />
                  {lang === "bn" ? "সমস্যা রিপোর্ট করুন" : "Report an Issue"}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success State */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white dark:bg-slate-900 flex flex-col items-center justify-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                    </motion.div>
                    <p className={cn("text-lg font-semibold text-slate-800 dark:text-white", lang === "bn" && "bangla-text")}>
                      {lang === "bn" ? "রিপোর্ট সফলভাবে জমা হয়েছে!" : "Report submitted successfully!"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Issue Type */}
                <div>
                  <label className={cn("text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", lang === "bn" && "bangla-text")}>
                    {lang === "bn" ? "সমস্যার ধরন *" : "Issue Type *"}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {issueTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedType(option.value)}
                          className={cn(
                            "p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all",
                            selectedType === option.value
                              ? "border-bangla-purple-500 bg-bangla-purple-50 dark:bg-bangla-purple-900/30"
                              : "border-slate-200 dark:border-slate-700 hover:border-bangla-purple-300"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", option.color)} />
                          <span className={cn("text-[10px] text-slate-600 dark:text-slate-400 text-center", lang === "bn" && "bangla-text")}>
                            {t.issueTypes[option.value as keyof typeof t.issueTypes]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={cn("text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", lang === "bn" && "bangla-text")}>
                    {lang === "bn" ? "বিস্তারিত বর্ণনা *" : "Description *"}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={lang === "bn" ? "সমস্যার বিস্তারিত বর্ণনা দিন..." : "Describe the issue in detail..."}
                    className={cn(
                      "w-full h-24 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-bangla-purple-500",
                      lang === "bn" && "bangla-text"
                    )}
                    required
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className={cn("text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", lang === "bn" && "bangla-text")}>
                    {lang === "bn" ? "তীব্রতা" : "Severity"}: {severity}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-bangla-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span className={lang === "bn" ? "bangla-text" : ""}>{lang === "bn" ? "নিম্ন" : "Low"}</span>
                    <span className={lang === "bn" ? "bangla-text" : ""}>{lang === "bn" ? "জরুরি" : "Critical"}</span>
                  </div>
                </div>

                {/* Reporter Name */}
                <div>
                  <label className={cn("text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block", lang === "bn" && "bangla-text")}>
                    {lang === "bn" ? "আপনার নাম (ঐচ্ছিক)" : "Your Name (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder={lang === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
                    className={cn(
                      "w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-bangla-purple-500",
                      lang === "bn" && "bangla-text"
                    )}
                  />
                </div>

                {/* Location */}
                {coordinates && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-400">
                      {lang === "bn" ? "অবস্থান: " : "Location: "}
                      {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                )}

                {!coordinates && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className={cn("text-sm text-yellow-700 dark:text-yellow-400", lang === "bn" && "bangla-text")}>
                      {lang === "bn" ? "অবস্থান শনাক্ত করা হয়নি" : "Location not detected"}
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!selectedType || !description || !coordinates || isSubmitting}
                  className="w-full py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span className={lang === "bn" ? "bangla-text" : ""}>{lang === "bn" ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      <span className={lang === "bn" ? "bangla-text" : ""}>{lang === "bn" ? "রিপোর্ট জমা দিন" : "Submit Report"}</span>
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

