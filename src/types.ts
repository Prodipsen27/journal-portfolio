export interface ProfileInfo {
  name: string;
  role: string;
  quote: string;
  status: string;
  location: string;
  experienceYears: string;
  projectsCompleted: string;
  uptime: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  coreMetrics: {
    label: string;
    value: number;
  }[];
  coreTechStack: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    percentage: number;
    description?: string;
  }[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  featured?: boolean;
  date: string;
  caption?: string;
  imageUrl?: string;
  architectureDetails?: string[];
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  sources?: string[];
  thoughtProcess?: string[];
}
