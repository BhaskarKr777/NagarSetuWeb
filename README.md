# NagarSetu (नगरसेतु) 🏛️
### Crowdsourced Civic Issue Reporting & Resolution System
> **Smart India Hackathon (SIH) Project** • *"Connecting Citizens with Smarter, Cleaner and More Responsive Cities."*

---

## 🌟 Overview

**NagarSetu** is a modern, responsive civic-tech web application that bridges the gap between urban citizens and municipal administrative departments. 

Citizens can report civic issues like potholes, overflowing garbage dumpsters, broken streetlights, water pipeline leakages, and clogged drainage with photographic evidence and geotagging. Municipal authorities can triage, assign, track SLAs, and field staff can upload photographic proof of on-ground resolution.

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

- **Frontend Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4 (Light-theme-first, accessible, modern civic design)
- **Icons**: Lucide React
- **Interactive Spatial Maps**: Leaflet + OpenStreetMap
- **Data Visualizations**: Recharts
- **Celebration Effects**: Canvas Confetti
- **Data Persistence**: `localStorage` (Seeded with 15+ realistic Indian municipal complaints)

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### 2. Installation
```bash
# Clone or navigate to the project directory
cd NagarSetuWeb

# Install all dependencies
npm install
```

### 3. Running Locally
```bash
# Start the local Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Building for Production
```bash
# Type check and build optimized static production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `NagarSetuWeb` repository.
4. Framework Preset will automatically detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**! 🚀

### Deploy to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Set Build command: `npm run build`
5. Set Publish directory: `dist`
6. Click **Deploy NagarSetu**!

---

## 🔄 Complete Presentation Demo Flow

1. Open **NagarSetu** homepage.
2. Click **"Report an Issue"** or switch role to **Citizen**.
3. Click a preset (e.g. `Pothole on Road`) or upload an image, select category, add description, and choose priority.
4. Click **"Submit Grievance Report"** to view the confetti celebration and generated ID (e.g. `NS-2026-00140`).
5. Click **"View Report Details & Timeline"** to inspect the 5-stage lifecycle progress.
6. Switch to **Admin** role in the top demo bar.
7. Observe updated KPI statistics on the **Admin Dashboard** and locate the new complaint in the **Urgent Triage Queue**.
8. Open the complaint, assign department to **Roads & Infrastructure** and field staff to **Ramesh Kumar**, then click **Save & Dispatch**.
9. Switch to **Field Staff** role in the top demo bar.
10. Open the assigned task, click **"Start Work on Site"**, select a resolution photo preset (or upload image), and click **"Mark as Resolved & Upload Proof"**.
11. Switch back to **Citizen** role.
12. Notice the issue is marked **Resolved**, inspect the Before vs After photo evidence, and submit a **5-Star Rating & Citizen Feedback**.
13. Visit the **Live Spatial Map** and **Community Feed** to view the resolved ticket pin and upvote community issues.

---

## 🛡️ License & Credits
Built for the **Smart India Hackathon (SIH)** • Crowdsourced Civic Issue Reporting & Resolution System.
