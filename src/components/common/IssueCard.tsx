import React from 'react';
import { Issue } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from './StatusBadge';
import { MapPin, ThumbsUp, Calendar, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

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
  const { currentRole, navigateTo, upvoteIssue, currentUser } = useApp();

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      if (currentRole === 'admin') {
        navigateTo('admin-issue-details', issue.id);
      } else if (currentRole === 'staff') {
        navigateTo('staff-task-details', issue.id);
      } else {
        navigateTo('report-details', issue.id);
      }
    }
  };

  const isUpvotedByMe = issue.upvotedBy?.includes(currentUser.id || '');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group hover:border-blue-300">
      
      {/* Image & Badges Header */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={issue.imageUrl}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider shadow-sm">
            {issue.id}
          </span>
          <PriorityBadge priority={issue.priority} size="sm" />
        </div>

        {/* Bottom image overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 text-slate-200 drop-shadow-sm font-medium text-[11px] truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{issue.location.ward}</span>
          </div>
          <StatusBadge status={issue.status} size="sm" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Date */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <CategoryBadge category={issue.category} />
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {new Date(issue.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={handleCardClick}
            className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer mb-1.5 leading-snug"
          >
            {issue.title}
          </h3>

          {/* Description */}
          {!compact && (
            <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {issue.description}
            </p>
          )}

          {/* Assigned Department or Staff Tag */}
          {issue.department && (
            <div className="mb-3 px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Department:</span>
              <span className="text-blue-800 font-semibold truncate max-w-[150px]">{issue.department}</span>
            </div>
          )}

          {/* Resolution Badge if Resolved */}
          {issue.status === 'Resolved' && (
            <div className="mb-3 px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Resolved • Photo Evidence Attached</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          {showUpvote ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                upvoteIssue(issue.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isUpvotedByMe
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isUpvotedByMe ? 'fill-blue-600 text-blue-600' : ''}`} />
              <span>{issue.upvotes}</span>
              <span className="hidden sm:inline text-[11px] font-normal text-slate-500">Upvotes</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              By {issue.citizenName}
            </span>
          )}

          <button
            onClick={handleCardClick}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
