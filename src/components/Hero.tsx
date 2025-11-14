import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { toast } from 'sonner';
import { Github, Linkedin, Facebook, Gitlab } from 'lucide-react';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <Github />,
  linkedin: <Linkedin />,
  facebook: <Facebook />,
  gitlab: <Gitlab />,
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
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchHero();
  }, []);

  // Skeleton loader
  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 md:px-20">
        {/* Text Skeleton */}
        <div className="space-y-4 max-w-xl w-full">
          <div className="h-12 w-3/4 bg-slate-700 rounded-md animate-pulse" />
          <div className="h-8 w-1/2 bg-slate-600 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-slate-700 rounded-md animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-700 rounded-md animate-pulse" />
          <div className="flex gap-4 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-10 bg-slate-600 rounded-full animate-pulse" />
            ))}
          </div>
          {/* Skeleton for CTA button */}
          <div className="mt-8 h-12 w-48 bg-slate-700 rounded-full animate-pulse" />
        </div>

        {/* Image Skeleton */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-slate-800 animate-pulse" />
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
        <h1
          className="
            uppercase 
            text-5xl lg:text-[80px] 
            font-extrabold 
            bg-gradient-to-r 
            from-black-50 
            via-blue-500 
            to-cyan-600 
            bg-clip-text 
            text-transparent 
            font-['Poppins'] 
            tracking-tight
            animated-gradient
          "
        >
          {heroData.fullName.replace(/\s+/g, '')}
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

      {/* Logo / Right Side */}
      <motion.div
        className="relative z-10 flex-shrink-0 group flex flex-col items-center"
        variants={zoomOutVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.08 }}
      >
        {/* Glowing Background Blobs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-150" />
          <div className="absolute w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-300" />
        </div>

        {/* Logo Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900">
          <img
            src="./logo.png"
            alt="LOGO"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay rounded-2xl pointer-events-none" />
        </div>

        {/* Tagline */}
        <p className="mt-4 text-sm md:text-base text-slate-200 font-semibold text-center">
          Innovate. Accelerate. Repeat.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
