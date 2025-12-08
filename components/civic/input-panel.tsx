"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, Mic, MicOff, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { translations } from "./types";

interface InputPanelProps {
  lang: "bn" | "en";
  activeTab: "upload" | "voice" | "text";
  setActiveTab: (tab: "upload" | "voice" | "text") => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  previewUrls: string[];
  setPreviewUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
  isRecording: boolean;
  toggleRecording: () => void;
  voiceTranscript: string;
  interimTranscript: string;
  textInput: string;
  setTextInput: (text: string) => void;
}

export function InputPanel({
  lang,
  activeTab,
  setActiveTab,
  uploadedFiles,
  setUploadedFiles,
  previewUrls,
  setPreviewUrls,
  isRecording,
  toggleRecording,
  voiceTranscript,
  interimTranscript,
  textInput,
  setTextInput,
}: InputPanelProps) {
  const t = translations[lang];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev: File[]) => [...prev, ...acceptedFiles]);
    const urls = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls((prev: string[]) => [...prev, ...urls]);
  }, [setUploadedFiles, setPreviewUrls]);

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
    setUploadedFiles((prev: File[]) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  return (
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
                <p className={cn("text-sm text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
                  {isDragActive ? t.dropHere : t.dragOrClick}
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, MP4, WebM</p>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    {uploadedFiles[index]?.type.startsWith("video/") ? (
                      <video src={url} className="w-full h-20 object-cover rounded-lg" />
                    ) : (
                      <img src={url} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
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
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg transition-all relative",
                isRecording ? "bg-red-500" : "bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500"
              )}
            >
              {isRecording ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
              {isRecording && <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />}
            </motion.button>
            <p className={cn("text-sm text-slate-600 dark:text-slate-400", lang === "bn" && "bangla-text")}>
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
  );
}

