"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Activity,
  HeartPulse,
  LogOut,
  ChevronRight,
  Volume2
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const EmergencyCenter: React.FC = () => {
  const { 
    currentStadium, 
    currentMatch, 
    emergencyMode, 
    setEmergencyMode, 
    translate 
  } = useStadium();

  const [activeStep, setActiveStep] = useState(0);

  const evacuationSteps = [
    { text: "Locate Nearest Exit door", sub: "Exit Door 12 is located 35 meters to your right in Sec 118 corridor." },
    { text: "Proceed down emergency stairs", sub: "Do NOT attempt to use lifts or elevator shafts. Follow green LED strips." },
    { text: "Assemble in Outer Lot C Plaza", sub: "Muster point designated in South Field Parking. Volunteers will distribute hydration." }
  ];

  const emergencyExits = [
    { name: "Exit Corridor 12 (North)", distance: "45m away", status: "Clear / Open", color: "#22C55E" },
    { name: "Exit Ground Tunnel B", distance: "120m away", status: "Slow Flow", color: "#F59E0B" },
    { name: "Emergency Exit Plaza C", distance: "190m away", status: "Congested", color: "#EF4444" }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-red-400">
            Emergency Command & Safety Hub
          </h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Activate emergency overrides, check evacuation diagrams, and view safety muster details.
          </p>
        </div>

        {/* Global emergency switch */}
        <GradientButton
          variant={emergencyMode ? "secondary" : "danger"}
          onClick={() => setEmergencyMode(!emergencyMode)}
          className="px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 self-start md:self-auto"
        >
          <ShieldAlert className="w-4 h-4" />
          {emergencyMode ? "Deactivate Red Alert" : "Simulate Global Evac Alert"}
        </GradientButton>
      </div>

      {/* Evacuation Alert Banner */}
      <AnimatePresence mode="wait">
        {emergencyMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 border border-red-500/30 bg-red-950/10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">CRITICAL EVACUATION SIREN IS ACTIVE</h4>
                <p className="text-[11px] text-text-secondary font-light mt-1">
                  Elevator shafts are disabled. Exit via emergency exits. Security and volunteer guides are in position.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Evacuation Directive */}
        <GlassCard className="p-6 lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">AI Evacuation Routing</h3>
            <span className="text-[10px] text-red-500 font-bold uppercase flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> Broadcast Active</span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed font-light">
            <strong>Automated Safety Directive:</strong> Emergency alarm has been triggered at <strong>{currentStadium.name}</strong> due to sensor anomalies. All spectators are ordered to exit immediately. Evacuate via Sector-specific stairs. Do NOT use elevators. Rerouting is active: Gate D and Gate B exits are clear, avoid Gate A. Assemble in Lot C parking.
          </p>

          {/* Stepper progress */}
          <div className="space-y-4 pt-4 border-t border-white/[0.05]">
            <h4 className="font-display font-semibold text-xs text-text-primary tracking-wide">Live Egress Stepper</h4>
            
            <div className="space-y-4">
              {evacuationSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx;
                return (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveStep(idx)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors cursor-pointer
                          ${isActive 
                            ? "bg-red-500/10 border-red-500 text-red-400" 
                            : isCompleted 
                            ? "bg-green-500/10 border-green-500 text-green-400" 
                            : "bg-white/[0.02] border-white/[0.08] text-text-secondary"}
                        `}
                      >
                        {idx + 1}
                      </button>
                      {idx < evacuationSteps.length - 1 && (
                        <div className="w-[1px] h-8 bg-white/[0.08] mt-1" />
                      )}
                    </div>

                    <div>
                      <h5 className={`font-semibold ${isActive ? "text-red-400" : isCompleted ? "text-green-400" : "text-text-secondary"}`}>
                        {step.text}
                      </h5>
                      <p className="text-[10px] text-text-secondary font-light mt-0.5 leading-relaxed">{step.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        {/* Exit Directory & Medical Card */}
        <div className="flex flex-col gap-6">
          
          {/* Medical station card */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-white/[0.05] pb-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <HeartPulse className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Nearest First Aid</h3>
            </div>

            <div className="space-y-3 text-xs leading-normal">
              <div>
                <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide block">Station Location</span>
                <span className="font-semibold text-text-primary mt-0.5 block flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-400" /> First Aid Station 2, Sec 112</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wide block">Active Dispatch Staff</span>
                <span className="font-light text-text-secondary mt-0.5 block">3 Paramedics on guard | Oxygen, stretchers and trauma kit ready</span>
              </div>
            </div>
          </GlassCard>

          {/* Exits List */}
          <GlassCard className="p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary border-b border-white/[0.05] pb-3">Exit Corridor Status</h3>

            <div className="space-y-3">
              {emergencyExits.map((exit, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                  <div>
                    <h4 className="font-semibold text-text-primary">{exit.name}</h4>
                    <p className="text-[9px] text-text-secondary mt-0.5 font-light">Distance: {exit.distance}</p>
                  </div>
                  
                  <span 
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{ backgroundColor: `${exit.color}15`, color: exit.color }}
                  >
                    {exit.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default EmergencyCenter;
