"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GpsCoordinates, SensorData, WeatherData, DetectedIssue, translations } from "@/components/civic/types";

export function useCivicDetector(lang: "bn" | "en") {
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
        
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        
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
        () => {
          setLocationError(t.locationError);
          setIsDetectingLocation(false);
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
    try {
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
        setWeather({
          temperature: 28,
          humidity: 75,
          description: lang === "bn" ? "আংশিক মেঘলা" : "Partly Cloudy",
          icon: "03d",
          windSpeed: 12,
        });
      }
    } catch {
      setWeather({
        temperature: 28,
        humidity: 75,
        description: lang === "bn" ? "আংশিক মেঘলা" : "Partly Cloudy",
        icon: "03d",
        windSpeed: 12,
      });
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

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Generate mock analysis
  const generateMockAnalysis = useCallback(() => {
    if (!coordinates) return;
    
    const mockIssues: DetectedIssue[] = [];
    
    if (sensorData.waterLevel > 40) {
      mockIssues.push({
        id: `issue-${Date.now()}-1`,
        type: "waterlogging",
        severity: Math.min(10, Math.round(sensorData.waterLevel / 10)),
        description: lang === "bn" 
          ? `পানির স্তর ${sensorData.waterLevel}cm - জলাবদ্ধতার আশঙ্কা রয়েছে।`
          : `Water level at ${sensorData.waterLevel}cm - risk of waterlogging.`,
        recommendations: {
          authorities: lang === "bn"
            ? ["নালা পরিষ্কার করুন", "পাম্প দিয়ে পানি সরান"]
            : ["Clear drainage systems", "Deploy water pumps"],
          citizens: lang === "bn"
            ? ["এলাকা এড়িয়ে চলুন", "জলরোধী জুতা পরুন"]
            : ["Avoid the area", "Wear waterproof footwear"],
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
          ? `বায়ুর মান সূচক (AQI) ${sensorData.airQuality} - দূষণ শনাক্ত হয়েছে।`
          : `Air Quality Index (AQI) ${sensorData.airQuality} - pollution detected.`,
        recommendations: {
          authorities: lang === "bn"
            ? ["দূষণের উৎস চিহ্নিত করুন", "সতর্কতা জারি করুন"]
            : ["Identify pollution sources", "Issue public advisory"],
          citizens: lang === "bn"
            ? ["মাস্ক পরুন", "বাইরের কাজ সীমিত করুন"]
            : ["Wear masks outdoors", "Limit outdoor activities"],
        },
        coordinates: {
          lat: coordinates.lat + Math.random() * 0.008,
          lng: coordinates.lng - Math.random() * 0.005,
        },
        timestamp: new Date(),
      });
    }
    
    mockIssues.push({
      id: `issue-${Date.now()}-3`,
      type: "pothole",
      severity: 6,
      description: lang === "bn"
        ? "রাস্তায় বড় গর্ত শনাক্ত হয়েছে।"
        : "Large pothole detected on the road.",
      recommendations: {
        authorities: lang === "bn"
          ? ["জরুরি মেরামত করুন", "সতর্কতা চিহ্ন স্থাপন করুন"]
          : ["Schedule immediate repair", "Place warning signs"],
        citizens: lang === "bn"
          ? ["সাবধানে গাড়ি চালান", "কর্তৃপক্ষকে জানান"]
          : ["Drive carefully", "Report to authorities"],
      },
      coordinates: {
        lat: coordinates.lat - Math.random() * 0.003,
        lng: coordinates.lng + Math.random() * 0.006,
      },
      timestamp: new Date(),
    });
    
    setDetectedIssues(mockIssues);
    setAnalysisReport(lang === "bn"
      ? `বিশ্লেষণে ${mockIssues.length}টি সমস্যা শনাক্ত হয়েছে।`
      : `Analysis detected ${mockIssues.length} issues.`
    );
  }, [coordinates, sensorData, lang]);

  // Analyze issues
  const analyzeIssues = async () => {
    if (!coordinates) return;
    
    setIsAnalyzing(true);
    
    try {
      const combinedInput = [voiceTranscript, textInput].filter(Boolean).join("\n");
      
      const imageBase64List: string[] = [];
      for (const file of uploadedFiles) {
        if (file.type.startsWith("image/")) {
          const base64 = await fileToBase64(file);
          imageBase64List.push(base64);
        }
      }
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAjPKl-F2eCHRFXNt8x8rkETtgSKgJ68j0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
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
      "lat_offset": 0.001 to 0.01,
      "lng_offset": 0.001 to 0.01
    }
  ],
  "summary_bn": "বাংলায় সার্বিক সারাংশ",
  "summary_en": "Overall summary in English",
  "overall_severity": 1-10
}

Detect at least 2-4 realistic issues based on the sensor data and any visual/text input.`,
                },
                ...imageBase64List.map(base64 => ({
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64.split(",")[1] || base64,
                  },
                })),
              ],
            }],
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
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysisResult = JSON.parse(jsonMatch[0]);
          
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
        generateMockAnalysis();
      }
    } catch {
      generateMockAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Return detected issues (crowd reports are added by MapPanel from context)
  const allMapIssues = detectedIssues;

  return {
    // File upload
    uploadedFiles,
    setUploadedFiles,
    previewUrls,
    setPreviewUrls,
    
    // GPS
    gpsMode,
    setGpsMode,
    coordinates,
    setCoordinates,
    manualLat,
    setManualLat,
    manualLng,
    setManualLng,
    isDetectingLocation,
    locationError,
    detectLocation,
    
    // Sensor & Weather
    sensorData,
    weather,
    showSensorPanel,
    setShowSensorPanel,
    
    // Voice
    isRecording,
    toggleRecording,
    voiceTranscript,
    interimTranscript,
    
    // Text
    textInput,
    setTextInput,
    
    // Analysis
    isAnalyzing,
    analyzeIssues,
    detectedIssues,
    analysisReport,
    
    // Map
    showHeatmap,
    setShowHeatmap,
    showClusters,
    setShowClusters,
    selectedIssue,
    setSelectedIssue,
    allMapIssues,
    
    // UI
    activeTab,
    setActiveTab,
  };
}

