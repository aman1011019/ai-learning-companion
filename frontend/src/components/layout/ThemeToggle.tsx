import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-14 h-8 rounded-full p-1 transition-all duration-500',
        'bg-secondary border border-border',
        'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50'
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={cn(
          'absolute top-1 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center',
          'bg-primary shadow-lg',
          theme === 'dark' ? 'left-7' : 'left-1'
        )}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-primary-foreground" />
        ) : (
          <Sun size={14} className="text-primary-foreground" />
        )}
      </div>
      
      {/* Background icons */}
      <div className="flex items-center justify-between px-1 h-full">
        <Sun size={12} className={cn(
          'transition-opacity duration-300',
          theme === 'light' ? 'opacity-0' : 'opacity-40'
        )} />
        <Moon size={12} className={cn(
          'transition-opacity duration-300',
          theme === 'dark' ? 'opacity-0' : 'opacity-40'
        )} />
      </div>
    </button>
  );
};

export default ThemeToggle;
