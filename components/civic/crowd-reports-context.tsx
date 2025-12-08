"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CrowdReport, GpsCoordinates } from "./types";

interface CrowdReportsContextType {
  reports: CrowdReport[];
  addReport: (report: Omit<CrowdReport, "id" | "timestamp" | "verified">) => void;
  verifyReport: (id: string) => void;
  deleteReport: (id: string) => void;
  clearReports: () => void;
}

const CrowdReportsContext = createContext<CrowdReportsContextType | null>(null);

// Initial seed reports (will be replaced by user reports over time)
const seedReports: CrowdReport[] = [
  {
    id: "seed-1",
    type: "waterlogging",
    description: "মিরপুর ১০ নম্বরে গভীর জলাবদ্ধতা",
    severity: 8,
    coordinates: { lat: 23.8069, lng: 90.3687 },
    timestamp: new Date(Date.now() - 30 * 60000),
    reporter: "সিস্টেম",
    verified: true,
  },
  {
    id: "seed-2",
    type: "pothole",
    description: "গুলশান ২ এ বড় গর্ত",
    severity: 7,
    coordinates: { lat: 23.7934, lng: 90.4142 },
    timestamp: new Date(Date.now() - 45 * 60000),
    reporter: "সিস্টেম",
    verified: true,
  },
];

export function CrowdReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<CrowdReport[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load reports from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("civicCrowdReports");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          const reportsWithDates = parsed.map((r: any) => ({
            ...r,
            timestamp: new Date(r.timestamp),
          }));
          setReports(reportsWithDates);
        } catch {
          setReports(seedReports);
        }
      } else {
        setReports(seedReports);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("civicCrowdReports", JSON.stringify(reports));
    }
  }, [reports, isLoaded]);

  const addReport = (report: Omit<CrowdReport, "id" | "timestamp" | "verified">) => {
    const newReport: CrowdReport = {
      ...report,
      id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      verified: false,
    };
    setReports(prev => [newReport, ...prev]);
  };

  const verifyReport = (id: string) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, verified: true } : r))
    );
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const clearReports = () => {
    setReports(seedReports);
  };

  return (
    <CrowdReportsContext.Provider
      value={{ reports, addReport, verifyReport, deleteReport, clearReports }}
    >
      {children}
    </CrowdReportsContext.Provider>
  );
}

export function useCrowdReports() {
  const context = useContext(CrowdReportsContext);
  if (!context) {
    throw new Error("useCrowdReports must be used within CrowdReportsProvider");
  }
  return context;
}

