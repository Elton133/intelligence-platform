"use client";

import { useState } from "react";
import { useDashboard } from "../context";
import { FilterIcon, ArrowDown01Icon } from "hugeicons-react";

const allProjects = [
  { id: '1', name: 'Mombasa-Nairobi Expressway', country: 'Kenya', sector: 'Transport', stage: 'Construction', value: '$3.0B', status: 'Active' },
  { id: '2', name: 'Grand Inga Hydroelectric', country: 'DRC', sector: 'Energy', stage: 'Feasibility', value: '$14.0B', status: 'Delayed' },
  { id: '3', name: 'Lekki Deep Sea Port Ph 2', country: 'Nigeria', sector: 'Transport', stage: 'Financing', value: '$1.5B', status: 'Active' },
  { id: '4', name: 'Kigali Innovation City', country: 'Rwanda', sector: 'Digital', stage: 'Tender', value: '$300M', status: 'Active' },
  { id: '5', name: 'Noor Ouarzazate Solar', country: 'Morocco', sector: 'Energy', stage: 'Operational', value: '$2.5B', status: 'Completed' },
  { id: '6', name: 'Djibouti Bugesera Railway', country: 'Rwanda', sector: 'Transport', stage: 'Concept', value: '$1.2B', status: 'Active' },
  { id: '7', name: 'Lagos-Kano Standard Gauge', country: 'Nigeria', sector: 'Transport', stage: 'Construction', value: '$8.3B', status: 'Delayed' },
  { id: '8', name: 'Konza Technopolis', country: 'Kenya', sector: 'Digital', stage: 'Construction', value: '$14.5B', status: 'Active' },
];

export default function ProjectsPage() {
  const { density } = useDashboard();
  const isCompact = density === 'compact';
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? allProjects : allProjects.filter(p => p.sector === filter);

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1">
            Projects Database
          </h1>
          <p className="text-sm text-white/50 font-light">
            Browse and filter the complete infrastructure pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-panel border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
            <FilterIcon size={16} className="text-white/50" />
            <select 
              className="bg-transparent text-sm text-white/90 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All" className="bg-[#0a0a0f]">All Sectors</option>
              <option value="Transport" className="bg-[#0a0a0f]">Transport</option>
              <option value="Energy" className="bg-[#0a0a0f]">Energy</option>
              <option value="Digital" className="bg-[#0a0a0f]">Digital</option>
            </select>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0f] px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase flex items-center gap-1 cursor-pointer hover:text-white/70">
                  Project Name <ArrowDown01Icon size={12} />
                </th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Country</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Sector</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Stage</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Value</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light">
              {filtered.map((project) => (
                <tr key={project.id} className="hover:bg-white/2 transition-colors group cursor-pointer">
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} text-white/90 font-medium group-hover:text-cyan-400 transition-colors`}>{project.name}</td>
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} text-white/60`}>{project.country}</td>
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} text-white/60`}>{project.sector}</td>
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} text-white/60`}>{project.stage}</td>
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} text-white/60`}>{project.value}</td>
                  <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'}`}>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase ${
                      project.status === 'Active' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      project.status === 'Delayed' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
