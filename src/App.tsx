import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AssignCoordinator from './pages/AssignCoordinator';
import CourseDashboard from './pages/CourseDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import QuizPage from './pages/QuizPage';
import AssignmentView from './pages/AssignmentView'; // Import the new component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCoordinatorLoggedIn, setIsCoordinatorLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsCoordinatorLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? (
            <LearnerDashboard onLogout={handleLogout} />
          ) : isAdminLoggedIn ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : isCoordinatorLoggedIn ? (
            <CoordinatorDashboard onLogout={handleLogout} />
          ) : (
            <LoginPage 
              onLogin={() => setIsLoggedIn(true)} 
              onAdminLogin={() => setIsAdminLoggedIn(true)}
              onCoordinatorLogin={() => setIsCoordinatorLoggedIn(true)}
            />
          )
        } />
        <Route 
          path="/admin/users" 
          element={
            isAdminLoggedIn ? (
              <UserManagement onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/admin/assign-coordinator" 
          element={
            isAdminLoggedIn ? (
              <AssignCoordinator onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/course/:courseName/unit/:unitId" // Made courseName dynamic
          element={
            isLoggedIn ? (
              <CourseDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/quiz"
          element={
            isLoggedIn ? (
              <QuizPage />
            ) : (
              <Navigate to="/" replace />
            )}
        />
         {/* New route for AssignmentView */}
        <Route
          path="/assignment-view"
          element={<AssignmentView />}
        />
      </Routes>
    </Router>
  );
}

export default App;
