import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { notification, showNotification } = useApp();

  if (!notification) return null;

  const config = {
    success: {
      bg: 'bg-emerald-600 text-white shadow-emerald-500/20',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-600 text-white shadow-red-500/20',
      icon: AlertCircle
    },
    info: {
      bg: 'bg-blue-600 text-white shadow-blue-500/20',
      icon: Info
    }
  }[notification.type];

  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl ${config.bg} max-w-md transition-all`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium leading-tight">{notification.message}</span>
        <button 
          onClick={() => showNotification('', 'info')}
          className="ml-auto p-1 text-white/80 hover:text-white rounded-md transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
