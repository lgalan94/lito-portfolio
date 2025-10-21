import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaGitlab } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getHeroData } from "../services/heroApi";
import type { HeroData } from "../types";

// Map social link keys to their corresponding icons
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
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-center">
        <p>Loading footer...</p>
      </footer>
    );
  }

  if (error || !heroData) {
    return (
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-center">
        <p className="text-red-400">{error || "Failed to load footer info."}</p>
      </footer>
    );
  }

  const socialLinks = Object.entries(heroData.socialLinks || {}).filter(([_, url]) => url);

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-semibold text-white">
            {heroData.fullName || "Anonymous Developer"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {heroData.jobTitle || "Web Developer"}
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center space-x-6 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map(([key, url]) => (
            <a
              key={key}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
            >
              {SOCIAL_ICON_MAP[key] || null}
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center md:text-right text-sm text-slate-500"
        >
          © {new Date().getFullYear()} {heroData.fullName || "Your Name"}. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
