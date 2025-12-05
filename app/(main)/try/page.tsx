"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import confetti from "canvas-confetti";
import Tesseract from "tesseract.js";
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
  Eye,
  EyeOff,
  Languages,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

// Language translations
const translations = {
  bn: {
    tryNow: "এখনই চেষ্টা করুন",
    askFromDocument: "ডকুমেন্ট থেকে প্রশ্ন করুন",
    uploadAndAsk: "ডকুমেন্ট আপলোড করুন এবং বাংলায় প্রশ্ন করুন",
    uploadDocument: "ডকুমেন্ট আপলোড",
    dragOrClick: "ফাইল টেনে আনুন বা ক্লিক করুন",
    dropHere: "এখানে ছেড়ে দিন!",
    uploadComplete: "আপলোড সম্পন্ন",
    ocrText: "OCR টেক্সট",
    refined: "পরিমার্জিত",
    copy: "কপি",
    copied: "কপি হয়েছে!",
    detecting: "টেক্সট সনাক্ত করা হচ্ছে...",
    successfullyDetected: "সফলভাবে সনাক্ত ও পরিমার্জিত",
    linesDetected: "লাইন",
    charsDetected: "অক্ষর সনাক্ত হয়েছে",
    askInBangla: "বাংলায় প্রশ্ন করুন",
    uploadFirst: "প্রথমে ডকুমেন্ট আপলোড করুন",
    ocrProcessing: "OCR প্রক্রিয়াকরণ চলছে...",
    waitForOcr: "OCR সম্পন্ন হওয়ার জন্য অপেক্ষা করুন",
    speakNow: "🎤 বলুন... ক্লিক করে থামান ও জমা দিন",
    clickToAsk: "🎙️ মাইকে ক্লিক করে প্রশ্ন করুন",
    recording: "রেকর্ডিং চলছে...",
    yourQuestion: "আপনার প্রশ্ন:",
    searchingOcr: "🔍 OCR টেক্সট থেকে খুঁজছি...",
    answer: "উত্তর",
    listen: "শুনুন",
    stop: "থামান",
    share: "শেয়ার",
    suggestedQuestions: "💡 এই প্রশ্নগুলো ক্লিক করে জিজ্ঞাসা করুন:",
    noTextFound: "কোনো টেক্সট পাওয়া যায়নি। অনুগ্রহ করে পরিষ্কার ছবি আপলোড করুন।",
    ocrError: "OCR প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    speechNotSupported: "আপনার ব্রাউজার স্পিচ রিকগনিশন সাপোর্ট করে না। Chrome বা Edge ব্যবহার করুন।",
    speechError: "স্পিচ রিকগনিশন শুরু করতে সমস্যা হয়েছে। অনুগ্রহ করে ব্রাউজার রিফ্রেশ করুন।",
    questions: [
      "এই চিঠিতে তারিখ কী?",
      "মোট টাকা কত?",
      "প্রেরকের নাম কী?",
      "কোন ঠিকানায় পাঠানো হয়েছে?",
      "এটি কোন বিষয়ে?",
      "এখানে কী লেখা আছে?",
    ],
  },
  en: {
    tryNow: "Try Now",
    askFromDocument: "Ask from Document",
    uploadAndAsk: "Upload document and ask questions",
    uploadDocument: "Upload Document",
    dragOrClick: "Drag file here or click to upload",
    dropHere: "Drop here!",
    uploadComplete: "Upload Complete",
    ocrText: "OCR Text",
    refined: "Refined",
    copy: "Copy",
    copied: "Copied!",
    detecting: "Detecting text...",
    successfullyDetected: "Successfully detected & refined",
    linesDetected: "lines",
    charsDetected: "characters detected",
    askInBangla: "Ask Your Question",
    uploadFirst: "Please upload a document first",
    ocrProcessing: "OCR processing...",
    waitForOcr: "Waiting for OCR to complete",
    speakNow: "🎤 Speak... click to stop & submit",
    clickToAsk: "🎙️ Click mic to ask question",
    recording: "Recording...",
    yourQuestion: "Your Question:",
    searchingOcr: "🔍 Searching in OCR text...",
    answer: "Answer",
    listen: "Listen",
    stop: "Stop",
    share: "Share",
    suggestedQuestions: "💡 Click these questions to ask:",
    noTextFound: "No text found. Please upload a clearer image.",
    ocrError: "OCR processing error. Please try again.",
    speechNotSupported: "Your browser doesn't support speech recognition. Please use Chrome or Edge.",
    speechError: "Error starting speech recognition. Please refresh the browser.",
    questions: [
      "What is the date in this letter?",
      "What is the total amount?",
      "What is the sender's name?",
      "What is the address?",
      "What is this about?",
      "What is written here?",
    ],
  },
};

// Refine OCR text - clean up and format
function refineOcrText(rawText: string): string {
  if (!rawText) return "";
  
  let refined = rawText
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+([।,;:!?])/g, "$1")
    .replace(/([।,;:!?])([^\s\n])/g, "$1 $2")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join("\n")
    .trim();
  
  return refined;
}

// Search and answer from OCR text
function searchAndAnswer(question: string, ocrText: string, lang: "bn" | "en"): string {
  if (!ocrText || !question) {
    return lang === "bn" 
      ? "টেক্সট সনাক্ত করা যায়নি। অনুগ্রহ করে পরিষ্কার ছবি আপলোড করুন।"
      : "No text detected. Please upload a clearer image.";
  }

  const lowerQuestion = question.toLowerCase();
  const lines = ocrText.split("\n").filter(line => line.trim().length > 0);
  
  // Date patterns
  if (lowerQuestion.includes("তারিখ") || lowerQuestion.includes("date") || lowerQuestion.includes("কবে") || lowerQuestion.includes("when")) {
    const datePatterns = [
      /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/g,
      /\d{1,2}\s*(?:জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)\s*,?\s*\d{4}/gi,
      /(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s*\d{4}/gi,
      /\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4}/gi,
    ];
    
    const foundDates: string[] = [];
    for (const pattern of datePatterns) {
      const matches = ocrText.match(pattern);
      if (matches) foundDates.push(...matches);
    }
    
    if (foundDates.length > 0) {
      return lang === "bn"
        ? `📅 এই ডকুমেন্টে নিম্নলিখিত তারিখ পাওয়া গেছে:\n\n${foundDates.map(d => `• ${d}`).join("\n")}`
        : `📅 The following dates were found in this document:\n\n${foundDates.map(d => `• ${d}`).join("\n")}`;
    }
    return lang === "bn" 
      ? "❌ ডকুমেন্টে সুনির্দিষ্ট তারিখ খুঁজে পাওয়া যায়নি।"
      : "❌ No specific date found in the document.";
  }
  
  // Amount/Money patterns
  if (lowerQuestion.includes("টাকা") || lowerQuestion.includes("amount") || lowerQuestion.includes("মোট") || lowerQuestion.includes("total") || lowerQuestion.includes("money") || lowerQuestion.includes("taka") || lowerQuestion.includes("tk")) {
    const amountPatterns = [
      /৳\s*[\d,]+(?:\.\d{2})?/g,
      /[\d,]+(?:\.\d{2})?\s*(?:টাকা|taka|tk|BDT)/gi,
      /(?:Rs\.?|INR|\$|USD|EUR|€)\s*[\d,]+(?:\.\d{2})?/gi,
      /[\d,]+(?:\.\d{2})?\s*(?:rupees?|Rs\.?|dollars?)/gi,
    ];
    
    const foundAmounts: string[] = [];
    for (const pattern of amountPatterns) {
      const matches = ocrText.match(pattern);
      if (matches) foundAmounts.push(...matches);
    }
    
    if (foundAmounts.length > 0) {
      return lang === "bn"
        ? `💰 এই ডকুমেন্টে নিম্নলিখিত টাকার পরিমাণ পাওয়া গেছে:\n\n${foundAmounts.map(a => `• ${a}`).join("\n")}`
        : `💰 The following amounts were found in this document:\n\n${foundAmounts.map(a => `• ${a}`).join("\n")}`;
    }
    return lang === "bn"
      ? "❌ ডকুমেন্টে সুনির্দিষ্ট টাকার পরিমাণ খুঁজে পাওয়া যায়নি।"
      : "❌ No specific amount found in the document.";
  }
  
  // Name patterns
  if (lowerQuestion.includes("নাম") || lowerQuestion.includes("name") || lowerQuestion.includes("প্রেরক") || lowerQuestion.includes("sender") || lowerQuestion.includes("প্রাপক") || lowerQuestion.includes("recipient")) {
    const nameIndicators = ["নাম:", "name:", "প্রেরক:", "প্রাপক:", "থেকে:", "to:", "from:", "জনাব", "মি.", "mr.", "mrs.", "ms.", "শ্রী", "শ্রীমতি", "dear", "signed", "signature"];
    const foundNames: string[] = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      for (const indicator of nameIndicators) {
        if (lowerLine.includes(indicator.toLowerCase())) {
          foundNames.push(line.trim());
          break;
        }
      }
    }
    
    if (foundNames.length > 0) {
      return lang === "bn"
        ? `👤 সম্ভাব্য নাম/পরিচয় সংক্রান্ত তথ্য:\n\n${foundNames.map(n => `• ${n}`).join("\n")}`
        : `👤 Possible name/identity information:\n\n${foundNames.map(n => `• ${n}`).join("\n")}`;
    }
    return lang === "bn"
      ? "❌ ডকুমেন্টে সুনির্দিষ্ট নাম খুঁজে পাওয়া যায়নি।"
      : "❌ No specific name found in the document.";
  }
  
  // Address patterns
  if (lowerQuestion.includes("ঠিকানা") || lowerQuestion.includes("address") || lowerQuestion.includes("কোথায়") || lowerQuestion.includes("where") || lowerQuestion.includes("location")) {
    const addressIndicators = ["ঠিকানা:", "address:", "বাসা:", "রোড:", "সড়ক:", "গ্রাম:", "থানা:", "জেলা:", "পোস্ট:", "post:", "road:", "street:", "house:", "city:", "district:", "zip:", "pin:"];
    const foundAddresses: string[] = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      for (const indicator of addressIndicators) {
        if (lowerLine.includes(indicator.toLowerCase())) {
          foundAddresses.push(line.trim());
          break;
        }
      }
    }
    
    if (foundAddresses.length > 0) {
      return lang === "bn"
        ? `📍 সম্ভাব্য ঠিকানা সংক্রান্ত তথ্য:\n\n${foundAddresses.map(a => `• ${a}`).join("\n")}`
        : `📍 Possible address information:\n\n${foundAddresses.map(a => `• ${a}`).join("\n")}`;
    }
    return lang === "bn"
      ? "❌ ডকুমেন্টে সুনির্দিষ্ট ঠিকানা খুঁজে পাওয়া যায়নি।"
      : "❌ No specific address found in the document.";
  }
  
  // Subject/Topic
  if (lowerQuestion.includes("বিষয়") || lowerQuestion.includes("subject") || lowerQuestion.includes("সম্পর্কে") || lowerQuestion.includes("about") || lowerQuestion.includes("topic")) {
    const subjectIndicators = ["বিষয়:", "subject:", "re:", "regarding:", "সম্পর্কে:", "topic:", "title:"];
    const foundSubjects: string[] = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      for (const indicator of subjectIndicators) {
        if (lowerLine.includes(indicator.toLowerCase())) {
          foundSubjects.push(line.trim());
          break;
        }
      }
    }
    
    if (foundSubjects.length > 0) {
      return lang === "bn"
        ? `📋 বিষয় সংক্রান্ত তথ্য:\n\n${foundSubjects.map(s => `• ${s}`).join("\n")}`
        : `📋 Subject information:\n\n${foundSubjects.map(s => `• ${s}`).join("\n")}`;
    }
    
    const summary = lines.slice(0, 3).join("\n");
    return lang === "bn"
      ? `📋 ডকুমেন্টের সারাংশ:\n\n${summary}${lines.length > 3 ? "\n\n..." : ""}`
      : `📋 Document summary:\n\n${summary}${lines.length > 3 ? "\n\n..." : ""}`;
  }
  
  // General "what is written" question
  if (lowerQuestion.includes("লেখা") || lowerQuestion.includes("written") || lowerQuestion.includes("কী আছে") || lowerQuestion.includes("what") || lowerQuestion.includes("content")) {
    const preview = lines.slice(0, 5).join("\n");
    const totalLines = lines.length;
    const totalChars = ocrText.length;
    
    return lang === "bn"
      ? `📄 এই ডকুমেন্টে নিম্নলিখিত টেক্সট পাওয়া গেছে:\n\n"${preview}${totalLines > 5 ? '\n...' : ''}"\n\n📊 মোট ${totalLines} লাইন এবং ${totalChars} অক্ষর সনাক্ত হয়েছে।\n\n💡 বিস্তারিত দেখতে বাম পাশে "OCR টেক্সট" সেকশন দেখুন।`
      : `📄 The following text was found in this document:\n\n"${preview}${totalLines > 5 ? '\n...' : ''}"\n\n📊 Total ${totalLines} lines and ${totalChars} characters detected.\n\n💡 See the "OCR Text" section on the left for details.`;
  }
  
  // Keyword search
  const keywords = question
    .replace(/[।?!,]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  const matchingLines: string[] = [];
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    for (const keyword of keywords) {
      if (lowerLine.includes(keyword.toLowerCase())) {
        matchingLines.push(line);
        break;
      }
    }
  }
  
  if (matchingLines.length > 0) {
    return lang === "bn"
      ? `🔍 আপনার প্রশ্ন সম্পর্কিত তথ্য পাওয়া গেছে:\n\n${matchingLines.slice(0, 5).map(l => `• ${l}`).join("\n")}${matchingLines.length > 5 ? `\n\n...এবং আরো ${matchingLines.length - 5}টি সম্পর্কিত লাইন` : ""}`
      : `🔍 Information related to your question was found:\n\n${matchingLines.slice(0, 5).map(l => `• ${l}`).join("\n")}${matchingLines.length > 5 ? `\n\n...and ${matchingLines.length - 5} more related lines` : ""}`;
  }
  
  // Default response
  const preview = lines.slice(0, 3).join("\n");
  return lang === "bn"
    ? `🤔 আপনার প্রশ্নের সরাসরি উত্তর খুঁজে পাওয়া যায়নি।\n\nতবে ডকুমেন্টে নিম্নলিখিত তথ্য পাওয়া গেছে:\n\n"${preview}${lines.length > 3 ? '\n...' : ''}"\n\n💡 অনুগ্রহ করে আরো নির্দিষ্ট প্রশ্ন করুন অথবা "OCR টেক্সট" সেকশন দেখুন।`
    : `🤔 Could not find a direct answer to your question.\n\nHowever, the following information was found in the document:\n\n"${preview}${lines.length > 3 ? '\n...' : ''}"\n\n💡 Please ask a more specific question or check the "OCR Text" section.`;
}

export default function TryPage() {
  // Language from global context
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // OCR States
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrError, setOcrError] = useState("");
  const [showOcrText, setShowOcrText] = useState(true);
  const [ocrCopied, setOcrCopied] = useState(false);
  
  // Speech Recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  // Initialize Speech Recognition
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
            setTranscription(prev => prev + final);
            setInterimTranscript("");
          } else {
            setInterimTranscript(interim);
          }
        };
        
        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
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

  // Update speech recognition language when lang changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang === "bn" ? "bn-BD" : "en-US";
    }
  }, [lang]);

  // OCR Processing Function
  const processOcr = async (file: File) => {
    setIsOcrProcessing(true);
    setOcrProgress(0);
    setOcrError("");
    setOcrText("");

    try {
      const result = await Tesseract.recognize(
        file,
        "ben+eng",
        {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setOcrProgress(Math.round(m.progress * 100));
            }
          },
        }
      );

      const rawText = result.data.text.trim();
      
      if (rawText) {
        const refinedText = refineOcrText(rawText);
        setOcrText(refinedText);
      } else {
        setOcrError(t.noTextFound);
      }
    } catch (error) {
      console.error("OCR Error:", error);
      setOcrError(t.ocrError);
    } finally {
      setIsOcrProcessing(false);
    }
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setTranscription("");
      setAnswer("");
      setOcrText("");
      setOcrError("");
      setInterimTranscript("");
      
      if (file.type.startsWith("image/")) {
        processOcr(file);
      }
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
    setOcrText("");
    setOcrError("");
    setOcrProgress(0);
    setInterimTranscript("");
  };

  // Start/Stop Recording
  const toggleRecording = async () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setIsListening(false);
      
      const finalTranscript = transcription.trim();
      if (finalTranscript && ocrText) {
        processQuestion(finalTranscript);
      }
    } else {
      setTranscription("");
      setInterimTranscript("");
      setAnswer("");
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
          setIsListening(true);
        } catch (error) {
          console.error("Speech recognition start error:", error);
          alert(t.speechError);
        }
      } else {
        alert(t.speechNotSupported);
      }
    }
  };

  // Process question
  const processQuestion = async (question: string) => {
    if (!question.trim()) return;
    
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const generatedAnswer = searchAndAnswer(question, ocrText, lang);
    setAnswer(generatedAnswer);
    
    setIsProcessing(false);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#ec4899", "#f97316"],
    });
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setTranscription(question);
    processQuestion(question);
  };

  // Speak answer (TTS)
  const speakAnswer = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const cleanAnswer = answer.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").replace(/[📅💰👤📍📋📄📊💡🔍🤔❌•]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanAnswer);
      utterance.lang = lang === "bn" ? "bn-BD" : "en-US";
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

  // Copy OCR text
  const copyOcrText = async () => {
    await navigator.clipboard.writeText(ocrText);
    setOcrCopied(true);
    setTimeout(() => setOcrCopied(false), 2000);
  };

  // Share answer
  const shareAnswer = async () => {
    if (navigator.share) {
      await navigator.share({
        title: lang === "bn" ? "Bangla Bole উত্তর" : "Bangla Bole Answer",
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
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-bangla-purple-100/30 via-white to-bangla-pink-100/30 dark:from-bangla-purple-900/20 dark:via-slate-900 dark:to-bangla-pink-900/20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-bangla-purple-200/30 to-transparent rounded-full dark:from-bangla-purple-800/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-bangla-pink-200/30 to-transparent rounded-full dark:from-bangla-pink-800/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >

          <span className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4",
            lang === "bn" && "bangla-text"
          )}>
            <Sparkles className="w-4 h-4" />
            {t.tryNow}
          </span>
          <h1 className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-bold mb-2",
            lang === "bn" && "bangla-text"
          )}>
            <span className="gradient-text">{t.askFromDocument}</span>
          </h1>
          <p className={cn(
            "text-slate-600 dark:text-slate-400",
            lang === "bn" && "bangla-text"
          )}>
            {t.uploadAndAsk}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Upload Section */}
            <div className="glass-card p-6">
              <h2 className={cn(
                "text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2",
                lang === "bn" && "bangla-text"
              )}>
                <FileImage className="w-5 h-5 text-bangla-purple-500" />
                {t.uploadDocument}
              </h2>

              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={cn(
                    "upload-zone p-8 cursor-pointer min-h-[250px] flex flex-col items-center justify-center",
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
                    <p className={cn(
                      "text-slate-900 dark:text-white font-medium mb-2",
                      lang === "bn" && "bangla-text"
                    )}>
                      {isDragActive ? t.dropHere : t.dragOrClick}
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
                  {uploadedFile.type.startsWith("image/") && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Uploaded document"
                      className="w-full h-auto max-h-[300px] object-contain"
                    />
                  ) : (
                    <div className="h-[200px] flex flex-col items-center justify-center">
                      <FileText className="w-16 h-16 text-bangla-purple-500 mb-4" />
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeFile}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm",
                      lang === "bn" && "bangla-text"
                    )}>
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.uploadComplete}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* OCR Text Section */}
            <AnimatePresence>
              {(isOcrProcessing || ocrText || ocrError) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={cn(
                      "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
                      lang === "bn" && "bangla-text"
                    )}>
                      <Languages className="w-5 h-5 text-bangla-pink-500" />
                      {t.ocrText}
                      {ocrText && (
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                          ({t.refined})
                        </span>
                      )}
                    </h2>
                    {ocrText && (
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyOcrText}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors",
                            lang === "bn" && "bangla-text"
                          )}
                        >
                          {ocrCopied ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="hidden sm:inline">{ocrCopied ? t.copied : t.copy}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowOcrText(!showOcrText)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          {showOcrText ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {isOcrProcessing && (
                    <div className="py-8">
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-bangla-purple-500 animate-spin mb-4" />
                        <p className={cn(
                          "text-slate-600 dark:text-slate-400 mb-3",
                          lang === "bn" && "bangla-text"
                        )}>
                          {t.detecting}
                        </p>
                        <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ocrProgress}%` }}
                            className="bg-gradient-to-r from-bangla-purple-500 to-bangla-pink-500 h-full rounded-full"
                          />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          {ocrProgress}%
                        </p>
                      </div>
                    </div>
                  )}

                  {ocrError && !isOcrProcessing && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className={cn(
                        "text-red-600 dark:text-red-400 text-sm",
                        lang === "bn" && "bangla-text"
                      )}>
                        ⚠️ {ocrError}
                      </p>
                    </div>
                  )}

                  {ocrText && !isOcrProcessing && (
                    <AnimatePresence>
                      {showOcrText && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 rounded-xl bg-gradient-to-br from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/20 dark:to-bangla-pink-900/20 border border-bangla-purple-200/50 dark:border-bangla-purple-700/30 max-h-[300px] overflow-y-auto custom-scrollbar">
                            <p className="text-slate-800 dark:text-slate-200 bangla-text text-sm leading-relaxed whitespace-pre-wrap">
                              {ocrText}
                            </p>
                          </div>
                          <div className={cn(
                            "flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400",
                            lang === "bn" && "bangla-text"
                          )}>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                              <span>{t.successfullyDetected}</span>
                            </span>
                            <span>{ocrText.split("\n").filter(l => l.trim()).length} {t.linesDetected} • {ocrText.length} {lang === "bn" ? "অক্ষর" : "chars"}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {ocrText && !showOcrText && !isOcrProcessing && (
                    <p className={cn(
                      "text-sm text-slate-500 dark:text-slate-400",
                      lang === "bn" && "bangla-text"
                    )}>
                      {ocrText.split("\n").filter(l => l.trim()).length} {t.linesDetected} • {ocrText.length} {t.charsDetected}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 h-full flex flex-col">
              <h2 className={cn(
                "text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2",
                lang === "bn" && "bangla-text"
              )}>
                <Mic className="w-5 h-5 text-bangla-pink-500" />
                {t.askInBangla}
              </h2>

              {/* Microphone Button */}
              <div className="flex flex-col items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  disabled={!uploadedFile || isProcessing || isOcrProcessing || !ocrText}
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
                  
                  {isRecording && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-red-500/50 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
                    </>
                  )}
                </motion.button>
                <p className={cn(
                  "text-sm text-slate-500 dark:text-slate-400 mt-3 text-center",
                  lang === "bn" && "bangla-text"
                )}>
                  {!uploadedFile
                    ? t.uploadFirst
                    : isOcrProcessing
                    ? t.ocrProcessing
                    : !ocrText
                    ? t.waitForOcr
                    : isRecording
                    ? t.speakNow
                    : t.clickToAsk}
                </p>
              </div>

              {/* Live Transcription */}
              <AnimatePresence>
                {(isRecording || interimTranscript) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-300 dark:border-red-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <p className={cn(
                        "text-sm text-red-600 dark:text-red-400 font-medium",
                        lang === "bn" && "bangla-text"
                      )}>
                        {t.recording}
                      </p>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium bangla-text">
                      {transcription}
                      <span className="text-slate-400 dark:text-slate-500">{interimTranscript}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Transcription */}
              <AnimatePresence>
                {transcription && !isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/30 dark:to-bangla-pink-900/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Search className="w-4 h-4 text-bangla-purple-500" />
                      <p className={cn(
                        "text-sm text-slate-500 dark:text-slate-400",
                        lang === "bn" && "bangla-text"
                      )}>
                        {t.yourQuestion}
                      </p>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium bangla-text text-lg">
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
                    </div>
                    <p className={cn(
                      "text-slate-600 dark:text-slate-400 mt-4",
                      lang === "bn" && "bangla-text"
                    )}>
                      {t.searchingOcr}
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
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/20 dark:to-bangla-pink-900/20 border border-bangla-purple-200/50 dark:border-bangla-purple-700/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-bangla-purple-500" />
                        <span className={cn(
                          "text-sm font-medium text-bangla-purple-600 dark:text-bangla-purple-400",
                          lang === "bn" && "bangla-text"
                        )}>
                          {t.answer}
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white bangla-text text-lg leading-relaxed whitespace-pre-line">
                        {answer}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-bangla-purple-200/50 dark:border-bangla-purple-700/30">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={speakAnswer}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors",
                            isSpeaking
                              ? "bg-bangla-pink-500 text-white"
                              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-bangla-pink-50 dark:hover:bg-bangla-pink-900/30",
                            lang === "bn" && "bangla-text"
                          )}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                          <span className="text-sm">
                            {isSpeaking ? t.stop : t.listen}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyAnswer}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
                            lang === "bn" && "bangla-text"
                          )}
                        >
                          {copied ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="text-sm">
                            {copied ? t.copied : t.copy}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareAnswer}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
                            lang === "bn" && "bangla-text"
                          )}
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">{t.share}</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggested Questions */}
              {uploadedFile && ocrText && !answer && !isProcessing && !isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700"
                >
                  <p className={cn(
                    "text-sm text-slate-500 dark:text-slate-400 mb-3",
                    lang === "bn" && "bangla-text"
                  )}>
                    {t.suggestedQuestions}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.questions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSuggestedQuestion(question)}
                        className={cn(
                          "pill-button",
                          lang === "bn" && "bangla-text"
                        )}
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
