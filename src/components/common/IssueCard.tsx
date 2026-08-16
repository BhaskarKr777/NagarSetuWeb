import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Issue } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from './StatusBadge';
import { MapPin, ThumbsUp, Calendar, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  showUpvote?: boolean;
  onViewDetails?: () => void;
  compact?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  showUpvote = true,
  onViewDetails,
  compact = false,
}) => {
  const navigate = useNavigate();
  const { currentRole, upvoteIssue, currentUser } = useApp();

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      if (currentRole === 'admin') {
        navigate(`/admin/issues/${issue.id}`);
      } else if (currentRole === 'staff') {
        navigate(`/staff/task/${issue.id}`);
      } else {
        navigate(`/citizen/report/${issue.id}`);
      }
    }
  };

  const isUpvotedByMe = issue.upvotedBy?.includes(currentUser.id || '');

  return (
    <div className="bg-white rounded-2xl border border-[#EAE8E2] shadow-xs hover:shadow-md hover:border-[#4A154B] transition-all duration-200 overflow-hidden flex flex-col group hover:-translate-y-0.5">
      
      {/* Image & Header Overlay */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={issue.imageUrl}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-bold px-2.5 py-1 bg-black/75 text-white rounded-md backdrop-blur-xs shadow-2xs">
            {issue.id}
          </span>
          <PriorityBadge priority={issue.priority} size="sm" />
        </div>

        {/* Ward Chip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 text-[#1D1C1D] rounded-md text-[11px] font-bold backdrop-blur-xs shadow-2xs">
          <MapPin className="w-3 h-3 text-[#4A154B]" />
          <span className="truncate max-w-[170px]">{issue.location.ward}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 cursor-pointer" onClick={handleCardClick}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <CategoryBadge category={issue.category} />
            <StatusBadge status={issue.status} size="sm" />
          </div>

          <h3 className="text-sm font-extrabold text-[#1D1C1D] group-hover:text-[#4A154B] transition-colors line-clamp-1 leading-snug">
            {issue.title}
          </h3>

          <p className="text-xs text-[#616061] mt-1 line-clamp-2 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Footer Meta & Upvote in Slack Style */}
        <div className="pt-3 border-t border-[#F0EDE6] flex items-center justify-between gap-2">
          <div className="text-[11px] text-[#616061] font-medium truncate">
            {issue.department ? (
              <span className="text-[#1D1C1D] font-bold truncate">🏢 {issue.department.split(' ')[0]}</span>
            ) : (
              <span>Reported {new Date(issue.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showUpvote && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  upvoteIssue(issue.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                  isUpvotedByMe
                    ? 'bg-[#1264A3] text-white'
                    : 'bg-[#F8F6F2] hover:bg-[#EAE8E2] text-[#4A484A] border border-[#EAE8E2]'
                }`}
                title="Upvote to escalate priority"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{issue.upvotes}</span>
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#4A154B] hover:bg-[#F8F6F2] transition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
