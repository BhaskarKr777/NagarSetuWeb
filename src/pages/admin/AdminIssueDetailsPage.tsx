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
  Camera,
  Cpu,
  Sparkles
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
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!issue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center bg-[#F8F6F2]">
        <h2 className="text-xl font-bold text-[#1D1C1D]">Complaint Not Found</h2>
        <p className="text-xs text-[#616061] mt-1">The requested complaint ID does not exist.</p>
        <button
          onClick={() => navigate('/admin/issues')}
          className="mt-4 px-4 py-2 bg-[#4A154B] text-white text-xs font-bold rounded-xl"
        >
          Return to Issues Table
        </button>
      </div>
    );
  }

  const handleSaveTriage = () => {
    setIsSaving(true);
    const assignedStaffMember = FIELD_STAFF_MEMBERS.find((s) => s.id === selectedStaffId);

    setTimeout(() => {
      updateIssue(issue.id, {
        status: currentStatus,
        priority: currentPriority,
        category: currentCategory,
        department: currentDepartment,
        assignedStaff: assignedStaffMember,
        resolutionNote: currentStatus === 'Resolved' ? resolutionNote : issue.resolutionNote,
        resolutionImageUrl: currentStatus === 'Resolved' ? resolutionImg : issue.resolutionImageUrl,
      });

      if (currentStatus !== issue.status) {
        updateIssueStatus(
          issue.id,
          currentStatus,
          `Status updated by Municipal Admin to ${currentStatus}`,
          'Administrator'
        );
      }

      setIsSaving(false);
      showNotification(`Ticket ${issue.id} updated successfully!`, 'success');
    }, 400);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addInternalNote(issue.id, newNote.trim());
    setNewNote('');
    showNotification('Internal audit note recorded', 'info');
  };


  const handleMarkResolvedDirectly = () => {
    setCurrentStatus('Resolved');
    setResolutionImg(MOCK_RESOLUTION_PHOTOS[0].url);
    setResolutionNote('Repairs inspected and validated by Municipal Engineering Cell. Site cleared.');
    updateIssue(issue.id, {
      status: 'Resolved',
      resolutionNote: 'Repairs inspected and validated by Municipal Engineering Cell. Site cleared.',
      resolutionImageUrl: MOCK_RESOLUTION_PHOTOS[0].url,
    });
    updateIssueStatus(issue.id, 'Resolved', 'Marked as resolved by Administrator', 'Administrator');
    showNotification(`Ticket ${issue.id} marked as Resolved!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F8F6F2]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/issues')}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4A484A] hover:text-[#4A154B] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Issues Table</span>
        </button>

        <div className="flex items-center gap-2">
          {issue.status !== 'Resolved' && (
            <button
              onClick={handleMarkResolvedDirectly}
              className="px-4 py-2 bg-[#007A5A] hover:bg-[#006046] text-white text-xs font-black rounded-xl shadow-xs flex items-center gap-1.5 transition cursor-pointer"
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-3 py-1 bg-[#4A154B] text-white rounded-lg">
                  {issue.id}
                </span>
                <CategoryBadge category={issue.category} />
                <PriorityBadge priority={issue.priority} />
              </div>
              <StatusBadge status={issue.status} size="lg" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#1D1C1D]">
              {issue.title}
            </h1>

            {/* AI Smart Triage & SLA Prediction Box */}
            <div className="p-4 bg-[#4A154B]/5 rounded-2xl border border-[#4A154B]/20 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-[#4A154B] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#007A5A]" />
                  <span>SmartAssign AI • Automated Triage Recommendation</span>
                </span>
                <span className="text-[10px] font-black text-[#007A5A] bg-[#007A5A]/10 px-2 py-0.5 rounded">
                  98.4% Match
                </span>
              </div>
              <p className="text-[#4A484A] leading-relaxed">
                Visual & text NLP patterns indicate optimal routing to <strong className="text-[#1D1C1D]">Roads & Infrastructure</strong>. Estimated resolution turnaround: <strong className="text-[#007A5A]">18 hours</strong> (under 24h SLA ceiling).
              </p>
            </div>

            {/* Location & Citizen Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#F8F6F2] rounded-2xl border border-[#EAE8E2] text-xs">
              <div>
                <p className="text-[10px] font-bold text-[#616061] uppercase">Citizen Contact</p>
                <p className="font-bold text-[#1D1C1D]">{issue.citizenName} ({issue.citizenPhone})</p>
                <p className="text-[#616061] text-[11px]">{issue.citizenEmail}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#616061] uppercase">Grievance Location</p>
                <p className="font-bold text-[#1D1C1D]">{issue.location.ward}</p>
                <p className="text-[#616061] text-[11px] truncate">{issue.location.address}</p>
              </div>
            </div>

            {/* 5-Stage Lifecycle Timeline */}
            <div>
              <span className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider block mb-2">
                Current Lifecycle Progress
              </span>
              <TimelineVisual currentStatus={issue.status} events={issue.timeline} />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F0EDE6]">
              <div>
                <span className="text-xs font-extrabold text-[#1D1C1D] block mb-1.5">Citizen Photo (Before)</span>
                <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E2] h-52 bg-[#F8F6F2]">
                  <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <span className="text-xs font-extrabold text-[#1D1C1D] block mb-1.5">Resolution Evidence (After)</span>
                <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E2] h-52 bg-[#F8F6F2] flex items-center justify-center">
                  {issue.resolutionImageUrl ? (
                    <img src={issue.resolutionImageUrl} alt="After" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-[#616061] text-xs">
                      <Camera className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                      <span>Resolution photo will appear once field staff marks resolved.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-extrabold text-[#1D1C1D] block mb-1">Grievance Description</span>
              <p className="text-xs text-[#4A484A] bg-[#F8F6F2] p-3.5 rounded-xl border border-[#EAE8E2] leading-relaxed">
                {issue.description}
              </p>
            </div>
          </div>

          {/* Internal Municipal Audit Notes Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-4">
            <h3 className="text-base font-black text-[#1D1C1D] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#4A154B]" />
              <span>Internal Municipal Audit Log ({issue.internalNotes?.length || 0})</span>
            </h3>

            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {issue.internalNotes && issue.internalNotes.length > 0 ? (
                issue.internalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-[#F8F6F2] rounded-xl border border-[#EAE8E2] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#616061] text-[10px]">
                      <span className="font-bold text-[#1D1C1D]">{note.author}</span>
                      <span>{new Date(note.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                    <p className="text-[#1D1C1D] font-medium">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#616061] italic">No internal notes logged yet.</p>
              )}
            </div>


            <form onSubmit={handleAddNote} className="flex gap-2 pt-2 border-t border-[#F0EDE6]">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add confidential municipal internal note..."
                className="flex-1 px-3 py-2 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4A154B] text-[#1D1C1D]"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-[#4A154B] hover:bg-[#3B113C] disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Post Note
              </button>
            </form>
          </div>

        </div>

        {/* Right 1 Col: Triage & Department Assignment Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0EDE6] pb-3">
              <h3 className="text-base font-black text-[#1D1C1D] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#007A5A]" />
                <span>Action & Triage</span>
              </h3>
              <span className="text-[11px] font-bold text-[#007A5A]">Admin Control</span>
            </div>

            <div className="space-y-4">
              
              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  Update Lifecycle Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as IssueStatus)}
                  className="w-full px-3 py-2.5 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-bold text-[#1D1C1D]"
                >
                  <option value="Reported">Reported</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Assigned">Assigned to Crew</option>
                  <option value="In Progress">In Progress on Ground</option>
                  <option value="Resolved">Resolved & Verified</option>
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  SLA Priority
                </label>
                <select
                  value={currentPriority}
                  onChange={(e) => setCurrentPriority(e.target.value as IssuePriority)}
                  className="w-full px-3 py-2.5 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-bold text-[#1D1C1D]"
                >
                  <option value="High">High (&lt; 24h SLA)</option>
                  <option value="Medium">Medium (48h SLA)</option>
                  <option value="Low">Low (72h SLA)</option>
                </select>
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  Municipal Department
                </label>
                <select
                  value={currentDepartment}
                  onChange={(e) => setCurrentDepartment(e.target.value as DepartmentName)}
                  className="w-full px-3 py-2.5 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-bold text-[#1D1C1D]"
                >
                  <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                  <option value="Solid Waste Management">Solid Waste Management</option>
                  <option value="Water Supply & Sewerage Board">Water Supply & Sewerage Board</option>
                  <option value="Electrical & Street Lighting Wing">Electrical & Street Lighting Wing</option>
                  <option value="Storm Water Drains Department">Storm Water Drains Department</option>
                  <option value="Public Works Department">Public Works Department</option>
                </select>
              </div>

              {/* Staff Member */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
                  Assign Field Officer
                </label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-bold text-[#1D1C1D]"
                >
                  {FIELD_STAFF_MEMBERS.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} — {staff.role} ({staff.activeTasks} tasks)
                    </option>
                  ))}
                </select>
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={handleSaveTriage}
                disabled={isSaving}
                className="w-full py-3.5 bg-[#007A5A] hover:bg-[#006046] text-white font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Apply Triage & Dispatch'}</span>
              </button>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
