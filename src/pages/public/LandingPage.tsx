import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight, 
  Camera, 
  Cpu, 
  UserCheck, 
  Wrench, 
  Star,
  Car,
  Trash2,
  Droplets,
  Lightbulb,
  Waves,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
  ThumbsUp,
  MessageSquare,
  HardHat
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole, issues, stats, getIssueById, showNotification } = useApp();
  const [trackId, setTrackId] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    const issue = getIssueById(trackId.trim());
    if (issue) {
      navigate(`/citizen/report/${issue.id}`);
    } else {
      showNotification(`No complaint found with ID "${trackId}". Try e.g. NS-2026-00124`, 'error');
    }
  };

  const commonCategories = [
    {
      name: 'Potholes & Road Damage',
      category: 'Roads' as const,
      icon: Car,
      color: '#4A154B',
      bgColor: 'bg-[#4A154B]/10 text-[#4A154B]',
      description: 'Craters, dangerous asphalt cracks, unpaved ditches, broken speed bumps.',
      count: '342 Resolved'
    },
    {
      name: 'Garbage & Sanitation',
      category: 'Garbage' as const,
      icon: Trash2,
      color: '#007A5A',
      bgColor: 'bg-[#007A5A]/10 text-[#007A5A]',
      description: 'Overflowing dumpsters, illegal debris dumping, uncollected waste heaps.',
      count: '410 Resolved'
    },
    {
      name: 'Broken Streetlights',
      category: 'Streetlight' as const,
      icon: Lightbulb,
      color: '#ECB22E',
      bgColor: 'bg-[#ECB22E]/15 text-[#9E6A00]',
      description: 'Dark residential streets, non-functional sodium lamps, flickering LED fittings.',
      count: '185 Resolved'
    },
    {
      name: 'Blocked Drainage',
      category: 'Drainage' as const,
      icon: Waves,
      color: '#1264A3',
      bgColor: 'bg-[#1264A3]/10 text-[#1264A3]',
      description: 'Stormwater overflow, clogged sewer lines, street waterlogging in rains.',
      count: '219 Resolved'
    },
    {
      name: 'Water Supply & Leakage',
      category: 'Water' as const,
      icon: Droplets,
      color: '#36C5F0',
      bgColor: 'bg-[#36C5F0]/15 text-[#0B698B]',
      description: 'Main pipeline bursts, low water pressure, contaminated supply grievances.',
      count: '198 Resolved'
    },
    {
      name: 'Civic Infrastructure',
      category: 'Infrastructure' as const,
      icon: Building2,
      color: '#E01E5A',
      bgColor: 'bg-[#E01E5A]/10 text-[#E01E5A]',
      description: 'Damaged footpath pavers, open manhole lids, broken park benches and shelters.',
      count: '154 Resolved'
    },
  ];

  const recentResolvedIssues = issues.filter(i => i.status === 'Resolved').slice(0, 3);

  return (
    <div className="bg-[#F8F6F2] min-h-screen text-[#1D1C1D]">
      
      {/* 1. SLACK-INSPIRED HERO SECTION */}
      <section className="pt-10 pb-20 lg:pt-16 lg:pb-24 border-b border-[#EAE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Big Bold Editorial Slack Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A154B]/10 text-[#4A154B] text-xs font-extrabold">
                <span className="text-[#E01E5A]">★</span>
                <span>Smart India Hackathon 2026 • Municipal Civic-Tech System</span>
              </div>

              {/* Massive Hero Headline like Slack */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1D1C1D] leading-[1.05]">
                Where cities<span className="text-[#E01E5A] font-serif">*</span> <br />
                get fixed.
              </h1>

              {/* Slack-style Asterisk Subheading */}
              <p className="text-sm sm:text-base text-[#4A484A] leading-relaxed font-normal max-w-xl">
                <strong className="text-[#E01E5A] font-bold text-lg">*</strong> Whatever civic problem means to you, NagarSetu connects citizens, ward officers, and municipal crews together so you can actually get things resolved.
              </p>

              {/* CTA Buttons - Slack Green Primary */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    switchRole('citizen');
                    navigate('/citizen/report');
                  }}
                  className="px-8 py-4 bg-[#007A5A] hover:bg-[#006046] text-white text-sm sm:text-base font-extrabold rounded-xl shadow-sm transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Report an Issue — It's Free</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="px-6 py-4 bg-white hover:bg-[#F3EFEA] text-[#1D1C1D] text-sm sm:text-base font-extrabold rounded-xl border border-[#D4CEBF] transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ShieldCheck className="w-5 h-5 text-[#4A154B]" />
                  <span>Admin Portal</span>
                </button>
              </div>

              {/* Tracking Input */}
              <div className="pt-2 max-w-md">
                <form onSubmit={handleTrackSubmit} className="bg-white p-1.5 rounded-xl shadow-xs border border-[#D4CEBF] flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Complaint ID (e.g. NS-2026-00124)"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="flex-1 bg-transparent text-[#1D1C1D] text-xs font-semibold focus:outline-none placeholder-slate-400 py-1.5"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1D1C1D] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    Track Status
                  </button>
                </form>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-[#616061]">
                  <span>Demo complaint IDs:</span>
                  <button onClick={() => setTrackId('NS-2026-00124')} className="underline font-mono font-bold text-[#1264A3]">NS-2026-00124</button>
                  <span>•</span>
                  <button onClick={() => setTrackId('NS-2026-00127')} className="underline font-mono font-bold text-[#1264A3]">NS-2026-00127</button>
                </div>
              </div>

            </div>

            {/* Right Column: Playful, Illustrated Civic Collage (Like Slack) */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 space-y-4">
                
                {/* Main Card: Live Ticket Preview */}
                <div className="bg-white rounded-2xl p-5 border border-[#EAE8E2] shadow-lg shadow-black/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#E01E5A] animate-pulse" />
                      <span className="font-mono text-xs font-bold text-slate-500">NS-2026-00124</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#ECB22E]/15 text-[#9E6A00] rounded-full text-xs font-extrabold">
                      In Progress
                    </span>
                  </div>

                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80"
                      alt="Pothole"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/75 text-white rounded-md text-[11px] font-bold backdrop-blur-xs">
                      📍 100ft Road, Indiranagar
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-[#1D1C1D]">
                      Deep Hazardous Pothole near Metro Pillar 142
                    </h4>
                    <p className="text-xs text-[#616061] mt-0.5 line-clamp-1">
                      Assigned to Roads & Infrastructure • Lead Ramesh Kumar on site
                    </p>
                  </div>

                  {/* Slack-like emoji reaction badges */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#F0EDE6]">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F8F6F2] border border-[#EAE8E2] text-xs font-bold flex items-center gap-1">
                      <span>👍</span>
                      <span className="text-[#1264A3]">42 upvotes</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#007A5A]/10 text-[#007A5A] text-xs font-bold flex items-center gap-1">
                      <span>✓</span>
                      <span>Bitumen roller crew dispatched</span>
                    </span>
                  </div>
                </div>

                {/* Floating Micro-Card 1: Department Dispatch */}
                <div className="bg-white rounded-xl p-3.5 border border-[#EAE8E2] shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4A154B] text-white flex items-center justify-center font-bold text-xs">
                      #
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1D1C1D]">#dept-roads-infrastructure</p>
                      <p className="text-[11px] text-[#616061]">SLA Deadline: &lt; 24 hours</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#007A5A] bg-[#007A5A]/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                {/* Floating Micro-Card 2: Citizen Rating */}
                <div className="bg-white rounded-xl p-3.5 border border-[#EAE8E2] shadow-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ECB22E]/20 text-[#ECB22E] flex items-center justify-center font-bold">
                      ⭐
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1D1C1D]">Citizen 5-Star Resolution Rating</p>
                      <p className="text-[11px] text-[#616061]">"Resolved promptly with photo proof!"</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#4A154B]">
                    Verified
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / STATS STRIP - Clean & Steady */}
      <section className="py-10 bg-white border-b border-[#EAE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#4A154B]">{stats.total + 1230}</p>
              <p className="text-xs font-bold text-[#616061] uppercase tracking-wider">Civic Issues Logged</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#007A5A]">{stats.resolved + 930}</p>
              <p className="text-xs font-bold text-[#616061] uppercase tracking-wider">Resolved on Ground</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#1264A3]">2,450+</p>
              <p className="text-xs font-bold text-[#616061] uppercase tracking-wider">Active Urban Citizens</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#E01E5A]">78%</p>
              <p className="text-xs font-bold text-[#616061] uppercase tracking-wider">SLA Resolution Rate</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SOVEREIGN INDIA MAP & CITY WARD EXPLORER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#007A5A] bg-[#007A5A]/10 px-3 py-1 rounded-full">
              Sovereign Spatial Intelligence
            </span>
            <h2 className="text-3xl font-black text-[#1D1C1D] mt-2">
              National Grievance Map & City Ward Heatmap
            </h2>
            <p className="text-xs sm:text-sm text-[#616061] mt-1 font-medium">
              Explore geotagged complaints on the official sovereign map of India or jump directly into city street wards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/map')}
            className="px-5 py-2.5 bg-[#4A154B] hover:bg-[#3B113C] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
          >
            <span>Open Fullscreen Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <InteractiveMap
          issues={issues}
          height="500px"
          showCitySwitcher={true}
          onSelectIssue={(issue) => {
            navigate(`/citizen/report/${issue.id}`);
          }}
        />
      </section>

      {/* 4. SLACK-STYLE FEATURE STORYTELLING: 3 SIMPLE BLOCKS */}
      <section className="py-16 bg-white border-y border-[#EAE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Feature 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold text-[#E01E5A] uppercase tracking-wider">
                01 • Quick 30-Second Reporting
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1D1C1D] leading-tight">
                Snap it. Geotag it. <br />
                Done in 30 seconds.
              </h3>
              <p className="text-sm text-[#616061] leading-relaxed font-medium">
                No complex paperwork. Take a photo of the pothole, overflowing bin, or dark streetlight. NagarSetu grabs your precise GPS location, assigns an audit reference ID (`NS-2026-XXXXX`), and starts the SLA clock immediately.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    switchRole('citizen');
                    navigate('/citizen/report');
                  }}
                  className="text-sm font-extrabold text-[#007A5A] hover:underline flex items-center gap-1"
                >
                  <span>Report an Issue now →</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F8F6F2] p-8 rounded-3xl border border-[#EAE8E2] shadow-xs">
              <div className="bg-white rounded-2xl p-5 border border-[#EAE8E2] space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#007A5A] text-white flex items-center justify-center font-bold">
                    📸
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-[#1D1C1D]">Photo Evidence Captured</h5>
                    <p className="text-[11px] text-[#616061]">GPS: 12.9784° N, 77.6408° E • Indiranagar</p>
                  </div>
                </div>
                <div className="p-3 bg-[#F8F6F2] rounded-xl text-xs font-mono text-[#4A154B] font-bold">
                  ✓ Ticket ID: NS-2026-00124 • 24h SLA Target
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-4">
              <span className="text-xs font-extrabold text-[#1264A3] uppercase tracking-wider">
                02 • Direct Municipal Routing
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1D1C1D] leading-tight">
                Direct to the crew <br />
                who actually fixes it.
              </h3>
              <p className="text-sm text-[#616061] leading-relaxed font-medium">
                Complaints don't sit in bureaucratic silos. Road repairs route directly to Roads & Infrastructure leads; water pipeline bursts alert the rapid response water engineering unit.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="text-sm font-extrabold text-[#4A154B] hover:underline flex items-center gap-1"
                >
                  <span>See Municipal Admin Triage →</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 bg-[#F8F6F2] p-8 rounded-3xl border border-[#EAE8E2] shadow-xs">
              <div className="bg-white rounded-2xl p-5 border border-[#EAE8E2] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Auto-Dispatched Department</span>
                  <span className="px-2 py-0.5 bg-[#4A154B]/10 text-[#4A154B] rounded text-xs font-bold">Assigned</span>
                </div>
                <h5 className="text-sm font-black text-[#1D1C1D]">Roads & Infrastructure Maintenance Crew</h5>
                <p className="text-xs text-[#616061]">Assigned Officer: Er. Ramesh Kumar (Zone 4 Lead)</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold text-[#007A5A] uppercase tracking-wider">
                03 • Verified On-Ground Impact
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1D1C1D] leading-tight">
                Real photographic proof <br />
                before closing the ticket.
              </h3>
              <p className="text-sm text-[#616061] leading-relaxed font-medium">
                Field staff must upload on-site photographic proof of resolution. Citizens inspect the resolution photos and submit 1–5 star satisfaction reviews.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/community')}
                  className="text-sm font-extrabold text-[#007A5A] hover:underline flex items-center gap-1"
                >
                  <span>Explore Community Resolutions →</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F8F6F2] p-8 rounded-3xl border border-[#EAE8E2] shadow-xs">
              <div className="grid grid-cols-2 gap-2 bg-[#1D1C1D] p-2 rounded-2xl">
                <div className="relative h-28 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80" alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-[#E01E5A] text-white text-[9px] font-bold">BEFORE</span>
                </div>
                <div className="relative h-28 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80" alt="After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-[#007A5A] text-white text-[9px] font-bold">AFTER (RESOLVED)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. COMMON CIVIC CATEGORIES - SLACK STYLE CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#4A154B] bg-[#4A154B]/10 px-3 py-1 rounded-full">
            Municipal Wings
          </span>
          <h2 className="text-3xl font-black text-[#1D1C1D] mt-2">
            What Civic Problems Can You Report?
          </h2>
          <p className="text-xs sm:text-sm text-[#616061] mt-1 font-medium">
            Select a category to report a problem in your neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {commonCategories.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.name}
                className="p-6 rounded-2xl border border-[#EAE8E2] bg-white hover:border-[#4A154B] hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  switchRole('citizen');
                  navigate('/citizen/report');
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center font-bold shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#616061]">
                      {item.count}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#1D1C1D] mb-1 group-hover:text-[#4A154B] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#616061] leading-relaxed mb-3 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EDE6] flex items-center justify-between text-xs font-bold text-[#007A5A]">
                  <span>Report this issue →</span>
                  <span className="text-[10px] text-[#616061] uppercase">24-48h SLA</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SLACK-STYLE BOTTOM CTA */}
      <section className="py-20 bg-[#4A154B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Welcome to where cities get fixed.
          </h2>
          <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto leading-relaxed font-normal">
            Join thousands of active citizens making their neighborhoods safer, cleaner, and smarter every single day.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                switchRole('citizen');
                navigate('/citizen/report');
              }}
              className="px-8 py-4 bg-[#007A5A] hover:bg-[#006046] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              + Report an Issue Now
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base rounded-xl border border-white/20 transition cursor-pointer"
            >
              Municipal Admin Sign-In
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
