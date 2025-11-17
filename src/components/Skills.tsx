import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { getSkills, type SkillsResponse } from '../services/skillApi';
import type { Skill } from '../types';

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Flatten all skills into one list with category included
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
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12 rounded-full"></div>

        {/* Skills grid */}
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
              {/* Category label (top-left) */}
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
      </div>
    </section>
  );
};

export default Skills;
