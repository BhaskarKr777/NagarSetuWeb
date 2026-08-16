import React from 'react';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/common/IssueCard';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { currentUser, issues, stats, navigateTo } = useApp();

  // Filter issues reported by current citizen (or default demo citizen)
  const citizenIssues = issues.filter(
    (i) => i.citizenId === currentUser.id || i.citizenEmail === currentUser.email || i.citizenName === 'Aarav Sharma'
  );

  const pendingCount = citizenIssues.filter((i) => i.status === 'Reported' || i.status === 'Under Review').length;
  const inProgressCount = citizenIssues.filter((i) => i.status === 'Assigned' || i.status === 'In Progress').length;
  const resolvedCount = citizenIssues.filter((i) => i.status === 'Resolved').length;

  const recentIssues = citizenIssues.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner with + Report Action */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/60 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Citizen Profile • {currentUser.ward}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {currentUser.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Track your submitted municipal grievances, report new neighborhood issues, and review verified ground resolutions.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigateTo('report-issue')}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Report an Issue</span>
          </button>

          <button
            onClick={() => navigateTo('my-reports')}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-2xl border border-white/20 backdrop-blur-xs transition flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-300" />
            <span>My Reports ({citizenIssues.length})</span>
          </button>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 -bottom-10 w-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Reports */}
        <div 
          onClick={() => navigateTo('my-reports')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{citizenIssues.length}</p>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span>In your ward & city</span>
          </p>
        </div>

        {/* Pending */}
        <div 
          onClick={() => navigateTo('my-reports')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Review</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">{pendingCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Awaiting department triage</p>
        </div>

        {/* In Progress */}
        <div 
          onClick={() => navigateTo('my-reports')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">In Progress</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700">{inProgressCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Ground field crew dispatched</p>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => navigateTo('my-reports')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resolved</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{resolvedCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Verified with photo proof</p>
        </div>

      </div>

      {/* Recent Citizen Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Your Recent Complaints</h2>
            <p className="text-xs text-slate-500">Live timeline & status updates for your submitted grievances</p>
          </div>
          <button
            onClick={() => navigateTo('my-reports')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All ({citizenIssues.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentIssues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                showUpvote={true}
                onViewDetails={() => navigateTo('report-details', issue.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No complaints reported yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Notice a pothole, broken streetlight or overflowing dumpster? Report it now and help improve your ward.
            </p>
            <button
              onClick={() => navigateTo('report-issue')}
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition"
            >
              + Report First Issue
            </button>
          </div>
        )}
      </div>

      {/* Community Feed Banner */}
      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Explore Community Grievances</h3>
            <p className="text-xs text-slate-600">
              See what neighbors in your ward are reporting. Upvote urgent civic issues to speed up municipal action.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('community')}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 shadow-2xs shrink-0 transition"
        >
          Open Community Feed →
        </button>
      </div>

    </div>
  );
};
