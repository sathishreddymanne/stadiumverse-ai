"use client";

import React from "react";
import { motion } from "framer-motion";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) => {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-accent-blue to-accent-purple text-text-primary border-none shadow-[0_0_15px_rgba(79,124,255,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]";
      case "secondary":
        return "bg-white/[0.04] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-text-primary";
      case "danger":
        return "bg-gradient-to-r from-red-600 to-red-800 text-white border-none shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]";
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-700 text-white border-none shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]";
      default:
        return "";
    }
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        px-6 py-2.5 rounded-[12px] font-medium text-sm transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-accent-blue/50 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${getStyles()}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
