import React, { useState, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import { useTheme } from '../../hooks/useTheme';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const active = location.pathname.split('/').pop() || 'profile';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsFolded(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  const mainPaddingClasses = isFolded ? 'md:pl-20' : 'md:pl-64';

  return (
    <div className={`${theme}`}>
      <DashboardNavbar setMobileOpen={setMobileOpen} />

      {/* mobile overlay when sidebar is open - place under sidebar (lower z) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        active={active}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isFolded={isFolded}
        toggleFold={toggleFold}
      />

      <main className={`pt-20 pb-12 transition-all ${mainPaddingClasses} ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <Suspense fallback={
            <div className={theme === 'dark' ? 'bg-gray-900 text-gray-100' : ''}>
              Loading dashboard...
            </div>
          }>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}