import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Network, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/architecture', label: 'Architecture', icon: Network },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="max-w-xl mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'nav-item min-w-[72px] transition-all duration-300',
                  isActive && 'active scale-105'
                )}
              >
                <div className={cn(
                  'relative p-2 rounded-xl transition-all duration-300',
                  isActive && 'bg-primary/20'
                )}>
                  <Icon 
                    size={22} 
                    className={cn(
                      'transition-all duration-300',
                      isActive && 'text-primary'
                    )} 
                  />
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-primary/10 animate-ping" style={{ animationDuration: '2s' }} />
                  )}
                </div>
                <span className={cn(
                  'text-xs font-medium transition-all duration-300',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
