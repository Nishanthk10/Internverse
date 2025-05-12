import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AssignCoordinator from './pages/AssignCoordinator';
import PythonCourse from './pages/PythonCourse';
import PythonLab from './pages/PythonLab';
import CoordinatorDashboard from './pages/CoordinatorDashboard';

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
          path="/course/python/unit/:unitId" 
          element={
            isLoggedIn ? (
              <PythonCourse onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/course/python/lab/:unitId" 
          element={
            isLoggedIn ? (
              <PythonLab onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;