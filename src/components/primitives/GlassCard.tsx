"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverLift?: boolean;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  onClick,
  hoverLift = true,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={
        hoverLift 
          ? { y: -4, boxShadow: onClick ? "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(79, 124, 255, 0.15)" : "0 12px 32px rgba(0, 0, 0, 0.4)" }
          : {}
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-[20px] 
        shadow-2xl transition-all duration-300
        ${onClick ? "cursor-pointer hover:border-white/[0.15]" : hoverLift ? "hover:border-white/[0.12]" : ""} 
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
