export type IssueCategory = 
  | 'Roads'
  | 'Garbage'
  | 'Drainage'
  | 'Water'
  | 'Streetlight'
  | 'Infrastructure'
  | 'Other';

export type IssuePriority = 'Low' | 'Medium' | 'High';

export type IssueStatus = 
  | 'Reported'
  | 'Under Review'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export type UserRole = 'citizen' | 'admin' | 'staff' | 'public';

export type DepartmentName = 
  | 'Roads & Infrastructure'
  | 'Sanitation'
  | 'Water Supply'
  | 'Electrical'
  | 'Drainage'
  | 'Public Works';

export interface FieldStaffMember {
  id: string;
  name: string;
  phone: string;
  department: DepartmentName;
  role: string;
  avatar: string;
  activeTasks: number;
}

export interface TimelineEvent {
  status: IssueStatus;
  label: string;
  date: string;
  actor?: string;
  notes?: string;
}

export interface InternalNote {
  id: string;
  author: string;
  role: string;
  text: string;
  createdAt: string;
}

export interface IssueFeedback {
  rating: number;
  comment: string;
  submittedAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  location: {
    address: string;
    ward: string;
    city: string;
    lat: number;
    lng: number;
    landmark?: string;
  };
  imageUrl: string;
  resolutionImageUrl?: string;
  resolutionNote?: string;
  resolvedAt?: string;
  department?: DepartmentName;
  assignedStaff?: FieldStaffMember;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  citizenId: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  upvotedBy: string[];
  slaDeadline: string;
  isSlaBreached: boolean;
  feedback?: IssueFeedback;
  timeline: TimelineEvent[];
  internalNotes: InternalNote[];
}
