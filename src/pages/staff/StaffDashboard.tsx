import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { 
  HardHat, 
  Clock, 
  CheckCircle2, 
  Flame, 
  AlertTriangle, 
  MapPin, 
  Wrench, 
  ArrowRight, 
  Phone,
  Camera
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, issues, updateIssueStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Assigned' | 'In Progress' | 'Resolved'>('All');

  // Filter tasks assigned to current staff (or default road department tasks)
  const staffTasks = issues.filter(
    (i) => i.assignedStaff?.id === currentUser.id || i.department === 'Roads & Infrastructure' || !i.assignedStaff
  );

  const assignedCount = staffTasks.filter((i) => i.status === 'Assigned').length;
  const inProgressCount = staffTasks.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = staffTasks.filter((i) => i.status === 'Resolved').length;
  const highPriorityCount = staffTasks.filter((i) => i.priority === 'High' && i.status !== 'Resolved').length;

  const filteredTasks = staffTasks.filter((t) => {
    if (activeTab === 'All') return true;
    return t.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner with Solid Theme */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold">
            <HardHat className="w-3.5 h-3.5" />
            <span>Field Dispatch Terminal • On-Ground Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Field Officer: {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Roads & Infrastructure Maintenance Crew • Zone 4 East
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/map')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>View Task Navigation Map</span>
          </button>
        </div>
      </div>


      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Tasks</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{assignedCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Ready for site work</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">High Priority</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-red-700 mt-2">{highPriorityCount}</p>
          <p className="text-[11px] text-red-600 font-semibold mt-1">Requires fast action &lt; 24h</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">In Progress</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mt-2">{inProgressCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Ground crew deployed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Completed Works</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">{resolvedCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">With photo proof submitted</p>
        </div>

      </div>

      {/* Tasks Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Assigned', 'In Progress', 'Resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition">
            
            <div>
              <div className="relative h-44 bg-slate-100">
                <img src={task.imageUrl} alt={task.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 text-white font-mono text-[11px] font-bold">
                    {task.id}
                  </span>
                  <PriorityBadge priority={task.priority} size="sm" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                  <StatusBadge status={task.status} size="sm" />
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <CategoryBadge category={task.category} />
                  <span className="text-[11px] text-slate-500">📍 {task.location.ward}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {task.location.address}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
              {task.status === 'Assigned' && (
                <button
                  onClick={() => {
                    updateIssueStatus(task.id, 'In Progress', 'Field crew deployed to site');
                  }}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Start Work</span>
                </button>
              )}

              {task.status === 'In Progress' && (
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 animate-pulse">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>In Progress on Site</span>
                </span>
              )}

              {task.status === 'Resolved' && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Work Completed</span>
                </span>
              )}

              <button
                onClick={() => navigate(`/staff/task/${task.id}`)}
                className="ml-auto px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <span>Task Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
