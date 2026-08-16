import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, FIELD_STAFF_MEMBERS } from '../../data/mockData';
import { 
  Building2, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  HardHat,
  ArrowRight
} from 'lucide-react';

export const AdminDepartmentsPage: React.FC = () => {
  const { issues, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Municipal Org Hierarchy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Municipal Departments & Field Wings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Directory of departmental heads, active field units, and grievance caseloads.
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept) => {
          const deptIssues = issues.filter((i) => i.department === dept.name);
          const openCount = deptIssues.filter((i) => i.status !== 'Resolved').length;
          const resolvedCount = deptIssues.filter((i) => i.status === 'Resolved').length;
          const staffCount = FIELD_STAFF_MEMBERS.filter((s) => s.department === dept.name).length;

          return (
            <div key={dept.name} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                    {staffCount || 1} Field Officers
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-1">{dept.name}</h3>
                <p className="text-xs text-slate-600 mb-4 font-medium">Head: {dept.head}</p>

                {/* Caseload Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">Active Open</span>
                    <p className="text-lg font-extrabold text-slate-900">{openCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Resolved</span>
                    <p className="text-lg font-extrabold text-emerald-700">{resolvedCount}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dept.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dept.phone}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Field Staff Roster Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <HardHat className="w-5 h-5 text-amber-600" />
          <span>Active Field Staff Officers Roster</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELD_STAFF_MEMBERS.map((staff) => (
            <div key={staff.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
              <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-200 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-900 truncate">{staff.name}</p>
                <p className="text-[11px] text-blue-700 font-semibold truncate">{staff.role}</p>
                <p className="text-[10px] text-slate-500 truncate">{staff.department}</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                  {staff.activeTasks} Active Tasks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
