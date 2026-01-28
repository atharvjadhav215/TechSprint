import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sprout, 
  MessageSquare, 
  Users, 
  Landmark, 
  Video,
  Settings
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const links = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('analyze_crop'), path: '/dashboard/crop-analysis', icon: Sprout },
    { name: 'Ask AgriBot', path: '/dashboard/chatbot', icon: MessageSquare },
    { name: t('ask_expert'), path: '/dashboard/experts', icon: Video },
    { name: t('community'), path: '/dashboard/community', icon: Users },
    { name: t('govt_schemes'), path: '/dashboard/schemes', icon: Landmark },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-[#1B2926] border-r border-gray-200 dark:border-gray-800 hidden lg:block overflow-y-auto z-40">
      <div className="p-4 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2">Main Menu</p>
        
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          
          return (
            <NavLink to={link.path} key={link.path}>
              {({ isActive }) => (
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-[var(--color-agro-green)]/10 dark:bg-[var(--color-agro-green)]/20 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative flex items-center px-4 py-3 rounded-xl transition-colors ${isActive ? 'text-[var(--color-agro-green)] font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{link.name}</span>
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-0 right-0 p-4">
        <div className="bg-[var(--color-agro-yellow)]/10 rounded-2xl p-4 border border-[var(--color-agro-yellow)]/20">
          <div className="flex items-center mb-2">
            <span className="bg-[var(--color-agro-yellow)] text-xs font-bold px-2 py-0.5 rounded text-[var(--color-agro-dark)]">PRO</span>
          </div>
          <h4 className="font-bold text-sm mb-1">Expert Access</h4>
          <p className="text-xs text-gray-500 mb-2">Get unlimited video calls with agronomists.</p>
          <button className="text-xs font-semibold text-[var(--color-agro-dark)] hover:underline">Upgrade Now &rarr;</button>
        </div>
      </div>
    </aside>
  );
};
