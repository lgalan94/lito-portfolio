import React, { useState, useEffect, useMemo } from 'react';
import Card from './ui/Card';
import SkillBadge from './ui/SkillBadge';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { getAllProjects } from '../services/projectApi';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Generate all unique tags dynamically
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter, projects]);

  // Framer Motion variants
  const projectCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.6 } 
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8, 
      transition: { duration: 0.2 } 
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  if (loading) return <p className="text-center text-white">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!projects.length) return <p className="text-center text-white">No projects found.</p>;

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8 rounded"></div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Project filters">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                activeFilter === tag ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              aria-pressed={activeFilter === tag}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          key={activeFilter} // Forces remount to retrigger animations
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project._id}
                variants={projectCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <Card className="text-left flex flex-col h-full">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                    <div className="mb-4">
                      {project.tags.map(tag => <SkillBadge key={tag}>{tag}</SkillBadge>)}
                    </div>
                    <div className="flex space-x-4 mt-auto">
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold">Live Demo</a>}
                      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold">Source Code</a>}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
