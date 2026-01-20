import { LucideIcon } from "lucide-react";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  email?: string;
  website?: string;
}

export interface Developer {
  id: number;
  name: string;
  username: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
  phone?: string;
  skills: string[];
  projects: Project[];
  achievements: string[];
  social: SocialLinks;
  featured: boolean;
  yearsExperience: number;
  location: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: LucideIcon; // Lucide icon component
  iconName?: string; // Icon name as string for server components
}
