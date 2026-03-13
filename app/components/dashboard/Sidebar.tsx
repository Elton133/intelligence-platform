"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/app/dashboard/context";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  ChartHistogramIcon,
  MapsIcon,
  Settings01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  Logout01Icon,
} from "hugeicons-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useDashboard();
  const { logout } = useAuth();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: DashboardSquare01Icon },
    { name: "Projects", href: "/dashboard/projects", icon: Folder01Icon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartHistogramIcon },
    { name: "Map View", href: "/dashboard/map", icon: MapsIcon },
  ];

  const bottomItems = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings01Icon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 flex flex-col border-r border-white/5 bg-[#0a0a0f]/95 md:bg-white/1 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-50 ${
          isExpanded ? "w-64" : "w-20"
        } ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0 overflow-hidden">
        <Link href="/" className="flex items-center gap-3 group min-w-max">
          <div className="w-6 h-6 rounded-full bg-linear-to-tr from-cyan-400 to-fuchsia-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-shadow duration-500 shrink-0" />
          <span
            className={`font-medium tracking-widest text-[10px] uppercase text-white/90 transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Infra Intel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "text-white bg-white/5"
                  : "text-white/50 hover:text-white/90 hover:bg-white/2"
              }`}
              title={!isExpanded ? item.name : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              )}
              <Icon
                size={20}
                className={`shrink-0 transition-colors duration-300 ${
                  isActive ? "text-cyan-400" : "group-hover:text-white/70"
                }`}
                // variant={isActive ? "solid" : "stroke"}
              />
              <span
                className={`text-sm font-light whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute left-12"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "text-white bg-white/5"
                  : "text-white/50 hover:text-white/90 hover:bg-white/2"
              }`}
              title={!isExpanded ? item.name : undefined}
            >
              <Icon size={20} className="shrink-0 group-hover:text-white/70" />
              <span
                className={`text-sm font-light whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute left-12"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
          title={!isExpanded ? "Log out" : undefined}
        >
          <Logout01Icon size={20} className="shrink-0" />
          <span
            className={`text-sm font-light whitespace-nowrap transition-all duration-300 ${
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute left-12"
            }`}
          >
            Log out
          </span>
        </button>
      </div>

      {/* Toggle Button (Desktop Only) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0a0a0f] border border-white/10 items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:scale-110 transition-all shadow-lg z-30"
      >
        {isExpanded ? (
          <ArrowLeftDoubleIcon size={14} />
        ) : (
          <ArrowRightDoubleIcon size={14}  />
        )}
      </button>
    </aside>
    </>
  );
}
