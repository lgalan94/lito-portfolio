import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Download } from 'lucide-react';
import { getHeroData } from '../services/heroApi';
import type { HeroData } from '../types';

const About: React.FC = () => {
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: HeroData & { resumeUrl?: string } = await getHeroData();
        setBio(data.bio);
        setProfileImage(data.profilePictureUrl || '/Profile.png');
        setResumeUrl(data.resumeUrl || null);
      } catch {
        setError('Failed to load bio.');
      }
    };
    fetchData();
  }, []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.06 },
    tap: { scale: 0.95 },
  };

  const handleDownloadResume = async () => {
    if (!resumeUrl) return;
    setIsDownloading(true);

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Lito-Galan-Jr-Resume.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download resume.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="about" className="relative py-6 lg:py-24 overflow-hidden">

     

      <motion.div
        className="relative max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl rounded-3xl p-10 md:p-14">

        <motion.h2
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 mb-12 rounded-full" />

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Side — Profile Image */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Glow Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-500" />

              {/* Animated Outline */}
              <div className="absolute -inset-2 border-2 border-cyan-400/40 rounded-full animate-pulse" />

              <img
                src={profileImage || '/Profile.png'}
                alt="Profile"
                className="relative w-56 h-56 md:w-72 md:h-72 object-cover rounded-full 
                          border-[3px] border-slate-800 shadow-2xl 
                          transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>


            {/* Right Side — Bio + Resume Button */}
            
            {/* Right Side — Bio + Resume Button */}
          <motion.div
            variants={fadeUp}
            className="text-slate-300 leading-relaxed text-base md:text-md"
          >
            <p className="text-justify">
              {error ? error : bio || 'Loading bio...'}
            </p>

            {resumeUrl && (
              <motion.button
                onClick={handleDownloadResume}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"   
                className="mt-6 px-4 lg:px-8 py-2 lg:py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
                disabled={isDownloading}
              >
                <Download 
                  className="group-hover:translate-y-1 transition-transform" />
                {isDownloading ? "Downloading..." : "Download Resume"}
              </motion.button>
            )}
          </motion.div>


          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
