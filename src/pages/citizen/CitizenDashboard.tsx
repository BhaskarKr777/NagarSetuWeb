import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/common/IssueCard';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  FileText, 
  ArrowRight, 
  TrendingUp,
  MapPin,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, issues } = useApp();

  const citizenIssues = issues.filter(
    (i) => i.citizenId === currentUser.id || i.citizenEmail === currentUser.email || i.citizenName === 'Aarav Sharma'
  );

  const pendingCount = citizenIssues.filter((i) => i.status === 'Reported' || i.status === 'Under Review').length;
  const inProgressCount = citizenIssues.filter((i) => i.status === 'Assigned' || i.status === 'In Progress').length;
  const resolvedCount = citizenIssues.filter((i) => i.status === 'Resolved').length;

  const recentIssues = citizenIssues.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8F6F2]">
      
      {/* Top Welcome Banner in Slack Aubergine */}
      <div className="bg-[#4A154B] rounded-3xl p-6 sm:p-10 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-bold">
            <span className="text-[#ECB22E]">★</span>
            <span>Citizen Portal • {currentUser.ward}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Namaste, {currentUser.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
            Monitor real-time progress on your submitted complaints, report new neighborhood issues, and rate ground municipal works.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/citizen/report')}
            className="px-6 py-3.5 bg-[#007A5A] hover:bg-[#006046] text-white text-xs sm:text-sm font-black rounded-xl shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Report an Issue</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/citizen/my-reports')}
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black rounded-xl border border-white/25 transition flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>My Reports ({citizenIssues.length})</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Reports */}
        <div 
          onClick={() => navigate('/citizen/my-reports')}
          className="bg-white p-6 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#4A154B] transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#616061] uppercase tracking-wider">Total Reports</span>
            <div className="w-9 h-9 rounded-xl bg-[#4A154B]/10 text-[#4A154B] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#1D1C1D]">{citizenIssues.length}</p>
          <p className="text-[11px] text-[#616061] mt-1 font-medium">Across your ward</p>
        </div>

        {/* Pending */}
        <div 
          onClick={() => navigate('/citizen/my-reports')}
          className="bg-white p-6 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#ECB22E] transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#9E6A00] uppercase tracking-wider">Under Review</span>
            <div className="w-9 h-9 rounded-xl bg-[#ECB22E]/20 text-[#9E6A00] flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#9E6A00]">{pendingCount}</p>
          <p className="text-[11px] text-[#616061] mt-1 font-medium">Awaiting triage</p>
        </div>

        {/* In Progress */}
        <div 
          onClick={() => navigate('/citizen/my-reports')}
          className="bg-white p-6 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#1264A3] transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#1264A3] uppercase tracking-wider">In Progress</span>
            <div className="w-9 h-9 rounded-xl bg-[#1264A3]/10 text-[#1264A3] flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#1264A3]">{inProgressCount}</p>
          <p className="text-[11px] text-[#616061] mt-1 font-medium">Ground crew active</p>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => navigate('/citizen/my-reports')}
          className="bg-white p-6 rounded-2xl border border-[#EAE8E2] shadow-xs hover:border-[#007A5A] transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#007A5A] uppercase tracking-wider">Resolved</span>
            <div className="w-9 h-9 rounded-xl bg-[#007A5A]/10 text-[#007A5A] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#007A5A]">{resolvedCount}</p>
          <p className="text-[11px] text-[#616061] mt-1 font-medium">With photo proof</p>
        </div>

      </div>

      {/* Recent Citizen Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#1D1C1D]">Your Recent Complaints</h2>
            <p className="text-xs text-[#616061]">Real-time status updates and resolution progress for your grievances</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/citizen/my-reports')}
            className="text-xs font-bold text-[#007A5A] hover:underline flex items-center gap-1"
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
                onViewDetails={() => navigate(`/citizen/report/${issue.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-[#D4CEBF] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#007A5A]/10 text-[#007A5A] flex items-center justify-center mx-auto">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#1D1C1D]">No complaints reported yet</h3>
            <p className="text-xs text-[#616061] max-w-sm mx-auto">
              Notice a pothole, broken streetlight, or overflowing dumpster? Report it now to speed up municipal action.
            </p>
            <button
              type="button"
              onClick={() => navigate('/citizen/report')}
              className="px-5 py-2.5 bg-[#007A5A] text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              + Report First Issue
            </button>
          </div>
        )}
      </div>

      {/* Community Feed Banner */}
      <div className="bg-white rounded-2xl p-6 text-[#1D1C1D] border border-[#EAE8E2] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#4A154B] text-white flex items-center justify-center font-black text-xl shrink-0">
            #
          </div>
          <div>
            <h3 className="text-sm font-black text-[#1D1C1D]">Explore Ward Community Grievances</h3>
            <p className="text-xs text-[#616061]">
              See what neighbors in your ward are reporting. Upvote urgent civic issues to accelerate municipal prioritization.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="px-5 py-2.5 bg-[#1D1C1D] hover:bg-slate-800 text-white text-xs font-bold rounded-xl shrink-0 transition"
        >
          Open Community Feed →
        </button>
      </div>

    </div>
  );
};
