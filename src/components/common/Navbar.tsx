import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  PlusCircle, 
  Search, 
  MapPin, 
  BarChart3, 
  Users, 
  Layers, 
  ShieldCheck, 
  HardHat, 
  User, 
  LogOut, 
  Menu, 
  X,
  FileText,
  Home,
  CheckCircle2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    activeTab, 
    navigateTo, 
    switchRole, 
    trackQuery, 
    setTrackQuery,
    getIssueById,
    showNotification,
    resetToMockData
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackInput, setTrackInput] = useState(trackQuery || '');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    
    const issue = getIssueById(trackInput.trim());
    if (issue) {
      navigateTo(currentRole === 'admin' ? 'admin-issue-details' : 'report-details', issue.id);
      showNotification(`Found complaint ${issue.id}`, 'info');
    } else {
      showNotification(`No complaint found with ID "${trackInput}". Try e.g. NS-2026-00124`, 'error');
    }
  };

    interface NavItem {
      id: string;
      label: string;
      icon: any;
      highlight?: boolean;
    }

  const citizenNavItems: NavItem[] = [
    { id: 'citizen-dashboard', label: 'Dashboard', icon: Home },
    { id: 'report-issue', label: 'Report Issue', icon: PlusCircle, highlight: true },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'community', label: 'Community Feed', icon: Users },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'admin-issues', label: 'Issues Table', icon: Layers },
    { id: 'admin-map', label: 'Live Map', icon: MapPin },
    { id: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin-departments', label: 'Departments', icon: ShieldCheck },
  ];

  const staffNavItems: NavItem[] = [
    { id: 'staff-dashboard', label: 'My Tasks', icon: HardHat },
    { id: 'admin-map', label: 'Task Map', icon: MapPin },
    { id: 'community', label: 'Community View', icon: Users },
  ];

  const publicNavItems: NavItem[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'community', label: 'Community Feed', icon: Users },
    { id: 'login', label: 'Demo Login', icon: User },
  ];

  const navItems: NavItem[] = 
    currentRole === 'admin' ? adminNavItems :
    currentRole === 'staff' ? staffNavItems :
    currentRole === 'citizen' ? citizenNavItems : 

    publicNavItems;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Demo Bar / Quick Role Switcher Banner */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-slate-300">SIH 2026 Live Demo:</span>
          <span className="hidden sm:inline text-slate-400">Switch role instantly:</span>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => switchRole('citizen')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
              currentRole === 'citizen'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
              currentRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => switchRole('staff')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
              currentRole === 'staff'
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HardHat className="w-3 h-3" />
            <span>Field Staff</span>
          </button>

          <button
            onClick={() => switchRole('public')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
              currentRole === 'public'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Landing</span>
          </button>

          <button
            onClick={resetToMockData}
            title="Reset to default 15 demo complaints"
            className="ml-2 px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 text-[11px] flex items-center gap-1 transition"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span className="hidden md:inline">Reset Data</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => navigateTo(currentRole === 'public' ? 'landing' : `${currentRole}-dashboard`)} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Nagar<span className="text-blue-600">Setu</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">
                  Civic Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Report • Track • Resolve</p>
            </div>
          </div>

          {/* Quick Track Input Bar (Desktop) */}
          <form onSubmit={handleTrackSubmit} className="hidden lg:flex items-center relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Track Complaint (e.g. NS-2026-00124)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-150 focus:bg-white text-xs text-slate-800 pl-8 pr-16 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
            <button
              type="submit"
              className="absolute right-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold transition"
            >
              Track
            </button>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="ml-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-1.5 hover:scale-102 transition transform active:scale-98"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Report Issue</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Pill / Login Action */}
          <div className="flex items-center gap-2">
            {currentRole !== 'public' ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{currentRole} Account</p>
                </div>
                <button
                  onClick={() => switchRole('public')}
                  title="Log out"
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <form onSubmit={handleTrackSubmit} className="flex items-center relative w-full mb-3">
            <input
              type="text"
              placeholder="Track Complaint ID (e.g. NS-2026-00124)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="w-full bg-slate-100 text-xs pl-8 pr-16 py-2.5 rounded-lg border border-slate-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold"
            >
              Track
            </button>
          </form>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
