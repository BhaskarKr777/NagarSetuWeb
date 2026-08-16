import React from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, ShieldAlert, Sparkles, RefreshCw, Heart, ExternalLink, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, switchRole, resetToMockData } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      {/* Emergency & Municipal Helplines Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">24/7 Civic Helpline Directory:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold">1916</span>
              <span className="text-slate-400">Swachhata / Garbage</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-bold">1912</span>
              <span className="text-slate-400">Power & Streetlights</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-blue-400 font-bold">1913</span>
              <span className="text-slate-400">Roads & Water Supply</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-red-400 font-bold">112</span>
              <span className="text-slate-400">Disaster Emergency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                NS
              </div>
              <span className="text-lg font-extrabold text-white">NagarSetu</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering citizens with seamless municipal transparency. Crowdsourced issue reporting, automated departmental triage, and rapid ground resolution.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-800">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                Smart City Civic Tech Initiative
              </span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Citizen Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { switchRole('citizen'); navigateTo('report-issue'); }} className="hover:text-white transition">
                  • Report Pothole or Road Damage
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('citizen'); navigateTo('report-issue'); }} className="hover:text-white transition">
                  • Report Garbage & Sanitation Issue
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('citizen'); navigateTo('report-issue'); }} className="hover:text-white transition">
                  • Report Water Leakage & Burst
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('citizen'); navigateTo('my-reports'); }} className="hover:text-white transition">
                  • Track Existing Grievance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('community')} className="hover:text-white transition">
                  • Community Issues Feed
                </button>
              </li>
            </ul>
          </div>

          {/* Municipal Administration */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Municipal Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => switchRole('admin')} className="hover:text-white transition flex items-center gap-1">
                  <span>• Administrator Control Room</span>
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('admin'); navigateTo('admin-issues'); }} className="hover:text-white transition">
                  • Grievance Triage Table
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('admin'); navigateTo('admin-map'); }} className="hover:text-white transition">
                  • Live Spatial Ward Map
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('admin'); navigateTo('admin-analytics'); }} className="hover:text-white transition">
                  • SLA & Turnaround Analytics
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('staff')} className="hover:text-white transition">
                  • Field Staff Dispatch App
                </button>
              </li>
            </ul>
          </div>

          {/* Demo Controls */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Demo Management</h4>
            <p className="text-xs text-slate-400 mb-3">
              This application stores all issues and status changes in browser localStorage.
            </p>
            <button
              onClick={resetToMockData}
              className="w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Reset Demo Complaints</span>
            </button>
            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Tip for Presentation:</span> Use the role buttons at top header to simulate Citizen → Admin → Field Staff flow live!
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NagarSetu. Smart India Hackathon (SIH) Project.</p>
          <p className="flex items-center gap-1">
            Built for Smarter, Cleaner and More Responsive Cities.
          </p>
        </div>
      </div>
    </footer>
  );
};
