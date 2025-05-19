export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}