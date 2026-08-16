import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Layers, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  Flame, 
  AlertOctagon, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  MapPin,
  Sparkles
} from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'Roads': '#f97316',
  'Garbage': '#84cc16',
  'Drainage': '#14b8a6',
  'Water': '#06b6d4',
  'Streetlight': '#eab308',
  'Infrastructure': '#8b5cf6',
  'Other': '#64748b',
};

export const AdminDashboard: React.FC = () => {
  const { issues, stats, navigateTo, currentUser } = useApp();

  // Chart 1: Issues by Category
  const categoryCounts: Record<string, number> = {};
  issues.forEach((i) => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    value: categoryCounts[cat],
    color: CATEGORY_COLORS[cat] || '#3b82f6'
  }));

  // Chart 2: Issues by Status
  const statusData = [
    { name: 'Reported', count: issues.filter((i) => i.status === 'Reported').length, fill: '#f59e0b' },
    { name: 'Under Review', count: issues.filter((i) => i.status === 'Under Review').length, fill: '#a855f7' },
    { name: 'Assigned', count: issues.filter((i) => i.status === 'Assigned').length, fill: '#3b82f6' },
    { name: 'In Progress', count: issues.filter((i) => i.status === 'In Progress').length, fill: '#6366f1' },
    { name: 'Resolved', count: issues.filter((i) => i.status === 'Resolved').length, fill: '#10b981' },
  ];

  // Chart 3: Issues Over Time (Weekly trend)
  const timelineData = [
    { day: 'Mon', reported: 14, resolved: 11 },
    { day: 'Tue', reported: 22, resolved: 19 },
    { day: 'Wed', reported: 18, resolved: 16 },
    { day: 'Thu', reported: 28, resolved: 24 },
    { day: 'Fri', reported: 35, resolved: 31 },
    { day: 'Sat', reported: 19, resolved: 22 },
    { day: 'Sun', reported: 12, resolved: 15 },
  ];

  // Chart 4: Department Performance (Resolution Rate %)
  const departmentData = [
    { dept: 'Roads & Infra', open: 6, resolved: 18 },
    { dept: 'Sanitation', open: 4, resolved: 22 },
    { dept: 'Water Supply', open: 5, resolved: 14 },
    { dept: 'Electrical', open: 2, resolved: 12 },
    { dept: 'Drainage', open: 7, resolved: 16 },
    { dept: 'Public Works', open: 3, resolved: 9 },
  ];

  const urgentIssues = issues
    .filter((i) => i.priority === 'High' && i.status !== 'Resolved')
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header with Municipal Seal */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900 text-blue-300 border border-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Central Municipal Command Control Room • Live Triage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Welcome, <span className="font-bold text-white">{currentUser.name}</span>. Real-time civic grievance analytics and departmental SLA monitor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => navigateTo('admin-issues')}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
          >
            <Layers className="w-4 h-4" />
            <span>Manage All Issues ({issues.length})</span>
          </button>

          <button
            onClick={() => navigateTo('admin-map')}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-2xl border border-slate-700 transition flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Live Spatial Map</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 -bottom-10 w-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 6 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Issues */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats.total}</p>
          <span className="text-[10px] text-slate-400 font-medium">All logged tickets</span>
        </div>

        {/* Pending */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700">{stats.pending}</p>
          <span className="text-[10px] text-slate-400 font-medium">Awaiting assignment</span>
        </div>

        {/* In Progress */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
            <Wrench className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-700">{stats.inProgress}</p>
          <span className="text-[10px] text-slate-400 font-medium">On-site resolution</span>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{stats.resolved}</p>
          <span className="text-[10px] text-slate-400 font-medium">{stats.resolutionRate}% Rate</span>
        </div>

        {/* High Priority */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-red-50/70 p-4 rounded-2xl border border-red-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-red-700 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">High Priority</span>
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold text-red-700">{stats.highPriority}</p>
          <span className="text-[10px] text-red-600 font-semibold">Immediate attention</span>
        </div>

        {/* SLA Breached */}
        <div 
          onClick={() => navigateTo('admin-issues')}
          className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">SLA Breached</span>
            <AlertOctagon className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-800">{stats.slaBreached}</p>
          <span className="text-[10px] text-amber-700 font-medium">Overdue &gt; 48 hrs</span>
        </div>

      </div>

      {/* 4 In-Depth Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Issues by Category */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Issues by Civic Category</h3>
              <p className="text-[11px] text-slate-500">Distribution across municipal service areas</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {categoryData.length} Categories
            </span>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Issues by Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Grievance Status Pipeline</h3>
              <p className="text-[11px] text-slate-500">Active tickets count across resolution lifecycle</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              {stats.resolved} Resolved
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`status-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Trend Over Time */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Weekly Intake vs Resolution</h3>
              <p className="text-[11px] text-slate-500">Volume of reported complaints vs resolved works</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Reported
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Resolved
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="reported" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReported)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Department Performance */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Department Workloads</h3>
              <p className="text-[11px] text-slate-500">Active open tasks vs completed resolutions</p>
            </div>
            <button
              onClick={() => navigateTo('admin-departments')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View Roster →
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[0, 4, 4, 0]} />
                <Bar dataKey="open" fill="#f59e0b" name="Open Tickets" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Urgent / High Priority Triage Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Urgent High-Priority Triage Queue</h3>
              <p className="text-xs text-slate-500">Grievances requiring immediate department assignment or escalation</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('admin-issues')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View Full Issues Table ({issues.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">ID</th>
                <th className="pb-3">Issue Title & Location</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Ward</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Department</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {urgentIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 pl-2 font-mono font-bold text-blue-700">{issue.id}</td>
                  <td className="py-3.5 max-w-xs">
                    <p className="font-bold text-slate-900 truncate">{issue.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{issue.location.address}</p>
                  </td>
                  <td className="py-3.5"><CategoryBadge category={issue.category} /></td>
                  <td className="py-3.5 text-slate-700 font-medium">{issue.location.ward.split('-')[0]}</td>
                  <td className="py-3.5"><StatusBadge status={issue.status} size="sm" /></td>
                  <td className="py-3.5 text-slate-700 font-medium">{issue.department || <span className="text-amber-600 font-bold">Unassigned</span>}</td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => navigateTo('admin-issue-details', issue.id)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] transition shadow-2xs"
                    >
                      Triage / Assign →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
