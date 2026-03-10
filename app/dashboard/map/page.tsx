"use client";

import InteractiveMap from "@/app/components/shared/InteractiveMap";

export default function MapPage() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1">
          Geographic Distribution
        </h1>
        <p className="text-sm text-white/50 font-light">
          Interactive map view of active and planned infrastructure developments.
        </p>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-white/5 relative overflow-hidden flex flex-col">
        <InteractiveMap />
      </div>
    </div>
  );
}
