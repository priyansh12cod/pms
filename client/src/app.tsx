// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUP/SignUp'; // Use the correct path
import Login from './pages/Login/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound'; // Correct import path
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} /> {/* Ensure this matches the link */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/projects" element={<ProjectManagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
