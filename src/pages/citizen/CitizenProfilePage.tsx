import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, MapPin, Mail, Phone, Award, ShieldCheck, CheckCircle2, FileText, Star, Sparkles } from 'lucide-react';

export const CitizenProfilePage: React.FC = () => {
  const { currentUser, issues, navigateTo } = useApp();

  const citizenIssues = issues.filter(
    (i) => i.citizenId === currentUser.id || i.citizenEmail === currentUser.email || i.citizenName === 'Aarav Sharma'
  );
  const resolvedCount = citizenIssues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-100 shadow-md"
          />
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow-xs">
            Verified
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentUser.ward}</span>
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200 text-xs font-bold self-center sm:self-auto">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Civic Hero Level 3</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.phone}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Civic Impact & Gamification Points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reports Logged</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{citizenIssues.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Submitted in 2026</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resolved Grievances</span>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2">{resolvedCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Ground repairs confirmed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Civic Karma Points</span>
          <p className="text-3xl font-extrabold text-amber-700 mt-2">340 pts</p>
          <p className="text-[11px] text-slate-500 mt-1">Rank #12 in Indiranagar Ward</p>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Civic Badges & Recognition</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200/80 text-center space-y-1">
            <span className="text-2xl">🛡️</span>
            <p className="text-xs font-bold text-slate-900">Pothole Vigilante</p>
            <p className="text-[10px] text-slate-500">Reported 3+ hazardous road craters</p>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 text-center space-y-1">
            <span className="text-2xl">🌱</span>
            <p className="text-xs font-bold text-slate-900">Swachh Champion</p>
            <p className="text-[10px] text-slate-500">Helped clear 5 garbage dump spots</p>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-center space-y-1">
            <span className="text-2xl">⭐</span>
            <p className="text-xs font-bold text-slate-900">Feedback Guru</p>
            <p className="text-[10px] text-slate-500">Rated all completed municipal works</p>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-200/80 text-center space-y-1">
            <span className="text-2xl">💡</span>
            <p className="text-xs font-bold text-slate-900">Night Watchman</p>
            <p className="text-[10px] text-slate-500">Reported broken residential streetlights</p>
          </div>
        </div>
      </div>

    </div>
  );
};
