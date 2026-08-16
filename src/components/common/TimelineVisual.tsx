import React from 'react';
import { IssueStatus, TimelineEvent } from '../../types';
import { CheckCircle2, Clock, Wrench, Search, UserCheck } from 'lucide-react';

interface TimelineVisualProps {
  currentStatus: IssueStatus;
  events?: TimelineEvent[];
}

const STEPS: { status: IssueStatus; label: string; icon: React.FC<{ className?: string }> }[] = [
  { status: 'Reported', label: 'Report Submitted', icon: Clock },
  { status: 'Under Review', label: 'Under Review', icon: Search },
  { status: 'Assigned', label: 'Assigned to Dept', icon: UserCheck },
  { status: 'In Progress', label: 'Work In Progress', icon: Wrench },
  { status: 'Resolved', label: 'Resolved', icon: CheckCircle2 }
];

const STATUS_ORDER: Record<IssueStatus, number> = {
  'Reported': 0,
  'Under Review': 1,
  'Assigned': 2,
  'In Progress': 3,
  'Resolved': 4
};

export const TimelineVisual: React.FC<TimelineVisualProps> = ({ currentStatus, events = [] }) => {
  const currentStepIndex = STATUS_ORDER[currentStatus] ?? 0;

  return (
    <div className="w-full py-4">
      {/* Horizontal Steps on Desktop */}
      <div className="hidden sm:grid sm:grid-cols-5 gap-2 relative">
        {/* Connecting Line Background */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-0" />
        
        {/* Connecting Line Active Fill */}
        <div 
          className="absolute top-5 left-8 h-1 bg-emerald-500 transition-all duration-500 -z-0"
          style={{ 
            width: `${Math.min(100, (currentStepIndex / 4) * 85)}%` 
          }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          const matchedEvent = events.find(e => e.status === step.status);
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center text-center relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200'
                    : isCurrent
                    ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 shadow-md animate-pulse'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span className={`text-xs font-semibold mt-2 ${isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                {step.label}
              </span>
              {matchedEvent && (
                <span className="text-[10px] text-slate-500 mt-0.5 max-w-[120px] truncate">
                  {matchedEvent.date.split(',')[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Vertical Steps on Mobile */}
      <div className="sm:hidden space-y-4 relative pl-6 border-l-2 border-slate-200 ml-3">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const matchedEvent = events.find(e => e.status === step.status);
          const Icon = step.icon;

          return (
            <div key={step.status} className="relative flex items-start gap-3">
              <div 
                className={`absolute -left-[31px] top-0 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 border-blue-600 text-white ring-2 ring-blue-100'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <div>
                <p className={`text-xs font-semibold ${isCurrent ? 'text-blue-700 font-bold' : isCompleted ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {step.label}
                </p>
                {matchedEvent && (
                  <p className="text-[11px] text-slate-500">
                    {matchedEvent.date} {matchedEvent.notes ? `• ${matchedEvent.notes}` : ''}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
