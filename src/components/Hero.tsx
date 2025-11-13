import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { toast } from 'sonner';
import { FaGithub, FaLinkedin, FaFacebook, FaGitlab } from 'react-icons/fa';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  gitlab: <FaGitlab />,
};

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err: any) {
        console.error('Failed to load hero data:', err);
        setError(err.message || 'Failed to load profile.');
        toast.error(err.message || 'Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-72 h-72 rounded-full border-4 border-slate-700 shadow-xl flex items-center justify-center bg-slate-800">
          <p className="text-white animate-pulse text-lg font-medium">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center text-center bg-slate-900">
        <div className="space-y-6">
          <p className="text-red-500 text-xl p-8">{error || 'Failed to load data.'}</p>
          <img
            src="/Profile.png"
            alt="Default Profile"
            className="w-72 h-72 rounded-full mx-auto border-4 border-red-700 shadow-xl"
          />
        </div>
      </section>
    );
  }

  const socialLinks = Object.entries(heroData.socialLinks || {}).filter(([_, url]) => url);

  // ✨ Updated animation variants for slow zoom-out
  const zoomOutVariants: Variants = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 md:px-20 overflow-hidden"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 z-0" />

      {/* Right Side: Text */}
      <motion.div
        className="relative z-10 space-y-6 max-w-xl text-center md:text-left"
        variants={zoomOutVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="uppercase text-4xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {heroData.fullName}
        </h1>
        <p className="text-xl lg:text-2xl md:text-3xl font-semibold text-slate-200">
          {heroData.jobTitle}
        </p>
        <p className="text-slate-300 text-sm md:text-base">{heroData.shortBio}</p>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-6 text-2xl mt-4">
          {socialLinks.map(([key, url]) =>
            url ? (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-cyan-400 transition-transform duration-300"
                whileHover={{ scale: 1.3 }}
              >
                {SOCIAL_ICON_MAP[key] || null}
              </motion.a>
            ) : null
          )}
        </div>

        {/* CTA Button */}
        <motion.div className="mt-12" whileHover={{ scale: 1.05 }}>
          <a
            href="#projects"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform"
          >
            View My Work
          </a>
        </motion.div>
      </motion.div>

      {/* Left Side: Profile Image */}
      <motion.div
        className="relative z-10 flex-shrink-0 group"
        variants={zoomOutVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.08 }}
      >
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-3xl opacity-60 transition-all duration-500 group-hover:blur-2xl" />
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900">
          <img
            src={heroData.profilePictureUrl || '/Profile.png'}
            alt={heroData.fullName}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute -inset-6 rounded-full border-2 border-cyan-400 opacity-20 animate-pulse"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
