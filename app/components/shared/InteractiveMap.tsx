"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const markers = [
  { name: "Mombasa-Nairobi Expressway", coordinates: [39.6682, -4.0435], status: "active" }, // Kenya
  { name: "Grand Inga Hydroelectric", coordinates: [13.5653, -5.5186], status: "delayed" }, // DRC
  { name: "Lekki Deep Sea Port", coordinates: [3.987, 6.432], status: "active" }, // Nigeria
  { name: "Kigali Innovation City", coordinates: [30.0619, -1.9441], status: "active" }, // Rwanda
  { name: "Noor Ouarzazate Solar", coordinates: [-6.866, 31.046], status: "completed" }, // Morocco
  { name: "Djibouti Bugesera Railway", coordinates: [42.5903, 11.5721], status: "active" }, // Djibouti
  { name: "Lagos-Kano Standard Gauge", coordinates: [8.516, 12.002], status: "delayed" }, // Nigeria
  { name: "Konza Technopolis", coordinates: [37.23, -1.68], status: "active" }, // Kenya
];

export default function InteractiveMap() {
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full relative">
      {mounted && (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 350,
            center: [20, 0] // Center on Africa
          }}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={8}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "rgba(34,211,238,0.1)", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, status }) => {
              const isDelayed = status === "delayed";
              const isCompleted = status === "completed";
              const color = isDelayed ? "#fb923c" : isCompleted ? "#34d399" : "#22d3ee";
              
              return (
                <Marker key={name} coordinates={coordinates as [number, number]}>
                  <circle 
                    r={4} 
                    fill={color} 
                    className="cursor-pointer transition-all duration-300 hover:r-6"
                    onMouseEnter={() => setTooltip(name)}
                    onMouseLeave={() => setTooltip("")}
                  />
                  <circle 
                    r={12} 
                    fill={color} 
                    opacity={0.2} 
                    className="animate-pulse pointer-events-none"
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      )}
      
      {/* Map Legend & Tooltip Overlay */}
      <div className="absolute bottom-6 left-6 glass-panel border border-white/10 rounded-xl p-4 flex flex-col gap-3 backdrop-blur-md bg-black/40">
        <div className="text-xs font-medium text-white/70 uppercase tracking-widest mb-1">Legend</div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> Active / Pipeline
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" /> Delayed / Stalled
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Completed
        </div>
      </div>

      {tooltip && (
        <div className="absolute top-6 right-6 glass-panel border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-xl animate-fade-in-up backdrop-blur-md bg-black/60" style={{ animationDuration: '0.2s' }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}
