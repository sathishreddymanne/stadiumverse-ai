"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  UserCheck, 
  Building2, 
  ShieldAlert, 
  Bus, 
  Accessibility, 
  ArrowRight,
  Trophy,
  Lock,
  Loader2
} from "lucide-react";
import { useStadium, RoleType } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const AuthRoleSelector: React.FC = () => {
  const { isAuthenticated, login, setRole, role } = useStadium();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedRole, setSelectedRoleState] = useState<RoleType | null>(null);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    // Simulate loading for 1s
    setTimeout(() => {
      login();
      setIsLoggingIn(false);
    }, 1200);
  };

  const roles = [
    {
      id: "Fan" as RoleType,
      title: "Fan / Spectator",
      description: "Interactive stadium map, concession queue timings, translated audio feeds, and carbon footprint tracker.",
      icon: <User className="w-6 h-6 text-accent-blue" />,
      tag: "Spectator View"
    },
    {
      id: "Volunteer" as RoleType,
      title: "Field Volunteer",
      description: "Access assigned daily tasks, shift calendar schedule, operation briefings, and report local incidents.",
      icon: <UserCheck className="w-6 h-6 text-accent-purple" />,
      tag: "Operations Support"
    },
    {
      id: "Organizer" as RoleType,
      title: "Venue Organizer",
      description: "Central executive telemetry: attendance scan speeds, power grid levels, and synthesized AI operation summaries.",
      icon: <Building2 className="w-6 h-6 text-green-400" />,
      tag: "Command Center"
    },
    {
      id: "Security" as RoleType,
      title: "Security Officer",
      description: "Real-time safety logs, critical alert triggers, gate congestion metrics, and emergency evacuation routers.",
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      tag: "Safety & Integrity"
    },
    {
      id: "Transport" as RoleType,
      title: "Logistics & Transport",
      description: "Monitor metro/bus shuttle waiting times, rideshare surge pricing zones, and parking lot capacity grid.",
      icon: <Bus className="w-6 h-6 text-orange-400" />,
      tag: "Transit Hub"
    },
    {
      id: "Accessibility Support" as RoleType,
      title: "Accessibility Specialist",
      description: "Deploy screen narration, sign language overlays, and step-free wheelchair pathfinding navigation.",
      icon: <Accessibility className="w-6 h-6 text-pink-400" />,
      tag: "Inclusion Liaison"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary flex items-center justify-center p-6 overflow-hidden">
      {/* Animated Mesh Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-purple/10 blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // LOGIN SCREEN
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md relative z-10"
          >
            <div className="flex items-center gap-3 justify-center mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center shadow-[0_0_15px_rgba(79,124,255,0.4)]">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">STADIUMVERSE</span>
                <span className="text-[10px] block font-bold tracking-widest text-accent-blue uppercase">AI OS</span>
              </div>
            </div>

            <GlassCard className="p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple" />
              
              <div className="text-center mb-6">
                <h2 className="font-display font-semibold text-xl">Sign In to Platform</h2>
                <p className="text-xs text-text-secondary mt-2 font-light">
                  Access the AI Operating System for FIFA World Cup 2026 stadium management.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  disabled={isLoggingIn}
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-text-primary rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  {isLoggingIn ? "Connecting to Auth..." : "Sign in with Google"}
                </button>

                <div className="flex items-center justify-between text-[10px] text-text-secondary border-t border-white/[0.05] pt-4 font-light">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-accent-blue" /> Secured Sandbox</span>
                  <span>Demo Mode Active</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          // ROLE SELECTION SCREEN
          <motion.div
            key="role-select"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={containerVariants}
            className="w-full max-w-5xl relative z-10"
          >
            <div className="text-center mb-10">
              <h1 className="font-display font-bold text-3xl md:text-4xl text-gradient">
                Select Your Operating Role
              </h1>
              <p className="text-xs text-text-secondary mt-2 max-w-md mx-auto font-light leading-relaxed">
                Initialize custom widgets, navigation schemes, and simulated Generative AI responses tailored to your profile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roles.map((r, idx) => (
                <motion.div
                  key={r.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedRoleState(r.id)}
                  className={`
                    group p-6 rounded-[20px] backdrop-blur-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[200px]
                    ${selectedRole === r.id 
                      ? "bg-gradient-to-tr from-accent-blue/10 to-accent-purple/10 border-accent-blue/50 shadow-[0_0_20px_rgba(79,124,255,0.15)]" 
                      : "bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.12]"}
                  `}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300
                        ${selectedRole === r.id 
                          ? "bg-gradient-to-tr from-accent-blue to-accent-purple border-none" 
                          : "bg-white/[0.04] border-white/[0.08] group-hover:bg-white/[0.08]"}
                      `}>
                        <div className={`${selectedRole === r.id ? "text-white" : ""}`}>
                          {r.icon}
                        </div>
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-text-secondary bg-white/[0.05] px-2.5 py-1 rounded-full">
                        {r.tag}
                      </span>
                    </div>

                    <h3 className="font-semibold text-text-primary text-sm mb-2">{r.title}</h3>
                    <p className="text-text-secondary text-xs font-light leading-relaxed">{r.description}</p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <span className={`
                      text-xs font-bold transition-all duration-300 flex items-center gap-1
                      ${selectedRole === r.id ? "text-accent-blue" : "text-text-secondary group-hover:text-text-primary"}
                    `}>
                      Select <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <GradientButton 
                disabled={!selectedRole}
                onClick={() => setRole(selectedRole)}
                className="px-10 py-3.5 text-sm font-semibold flex items-center gap-2"
              >
                Confirm & Launch Dashboard <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AuthRoleSelector;
