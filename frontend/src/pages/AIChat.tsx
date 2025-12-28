import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, User, Lightbulb, Clock, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'explanation' | 'question' | 'feedback';
}

interface LearningTopic {
  name: string;
  mastery: number;
  lastStudied: Date;
}

const mockResponses = {
  initial: "Hello! I'm ALIS, your Agentic Learning Intelligence System. What topic would you like to explore today? I'll adapt my teaching style to match how you learn best.",
  react: "Great choice! React is a JavaScript library for building user interfaces. Let me first understand your current level.\n\n**Quick diagnostic:** Can you tell me what you already know about components and state management?",
  followUp: "Excellent! Based on your response, I can see you have some foundational knowledge. Let me explain React's core concept differently:\n\nThink of React components like LEGO blocks. Each block (component) can contain other blocks, and they all snap together to build something bigger.\n\n**Socratic Question:** If components are like LEGO blocks, what do you think 'props' might represent in this analogy?",
  mastery: "Your understanding is developing well! I've noted that you respond better to analogy-based explanations.\n\n**Progress Update:**\n- Concept Understanding: +15%\n- We've identified visual learning as your preferred style\n\nShall we dive deeper into state management, or would you like to explore hooks?",
};

const initialTopics: LearningTopic[] = [
  { name: 'React Fundamentals', mastery: 45, lastStudied: new Date() },
  { name: 'State Management', mastery: 30, lastStudied: new Date(Date.now() - 86400000) },
  { name: 'Component Patterns', mastery: 20, lastStudied: new Date(Date.now() - 172800000) },
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: mockResponses.initial,
      timestamp: new Date(),
      type: 'explanation',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [topics, setTopics] = useState<LearningTopic[]>(initialTopics);
  const [overallMastery, setOverallMastery] = useState(32);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = mockResponses.followUp;
      let type: 'explanation' | 'question' | 'feedback' = 'explanation';
      
      if (userMessage.toLowerCase().includes('react') || userMessage.toLowerCase().includes('component')) {
        response = mockResponses.react;
        type = 'question';
      } else if (messages.length > 3) {
        response = mockResponses.mastery;
        type = 'feedback';
        setOverallMastery(prev => Math.min(prev + 8, 100));
        setTopics(prev => prev.map((t, i) => 
          i === 0 ? { ...t, mastery: Math.min(t.mastery + 15, 100), lastStudied: new Date() } : t
        ));
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          type,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-mono font-semibold text-sm">ALIS Chat</h1>
            <p className="text-xs text-muted-foreground">Adaptive Learning Mode</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Progress Panel */}
      <div className="px-6 py-4 border-b border-border bg-secondary/30 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Session Mastery</span>
          <span className="text-xs font-mono text-primary">{overallMastery}%</span>
        </div>
        <Progress value={overallMastery} className="h-2" />
        
        {/* Learning Timeline */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-2">
          {topics.map((topic, index) => (
            <div
              key={topic.name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs whitespace-nowrap"
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: `hsl(${186 - (index * 30)}, 80%, 50%)`,
                  opacity: topic.mastery / 100 + 0.3
                }}
              />
              <span>{topic.name}</span>
              <span className="text-muted-foreground">{topic.mastery}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 animate-slide-up',
              message.role === 'user' && 'flex-row-reverse'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              message.role === 'assistant' 
                ? 'bg-primary/20' 
                : 'bg-secondary'
            )}>
              {message.role === 'assistant' ? (
                <Brain className="w-4 h-4 text-primary" />
              ) : (
                <User className="w-4 h-4 text-foreground" />
              )}
            </div>
            
            <div className={cn(
              'max-w-[85%] rounded-2xl px-4 py-3',
              message.role === 'assistant'
                ? 'bg-card border border-border'
                : 'bg-primary text-primary-foreground'
            )}>
              {message.type && message.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-2">
                  {message.type === 'question' && <Lightbulb size={12} className="text-amber-400" />}
                  {message.type === 'feedback' && <Target size={12} className="text-emerald-400" />}
                  {message.type === 'explanation' && <Sparkles size={12} className="text-primary" />}
                  <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {message.type}
                  </span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock size={10} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-border bg-card/50 backdrop-blur-sm pb-24 shrink-0">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What are you learning today?"
            className="flex-1 bg-secondary border-border focus:border-primary"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="shrink-0 bg-primary hover:bg-primary/90"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          ALIS adapts to your learning style • Memory persists across sessions
        </p>
      </div>
    </div>
  );
};

export default AIChat;
