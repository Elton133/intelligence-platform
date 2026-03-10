"use client";

import { useDashboard } from "../context";

export default function SettingsPage() {
  const { density, setDensity } = useDashboard();

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1">
          Settings
        </h1>
        <p className="text-sm text-white/50 font-light">
          Manage your account preferences and interface settings.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-medium text-white/90">Interface Preferences</h3>
          <p className="text-sm text-white/50 font-light mt-1">Customize how data is displayed across the platform.</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Density Toggle */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">Data Density</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setDensity('comfortable')}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  density === 'comfortable' 
                    ? 'border-cyan-500/50 bg-cyan-500/10' 
                    : 'border-white/10 bg-white/2 hover:bg-white/4'
                }`}
              >
                <div className="font-medium text-white/90 mb-1">Comfortable</div>
                <div className="text-xs text-white/50 font-light">More breathing room, larger text. Best for general browsing.</div>
              </button>
              
              <button 
                onClick={() => setDensity('compact')}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  density === 'compact' 
                    ? 'border-cyan-500/50 bg-cyan-500/10' 
                    : 'border-white/10 bg-white/2 hover:bg-white/4'
                }`}
              >
                <div className="font-medium text-white/90 mb-1">Compact</div>
                <div className="text-xs text-white/50 font-light">High density data view. Best for power users and analysts.</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-medium text-white/90">Account Information</h3>
          <p className="text-sm text-white/50 font-light mt-1">Update your personal details.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 tracking-wide uppercase">First Name</label>
              <input type="text" defaultValue="Jane" className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 tracking-wide uppercase">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 tracking-wide uppercase">Email Address</label>
            <input type="email" defaultValue="jane.doe@institution.org" className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
          </div>
          <button className="mt-4 bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
}
