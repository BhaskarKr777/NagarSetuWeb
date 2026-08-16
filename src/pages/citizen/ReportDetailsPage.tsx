import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../../components/common/StatusBadge';
import { TimelineVisual } from '../../components/common/TimelineVisual';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Phone, 
  CheckCircle2, 
  Star, 
  ThumbsUp, 
  Share2, 
  ShieldAlert,
  Clock,
  Building2,
  HardHat,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ReportDetailsPage: React.FC = () => {
  const { selectedIssueId, getIssueById, navigateTo, submitFeedback, upvoteIssue, currentUser } = useApp();

  const issue = getIssueById(selectedIssueId || 'NS-2026-00124');

  // Feedback form state
  const [rating, setRating] = useState<number>(issue?.feedback?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(issue?.feedback?.comment || '');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(!!issue?.feedback);

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Complaint Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested complaint ID does not exist.</p>
        <button
          onClick={() => navigateTo('my-reports')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Back to My Reports
        </button>
      </div>
    );
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(issue.id, rating, comment);
    setFeedbackSubmitted(true);
  };

  const isUpvoted = issue.upvotedBy?.includes(currentUser.id || '');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('my-reports')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reports</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => upvoteIssue(issue.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              isUpvoted
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-blue-600 text-blue-600' : ''}`} />
            <span>{issue.upvotes} Upvotes</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="p-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-xs transition"
            title="Share Grievance"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Issue Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-extrabold px-3 py-1 bg-slate-900 text-white rounded-lg">
              {issue.id}
            </span>
            <CategoryBadge category={issue.category} />
            <PriorityBadge priority={issue.priority} />
          </div>

          <StatusBadge status={issue.status} size="lg" />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
          {issue.title}
        </h1>

        {/* Key Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Ward / Zone</p>
              <p className="font-bold text-slate-800 truncate">{issue.location.ward}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Department</p>
              <p className="font-bold text-slate-800 truncate">{issue.department || 'Under Triage'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Reported On</p>
              <p className="font-bold text-slate-800">
                {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* 5-Stage Visual Timeline */}
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Grievance Resolution Lifecycle
          </h3>
          <TimelineVisual currentStatus={issue.status} events={issue.timeline} />
        </div>

        {/* Photos & Description Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Issue Photo */}
          <div>
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Citizen Photo Evidence
            </span>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 shadow-inner">
              <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold">
                BEFORE FIX
              </span>
            </div>
          </div>

          {/* Description & Address Details */}
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grievance Description
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {issue.description}
              </p>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Precise Location
              </span>
              <p className="text-xs text-slate-700 font-medium">
                📍 {issue.location.address}
              </p>
              {issue.location.landmark && (
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Landmark: {issue.location.landmark}
                </p>
              )}
            </div>

            {/* Assigned Field Officer Card */}
            {issue.assignedStaff && (
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={issue.assignedStaff.avatar}
                    alt={issue.assignedStaff.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Assigned Field Officer</span>
                    <p className="text-xs font-extrabold text-slate-900">{issue.assignedStaff.name}</p>
                    <p className="text-[11px] text-slate-500">{issue.assignedStaff.role}</p>
                  </div>
                </div>
                <a
                  href={`tel:${issue.assignedStaff.phone}`}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition"
                  title="Contact Field Officer"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 2. RESOLUTION EVIDENCE & BEFORE-AFTER COMPARISON (If In Progress or Resolved) */}
      {issue.status === 'Resolved' && (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-emerald-950">Ground Resolution Evidence</h2>
              <p className="text-xs text-emerald-700">Verified and sealed by municipal field team</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before vs After */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-emerald-900">Photographic Proof:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-xl overflow-hidden border border-emerald-200 h-44">
                  <img src={issue.imageUrl} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold">BEFORE</span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-emerald-300 h-44">
                  <img src={issue.resolutionImageUrl || issue.imageUrl} alt="Resolved" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">AFTER RESOLUTION</span>
                </div>
              </div>
            </div>

            {/* Field Resolution Notes */}
            <div className="space-y-3 flex flex-col justify-between">
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Field Supervisor Work Report</span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {issue.resolutionNote || 'The municipal repair crew was dispatched with materials. Task completed in accordance with municipal quality specifications.'}
                </p>
                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  Resolved by: {issue.assignedStaff?.name || 'Department Supervisor'} • {issue.resolvedAt ? new Date(issue.resolvedAt).toLocaleString('en-IN') : 'Recently'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. CITIZEN FEEDBACK FORM */}
          <div className="pt-4 border-t border-emerald-200/80">
            <h3 className="text-sm font-extrabold text-emerald-950 mb-1">
              Citizen Satisfaction Feedback
            </h3>
            <p className="text-xs text-emerald-800 mb-4">
              Please rate the promptness and quality of this municipal resolution.
            </p>

            {feedbackSubmitted && issue.feedback ? (
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= (issue.feedback?.rating || 5)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-2">
                    {issue.feedback.rating} out of 5 Stars
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  "{issue.feedback.comment}"
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold pt-1">
                  ✓ Feedback recorded in Municipal Performance Index. Thank you for making our city better!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="bg-white p-5 rounded-2xl border border-emerald-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Overall Rating (1 to 5 Stars):</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-300 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {rating === 5 ? '⭐⭐⭐⭐⭐ Excellent' : rating === 4 ? '⭐⭐⭐⭐ Good' : rating === 3 ? '⭐⭐⭐ Average' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Citizen Remarks & Comments:</label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="e.g. Very fast response by the road department! Good job."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Feedback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. ACTIVITY LOG & AUDIT TIMELINE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Detailed Audit Activity Log</span>
        </h3>

        <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 ml-2">
          {issue.timeline.map((event, idx) => (
            <div key={idx} className="relative pl-3">
              <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
              <div>
                <p className="text-xs font-bold text-slate-800">{event.label}</p>
                <p className="text-[11px] text-slate-500">{event.date} {event.actor ? `• Action by: ${event.actor}` : ''}</p>
                {event.notes && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
                    {event.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
