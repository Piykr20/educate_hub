import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useRedux';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import './App.css';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { CourseList } from './pages/Courses/CourseList';
import { CourseDetail } from './pages/Courses/CourseDetail';
import { StudentDashboard } from './pages/Dashboard/StudentDashboard';
import { InstructorDashboard } from './pages/Dashboard/InstructorDashboard';
import { CourseLearning } from './pages/Learn/CourseLearning';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();

  if (user?.role === 'instructor') {
    return <InstructorDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

// Layout Component
const Layout = ({ children, showFooter = true }) => (
  <>
    <Header />
    <main className="flex-grow-1">{children}</main>
    {showFooter && <Footer />}
  </>
);

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light d-flex flex-column">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout showFooter={false}><Login /></Layout>} />
          <Route path="/register" element={<Layout showFooter={false}><Register /></Layout>} />
          <Route path="/courses" element={<Layout><CourseList /></Layout>} />
          <Route path="/course/:id" element={<Layout><CourseDetail /></Layout>} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout><DashboardRouter /></Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/instructor" 
            element={
              <ProtectedRoute roles={['instructor']}>
                <Layout><InstructorDashboard /></Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/learn/:courseId" 
            element={
              <ProtectedRoute>
                <CourseLearning />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;