import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Issue, FieldStaffMember, DepartmentName } from './types.js';
import { INITIAL_ISSUES, INITIAL_STAFF_MEMBERS, INITIAL_DEPARTMENTS } from './data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  issues: Issue[];
  staff: FieldStaffMember[];
  departments: typeof INITIAL_DEPARTMENTS;
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error reading db.json, falling back to defaults', err);
    }

    const defaultData: DatabaseSchema = {
      issues: INITIAL_ISSUES,
      staff: INITIAL_STAFF_MEMBERS,
      departments: INITIAL_DEPARTMENTS
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: DatabaseSchema) {
    try {
      this.ensureDataDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to db.json', err);
    }
  }

  public getIssues(): Issue[] {
    return this.data.issues;
  }

  public getIssueById(id: string): Issue | undefined {
    return this.data.issues.find(i => i.id.toLowerCase() === id.toLowerCase());
  }

  public createIssue(issue: Issue): Issue {
    this.data.issues.unshift(issue);
    this.saveData();
    return issue;
  }

  public updateIssue(id: string, updates: Partial<Issue>): Issue | null {
    const idx = this.data.issues.findIndex(i => i.id.toLowerCase() === id.toLowerCase());
    if (idx === -1) return null;

    this.data.issues[idx] = {
      ...this.data.issues[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.issues[idx];
  }

  public deleteIssue(id: string): boolean {
    const prevLen = this.data.issues.length;
    this.data.issues = this.data.issues.filter(i => i.id.toLowerCase() !== id.toLowerCase());
    if (this.data.issues.length !== prevLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  public resetData(): DatabaseSchema {
    this.data = {
      issues: INITIAL_ISSUES,
      staff: INITIAL_STAFF_MEMBERS,
      departments: INITIAL_DEPARTMENTS
    };
    this.saveData();
    return this.data;
  }

  public getStaff(): FieldStaffMember[] {
    return this.data.staff;
  }

  public getDepartments() {
    return this.data.departments;
  }
}

export const db = new Database();
