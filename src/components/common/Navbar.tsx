import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  Lock, 
  RefreshCw 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentRole, 
    switchRole, 
    getIssueById,
    showNotification,
    resetToMockData,
    isBackendConnected,
    isAdminAuthenticated,
    logoutAdmin
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    
    const issue = getIssueById(trackInput.trim());
    if (issue) {
      if (location.pathname.startsWith('/admin')) {
        navigate(`/admin/issues/${issue.id}`);
      } else if (location.pathname.startsWith('/staff')) {
        navigate(`/staff/task/${issue.id}`);
      } else {
        navigate(`/citizen/report/${issue.id}`);
      }
      showNotification(`Found complaint ${issue.id}`, 'info');
    } else {
      showNotification(`No complaint found with ID "${trackInput}". Try e.g. NS-2026-00124`, 'error');
    }
  };

  const citizenLinks = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: Home },
    { to: '/citizen/report', label: 'Report Issue', icon: PlusCircle, highlight: true },
    { to: '/citizen/my-reports', label: 'My Reports', icon: FileText },
    { to: '/community', label: 'Community Feed', icon: Users },
    { to: '/citizen/profile', label: 'Profile', icon: User },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/admin/issues', label: 'Issues Table', icon: Layers },
    { to: '/admin/map', label: 'Live GIS Map', icon: MapPin },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/departments', label: 'Departments', icon: ShieldCheck },
  ];

  const staffLinks = [
    { to: '/staff/dashboard', label: 'Tasks Queue', icon: HardHat },
    { to: '/admin/map', label: 'Field Map', icon: MapPin },
    { to: '/community', label: 'Community', icon: Users },
  ];

  const publicLinks = [
    { to: '/', label: 'Overview', icon: Home },
    { to: '/community', label: 'Community Feed', icon: Users },
    { to: '/login', label: 'Citizen Sign In', icon: User },
    { to: '/admin/login', label: 'Admin Login', icon: Lock },
  ];

  const currentLinks = 
    location.pathname.startsWith('/admin') ? adminLinks :
    location.pathname.startsWith('/staff') ? staffLinks :
    location.pathname.startsWith('/citizen') ? citizenLinks : 
    publicLinks;

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#EAE8E2] transition-all">
      
      {/* Upper Subtle Toolbar: Clean & Integrated without heavy dark bars */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2.5 pb-1 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#EAE8E2]/60">
        
        {/* Left: Live Status Pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#007A5A]/10 text-[#007A5A] text-[11px] font-bold border border-[#007A5A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EB67D] animate-pulse" />
            <span>SIH 2026 Civic Platform</span>
          </span>

          <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#616061] font-semibold">
            <span>• Node.js Backend:</span>
            <span className={`font-bold ${isBackendConnected ? 'text-[#007A5A]' : 'text-[#9E6A00]'}`}>
              {isBackendConnected ? 'Online (Port 5000)' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Right: Clean Role Navigation Switcher with Soft Borders */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#616061] mr-1 hidden md:inline">Portal:</span>
          
          <button
            type="button"
            onClick={() => {
              switchRole('citizen');
              navigate('/citizen/dashboard');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              location.pathname.startsWith('/citizen')
                ? 'bg-[#4A154B] text-white shadow-2xs'
                : 'bg-white text-[#4A484A] hover:bg-[#EAE8E2] border border-[#EAE8E2]'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Citizen</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isAdminAuthenticated) {
                switchRole('admin');
                navigate('/admin/dashboard');
              } else {
                navigate('/admin/login');
              }
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              location.pathname.startsWith('/admin')
                ? 'bg-[#4A154B] text-white shadow-2xs'
                : 'bg-white text-[#4A484A] hover:bg-[#EAE8E2] border border-[#EAE8E2]'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin {isAdminAuthenticated ? '✓' : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              switchRole('staff');
              navigate('/staff/dashboard');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              location.pathname.startsWith('/staff')
                ? 'bg-[#4A154B] text-white shadow-2xs'
                : 'bg-white text-[#4A484A] hover:bg-[#EAE8E2] border border-[#EAE8E2]'
            }`}
          >
            <HardHat className="w-3 h-3" />
            <span>Field Staff</span>
          </button>

          <button
            type="button"
            onClick={resetToMockData}
            title="Reset to default 15 demo complaints"
            className="p-1 rounded-lg bg-white text-slate-400 hover:text-[#4A154B] border border-[#EAE8E2] transition cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Navbar Bar: Spacious, Clean Slack Aesthetics */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo with Slack character */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-[#4A154B] text-white flex items-center justify-center font-black text-2xl shadow-xs group-hover:bg-[#3B113C] transition transform group-hover:scale-102">
              #
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-[#1D1C1D]">
                NagarSetu
              </span>
              <span className="text-[#E01E5A] font-serif font-black text-2xl leading-none">*</span>
            </div>
          </NavLink>

          {/* Quick Track Complaint Bar with Generous Width */}
          <form onSubmit={handleTrackSubmit} className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Track Complaint (e.g. NS-2026-00124)"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4A154B] text-[#1D1C1D] shadow-2xs"
              />
            </div>
          </form>

          {/* Desktop Navigation Links with Generous Spacing */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              const isHighlight = (link as any).highlight;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition ${
                      isHighlight
                        ? 'bg-[#007A5A] hover:bg-[#006046] text-white shadow-2xs'
                        : isActive
                        ? 'bg-[#EAE8E2] text-[#1D1C1D]'
                        : 'text-[#4A484A] hover:bg-[#EAE8E2] hover:text-[#1D1C1D]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            {location.pathname.startsWith('/admin') && isAdminAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                  navigate('/admin/login');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#E01E5A] bg-[#E01E5A]/10 hover:bg-[#E01E5A]/20 border border-[#E01E5A]/30 flex items-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Admin Logout</span>
              </button>
            ) : (
              <NavLink
                to="/citizen/report"
                className="px-5 py-2.5 bg-[#007A5A] hover:bg-[#006046] text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Report Issue</span>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-[#EAE8E2] border border-[#EAE8E2] bg-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EAE8E2] px-6 py-4 space-y-3 shadow-lg">
          <form onSubmit={handleTrackSubmit} className="mb-3">
            <input
              type="text"
              placeholder="Track Complaint ID..."
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold"
            />
          </form>
          
          <div className="grid grid-cols-1 gap-1.5">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                      isActive ? 'bg-[#EAE8E2] text-[#1D1C1D]' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
};
