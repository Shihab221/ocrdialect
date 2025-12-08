"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  FileText,
  Download,
  Share2,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  RefreshCw,
  Layers,
  Navigation,
  Cloud,
  Gauge,
  Radio,
  CheckCircle,
  Copy,
  ExternalLink,
  MapIcon,
  Video,
  Image as ImageIcon,
  Send,
  Sparkles,
  Activity,
  AlertCircle,
  Info,
  Flame,
  Zap,
  Building2,
  Car,
  TrafficCone,
  Trash2,
  Lightbulb,
  Construction,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

// Dynamic import for Map component (SSR disabled)
const CivicMap = dynamic(() => import("@/components/civic/civic-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl">
      <Loader2 className="w-8 h-8 animate-spin text-bangla-purple-500" />
    </div>
  ),
});

// Translations
const translations = {
  bn: {
    title: "সিভিক হটস্পট ডিটেক্টর",
    subtitle: "বাংলাদেশের নাগরিক সমস্যা শনাক্তকরণ ও রিপোর্টিং সিস্টেম",
    uploadSection: "ছবি/ভিডিও আপলোড",
    dragOrClick: "ছবি বা ভিডিও টেনে আনুন বা ক্লিক করুন",
    dropHere: "এখানে ছেড়ে দিন!",
    sensorData: "সেন্সর ডেটা",
    waterLevel: "পানির স্তর",
    airQuality: "বায়ুর মান (AQI)",
    rainfall: "বৃষ্টিপাত",
    temperature: "তাপমাত্রা",
    gpsCoordinates: "GPS স্থানাঙ্ক",
    autoDetect: "স্বয়ংক্রিয় শনাক্ত",
    manualEntry: "ম্যানুয়াল এন্ট্রি",
    latitude: "অক্ষাংশ",
    longitude: "দ্রাঘিমাংশ",
    voiceInput: "কণ্ঠস্বর ইনপুট",
    speakNow: "বলুন...",
    clickToRecord: "রেকর্ড করতে ক্লিক করুন",
    textInput: "টেক্সট ইনপুট",
    describeIssue: "সমস্যা বর্ণনা করুন...",
    weather: "আবহাওয়া",
    analyze: "বিশ্লেষণ করুন",
    analyzing: "বিশ্লেষণ চলছে...",
    report: "রিপোর্ট",
    severity: "তীব্রতা",
    category: "বিভাগ",
    recommendations: "সুপারিশ",
    topHotspots: "শীর্ষ ৫ হটস্পট",
    overallSeverity: "সার্বিক তীব্রতা সূচক",
    exportPdf: "PDF ডাউনলোড",
    exportGeoJson: "GeoJSON ডাউনলোড",
    shareLink: "লিঙ্ক শেয়ার",
    heatmapToggle: "হিটম্যাপ টগল",
    clusterToggle: "ক্লাস্টার টগল",
    recentReports: "সাম্প্রতিক রিপোর্ট",
    noIssues: "কোনো সমস্যা শনাক্ত হয়নি",
    detectingLocation: "অবস্থান শনাক্ত করা হচ্ছে...",
    locationDetected: "অবস্থান শনাক্ত হয়েছে",
    locationError: "অবস্থান শনাক্ত করা যায়নি",
    fetchingWeather: "আবহাওয়া তথ্য আনা হচ্ছে...",
    issueTypes: {
      pothole: "গর্ত",
      waterlogging: "জলাবদ্ধতা",
      garbage: "আবর্জনা",
      illegalConstruction: "অবৈধ নির্মাণ",
      brokenStreetlight: "ভাঙা স্ট্রিটলাইট",
      openManhole: "খোলা ম্যানহোল",
      trafficJam: "যানজট",
      airPollution: "বায়ু দূষণ",
      flooding: "বন্যা",
      roadDamage: "রাস্তার ক্ষতি",
    },
    severityLevels: {
      low: "নিম্ন",
      medium: "মাঝারি",
      high: "উচ্চ",
      critical: "জরুরি",
    },
    actions: {
      authorities: "কর্তৃপক্ষের জন্য পদক্ষেপ",
      citizens: "নাগরিকদের জন্য পদক্ষেপ",
    },
  },
  en: {
    title: "Civic Hotspot Detector",
    subtitle: "Bangladesh Civic Issue Detection & Reporting System",
    uploadSection: "Upload Image/Video",
    dragOrClick: "Drag & drop image or video, or click to upload",
    dropHere: "Drop here!",
    sensorData: "Sensor Data",
    waterLevel: "Water Level",
    airQuality: "Air Quality (AQI)",
    rainfall: "Rainfall",
    temperature: "Temperature",
    gpsCoordinates: "GPS Coordinates",
    autoDetect: "Auto Detect",
    manualEntry: "Manual Entry",
    latitude: "Latitude",
    longitude: "Longitude",
    voiceInput: "Voice Input",
    speakNow: "Speak now...",
    clickToRecord: "Click to record",
    textInput: "Text Input",
    describeIssue: "Describe the issue...",
    weather: "Weather",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    report: "Report",
    severity: "Severity",
    category: "Category",
    recommendations: "Recommendations",
    topHotspots: "Top 5 Hotspots",
    overallSeverity: "Overall Severity Index",
    exportPdf: "Export PDF",
    exportGeoJson: "Export GeoJSON",
    shareLink: "Share Link",
    heatmapToggle: "Toggle Heatmap",
    clusterToggle: "Toggle Clusters",
    recentReports: "Recent Reports",
    noIssues: "No issues detected",
    detectingLocation: "Detecting location...",
    locationDetected: "Location detected",
    locationError: "Could not detect location",
    fetchingWeather: "Fetching weather data...",
    issueTypes: {
      pothole: "Pothole",
      waterlogging: "Waterlogging",
      garbage: "Garbage Pile",
      illegalConstruction: "Illegal Construction",
      brokenStreetlight: "Broken Streetlight",
      openManhole: "Open Manhole",
      trafficJam: "Traffic Jam",
      airPollution: "Air Pollution",
      flooding: "Flooding",
      roadDamage: "Road Damage",
    },
    severityLevels: {
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
    },
    actions: {
      authorities: "Actions for Authorities",
      citizens: "Actions for Citizens",
    },
  },
};

// Issue type icons mapping
const issueIcons: Record<string, any> = {
  pothole: TrafficCone,
  waterlogging: Droplets,
  garbage: Trash2,
  illegalConstruction: Building2,
  brokenStreetlight: Lightbulb,
  openManhole: AlertCircle,
  trafficJam: Car,
  airPollution: Wind,
  flooding: Droplets,
  roadDamage: Construction,
};

// Types
interface GpsCoordinates {
  lat: number;
  lng: number;
}

interface SensorData {
  waterLevel: number; // cm
  airQuality: number; // AQI
  rainfall: number; // mm
  temperature: number; // °C
}

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
}

interface DetectedIssue {
  id: string;
  type: string;
  severity: number; // 1-10
  description: string;
  recommendations: {
    authorities: string[];
    citizens: string[];
  };
  coordinates: GpsCoordinates;
  timestamp: Date;
  imageUrl?: string;
}

interface CrowdReport {
  id: string;
  type: string;
  description: string;
  severity: number;
  coordinates: GpsCoordinates;
  timestamp: Date;
  reporter: string;
  verified: boolean;
}

// Mock crowd-sourced reports
const mockCrowdReports: CrowdReport[] = [
  {
    id: "cr1",
    type: "waterlogging",
    description: "মিরপুর ১০ নম্বরে গভীর জলাবদ্ধতা, যানবাহন চলাচল বন্ধ",
    severity: 8,
    coordinates: { lat: 23.8069, lng: 90.3687 },
    timestamp: new Date(Date.now() - 30 * 60000),
    reporter: "রহিম",
    verified: true,
  },
  {
    id: "cr2",
    type: "pothole",
    description: "গুলশান ২ এ বড় গর্ত, একাধিক দুর্ঘটনা ঘটেছে",
    severity: 7,
    coordinates: { lat: 23.7934, lng: 90.4142 },
    timestamp: new Date(Date.now() - 45 * 60000),
    reporter: "করিম",
    verified: true,
  },
  {
    id: "cr3",
    type: "garbage",
    description: "মগবাজার মোড়ে আবর্জনার স্তূপ, দুর্গন্ধ ছড়াচ্ছে",
    severity: 6,
    coordinates: { lat: 23.7509, lng: 90.4097 },
    timestamp: new Date(Date.now() - 60 * 60000),
    reporter: "সালমা",
    verified: false,
  },
  {
    id: "cr4",
    type: "trafficJam",
    description: "ফার্মগেটে তীব্র যানজট, ঘণ্টা ধরে আটকে আছি",
    severity: 5,
    coordinates: { lat: 23.7577, lng: 90.3897 },
    timestamp: new Date(Date.now() - 15 * 60000),
    reporter: "জামিল",
    verified: true,
  },
  {
    id: "cr5",
    type: "brokenStreetlight",
    description: "ধানমন্ডি ২৭ এ স্ট্রিটলাইট সব বন্ধ, অন্ধকার রাস্তা",
    severity: 4,
    coordinates: { lat: 23.7465, lng: 90.3762 },
    timestamp: new Date(Date.now() - 120 * 60000),
    reporter: "নাসরিন",
    verified: true,
  },
  {
    id: "cr6",
    type: "openManhole",
    description: "উত্তরা সেক্টর ৭ এ খোলা ম্যানহোল, বিপজ্জনক",
    severity: 9,
    coordinates: { lat: 23.8759, lng: 90.3795 },
    timestamp: new Date(Date.now() - 90 * 60000),
    reporter: "আলম",
    verified: true,
  },
  {
    id: "cr7",
    type: "airPollution",
    description: "তেজগাঁও শিল্প এলাকায় তীব্র ধোঁয়া, শ্বাসকষ্ট হচ্ছে",
    severity: 7,
    coordinates: { lat: 23.7642, lng: 90.4012 },
    timestamp: new Date(Date.now() - 180 * 60000),
    reporter: "মিতা",
    verified: false,
  },
  {
    id: "cr8",
    type: "flooding",
    description: "যাত্রাবাড়ীতে বন্যার পানি ঢুকেছে বাড়িতে",
    severity: 9,
    coordinates: { lat: 23.7107, lng: 90.4350 },
    timestamp: new Date(Date.now() - 240 * 60000),
    reporter: "হাসান",
    verified: true,
  },
];

export default function CivicDetectorPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  // State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [gpsMode, setGpsMode] = useState<"auto" | "manual">("auto");
  const [coordinates, setCoordinates] = useState<GpsCoordinates | null>(null);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  
  // Sensor data (mock)
  const [sensorData, setSensorData] = useState<SensorData>({
    waterLevel: 45,
    airQuality: 165,
    rainfall: 12,
    temperature: 28,
  });
  
  // Weather
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  // Voice input
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Text input
  const [textInput, setTextInput] = useState("");
  
  // Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedIssues, setDetectedIssues] = useState<DetectedIssue[]>([]);
  const [analysisReport, setAnalysisReport] = useState<string>("");
  
  // Map controls
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showClusters, setShowClusters] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<DetectedIssue | null>(null);
  
  // UI state
  const [showSensorPanel, setShowSensorPanel] = useState(true);
  const [showReportPanel, setShowReportPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"upload" | "voice" | "text">("upload");

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === "bn" ? "bn-BD" : "en-US";
        
        recognition.onresult = (event) => {
          let interim = "";
          let final = "";
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }
          
          if (final) {
            setVoiceTranscript(prev => prev + final);
            setInterimTranscript("");
          } else {
            setInterimTranscript(interim);
          }
        };
        
        recognition.onerror = () => {
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [lang]);

  // Auto-detect GPS location
  const detectLocation = useCallback(() => {
    setIsDetectingLocation(true);
    setLocationError("");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(t.locationError);
          setIsDetectingLocation(false);
          // Default to Dhaka
          setCoordinates({ lat: 23.8103, lng: 90.4125 });
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationError(t.locationError);
      setIsDetectingLocation(false);
      setCoordinates({ lat: 23.8103, lng: 90.4125 });
    }
  }, [t.locationError]);

  // Fetch weather data
  const fetchWeather = useCallback(async (coords: GpsCoordinates) => {
    setIsLoadingWeather(true);
    try {
      // Using OpenWeatherMap API (free tier)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=demo&lang=${lang === "bn" ? "bn" : "en"}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
        });
      } else {
        // Mock weather data for demo
        setWeather({
          temperature: 28,
          humidity: 75,
          description: lang === "bn" ? "আংশিক মেঘলা" : "Partly Cloudy",
          icon: "03d",
          windSpeed: 12,
        });
      }
    } catch (error) {
      // Mock weather data for demo
      setWeather({
        temperature: 28,
        humidity: 75,
        description: lang === "bn" ? "আংশিক মেঘলা" : "Partly Cloudy",
        icon: "03d",
        windSpeed: 12,
      });
    } finally {
      setIsLoadingWeather(false);
    }
  }, [lang]);

  // Auto-detect location on mount
  useEffect(() => {
    if (gpsMode === "auto" && !coordinates) {
      detectLocation();
    }
  }, [gpsMode, coordinates, detectLocation]);

  // Fetch weather when coordinates change
  useEffect(() => {
    if (coordinates) {
      fetchWeather(coordinates);
    }
  }, [coordinates, fetchWeather]);

  // Update sensor data periodically (mock real-time)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        waterLevel: Math.max(0, prev.waterLevel + (Math.random() - 0.5) * 10),
        airQuality: Math.max(0, Math.min(500, prev.airQuality + (Math.random() - 0.5) * 20)),
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.3) * 2),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // File upload handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    const urls = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "video/*": [".mp4", ".webm", ".mov"],
    },
    maxFiles: 5,
  });

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Voice recording toggle
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setVoiceTranscript("");
      setInterimTranscript("");
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Speech recognition error:", error);
      }
    }
  };

  // Analyze issues
  const analyzeIssues = async () => {
    if (!coordinates) return;
    
    setIsAnalyzing(true);
    
    try {
      // Combine all inputs
      const combinedInput = [voiceTranscript, textInput].filter(Boolean).join("\n");
      
      // Prepare image data for API
      const imageBase64List: string[] = [];
      for (const file of uploadedFiles) {
        if (file.type.startsWith("image/")) {
          const base64 = await fileToBase64(file);
          imageBase64List.push(base64);
        }
      }
      
      // Call Gemini API for analysis
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAjPKl-F2eCHRFXNt8x8rkETtgSKgJ68j0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a civic issue detection system for Bangladesh. Analyze the following inputs and detect civic issues.

${imageBase64List.length > 0 ? "Images have been uploaded showing potential civic issues." : ""}

User description (if any): ${combinedInput || "No description provided"}

Sensor Data:
- Water Level: ${sensorData.waterLevel}cm ${sensorData.waterLevel > 50 ? "(HIGH - potential flooding)" : ""}
- Air Quality (AQI): ${sensorData.airQuality} ${sensorData.airQuality > 150 ? "(UNHEALTHY)" : sensorData.airQuality > 100 ? "(MODERATE)" : "(GOOD)"}
- Rainfall: ${sensorData.rainfall}mm
- Temperature: ${sensorData.temperature}°C

GPS Location: ${coordinates.lat}, ${coordinates.lng} (Bangladesh)

Based on this information, provide a JSON response with the following structure:
{
  "issues": [
    {
      "type": "one of: pothole, waterlogging, garbage, illegalConstruction, brokenStreetlight, openManhole, trafficJam, airPollution, flooding, roadDamage",
      "severity": 1-10,
      "description_bn": "বাংলায় বিস্তারিত বর্ণনা",
      "description_en": "Detailed description in English",
      "recommendations_authorities_bn": ["কর্তৃপক্ষের জন্য সুপারিশ ১", "সুপারিশ ২"],
      "recommendations_authorities_en": ["Recommendation 1 for authorities", "Recommendation 2"],
      "recommendations_citizens_bn": ["নাগরিকদের জন্য সুপারিশ ১", "সুপারিশ ২"],
      "recommendations_citizens_en": ["Recommendation 1 for citizens", "Recommendation 2"],
      "lat_offset": 0.001 to 0.01 (small random offset from base coordinates),
      "lng_offset": 0.001 to 0.01
    }
  ],
  "summary_bn": "বাংলায় সার্বিক সারাংশ",
  "summary_en": "Overall summary in English",
  "overall_severity": 1-10
}

Detect at least 2-4 realistic issues based on the sensor data and any visual/text input. If water level is high, include waterlogging/flooding. If AQI is high, include air pollution. Be realistic for Bangladesh urban areas.`,
                  },
                  ...imageBase64List.map(base64 => ({
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: base64.split(",")[1] || base64,
                    },
                  })),
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysisResult = JSON.parse(jsonMatch[0]);
          
          // Convert to DetectedIssue format
          const issues: DetectedIssue[] = analysisResult.issues.map((issue: any, index: number) => ({
            id: `issue-${Date.now()}-${index}`,
            type: issue.type,
            severity: issue.severity,
            description: lang === "bn" ? issue.description_bn : issue.description_en,
            recommendations: {
              authorities: lang === "bn" ? issue.recommendations_authorities_bn : issue.recommendations_authorities_en,
              citizens: lang === "bn" ? issue.recommendations_citizens_bn : issue.recommendations_citizens_en,
            },
            coordinates: {
              lat: coordinates.lat + (issue.lat_offset || Math.random() * 0.01),
              lng: coordinates.lng + (issue.lng_offset || Math.random() * 0.01),
            },
            timestamp: new Date(),
            imageUrl: previewUrls[0] || undefined,
          }));
          
          setDetectedIssues(issues);
          setAnalysisReport(lang === "bn" ? analysisResult.summary_bn : analysisResult.summary_en);
        }
      } else {
        // Fallback mock analysis
        generateMockAnalysis();
      }
    } catch (error) {
      console.error("Analysis error:", error);
      generateMockAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate mock analysis as fallback
  const generateMockAnalysis = () => {
    if (!coordinates) return;
    
    const mockIssues: DetectedIssue[] = [];
    
    // Add issues based on sensor data
    if (sensorData.waterLevel > 40) {
      mockIssues.push({
        id: `issue-${Date.now()}-1`,
        type: "waterlogging",
        severity: Math.min(10, Math.round(sensorData.waterLevel / 10)),
        description: lang === "bn" 
          ? `পানির স্তর ${sensorData.waterLevel}cm - জলাবদ্ধতার আশঙ্কা রয়েছে। রাস্তায় পানি জমে যানবাহন চলাচলে বিঘ্ন ঘটছে।`
          : `Water level at ${sensorData.waterLevel}cm - risk of waterlogging. Roads may be flooded affecting traffic.`,
        recommendations: {
          authorities: lang === "bn"
            ? ["নালা পরিষ্কার করুন", "পাম্প দিয়ে পানি সরান", "জরুরি সেবা প্রস্তুত রাখুন"]
            : ["Clear drainage systems", "Deploy water pumps", "Keep emergency services ready"],
          citizens: lang === "bn"
            ? ["এলাকা এড়িয়ে চলুন", "জরুরি না হলে বাইরে যাবেন না", "জলরোধী জুতা পরুন"]
            : ["Avoid the area", "Stay indoors if possible", "Wear waterproof footwear"],
        },
        coordinates: {
          lat: coordinates.lat + Math.random() * 0.005,
          lng: coordinates.lng + Math.random() * 0.005,
        },
        timestamp: new Date(),
      });
    }
    
    if (sensorData.airQuality > 100) {
      mockIssues.push({
        id: `issue-${Date.now()}-2`,
        type: "airPollution",
        severity: Math.min(10, Math.round(sensorData.airQuality / 50)),
        description: lang === "bn"
          ? `বায়ুর মান সূচক (AQI) ${sensorData.airQuality} - ${sensorData.airQuality > 150 ? "অস্বাস্থ্যকর" : "মাঝারি"} মাত্রার দূষণ শনাক্ত হয়েছে।`
          : `Air Quality Index (AQI) ${sensorData.airQuality} - ${sensorData.airQuality > 150 ? "Unhealthy" : "Moderate"} pollution levels detected.`,
        recommendations: {
          authorities: lang === "bn"
            ? ["দূষণের উৎস চিহ্নিত করুন", "শিল্প কারখানা পরিদর্শন করুন", "সতর্কতা জারি করুন"]
            : ["Identify pollution sources", "Inspect industrial facilities", "Issue public advisory"],
          citizens: lang === "bn"
            ? ["মাস্ক পরুন", "ঘরের জানালা বন্ধ রাখুন", "বাইরের কাজ সীমিত করুন"]
            : ["Wear masks outdoors", "Keep windows closed", "Limit outdoor activities"],
        },
        coordinates: {
          lat: coordinates.lat + Math.random() * 0.008,
          lng: coordinates.lng - Math.random() * 0.005,
        },
        timestamp: new Date(),
      });
    }
    
    // Add a pothole issue
    mockIssues.push({
      id: `issue-${Date.now()}-3`,
      type: "pothole",
      severity: 6,
      description: lang === "bn"
        ? "রাস্তায় বড় গর্ত শনাক্ত হয়েছে। যানবাহন ও পথচারীদের জন্য বিপজ্জনক।"
        : "Large pothole detected on the road. Dangerous for vehicles and pedestrians.",
      recommendations: {
        authorities: lang === "bn"
          ? ["জরুরি মেরামত করুন", "সতর্কতা চিহ্ন স্থাপন করুন", "ট্রাফিক পুলিশ মোতায়েন করুন"]
          : ["Schedule immediate repair", "Place warning signs", "Deploy traffic police"],
        citizens: lang === "bn"
          ? ["সাবধানে গাড়ি চালান", "রাতে এলাকা এড়িয়ে চলুন", "কর্তৃপক্ষকে জানান"]
          : ["Drive carefully", "Avoid area at night", "Report to authorities"],
      },
      coordinates: {
        lat: coordinates.lat - Math.random() * 0.003,
        lng: coordinates.lng + Math.random() * 0.006,
      },
      timestamp: new Date(),
    });
    
    setDetectedIssues(mockIssues);
    setAnalysisReport(lang === "bn"
      ? `বিশ্লেষণে ${mockIssues.length}টি সমস্যা শনাক্ত হয়েছে। সেন্সর ডেটা অনুযায়ী এলাকায় ${sensorData.waterLevel > 40 ? "জলাবদ্ধতা" : ""} ${sensorData.airQuality > 100 ? "ও বায়ু দূষণের" : "ও অবকাঠামোগত"} সমস্যা রয়েছে।`
      : `Analysis detected ${mockIssues.length} issues. Based on sensor data, the area has ${sensorData.waterLevel > 40 ? "waterlogging" : ""} ${sensorData.airQuality > 100 ? "and air quality" : "and infrastructure"} concerns.`
    );
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

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

  // Get severity color
  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return "text-red-500 bg-red-100 dark:bg-red-900/30";
    if (severity >= 5) return "text-orange-500 bg-orange-100 dark:bg-orange-900/30";
    if (severity >= 3) return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-green-500 bg-green-100 dark:bg-green-900/30";
  };

  // Calculate overall severity
  const overallSeverity = detectedIssues.length > 0
    ? Math.round(detectedIssues.reduce((sum, issue) => sum + issue.severity, 0) / detectedIssues.length)
    : 0;

  // Combine detected issues with crowd reports for map
  const allMapIssues = [
    ...detectedIssues,
    ...mockCrowdReports.map(report => ({
      id: report.id,
      type: report.type,
      severity: report.severity,
      description: report.description,
      recommendations: { authorities: [], citizens: [] },
      coordinates: report.coordinates,
      timestamp: report.timestamp,
    })),
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-bangla-purple-100/30 via-white to-bangla-pink-100/30 dark:from-bangla-purple-900/20 dark:via-slate-900 dark:to-bangla-pink-900/20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-bangla-purple-200/30 to-transparent rounded-full dark:from-bangla-purple-800/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-bangla-pink-200/30 to-transparent rounded-full dark:from-bangla-pink-800/20" />
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-3",
            lang === "bn" && "bangla-text"
          )}>
            <MapIcon className="w-4 h-4" />
            {lang === "bn" ? "ফিচার ২" : "Feature 2"}
          </span>
          <h1 className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-bold mb-2",
            lang === "bn" && "bangla-text"
          )}>
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p className={cn(
            "text-slate-600 dark:text-slate-400 text-sm md:text-base",
            lang === "bn" && "bangla-text"
          )}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Panel - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Input Tabs */}
            <div className="glass-card p-4">
              <div className="flex gap-2 mb-4">
                {(["upload", "voice", "text"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === tab
                        ? "bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    )}
                  >
                    {tab === "upload" && <Camera className="w-4 h-4 inline mr-1" />}
                    {tab === "voice" && <Mic className="w-4 h-4 inline mr-1" />}
                    {tab === "text" && <FileText className="w-4 h-4 inline mr-1" />}
                    {tab === "upload" && (lang === "bn" ? "ছবি" : "Upload")}
                    {tab === "voice" && (lang === "bn" ? "কণ্ঠ" : "Voice")}
                    {tab === "text" && (lang === "bn" ? "টেক্সট" : "Text")}
                  </button>
                ))}
              </div>

              {/* Upload Tab */}
              <AnimatePresence mode="wait">
                {activeTab === "upload" && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
                        isDragActive
                          ? "border-bangla-pink-500 bg-bangla-pink-50/50 dark:bg-bangla-pink-900/20"
                          : "border-slate-300 dark:border-slate-700 hover:border-bangla-purple-400"
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <p className={cn(
                          "text-sm text-slate-600 dark:text-slate-400",
                          lang === "bn" && "bangla-text"
                        )}>
                          {isDragActive ? t.dropHere : t.dragOrClick}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          PNG, JPG, MP4, WebM
                        </p>
                      </div>
                    </div>

                    {/* Preview uploaded files */}
                    {previewUrls.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            {uploadedFiles[index]?.type.startsWith("video/") ? (
                              <video
                                src={url}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            ) : (
                              <img
                                src={url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            )}
                            <button
                              onClick={() => removeFile(index)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Voice Tab */}
                {activeTab === "voice" && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleRecording}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg transition-all",
                        isRecording
                          ? "bg-red-500"
                          : "bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500"
                      )}
                    >
                      {isRecording ? (
                        <MicOff className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-white" />
                      )}
                      {isRecording && (
                        <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
                      )}
                    </motion.button>
                    <p className={cn(
                      "text-sm text-slate-600 dark:text-slate-400",
                      lang === "bn" && "bangla-text"
                    )}>
                      {isRecording ? t.speakNow : t.clickToRecord}
                    </p>
                    {(voiceTranscript || interimTranscript) && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left">
                        <p className="text-sm text-slate-800 dark:text-slate-200 bangla-text">
                          {voiceTranscript}
                          <span className="text-slate-400">{interimTranscript}</span>
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Text Tab */}
                {activeTab === "text" && (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder={t.describeIssue}
                      className={cn(
                        "w-full h-32 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-bangla-purple-500",
                        lang === "bn" && "bangla-text"
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GPS Section */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={cn(
                  "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2",
                  lang === "bn" && "bangla-text"
                )}>
                  <MapPin className="w-4 h-4 text-bangla-purple-500" />
                  {t.gpsCoordinates}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setGpsMode("auto")}
                    className={cn(
                      "px-2 py-1 rounded-lg text-xs font-medium transition-all",
                      gpsMode === "auto"
                        ? "bg-bangla-purple-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {lang === "bn" ? "স্বয়ংক্রিয়" : "Auto"}
                  </button>
                  <button
                    onClick={() => setGpsMode("manual")}
                    className={cn(
                      "px-2 py-1 rounded-lg text-xs font-medium transition-all",
                      gpsMode === "manual"
                        ? "bg-bangla-purple-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
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
                  <Button
                    onClick={detectLocation}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
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
                        setCoordinates({
                          lat: parseFloat(manualLat),
                          lng: parseFloat(manualLng),
                        });
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

            {/* Sensor Data Panel */}
            <div className="glass-card p-4">
              <button
                onClick={() => setShowSensorPanel(!showSensorPanel)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h3 className={cn(
                  "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2",
                  lang === "bn" && "bangla-text"
                )}>
                  <Activity className="w-4 h-4 text-bangla-pink-500" />
                  {t.sensorData}
                  <span className="text-xs font-normal text-slate-500">(Live)</span>
                </h3>
                {showSensorPanel ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
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
                        <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
                          {t.waterLevel}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm font-semibold",
                        sensorData.waterLevel > 50 ? "text-red-500" : "text-blue-500"
                      )}>
                        {sensorData.waterLevel.toFixed(0)} cm
                      </span>
                    </div>

                    {/* Air Quality */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-purple-500" />
                        <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
                          {t.airQuality}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm font-semibold",
                        sensorData.airQuality > 150 ? "text-red-500" : sensorData.airQuality > 100 ? "text-orange-500" : "text-green-500"
                      )}>
                        {sensorData.airQuality.toFixed(0)}
                      </span>
                    </div>

                    {/* Rainfall */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-cyan-500" />
                        <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
                          {t.rainfall}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-cyan-500">
                        {sensorData.rainfall.toFixed(1)} mm
                      </span>
                    </div>

                    {/* Temperature */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className={cn("text-xs text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
                          {t.temperature}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-orange-500">
                        {sensorData.temperature.toFixed(1)}°C
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Weather */}
            {weather && (
              <div className="glass-card p-4">
                <h3 className={cn(
                  "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-3",
                  lang === "bn" && "bangla-text"
                )}>
                  <Cloud className="w-4 h-4 text-bangla-purple-500" />
                  {t.weather}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                      {weather.temperature}°C
                    </p>
                    <p className={cn(
                      "text-xs text-slate-500 capitalize",
                      lang === "bn" && "bangla-text"
                    )}>
                      {weather.description}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p>💧 {weather.humidity}%</p>
                    <p>💨 {weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={analyzeIssues}
              disabled={isAnalyzing || !coordinates}
              className="w-full py-6"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span className={lang === "bn" ? "bangla-text" : ""}>{t.analyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span className={lang === "bn" ? "bangla-text" : ""}>{t.analyze}</span>
                </>
              )}
            </Button>
          </motion.div>

          {/* Center - Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="glass-card p-4 h-[calc(100vh-200px)] min-h-[500px]">
              {/* Map Controls */}
              <div className="flex items-center justify-between mb-3">
                <h3 className={cn(
                  "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2",
                  lang === "bn" && "bangla-text"
                )}>
                  <MapIcon className="w-4 h-4 text-bangla-purple-500" />
                  {lang === "bn" ? "লাইভ ম্যাপ" : "Live Map"}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all",
                      showHeatmap
                        ? "bg-red-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <Flame className="w-3 h-3" />
                    {lang === "bn" ? "হিটম্যাপ" : "Heatmap"}
                  </button>
                  <button
                    onClick={() => setShowClusters(!showClusters)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all",
                      showClusters
                        ? "bg-bangla-purple-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
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
                  issues={allMapIssues}
                  showHeatmap={showHeatmap}
                  showClusters={showClusters}
                  onIssueSelect={setSelectedIssue}
                  lang={lang}
                  issueTypes={t.issueTypes}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Report */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Analysis Report */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={cn(
                  "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2",
                  lang === "bn" && "bangla-text"
                )}>
                  <FileText className="w-4 h-4 text-bangla-pink-500" />
                  {t.report}
                </h3>
                {detectedIssues.length > 0 && (
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    getSeverityColor(overallSeverity)
                  )}>
                    {overallSeverity}/10
                  </div>
                )}
              </div>

              {detectedIssues.length > 0 ? (
                <div className="space-y-3">
                  {/* Overall Summary */}
                  {analysisReport && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/20 dark:to-bangla-pink-900/20">
                      <p className={cn(
                        "text-sm text-slate-700 dark:text-slate-300",
                        lang === "bn" && "bangla-text"
                      )}>
                        {analysisReport}
                      </p>
                    </div>
                  )}

                  {/* Top Hotspots */}
                  <div>
                    <h4 className={cn(
                      "text-xs font-semibold text-slate-500 mb-2",
                      lang === "bn" && "bangla-text"
                    )}>
                      {t.topHotspots}
                    </h4>
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
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                getSeverityColor(issue.severity)
                              )}>
                                <IssueIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={cn(
                                    "text-xs font-semibold text-slate-800 dark:text-white",
                                    lang === "bn" && "bangla-text"
                                  )}>
                                    {t.issueTypes[issue.type as keyof typeof t.issueTypes] || issue.type}
                                  </span>
                                  <span className={cn(
                                    "text-xs font-bold px-1.5 py-0.5 rounded",
                                    getSeverityColor(issue.severity)
                                  )}>
                                    {issue.severity}/10
                                  </span>
                                </div>
                                <p className={cn(
                                  "text-xs text-slate-600 dark:text-slate-400 line-clamp-2",
                                  lang === "bn" && "bangla-text"
                                )}>
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
                      <h4 className={cn(
                        "text-xs font-semibold text-bangla-purple-600 dark:text-bangla-purple-400 mb-2",
                        lang === "bn" && "bangla-text"
                      )}>
                        {t.recommendations}
                      </h4>
                      
                      {selectedIssue.recommendations.authorities.length > 0 && (
                        <div className="mb-2">
                          <p className={cn(
                            "text-xs font-medium text-slate-500 mb-1",
                            lang === "bn" && "bangla-text"
                          )}>
                            {t.actions.authorities}:
                          </p>
                          <ul className="space-y-1">
                            {selectedIssue.recommendations.authorities.map((rec, i) => (
                              <li key={i} className={cn(
                                "text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1",
                                lang === "bn" && "bangla-text"
                              )}>
                                <span className="text-bangla-purple-500">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedIssue.recommendations.citizens.length > 0 && (
                        <div>
                          <p className={cn(
                            "text-xs font-medium text-slate-500 mb-1",
                            lang === "bn" && "bangla-text"
                          )}>
                            {t.actions.citizens}:
                          </p>
                          <ul className="space-y-1">
                            {selectedIssue.recommendations.citizens.map((rec, i) => (
                              <li key={i} className={cn(
                                "text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1",
                                lang === "bn" && "bangla-text"
                              )}>
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
                  <p className={cn(
                    "text-sm text-slate-500",
                    lang === "bn" && "bangla-text"
                  )}>
                    {t.noIssues}
                  </p>
                </div>
              )}
            </div>

            {/* Recent Crowd Reports */}
            <div className="glass-card p-4">
              <h3 className={cn(
                "text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-3",
                lang === "bn" && "bangla-text"
              )}>
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                {t.recentReports}
                <span className="text-xs font-normal text-slate-500">({mockCrowdReports.length})</span>
              </h3>
              <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
                {mockCrowdReports.slice(0, 5).map((report) => {
                  const IssueIcon = issueIcons[report.type] || AlertTriangle;
                  const timeDiff = Math.round((Date.now() - report.timestamp.getTime()) / 60000);
                  return (
                    <div
                      key={report.id}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-start gap-2">
                        <IssueIcon className={cn(
                          "w-4 h-4 flex-shrink-0 mt-0.5",
                          report.severity >= 7 ? "text-red-500" : report.severity >= 4 ? "text-orange-500" : "text-yellow-500"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-xs text-slate-700 dark:text-slate-300 line-clamp-2",
                            lang === "bn" && "bangla-text"
                          )}>
                            {report.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400">
                              {timeDiff < 60 
                                ? `${timeDiff}${lang === "bn" ? " মিনিট আগে" : "m ago"}`
                                : `${Math.round(timeDiff / 60)}${lang === "bn" ? " ঘণ্টা আগে" : "h ago"}`
                              }
                            </span>
                            {report.verified && (
                              <span className="text-[10px] text-green-500 flex items-center gap-0.5">
                                <CheckCircle className="w-3 h-3" />
                                {lang === "bn" ? "যাচাইকৃত" : "Verified"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

