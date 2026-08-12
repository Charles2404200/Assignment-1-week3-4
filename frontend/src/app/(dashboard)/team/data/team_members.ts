import type { Metadata } from 'next'
import {
  Palette,
  Code2,
  Database,
  ClipboardList,
  ChartNoAxesCombined,
} from 'lucide-react';
import type { TeamMember } from '../types/team_member';

export const metadata: Metadata = {
  title: 'Our Team',
}


export const teamMembers: TeamMember[] = [
  {
    name: 'Tran Viet Anh',
    nickname: 'Vince',
    role: 'UX Designer',
    interests:
      'Product design, software development, AI, and building digital products.',
    initials: 'TV',
    icon: Palette,
  },
  {
    name: 'Anubhav Patra',
    nickname: 'Anub',
    role: 'Developer',
    interests:
      'Software development, advanced computer science, system design, parallel computing, distributed systems, and mathematics.',
    initials: 'AP',
    icon: Code2,
  },
  {
    name: 'Christine Le',
    nickname: 'Christine',
    role: 'Developer',
    interests:
      'Full-stack development, database design, web and app development, and creating automated solutions for repetitive tasks.',
    initials: 'CL',
    icon: Database,
  },
  {
    name: 'Minh Le Anh',
    nickname: 'Charles',
    role: 'Project Manager',
    interests:
      'Java, Spring Boot, and building large-scale systems using multithreading and distributed systems.',
    initials: 'MLA',
    icon: ClipboardList,
  },
  {
    name: 'Viet Nguyen',
    nickname: 'VIP',
    role: 'Business Analyst',
    interests:
      'Requirements analysis, software engineering, and implementing solutions to solve client problems.',
    initials: 'VN',
    icon: ChartNoAxesCombined,
  },
];