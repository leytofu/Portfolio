export interface NavLink {
  id: string
  label: string
  url: string
}

export interface Hero {
  name: string
  firstName?: string
  lastName?: string
  role: string
  bio: string
  about?: string
  school?: string
  status?: string
  location: string
  email: string
  avatar: string
}

export interface Stat {
  value: string
  label: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  techStack?: string
  description: string
  tech: string[]
  url: string
  demoUrl?: string
  period: string
  points: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  tag?: string
  points: string[]
}

export interface Education {
  school: string
  title: string
  timeRange: string
  description: string
  url?: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ContactMethod {
  label: string
  value: string
  url: string
}

export interface SocialLink {
  label: string
  username: string
  url: string
}

export interface FooterLink {
  label: string
  url: string
  external?: boolean
}

export interface TechBadge {
  name: string
  color: string
  type: string
}

export interface PortfolioData {
  hero: Hero
  navLinks: NavLink[]
  stats: Stat[]
  featured: string[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  coreTech: TechBadge[]
  contacts: ContactMethod[]
  socialMedia: SocialLink[]
  footer: FooterLink[]
}
