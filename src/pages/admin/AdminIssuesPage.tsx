import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  ArrowUpDown, 
  Layers, 
  Calendar, 
  MapPin, 
  Eye, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const AdminIssuesPage: React.FC = () => {
  const navigate = useNavigate();
  const { issues } = useApp();


  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filter logic
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.ward.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || issue.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || issue.priority === selectedPriority;
    const matchesDepartment = selectedDepartment === 'All' || issue.department === selectedDepartment;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesDepartment;
  });

  // Export to CSV helper
  const handleExportCSV = () => {
    const headers = ['Complaint ID', 'Title', 'Category', 'Priority', 'Status', 'Ward', 'Address', 'Department', 'Citizen Name', 'Created At'];
    const rows = filteredIssues.map(i => [
      i.id,
      `"${i.title.replace(/"/g, '""')}"`,
      i.category,
      i.priority,
      i.status,
      `"${i.location.ward}"`,
      `"${i.location.address.replace(/"/g, '""')}"`,
      i.department || 'Unassigned',
      `"${i.citizenName}"`,
      i.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NagarSetu_Grievances_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Municipal Issues & Grievances Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete database of crowdsourced citizen complaints across all wards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Advanced Multi-Filter Control Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Search & Counts */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by ID, keyword, address, citizen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <span className="text-xs font-bold text-slate-600 self-start md:self-auto">
            Showing <span className="text-blue-700 font-extrabold">{filteredIssues.length}</span> of {issues.length} complaints
          </span>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Roads">Roads & Potholes</option>
              <option value="Garbage">Garbage & Sanitation</option>
              <option value="Drainage">Drainage</option>
              <option value="Water">Water Supply</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Under Review">Under Review</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Roads & Infrastructure">Roads & Infrastructure</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electrical">Electrical</option>
              <option value="Drainage">Drainage</option>
              <option value="Public Works">Public Works</option>
            </select>
          </div>

        </div>

      </div>

      {/* Full Issues Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 pl-4">ID</th>
                <th className="py-3.5">Issue Details</th>
                <th className="py-3.5">Category</th>
                <th className="py-3.5">Ward</th>
                <th className="py-3.5">Priority</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Department</th>
                <th className="py-3.5">Date</th>
                <th className="py-3.5 text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr 
                    key={issue.id} 
                    className="hover:bg-slate-50 transition cursor-pointer group"
                    onClick={() => navigate(`/admin/issues/${issue.id}`)}
                  >
                    {/* ID */}
                    <td className="py-3.5 pl-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {issue.id}
                    </td>

                    {/* Thumbnail + Title */}
                    <td className="py-3.5 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={issue.imageUrl}
                          alt={issue.title}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition">
                            {issue.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            By {issue.citizenName} • {issue.location.address}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 whitespace-nowrap">
                      <CategoryBadge category={issue.category} />
                    </td>

                    {/* Ward */}
                    <td className="py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {issue.location.ward.split('-')[0]}
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 whitespace-nowrap">
                      <PriorityBadge priority={issue.priority} size="sm" />
                    </td>

                    {/* Status */}
                    <td className="py-3.5 whitespace-nowrap">
                      <StatusBadge status={issue.status} size="sm" />
                    </td>

                    {/* Department */}
                    <td className="py-3.5 text-slate-700 font-medium whitespace-nowrap">
                      {issue.department ? (
                        <span className="text-slate-800 font-semibold">{issue.department}</span>
                      ) : (
                        <span className="text-amber-600 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 text-slate-500 whitespace-nowrap text-[11px]">
                      {new Date(issue.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 text-right pr-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/issues/${issue.id}`);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] transition shadow-2xs inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))

              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No complaints match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
