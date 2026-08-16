import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { Issue } from '../../types';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const AdminMapView: React.FC = () => {
  const { issues, navigateTo, currentRole } = useApp();
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(issues[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIssues = issues.filter((i) => {
    const matchesCat = selectedCategory === 'All' || i.category === selectedCategory;
    const matchesPri = selectedPriority === 'All' || i.priority === selectedPriority;
    const matchesSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesPri && matchesSearch;
  });

  const selectedIssue = issues.find((i) => i.id === selectedIssueId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Live Spatial GIS Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Civic Issue Spatial Intelligence Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Interactive geographical heatmap of active citizen complaints across city wards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 shadow-2xs">
            📍 <span className="text-blue-700 font-extrabold">{filteredIssues.length}</span> Pins Plotted
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search ward or complaint ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Roads">Roads & Potholes</option>
              <option value="Garbage">Garbage & Waste</option>
              <option value="Drainage">Drainage</option>
              <option value="Water">Water Supply</option>
              <option value="Streetlight">Streetlights</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Map & Side List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Map View (2 Cols) */}
        <div className="lg:col-span-2">
          <InteractiveMap
            issues={filteredIssues}
            selectedIssueId={selectedIssueId}
            onSelectIssue={(issue) => setSelectedIssueId(issue.id)}
            height="580px"
          />
        </div>

        {/* Side Issue Selector List (1 Col) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 max-h-[580px] flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Ward Issues ({filteredIssues.length})
            </h3>
            <span className="text-[10px] text-slate-400">Click to locate pin</span>
          </div>

          <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
            {filteredIssues.map((issue) => {
              const isSelected = issue.id === selectedIssueId;
              return (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-200 shadow-xs'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-[10px] font-bold text-slate-600">{issue.id}</span>
                      <PriorityBadge priority={issue.priority} size="sm" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate leading-snug">{issue.title}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">📍 {issue.location.ward}</p>
                    
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/80">
                      <StatusBadge status={issue.status} size="sm" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo(currentRole === 'admin' ? 'admin-issue-details' : 'report-details', issue.id);
                        }}
                        className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
