import React from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main content area with bottom padding for nav */}
      <main className="pb-24 max-w-4xl mx-auto">
        {children}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;
