import React, { useEffect, useState } from 'react';
import Card from './ui/Card';
import { motion, type Variants } from 'framer-motion';
import { getSkills, type SkillsResponse } from '../services/skillApi';
import type { Skill } from '../types';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Tools', 'Other'];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  if (loading) return <p className="text-center text-white">Loading skills...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!skillsData) return <p className="text-center text-red-500">No skills found.</p>;

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12"></div>

        <div className="space-y-12">
          {CATEGORY_ORDER.map(category => {
            const skills = skillsData[category] || [];
            if (skills.length === 0) return null;

            return (
              <div key={category}>
                <motion.h3
                  className="text-2xl font-semibold text-cyan-400 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  {category}
                </motion.h3>

                <motion.div
                  className="flex flex-wrap justify-center gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {skills.map((skill: Skill) => (
                    <motion.div key={skill.name} variants={itemVariants}>
                      <Card className="p-4 w-32 h-32 flex flex-col items-center justify-center text-center space-y-2 hover:shadow-xl hover:scale-[1.03] transition duration-300">
                        {skill.icon && (
                          <img
                            src={skill.icon as string}
                            alt={skill.name}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        <span className="font-medium text-slate-300">{skill.name}</span>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
