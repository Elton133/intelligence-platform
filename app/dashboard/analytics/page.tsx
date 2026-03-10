"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const countryData = [
  { name: 'Nigeria', value: 45.2 },
  { name: 'South Africa', value: 32.1 },
  { name: 'Kenya', value: 28.5 },
  { name: 'Egypt', value: 25.0 },
  { name: 'Morocco', value: 22.4 },
];

const stageData = [
  { name: 'Concept', value: 400 },
  { name: 'Feasibility', value: 300 },
  { name: 'Tender', value: 300 },
  { name: 'Financing', value: 200 },
  { name: 'Construction', value: 278 },
  { name: 'Operational', value: 189 },
];
const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#e879f9', '#f472b6', '#fb7185'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-1">
          Market Analytics
        </h1>
        <p className="text-sm text-white/50 font-light">
          Deep dive into sector trends, capital flow, and regional distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5">
          <h3 className="text-sm font-medium text-white/90 mb-6">Top Markets by Pipeline Value ($B)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/5">
          <h3 className="text-sm font-medium text-white/90 mb-6">Projects by Lifecycle Stage</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
