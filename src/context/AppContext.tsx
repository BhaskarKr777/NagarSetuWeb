import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Issue, 
  UserRole, 
  UserProfile, 
  IssueStatus, 
  IssuePriority, 
  IssueCategory, 
  DepartmentName, 
  FieldStaffMember,
  TimelineEvent,
  InternalNote
} from '../types';
import { 
  INITIAL_ISSUES, 
  DEMO_USERS, 
  FIELD_STAFF_MEMBERS 
} from '../data/mockData';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CreateIssueInput {
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  address: string;
  ward: string;
  city?: string;
  lat?: number;
  lng?: number;
  landmark?: string;
  imageUrl: string;
}

interface AppContextType {
  issues: Issue[];
  currentRole: UserRole;
  currentUser: UserProfile;
  activeTab: string;
  selectedIssueId: string | null;
  notification: Notification | null;
  trackQuery: string;
  
  // Navigation
  setActiveTab: (tab: string) => void;
  setSelectedIssueId: (id: string | null) => void;
  navigateTo: (tab: string, issueId?: string) => void;
  setTrackQuery: (query: string) => void;
  
  // Role switcher
  switchRole: (role: UserRole) => void;
  
  // Issue Actions
  createIssue: (input: CreateIssueInput) => Issue;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  upvoteIssue: (id: string) => void;
  assignIssue: (id: string, department: DepartmentName, staffId?: string) => void;
  updateIssueStatus: (
    id: string, 
    status: IssueStatus, 
    note?: string, 
    resolutionImageUrl?: string
  ) => void;
  submitFeedback: (id: string, rating: number, comment: string) => void;
  addInternalNote: (id: string, text: string) => void;
  deleteIssue: (id: string) => void;
  
  // Utility
  getIssueById: (id: string) => Issue | undefined;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  resetToMockData: () => void;
  
  // Stats
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    highPriority: number;
    slaBreached: number;
    resolutionRate: number;
    citizenTotal: number;
    citizenPending: number;
    citizenInProgress: number;
    citizenResolved: number;
    staffAssigned: number;
    staffCompleted: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'nagarsetu_issues_v2';
const USER_KEY = 'nagarsetu_role_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load issues from localStorage or initial mock data
  const [issues, setIssues] = useState<Issue[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading from localStorage', e);
    }
    return INITIAL_ISSUES;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY) as UserRole;
      if (saved && ['citizen', 'admin', 'staff', 'public'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error('Error reading role', e);
    }
    return 'public';
  });

  const [activeTab, setActiveTab] = useState<string>('landing');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [trackQuery, setTrackQuery] = useState<string>('');

  // Persist issues whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [issues]);

  // Persist current role
  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, currentRole);
    } catch (e) {
      console.error('Error saving role', e);
    }
  }, [currentRole]);

  // Current user profile based on active role
  const currentUser: UserProfile = DEMO_USERS[currentRole] || DEMO_USERS.citizen;

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setNotification({ id, type, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const navigateTo = (tab: string, issueId?: string) => {
    if (issueId) {
      setSelectedIssueId(issueId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'citizen') {
      navigateTo('citizen-dashboard');
      showNotification('Switched to Citizen Profile (Aarav Sharma)', 'info');
    } else if (role === 'admin') {
      navigateTo('admin-dashboard');
      showNotification('Switched to Municipal Administrator (Shreya Deshmukh, IAS)', 'info');
    } else if (role === 'staff') {
      navigateTo('staff-dashboard');
      showNotification('Switched to Field Staff Profile (Ramesh Kumar)', 'info');
    } else {
      navigateTo('landing');
    }
  };

  const getIssueById = (id: string) => {
    return issues.find((issue) => issue.id.toLowerCase() === id.toLowerCase());
  };

  // 1. Create a new Issue
  const createIssue = (input: CreateIssueInput): Issue => {
    const nextNumber = issues.length + 125;
    const padded = String(nextNumber).padStart(5, '0');
    const newId = `NS-2026-${padded}`;
    const now = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Calculate SLA deadline (e.g. 48 hours for High, 72 for Med, 96 for Low)
    const hours = input.priority === 'High' ? 24 : input.priority === 'Medium' ? 48 : 96;
    const deadline = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

    const newIssue: Issue = {
      id: newId,
      title: input.title,
      description: input.description,
      category: input.category,
      priority: input.priority,
      status: 'Reported',
      location: {
        address: input.address,
        ward: input.ward || 'Ward 14 - Indiranagar',
        city: input.city || 'Bengaluru',
        lat: input.lat || 12.9716 + (Math.random() - 0.5) * 0.05,
        lng: input.lng || 77.5946 + (Math.random() - 0.5) * 0.05,
        landmark: input.landmark
      },
      imageUrl: input.imageUrl,
      citizenName: currentUser.name || 'Aarav Sharma',
      citizenPhone: currentUser.phone || '+91 98450 11223',
      citizenEmail: currentUser.email || 'aarav.sharma@gmail.com',
      citizenId: currentUser.id || 'usr-citizen-01',
      createdAt: now,
      updatedAt: now,
      upvotes: 1,
      upvotedBy: [currentUser.id || 'usr-citizen-01'],
      slaDeadline: deadline,
      isSlaBreached: false,
      timeline: [
        {
          status: 'Reported',
          label: 'Report Submitted by Citizen',
          date: formattedDate,
          actor: currentUser.name || 'Citizen'
        }
      ],
      internalNotes: []
    };

    setIssues((prev) => [newIssue, ...prev]);
    showNotification(`Complaint ${newId} registered successfully!`, 'success');
    return newIssue;
  };

  // 2. Update issue
  const updateIssue = (id: string, updates: Partial<Issue>) => {
    const now = new Date().toISOString();
    setIssues((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates, updatedAt: now } : item))
    );
  };

  // 3. Upvote issue (prevent repeated upvotes)
  const upvoteIssue = (id: string) => {
    const userId = currentUser.id || 'anonymous-user';
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const alreadyUpvoted = item.upvotedBy.includes(userId);
        if (alreadyUpvoted) {
          showNotification('You have already upvoted this issue', 'info');
          return item;
        }
        showNotification('Upvoted! Civic priority increased.', 'success');
        return {
          ...item,
          upvotes: item.upvotes + 1,
          upvotedBy: [...item.upvotedBy, userId],
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  // 4. Assign issue to Department & Staff
  const assignIssue = (id: string, department: DepartmentName, staffId?: string) => {
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const staff = staffId ? FIELD_STAFF_MEMBERS.find((s) => s.id === staffId) : undefined;
    const now = new Date().toISOString();

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newTimeline: TimelineEvent = {
          status: 'Assigned',
          label: `Assigned to ${department}`,
          date: formattedDate,
          actor: currentUser.name || 'Municipal Admin',
          notes: staff ? `Assigned to Field Officer: ${staff.name} (${staff.role})` : undefined
        };

        return {
          ...item,
          department,
          assignedStaff: staff || item.assignedStaff,
          status: item.status === 'Reported' || item.status === 'Under Review' ? 'Assigned' : item.status,
          updatedAt: now,
          timeline: [...item.timeline, newTimeline]
        };
      })
    );

    showNotification(`Issue assigned to ${department} successfully`, 'success');
  };

  // 5. Update Status (Workflow engine)
  const updateIssueStatus = (
    id: string,
    status: IssueStatus,
    note?: string,
    resolutionImageUrl?: string
  ) => {
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const now = new Date().toISOString();

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        let eventLabel = `Status changed to ${status}`;
        if (status === 'Under Review') eventLabel = 'Under Municipal Verification';
        if (status === 'In Progress') eventLabel = 'Work In Progress on Site';
        if (status === 'Resolved') eventLabel = 'Issue Marked as Resolved';

        const newTimelineEvent: TimelineEvent = {
          status,
          label: eventLabel,
          date: formattedDate,
          actor: currentUser.name || 'Field Officer',
          notes: note
        };

        const updates: Partial<Issue> = {
          status,
          updatedAt: now,
          timeline: [...item.timeline, newTimelineEvent]
        };

        if (status === 'Resolved') {
          updates.resolvedAt = now;
          if (resolutionImageUrl) updates.resolutionImageUrl = resolutionImageUrl;
          if (note) updates.resolutionNote = note;
        }

        return {
          ...item,
          ...updates
        };
      })
    );

    showNotification(`Issue status updated to "${status}"`, 'success');
  };

  // 6. Citizen Feedback
  const submitFeedback = (id: string, rating: number, comment: string) => {
    const now = new Date().toISOString();
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          feedback: {
            rating,
            comment,
            submittedAt: now
          },
          updatedAt: now
        };
      })
    );
    showNotification('Thank you! Your feedback has been recorded.', 'success');
  };

  // 7. Add internal note
  const addInternalNote = (id: string, text: string) => {
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newNote: InternalNote = {
      id: 'note-' + Date.now(),
      author: currentUser.name || 'Staff',
      role: currentUser.role === 'admin' ? 'Administrator' : 'Field Staff',
      text,
      createdAt: formattedDate
    };

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          internalNotes: [...(item.internalNotes || []), newNote],
          updatedAt: new Date().toISOString()
        };
      })
    );
    showNotification('Internal note saved', 'success');
  };

  // 8. Delete Issue
  const deleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((item) => item.id !== id));
    showNotification('Issue removed', 'info');
  };

  // 9. Reset to mock
  const resetToMockData = () => {
    setIssues(INITIAL_ISSUES);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ISSUES));
    } catch (e) {
      console.error(e);
    }
    showNotification('Demo data reset to default 15 civic complaints', 'info');
  };

  // Dynamic Statistics
  const citizenIssues = issues.filter(
    (i) => i.citizenId === currentUser.id || i.citizenEmail === currentUser.email || i.citizenName === 'Aarav Sharma'
  );
  const staffIssues = issues.filter(
    (i) => i.assignedStaff?.id === currentUser.id || i.department === 'Roads & Infrastructure'
  );

  const stats = {
    total: issues.length,
    pending: issues.filter((i) => i.status === 'Reported' || i.status === 'Under Review').length,
    inProgress: issues.filter((i) => i.status === 'Assigned' || i.status === 'In Progress').length,
    resolved: issues.filter((i) => i.status === 'Resolved').length,
    highPriority: issues.filter((i) => i.priority === 'High' && i.status !== 'Resolved').length,
    slaBreached: issues.filter((i) => i.isSlaBreached && i.status !== 'Resolved').length,
    resolutionRate: Math.round((issues.filter((i) => i.status === 'Resolved').length / (issues.length || 1)) * 100),
    citizenTotal: citizenIssues.length,
    citizenPending: citizenIssues.filter((i) => i.status === 'Reported' || i.status === 'Under Review').length,
    citizenInProgress: citizenIssues.filter((i) => i.status === 'Assigned' || i.status === 'In Progress').length,
    citizenResolved: citizenIssues.filter((i) => i.status === 'Resolved').length,
    staffAssigned: staffIssues.filter((i) => i.status !== 'Resolved').length,
    staffCompleted: staffIssues.filter((i) => i.status === 'Resolved').length,
  };

  return (
    <AppContext.Provider
      value={{
        issues,
        currentRole,
        currentUser,
        activeTab,
        selectedIssueId,
        notification,
        trackQuery,
        setActiveTab,
        setSelectedIssueId,
        navigateTo,
        setTrackQuery,
        switchRole,
        createIssue,
        updateIssue,
        upvoteIssue,
        assignIssue,
        updateIssueStatus,
        submitFeedback,
        addInternalNote,
        deleteIssue,
        getIssueById,
        showNotification,
        resetToMockData,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
