import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { getSkills, type SkillsResponse } from "../services/skillApi";
import type { Skill } from "../types";

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
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 12 },
    },
  };

  /** Skeleton Component */
  const Skeleton = ({ className = "" }) => (
    <div
      className={`animate-pulse bg-white/10 rounded-lg overflow-hidden relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
    </div>
  );

  /** FULL PAGE SKELETON */
  if (loading) {
    return (
      <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-2 text-center">
          
          <Skeleton className="h-10 w-64 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-1 w-28 mx-auto mb-10 rounded-full" />
          <Skeleton className="h-5 w-96 mx-auto mb-16 rounded-full" />

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <Skeleton className="w-40 h-10 rounded-full" />
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (!skillsData) return <p className="text-center text-red-400">No skills found.</p>;

  const allSkills: (Skill & { category: string })[] = [];
  Object.keys(skillsData).forEach((category) => {
    skillsData[category].forEach((skill) => {
      allSkills.push({ ...skill, category });
    });
  });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden px-6">

      <div className="relative max-w-7xl mx-auto px-2 text-center">
        
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Tech Stack
          </span>
        </motion.h2>
        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 mb-12 rounded-full" />

        <p className="text-slate-400 max-w-xl mx-auto mb-12">
          Tools, technologies & frameworks I use to build modern, scalable applications.
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "kanban" : "grid")}
            className="relative inline-flex items-center h-10 px-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-200 hover:border-cyan-400/40 transition-all duration-300"
          >
            <span className="mr-3 text-sm">{viewMode === "grid" ? "Grid" : "Kanban"}</span>
            <div className="relative">
              <div className="w-12 h-6 bg-slate-700/50 rounded-full"></div>
              <motion.div
                layout
                className="absolute top-0 w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                animate={{ x: viewMode === "grid" ? 0 : 24 }}
              />
            </div>
          </button>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name + index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.06 }}
                className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                  hover:border-cyan-400/30 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)] transition-all"
              >
                <span className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {skill.category}
                </span>

                {skill.icon && (
                  <img
                    src={skill.icon as string}
                    alt={skill.name}
                    className="w-14 h-14 object-contain mx-auto mb-3 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                  />
                )}
                <p className="text-sm text-white font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* KANBAN VIEW */}
        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {Object.keys(skillsData).map((category) => (
              <div
                key={category}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <h3 className="text-left text-cyan-400 text-lg font-semibold mb-4">
                  {category}
                </h3>

                <div className="flex flex-wrap gap-4 justify-center">
                  {skillsData[category].map((skill, index) => (
                    <motion.div
                      key={skill.name + index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl w-20 h-20 flex flex-col items-center justify-center border border-white/10 hover:border-cyan-400/40 transition-all"
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon as string}
                          alt={skill.name}
                          className="w-9 h-9 mb-1"
                        />
                      )}
                      <p className="text-xs text-white/90">{skill.name}</p>
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
