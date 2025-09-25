import React, { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
    };
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="text-2xl font-bold text-blue-400 hover:text-cyan-400 transition-colors">
            LITO
          </a>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`
                    relative text-slate-300 hover:text-cyan-400 transition-colors font-medium pb-1
                    after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:w-full after:h-[2px] after:bg-cyan-400 
                    after:transition-transform after:duration-300 after:ease-in-out after:origin-left
                    ${activeLink === link.href ? 'text-cyan-400 after:scale-x-100' : 'after:scale-x-0'}
                  `}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-cyan-400 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'none' }}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96' : 'max-h-0'}
          `}
        >
          <ul className="flex flex-col items-center space-y-4 pt-4 pb-8 border-t border-slate-700">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium ${activeLink === link.href ? 'text-cyan-400' : 'text-slate-300'} hover:text-cyan-400 transition-colors`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;