import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/common/IssueCard';
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
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
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, switchRole, issues, stats, getIssueById, showNotification } = useApp();
  const [trackId, setTrackId] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    const issue = getIssueById(trackId.trim());
    if (issue) {
      navigateTo('report-details', issue.id);
    } else {
      showNotification(`No complaint found with ID "${trackId}". Please check your complaint ID.`, 'error');
    }
  };

  const commonCategories = [
    {
      name: 'Potholes & Road Damage',
      category: 'Roads' as const,
      icon: Car,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      description: 'Craters, dangerous asphalt cracks, unpaved ditches, broken speed bumps.',
      count: '342 Resolved'
    },
    {
      name: 'Garbage & Sanitation',
      category: 'Garbage' as const,
      icon: Trash2,
      color: 'bg-lime-50 text-lime-700 border-lime-200',
      description: 'Overflowing dumpsters, illegal debris dumping, uncollected waste heaps.',
      count: '410 Resolved'
    },
    {
      name: 'Broken Streetlights',
      category: 'Streetlight' as const,
      icon: Lightbulb,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      description: 'Dark residential streets, non-functional sodium lamps, flickering LED fittings.',
      count: '185 Resolved'
    },
    {
      name: 'Blocked Drainage',
      category: 'Drainage' as const,
      icon: Waves,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Stormwater overflow, clogged sewer lines, street waterlogging in rains.',
      count: '219 Resolved'
    },
    {
      name: 'Water Supply & Leakage',
      category: 'Water' as const,
      icon: Droplets,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      description: 'Main pipeline bursts, low water pressure, contaminated supply grievances.',
      count: '198 Resolved'
    },
    {
      name: 'Civic Infrastructure',
      category: 'Infrastructure' as const,
      icon: Building2,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      description: 'Damaged footpath pavers, open manhole lids, broken park benches and shelters.',
      count: '154 Resolved'
    },
  ];

  const recentResolvedIssues = issues.filter(i => i.status === 'Resolved').slice(0, 3);
  const trendingCommunityIssues = [...issues].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-24 lg:pt-20 lg:pb-32">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-700/60 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart India Hackathon 2026 • Municipal Civic Tech</span>
            </div>

            {/* Main Hero Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Connecting Citizens with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-emerald-300">
                Smarter, Cleaner & Responsive
              </span> Cities.
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-200 font-medium">
              <span className="font-extrabold text-emerald-400 tracking-wider">Report.</span>{' '}
              <span className="font-extrabold text-cyan-300 tracking-wider">Track.</span>{' '}
              <span className="font-extrabold text-blue-200 tracking-wider">Resolve.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Crowdsourced civic issue reporting platform connecting citizens directly with municipal departments. Report potholes, garbage, streetlights, and water leakages with photographic evidence.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  switchRole('citizen');
                  navigateTo('report-issue');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Report an Issue</span>
              </button>

              <button
                onClick={() => {
                  switchRole('citizen');
                  navigateTo('my-reports');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2 transition"
              >
                <Clock className="w-5 h-5 text-cyan-300" />
                <span>Track My Report</span>
              </button>
            </div>

            {/* Live Track Search Bar inside Hero */}
            <div className="pt-6 max-w-xl mx-auto">
              <form onSubmit={handleTrackSubmit} className="bg-white/95 p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/40">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter Complaint ID (e.g. NS-2026-00124)"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="flex-1 bg-transparent text-slate-800 text-sm font-medium focus:outline-none placeholder-slate-400 py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Track Now
                </button>
              </form>
              <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
                <span>Try sample IDs:</span>
                <button onClick={() => setTrackId('NS-2026-00124')} className="underline hover:text-white font-mono">NS-2026-00124</button>
                <span>•</span>
                <button onClick={() => setTrackId('NS-2026-00127')} className="underline hover:text-white font-mono">NS-2026-00127</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS BAR */}
      <section className="-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.total + 1230}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Issues Reported</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.resolved + 930}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Issues Resolved</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">2,450</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active Citizens</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">78%</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Resolution Rate</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            End-to-End Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
            How NagarSetu Resolves Civic Issues
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            From instant photo reporting to on-site municipal resolution and citizen star ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center relative group hover:border-blue-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-4 text-lg shadow-xs group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Step 1</span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">1. Report Issue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Snap a photo with auto-location geotagging and select the category in under 30 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center relative group hover:border-purple-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center mb-4 text-lg shadow-xs group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1">Step 2</span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">2. Smart Categorization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              System assigns unique Complaint ID (e.g. NS-2026-00124) and sets SLA response timeline.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center relative group hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-4 text-lg shadow-xs group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1">Step 3</span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">3. Dept Assignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Municipal desk routes ticket directly to ward supervisor and dispatched field staff.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center relative group hover:border-emerald-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4 text-lg shadow-xs group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Step 4</span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">4. Ground Resolution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Field crew executes repair and uploads geo-tagged resolution photo proof.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center relative group hover:border-amber-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center mb-4 text-lg shadow-xs group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Step 5</span>
            <h3 className="text-sm font-bold text-slate-900 mb-2">5. Citizen Rating</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizen inspects proof, rates quality 1-5 stars, and closes grievance loop.
            </p>
          </div>

        </div>
      </section>

      {/* 4. COMMON ISSUES CATEGORIES GRID */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Civic Categories
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                What Civic Problems Can You Report?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select an issue category to start a complaint with pre-filled department routing.
              </p>
            </div>

            <button
              onClick={() => {
                switchRole('citizen');
                navigateTo('report-issue');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  onClick={() => {
                    switchRole('citizen');
                    navigateTo('report-issue');
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 bg-white rounded-full border border-slate-200 text-slate-600 shadow-2xs">
                        {item.count}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Report This Issue →
                    </span>
                    <span className="text-[10px] text-slate-400">24-48h SLA</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. RECENT RESOLUTIONS & BEFORE-AFTER EVIDENCE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Impact
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Recent Ground Resolutions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Real proof of municipal action with Before & After photo evidence verified by citizens.
            </p>
          </div>

          <button
            onClick={() => navigateTo('community')}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            <span>Explore Community Feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentResolvedIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between">
              <div>
                {/* Before & After Images Grid */}
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-100">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img src={issue.resolutionImageUrl || issue.imageUrl} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">
                      RESOLVED
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-mono font-bold text-slate-600">{issue.id}</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Resolved in 24h
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">{issue.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">{issue.location.address}</p>

                  {issue.feedback && (
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(issue.feedback.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[10px] font-bold text-amber-900 ml-1">Citizen Feedback</span>
                      </div>
                      <p className="text-[11px] text-amber-900 italic line-clamp-2">
                        "{issue.feedback.comment}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => navigateTo('report-details', issue.id)}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition"
                >
                  View Case Timeline & Evidence
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MUNICIPAL DEPARTMENTS COOPERATION */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              Integrated Governance
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              6 Core Municipal Wings on One Platform
            </h2>
            <p className="text-sm text-slate-300">
              Direct API integrations and field dispatch terminals across city civic departments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: 'Roads & Works', count: '14 Crews' },
              { name: 'Sanitation Cell', count: '28 Trucks' },
              { name: 'Water Works', count: '12 Vans' },
              { name: 'Electrical Wing', count: '8 Bucket Vans' },
              { name: 'Storm Drainage', count: '6 Suction Units' },
              { name: 'Public Works', count: '10 Supervisors' },
            ].map((dept) => (
              <div key={dept.name} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/70">
                <p className="text-xs font-bold text-white mb-1">{dept.name}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">{dept.count}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => switchRole('admin')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition"
            >
              Open Municipal Administrator Control Room →
            </button>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to make your neighborhood cleaner and safer?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Report civic issues in less than a minute without standing in municipal queues.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                switchRole('citizen');
                navigateTo('report-issue');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-700 font-extrabold text-sm rounded-xl shadow-xl hover:bg-blue-50 transition transform hover:scale-105"
            >
              + Report an Issue Now
            </button>
            <button
              onClick={() => navigateTo('community')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900/60 hover:bg-blue-900/80 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-xs transition"
            >
              Explore Ward Issues Map
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
