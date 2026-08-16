# NagarSetu (नगरसेतु) 🏛️
### Crowdsourced Civic Issue Reporting & Resolution System
> **Smart India Hackathon (SIH) Project** • *"Connecting Citizens with Smarter, Cleaner and More Responsive Cities."*

---

## 🌟 Overview

**NagarSetu** is a modern, responsive civic-tech web application with a dedicated **Node.js Express backend** that bridges the gap between urban citizens and municipal administrative departments. 

Citizens can report civic issues like potholes, overflowing garbage dumpsters, broken streetlights, water pipeline leakages, and clogged drainage with photographic evidence and geotagging. Municipal authorities can triage, assign, track SLAs, and field staff can upload photographic proof of on-ground resolution.

---

## 🏗️ Architecture: Full-Stack Node.js + React

```
NagarSetuWeb/
├── backend/                  # 🚀 Node.js Express TypeScript Backend Server (Port 5000)
│   ├── src/
│   │   ├── index.ts          # Server entry point, CORS, logging, health check
│   │   ├── db.ts             # File-based database engine with auto-persistence (db.json)
│   │   ├── types.ts          # Backend TypeScript interfaces
│   │   ├── data/             # Seed database with realistic Indian civic grievances
│   │   └── routes/
│   │       ├── issues.ts     # CRUD, upvotes, assignments, status lifecycle, feedback, audit notes
│   │       ├── departments.ts# Municipal wings & staff roster
│   │       └── analytics.ts  # Aggregated KPIs, turnaround hours, SLA breach calculations
│   └── package.json
│
├── src/                      # ⚡ React 19 + TypeScript + Vite + Tailwind CSS Frontend
│   ├── components/common/    # Navbar, Footer, InteractiveMap (Leaflet), Timeline, StatusBadge, Cards
│   ├── context/AppContext.tsx# Unified state store synced with Node.js backend API & localStorage fallback
│   ├── services/api.ts       # Frontend REST API client for backend
│   └── pages/                # Public, Citizen, Admin, and Field Staff portals
│
└── vite.config.ts            # Vite proxy automatically routing /api requests to http://localhost:5000
```

---

## 🚀 Live Demo Personas & Quick Role Switcher

A quick **1-Click Demo Bar** is pinned to the top of the app to switch personas instantly during presentations:

1. **Citizen View (Aarav Sharma - Ward 14 Indiranagar)**:
   - Dashboard with live complaint stats.
   - 30-second issue reporting with camera upload, presets, GPS location, and priority.
   - Visual 5-stage lifecycle tracker: `Reported` → `Under Review` → `Assigned` → `In Progress` → `Resolved`.
   - Before vs After photographic evidence and 5-Star Citizen Rating & Feedback submission.
   - Community Crowdsourced Feed with anti-duplicate upvoting.

2. **Municipal Administrator View (Shreya Deshmukh, IAS - Central HQ)**:
   - Real-time command center with 6 KPI cards (Total, Pending, In Progress, Resolved, High Priority, SLA Breached).
   - Recharts visual analytics (Category pie chart, Status pipeline bar chart, Intake vs Resolution area chart, Department caseloads).
   - Filterable Grievance Table with CSV export.
   - Triage Center: update priority, assign municipal department (Roads, Sanitation, Water, Electrical, Drainage, Public Works), dispatch field staff, and write internal audit logs.
   - Live Spatial GIS Map with priority-colored pins and clickable issue popups.
   - Turnaround time and Ward Satisfaction Leaderboards.

3. **Field Staff View (Ramesh Kumar - Roads Maintenance Crew)**:
   - Ground task queue with urgent tags and citizen contact.
   - One-click `Start Work on Site` (moves status to In Progress).
   - `Upload Resolution Photo` proof and supervisor work execution notes.
   - `Mark Resolved` with instant synchronized status updates.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, TypeScript, tsx, CORS, Multer
- **Frontend Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite with automatic `/api` proxy
- **Styling**: Tailwind CSS v4 (Light-theme-first, accessible, modern civic design)
- **Icons**: Lucide React
- **Interactive Spatial Maps**: Leaflet + OpenStreetMap
- **Data Visualizations**: Recharts
- **Celebration Effects**: Canvas Confetti
- **Data Persistence**: Node.js JSON database (`backend/data/db.json`) + client `localStorage` backup

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- npm

### 2. Installation
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 3. Running Both Frontend & Backend
You can run both in separate terminal windows:

**Terminal 1 (Backend Node Server):**
```bash
npm run dev:backend
# Or: cd backend && npm run dev
# Server starts at: http://localhost:5000
```

**Terminal 2 (Frontend Vite Server):**
```bash
npm run dev
# App starts at: http://localhost:5173
```

The frontend will automatically show the live badge: **`🟢 Node.js API Online (Port 5000)`**.

---

## 📡 Backend REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check & status |
| `GET` | `/api/issues` | Get all issues (supports `?category=`, `?status=`, `?priority=`, `?search=`) |
| `GET` | `/api/issues/:id` | Get issue details by ID (e.g. `NS-2026-00124`) |
| `POST` | `/api/issues` | Create new civic grievance |
| `PATCH` | `/api/issues/:id` | Update issue fields |
| `POST` | `/api/issues/:id/upvote` | Upvote grievance with anti-duplicate validation |
| `POST` | `/api/issues/:id/assign` | Assign department & field staff |
| `POST` | `/api/issues/:id/status` | Update status (`In Progress`, `Resolved`, etc.) & upload photo proof |
| `POST` | `/api/issues/:id/feedback`| Submit citizen 1-5 star rating and comments |
| `POST` | `/api/issues/:id/notes` | Add internal municipal audit remarks |
| `POST` | `/api/issues/reset` | Reset database to initial seed dataset |
| `GET` | `/api/departments` | Get municipal departments |
| `GET` | `/api/staff` | Get field staff roster |
| `GET` | `/api/analytics` | Aggregated KPI analytics & SLA benchmarks |

---

## ☁️ Deployment Instructions

### Full-Stack or Frontend Deployment:
- **Frontend (Vercel / Netlify)**: Push the repository to GitHub. Connect to Vercel/Netlify. Build command: `npm run build`, Publish directory: `dist`.
- **Backend (Render / Railway / Fly.io / AWS EC2)**: Point to the `backend/` folder, run `npm install` and `npm start`.

---

## 🛡️ License & Credits
Built for the **Smart India Hackathon (SIH)** • Crowdsourced Civic Issue Reporting & Resolution System.
