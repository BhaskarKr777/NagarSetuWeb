import React from 'react';
import { IssueStatus, IssuePriority, IssueCategory } from '../../types';
import { 
  Clock, 
  Search, 
  UserCheck, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  ShieldAlert,
  Car,
  Trash2,
  Waves,
  Droplets,
  Lightbulb,
  Building2,
  HelpCircle
} from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  }[size];

  const config = {
    'Reported': {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Clock,
      label: 'Reported'
    },
    'Under Review': {
      bg: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: Search,
      label: 'Under Review'
    },
    'Assigned': {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: UserCheck,
      label: 'Assigned'
    },
    'In Progress': {
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: Wrench,
      label: 'In Progress'
    },
    'Resolved': {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      label: 'Resolved'
    }
  }[status] || {
    bg: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: Clock,
    label: status
  };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses} transition-colors shadow-xs`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

interface PriorityBadgeProps {
  priority: IssuePriority;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1 font-semibold';

  const config = {
    'High': {
      bg: 'bg-red-50 text-red-700 border-red-200',
      icon: Flame,
      label: 'High Priority'
    },
    'Medium': {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      label: 'Medium'
    },
    'Low': {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: ShieldAlert,
      label: 'Low'
    }
  }[priority];

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${config.bg} ${sizeClasses}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
};

interface CategoryBadgeProps {
  category: IssueCategory;
  showIcon?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, showIcon = true }) => {
  const config = {
    'Roads': { icon: Car, bg: 'bg-orange-50 text-orange-700 border-orange-200' },
    'Garbage': { icon: Trash2, bg: 'bg-lime-50 text-lime-800 border-lime-200' },
    'Drainage': { icon: Waves, bg: 'bg-teal-50 text-teal-800 border-teal-200' },
    'Water': { icon: Droplets, bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    'Streetlight': { icon: Lightbulb, bg: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
    'Infrastructure': { icon: Building2, bg: 'bg-violet-50 text-violet-800 border-violet-200' },
    'Other': { icon: HelpCircle, bg: 'bg-slate-50 text-slate-700 border-slate-200' },
  }[category] || { icon: HelpCircle, bg: 'bg-slate-50 text-slate-700 border-slate-200' };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-xs font-medium ${config.bg}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      <span>{category}</span>
    </span>
  );
};
