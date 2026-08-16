import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Sparkles,
  Compass
} from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  'Roads': '#4A154B',
  'Garbage': '#007A5A',
  'Drainage': '#1264A3',
  'Water': '#36C5F0',
  'Streetlight': '#ECB22E',
  'Infrastructure': '#E01E5A',
  'Other': '#616061',
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { issues, stats, currentUser } = useApp();

  // Chart 1: Issues by Category
  const categoryCounts: Record<string, number> = {};
  issues.forEach((i) => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    value: categoryCounts[cat],
    color: CATEGORY_COLORS[cat] || '#007A5A'
  }));

  // Chart 2: Issues by Status
  const statusData = [
    { name: 'Reported', count: issues.filter((i) => i.status === 'Reported').length, fill: '#ECB22E' },
    { name: 'Under Review', count: issues.filter((i) => i.status === 'Under Review').length, fill: '#4A154B' },
    { name: 'Assigned', count: issues.filter((i) => i.status === 'Assigned').length, fill: '#1264A3' },
    { name: 'In Progress', count: issues.filter((i) => i.status === 'In Progress').length, fill: '#36C5F0' },
    { name: 'Resolved', count: issues.filter((i) => i.status === 'Resolved').length, fill: '#007A5A' },
  ];

  // Chart 3: Issues Over Time
  const timelineData = [
    { day: 'Mon', reported: 14, resolved: 11 },
    { day: 'Tue', reported: 22, resolved: 19 },
    { day: 'Wed', reported: 18, resolved: 16 },
    { day: 'Thu', reported: 28, resolved: 24 },
    { day: 'Fri', reported: 35, resolved: 31 },
    { day: 'Sat', reported: 19, resolved: 22 },
    { day: 'Sun', reported: 12, resolved: 15 },
  ];

  // Chart 4: Department Caseloads
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8F6F2]">
      
      {/* Top Header in Slack Aubergine Style */}
      <div className="bg-[#4A154B] text-white rounded-3xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold">
            <span className="text-[#2EB67D]">●</span>
            <span>Central Municipal Command Console • Live Triage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 font-normal">
            Logged in as <span className="font-bold text-white">{currentUser.name}</span> (ID: admin@nagarsetu.gov.in). Real-time civic grievance analytics and department dispatching.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/issues')}
            className="px-5 py-3 bg-[#007A5A] hover:bg-[#006046] text-white text-xs sm:text-sm font-black rounded-xl shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>All Issues Table ({issues.length})</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/map')}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black rounded-xl border border-white/25 transition flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#2EB67D]" />
            <span>GIS Map View</span>
          </button>
        </div>
      </div>

      {/* 6 Steady Solid KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#4A154B] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total</span>
            <div className="w-7 h-7 rounded-lg bg-[#4A154B]/10 text-[#4A154B] flex items-center justify-center font-bold">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1D1C1D]">{stats.total}</p>
          <span className="text-[10px] text-[#616061] font-semibold">All tickets</span>
        </div>

        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#ECB22E] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#9E6A00] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
            <div className="w-7 h-7 rounded-lg bg-[#ECB22E]/20 text-[#9E6A00] flex items-center justify-center font-bold">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#9E6A00]">{stats.pending}</p>
          <span className="text-[10px] text-[#616061] font-semibold">Unassigned</span>
        </div>

        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#1264A3] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#1264A3] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">In Progress</span>
            <div className="w-7 h-7 rounded-lg bg-[#1264A3]/10 text-[#1264A3] flex items-center justify-center font-bold">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1264A3]">{stats.inProgress}</p>
          <span className="text-[10px] text-[#616061] font-semibold">Active on site</span>
        </div>

        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#007A5A] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#007A5A] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
            <div className="w-7 h-7 rounded-lg bg-[#007A5A]/10 text-[#007A5A] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#007A5A]">{stats.resolved}</p>
          <span className="text-[10px] text-[#616061] font-semibold">{stats.resolutionRate}% Rate</span>
        </div>

        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#E01E5A] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#E01E5A] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">High Priority</span>
            <div className="w-7 h-7 rounded-lg bg-[#E01E5A]/10 text-[#E01E5A] flex items-center justify-center font-bold">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#E01E5A]">{stats.highPriority}</p>
          <span className="text-[10px] text-[#E01E5A] font-semibold">&lt; 24h SLA</span>
        </div>

        <div 
          onClick={() => navigate('/admin/issues')}
          className="bg-white p-5 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#ECB22E] transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-[#ECB22E] mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">SLA Breached</span>
            <div className="w-7 h-7 rounded-lg bg-[#ECB22E]/20 text-[#ECB22E] flex items-center justify-center font-bold">
              <AlertOctagon className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#9E6A00]">{stats.slaBreached}</p>
          <span className="text-[10px] text-[#616061] font-semibold">Escalated</span>
        </div>

      </div>

      {/* 4 Interactive Visual Charts in Slack Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Issues by Category */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#1D1C1D]">Issues by Category</h3>
              <p className="text-xs text-[#616061]">Distribution across municipal wings</p>
            </div>
            <span className="text-xs font-bold text-[#4A154B] bg-[#4A154B]/10 px-2.5 py-0.5 rounded-full">
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
                  outerRadius={85}
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
        <div className="bg-white p-6 rounded-3xl border border-[#EAE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#1D1C1D]">Status Pipeline</h3>
              <p className="text-xs text-[#616061]">Tickets count across resolution stages</p>
            </div>
            <span className="text-xs font-bold text-[#007A5A] bg-[#007A5A]/10 px-2.5 py-0.5 rounded-full">
              {stats.resolved} Resolved
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} />
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

        {/* Chart 3: Weekly Intake vs Resolution */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#1D1C1D]">Weekly Intake vs Resolution</h3>
              <p className="text-xs text-[#616061]">Volume of reported vs resolved works</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1 text-[#1264A3]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1264A3] inline-block" /> Reported
              </span>
              <span className="flex items-center gap-1 text-[#007A5A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#007A5A] inline-block" /> Resolved
              </span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="reported" stroke="#1264A3" strokeWidth={2.5} fill="#E8F5FA" />
                <Area type="monotone" dataKey="resolved" stroke="#007A5A" strokeWidth={2.5} fill="#E6F4EA" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Department Workloads */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE8E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#1D1C1D]">Department Workloads</h3>
              <p className="text-xs text-[#616061]">Active open tasks vs completed resolutions</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/departments')}
              className="text-xs font-bold text-[#007A5A] hover:underline"
            >
              View Roster →
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fontWeight: 700 }} width={95} />
                <Tooltip />
                <Bar dataKey="resolved" fill="#007A5A" name="Resolved" radius={[0, 4, 4, 0]} />
                <Bar dataKey="open" fill="#ECB22E" name="Open Tickets" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Urgent High-Priority Triage Queue */}
      <div className="bg-white rounded-3xl p-6 border border-[#EAE8E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E01E5A]/10 text-[#E01E5A] flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1D1C1D]">Urgent High-Priority Triage Queue</h3>
              <p className="text-xs text-[#616061]">Grievances requiring immediate department assignment</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/issues')}
            className="text-xs font-bold text-[#007A5A] hover:underline flex items-center gap-1"
          >
            <span>View All ({issues.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAE8E2] text-[#616061] font-bold uppercase tracking-wider bg-[#F8F6F2]">
                <th className="py-3.5 pl-3">ID</th>
                <th className="py-3.5">Issue Title</th>
                <th className="py-3.5">Category</th>
                <th className="py-3.5">Ward</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Department</th>
                <th className="py-3.5 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6] font-medium">
              {urgentIssues.map((issue) => (
                <tr 
                  key={issue.id} 
                  className="hover:bg-[#F8F6F2] transition cursor-pointer" 
                  onClick={() => navigate(`/admin/issues/${issue.id}`)}
                >
                  <td className="py-3.5 pl-3 font-mono font-bold text-[#4A154B]">{issue.id}</td>
                  <td className="py-3.5 max-w-xs">
                    <p className="font-bold text-[#1D1C1D] truncate">{issue.title}</p>
                    <p className="text-[11px] text-[#616061] truncate">{issue.location.address}</p>
                  </td>
                  <td className="py-3.5"><CategoryBadge category={issue.category} /></td>
                  <td className="py-3.5 text-[#1D1C1D] font-semibold">{issue.location.ward.split('-')[0]}</td>
                  <td className="py-3.5"><StatusBadge status={issue.status} size="sm" /></td>
                  <td className="py-3.5 text-[#1D1C1D]">{issue.department || <span className="text-[#E01E5A] font-bold">Unassigned</span>}</td>
                  <td className="py-3.5 text-right pr-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/issues/${issue.id}`);
                      }}
                      className="px-3.5 py-1.5 bg-[#007A5A] hover:bg-[#006046] text-white rounded-lg font-bold text-[11px] transition shadow-2xs cursor-pointer"
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
