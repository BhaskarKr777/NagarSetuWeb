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
    sm: 'text-[11px] px-2.5 py-0.5 gap-1 font-bold',
    md: 'text-xs px-3 py-1 gap-1.5 font-extrabold',
    lg: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2 font-extrabold'
  }[size];

  const config = {
    'Reported': {
      bg: 'bg-[#ECB22E]/15 text-[#9E6A00] border-[#ECB22E]/40',
      icon: Clock,
      label: 'Reported',
      dotColor: 'bg-[#ECB22E] animate-pulse'
    },
    'Under Review': {
      bg: 'bg-[#4A154B]/10 text-[#4A154B] border-[#4A154B]/30',
      icon: Search,
      label: 'Under Review',
      dotColor: 'bg-[#4A154B]'
    },
    'Assigned': {
      bg: 'bg-[#1264A3]/10 text-[#1264A3] border-[#1264A3]/30',
      icon: UserCheck,
      label: 'Assigned',
      dotColor: 'bg-[#1264A3]'
    },
    'In Progress': {
      bg: 'bg-[#36C5F0]/15 text-[#0B698B] border-[#36C5F0]/40',
      icon: Wrench,
      label: 'In Progress',
      dotColor: 'bg-[#36C5F0] animate-spin'
    },
    'Resolved': {
      bg: 'bg-[#007A5A]/10 text-[#007A5A] border-[#007A5A]/30',
      icon: CheckCircle2,
      label: 'Resolved',
      dotColor: 'bg-[#007A5A]'
    }
  }[status] || {
    bg: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: Clock,
    label: status,
    dotColor: 'bg-slate-500'
  };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses} shadow-2xs`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
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
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5 font-extrabold' : 'text-xs px-2.5 py-1 font-extrabold';

  const config = {
    'High': {
      bg: 'bg-[#E01E5A] text-white shadow-2xs',
      icon: Flame,
      label: 'High Priority'
    },
    'Medium': {
      bg: 'bg-[#ECB22E] text-[#1D1C1D] shadow-2xs',
      icon: AlertTriangle,
      label: 'Medium'
    },
    'Low': {
      bg: 'bg-[#F0EDE6] text-slate-700 border border-[#D4CEBF]',
      icon: ShieldAlert,
      label: 'Low'
    }
  }[priority];

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-lg ${config.bg} ${sizeClasses}`}>
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
    'Roads': { icon: Car, bg: 'bg-[#4A154B]/10 text-[#4A154B] border-[#4A154B]/20' },
    'Garbage': { icon: Trash2, bg: 'bg-[#007A5A]/10 text-[#007A5A] border-[#007A5A]/20' },
    'Drainage': { icon: Waves, bg: 'bg-[#1264A3]/10 text-[#1264A3] border-[#1264A3]/20' },
    'Water': { icon: Droplets, bg: 'bg-[#36C5F0]/15 text-[#0B698B] border-[#36C5F0]/30' },
    'Streetlight': { icon: Lightbulb, bg: 'bg-[#ECB22E]/15 text-[#9E6A00] border-[#ECB22E]/30' },
    'Infrastructure': { icon: Building2, bg: 'bg-[#E01E5A]/10 text-[#E01E5A] border-[#E01E5A]/20' },
    'Other': { icon: HelpCircle, bg: 'bg-slate-100 text-slate-700 border-slate-200' },
  }[category] || { icon: HelpCircle, bg: 'bg-slate-100 text-slate-700 border-slate-200' };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${config.bg}`}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{category}</span>
    </span>
  );
};
