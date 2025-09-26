
import type React from 'react';

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface NavLink {
    name: string;
    href: string;
}

export interface SocialLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}
