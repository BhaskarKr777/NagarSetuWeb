import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/common/IssueCard';
import { IssueCategory } from '../../types';
import { 
  Users, 
  Flame, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp,
  PlusCircle
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const { issues, switchRole } = useApp();

  
  const [activeTab, setActiveTab] = useState<'Trending' | 'Nearby' | 'New' | 'Resolved'>('Trending');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtering & Sorting Logic
  let filtered = [...issues];

  // 1. Search Query
  if (searchQuery.trim()) {
    filtered = filtered.filter(
      (i) =>
        i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 2. Category Filter
  if (selectedCategory !== 'All') {
    filtered = filtered.filter((i) => i.category === selectedCategory);
  }

  // 3. Tab Filter & Sort
  if (activeTab === 'Trending') {
    filtered.sort((a, b) => b.upvotes - a.upvotes);
  } else if (activeTab === 'New') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (activeTab === 'Resolved') {
    filtered = filtered.filter((i) => i.status === 'Resolved');
  } else if (activeTab === 'Nearby') {
    // Priority to Indiranagar & Koramangala
    filtered = filtered.filter((i) => i.location.ward.includes('14') || i.location.ward.includes('08'));
  }

  const categories: { label: string; value: string }[] = [
    { label: 'All Categories', value: 'All' },
    { label: '🚗 Roads', value: 'Roads' },
    { label: '🗑️ Garbage', value: 'Garbage' },
    { label: '💧 Water', value: 'Water' },
    { label: '💡 Streetlights', value: 'Streetlight' },
    { label: '🌊 Drainage', value: 'Drainage' },
    { label: '🏢 Infrastructure', value: 'Infrastructure' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Civic Crowdsourcing Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Community Grievance Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover, upvote, and track civic issues reported across city wards.
          </p>
        </div>

        <button
          onClick={() => {
            switchRole('citizen');
            navigate('/citizen/report');
          }}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Issue</span>
        </button>

      </div>

      {/* Main Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Primary Filter Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto">
            {[
              { id: 'Trending', label: '🔥 Trending / Most Upvoted' },
              { id: 'Nearby', label: '📍 Nearby My Ward' },
              { id: 'New', label: '✨ Newest Reports' },
              { id: 'Resolved', label: '✓ Verified Resolved' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search keyword, ward, or complaint ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Community Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              showUpvote={true}
              onViewDetails={() => navigate(`/citizen/report/${issue.id}`)}
            />
          ))}

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-3">
          <TrendingUp className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No issues found matching your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setActiveTab('Trending');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
