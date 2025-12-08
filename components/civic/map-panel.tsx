"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapIcon, Flame, Layers, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GpsCoordinates, DetectedIssue, translations } from "./types";
import { useCrowdReports } from "./crowd-reports-context";

// Dynamic import for Map component (SSR disabled)
const CivicMap = dynamic(() => import("@/components/civic/civic-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl">
      <Loader2 className="w-8 h-8 animate-spin text-bangla-purple-500" />
    </div>
  ),
});

interface MapPanelProps {
  lang: "bn" | "en";
  coordinates: GpsCoordinates | null;
  allMapIssues: DetectedIssue[];
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  showClusters: boolean;
  setShowClusters: (show: boolean) => void;
  onIssueSelect: (issue: DetectedIssue | null) => void;
}

export function MapPanel({
  lang,
  coordinates,
  allMapIssues,
  showHeatmap,
  setShowHeatmap,
  showClusters,
  setShowClusters,
  onIssueSelect,
}: MapPanelProps) {
  const t = translations[lang];
  const { reports: crowdReports } = useCrowdReports();

  // Combine detected issues with real-time crowd reports
  const combinedMapIssues = useMemo(() => {
    const crowdIssues: DetectedIssue[] = crowdReports.map(report => ({
      id: report.id,
      type: report.type,
      severity: report.severity,
      description: report.description,
      recommendations: { authorities: [], citizens: [] },
      coordinates: report.coordinates,
      timestamp: report.timestamp,
    }));
    
    return [...allMapIssues, ...crowdIssues];
  }, [allMapIssues, crowdReports]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-6"
    >
      <div className="glass-card p-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Map Controls */}
        <div className="flex items-center justify-between mb-3">
          <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
            <MapIcon className="w-4 h-4 text-bangla-purple-500" />
            {lang === "bn" ? "লাইভ ম্যাপ" : "Live Map"}
            <span className="text-xs font-normal text-slate-500">
              ({combinedMapIssues.length} {lang === "bn" ? "টি সমস্যা" : "issues"})
            </span>
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all",
                showHeatmap ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              )}
            >
              <Flame className="w-3 h-3" />
              {lang === "bn" ? "হিটম্যাপ" : "Heatmap"}
            </button>
            <button
              onClick={() => setShowClusters(!showClusters)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all",
                showClusters ? "bg-bangla-purple-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              )}
            >
              <Layers className="w-3 h-3" />
              {lang === "bn" ? "ক্লাস্টার" : "Clusters"}
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[calc(100%-40px)] rounded-xl overflow-hidden">
          <CivicMap
            center={coordinates || { lat: 23.8103, lng: 90.4125 }}
            issues={combinedMapIssues}
            showHeatmap={showHeatmap}
            showClusters={showClusters}
            onIssueSelect={onIssueSelect}
            lang={lang}
            issueTypes={t.issueTypes}
          />
        </div>
      </div>
    </motion.div>
  );
}
