import { NavItem, SocialLink } from '../types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { platform: 'Discord', url: 'https://discord.com', icon: 'MessageCircle' }
];