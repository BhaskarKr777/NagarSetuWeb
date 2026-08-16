import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const departmentsRouter = Router();

// GET /api/departments
departmentsRouter.get('/departments', (_req: Request, res: Response) => {
  try {
    const departments = db.getDepartments();
    res.json({ success: true, data: departments });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/staff
departmentsRouter.get('/staff', (_req: Request, res: Response) => {
  try {
    const staff = db.getStaff();
    res.json({ success: true, data: staff });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
