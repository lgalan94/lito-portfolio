
import React from 'react';
import type { Skill, Project, ExperienceItem, SocialLink, NavLink } from './types';

// SVG Icons for Skills
const SiReact = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#61DAFB]"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 4.625c-1.932 0-3.5 1.568-3.5 3.5s1.568 3.5 3.5 3.5 3.5-1.568 3.5-3.5-1.568-3.5-3.5-3.5zm0 5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z"/><path d="M12 11.5c-4.136 0-7.5 2.019-7.5 4.5s3.364 4.5 7.5 4.5 7.5-2.019 7.5-4.5-3.364-4.5-7.5-4.5zm0 7c-3.033 0-5.5-1.121-5.5-2.5s2.467-2.5 5.5-2.5 5.5 1.121 5.5 2.5-2.467 2.5-5.5 2.5z" transform="rotate(30 12 12)"/><path d="M12 11.5c-4.136 0-7.5 2.019-7.5 4.5s3.364 4.5 7.5 4.5 7.5-2.019 7.5-4.5-3.364-4.5-7.5-4.5zm0 7c-3.033 0-5.5-1.121-5.5-2.5s2.467-2.5 5.5-2.5 5.5 1.121 5.5 2.5-2.467 2.5-5.5 2.5z" transform="rotate(90 12 12)"/><path d="M12 11.5c-4.136 0-7.5 2.019-7.5 4.5s3.364 4.5 7.5 4.5 7.5-2.019 7.5-4.5-3.364-4.5-7.5-4.5zm0 7c-3.033 0-5.5-1.121-5.5-2.5s2.467-2.5 5.5-2.5 5.5 1.121 5.5 2.5-2.467 2.5-5.5 2.5z" transform="rotate(-30 12 12)"/></svg>;
const SiTypescript = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#3178C6]"><path d="M2 2h20v20H2z" fill="#3178C6"/><path d="M14.5 15.2h-1.7l-1-2.8h-3.6l-1 2.8H5.5L10 6.8h2.3zm-3.1-4.3L10 7.8l-1.4 3.1z" fill="#fff"/></svg>;
const SiNodedotjs = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#339933]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.59L8.71 16.3a.5.5 0 01.35-.85H11v-4H8.71a.5.5 0 01-.35-.85L11 9.41V4h2v5.41l2.29 1.28a.5.5 0 01.35.85H13v4h2.29a.5.5 0 01.35.85L13 17.59V20h-2v-2.41z"/></svg>;
const SiTailwindcss = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#06B6D4]"><path d="M12.001 4.8c-3.037 0-5.5 2.463-5.5 5.5s2.463 5.5 5.5 5.5 5.5-2.463 5.5-5.5-2.463-5.5-5.5-5.5zm-5.5 11c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.381 0 .741.087 1.066.241A5.47 5.47 0 0012.001 12a5.47 5.47 0 004.435-2.259c.325-.154.685-.241 1.066-.241 1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5c-.381 0-.741-.087-1.066-.241A5.47 5.47 0 0012.001 12a5.47 5.47 0 00-4.435 2.259c-.325.154-.685.241-1.066.241z"/></svg>;
const SiGit = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#F05032]"><path d="M22.83 9.44l-3.27-3.27A2 2 0 0018.14 6H16v2h2.14l3.27 3.27-3.27 3.27H16v2h2.14a2 2 0 001.42-.59l3.27-3.27a2 2 0 000-2.82zM12 18H5.86L2.59 14.73a2 2 0 010-2.82L5.86 8.64a2 2 0 011.42-.59H10V6H7.28a2 2 0 00-1.42.59L2.59 9.86a2 2 0 000 2.82l3.27 3.27A2 2 0 007.28 16H10v2h2z"/><circle cx="12" cy="12" r="2"/></svg>;

// SVG Icons for Socials
const SiGithub = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const SiLinkedin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

export const SKILLS: { [key: string]: Skill[] } = {
  "Frontend": [
    { name: "React", icon: <SiReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  ],
  "Backend": [
    { name: "Node.js", icon: <SiNodedotjs /> },
  ],
  "Tools & Other": [
    { name: "Git", icon: <SiGit /> },
    { name: "Gemini API", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.59 15.41a1 1 0 01-1.42 0l-4.24-4.24a1 1 0 010-1.42l4.24-4.24a1 1 0 111.42 1.42L9.05 12l3.54 3.54a1 1 0 010 1.42zm4.83-1.18a.5.5 0 00.7-.7l-2.12-2.12a.5.5 0 00-.7 0l-2.13 2.12a.5.5 0 00.7.7L15 13.94l2.42 2.42z"/></svg> },
  ]
};

export const PROJECTS: Project[] = [
  {
    title: "Project Alpha",
    description: "A full-stack e-commerce platform built with React, Node.js, and a serverless architecture for scalability and performance.",
    image: "https://picsum.photos/seed/alpha/600/400",
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Project Beta",
    description: "An interactive data visualization dashboard for analyzing real-time market trends, using D3.js and WebSockets.",
    image: "https://picsum.photos/seed/beta/600/400",
    tags: ["React", "D3.js", "WebSockets"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Project Gamma",
    description: "A collaborative project management tool with features like Kanban boards, real-time chat, and file sharing.",
    image: "https://picsum.photos/seed/gamma/600/400",
    tags: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
    {
    title: "Project Delta",
    description: "A server-side rendered blog platform optimized for SEO and performance using Next.js.",
    image: "https://picsum.photos/seed/delta/600/400",
    tags: ["Next.js", "React", "TypeScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Solutions Inc.",
    period: "2020 - Present",
    description: [
      "Led the development of a new client-facing analytics dashboard using React and TypeScript, improving user engagement by 40%.",
      "Mentored junior developers, conducted code reviews, and established front-end best practices.",
      "Collaborated with UX/UI designers to translate complex requirements into responsive and accessible user interfaces."
    ],
  },
  {
    role: "Frontend Developer",
    company: "Innovate Co.",
    period: "2017 - 2020",
    description: [
      "Developed and maintained components for a large-scale design system.",
      "Worked in an agile team to deliver high-quality features for a SaaS product.",
      "Optimized application performance, reducing initial load time by 30%."
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: "#", icon: <SiGithub /> },
  { name: "LinkedIn", href: "#", icon: <SiLinkedin /> },
];

export const NAV_LINKS: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];
