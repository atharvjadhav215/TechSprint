import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Chatbot } from './pages/Chatbot';
import { CropAnalysis } from './pages/CropAnalysis';
import { Community } from './pages/Community';
import { Schemes } from './pages/Schemes';
import { ExpertHelp } from './pages/ExpertHelp';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} /> 
              
              <Route path="/" element={<Layout><Home /></Layout>} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
              <Route path="/dashboard/chatbot" element={<ProtectedRoute><Layout><Chatbot /></Layout></ProtectedRoute>} />
              <Route path="/dashboard/crop-analysis" element={<ProtectedRoute><Layout><CropAnalysis /></Layout></ProtectedRoute>} />
              <Route path="/dashboard/community" element={<ProtectedRoute><Layout><Community /></Layout></ProtectedRoute>} />
              <Route path="/dashboard/schemes" element={<ProtectedRoute><Layout><Schemes /></Layout></ProtectedRoute>} />
              <Route path="/dashboard/experts" element={<ProtectedRoute><Layout><ExpertHelp /></Layout></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
