import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaGitlab } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getHeroData } from "../services/heroApi";
import type { HeroData } from "../types";

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  gitlab: <FaGitlab />,
};

const Footer: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (err: any) {
        console.error("Failed to load hero data:", err);
        setError(err.message || "Failed to load footer info.");
        toast.error(err.message || "Failed to load footer info.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  if (isLoading) {
    return (
      <footer className="bg-slate-950 py-10 text-center text-slate-500 border-t border-slate-800">
        <p>Loading footer...</p>
      </footer>
    );
  }

  if (error || !heroData) {
    return (
      <footer className="bg-slate-950 py-10 text-center text-red-400 border-t border-slate-800">
        <p>{error || "Failed to load footer info."}</p>
      </footer>
    );
  }

  const socialLinks = Object.entries(heroData.socialLinks || {}).filter(([_, url]) => url);

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-400 py-12 border-t border-slate-800/70 overflow-hidden">
      {/* Glow Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Name / Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold text-white">
            {heroData.fullName || "Anonymous Developer"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {heroData.jobTitle || "Full-Stack Developer"}
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-6 text-2xl"
        >
          {socialLinks.map(([key, url]) => (
            <motion.a
              key={key}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300"
            >
              {SOCIAL_ICON_MAP[key] || null}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center md:text-right text-sm text-slate-500"
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-medium">
              {heroData.fullName || "Your Name"}
            </span>
            . All rights reserved.
          </p>
          <p className="text-xs mt-1 text-slate-600">
            Built with ❤️ using React & TailwindCSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
