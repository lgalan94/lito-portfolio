  import React, { useState, useMemo, useEffect } from 'react';
  import { PROJECTS } from '../constants';
  import Card from './ui/Card';
  import SkillBadge from './ui/SkillBadge';

  const Projects: React.FC = () => {
    // Memoize the unique set of tags to prevent re-computation on every render.
    const allTags = useMemo(() => {
      const tags = new Set<string>();
      PROJECTS.forEach(project => {
        project.tags.forEach(tag => tags.add(tag));
      });
      return ["All", ...Array.from(tags).sort()];
    }, []);

    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
    const [isAnimating, setIsAnimating] = useState(false);

    // Effect to handle the filtering logic and animation when the active filter changes.
    useEffect(() => {
      setIsAnimating(true);
      // Use a timeout to allow the fade-out animation to complete before updating the projects.
      const animationTimeout = setTimeout(() => {
        if (activeFilter === 'All') {
          setFilteredProjects(PROJECTS);
        } else {
          setFilteredProjects(
            PROJECTS.filter(project => project.tags.includes(activeFilter))
          );
        }
        setIsAnimating(false);
      }, 300); // This duration should match the CSS transition duration.

      return () => clearTimeout(animationTimeout);
    }, [activeFilter]);

    return (
      <section id="projects" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Project filters">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                  activeFilter === tag
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                aria-pressed={activeFilter === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={`grid md:grid-cols-2 gap-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {filteredProjects.map((project) => (
              <Card key={project.title} className="text-left flex flex-col">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover"/>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                  <div className="mb-4">
                    {project.tags.map(tag => <SkillBadge key={tag}>{tag}</SkillBadge>)}
                  </div>
                  <div className="flex space-x-4 mt-auto">
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold">Live Demo</a>}
                    {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold">Source Code</a>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default Projects;
