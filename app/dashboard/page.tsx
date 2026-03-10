"use client";

import { 
  Briefcase01Icon, 
  Activity01Icon, 
  Alert01Icon, 
  ArrowUpRight01Icon,
  ArrowDownRight01Icon
} from "hugeicons-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

import { useDashboard } from "./context";

// Dummy Data
const pipelineData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 550 },
  { month: 'Mar', value: 480 },
  { month: 'Apr', value: 720 },
  { month: 'May', value: 850 },
  { month: 'Jun', value: 1100 },
  { month: 'Jul', value: 1350 },
];

const sectorData = [
  { name: 'Energy', value: 85 },
  { name: 'Transport', value: 65 },
  { name: 'Water', value: 45 },
  { name: 'Digital', value: 30 },
  { name: 'Social', value: 20 },
];

const recentProjects = [
  { id: '1', name: 'Mombasa-Nairobi Expressway', country: 'Kenya', sector: 'Transport', stage: 'Construction', value: '$3.0B', status: 'Active' },
  { id: '2', name: 'Grand Inga Hydroelectric', country: 'DRC', sector: 'Energy', stage: 'Feasibility', value: '$14.0B', status: 'Delayed' },
  { id: '3', name: 'Lekki Deep Sea Port Ph 2', country: 'Nigeria', sector: 'Transport', stage: 'Financing', value: '$1.5B', status: 'Active' },
  { id: '4', name: 'Kigali Innovation City', country: 'Rwanda', sector: 'Digital', stage: 'Tender', value: '$300M', status: 'Active' },
  { id: '5', name: 'Noor Ouarzazate Solar', country: 'Morocco', sector: 'Energy', stage: 'Operational', value: '$2.5B', status: 'Completed' },
];

export default function DashboardPage() {
  const { density } = useDashboard();
  const isCompact = density === 'compact';

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1">
          Platform Overview
        </h1>
        <p className="text-sm text-white/50 font-light">
          Real-time intelligence on African infrastructure markets.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Stat Card 1 */}
        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-cyan-500/20" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Briefcase01Icon size={20} className="text-cyan-400"  />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              <ArrowUpRight01Icon size={12} /> 12.5%
            </span>
          </div>
          <h3 className="text-white/50 text-xs font-medium tracking-widest uppercase mb-1">Total Pipeline</h3>
          <p className="text-3xl font-light text-white tracking-tight">$142.8B</p>
        </div>

        {/* Stat Card 2 */}
        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-fuchsia-500/20" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
              <Activity01Icon size={20} className="text-fuchsia-400" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              <ArrowUpRight01Icon size={12} /> 4.2%
            </span>
          </div>
          <h3 className="text-white/50 text-xs font-medium tracking-widest uppercase mb-1">Active Projects</h3>
          <p className="text-3xl font-light text-white tracking-tight">1,204</p>
        </div>

        {/* Stat Card 3 */}
        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-orange-500/20" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Alert01Icon size={20} className="text-orange-400" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded-md">
              <ArrowDownRight01Icon size={12} /> 2.1%
            </span>
          </div>
          <h3 className="text-white/50 text-xs font-medium tracking-widest uppercase mb-1">Delayed / Stalled</h3>
          <p className="text-3xl font-light text-white tracking-tight">86</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 md:p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-white/90">Pipeline Growth (YTD)</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 px-2 py-1 outline-none focus:border-cyan-400/50">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5">
          <h3 className="text-sm font-medium text-white/90 mb-6">Projects by Sector</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={11} tickLine={false} axisLine={false} width={70} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#e879f9" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-5 md:p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/90">Recently Updated Projects</h3>
          <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Project Name</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Country</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Sector</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Stage</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Value</th>
                <th className="px-6 py-4 text-[10px] font-medium tracking-widest text-white/40 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light">
              {recentProjects.map((project) => (
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
