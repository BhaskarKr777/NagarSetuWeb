import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MOCK_RESOLUTION_PHOTOS } from '../../data/mockData';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { TimelineVisual } from '../../components/common/TimelineVisual';
import { verifyResolutionProof, ResolutionVerificationResult } from '../../services/aiService';
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
  MessageSquare,
  Cpu,
  ShieldCheck
} from 'lucide-react';

export const StaffTaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedIssueId, getIssueById, updateIssueStatus, addInternalNote, showNotification } = useApp();

  const issue = getIssueById(id || selectedIssueId || 'NS-2026-00124');

  const [resolutionImg, setResolutionImg] = useState<string>(
    issue?.resolutionImageUrl || MOCK_RESOLUTION_PHOTOS[0].url
  );
  const [workNotes, setWorkNotes] = useState<string>(
    issue?.resolutionNote || 'Patching completed with bitumen hot mix, leveled and compacted with vibratory roller.'
  );
  const [isVerifyingAi, setIsVerifyingAi] = useState(false);
  const [aiProofVerdict, setAiProofVerdict] = useState<ResolutionVerificationResult | null>(null);

  useEffect(() => {
    if (resolutionImg && issue) {
      setIsVerifyingAi(true);
      verifyResolutionProof(issue.imageUrl, resolutionImg, issue.category).then((res) => {
        setAiProofVerdict(res);
        setIsVerifyingAi(false);
      });
    }
  }, [resolutionImg, issue]);

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center bg-[#F8F6F2]">
        <h2 className="text-xl font-bold text-[#1D1C1D]">Task Not Found</h2>
        <button onClick={() => navigate('/staff/dashboard')} className="mt-4 px-4 py-2 bg-[#4A154B] text-white rounded-xl text-xs font-bold">
          Back to Staff Tasks
        </button>
      </div>
    );
  }

  const handleStartWork = () => {
    updateIssueStatus(issue.id, 'In Progress', 'Field maintenance crew on site with equipment and raw materials');
    showNotification('Status updated to In Progress on ground', 'info');
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

  const handleMarkResolved = () => {
    updateIssueStatus(
      issue.id,
      'Resolved',
      `Task completed by Field Officer. Note: ${workNotes}`,
      'Field Crew Lead'
    );
    showNotification(`Task ${issue.id} marked as Resolved with AI photo verification!`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F8F6F2]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/staff/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4A484A] hover:text-[#4A154B] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Field Tasks Queue</span>
        </button>
      </div>

      {/* Task Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE8E2] shadow-xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EDE6] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-3 py-1 bg-[#4A154B] text-white rounded-lg">
              {issue.id}
            </span>
            <CategoryBadge category={issue.category} />
            <PriorityBadge priority={issue.priority} />
          </div>
          <StatusBadge status={issue.status} size="lg" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1D1C1D]">
            {issue.title}
          </h1>
          <p className="text-xs text-[#616061] mt-1 font-medium">📍 {issue.location.ward} • {issue.location.address}</p>
        </div>

        {/* Action Controls based on Status */}
        <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#EAE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold text-[#1D1C1D]">Field Execution Status</p>
            <p className="text-[11px] text-[#616061]">Assigned Ward Officer: Er. Ramesh Kumar</p>
          </div>

          <div className="flex items-center gap-2">
            {issue.status === 'Assigned' && (
              <button
                type="button"
                onClick={handleStartWork}
                className="px-5 py-2.5 bg-[#4A154B] hover:bg-[#3B113C] text-white text-xs font-black rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Mark Arrived & Start Work</span>
              </button>
            )}

            {issue.status !== 'Resolved' && (
              <button
                type="button"
                onClick={handleMarkResolved}
                className="px-5 py-2.5 bg-[#007A5A] hover:bg-[#006046] text-white text-xs font-black rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Resolution & Close Ticket</span>
              </button>
            )}
          </div>
        </div>

        {/* AI ProofVision Resolution Visual Comparison */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#1D1C1D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E01E5A]" />
              <span>ProofVision AI • Before vs After Photo Proof</span>
            </h3>
            {aiProofVerdict && (
              <span className="text-[10px] font-black text-[#007A5A] bg-[#007A5A]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{aiProofVerdict.matchScore}% Match Validated</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#1D1C1D] block mb-1">Citizen Reported Photo (Before)</span>
              <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E2] h-52 bg-[#F8F6F2]">
                <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#E01E5A] text-white text-[10px] font-bold">
                  ORIGINAL DEFECT
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-extrabold text-[#1D1C1D] block mb-1">Resolution Evidence (After)</span>
              <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E2] h-52 bg-[#F8F6F2]">
                <img src={resolutionImg} alt="After" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#007A5A] text-white text-[10px] font-bold">
                  COMPLETED WORK
                </span>
                <label className="absolute top-2 right-2 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold rounded-lg cursor-pointer backdrop-blur-xs">
                  Change Photo
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* AI Verdict Banner */}
          {aiProofVerdict && (
            <div className="p-3.5 bg-[#007A5A]/5 rounded-2xl border border-[#007A5A]/20 flex items-start gap-2.5 text-xs">
              <Cpu className="w-4 h-4 text-[#007A5A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#007A5A]">AI ProofVision Validation Passed</p>
                <p className="text-[#4A484A] mt-0.5">{aiProofVerdict.aiVerdict}</p>
              </div>
            </div>
          )}

          {/* Quick Demo Resolution Presets */}
          <div>
            <span className="text-[11px] font-bold text-[#616061] block mb-1.5">Preset Completion Photos:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {MOCK_RESOLUTION_PHOTOS.map((photo) => (
                <button
                  key={photo.url}
                  type="button"
                  onClick={() => setResolutionImg(photo.url)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                    resolutionImg === photo.url ? 'border-[#007A5A] ring-2 ring-[#007A5A]/30' : 'border-[#EAE8E2] opacity-75 hover:opacity-100'
                  }`}
                  title={photo.label}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                </button>
              ))}

            </div>
          </div>
        </div>

        {/* Work Execution Notes */}
        <div className="space-y-2 pt-2 border-t border-[#F0EDE6]">
          <label className="text-xs font-extrabold text-[#1D1C1D] uppercase tracking-wider">
            Work Execution Summary / Field Notes
          </label>
          <textarea
            rows={3}
            value={workNotes}
            onChange={(e) => setWorkNotes(e.target.value)}
            placeholder="Document materials used, crew size, and final clearance status..."
            className="w-full px-4 py-3 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#4A154B] text-[#1D1C1D]"
          />
        </div>

      </div>

    </div>
  );
};
