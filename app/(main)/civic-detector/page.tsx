"use client";

import { motion } from "framer-motion";
import { MapIcon, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { useCivicDetector } from "@/hooks/use-civic-detector";
import {
  translations,
  InputPanel,
  GpsPanel,
  SensorPanel,
  WeatherPanel,
  MapPanel,
  ReportPanel,
  CrowdReportsPanel,
  CrowdReportsProvider,
  SubmitReportForm,
  NewsPanel,
} from "@/components/civic";

function CivicDetectorContent() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const {
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
  } = useCivicDetector(lang);

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
            <InputPanel
              lang={lang}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              previewUrls={previewUrls}
              setPreviewUrls={setPreviewUrls}
              isRecording={isRecording}
              toggleRecording={toggleRecording}
              voiceTranscript={voiceTranscript}
              interimTranscript={interimTranscript}
              textInput={textInput}
              setTextInput={setTextInput}
            />

            {/* GPS Section */}
            <GpsPanel
              lang={lang}
              gpsMode={gpsMode}
              setGpsMode={setGpsMode}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              isDetectingLocation={isDetectingLocation}
              locationError={locationError}
              detectLocation={detectLocation}
              manualLat={manualLat}
              setManualLat={setManualLat}
              manualLng={manualLng}
              setManualLng={setManualLng}
            />

            {/* Sensor Data Panel */}
            <SensorPanel
              lang={lang}
              sensorData={sensorData}
              showSensorPanel={showSensorPanel}
              setShowSensorPanel={setShowSensorPanel}
            />

            {/* Weather */}
            <WeatherPanel lang={lang} weather={weather} />

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
          <MapPanel
            lang={lang}
            coordinates={coordinates}
            allMapIssues={allMapIssues}
            showHeatmap={showHeatmap}
            setShowHeatmap={setShowHeatmap}
            showClusters={showClusters}
            setShowClusters={setShowClusters}
            onIssueSelect={setSelectedIssue}
          />

          {/* Right Panel - Report */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Analysis Report */}
            <ReportPanel
              lang={lang}
              detectedIssues={detectedIssues}
              analysisReport={analysisReport}
              selectedIssue={selectedIssue}
              setSelectedIssue={setSelectedIssue}
              coordinates={coordinates}
            />

            {/* Live Crowd Reports */}
            {/* <CrowdReportsPanel lang={lang} /> */}

            {/* Civic News from Newspapers */}
            <NewsPanel lang={lang} />
          </motion.div>
        </div>
      </div>

      {/* Floating Submit Report Button & Form */}
      <SubmitReportForm lang={lang} coordinates={coordinates} />
    </div>
  );
}

export default function CivicDetectorPage() {
  return (
    <CrowdReportsProvider>
      <CivicDetectorContent />
    </CrowdReportsProvider>
  );
}
