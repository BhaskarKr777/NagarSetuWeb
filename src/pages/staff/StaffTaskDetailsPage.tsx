import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MOCK_RESOLUTION_PHOTOS } from '../../data/mockData';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { TimelineVisual } from '../../components/common/TimelineVisual';
import { 
  ArrowLeft, 
  Wrench, 
  CheckCircle2, 
  Camera, 
  Upload, 
  MapPin, 
  Phone, 
  Calendar, 
  Sparkles,
  Save,
  MessageSquare
} from 'lucide-react';

export const StaffTaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedIssueId, getIssueById, updateIssueStatus, addInternalNote, navigateTo, showNotification } = useApp();

  const issue = getIssueById(id || selectedIssueId || 'NS-2026-00124');


  const [resolutionImg, setResolutionImg] = useState<string>(
    issue?.resolutionImageUrl || MOCK_RESOLUTION_PHOTOS[0].url
  );
  const [workNotes, setWorkNotes] = useState<string>(
    issue?.resolutionNote || 'Patching completed with bitumen hot mix, leveled and compacted with vibratory roller.'
  );

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Task Not Found</h2>
        <button onClick={() => navigateTo('staff-dashboard')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          Back to Staff Tasks
        </button>
      </div>
    );
  }

  const handleStartWork = () => {
    updateIssueStatus(issue.id, 'In Progress', 'Field maintenance crew on site with materials');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setResolutionImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkResolved = (e: React.FormEvent) => {
    e.preventDefault();
    updateIssueStatus(
      issue.id,
      'Resolved',
      workNotes,
      resolutionImg
    );
    showNotification(`Task ${issue.id} marked as RESOLVED! Evidence uploaded.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('staff-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assigned Tasks</span>
        </button>

        <StatusBadge status={issue.status} size="lg" />
      </div>

      {/* Task Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold px-3 py-1 bg-slate-900 text-white rounded-lg">
              {issue.id}
            </span>
            <CategoryBadge category={issue.category} />
            <PriorityBadge priority={issue.priority} />
          </div>
          <span className="text-xs text-slate-500">
            Assigned to: <span className="font-bold text-slate-800">{issue.assignedStaff?.name || 'Field Officer'}</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
          {issue.title}
        </h1>

        {/* Location Box with Call Citizen */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Site Location</span>
            <p className="font-bold text-slate-900 text-sm">📍 {issue.location.address}</p>
            {issue.location.landmark && (
              <p className="text-slate-600 mt-0.5 font-medium">Landmark: {issue.location.landmark}</p>
            )}
            <p className="text-blue-700 font-semibold">{issue.location.ward}</p>
          </div>

          <a
            href={`tel:${issue.citizenPhone}`}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shrink-0 shadow-xs"
          >
            <Phone className="w-4 h-4" />
            <span>Call Citizen ({issue.citizenName})</span>
          </a>
        </div>

        {/* 5-Stage Lifecycle Timeline */}
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Resolution Progress
          </span>
          <TimelineVisual currentStatus={issue.status} events={issue.timeline} />
        </div>

        {/* Before Photo */}
        <div>
          <span className="text-xs font-bold text-slate-700 block mb-1.5">Original Citizen Photo (Before)</span>
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-56 bg-slate-100 max-w-md">
            <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Field Staff Action Panel */}
        <div className="pt-6 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              <span>Ground Resolution Action Panel</span>
            </h2>
            {issue.status === 'Assigned' && (
              <button
                onClick={handleStartWork}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4" />
                <span>1. Start Work on Site</span>
              </button>
            )}
          </div>

          {/* Resolution Photo & Submission Form */}
          <form onSubmit={handleMarkResolved} className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                2. Upload Resolution Proof & Complete Job
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                Required for ticket closure
              </span>
            </div>

            {/* Quick Resolution Sample Presets */}
            <div>
              <label className="block text-[11px] font-bold text-emerald-900 mb-1.5">
                Quick Sample Resolution Photo Presets (Click to autofill):
              </label>
              <div className="flex flex-wrap gap-2">
                {MOCK_RESOLUTION_PHOTOS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setResolutionImg(preset.url);
                      setWorkNotes(`Task completed: ${preset.label}. Inspected and certified.`);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold border border-emerald-300 shadow-2xs transition"
                  >
                    ✓ {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload / Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-emerald-300 bg-white rounded-2xl p-5 text-center flex flex-col items-center justify-center cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Camera className="w-8 h-8 text-emerald-600 mb-2" />
                <p className="text-xs font-bold text-slate-800">Upload Resolution Photo</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Click to choose image file from device</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-emerald-300 h-44 bg-slate-100">
                <img src={resolutionImg} alt="Resolution Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold">
                  RESOLUTION EVIDENCE
                </span>
              </div>
            </div>

            {/* Work Notes */}
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Field Supervisor Work Execution Note:
              </label>
              <textarea
                rows={2}
                required
                value={workNotes}
                onChange={(e) => setWorkNotes(e.target.value)}
                placeholder="Describe the materials used and repairs executed..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            {/* Mark Resolved Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Mark as Resolved & Upload Proof</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
