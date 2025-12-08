"use client";

import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations, WeatherData } from "./types";

interface WeatherPanelProps {
  lang: "bn" | "en";
  weather: WeatherData | null;
}

export function WeatherPanel({ lang, weather }: WeatherPanelProps) {
  const t = translations[lang];

  if (!weather) return null;

  return (
    <div className="glass-card p-4">
      <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-3", lang === "bn" && "bangla-text")}>
        <Cloud className="w-4 h-4 text-bangla-purple-500" />
        {t.weather}
      </h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{weather.temperature}°C</p>
          <p className={cn("text-xs text-slate-500 capitalize", lang === "bn" && "bangla-text")}>{weather.description}</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>💧 {weather.humidity}%</p>
          <p>💨 {weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

