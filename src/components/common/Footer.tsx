import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  PlusCircle, 
  ExternalLink, 
  FileText,
  Users,
  HardHat,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  return (
    <footer className="mt-20 bg-white border-t border-[#EAE8E2] text-[#1D1C1D]">
      
      {/* Main Footer Container with Generous Padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12 space-y-12">
        
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Mission (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#4A154B] text-white flex items-center justify-center font-black text-2xl shadow-xs">
                #
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-[#1D1C1D]">
                  NagarSetu
                </span>
                <span className="text-[#E01E5A] font-serif font-black text-2xl leading-none">*</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#616061] leading-relaxed max-w-sm font-medium">
              Crowdsourced Civic Issue Reporting & Real-Time Municipal Resolution Platform. Connecting citizens, ward officers, and on-ground repair crews for cleaner, safer, and smarter cities.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007A5A]/10 text-[#007A5A] text-xs font-bold border border-[#007A5A]/20">
                <span className="w-2 h-2 rounded-full bg-[#2EB67D] animate-pulse" />
                <span>Smart India Hackathon 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold border border-[#4A154B]/20">
                <span>Digital India Initiative</span>
              </span>
            </div>
          </div>

          {/* Column 2: Citizen Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1C1D]">
              Citizen Portals
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#616061]">
              <li>
                <NavLink to="/citizen/dashboard" className="hover:text-[#4A154B] transition-colors">
                  Citizen Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/citizen/report" className="hover:text-[#4A154B] text-[#007A5A] font-bold transition-colors flex items-center gap-1">
                  <span>+ Report Civic Issue</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/citizen/my-reports" className="hover:text-[#4A154B] transition-colors">
                  My Submitted Complaints
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" className="hover:text-[#4A154B] transition-colors">
                  Public Community Feed
                </NavLink>
              </li>
              <li>
                <NavLink to="/citizen/profile" className="hover:text-[#4A154B] transition-colors">
                  Citizen Karma & Badges
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Municipal Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1C1D]">
              Municipal Admin
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#616061]">
              <li>
                <NavLink to="/admin/login" className="hover:text-[#4A154B] transition-colors flex items-center gap-1 font-bold text-[#4A154B]">
                  <Lock className="w-3 h-3" />
                  <span>Admin Login Gateway</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard" className="hover:text-[#4A154B] transition-colors">
                  Command Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/issues" className="hover:text-[#4A154B] transition-colors">
                  All Issues Table & CSV
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/map" className="hover:text-[#4A154B] transition-colors">
                  Spatial Heatmap & GIS
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/departments" className="hover:text-[#4A154B] transition-colors">
                  Department Wings & Roster
                </NavLink>
              </li>
              <li>
                <NavLink to="/staff/dashboard" className="hover:text-[#4A154B] transition-colors flex items-center gap-1">
                  <HardHat className="w-3 h-3 text-[#9E6A00]" />
                  <span>Field Staff Terminal</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1C1D]">
              Civic Helplines
            </h4>
            <div className="space-y-2.5 text-xs text-[#616061] font-medium">
              <div className="p-3 bg-[#F8F6F2] rounded-xl border border-[#EAE8E2] space-y-1">
                <p className="font-bold text-[#1D1C1D] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#007A5A]" />
                  <span>1800-11-2026 (Toll Free)</span>
                </p>
                <p className="text-[11px] text-[#616061]">24x7 Municipal Control Desk</p>
              </div>

              <div className="p-3 bg-[#F8F6F2] rounded-xl border border-[#EAE8E2] space-y-1">
                <p className="font-bold text-[#1D1C1D] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#1264A3]" />
                  <span>grievance@nagarsetu.gov.in</span>
                </p>
                <p className="text-[11px] text-[#616061]">Official Escalation Cell</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip with Generous Spacing */}
        <div className="pt-8 border-t border-[#EAE8E2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#616061]">
          <p className="font-medium">
            © 2026 NagarSetu (नगरसेतु) Platform. Built for the Smart India Hackathon.
          </p>

          <div className="flex items-center gap-6 font-semibold">
            <span className="hover:text-[#1D1C1D] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#1D1C1D] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#1D1C1D] cursor-pointer">Citizen Charter</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
