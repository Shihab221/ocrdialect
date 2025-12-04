"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import confetti from "canvas-confetti";
import {
  Mic,
  MicOff,
  Upload,
  FileImage,
  X,
  Volume2,
  VolumeX,
  Copy,
  Share2,
  Loader2,
  Sparkles,
  CheckCircle,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  "এই চিঠিতে তারিখ কী?",
  "মোট টাকা কত?",
  "প্রেরকের নাম কী?",
  "কোন ঠিকানায় পাঠানো হয়েছে?",
  "এটি কোন বিষয়ে?",
  "শেষ তারিখ কবে?",
];

export default function TryPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Reset previous answers
      setTranscription("");
      setAnswer("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setTranscription("");
    setAnswer("");
  };

  // Start/Stop Recording
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          processQuestion();
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Microphone access denied:", error);
        alert("মাইক্রোফোন অ্যাক্সেস অনুমতি দিন!");
      }
    }
  };

  // Process question (mock)
  const processQuestion = async () => {
    setIsProcessing(true);
    
    // Simulate ASR transcription
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockTranscription = "এই ডকুমেন্টে মোট টাকা কত আছে?";
    setTranscription(mockTranscription);
    
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockAnswer =
      "এই ডকুমেন্ট অনুযায়ী, মোট টাকার পরিমাণ হলো ৫০,০০০ (পঞ্চাশ হাজার) টাকা। এটি একটি বিক্রয় চুক্তির নথি এবং এখানে ক্রেতার নাম ও তারিখও উল্লেখ আছে।";
    setAnswer(mockAnswer);
    
    setIsProcessing(false);
    
    // Celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#ec4899", "#06b6d4", "#f97316"],
    });
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setTranscription(question);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const mockAnswer =
        "এই ডকুমেন্ট বিশ্লেষণ করে উত্তর দিচ্ছি। আপনার প্রশ্ন ছিল: \"" +
        question +
        "\"\n\nএই নথি অনুযায়ী, আপনার জিজ্ঞাসিত তথ্য এখানে পাওয়া যাচ্ছে। বিস্তারিত জানতে সম্পূর্ণ ডকুমেন্ট পড়ুন।";
      setAnswer(mockAnswer);
      setIsProcessing(false);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#a855f7", "#ec4899", "#06b6d4"],
      });
    }, 2500);
  };

  // Speak answer (TTS mock)
  const speakAnswer = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.lang = "bn-BD";
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Copy answer
  const copyAnswer = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share answer
  const shareAnswer = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Bangla Bole উত্তর",
        text: answer,
      });
    } else {
      copyAnswer();
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen py-8 md:py-12">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-bangla-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-bangla-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bangla-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4 bangla-text">
            <Sparkles className="w-4 h-4" />
            এখনই চেষ্টা করুন
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bangla-text">
            <span className="gradient-text">ডকুমেন্ট থেকে প্রশ্ন করুন</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 bangla-text">
            ডকুমেন্ট আপলোড করুন এবং বাংলায় প্রশ্ন করুন
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column - Upload Zone (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 h-full">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 bangla-text">
                <FileImage className="w-5 h-5 text-bangla-purple-500" />
                ডকুমেন্ট আপলোড
              </h2>

              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={cn(
                    "upload-zone p-8 cursor-pointer min-h-[300px] flex flex-col items-center justify-center",
                    isDragActive && "border-bangla-pink-500 bg-bangla-pink-50/50 dark:bg-bangla-pink-900/30"
                  )}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={{ y: isDragActive ? -10 : 0 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium mb-2 bangla-text">
                      {isDragActive
                        ? "এখানে ছেড়ে দিন!"
                        : "ফাইল টেনে আনুন বা ক্লিক করুন"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      PNG, JPG, PDF (Max 10MB)
                    </p>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                >
                  {/* Preview */}
                  {uploadedFile.type.startsWith("image/") && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Uploaded document"
                      className="w-full h-auto max-h-[400px] object-contain"
                    />
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center">
                      <FileText className="w-16 h-16 text-bangla-purple-500 mb-4" />
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeFile}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Success Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span className="bangla-text">আপলোড সম্পন্ন</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Voice Input & Answer (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 bangla-text">
                <Mic className="w-5 h-5 text-bangla-pink-500" />
                বাংলায় প্রশ্ন করুন
              </h2>

              {/* Microphone Button */}
              <div className="flex flex-col items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  disabled={!uploadedFile || isProcessing}
                  className={cn(
                    "relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    isRecording
                      ? "bg-red-500"
                      : "bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500"
                  )}
                >
                  {isRecording ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                  
                  {/* Pulse Animation when recording */}
                  {isRecording && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-red-500/50 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 bangla-text">
                  {!uploadedFile
                    ? "প্রথমে ডকুমেন্ট আপলোড করুন"
                    : isRecording
                    ? "বলুন... ক্লিক করে থামান"
                    : "মাইকে ক্লিক করে প্রশ্ন করুন"}
                </p>
              </div>

              {/* Transcription */}
              <AnimatePresence>
                {transcription && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/30 dark:to-bangla-pink-900/30"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 bangla-text">
                      আপনার প্রশ্ন:
                    </p>
                    <p className="text-slate-900 dark:text-white font-medium bangla-text">
                      &ldquo;{transcription}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Processing Loader */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="relative">
                      <Loader2 className="w-12 h-12 text-bangla-purple-500 animate-spin" />
                      <div className="absolute inset-0 rounded-full bg-bangla-purple-500/20 blur-xl animate-pulse" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-4 bangla-text">
                      বিশ্লেষণ করছি...
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-2 h-2 rounded-full bg-bangla-pink-500"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Answer */}
              <AnimatePresence>
                {answer && !isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                  >
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-bangla-purple-50 via-bangla-pink-50 to-bangla-cyan-50 dark:from-bangla-purple-900/20 dark:via-bangla-pink-900/20 dark:to-bangla-cyan-900/20 border border-bangla-purple-200/50 dark:border-bangla-purple-700/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-bangla-purple-500" />
                        <span className="text-sm font-medium text-bangla-purple-600 dark:text-bangla-purple-400 bangla-text">
                          উত্তর
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white bangla-text text-lg leading-relaxed whitespace-pre-line">
                        {answer}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-bangla-purple-200/50 dark:border-bangla-purple-700/30">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={speakAnswer}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors",
                            isSpeaking
                              ? "bg-bangla-pink-500 text-white"
                              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-bangla-pink-50 dark:hover:bg-bangla-pink-900/30"
                          )}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                          <span className="text-sm bangla-text">
                            {isSpeaking ? "থামান" : "শুনুন"}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyAnswer}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="text-sm bangla-text">
                            {copied ? "কপি হয়েছে!" : "কপি"}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareAnswer}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm bangla-text">শেয়ার</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggested Questions */}
              {uploadedFile && !answer && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 bangla-text">
                    অথবা এই প্রশ্নগুলো ক্লিক করুন:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="pill-button bangla-text"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

