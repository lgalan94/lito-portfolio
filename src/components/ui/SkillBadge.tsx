
import React from 'react';

interface SkillBadgeProps {
  children: React.ReactNode;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ children }) => {
  return (
    <span className="inline-block bg-cyan-900/50 text-cyan-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
};

export default SkillBadge;
