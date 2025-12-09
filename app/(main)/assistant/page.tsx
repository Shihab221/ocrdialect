"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  CheckCircle,
  Loader2,
  MessageSquare,
  Lightbulb,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { env } from "@/lib/environment";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "AIzaSyCTGkAkIpIp6gXeQHsdK3W1FezTacMpN-0");

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const translations = {
  bn: {
    title: "AI সহকারী",
    subtitle: "আপনার বাংলা AI চ্যাটবট",
    placeholder: "আপনার প্রশ্ন লিখুন...",
    send: "পাঠান",
    clearChat: "চ্যাট মুছুন",
    copy: "কপি",
    copied: "কপি হয়েছে!",
    thinking: "চিন্তা করছি...",
    welcome: "আসসালামু আলাইকুম! 👋 আমি আপনার AI সহকারী। আমাকে যেকোনো প্রশ্ন করতে পারেন - বাংলা বা ইংরেজিতে।",
    suggestions: [
      "বাংলাদেশের ইতিহাস বলুন",
      "একটি কবিতা লিখুন",
      "প্রোগ্রামিং শিখতে চাই",
      "রান্নার রেসিপি দিন",
    ],
    suggestionsTitle: "💡 এই প্রশ্নগুলো চেষ্টা করুন:",
    errorMessage: "দুঃখিত, কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    listen: "শুনুন",
    stop: "থামান",
  },
  en: {
    title: "AI Assistant",
    subtitle: "Your Bangla AI Chatbot",
    placeholder: "Type your question...",
    send: "Send",
    clearChat: "Clear Chat",
    copy: "Copy",
    copied: "Copied!",
    thinking: "Thinking...",
    welcome: "Hello! 👋 I'm your AI assistant. Feel free to ask me anything - in Bengali or English.",
    suggestions: [
      "Tell me about Bangladesh",
      "Write a poem",
      "Help me learn programming",
      "Give me a recipe",
    ],
    suggestionsTitle: "💡 Try these questions:",
    errorMessage: "Sorry, something went wrong. Please try again.",
    listen: "Listen",
    stop: "Stop",
  },
};

export default function AssistantPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);


  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to Gemini API
  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setHasStarted(true);

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: `You are a helpful AI assistant that can communicate in both Bengali and English. The user's current interface language is ${lang === "bn" ? "Bengali" : "English"}. Please respond in the same language the user uses in their message. Be friendly, helpful, and provide detailed answers. If the user writes in Bengali, respond in Bengali. If they write in English, respond in English.`,
      });

      const chatHistory = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
      });

      // Add placeholder assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      const result = await chat.sendMessageStream(text);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content += chunkText;
          }
          return updated;
        });
      }
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t.errorMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (lastMessage.role === "assistant" && lastMessage.content === "") {
          lastMessage.content = t.errorMessage;
        } else {
          updated.push(errorMessage);
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Copy message
  const copyMessage = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Speak message
  const speakMessage = (id: string, content: string) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = lang === "bn" ? "bn-BD" : "en-US";
      utterance.rate = 0.9;
      utterance.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingId(id);
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: t.welcome,
        timestamp: new Date(),
      },
    ]);
  };

  // Handle suggestion click
  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-bangla-purple-100/30 via-white to-bangla-pink-100/30 dark:from-bangla-purple-900/20 dark:via-slate-900 dark:to-bangla-pink-900/20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-bangla-purple-200/30 to-transparent rounded-full dark:from-bangla-purple-800/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-bangla-pink-200/30 to-transparent rounded-full dark:from-bangla-pink-800/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-bangla-purple-100 to-bangla-pink-100 dark:from-bangla-purple-900/50 dark:to-bangla-pink-900/50 text-bangla-purple-700 dark:text-bangla-purple-300 text-sm font-medium mb-4",
              lang === "bn" && "bangla-text"
            )}
          >
            <Bot className="w-4 h-4" />
            Powered by Gemini AI
          </span>
          {/* <h1
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold mb-2",
              lang === "bn" && "bangla-text"
            )}
          >
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p
            className={cn(
              "text-slate-600 dark:text-slate-400",
              lang === "bn" && "bangla-text"
            )}
          >
            {t.subtitle}
          </p> */}
        </motion.div>

        {/* Main Chat Container - 2/3 width on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-2/3 mx-auto"
        >
          <div className="glass-card overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-bangla-purple-50 to-bangla-pink-50 dark:from-bangla-purple-900/30 dark:to-bangla-pink-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2
                    className={cn(
                      "font-semibold text-slate-900 dark:text-white",
                      lang === "bn" && "bangla-text"
                    )}
                  >
                    {t.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gemini 2.0 Flash
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearChat}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-sm",
                  lang === "bn" && "bangla-text"
                )}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.clearChat}</span>
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {/* Welcome Message - only show when chat hasn't started */}
                {!hasStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500">
                      <Bot className="w-4 h-4 text-white" />
                    </div>

                    {/* Message Bubble */}
                    <div className="max-w-[80%] group">
                      <div className="px-4 py-3 rounded-2xl inline-block text-left bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md">
                        <p className="bangla-text whitespace-pre-wrap leading-relaxed">
                          {t.welcome}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        message.role === "user"
                          ? "bg-gradient-to-br from-bangla-pink-500 to-bangla-orange-500"
                          : "bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={cn(
                        "max-w-[80%] group",
                        message.role === "user" ? "text-right" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl inline-block text-left",
                          message.role === "user"
                            ? "bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 text-white rounded-br-md"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
                        )}
                      >
                        <p className="bangla-text whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>

                      {/* Message Actions */}
                      {message.role === "assistant" && message.id !== "welcome" && (
                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyMessage(message.id, message.content)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-bangla-purple-500 transition-colors"
                            title={t.copy}
                          >
                            {copiedId === message.id ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => speakMessage(message.id, message.content)}
                            className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              speakingId === message.id
                                ? "bg-bangla-pink-500 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-bangla-pink-500"
                            )}
                            title={speakingId === message.id ? t.stop : t.listen}
                          >
                            {speakingId === message.id ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-slate-100 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-bangla-purple-500 animate-spin" />
                      <span
                        className={cn(
                          "text-slate-500 dark:text-slate-400 text-sm",
                          lang === "bn" && "bangla-text"
                        )}
                      >
                        {t.thinking}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestions - only show when chat hasn't started */}
              {!hasStarted && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4"
                >
                  <p
                    className={cn(
                      "text-sm text-slate-500 dark:text-slate-400 mb-3",
                      lang === "bn" && "bangla-text"
                    )}
                  >
                    {t.suggestionsTitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSuggestion(suggestion)}
                        className={cn(
                          "px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:border-bangla-purple-300 hover:bg-bangla-purple-50 dark:hover:bg-bangla-purple-900/30 transition-colors",
                          lang === "bn" && "bangla-text"
                        )}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 md:px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={t.placeholder}
                    rows={1}
                    className={cn(
                      "w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-bangla-purple-500 dark:focus:border-bangla-purple-500 focus:ring-2 focus:ring-bangla-purple-500/20 outline-none transition-all resize-none text-slate-900 dark:text-white placeholder-slate-500",
                      lang === "bn" && "bangla-text"
                    )}
                    style={{
                      minHeight: "48px",
                      maxHeight: "120px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = Math.min(target.scrollHeight, 120) + "px";
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    input.trim()
                      ? "bg-gradient-to-br from-bangla-purple-500 to-bangla-pink-500 text-white shadow-lg"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                  )}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

