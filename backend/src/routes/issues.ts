import { Router, Request, Response } from 'express';
import { db } from '../db.js';
import { Issue, IssueCategory, IssuePriority, IssueStatus, DepartmentName, TimelineEvent, InternalNote } from '../types.js';

export const issuesRouter = Router();

const getIdParam = (req: Request): string => {
  const id = req.params.id;
  return Array.isArray(id) ? id[0] : String(id);
};

// GET /api/issues - Fetch all issues with optional filtering & search
issuesRouter.get('/', (req: Request, res: Response) => {
  try {
    let issues = db.getIssues();

    const { category, status, priority, ward, search, citizenId } = req.query;

    if (category && category !== 'All') {
      issues = issues.filter(i => i.category === category);
    }
    if (status && status !== 'All') {
      issues = issues.filter(i => i.status === status);
    }
    if (priority && priority !== 'All') {
      issues = issues.filter(i => i.priority === priority);
    }
    if (ward) {
      issues = issues.filter(i => i.location.ward.toLowerCase().includes(String(ward).toLowerCase()));
    }
    if (citizenId) {
      issues = issues.filter(i => i.citizenId === citizenId || i.citizenName === 'Aarav Sharma');
    }
    if (search) {
      const q = String(search).toLowerCase();
      issues = issues.filter(i => 
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.address.toLowerCase().includes(q) ||
        i.location.ward.toLowerCase().includes(q) ||
        i.citizenName.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: issues.length, data: issues });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/issues/:id - Fetch single issue
issuesRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }
    res.json({ success: true, data: issue });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues - Create a new issue
issuesRouter.post('/', (req: Request, res: Response) => {
  try {
    const { 
      title, 
      description, 
      category, 
      priority, 
      address, 
      ward, 
      city, 
      landmark, 
      lat, 
      lng, 
      imageUrl,
      citizenName,
      citizenPhone,
      citizenEmail,
      citizenId
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description are required' });
    }

    const allIssues = db.getIssues();
    const nextNumber = allIssues.length + 125;
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

    const hours = priority === 'High' ? 24 : priority === 'Medium' ? 48 : 96;
    const deadline = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

    const newIssue: Issue = {
      id: newId,
      title,
      description,
      category: (category as IssueCategory) || 'Roads',
      priority: (priority as IssuePriority) || 'High',
      status: 'Reported',
      location: {
        address: address || 'Indiranagar 100 Feet Road, Bengaluru',
        ward: ward || 'Ward 14 - Indiranagar',
        city: city || 'Bengaluru',
        lat: Number(lat) || 12.9784,
        lng: Number(lng) || 77.6408,
        landmark: landmark || ''
      },
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      citizenName: citizenName || 'Aarav Sharma',
      citizenPhone: citizenPhone || '+91 98450 11223',
      citizenEmail: citizenEmail || 'aarav.sharma@gmail.com',
      citizenId: citizenId || 'usr-citizen-01',
      createdAt: now,
      updatedAt: now,
      upvotes: 1,
      upvotedBy: [citizenId || 'usr-citizen-01'],
      slaDeadline: deadline,
      isSlaBreached: false,
      timeline: [
        {
          status: 'Reported',
          label: 'Report Submitted by Citizen',
          date: formattedDate,
          actor: citizenName || 'Citizen'
        }
      ],
      internalNotes: []
    };

    const saved = db.createIssue(newIssue);
    res.status(201).json({ success: true, message: 'Issue created successfully', data: saved });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/issues/:id - Update issue fields
issuesRouter.patch('/:id', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const updated = db.updateIssue(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }
    res.json({ success: true, message: 'Issue updated', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/:id/upvote - Upvote with duplicate prevention
issuesRouter.post('/:id/upvote', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const { userId = 'anonymous-user' } = req.body;
    if (issue.upvotedBy.includes(userId)) {
      return res.status(400).json({ success: false, error: 'Already upvoted by this user' });
    }

    const updated = db.updateIssue(issue.id, {
      upvotes: issue.upvotes + 1,
      upvotedBy: [...issue.upvotedBy, userId]
    });

    res.json({ success: true, message: 'Upvoted successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/:id/assign - Assign department & field staff
issuesRouter.post('/:id/assign', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const { department, staffId, actorName = 'Municipal Admin' } = req.body;
    const allStaff = db.getStaff();
    const staff = staffId ? allStaff.find(s => s.id === staffId) : undefined;

    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newTimeline: TimelineEvent = {
      status: 'Assigned',
      label: `Assigned to ${department}`,
      date: formattedDate,
      actor: actorName,
      notes: staff ? `Assigned to Field Officer: ${staff.name} (${staff.role})` : undefined
    };

    const updated = db.updateIssue(issue.id, {
      department: department as DepartmentName,
      assignedStaff: staff || issue.assignedStaff,
      status: issue.status === 'Reported' || issue.status === 'Under Review' ? 'Assigned' : issue.status,
      timeline: [...issue.timeline, newTimeline]
    });

    res.json({ success: true, message: 'Assigned successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/:id/status - Update Status & Resolution Evidence
issuesRouter.post('/:id/status', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const { status, note, resolutionImageUrl, actorName = 'Field Officer' } = req.body;

    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    let eventLabel = `Status changed to ${status}`;
    if (status === 'Under Review') eventLabel = 'Under Municipal Verification';
    if (status === 'In Progress') eventLabel = 'Work In Progress on Site';
    if (status === 'Resolved') eventLabel = 'Issue Marked as Resolved';

    const newTimelineEvent: TimelineEvent = {
      status: status as IssueStatus,
      label: eventLabel,
      date: formattedDate,
      actor: actorName,
      notes: note
    };

    const updates: Partial<Issue> = {
      status: status as IssueStatus,
      timeline: [...issue.timeline, newTimelineEvent]
    };

    if (status === 'Resolved') {
      updates.resolvedAt = new Date().toISOString();
      if (resolutionImageUrl) updates.resolutionImageUrl = resolutionImageUrl;
      if (note) updates.resolutionNote = note;
    }

    const updated = db.updateIssue(issue.id, updates);
    res.json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/:id/feedback - Citizen rating & feedback
issuesRouter.post('/:id/feedback', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const { rating, comment } = req.body;
    const updated = db.updateIssue(issue.id, {
      feedback: {
        rating: Number(rating) || 5,
        comment: comment || 'Issue resolved promptly. Thank you!',
        submittedAt: new Date().toISOString()
      }
    });

    res.json({ success: true, message: 'Feedback submitted', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/:id/notes - Add internal municipal audit note
issuesRouter.post('/:id/notes', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const issue = db.getIssueById(id);
    if (!issue) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }

    const { author = 'Staff', role = 'Admin', text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

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
      author,
      role,
      text,
      createdAt: formattedDate
    };

    const updated = db.updateIssue(issue.id, {
      internalNotes: [...(issue.internalNotes || []), newNote]
    });

    res.json({ success: true, message: 'Internal note saved', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/issues/:id
issuesRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = getIdParam(req);
    const success = db.deleteIssue(id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Issue not found' });
    }
    res.json({ success: true, message: 'Issue deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/issues/reset - Reset database to default 15 demo complaints
issuesRouter.post('/reset', (_req: Request, res: Response) => {
  try {
    const data = db.resetData();
    res.json({ success: true, message: 'Database reset to initial demo complaints', data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
