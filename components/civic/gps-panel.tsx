"use client";

import { MapPin, Navigation, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, GpsCoordinates } from "./types";

interface GpsPanelProps {
  lang: "bn" | "en";
  gpsMode: "auto" | "manual";
  setGpsMode: (mode: "auto" | "manual") => void;
  coordinates: GpsCoordinates | null;
  setCoordinates: (coords: GpsCoordinates) => void;
  isDetectingLocation: boolean;
  locationError: string;
  detectLocation: () => void;
  manualLat: string;
  setManualLat: (lat: string) => void;
  manualLng: string;
  setManualLng: (lng: string) => void;
}

export function GpsPanel({
  lang,
  gpsMode,
  setGpsMode,
  coordinates,
  setCoordinates,
  isDetectingLocation,
  locationError,
  detectLocation,
  manualLat,
  setManualLat,
  manualLng,
  setManualLng,
}: GpsPanelProps) {
  const t = translations[lang];

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
          <MapPin className="w-4 h-4 text-bangla-purple-500" />
          {t.gpsCoordinates}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setGpsMode("auto")}
            className={cn(
              "px-2 py-1 rounded-lg text-xs font-medium transition-all",
              gpsMode === "auto" ? "bg-bangla-purple-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            {lang === "bn" ? "স্বয়ংক্রিয়" : "Auto"}
          </button>
          <button
            onClick={() => setGpsMode("manual")}
            className={cn(
              "px-2 py-1 rounded-lg text-xs font-medium transition-all",
              gpsMode === "manual" ? "bg-bangla-purple-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            {lang === "bn" ? "ম্যানুয়াল" : "Manual"}
          </button>
        </div>
      </div>

      {gpsMode === "auto" ? (
        <div className="space-y-2">
          {isDetectingLocation ? (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className={lang === "bn" ? "bangla-text" : ""}>{t.detectingLocation}</span>
            </div>
          ) : coordinates ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span className={lang === "bn" ? "bangla-text" : ""}>{t.locationDetected}</span>
              </div>
              <p className="text-xs text-slate-500">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            </div>
          ) : locationError ? (
            <p className="text-sm text-red-500">{locationError}</p>
          ) : null}
          <Button onClick={detectLocation} size="sm" variant="outline" className="w-full">
            <Navigation className="w-4 h-4 mr-2" />
            {lang === "bn" ? "পুনরায় শনাক্ত করুন" : "Refresh Location"}
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500">{t.latitude}</label>
              <input
                type="number"
                step="0.000001"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="23.8103"
                className="w-full px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">{t.longitude}</label>
              <input
                type="number"
                step="0.000001"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="90.4125"
                className="w-full px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
          </div>
          <Button
            onClick={() => {
              if (manualLat && manualLng) {
                setCoordinates({ lat: parseFloat(manualLat), lng: parseFloat(manualLng) });
              }
            }}
            size="sm"
            className="w-full"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {lang === "bn" ? "সেট করুন" : "Set Location"}
          </Button>
        </div>
      )}
    </div>
  );
}

