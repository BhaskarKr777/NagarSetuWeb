import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Star, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { issues, stats } = useApp();

  // Average Resolution Hours by Category
  const resolutionTimeData = [
    { category: 'Garbage', hours: 14, benchmark: 24 },
    { category: 'Water Supply', hours: 18, benchmark: 24 },
    { category: 'Streetlights', hours: 22, benchmark: 48 },
    { category: 'Drainage', hours: 28, benchmark: 48 },
    { category: 'Roads/Potholes', hours: 36, benchmark: 48 },
    { category: 'Infrastructure', hours: 44, benchmark: 72 },
  ];

  // Ward Complaint Distribution
  const wardLeaderboard = [
    { ward: 'Ward 14 (Indiranagar)', count: 42, resolved: 36, satisfaction: 4.8 },
    { ward: 'Ward 08 (Koramangala)', count: 38, resolved: 31, satisfaction: 4.6 },
    { ward: 'Ward 05 (Shivaji Nagar)', count: 34, resolved: 27, satisfaction: 4.3 },
    { ward: 'Ward 03 (Malleshwaram)', count: 29, resolved: 26, satisfaction: 4.9 },
    { ward: 'Ward 12 (HSR Layout)', count: 26, resolved: 22, satisfaction: 4.5 },
    { ward: 'Ward 22 (Whitefield)', count: 24, resolved: 18, satisfaction: 4.2 },
  ];

  // Monthly SLA Compliance Trend
  const slaTrendData = [
    { month: 'Apr', compliance: 68 },
    { month: 'May', compliance: 72 },
    { month: 'Jun', compliance: 75 },
    { month: 'Jul', compliance: 81 },
    { month: 'Aug', compliance: 88 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Civic Intelligence & KPI Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Municipal Performance & SLA Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive turnaround analytics, department efficiency rankings, and citizen satisfaction scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl shadow-2xs">
            ⭐ 4.6 / 5.0 Overall City Satisfaction Score
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Turnaround Time</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">26.4 hrs</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">↓ 18% faster than benchmark</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SLA Adherence Rate</span>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">88.4%</p>
          <p className="text-[11px] text-slate-500 mt-1">Target: &gt; 85% on-time resolution</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resolved Grievances</span>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2">{stats.resolved}</p>
          <p className="text-[11px] text-slate-500 mt-1">With photo proof verified</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Citizen Approval</span>
          <p className="text-3xl font-extrabold text-amber-700 mt-2">92.1%</p>
          <p className="text-[11px] text-slate-500 mt-1">Positive ratings (4+ stars)</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Turnaround Time vs Benchmark */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Average Resolution Time (Hours)</h3>
              <p className="text-[11px] text-slate-500">Actual turnaround time vs Municipal SLA benchmark</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="hours" name="Actual Hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="benchmark" name="SLA Cap" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: SLA Adherence Growth Trend */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">SLA Compliance Rate Trend (%)</h3>
              <p className="text-[11px] text-slate-500">Month-over-month on-time ticket resolution efficiency</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              +20% Increase
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={slaTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="compliance" name="Compliance %" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Ward Leaderboard Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">Ward Grievance & Satisfaction Leaderboard</h3>
          <span className="text-xs text-slate-500">Updated today</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Ward Name</th>
                <th className="pb-3">Total Reported</th>
                <th className="pb-3">Resolved Works</th>
                <th className="pb-3">Resolution %</th>
                <th className="pb-3 text-right pr-2">Citizen Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {wardLeaderboard.map((item) => {
                const rate = Math.round((item.resolved / item.count) * 100);
                return (
                  <tr key={item.ward} className="hover:bg-slate-50 transition">
                    <td className="py-3 pl-2 font-bold text-slate-900">{item.ward}</td>
                    <td className="py-3 text-slate-700">{item.count} tickets</td>
                    <td className="py-3 text-emerald-700 font-bold">{item.resolved} resolved</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${rate}%` }} />
                        </div>
                        <span className="font-bold text-slate-800">{rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right pr-2 font-bold text-amber-600">
                      ⭐ {item.satisfaction} / 5.0
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
