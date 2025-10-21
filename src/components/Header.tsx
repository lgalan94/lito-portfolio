import React, { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Contact", to: "contact" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <nav className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        {/* Logo / Name */}
        <img
            src="android-chrome-192x192.png"
            className="h-14 w-14 cursor-pointer"
            alt="Logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={600}
              offset={-70}
              spy={true}
              onSetActive={() => setActiveSection(link.to)}
              className={`relative cursor-pointer transition-colors duration-300 ${
                activeSection === link.to
                  ? "text-cyan-400 after:w-full"
                  : "text-slate-400 hover:text-cyan-400"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 bottom-[-4px] h-[2px] bg-cyan-400 transition-all duration-300 ${
                  activeSection === link.to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 flex flex-col items-center py-4 space-y-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={600}
                offset={-70}
                spy={true}
                onSetActive={() => {
                  setActiveSection(link.to);
                  setMenuOpen(false);
                }}
                className={`relative cursor-pointer transition-colors duration-300 ${
                  activeSection === link.to
                    ? "text-cyan-400 after:w-full"
                    : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
