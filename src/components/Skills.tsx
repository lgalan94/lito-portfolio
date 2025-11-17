import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { getSkills, type SkillsResponse } from '../services/skillApi';
import type { Skill } from '../types';

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkillsData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load skills.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  if (loading) return <p className="text-center text-white">Loading skills...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!skillsData) return <p className="text-center text-red-500">No skills found.</p>;

  // Flatten all skills for Grid View
  const allSkills: (Skill & { category: string })[] = [];
  Object.keys(skillsData).forEach(category => {
    skillsData[category].forEach(skill => {
      allSkills.push({ ...skill, category });
    });
  });

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(34,211,238,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(6,182,212,0.08),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto text-center px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          🧠 My Tech Stack
        </motion.h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8 rounded-full"></div>

        {/* View Toggle Button */}
        <div className="mb-12 flex justify-center">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "kanban" : "grid")}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 transition text-white font-semibold rounded-xl shadow-lg"
          >
            {viewMode === "grid" ? "Switch to Kanban View" : "Switch to Grid View"}
          </button>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name + index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white/10 border border-slate-800 rounded-xl p-4 flex flex-col items-center 
                justify-center text-center backdrop-blur-md hover:border-cyan-400/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]
                transition-all duration-300"
              >
                <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {skill.category}
                </span>

                {skill.icon && (
                  <img
                    src={skill.icon as string}
                    alt={skill.name}
                    className="w-12 h-12 object-contain mb-3 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  />
                )}
                <span className="text-sm font-medium text-slate-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* KANBAN VIEW */}
        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {Object.keys(skillsData).map(category => (
              <div key={category} className="bg-white/5 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
                <h3 className="text-left text-cyan-400 text-lg font-semibold mb-4">{category}</h3>

                <div className="flex flex-wrap gap-4">
                  {skillsData[category].map((skill, index) => (
                    <motion.div
                      key={skill.name + index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 border border-slate-700 rounded-xl p-3 w-24 h-24 
                      flex flex-col items-center justify-center text-center hover:border-cyan-400/40
                      transition-all duration-300"
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon as string}
                          alt={skill.name}
                          className="w-10 h-10 object-contain mb-2"
                        />
                      )}
                      <span className="text-xs font-medium text-slate-200">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
