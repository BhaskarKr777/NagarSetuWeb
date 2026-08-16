import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/common/ToastNotification';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ReportIssuePage } from './pages/citizen/ReportIssuePage';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { ReportDetailsPage } from './pages/citizen/ReportDetailsPage';
import { CommunityPage } from './pages/citizen/CommunityPage';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminIssuesPage } from './pages/admin/AdminIssuesPage';
import { AdminIssueDetailsPage } from './pages/admin/AdminIssueDetailsPage';
import { AdminMapView } from './pages/admin/AdminMapView';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { StaffTaskDetailsPage } from './pages/staff/StaffTaskDetailsPage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderCurrentPage = () => {
    switch (activeTab) {
      // Public
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;

      // Citizen
      case 'citizen-dashboard':
        return <CitizenDashboard />;
      case 'report-issue':
        return <ReportIssuePage />;
      case 'my-reports':
        return <MyReportsPage />;
      case 'report-details':
        return <ReportDetailsPage />;
      case 'community':
        return <CommunityPage />;
      case 'profile':
        return <CitizenProfilePage />;

      // Admin
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-issues':
        return <AdminIssuesPage />;
      case 'admin-issue-details':
        return <AdminIssueDetailsPage />;
      case 'admin-map':
        return <AdminMapView />;
      case 'admin-analytics':
        return <AdminAnalyticsPage />;
      case 'admin-departments':
        return <AdminDepartmentsPage />;

      // Staff
      case 'staff-dashboard':
        return <StaffDashboard />;
      case 'staff-task-details':
        return <StaffTaskDetailsPage />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
