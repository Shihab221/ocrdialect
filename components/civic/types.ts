import {
  Droplets,
  Wind,
  AlertCircle,
  Building2,
  Car,
  TrafficCone,
  Trash2,
  Lightbulb,
  Construction,
} from "lucide-react";

// Types
export interface GpsCoordinates {
  lat: number;
  lng: number;
}

export interface SensorData {
  waterLevel: number;
  airQuality: number;
  rainfall: number;
  temperature: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
}

export interface DetectedIssue {
  id: string;
  type: string;
  severity: number;
  description: string;
  recommendations: {
    authorities: string[];
    citizens: string[];
  };
  coordinates: GpsCoordinates;
  timestamp: Date;
  imageUrl?: string;
}

export interface CrowdReport {
  id: string;
  type: string;
  description: string;
  severity: number;
  coordinates: GpsCoordinates;
  timestamp: Date;
  reporter: string;
  verified: boolean;
}

// Issue type icons mapping
export const issueIcons: Record<string, any> = {
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

// Translations
export const translations = {
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


// Utility function
export const getSeverityColor = (severity: number) => {
  if (severity >= 8) return "text-red-500 bg-red-100 dark:bg-red-900/30";
  if (severity >= 5) return "text-orange-500 bg-orange-100 dark:bg-orange-900/30";
  if (severity >= 3) return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
  return "text-green-500 bg-green-100 dark:bg-green-900/30";
};

