import { Issue, DepartmentName, FieldStaffMember, IssueCategory, IssuePriority, IssueStatus } from '../types';

const API_BASE = '/api';

export interface CreateIssuePayload {
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
  citizenName?: string;
  citizenPhone?: string;
  citizenEmail?: string;
  citizenId?: string;
}

export const api = {
  // Check backend server health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch all issues
  async getIssues(params?: { category?: string; status?: string; priority?: string; search?: string }): Promise<Issue[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.status && params.status !== 'All') query.append('status', params.status);
    if (params?.priority && params.priority !== 'All') query.append('priority', params.priority);
    if (params?.search) query.append('search', params.search);

    const url = `${API_BASE}/issues${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch issues');
    const json = await res.json();
    return json.data;
  },

  // Fetch single issue by ID
  async getIssueById(id: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}`);
    if (!res.ok) throw new Error('Failed to fetch issue');
    const json = await res.json();
    return json.data;
  },

  // Create issue
  async createIssue(payload: CreateIssuePayload): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create issue');
    const json = await res.json();
    return json.data;
  },

  // Update issue
  async updateIssue(id: string, updates: Partial<Issue>): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update issue');
    const json = await res.json();
    return json.data;
  },

  // Upvote issue
  async upvoteIssue(id: string, userId: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to upvote');
    }
    const json = await res.json();
    return json.data;
  },

  // Assign department & staff
  async assignIssue(id: string, department: DepartmentName, staffId?: string, actorName?: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department, staffId, actorName })
    });
    if (!res.ok) throw new Error('Failed to assign issue');
    const json = await res.json();
    return json.data;
  },

  // Update status & resolution photo
  async updateStatus(id: string, status: IssueStatus, note?: string, resolutionImageUrl?: string, actorName?: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note, resolutionImageUrl, actorName })
    });
    if (!res.ok) throw new Error('Failed to update status');
    const json = await res.json();
    return json.data;
  },

  // Submit feedback
  async submitFeedback(id: string, rating: number, comment: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    const json = await res.json();
    return json.data;
  },

  // Add internal note
  async addInternalNote(id: string, text: string, author?: string, role?: string): Promise<Issue> {
    const res = await fetch(`${API_BASE}/issues/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author, role })
    });
    if (!res.ok) throw new Error('Failed to add internal note');
    const json = await res.json();
    return json.data;
  },

  // Delete issue
  async deleteIssue(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/issues/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Reset database to initial seed data
  async resetDatabase(): Promise<void> {
    const res = await fetch(`${API_BASE}/issues/reset`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to reset database');
  },

  // Fetch departments & staff
  async getDepartments() {
    const res = await fetch(`${API_BASE}/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments');
    return (await res.json()).data;
  },

  async getStaff(): Promise<FieldStaffMember[]> {
    const res = await fetch(`${API_BASE}/staff`);
    if (!res.ok) throw new Error('Failed to fetch staff');
    return (await res.json()).data;
  },

  // Analytics
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return (await res.json()).data;
  }
};
