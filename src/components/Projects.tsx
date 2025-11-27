import React, { useState, useEffect, useMemo } from 'react';
import Card from './ui/Card';
import SkillBadge from './ui/SkillBadge';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { getAllProjects } from '../services/projectApi';
import type { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

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

  // ✅ Get unique categories from projects
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
  let filtered = activeCategory === 'All'
    ? [...projects]
    : projects.filter((project) => project.category === activeCategory);

  // Sort so Fullstack projects appear first
  filtered.sort((a, b) => {
    if (a.category === 'Fullstack' && b.category !== 'Fullstack') return -1;
    if (b.category === 'Fullstack' && a.category !== 'Fullstack') return 1;
    return 0; // keep relative order for others
  });

  return filtered;
}, [activeCategory, projects]);


  const projectCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14 },
    },
    exit: { opacity: 0, y: 40, scale: 0.9, transition: { duration: 0.2 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const toggleDescription = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p className="text-center text-white">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!projects.length) return <p className="text-center text-white">No projects found.</p>;

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        <motion.h2
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 mb-12 rounded-full" />

        {/* ✅ Dynamic Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-14" role="group" aria-label="Category filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 focus:outline-none ${
                activeCategory === category
                  ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-cyan-400/40'
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ✅ Projects Grid */}
        <motion.div
          layout
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const isExpanded = expandedProjectId === project._id;

                return (
                  <motion.div
                    key={project._id}
                    variants={projectCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    
                    <Card className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 group">
                      {/* Image with overlay */}
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-52 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
                        <span className="absolute top-3 left-3 bg-cyan-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {project.title}
                        </h3>

                        {/* Expandable Description */}
                        <motion.p
                          layout
                          className={`text-slate-300 text-sm sm:text-base mb-3 ${isExpanded ? '' : 'line-clamp-3'}`}
                        >
                          {project.description}
                        </motion.p>

                        <button
                          onClick={() => toggleDescription(project._id!)}
                          className="text-cyan-400 text-xs sm:text-sm font-medium hover:underline self-start mb-4"
                        >
                          {isExpanded ? 'Show Less' : 'Show More'}
                        </button>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tags.map((tag) => (
                            <SkillBadge key={tag}>{tag}</SkillBadge>
                          ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-auto">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all w-full sm:w-auto"
                            >
                              <ExternalLink size={16} />
                              Live
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-all w-full sm:w-auto"
                            >
                              <Github size={16} />
                              Source
                            </a>
                          )}
                        </div>
                      </div>
</Card>


                  </motion.div>
                );
              })
            ) : (
              <motion.p
                key="no-category-projects"
                className="text-center text-slate-400 col-span-full py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No project in this category.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

