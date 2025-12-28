import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Network, MessageSquare, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/layout/ThemeToggle';
import NeuralBackground from '@/components/shared/NeuralBackground';
import AnimatedCard from '@/components/shared/AnimatedCard';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <NeuralBackground />
      
      {/* Neural grid overlay */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      <div className="relative z-10 px-6 py-8">
        {/* Header with theme toggle */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-semibold text-sm text-muted-foreground">
              ALIS
            </span>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Agentic Learning Intelligence</span>
          </div>
          
          <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            An AI That{' '}
            <span className="text-gradient">Learns How</span>
            <br />
            <span className="text-gradient">You Learn</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A multi-agent system that diagnoses your knowledge gaps, adapts explanations to your style, 
            and builds persistent memory of your learning journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/architecture">
              <Button 
                size="lg" 
                className="group w-full sm:w-auto px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <Network className="mr-2 h-5 w-5" />
                View Architecture
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/chat">
              <Button 
                variant="outline" 
                size="lg"
                className="group w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Try AI Chat
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <AnimatedCard delay={100}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-mono font-semibold text-lg mb-2">Adaptive Understanding</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Multiple specialized agents work together to understand exactly how you learn best.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-mono font-semibold text-lg mb-2">Socratic Dialogue</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Questions that guide discovery rather than just providing answers.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={300}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-mono font-semibold text-lg mb-2">Persistent Memory</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your learning history and progress tracked across sessions.
            </p>
          </AnimatedCard>
        </section>
      </div>
    </div>
  );
};

export default Home;
