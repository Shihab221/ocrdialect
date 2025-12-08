"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, Droplets, Wind, Cloud, Thermometer, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations, SensorData } from "./types";

interface SensorPanelProps {
  lang: "bn" | "en";
  sensorData: SensorData;
  showSensorPanel: boolean;
  setShowSensorPanel: (show: boolean) => void;
}

export function SensorPanel({ lang, sensorData, showSensorPanel, setShowSensorPanel }: SensorPanelProps) {
  const t = translations[lang];

  return (
    <div className="glass-card p-4">
      <button onClick={() => setShowSensorPanel(!showSensorPanel)} className="flex items-center justify-between w-full mb-3">
        <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
          <Activity className="w-4 h-4 text-bangla-pink-500" />
          {t.sensorData}
          <span className="text-xs font-normal text-slate-500">(Live)</span>
        </h3>
        {showSensorPanel ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      <AnimatePresence>
        {showSensorPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Water Level */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>{t.waterLevel}</span>
              </div>
              <span className={cn("text-sm font-semibold", sensorData.waterLevel > 50 ? "text-red-500" : "text-blue-500")}>
                {sensorData.waterLevel.toFixed(0)} cm
              </span>
            </div>

            {/* Air Quality */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-purple-500" />
                <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>{t.airQuality}</span>
              </div>
              <span className={cn("text-sm font-semibold", sensorData.airQuality > 150 ? "text-red-500" : sensorData.airQuality > 100 ? "text-orange-500" : "text-green-500")}>
                {sensorData.airQuality.toFixed(0)}
              </span>
            </div>

            {/* Rainfall */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-500" />
                <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>{t.rainfall}</span>
              </div>
              <span className="text-sm font-semibold text-cyan-500">{sensorData.rainfall.toFixed(1)} mm</span>
            </div>

            {/* Temperature */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>{t.temperature}</span>
              </div>
              <span className="text-sm font-semibold text-orange-500">{sensorData.temperature.toFixed(1)}°C</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

