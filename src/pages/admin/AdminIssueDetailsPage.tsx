import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  IssueStatus, 
  IssuePriority, 
  IssueCategory, 
  DepartmentName 
} from '../../types';
import { FIELD_STAFF_MEMBERS, MOCK_RESOLUTION_PHOTOS } from '../../data/mockData';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { TimelineVisual } from '../../components/common/TimelineVisual';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  UserCheck, 
  Building2, 
  AlertTriangle, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Clock, 
  Send,
  HardHat,
  Phone,
  ShieldCheck,
  Camera
} from 'lucide-react';

export const AdminIssueDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    selectedIssueId, 
    getIssueById, 
    updateIssue, 
    updateIssueStatus, 
    assignIssue, 
    addInternalNote, 
    navigateTo,
    showNotification 
  } = useApp();

  const issue = getIssueById(id || selectedIssueId || 'NS-2026-00124');


  // Form states
  const [currentStatus, setCurrentStatus] = useState<IssueStatus>(issue?.status || 'Reported');
  const [currentPriority, setCurrentPriority] = useState<IssuePriority>(issue?.priority || 'High');
  const [currentCategory, setCurrentCategory] = useState<IssueCategory>(issue?.category || 'Roads');
  const [currentDepartment, setCurrentDepartment] = useState<DepartmentName>(
    issue?.department || 'Roads & Infrastructure'
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string>(
    issue?.assignedStaff?.id || FIELD_STAFF_MEMBERS[0].id
  );
  const [resolutionNote, setResolutionNote] = useState<string>(issue?.resolutionNote || '');
  const [resolutionImg, setResolutionImg] = useState<string>(
    issue?.resolutionImageUrl || MOCK_RESOLUTION_PHOTOS[0].url
  );
  const [noteText, setNoteText] = useState<string>('');

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Grievance Not Found</h2>
        <button onClick={() => navigateTo('admin-issues')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          Back to Issues Table
        </button>
      </div>
    );
  }

  // Save changes handler
  const handleSaveTriage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Assign department & staff
    assignIssue(issue.id, currentDepartment, selectedStaffId);

    // Update status, category and priority
    updateIssue(issue.id, {
      category: currentCategory,
      priority: currentPriority,
    });

    if (currentStatus !== issue.status) {
      updateIssueStatus(
        issue.id, 
        currentStatus, 
        currentStatus === 'Resolved' ? resolutionNote : `Status changed by Municipal Administrator`,
        currentStatus === 'Resolved' ? resolutionImg : undefined
      );
    }

    showNotification(`Complaint ${issue.id} updated and saved!`, 'success');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addInternalNote(issue.id, noteText.trim());
    setNoteText('');
  };

  // Quick Resolve Helper
  const handleMarkResolvedDirectly = () => {
    setCurrentStatus('Resolved');
    updateIssueStatus(
      issue.id,
      'Resolved',
      resolutionNote || 'Road patch filled and leveled by maintenance team.',
      resolutionImg || MOCK_RESOLUTION_PHOTOS[0].url
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('admin-issues')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Issues Table</span>
        </button>

        <div className="flex items-center gap-2">
          {issue.status !== 'Resolved' && (
            <button
              onClick={handleMarkResolvedDirectly}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Resolved</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Issue Details & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold px-3 py-1 bg-slate-900 text-white rounded-lg">
                  {issue.id}
                </span>
                <CategoryBadge category={issue.category} />
                <PriorityBadge priority={issue.priority} />
              </div>
              <StatusBadge status={issue.status} size="lg" />
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {issue.title}
            </h1>

            {/* Location & Citizen Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Citizen Contact</p>
                <p className="font-bold text-slate-800">{issue.citizenName} ({issue.citizenPhone})</p>
                <p className="text-slate-500 text-[11px]">{issue.citizenEmail}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Grievance Location</p>
                <p className="font-bold text-slate-800">{issue.location.ward}</p>
                <p className="text-slate-500 text-[11px] truncate">{issue.location.address}</p>
              </div>
            </div>

            {/* 5-Stage Lifecycle Timeline */}
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Current Lifecycle Progress
              </span>
              <TimelineVisual currentStatus={issue.status} events={issue.timeline} />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Citizen Photo (Before)</span>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-52 bg-slate-100">
                  <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Resolution Evidence</span>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-52 bg-slate-100 flex items-center justify-center">
                  {issue.resolutionImageUrl ? (
                    <img src={issue.resolutionImageUrl} alt="After" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-slate-400 text-xs">
                      <Camera className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                      <span>Resolution photo will appear once field staff marks resolved.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Grievance Description</span>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {issue.description}
              </p>
            </div>
          </div>

          {/* Internal Municipal Audit Notes Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Internal Municipal Remarks & Audit Trail</span>
            </h3>

            {/* Existing Notes */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {issue.internalNotes && issue.internalNotes.length > 0 ? (
                issue.internalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-bold text-slate-800">{note.author} ({note.role})</span>
                      <span>{note.createdAt}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No internal remarks added yet.</p>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add internal note for field team or dispatch desk..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right 1 Col: Administrator Control Center */}
        <div className="space-y-6">
          
          <form onSubmit={handleSaveTriage} className="bg-white rounded-3xl p-6 border border-blue-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Admin Triage Controls
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Live Update
              </span>
            </div>

            {/* Status Control */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as IssueStatus)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
              >
                <option value="Reported">Reported</option>
                <option value="Under Review">Under Review</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Priority Control */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
              <select
                value={currentPriority}
                onChange={(e) => setCurrentPriority(e.target.value as IssuePriority)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
              >
                <option value="High">High Priority (24h SLA)</option>
                <option value="Medium">Medium (48h SLA)</option>
                <option value="Low">Low (96h SLA)</option>
              </select>
            </div>

            {/* Category Control */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Issue Category</label>
              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value as IssueCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
              >
                <option value="Roads">Roads & Infrastructure</option>
                <option value="Garbage">Garbage & Sanitation</option>
                <option value="Drainage">Drainage</option>
                <option value="Water">Water Supply</option>
                <option value="Streetlight">Electrical & Streetlight</option>
                <option value="Infrastructure">Public Infrastructure</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assign Municipal Department</label>
              <select
                value={currentDepartment}
                onChange={(e) => setCurrentDepartment(e.target.value as DepartmentName)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
              >
                <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Electrical">Electrical</option>
                <option value="Drainage">Drainage</option>
                <option value="Public Works">Public Works</option>
              </select>
            </div>

            {/* Field Staff Assignment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assign Field Staff Officer</label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50"
              >
                {FIELD_STAFF_MEMBERS.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name} — {staff.role} ({staff.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Resolution Fields if Status == Resolved */}
            {currentStatus === 'Resolved' && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <span className="text-[11px] font-bold text-emerald-900 uppercase">Resolution Evidence Input</span>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-800 mb-1">Resolution Remarks</label>
                  <textarea
                    rows={2}
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Describe how the issue was fixed on site..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white font-medium"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Dispatch Changes</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
