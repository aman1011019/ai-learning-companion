import React from 'react';
import { User, Award, BookOpen, Clock, TrendingUp, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ThemeToggle from '@/components/layout/ThemeToggle';
import AnimatedCard from '@/components/shared/AnimatedCard';

const learningStats = [
  { label: 'Topics Explored', value: 12, icon: BookOpen },
  { label: 'Hours Learned', value: 24, icon: Clock },
  { label: 'Mastery Level', value: 'Intermediate', icon: Award },
  { label: 'Weekly Streak', value: '5 days', icon: TrendingUp },
];

const recentTopics = [
  { name: 'React Fundamentals', mastery: 75, color: 'hsl(186, 100%, 50%)' },
  { name: 'State Management', mastery: 45, color: 'hsl(156, 80%, 50%)' },
  { name: 'TypeScript Basics', mastery: 60, color: 'hsl(221, 83%, 53%)' },
  { name: 'Component Patterns', mastery: 30, color: 'hsl(280, 80%, 50%)' },
];

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-8 pb-28">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-2xl font-bold">Profile</h1>
        <ThemeToggle />
      </header>

      {/* User Info Card */}
      <AnimatedCard className="p-6 mb-6" delay={0}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-mono text-lg font-semibold">Learner</h2>
            <p className="text-sm text-muted-foreground">learner@example.com</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                Visual Learner
              </span>
              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {learningStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedCard key={stat.label} className="p-4" delay={index * 100}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-mono font-semibold">{stat.value}</p>
                </div>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Learning Progress */}
      <AnimatedCard className="p-6 mb-6" delay={400}>
        <h3 className="font-mono font-semibold mb-4">Learning Progress</h3>
        <div className="space-y-4">
          {recentTopics.map((topic) => (
            <div key={topic.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm">{topic.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{topic.mastery}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${topic.mastery}%`,
                    backgroundColor: topic.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Settings */}
      <AnimatedCard className="p-4 mb-6" delay={500}>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <span>Settings</span>
        </Button>
      </AnimatedCard>

      {/* Logout */}
      <AnimatedCard className="p-4" delay={600}>
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </Button>
      </AnimatedCard>
    </div>
  );
};

export default Profile;
