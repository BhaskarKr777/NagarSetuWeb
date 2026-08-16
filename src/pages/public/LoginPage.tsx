import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, HardHat, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchRole, navigateTo, showNotification } = useApp();
  const [email, setEmail] = useState('citizen.demo@nagarsetu.gov.in');
  const [password, setPassword] = useState('password123');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to citizen if custom submit
    switchRole('citizen');
    showNotification('Logged in successfully as Citizen!', 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-blue-600">NagarSetu</span>
          </h2>
          <p className="mt-2 text-xs text-slate-600 max-w-sm mx-auto">
            Choose a quick demo persona or sign in to access the civic portal.
          </p>
        </div>

        {/* 1-Click Demo Profiles Box */}
        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-md shadow-blue-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              1-Click Demo Sign-In
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              No backend required
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            
            {/* Citizen Button */}
            <button
              onClick={() => switchRole('citizen')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/50 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Continue as Citizen</p>
                  <p className="text-[11px] text-slate-500">Aarav Sharma • Ward 14 Indiranagar</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Admin Button */}
            <button
              onClick={() => switchRole('admin')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50/70 hover:bg-indigo-50/50 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Continue as Admin</p>
                  <p className="text-[11px] text-slate-500">Shreya Deshmukh, IAS • Municipal HQ</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Field Staff Button */}
            <button
              onClick={() => switchRole('staff')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50/70 hover:bg-amber-50/50 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Continue as Field Staff</p>
                  <p className="text-[11px] text-slate-500">Ramesh Kumar • Roads & Infra Crew</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 px-3 text-slate-500 font-semibold">Or Sign In with Email</span>
          </div>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleCustomSubmit} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Official Email or Mobile</label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="name@domain.com"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showNotification('Demo password is password123', 'info'); }} className="text-[11px] text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition"
          >
            Sign In to Dashboard
          </button>

          <p className="text-center text-xs text-slate-500 pt-1">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigateTo('register')}
              className="text-blue-600 font-bold hover:underline"
            >
              Register Citizen Profile
            </button>
          </p>
        </form>

      </div>
    </div>
  );
};
