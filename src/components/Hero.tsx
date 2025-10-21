import React, { useState, useEffect } from 'react';
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
        const data = await getHeroData(); // Public route
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

  // Convert socialLinks object to an array of key-value pairs
  const socialLinks = Object.entries(heroData.socialLinks || {}).filter(([_, url]) => url);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-6">
        <img
          src={heroData.profilePictureUrl || '/Profile.png'}
          alt={heroData.fullName}
          className="w-72 h-72 rounded-full mx-auto border-4 border-slate-700 shadow-xl"
        />

        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            {heroData.fullName}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-cyan-400">
            {heroData.jobTitle}
          </p>
          <p className="max-w-2xl mx-auto text-slate-400">{heroData.shortBio}</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 text-2xl mt-4">
          {socialLinks.map(([key, url]) =>
            url ? (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              >
                {SOCIAL_ICON_MAP[key] || null}
              </a>
            ) : null
          )}
        </div>

        <div className="pt-4">
          <a
            href="#projects"
            className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
