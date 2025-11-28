import React from "react";
import { Link } from "react-scroll";
import { navLinks } from "../data/navLinks";

interface SidebarProps {
  activeSection: string;
  onNavLinkClick: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavLinkClick }) => {
  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden lg:flex flex-col items-center w-20 lg:w-24 bg-slate-900 fixed top-0 left-0 h-full py-8 border-r border-slate-800/50 z-40">
  
  {/* Logo at the top */}
  <Link
    to="hero"
    smooth={true}
    duration={100}
    offset={-70}
    spy={true}
    onSetActive={() => onNavLinkClick("hero")}
    className="text-cyan-400 text-2xl lg:text-3xl font-black mb-12 cursor-pointer hover:text-cyan-300 transition"
  >
    <img
      src="logo.png"
      className="h-14 w-14 cursor-pointer rounded-2xl border-2 border-cyan-700"
      alt="Logo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    />
  </Link>

  {/* Centered Navigation */}
  <div className="flex-1 flex items-center">
    <nav>
      <ul className="flex flex-col items-center space-y-6">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              to={link.id}
              smooth={true}
              duration={600}
              offset={-70}
              spy={true}
              onSetActive={() => onNavLinkClick(link.id)}
              className={`group relative flex items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === link.id
                  ? "bg-cyan-400 text-slate-900  border border-cyan-700"
                  : "text-slate-400 hover:text-cyan-400"
              }`}
            >
              <span className="text-xl">{link.icon}</span>

              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-slate-100 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {link.title || link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>

</aside>


      {/* ===== Mobile Bottom Bar ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md z-50 border-t border-slate-800">
        <ul className="flex justify-around items-center h-16">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth={true}
                duration={600}
                offset={-70}
                spy={true}
                onSetActive={() => onNavLinkClick(link.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                  activeSection === link.id
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span className="text-xs mt-1">{link.title || link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
