import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

const About: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Fetch hero data on mount
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const data: HeroData = await getHeroData(); // public route
        setBio(data.bio); // use only the bio
      } catch (err: any) {
        console.error(err);
        setError('Failed to load bio.');
      }
    };
    fetchBio();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { staggerChildren: 0.2, duration: 0.6, ease: 'easeOut' } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-20 md:py-32">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
          About Me
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-1 bg-cyan-500 mx-auto mb-8 origin-center"
        ></motion.div>

        <motion.p variants={itemVariants} className="text-sm text-justify lg:text-lg text-slate-400 leading-relaxed">
          {error ? error : bio || 'Loading bio...'}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
