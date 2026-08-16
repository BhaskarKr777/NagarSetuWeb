import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, HardHat, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole, showNotification } = useApp();
  const [email, setEmail] = useState('citizen.demo@nagarsetu.gov.in');
  const [password, setPassword] = useState('password123');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('citizen');
    showNotification('Logged in successfully as Citizen (Aarav Sharma)', 'success');
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md font-bold text-xl">
            न
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to <span className="text-blue-600">NagarSetu</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Choose your portal persona or sign in with your citizen credentials.
          </p>
        </div>

        {/* 1-Click Demo Profiles Box */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Select Demo Portal:</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            
            {/* Citizen Button */}
            <button
              type="button"
              onClick={() => {
                switchRole('citizen');
                navigate('/citizen/dashboard');
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 transition text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700">
                    Citizen Portal (Aarav Sharma)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Ward 14 • Indiranagar • Report & track civic issues
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Admin Login Button (Redirects to Admin ID/Pass Login) */}
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 transition text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 flex items-center gap-1.5">
                    <span>Municipal Admin Portal</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-bold">Requires Login</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    ID & Password Authentication • Central Command
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Field Staff Button */}
            <button
              type="button"
              onClick={() => {
                switchRole('staff');
                navigate('/staff/dashboard');
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 transition text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700">
                    Field Staff (Ramesh Kumar)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Roads & Infra Team • On-site repair & photo proof
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

        {/* Regular Sign-In Form for Citizens */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Citizen Email Sign-In
          </h3>

          <form onSubmit={handleCustomSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
            >
              Continue to Citizen Dashboard →
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
