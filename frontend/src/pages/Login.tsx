import React, { useState } from 'react';
import { Brain, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NeuralBackground from '@/components/shared/NeuralBackground';
import ThemeToggle from '@/components/layout/ThemeToggle';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just proceed
    onLogin();
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <NeuralBackground />
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 mx-auto glow-primary">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-mono text-2xl font-bold text-center">
            <span className="text-gradient">ALIS</span>
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Agentic Learning Intelligence System
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="font-mono text-lg font-semibold mb-1 text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {isSignUp ? 'Start your learning journey' : 'Continue your learning journey'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-secondary border-border"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-secondary border-border"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 font-medium gap-2"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span className="text-primary font-medium">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {[
              'Personalized learning paths',
              'Adaptive AI tutoring',
              'Progress tracking & insights'
            ].map((feature, index) => (
              <div key={feature} className="flex items-center gap-3 justify-center">
                <Sparkles size={14} className="text-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 relative z-10">
        <p className="text-xs text-muted-foreground">
          Built with ❤️ for learners everywhere
        </p>
      </div>
    </div>
  );
};

export default Login;
