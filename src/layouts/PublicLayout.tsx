import React from 'react';
import { PublicNavbar } from '../components/navigation/PublicNavbar';
import { PublicFooter } from '../components/navigation/PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <PublicNavbar />
      <main className={`flex-1 pt-16 ${className}`}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};
