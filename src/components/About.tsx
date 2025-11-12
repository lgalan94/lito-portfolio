import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

const About: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch hero data on mount
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const data: HeroData & { resumeUrl?: string } = await getHeroData(); // include resumeUrl
        setBio(data.bio); 
        setResumeUrl(data.resumeUrl || null);
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

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 0px 8px rgba(0,255,255,0.6)' },
    tap: { scale: 0.95 },
  };

  // ✅ Download resume from existing URL with custom filename
  const handleDownloadResume = async () => {
    if (!resumeUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Failed to download resume');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Always use your name as filename
      a.download = 'Lito-Galan-Jr-Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setError('Failed to download resume.');
    } finally {
      setIsDownloading(false);
    }
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
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-1 bg-cyan-500 mx-auto mb-8 origin-center"
        ></motion.div>

        <motion.p 
          variants={itemVariants} 
          className="text-sm text-justify lg:text-lg text-slate-400 leading-relaxed"
        >
          {error ? error : bio || 'Loading bio...'}
        </motion.p>

        {resumeUrl && (
          <motion.button
            onClick={handleDownloadResume}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-8 inline-flex items-center justify-center bg-transparent text-cyan-400 border border-cyan-400 rounded-md px-8 py-3 font-medium hover:bg-cyan-500/10 transition-colors duration-300 disabled:opacity-50"
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download Resume'}
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default About;
