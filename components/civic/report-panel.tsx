"use client";

import { motion } from "framer-motion";
import { FileText, Download, Share2, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, DetectedIssue, GpsCoordinates, issueIcons, getSeverityColor } from "./types";

interface ReportPanelProps {
  lang: "bn" | "en";
  detectedIssues: DetectedIssue[];
  analysisReport: string;
  selectedIssue: DetectedIssue | null;
  setSelectedIssue: (issue: DetectedIssue | null) => void;
  coordinates: GpsCoordinates | null;
}

export function ReportPanel({
  lang,
  detectedIssues,
  analysisReport,
  selectedIssue,
  setSelectedIssue,
  coordinates,
}: ReportPanelProps) {
  const t = translations[lang];

  const overallSeverity = detectedIssues.length > 0
    ? Math.round(detectedIssues.reduce((sum, issue) => sum + issue.severity, 0) / detectedIssues.length)
    : 0;

  // Export functions
  const exportPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(lang === "bn" ? "Civic Hotspot Report" : "Civic Hotspot Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Location: ${coordinates?.lat.toFixed(4)}, ${coordinates?.lng.toFixed(4)}`, 20, 45);
    
    let yPos = 60;
    detectedIssues.forEach((issue, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${t.issueTypes[issue.type as keyof typeof t.issueTypes] || issue.type}`, 20, yPos);
      yPos += 10;
      doc.setFontSize(10);
      doc.text(`Severity: ${issue.severity}/10`, 25, yPos);
      yPos += 7;
      
      const descLines = doc.splitTextToSize(issue.description, 160);
      doc.text(descLines, 25, yPos);
      yPos += descLines.length * 5 + 10;
      
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    doc.save(`civic-report-${Date.now()}.pdf`);
  };

  const exportGeoJson = () => {
    const geojson = {
      type: "FeatureCollection",
      features: detectedIssues.map(issue => ({
        type: "Feature",
        properties: {
          id: issue.id,
          type: issue.type,
          severity: issue.severity,
          description: issue.description,
          timestamp: issue.timestamp.toISOString(),
        },
        geometry: {
          type: "Point",
          coordinates: [issue.coordinates.lng, issue.coordinates.lat],
        },
      })),
    };
    
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `civic-hotspots-${Date.now()}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareLink = async () => {
    const shareData = {
      title: lang === "bn" ? "সিভিক হটস্পট রিপোর্ট" : "Civic Hotspot Report",
      text: analysisReport,
      url: window.location.href,
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert(lang === "bn" ? "লিঙ্ক কপি হয়েছে!" : "Link copied!");
    }
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
          <FileText className="w-4 h-4 text-bangla-pink-500" />
          {t.report}
        </h3>
        {detectedIssues.length > 0 && (
          <div className={cn("px-2 py-1 rounded-full text-xs font-semibold", getSeverityColor(overallSeverity))}>
            {overallSeverity}/10
          </div>
        )}
      </div>

      {detectedIssues.length > 0 ? (
        <div className="space-y-3">
          {/* Overall Summary */}
          {analysisReport && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/20 dark:to-bangla-pink-900/20">
              <p className={cn("text-sm text-slate-700 dark:text-slate-300", lang === "bn" && "bangla-text")}>{analysisReport}</p>
            </div>
          )}

          {/* Top Hotspots */}
          <div>
            <h4 className={cn("text-xs font-semibold text-slate-500 mb-2", lang === "bn" && "bangla-text")}>{t.topHotspots}</h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {detectedIssues.slice(0, 5).map((issue, index) => {
                const IssueIcon = issueIcons[issue.type] || AlertTriangle;
                return (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedIssue(issue)}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                      selectedIssue?.id === issue.id
                        ? "border-bangla-purple-500 bg-bangla-purple-50 dark:bg-bangla-purple-900/20"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", getSeverityColor(issue.severity))}>
                        <IssueIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn("text-xs font-semibold text-slate-800 dark:text-white", lang === "bn" && "bangla-text")}>
                            {t.issueTypes[issue.type as keyof typeof t.issueTypes] || issue.type}
                          </span>
                          <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", getSeverityColor(issue.severity))}>
                            {issue.severity}/10
                          </span>
                        </div>
                        <p className={cn("text-xs text-slate-600 dark:text-slate-400 line-clamp-2", lang === "bn" && "bangla-text")}>
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Selected Issue Details */}
          {selectedIssue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
            >
              <h4 className={cn("text-xs font-semibold text-bangla-purple-600 dark:text-bangla-purple-400 mb-2", lang === "bn" && "bangla-text")}>
                {t.recommendations}
              </h4>
              
              {selectedIssue.recommendations.authorities.length > 0 && (
                <div className="mb-2">
                  <p className={cn("text-xs font-medium text-slate-500 mb-1", lang === "bn" && "bangla-text")}>{t.actions.authorities}:</p>
                  <ul className="space-y-1">
                    {selectedIssue.recommendations.authorities.map((rec, i) => (
                      <li key={i} className={cn("text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1", lang === "bn" && "bangla-text")}>
                        <span className="text-bangla-purple-500">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedIssue.recommendations.citizens.length > 0 && (
                <div>
                  <p className={cn("text-xs font-medium text-slate-500 mb-1", lang === "bn" && "bangla-text")}>{t.actions.citizens}:</p>
                  <ul className="space-y-1">
                    {selectedIssue.recommendations.citizens.map((rec, i) => (
                      <li key={i} className={cn("text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1", lang === "bn" && "bangla-text")}>
                        <span className="text-bangla-pink-500">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={exportPdf} size="sm" variant="outline" className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              <span className="text-xs">PDF</span>
            </Button>
            <Button onClick={exportGeoJson} size="sm" variant="outline" className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              <span className="text-xs">GeoJSON</span>
            </Button>
            <Button onClick={shareLink} size="sm" variant="outline" className="flex-1">
              <Share2 className="w-3 h-3 mr-1" />
              <span className="text-xs">{lang === "bn" ? "শেয়ার" : "Share"}</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Info className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className={cn("text-sm text-slate-500", lang === "bn" && "bangla-text")}>{t.noIssues}</p>
        </div>
      )}
    </div>
  );
}

