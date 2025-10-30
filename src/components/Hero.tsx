import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { toast } from 'sonner';
import { FaGithub, FaLinkedin, FaFacebook, FaGitlab } from 'react-icons/fa';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

// Map social link keys to their corresponding icons
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
      <section className="min-h-screen flex items-center justify-center text-center">
        <div className="w-72 h-72 rounded-full border-4 border-slate-700 shadow-xl flex items-center justify-center bg-slate-800">
          <p className="text-white animate-pulse">Loading Data...</p>
        </div>
      </section>
    );
  }

  if (error || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center text-center">
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

  // Animation variants
  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 text-center md:text-left overflow-hidden"
    >
      {/* Left Side: Profile Image */}
      <motion.div
        className="flex-shrink-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03 }}
      >
        <img
          src={heroData.profilePictureUrl || '/Profile.png'}
          alt={heroData.fullName}
          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-slate-700 shadow-xl object-cover"
        />
      </motion.div>

      {/* Right Side: Text Content */}
      <motion.div
        className="space-y-6 max-w-2xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {heroData.fullName}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-cyan-400">
            {heroData.jobTitle}
          </p>
          <p className="text-slate-400 w-80 text-sm">{heroData.shortBio}</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-5 text-2xl">
          {socialLinks.map(([key, url]) =>
            url ? (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-transform duration-300"
                whileHover={{ scale: 1.2 }}
              >
                {SOCIAL_ICON_MAP[key] || null}
              </motion.a>
            ) : null
          )}
        </div>

        {/* Button */}
        <motion.div className="pt-4" whileHover={{ scale: 1.05 }}>
          <a
            href="#projects"
            className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform"
          >
            View My Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
