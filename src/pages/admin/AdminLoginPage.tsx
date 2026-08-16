import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin, showNotification } = useApp();
  
  const [adminId, setAdminId] = useState('admin@nagarsetu.gov.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(adminId.trim(), password.trim());
      setIsLoading(false);

      if (success) {
        showNotification('Authenticated as Municipal Administrator (Shreya Deshmukh, IAS)', 'success');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please use: admin@nagarsetu.gov.in / admin123');
        showNotification('Invalid Admin Credentials', 'error');
      }
    }, 350);
  };

  const handleFillDemo = () => {
    setAdminId('admin@nagarsetu.gov.in');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F8F6F2]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE8E2] shadow-xl p-8 sm:p-10 space-y-6">
        
        {/* Header with Slack # brand character */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#4A154B] text-white flex items-center justify-center mx-auto shadow-md font-black text-2xl">
            #
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1D1C1D] tracking-tight">
              Sign in to Admin Console
            </h2>
            <p className="text-xs text-[#616061] mt-1 font-medium">
              Municipal commissioners, ward engineers, and department supervisors.
            </p>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-[#F8F6F2] rounded-2xl p-4 border border-[#EAE8E2] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#1D1C1D] flex items-center gap-1.5">
              <span className="text-[#E01E5A]">★</span>
              <span>Official Demo Credentials:</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-extrabold text-[#007A5A] hover:underline cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
          <div className="text-xs font-mono bg-white p-3 rounded-xl border border-[#D4CEBF] text-slate-700 space-y-1">
            <p><span className="text-slate-400">Admin ID:</span> <strong className="text-[#1D1C1D]">admin@nagarsetu.gov.in</strong></p>
            <p><span className="text-slate-400">Password:</span> <strong className="text-[#1D1C1D]">admin123</strong></p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
              Municipal Admin ID / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="admin@nagarsetu.gov.in"
                className="w-full pl-10 pr-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#007A5A] hover:bg-[#006046] text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In as Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-bold text-[#616061] hover:text-[#1D1C1D]"
          >
            ← Return to Citizen Public Home
          </button>
        </div>

      </div>
    </div>
  );
};
