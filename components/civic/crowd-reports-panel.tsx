"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Radio, CheckCircle, AlertTriangle, Trash2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations, issueIcons } from "./types";
import { useCrowdReports } from "./crowd-reports-context";

interface CrowdReportsPanelProps {
  lang: "bn" | "en";
  onReportsChange?: (reports: any[]) => void;
}

export function CrowdReportsPanel({ lang, onReportsChange }: CrowdReportsPanelProps) {
  const t = translations[lang];
  const { reports, verifyReport, deleteReport } = useCrowdReports();

  const formatTime = (timestamp: Date) => {
    const timeDiff = Math.round((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (timeDiff < 1) {
      return lang === "bn" ? "এইমাত্র" : "Just now";
    }
    if (timeDiff < 60) {
      return `${timeDiff}${lang === "bn" ? " মিনিট আগে" : "m ago"}`;
    }
    if (timeDiff < 1440) {
      return `${Math.round(timeDiff / 60)}${lang === "bn" ? " ঘণ্টা আগে" : "h ago"}`;
    }
    return `${Math.round(timeDiff / 1440)}${lang === "bn" ? " দিন আগে" : "d ago"}`;
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          {lang === "bn" ? "লাইভ রিপোর্ট" : "Live Reports"}
          <span className="text-xs font-normal text-slate-500">({reports.length})</span>
        </h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-slate-500">{lang === "bn" ? "সরাসরি" : "Live"}</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {reports.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <Radio className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className={cn("text-sm text-slate-500", lang === "bn" && "bangla-text")}>
                {lang === "bn" ? "কোনো রিপোর্ট নেই" : "No reports yet"}
              </p>
            </motion.div>
          ) : (
            reports.slice(0, 10).map((report, index) => {
              const IssueIcon = issueIcons[report.type] || AlertTriangle;
              const isNew = Date.now() - new Date(report.timestamp).getTime() < 60000;

              return (
                <motion.div
                  key={report.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "p-3 rounded-lg border transition-all group",
                    isNew
                      ? "bg-bangla-purple-50 dark:bg-bangla-purple-900/20 border-bangla-purple-300 dark:border-bangla-purple-700"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      report.severity >= 7 ? "bg-red-100 dark:bg-red-900/30" : report.severity >= 4 ? "bg-orange-100 dark:bg-orange-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"
                    )}>
                      <IssueIcon className={cn(
                        "w-4 h-4",
                        report.severity >= 7 ? "text-red-500" : report.severity >= 4 ? "text-orange-500" : "text-yellow-500"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-xs font-semibold text-slate-800 dark:text-white", lang === "bn" && "bangla-text")}>
                          {t.issueTypes[report.type as keyof typeof t.issueTypes] || report.type}
                        </span>
                        {isNew && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-bangla-purple-500 text-white animate-pulse">
                            {lang === "bn" ? "নতুন" : "NEW"}
                          </span>
                        )}
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded",
                          report.severity >= 7 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                          report.severity >= 4 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" :
                          "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        )}>
                          {report.severity}/10
                        </span>
                      </div>
                      <p className={cn("text-xs text-slate-600 dark:text-slate-400 line-clamp-2", lang === "bn" && "bangla-text")}>
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">
                            {formatTime(report.timestamp)}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className={cn("text-[10px] text-slate-400", lang === "bn" && "bangla-text")}>
                            {report.reporter}
                          </span>
                          {report.verified && (
                            <>
                              <span className="text-[10px] text-slate-400">•</span>
                              <span className="text-[10px] text-green-500 flex items-center gap-0.5">
                                <CheckCircle className="w-3 h-3" />
                                {lang === "bn" ? "যাচাইকৃত" : "Verified"}
                              </span>
                            </>
                          )}
                        </div>
                        
                        {/* Action buttons (visible on hover) */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!report.verified && (
                            <button
                              onClick={() => verifyReport(report.id)}
                              className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500"
                              title={lang === "bn" ? "যাচাই করুন" : "Verify"}
                            >
                              <Shield className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                            title={lang === "bn" ? "মুছুন" : "Delete"}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Stats */}
      {reports.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-500">
          <span>
            {reports.filter(r => r.verified).length} {lang === "bn" ? "যাচাইকৃত" : "verified"}
          </span>
          <span>
            {reports.filter(r => Date.now() - new Date(r.timestamp).getTime() < 3600000).length} {lang === "bn" ? "গত ঘণ্টায়" : "in last hour"}
          </span>
        </div>
      )}
    </div>
  );
}
