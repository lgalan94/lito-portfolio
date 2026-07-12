import { Home, Info, Code, Folder, Mail, Award } from "lucide-react";
import type { NavLink } from "../types";

export const navLinks: NavLink[] = [
  { id: "hero", name: "Home", title: "Home", icon: <Home size={18} /> },
  { id: "about", name: "About", title: "About", icon: <Info size={18} /> },
  { id: "skills", name: "Skills", title: "Skills", icon: <Code size={18} /> },
  { id: "projects", name: "Projects", title: "Projects", icon: <Folder size={18} /> },
  { id: "certificates", name: "Certificates", title: "Certificates", icon: <Award size={18} /> },
  { id: "contact", name: "Contact", title: "Contact", icon: <Mail size={18} /> },
];
