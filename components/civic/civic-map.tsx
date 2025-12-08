"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Types
interface GpsCoordinates {
  lat: number;
  lng: number;
}

interface DetectedIssue {
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

interface CivicMapProps {
  center: GpsCoordinates;
  issues: DetectedIssue[];
  showHeatmap: boolean;
  showClusters: boolean;
  onIssueSelect: (issue: DetectedIssue | null) => void;
  lang: "bn" | "en";
  issueTypes: Record<string, string>;
}

// Custom marker icons based on issue type and severity
const createCustomIcon = (type: string, severity: number) => {
  const colorMap: Record<string, string> = {
    pothole: "#f97316", // orange
    waterlogging: "#3b82f6", // blue
    garbage: "#84cc16", // lime
    illegalConstruction: "#8b5cf6", // violet
    brokenStreetlight: "#eab308", // yellow
    openManhole: "#ef4444", // red
    trafficJam: "#f59e0b", // amber
    airPollution: "#6b7280", // gray
    flooding: "#0ea5e9", // sky
    roadDamage: "#dc2626", // red
  };

  const color = colorMap[type] || "#ec4899";
  const size = severity >= 7 ? 36 : severity >= 4 ? 30 : 24;
  
  // Create SVG icon
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
      ${severity >= 7 ? '<circle cx="12" cy="9" r="2" fill="#ef4444"/>' : ''}
    </svg>
  `;

  return L.divIcon({
    className: "custom-marker",
    html: svgIcon,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

// Get severity color
const getSeverityColor = (severity: number): string => {
  if (severity >= 8) return "#ef4444"; // red
  if (severity >= 6) return "#f97316"; // orange
  if (severity >= 4) return "#eab308"; // yellow
  return "#22c55e"; // green
};

// Get heatmap color
const getHeatColor = (severity: number): string => {
  if (severity >= 8) return "rgba(239, 68, 68, 0.4)";
  if (severity >= 6) return "rgba(249, 115, 22, 0.35)";
  if (severity >= 4) return "rgba(234, 179, 8, 0.3)";
  return "rgba(34, 197, 94, 0.25)";
};

// Map center updater component
function MapCenterUpdater({ center }: { center: GpsCoordinates }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);
  
  return null;
}

// Heatmap circles component
function HeatmapOverlay({ issues }: { issues: DetectedIssue[] }) {
  return (
    <>
      {issues.map((issue) => (
        <Circle
          key={`heat-${issue.id}`}
          center={[issue.coordinates.lat, issue.coordinates.lng]}
          radius={issue.severity * 100}
          pathOptions={{
            color: getSeverityColor(issue.severity),
            fillColor: getHeatColor(issue.severity),
            fillOpacity: 0.6,
            weight: 2,
          }}
        />
      ))}
    </>
  );
}

export default function CivicMap({
  center,
  issues,
  showHeatmap,
  showClusters,
  onIssueSelect,
  lang,
  issueTypes,
}: CivicMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return issues.map((issue) => ({
      ...issue,
      icon: createCustomIcon(issue.type, issue.severity),
    }));
  }, [issues]);

  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.round((now.getTime() - date.getTime()) / 60000);
    
    if (diff < 60) {
      return lang === "bn" ? `${diff} মিনিট আগে` : `${diff}m ago`;
    }
    if (diff < 1440) {
      return lang === "bn" ? `${Math.round(diff / 60)} ঘণ্টা আগে` : `${Math.round(diff / 60)}h ago`;
    }
    return lang === "bn" ? `${Math.round(diff / 1440)} দিন আগে` : `${Math.round(diff / 1440)}d ago`;
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
      ref={mapRef}
    >
      {/* OpenStreetMap Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Update center when it changes */}
      <MapCenterUpdater center={center} />

      {/* Heatmap overlay */}
      {showHeatmap && <HeatmapOverlay issues={issues} />}

      {/* Issue markers */}
      {markers.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.coordinates.lat, issue.coordinates.lng]}
          icon={issue.icon}
          eventHandlers={{
            click: () => onIssueSelect(issue),
          }}
        >
          <Popup>
            <div className="min-w-[200px] max-w-[280px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold text-sm ${lang === "bn" ? "bangla-text" : ""}`}>
                  {issueTypes[issue.type] || issue.type}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: getSeverityColor(issue.severity) }}
                >
                  {issue.severity}/10
                </span>
              </div>

              {/* Image thumbnail */}
              {issue.imageUrl && (
                <img
                  src={issue.imageUrl}
                  alt="Issue"
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
              )}

              {/* Description */}
              <p className={`text-xs text-gray-600 mb-2 ${lang === "bn" ? "bangla-text" : ""}`}>
                {issue.description}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {issue.coordinates.lat.toFixed(4)}, {issue.coordinates.lng.toFixed(4)}
                </span>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-1 text-[10px] text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{formatTime(issue.timestamp)}</span>
              </div>

              {/* Recommendations preview */}
              {issue.recommendations.authorities.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className={`text-[10px] font-semibold text-purple-600 ${lang === "bn" ? "bangla-text" : ""}`}>
                    {lang === "bn" ? "সুপারিশ:" : "Recommendations:"}
                  </p>
                  <p className={`text-[10px] text-gray-600 ${lang === "bn" ? "bangla-text" : ""}`}>
                    • {issue.recommendations.authorities[0]}
                  </p>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Current location marker */}
      <Marker
        position={[center.lat, center.lng]}
        icon={L.divIcon({
          className: "current-location-marker",
          html: `
            <div style="
              width: 20px;
              height: 20px;
              background: linear-gradient(135deg, #a855f7, #ec4899);
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">
              <div style="
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "></div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        })}
      >
        <Popup>
          <div className={`text-sm font-medium ${lang === "bn" ? "bangla-text" : ""}`}>
            {lang === "bn" ? "আপনার অবস্থান" : "Your Location"}
          </div>
          <div className="text-xs text-gray-500">
            {center.lat.toFixed(6)}, {center.lng.toFixed(6)}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

