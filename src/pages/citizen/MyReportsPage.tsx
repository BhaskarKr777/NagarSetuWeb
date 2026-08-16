import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueStatus } from '../../types';
import { IssueCard } from '../../components/common/IssueCard';
import { PlusCircle, Search, Filter, FileText, CheckCircle2, Clock, Wrench } from 'lucide-react';

export const MyReportsPage: React.FC = () => {
  const { currentUser, issues, navigateTo } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get current citizen's reports
  const citizenIssues = issues.filter(
    (i) => i.citizenId === currentUser.id || i.citizenEmail === currentUser.email || i.citizenName === 'Aarav Sharma'
  );

  const filteredIssues = citizenIssues.filter((issue) => {
    const matchesStatus = activeFilter === 'All' ? true : issue.status === activeFilter;
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filterTabs = [
    { label: 'All', count: citizenIssues.length },
    { label: 'Reported', count: citizenIssues.filter(i => i.status === 'Reported').length },
    { label: 'Under Review', count: citizenIssues.filter(i => i.status === 'Under Review').length },
    { label: 'Assigned', count: citizenIssues.filter(i => i.status === 'Assigned').length },
    { label: 'In Progress', count: citizenIssues.filter(i => i.status === 'In Progress').length },
    { label: 'Resolved', count: citizenIssues.filter(i => i.status === 'Resolved').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Submitted Complaints
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time progress, assigned officers, and submit resolution feedback.
          </p>
        </div>

        <button
          onClick={() => navigateTo('report-issue')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Issue</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveFilter(tab.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeFilter === tab.label
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab.label ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by ID, keyword, road..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

        </div>
      </div>

      {/* Reports Grid */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              showUpvote={true}
              onViewDetails={() => navigateTo('report-details', issue.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No matching reports found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || activeFilter !== 'All' 
              ? 'Try changing your search keywords or filter tab.'
              : 'You have not submitted any complaints yet.'}
          </p>
          <button
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
