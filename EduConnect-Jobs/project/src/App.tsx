import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { DashboardLayout } from './components/DashboardLayout';
import { StudentDashboard } from './pages/StudentDashboard';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { Jobs } from './pages/Jobs';
import { Profile } from './pages/Profile';
import { AuthGuard } from './components/AuthGuard';
import { useAuthStore } from './store/authStore';

function DashboardRouter() {
  const user = useAuthStore((state) => state.user);
  const DashboardComponent = user?.role === 'employer' ? EmployerDashboard : StudentDashboard;

  return <DashboardComponent />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardRouter />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;