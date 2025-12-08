"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  RefreshCw,
  ExternalLink,
  Clock,
  Droplets,
  Car,
  Trash2,
  Wind,
  AlertTriangle,
  Zap,
  Construction,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  source: string;
  sourceLogo: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
}

interface NewsPanelProps {
  lang: "bn" | "en";
}

const categoryIcons: Record<string, typeof Droplets> = {
  waterlogging: Droplets,
  road: Construction,
  traffic: Car,
  garbage: Trash2,
  pollution: Wind,
  accident: AlertTriangle,
  electricity: Zap,
  water: Droplets,
  general: Newspaper,
};

const categoryColors: Record<string, string> = {
  waterlogging: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  road: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  traffic: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  garbage: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400",
  pollution: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
  accident: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  electricity: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  water: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  general: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
};

const translations = {
  bn: {
    title: "আজকের নাগরিক সংবাদ",
    loading: "সংবাদ লোড হচ্ছে...",
    noNews: "কোনো সংবাদ পাওয়া যায়নি",
    lastUpdated: "সর্বশেষ আপডেট",
    refresh: "রিফ্রেশ",
    readMore: "বিস্তারিত পড়ুন",
    source: "সূত্র",
    categories: {
      waterlogging: "জলাবদ্ধতা",
      road: "সড়ক",
      traffic: "যানজট",
      garbage: "আবর্জনা",
      pollution: "দূষণ",
      accident: "দুর্ঘটনা",
      electricity: "বিদ্যুৎ",
      water: "পানি",
      general: "সাধারণ",
    },
    timeAgo: {
      justNow: "এইমাত্র",
      minutesAgo: "মিনিট আগে",
      hoursAgo: "ঘণ্টা আগে",
      daysAgo: "দিন আগে",
    },
    showMore: "আরো দেখুন",
    showLess: "কম দেখুন",
  },
  en: {
    title: "Today's Civic News",
    loading: "Loading news...",
    noNews: "No news found",
    lastUpdated: "Last updated",
    refresh: "Refresh",
    readMore: "Read more",
    source: "Source",
    categories: {
      waterlogging: "Waterlogging",
      road: "Road",
      traffic: "Traffic",
      garbage: "Garbage",
      pollution: "Pollution",
      accident: "Accident",
      electricity: "Electricity",
      water: "Water",
      general: "General",
    },
    timeAgo: {
      justNow: "Just now",
      minutesAgo: "min ago",
      hoursAgo: "hours ago",
      daysAgo: "days ago",
    },
    showMore: "Show more",
    showLess: "Show less",
  },
};

export function NewsPanel({ lang }: NewsPanelProps) {
  const t = translations[lang];
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllNews, setShowAllNews] = useState(false);

  const fetchNews = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await fetch("/api/news");
      const data = await response.json();

      if (data.success && data.news) {
        setNews(data.news);
        setLastUpdated(new Date(data.lastUpdated));
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews(true);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchNews]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return t.timeAgo.justNow;
    if (diffMins < 60) return `${diffMins} ${t.timeAgo.minutesAgo}`;
    if (diffHours < 24) return `${diffHours} ${t.timeAgo.hoursAgo}`;
    return `${diffDays} ${t.timeAgo.daysAgo}`;
  };

  const displayedNews = showAllNews ? news : news.slice(0, 5);

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <h3 className={cn("text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2", lang === "bn" && "bangla-text")}>
          <Newspaper className="w-4 h-4 text-bangla-purple-500" />
          {t.title}
          {news.length > 0 && (
            <span className="text-xs font-normal text-slate-500">({news.length})</span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              fetchNews(true);
            }}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className={cn("w-4 h-4 text-slate-500", isRefreshing && "animate-spin")} />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Last Updated */}
            {lastUpdated && (
              <div className="px-4 pb-2 flex items-center gap-1 text-[10px] text-slate-400">
                <Clock className="w-3 h-3" />
                <span className={lang === "bn" ? "bangla-text" : ""}>{t.lastUpdated}:</span>
                <span>{lastUpdated.toLocaleTimeString(lang === "bn" ? "bn-BD" : "en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            )}

            {/* News List */}
            <div className="px-4 pb-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="py-8 text-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-bangla-purple-500 mx-auto mb-2" />
                  <p className={cn("text-sm text-slate-500", lang === "bn" && "bangla-text")}>{t.loading}</p>
                </div>
              ) : news.length === 0 ? (
                <div className="py-8 text-center">
                  <Newspaper className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className={cn("text-sm text-slate-500", lang === "bn" && "bangla-text")}>{t.noNews}</p>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    {displayedNews.map((item, index) => {
                      const CategoryIcon = categoryIcons[item.category] || Newspaper;
                      return (
                        <motion.a
                          key={item.id}
                          href={item.link !== "#" ? item.link : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "block p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-bangla-purple-300 dark:hover:border-bangla-purple-700 transition-all group",
                            item.link !== "#" && "cursor-pointer"
                          )}
                        >
                          <div className="flex gap-3">
                            {/* Category Icon */}
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                              categoryColors[item.category] || categoryColors.general
                            )}>
                              <CategoryIcon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Category Badge & Time */}
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                  "text-[10px] px-2 py-0.5 rounded-full",
                                  categoryColors[item.category] || categoryColors.general,
                                  lang === "bn" && "bangla-text"
                                )}>
                                  {t.categories[item.category as keyof typeof t.categories] || t.categories.general}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {formatTimeAgo(item.publishedAt)}
                                </span>
                              </div>

                              {/* Title */}
                              <h4 className={cn(
                                "text-sm font-medium text-slate-800 dark:text-white line-clamp-2 mb-1 group-hover:text-bangla-purple-600 dark:group-hover:text-bangla-purple-400 transition-colors",
                                lang === "bn" && "bangla-text"
                              )}>
                                {item.title}
                              </h4>

                              {/* Description */}
                              {item.description && (
                                <p className={cn(
                                  "text-xs text-slate-500 dark:text-slate-400 line-clamp-2",
                                  lang === "bn" && "bangla-text"
                                )}>
                                  {item.description}
                                </p>
                              )}

                              {/* Source & Link */}
                              <div className="flex items-center justify-between mt-2">
                                <span className={cn("text-[10px] text-slate-400", lang === "bn" && "bangla-text")}>
                                  {t.source}: {item.source}
                                </span>
                                {item.link !== "#" && (
                                  <span className="text-[10px] text-bangla-purple-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {t.readMore}
                                    <ExternalLink className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Image (if available) */}
                            {item.imageUrl && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                                <img
                                  src={item.imageUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </motion.a>
                      );
                    })}
                  </AnimatePresence>

                  {/* Show More/Less Button */}
                  {news.length > 5 && (
                    <button
                      onClick={() => setShowAllNews(!showAllNews)}
                      className={cn(
                        "w-full py-2 text-sm text-bangla-purple-600 dark:text-bangla-purple-400 hover:bg-bangla-purple-50 dark:hover:bg-bangla-purple-900/20 rounded-lg transition-colors flex items-center justify-center gap-1",
                        lang === "bn" && "bangla-text"
                      )}
                    >
                      {showAllNews ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          {t.showLess}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          {t.showMore} ({news.length - 5})
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

