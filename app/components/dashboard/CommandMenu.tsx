"use client";

import { useEffect, useRef } from "react";
import { useDashboard } from "../../dashboard/context";
import { Search01Icon, Folder01Icon, MapsIcon, ChartHistogramIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";

export default function CommandMenu() {
  const { isCommandMenuOpen, setCommandMenuOpen } = useDashboard();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isCommandMenuOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandMenuOpen]);

  if (!isCommandMenuOpen) return null;

  const navigateTo = (path: string) => {
    router.push(path);
    setCommandMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCommandMenuOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
        <div className="flex items-center px-4 py-4 border-b border-white/5">
          <Search01Icon size={20} className="text-cyan-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 font-light text-lg"
            placeholder="Search projects, countries, or type a command..."
          />
          <button 
            onClick={() => setCommandMenuOpen(false)}
            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white/80 px-2 py-1 bg-white/5 rounded"
          >
            ESC
          </button>
        </div>
        
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-medium tracking-widest text-white/30 uppercase">
            Quick Links
          </div>
          
          <button 
            onClick={() => navigateTo('/dashboard/projects')}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <Folder01Icon size={16} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-white/90 font-medium">All Projects</div>
              <div className="text-xs text-white/40 font-light">Browse the complete infrastructure pipeline</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('/dashboard/map')}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-colors">
              <MapsIcon size={16} className="text-fuchsia-400" />
            </div>
            <div>
              <div className="text-sm text-white/90 font-medium">Interactive Map</div>
              <div className="text-xs text-white/40 font-light">Geographic view of active developments</div>
            </div>
          </button>

          <button 
            onClick={() => navigateTo('/dashboard/analytics')}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <ChartHistogramIcon size={16} className="text-orange-400" />
            </div>
            <div>
              <div className="text-sm text-white/90 font-medium">Market Analytics</div>
              <div className="text-xs text-white/40 font-light">Deep dive into sector trends and capital flow</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
