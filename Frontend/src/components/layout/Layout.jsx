import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-body)]">
      <Navbar />

      {/* Remove pt-16 for homepage */}
      <div className={`flex ${isDashboard ? 'pt-20' : ''}`}>
        {isDashboard && <Sidebar />}

        <main className={`flex-1 ${isDashboard ? 'lg:ml-64 p-6' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};