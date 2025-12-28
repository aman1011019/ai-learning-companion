import React, { useState } from 'react';
import { Brain, BookOpen, HelpCircle, Database, Settings, ArrowRight, Zap } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import AnimatedCard from '@/components/shared/AnimatedCard';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  role: string;
  responsibility: string;
  interaction: string;
  icon: React.ElementType;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'diagnosis',
    name: 'Learning Diagnosis Agent',
    role: 'Knowledge Gap Analyzer',
    responsibility: 'Identifies what you know vs. what you need to learn through intelligent questioning and assessment.',
    interaction: 'Receives input from user, sends analysis to Adaptation Strategy Agent',
    icon: Brain,
    color: 'text-cyan-400',
  },
  {
    id: 'explanation',
    name: 'Concept Explanation Agent',
    role: 'Adaptive Teacher',
    responsibility: 'Generates personalized explanations based on your current understanding level and learning style.',
    interaction: 'Receives concepts to explain, outputs to user with feedback to Memory Agent',
    icon: BookOpen,
    color: 'text-blue-400',
  },
  {
    id: 'socratic',
    name: 'Socratic Questioning Agent',
    role: 'Guided Discovery',
    responsibility: 'Asks thought-provoking questions that lead you to discover answers yourself.',
    interaction: 'Triggers after explanations, measures understanding depth',
    icon: HelpCircle,
    color: 'text-violet-400',
  },
  {
    id: 'memory',
    name: 'Memory & Progress Agent',
    role: 'Learning Historian',
    responsibility: 'Maintains persistent memory of your learning journey, progress, and mastery levels.',
    interaction: 'Stores all interactions, provides context to other agents',
    icon: Database,
    color: 'text-emerald-400',
  },
  {
    id: 'adaptation',
    name: 'Adaptation Strategy Agent',
    role: 'Learning Orchestrator',
    responsibility: 'Coordinates all agents and dynamically adjusts learning strategies based on your progress.',
    interaction: 'Central hub that routes information between all agents',
    icon: Settings,
    color: 'text-amber-400',
  },
];

const Architecture: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="relative min-h-screen px-6 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-2xl md:text-3xl font-bold mb-1">
            System Architecture
          </h1>
          <p className="text-muted-foreground text-sm">
            Multi-Agent Agentic Learning System
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Visual Connection Diagram */}
      <div className="relative mb-8">
        <AnimatedCard className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Zap size={12} />
              <span>Agent Communication Flow</span>
            </div>
          </div>
          
          {/* Simplified visual representation */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <React.Fragment key={agent.id}>
                  <button
                    onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300',
                      'hover:bg-secondary hover:scale-105',
                      selectedAgent?.id === agent.id && 'bg-secondary ring-2 ring-primary'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      'bg-card border border-border',
                      selectedAgent?.id === agent.id && 'border-primary glow-primary'
                    )}>
                      <Icon className={cn('w-6 h-6', agent.color)} />
                    </div>
                    <span className="text-xs font-medium text-center max-w-[80px] leading-tight">
                      {agent.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </button>
                  {index < agents.length - 1 && (
                    <ArrowRight className="text-primary/40 hidden md:block" size={20} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </AnimatedCard>
      </div>

      {/* Selected Agent Detail */}
      {selectedAgent && (
        <div className="mb-8 animate-scale-in">
          <AnimatedCard className="border-primary/50">
            <div className="flex items-start gap-4">
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center shrink-0',
                'bg-primary/10 border border-primary/30'
              )}>
                <selectedAgent.icon className={cn('w-7 h-7', selectedAgent.color)} />
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-lg mb-1">{selectedAgent.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{selectedAgent.role}</p>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Responsibility
                    </span>
                    <p className="text-sm mt-1">{selectedAgent.responsibility}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Interaction
                    </span>
                    <p className="text-sm mt-1 text-muted-foreground">{selectedAgent.interaction}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {/* Agent Grid */}
      <section>
        <h2 className="font-mono font-semibold text-lg mb-4">All Agents</h2>
        <div className="grid gap-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <AnimatedCard
                key={agent.id}
                delay={index * 100}
                className={cn(
                  'cursor-pointer',
                  selectedAgent?.id === agent.id && 'ring-2 ring-primary'
                )}
              >
                <button
                  onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                      'bg-secondary border border-border'
                    )}>
                      <Icon className={cn('w-6 h-6', agent.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono font-semibold text-sm md:text-base truncate">
                        {agent.name}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm truncate">
                        {agent.role}
                      </p>
                    </div>
                    <ArrowRight className="text-muted-foreground shrink-0" size={18} />
                  </div>
                </button>
              </AnimatedCard>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Architecture;
