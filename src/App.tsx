import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/common/ToastNotification';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { CommunityPage } from './pages/citizen/CommunityPage';

import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ReportIssuePage } from './pages/citizen/ReportIssuePage';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { ReportDetailsPage } from './pages/citizen/ReportDetailsPage';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';

import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminIssuesPage } from './pages/admin/AdminIssuesPage';
import { AdminIssueDetailsPage } from './pages/admin/AdminIssueDetailsPage';
import { AdminMapView } from './pages/admin/AdminMapView';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';

import { StaffDashboard } from './pages/staff/StaffDashboard';
import { StaffTaskDetailsPage } from './pages/staff/StaffTaskDetailsPage';

// Protected Route Guard for Municipal Admin Pages
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useApp();
  
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2] text-[#1D1C1D] font-sans antialiased">
      <Navbar />
      <ToastNotification />

      
      <main className="flex-1">
        <Routes>
          {/* Public Slugs */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/community" element={<CommunityPage />} />

          {/* Citizen Portal Slugs */}
          <Route path="/citizen" element={<Navigate to="/citizen/dashboard" replace />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/report" element={<ReportIssuePage />} />
          <Route path="/citizen/reports" element={<Navigate to="/citizen/my-reports" replace />} />
          <Route path="/citizen/my-reports" element={<MyReportsPage />} />
          <Route path="/citizen/report/:id" element={<ReportDetailsPage />} />
          <Route path="/citizen/profile" element={<CitizenProfilePage />} />

          {/* Admin Portal Slugs (Protected with ID & Password Login) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/issues" 
            element={
              <ProtectedAdminRoute>
                <AdminIssuesPage />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/issues/:id" 
            element={
              <ProtectedAdminRoute>
                <AdminIssueDetailsPage />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/map" 
            element={
              <ProtectedAdminRoute>
                <AdminMapView />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <ProtectedAdminRoute>
                <AdminAnalyticsPage />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/departments" 
            element={
              <ProtectedAdminRoute>
                <AdminDepartmentsPage />
              </ProtectedAdminRoute>
            } 
          />

          {/* Field Staff Portal Slugs */}
          <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/task/:id" element={<StaffTaskDetailsPage />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
