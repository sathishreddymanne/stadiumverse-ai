import React from "react";

interface SkeletonBlockProps {
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ className = "" }) => {
  return (
    <div 
      className={`
        bg-gradient-to-r from-white/[0.03] via-white/[0.07] to-white/[0.03]
        animate-pulse rounded-[8px] h-4 w-full
        ${className}
      `}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
  );
};
export default SkeletonBlock;
