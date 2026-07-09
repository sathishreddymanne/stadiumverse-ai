"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatRingProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  title: string;
  subtitle?: string;
  className?: string;
  showAlert?: boolean;
}

export const StatRing: React.FC<StatRingProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  title,
  subtitle,
  className = "",
  showAlert = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  // Determine indicator color
  const getGradientIds = () => {
    if (showAlert && value > 80) return { start: "#EF4444", end: "#B91C1C", id: "redGrad" };
    return { start: "#4F7CFF", end: "#A855F7", id: "primaryGrad" };
  };

  const grad = getGradientIds();

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id={grad.id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={grad.start} />
              <stop offset="100%" stopColor={grad.end} />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-white/[0.04]"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Active Fill Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${grad.id})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_6px_rgba(79,124,255,0.4)]"
            style={{
              filter: `drop-shadow(0 0 6px ${grad.start}66)`
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`font-semibold text-xl tracking-tight text-text-primary ${
              showAlert && value > 80 ? "text-red-400" : ""
            }`}
          >
            {value}%
          </motion.span>
          {subtitle && (
            <span className="text-[10px] text-text-secondary uppercase tracking-wider mt-0.5 font-medium">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <span className="mt-3 text-xs text-text-secondary font-medium tracking-wide">
        {title}
      </span>
    </div>
  );
};
