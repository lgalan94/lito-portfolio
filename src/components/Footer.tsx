import React from "react";
import { SOCIAL_LINKS } from "../constants";

const Footer:React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo / Name */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Lito Galan Jr</h3>
          <p className="text-sm text-slate-500 mt-1">
            Web Developer • React • TypeScript • TailwindCSS
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 text-xl">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-sm text-slate-500">
          © {new Date().getFullYear()} Lito Galan Jr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
