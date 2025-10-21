import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Card from './ui/Card';
import { getAllEmployment } from '../services/employmentApi'; // ✅ Create this service
import type { Employment } from '../types';

// Animation variants
const experienceVariants: Record<string, Variants> = {
  odd: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  },
  even: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  },
  dot: {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { delay: 0.5, duration: 0.3, type: 'spring', stiffness: 100 },
    },
  },
};

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Employment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployment = async () => {
      try {
        const data = await getAllEmployment();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching employment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployment();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 md:py-32 text-center text-slate-400">
        <p>Loading experiences...</p>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12"></div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 hidden md:block"></div>

          {experiences.map((item, index) => {
            const side = index % 2 === 0 ? 'odd' : 'even';

            return (
              <div
                key={item._id || index}
                className="mb-8 flex justify-between items-center w-full md:even:flex-row-reverse"
              >
                <div className="hidden md:block w-5/12"></div>

                {/* Timeline dot */}
                <motion.div
                  className="z-10 absolute left-1/2 -ml-3 hidden md:block"
                  variants={experienceVariants.dot}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="bg-cyan-500 h-6 w-6 rounded-full shadow-lg"></div>
                </motion.div>

                {/* Card */}
                <motion.div
                  className="w-full md:w-5/12"
                  variants={experienceVariants[side]}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <Card className="p-6">
                    <p className="text-slate-400 text-sm mb-1">
                      {item.startDate} — {item.endDate}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-cyan-400 font-semibold ">{item.company}</p>
                    <p className="text-cyan-200 text-xs mb-3">{item.location}</p>

                    <ul className="list-disc list-inside text-slate-400 space-y-2">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
