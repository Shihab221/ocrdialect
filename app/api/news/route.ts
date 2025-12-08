import { NextResponse } from "next/server";

// Civic-related keywords in Bengali and English
const CIVIC_KEYWORDS = [
  // Bengali keywords
  "জলাবদ্ধতা", "রাস্তা", "গর্ত", "যানজট", "ট্রাফিক", "আবর্জনা", "পরিষ্কার", 
  "নালা", "ড্রেন", "বন্যা", "পানি", "বিদ্যুৎ", "গ্যাস", "সড়ক", "মহাসড়ক",
  "দুর্ঘটনা", "মেরামত", "নির্মাণ", "উন্নয়ন", "সিটি", "পৌরসভা", "ওয়াসা",
  "ডিএনসিসি", "ডিএসসিসি", "রাজউক", "ময়লা", "দূষণ", "বায়ু", "শব্দ",
  "ফুটপাত", "ওভারপাস", "আন্ডারপাস", "ফ্লাইওভার", "মেট্রো", "বাস",
  // English keywords
  "waterlogging", "road", "pothole", "traffic", "garbage", "drainage",
  "flood", "water", "electricity", "gas", "highway", "accident", "repair",
  "construction", "development", "city", "municipality", "WASA", "DNCC",
  "DSCC", "RAJUK", "pollution", "air quality", "footpath", "overpass",
  "flyover", "metro", "bus", "infrastructure", "civic", "municipal",
];

interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  source: string;
  sourceLogo: string;
  publishedAt: Date;
  category: string;
  imageUrl?: string;
}

// RSS Feed URLs from major Bangladeshi newspapers
const NEWS_SOURCES = [
  {
    name: "Prothom Alo",
    namebn: "প্রথম আলো",
    rssUrl: "https://www.prothomalo.com/feed",
    logo: "https://www.prothomalo.com/favicon.ico",
    category: "general",
  },
  {
    name: "The Daily Star",
    namebn: "দ্য ডেইলি স্টার",
    rssUrl: "https://www.thedailystar.net/frontpage/rss.xml",
    logo: "https://www.thedailystar.net/favicon.ico",
    category: "general",
  },
  {
    name: "BD News 24",
    namebn: "বিডি নিউজ ২৪",
    rssUrl: "https://bangla.bdnews24.com/feed",
    logo: "https://bdnews24.com/favicon.ico",
    category: "general",
  },
  {
    name: "Jugantor",
    namebn: "যুগান্তর",
    rssUrl: "https://www.jugantor.com/feed/rss.xml",
    logo: "https://www.jugantor.com/favicon.ico",
    category: "general",
  },
  {
    name: "Kaler Kantho",
    namebn: "কালের কণ্ঠ",
    rssUrl: "https://www.kalerkantho.com/rss.xml",
    logo: "https://www.kalerkantho.com/favicon.ico",
    category: "general",
  },
];

// Alternative: Use a free news API as backup
async function fetchFromNewsAPI(): Promise<NewsItem[]> {
  try {
    // Using NewsData.io free tier (you can replace with your API key)
    const apiKey = process.env.NEWSDATA_API_KEY || "pub_61aborepoxoqjvgtx";
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&country=bd&language=bn,en&q=dhaka OR road OR traffic OR water`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!response.ok) {
      console.log("NewsData API failed, using fallback");
      return [];
    }

    const data = await response.json();
    
    if (data.status !== "success" || !data.results) {
      return [];
    }

    return data.results
      .filter((item: any) => {
        const text = `${item.title} ${item.description || ""}`.toLowerCase();
        return CIVIC_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
      })
      .slice(0, 10)
      .map((item: any, index: number) => ({
        id: `news-${Date.now()}-${index}`,
        title: item.title,
        description: item.description || "",
        link: item.link,
        source: item.source_id || "Unknown",
        sourceLogo: item.source_icon || "",
        publishedAt: new Date(item.pubDate),
        category: detectCategory(item.title + " " + (item.description || "")),
        imageUrl: item.image_url,
      }));
  } catch (error) {
    console.error("Error fetching from News API:", error);
    return [];
  }
}

// Parse RSS feed
async function parseRSSFeed(source: typeof NEWS_SOURCES[0]): Promise<NewsItem[]> {
  try {
    const response = await fetch(source.rssUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CivicDetector/1.0)",
      },
    });

    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    
    // Simple XML parsing for RSS
    const items: NewsItem[] = [];
    const itemMatches = text.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (let i = 0; i < Math.min(itemMatches.length, 20); i++) {
      const item = itemMatches[i];
      
      const title = extractTag(item, "title");
      const description = extractTag(item, "description") || extractTag(item, "content:encoded");
      const link = extractTag(item, "link");
      const pubDate = extractTag(item, "pubDate");
      const imageUrl = extractImageFromContent(item);

      if (!title) continue;

      // Check if news is civic-related
      const fullText = `${title} ${description || ""}`.toLowerCase();
      const isCivicRelated = CIVIC_KEYWORDS.some(keyword => 
        fullText.includes(keyword.toLowerCase())
      );

      if (isCivicRelated) {
        items.push({
          id: `${source.name}-${Date.now()}-${i}`,
          title: cleanHtml(title),
          description: cleanHtml(description || "").slice(0, 200),
          link: link || "",
          source: source.namebn,
          sourceLogo: source.logo,
          publishedAt: pubDate ? new Date(pubDate) : new Date(),
          category: detectCategory(fullText),
          imageUrl,
        });
      }
    }

    return items;
  } catch (error) {
    console.error(`Error fetching RSS from ${source.name}:`, error);
    return [];
  }
}

function extractTag(xml: string, tag: string): string {
  const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"));
  if (cdataMatch) return cdataMatch[1];
  
  const simpleMatch = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return simpleMatch ? simpleMatch[1] : "";
}

function extractImageFromContent(xml: string): string | undefined {
  // Try to find image in enclosure
  const enclosure = xml.match(/<enclosure[^>]*url="([^"]*)"[^>]*type="image/i);
  if (enclosure) return enclosure[1];

  // Try to find image in media:content
  const media = xml.match(/<media:content[^>]*url="([^"]*)"/i);
  if (media) return media[1];

  // Try to find image in content
  const img = xml.match(/<img[^>]*src="([^"]*)"/i);
  if (img) return img[1];

  return undefined;
}

function cleanHtml(text: string): string {
  return text
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function detectCategory(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes("জলাবদ্ধতা") || lowerText.includes("waterlog") || lowerText.includes("বন্যা") || lowerText.includes("flood")) {
    return "waterlogging";
  }
  if (lowerText.includes("গর্ত") || lowerText.includes("pothole") || lowerText.includes("রাস্তা") || lowerText.includes("road")) {
    return "road";
  }
  if (lowerText.includes("যানজট") || lowerText.includes("traffic") || lowerText.includes("ট্রাফিক")) {
    return "traffic";
  }
  if (lowerText.includes("আবর্জনা") || lowerText.includes("garbage") || lowerText.includes("ময়লা") || lowerText.includes("waste")) {
    return "garbage";
  }
  if (lowerText.includes("দূষণ") || lowerText.includes("pollution") || lowerText.includes("বায়ু") || lowerText.includes("air")) {
    return "pollution";
  }
  if (lowerText.includes("দুর্ঘটনা") || lowerText.includes("accident")) {
    return "accident";
  }
  if (lowerText.includes("বিদ্যুৎ") || lowerText.includes("electricity") || lowerText.includes("power")) {
    return "electricity";
  }
  if (lowerText.includes("পানি") || lowerText.includes("water") || lowerText.includes("ওয়াসা") || lowerText.includes("wasa")) {
    return "water";
  }
  
  return "general";
}

export async function GET() {
  try {
    // Try fetching from multiple sources in parallel
    const [apiNews, ...rssResults] = await Promise.all([
      fetchFromNewsAPI(),
      ...NEWS_SOURCES.map(source => parseRSSFeed(source)),
    ]);

    // Combine all news
    let allNews: NewsItem[] = [...apiNews];
    for (const rssNews of rssResults) {
      allNews = [...allNews, ...rssNews];
    }

    // Remove duplicates based on title similarity
    const uniqueNews = allNews.reduce((acc: NewsItem[], current) => {
      const isDuplicate = acc.some(item => 
        item.title.toLowerCase().includes(current.title.toLowerCase().slice(0, 30)) ||
        current.title.toLowerCase().includes(item.title.toLowerCase().slice(0, 30))
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    // Sort by date (newest first) and limit to 15 items
    const sortedNews = uniqueNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 15);

    // If no news found, return sample civic news
    if (sortedNews.length === 0) {
      return NextResponse.json({
        success: true,
        news: getSampleNews(),
        lastUpdated: new Date().toISOString(),
        source: "sample",
      });
    }

    return NextResponse.json({
      success: true,
      news: sortedNews,
      lastUpdated: new Date().toISOString(),
      source: "live",
    });
  } catch (error) {
    console.error("Error in news API:", error);
    return NextResponse.json({
      success: true,
      news: getSampleNews(),
      lastUpdated: new Date().toISOString(),
      source: "fallback",
    });
  }
}

// Sample news for fallback
function getSampleNews(): NewsItem[] {
  return [
    {
      id: "sample-1",
      title: "রাজধানীতে জলাবদ্ধতা: দুর্ভোগে নগরবাসী",
      description: "ভারী বৃষ্টিতে রাজধানীর বিভিন্ন এলাকায় জলাবদ্ধতা সৃষ্টি হয়েছে। মিরপুর, মগবাজার ও যাত্রাবাড়ীতে পানি জমে আছে।",
      link: "#",
      source: "প্রথম আলো",
      sourceLogo: "",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "waterlogging",
    },
    {
      id: "sample-2",
      title: "ঢাকা-চট্টগ্রাম মহাসড়কে যানজট",
      description: "ঢাকা-চট্টগ্রাম মহাসড়কের কাঁচপুর এলাকায় তীব্র যানজট। ঘণ্টার পর ঘণ্টা আটকে আছে যানবাহন।",
      link: "#",
      source: "যুগান্তর",
      sourceLogo: "",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: "traffic",
    },
    {
      id: "sample-3",
      title: "গুলশানে গ্যাস লাইনে বিস্ফোরণ",
      description: "গুলশান-২ এলাকায় গ্যাস লাইনে বিস্ফোরণে আহত ৫ জন। ঘটনাস্থলে ফায়ার সার্ভিস।",
      link: "#",
      source: "বিডি নিউজ ২৪",
      sourceLogo: "",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: "accident",
    },
    {
      id: "sample-4",
      title: "মিরপুরে রাস্তা সংস্কার কাজ শুরু",
      description: "মিরপুর-১০ থেকে মিরপুর-১২ পর্যন্ত রাস্তা সংস্কার কাজ শুরু হয়েছে। ২ মাসে কাজ শেষ হবে বলে জানিয়েছে সিটি করপোরেশন।",
      link: "#",
      source: "কালের কণ্ঠ",
      sourceLogo: "",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: "road",
    },
    {
      id: "sample-5",
      title: "ঢাকার বায়ু দূষণ বিপজ্জনক মাত্রায়",
      description: "রাজধানীতে বায়ু দূষণের মাত্রা বিপজ্জনক পর্যায়ে পৌঁছেছে। AQI সূচক ২৫০ ছাড়িয়ে গেছে।",
      link: "#",
      source: "দ্য ডেইলি স্টার",
      sourceLogo: "",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
      category: "pollution",
    },
  ];
}

