"use client";

import { Search01Icon, Notification01Icon, UserCircleIcon, Layout01Icon } from "hugeicons-react";
import { useDashboard } from "../../dashboard/context";

export default function Header() {
  const { setCommandMenuOpen, density, setDensity } = useDashboard();

  return (
    <header className="h-16 border-b border-white/5 bg-white/1 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative group cursor-text" onClick={() => setCommandMenuOpen(true)}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search01Icon size={18} className="text-white/30 group-hover:text-cyan-400 transition-colors" />
        </div>
        <div className="w-full bg-white/2 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm font-light text-white/50 group-hover:border-white/20 group-hover:bg-white/4 transition-all flex items-center justify-between">
          <span>Search projects, sectors, or countries...</span>
          <span className="text-[10px] font-mono text-white/20 px-1.5 py-0.5 rounded border border-white/10 bg-white/5">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4 ml-4">
        <button 
          onClick={() => setDensity(density === 'comfortable' ? 'compact' : 'comfortable')}
          className="relative p-2 text-white/50 hover:text-cyan-400 transition-colors rounded-full hover:bg-white/5"
          title={`Toggle density (current: ${density})`}
        >
          <Layout01Icon size={20} />
        </button>

        <button className="relative p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Notification01Icon size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-fuchsia-500 border border-background"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-900 to-blue-900 flex items-center justify-center border border-white/10">
            <UserCircleIcon size={20} className="text-cyan-100"  />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-xs font-medium text-white/90">Jane Doe</span>
            <span className="text-[10px] text-white/40">Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
}
