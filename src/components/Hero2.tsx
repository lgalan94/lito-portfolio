import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-scroll";
import { toast } from "sonner";

import { ArrowRight, Github, Linkedin, Twitter, Facebook, Gitlab } from "lucide-react";
import { getHeroData } from "../services/heroApi";
import type { HeroData } from "../types";

// ICON MAP
const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <Github />,
  linkedin: <Linkedin />,
  facebook: <Facebook />,
  twitter: <Twitter />,
  gitlab: <Gitlab />,
};

const Hero2: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FETCH HERO DATA
  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err: any) {
        console.error("Failed to load hero data:", err);
        setError(err.message || "Failed to load profile.");
        toast.error(err.message || "Failed to load profile.");
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchHero();
  }, []);

  // SOCIAL LINKS
  const socialLinks = Object.entries(heroData?.socialLinks || {}).filter(([_, url]) => url);

  // FADE ANIMATION
  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  // -----------------------
  // ⭐ SKELETON LOADING UI
  // -----------------------
 if (isLoading) {
  return (
    <section className="min-h-screen flex items-center px-6 pt-20">
      <div className="
        container mx-auto 
        grid md:grid-cols-2 
        gap-16 items-center
        text-center md:text-left
      ">
        
        {/* LEFT SIDE */}
        <div className="space-y-6 animate-pulse flex flex-col items-center md:items-start">

          {/* Availability Badge */}
          <div className="h-6 w-40 bg-white/10 rounded-full"></div>

          {/* Title Lines */}
          <div className="h-10 w-3/4 bg-white/10 rounded"></div>
          <div className="h-10 w-2/3 bg-white/10 rounded"></div>

          {/* Bio */}
          <div className="h-4 w-full bg-white/10 rounded"></div>
          <div className="h-4 w-5/6 bg-white/10 rounded"></div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="h-12 w-40 bg-white/10 rounded-lg"></div>
            <div className="h-12 w-40 bg-white/10 rounded-lg"></div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <div className="h-10 w-10 bg-white/10 rounded-full"></div>
            <div className="h-10 w-10 bg-white/10 rounded-full"></div>
            <div className="h-10 w-10 bg-white/10 rounded-full"></div>
            <div className="h-10 w-10 bg-white/10 rounded-full"></div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="sm:flex hidden justify-center w-full rotate-2 hover:rotate-0">
          <div className="relative w-[600px] h-72 bg-white/10 rounded-2xl animate-pulse">

            {/* Toolbar */}
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/10 
              flex items-center gap-2 px-4">
              <div className="w-3 h-3 bg-white/20 rounded-full"></div>
              <div className="w-3 h-3 bg-white/20 rounded-full"></div>
              <div className="w-3 h-3 bg-white/20 rounded-full"></div>
            </div>

            {/* Code Lines */}
            
            <div className="mt-16 space-y-3 px-6">
              <div className="h-4 w-3/4 bg-white/10 rounded"></div>
              <div className="h-4 w-2/3 bg-white/10 rounded"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded"></div>
              <div className="h-4 w-1/3 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



  // -----------------------
  // ❌ ERROR STATE
  // -----------------------
  if (error || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center text-center">
        <div className="space-y-6">
          <p className="text-red-500 text-xl p-8">{error || "Failed to load data."}</p>
          <img
            src="/Profile.png"
            alt="Default Profile"
            className="w-72 h-72 rounded-full mx-auto border-4 border-red-700 shadow-xl"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
   
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>

        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>

        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT — NOW DYNAMIC */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-center w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                Available for new projects
              </span>
            </div>
          </div>


          <h1 className="text-5xl md:text-7xl font-bold font-display text-center md:text-start leading-tight mb-6">
            Hi, I'm <span className="text-cyan-500 animated-gradient">{heroData.fullName.toUpperCase()}</span>.<br />
            {heroData.jobTitle}.
          </h1>

          <p className="text-center md:text-start text-lg text-muted mb-8 max-w-lg leading-relaxed">
            {heroData.shortBio}
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              offset={-50}
              className="px-4 lg:px-8 py-2 lg:py-4 bg-primary text-background font-bold rounded-lg hover:bg-white/5 transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              View Work <ArrowRight size={20} />
            </Link>

            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-50}
              className="px-4 lg:px-8 py-2 lg:py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
             Hire Me
            </Link>
          </div>

          {/* DYNAMIC SOCIAL ICONS */}
          <div className="flex justify-center md:justify-start gap-6 text-muted">
                {socialLinks.map(([key, url]) => url ? (
                <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-cyan-400 transition-transform duration-300"
                    whileHover={{ scale: 1.3 }}
                >
                    {SOCIAL_ICON_MAP[key]}
                </motion.a>
                ): null
            )}
          </div>

        </motion.div>

        {/* RIGHT VISUAL — SAME AS YOUR DESIGN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 glass-card rounded-2xl p-6 transform rotate-2 hover:rotate-0 transition-all duration-500">
            
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-gray-500 font-mono">App.tsx</div>
            </div>

            {/* Dynamic code block */}
            <div className="space-y-3 font-mono text-sm">
              <div className="flex gap-2">
                <span className="text-secondary">const</span>
                <span className="text-primary">Developer</span>
                <span className="text-white">=</span>
                <span className="text-white">{'{'}</span>
              </div>

              <div className="pl-6 flex gap-2">
                <span className="text-gray-400">name:</span>
                <span className="text-green-400">'{heroData.fullName}'</span>,
              </div>

              <div className="pl-6 flex gap-2">
                <span className="text-gray-400">skills:</span>
                <span className="text-white">
                  'react', tailwindcss, node, mongoose
                </span>,
              </div>

              <div className="pl-6 flex gap-2">
                <span className="text-gray-400">hardWorker:</span>
                <span className="text-secondary">true</span>,
              </div>

              <div className="pl-6 flex gap-2">
                <span className="text-gray-400">drinkCoffee:</span>
                <span className="text-blue-400">()</span>
                <span className="text-secondary">=&gt;</span>
                <span className="text-white">{'{ ... }'}</span>
              </div>

              <div className="text-white">{'}'};</div>
            </div>

            {/* Floating Badges */}
            <motion.div 
                className="absolute -top-10 -right-10 p-4 glass-card rounded-xl animate-pulse"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }} 
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-10 h-10" />
            </motion.div>

            <motion.div 
                className="absolute -bottom-5 -left-10 p-4 glass-card rounded-xl animate-pulse"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }} 
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-10 h-10" />
            </motion.div>

            <motion.div 
                className="absolute bottom-20 -right-12 p-3 glass-card rounded-xl animate-pulse"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }} 
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-8 h-8" />
            </motion.div>

           
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="sm:flex hidden absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto mb-2"></div>
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero2;
