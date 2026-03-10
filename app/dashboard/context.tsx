"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Density = "comfortable" | "compact";

interface DashboardContextType {
  density: Density;
  setDensity: (d: Density) => void;
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (o: boolean) => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (o: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState<Density>("comfortable");
  const [isCommandMenuOpen, setCommandMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMenuOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ 
        density, 
        setDensity, 
        isCommandMenuOpen, 
        setCommandMenuOpen,
        isMobileSidebarOpen,
        setMobileSidebarOpen
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
