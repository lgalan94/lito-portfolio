import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { Github, Linkedin, Facebook, Gitlab } from "lucide-react";
import { getHeroData } from "../services/heroApi";
import type { HeroData } from "../types";
import { Link } from "react-scroll";

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
        console.error("Failed to load hero data:", err);
        setError(err.message || "Failed to load profile.");
        toast.error(err.message || "Failed to load profile.");
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchHero();
  }, []);

  //  SKELETON LOADER
  if (isLoading) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-20">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 w-full">

        {/* Left Skeleton */}
        
          <div className="h-10 bg-slate-700/40 rounded w-3/4 mx-auto md:mx-0"></div>
          <div className="h-6 bg-slate-700/40 rounded w-1/2 mx-auto md:mx-0"></div>
          <div className="h-4 bg-slate-700/40 rounded w-full"></div>
          <div className="h-4 bg-slate-700/40 rounded w-5/6 mx-auto md:mx-0"></div>

          <div className="flex justify-center md:justify-start gap-4 pt-3">
            <div className="h-10 w-10 bg-slate-700/40 rounded-full"></div>
            <div className="h-10 w-10 bg-slate-700/40 rounded-full"></div>
            <div className="h-10 w-10 bg-slate-700/40 rounded-full"></div>
          </div>

          <div className="h-12 w-40 bg-slate-700/40 rounded-full mx-auto md:mx-0 mt-6"></div>
        </div>

        {/* Right Skeleton */}
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-slate-700/40 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}


  if (error || !heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center text-center">
        <div className="space-y-6">
          <p className="text-red-500 text-xl p-8">
            {error || "Failed to load data."}
          </p>
          <img
            src="/Profile.png"
            alt="Default Profile"
            className="w-72 h-72 rounded-full mx-auto border-4 border-red-700 shadow-xl"
          />
        </div>
      </section>
    );
  }

  const socialLinks = Object.entries(heroData.socialLinks || {}).filter(
    ([_, url]) => url
  );

  // FADE-IN ANIMATION
  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 md:px-20 overflow-hidden"
    >
      <motion.div
        className="relative z-10 space-y-6 max-w-xl text-center md:text-left"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="uppercase text-5xl lg:text-[80px] font-extrabold bg-gradient-to-r from-black-50 via-blue-500 to-cyan-600 bg-clip-text text-transparent font-['Poppins'] tracking-tight animated-gradient">
          {heroData.fullName.replace(/\s+/g, "")}
        </h1>

        <p className="text-xl lg:text-2xl md:text-3xl font-semibold text-slate-200">
          {heroData.jobTitle}
        </p>
        <p className="text-slate-300 text-sm md:text-base">
          {heroData.shortBio}
        </p>

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

        {/* CTA */}
        <motion.div className="mt-12" whileHover={{ scale: 1.05 }}>
          <Link
            to="projects"
            smooth={true}
            duration={800}
            offset={-80}
            className="
              cursor-pointer
              relative
              inline-block
              px-8 py-3
              rounded-full
              font-bold
              text-white
              bg-gradient-to-r from-cyan-500 to-blue-500
              shadow-lg
              overflow-hidden
              transition-all duration-300
            "
          >
            <span className="relative z-10">View My Work</span>

            <span
              className="
                absolute inset-0 
                rounded-full
                bg-white/10
                opacity-0
                hover:opacity-20
                transition-opacity duration-300
              "
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        className="relative z-10 flex-shrink-0 group flex flex-col items-center"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.08 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-150" />
          <div className="absolute w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-300" />
        </div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-900">
          <img
            src="./logo.png"
            alt="LOGO"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay rounded-2xl pointer-events-none" />
        </div>

        <p className="mt-4 text-sm md:text-base text-slate-200 font-semibold text-center">
          Innovate. Accelerate. Repeat.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
