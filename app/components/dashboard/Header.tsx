"use client";

import { Search01Icon, Notification01Icon, UserCircleIcon } from "hugeicons-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-white/5 bg-white/1 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search01Icon size={18} className="text-white/30 group-focus-within:text-cyan-400 transition-colors" variant="stroke" />
        </div>
        <input
          type="text"
          className="w-full bg-white/2 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm font-light text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/4 transition-all"
          placeholder="Search projects, sectors, or countries... (Cmd+K)"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-[10px] font-mono text-white/20 px-1.5 py-0.5 rounded border border-white/10 bg-white/5">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4 ml-4">
        <button className="relative p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Notification01Icon size={20} variant="stroke" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-fuchsia-500 border border-background"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-900 to-blue-900 flex items-center justify-center border border-white/10">
            <UserCircleIcon size={20} className="text-cyan-100" variant="stroke" />
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
