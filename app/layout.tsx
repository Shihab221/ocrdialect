import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Bangla Bole | বাংলা বলে - Voice & Image Document Q&A",
  description:
    "Ask questions about any document in Bangla voice & get answers in natural Bangla dialect. AI-powered OCR and voice recognition for Bengali speakers.",
  keywords: [
    "Bangla",
    "Bengali",
    "OCR",
    "Voice",
    "AI",
    "Document",
    "Q&A",
    "ASR",
    "TTS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-noise custom-scrollbar">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

