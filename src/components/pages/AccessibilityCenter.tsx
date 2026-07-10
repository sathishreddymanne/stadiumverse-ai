"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Accessibility, 
  Volume2, 
  FileText, 
  Type, 
  Video, 
  Contrast, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Navigation,
  Mic,
  Play,
  Loader2
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const AccessibilityCenter: React.FC = () => {
  const { accessibility, updateAccessibility, setActivePage, translate } = useStadium();
  const [screenReaderLog, setScreenReaderLog] = useState<string>("Hover over any dashboard element to hear description.");
  const [voiceInputSim, setVoiceInputSim] = useState(false);

  // Simulated screen reader text based on sections
  const handleSimulateHover = (text: string) => {
    if (accessibility.screenReader) {
      setScreenReaderLog(`[Screen Reader Speaks]: "${text}"`);
    }
  };

  const handleLaunchWheelchair = () => {
    setActivePage("navigation");
    // Wait for page state to change, then set routing type (handled by routing state)
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Accessibility Center</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Configure assistive modalities, high-contrast states, and inclusive seating routes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Toggle Configuration Panel */}
        <GlassCard className="p-6 lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Inclusion System Controls</h3>
            <span className="text-[10px] text-pink-400 font-bold uppercase">Active System Settings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Voice Assistant */}
            <div 
              onMouseEnter={() => handleSimulateHover("Activate Voice Assistant. Press button to dictate commands.")}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors
                ${accessibility.voiceAssistant ? "bg-pink-500/10 border-pink-400/30" : "bg-white/[0.01] border-white/[0.05]"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accessibility.voiceAssistant ? "bg-pink-500/20 text-pink-400" : "bg-white/[0.03] text-text-secondary"}`}>
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Auditory Narrator</h4>
                  <p className="text-[9px] text-text-secondary font-light mt-0.5">Spoken screen guidance</p>
                </div>
              </div>
              <button
                onClick={() => updateAccessibility({ voiceAssistant: !accessibility.voiceAssistant })}
                className="w-11 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] relative cursor-pointer"
              >
                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all ${
                  accessibility.voiceAssistant ? "right-1 bg-pink-400" : "left-1 bg-text-secondary"
                }`} />
              </button>
            </div>

            {/* 2. Screen Reader */}
            <div 
              onMouseEnter={() => handleSimulateHover("Activate Screen Reader simulator. Displays spoke-out text at the bottom of the screen.")}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors
                ${accessibility.screenReader ? "bg-pink-500/10 border-pink-400/30" : "bg-white/[0.01] border-white/[0.05]"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accessibility.screenReader ? "bg-pink-500/20 text-pink-400" : "bg-white/[0.03] text-text-secondary"}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Screen Reader Simulator</h4>
                  <p className="text-[9px] text-text-secondary font-light mt-0.5">Text-to-speech visual logger</p>
                </div>
              </div>
              <button
                onClick={() => {
                  updateAccessibility({ screenReader: !accessibility.screenReader });
                  if (!accessibility.screenReader) {
                    setScreenReaderLog("[Screen Reader Speaks]: Screen reader simulator enabled. Hover elements to activate.");
                  }
                }}
                className="w-11 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] relative cursor-pointer"
              >
                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all ${
                  accessibility.screenReader ? "right-1 bg-pink-400" : "left-1 bg-text-secondary"
                }`} />
              </button>
            </div>

            {/* 3. Large Text Mode */}
            <div 
              onMouseEnter={() => handleSimulateHover("Toggle Large Text mode. Scaling baseline to 18 pixels globally.")}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors
                ${accessibility.largeText ? "bg-pink-500/10 border-pink-400/30" : "bg-white/[0.01] border-white/[0.05]"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accessibility.largeText ? "bg-pink-500/20 text-pink-400" : "bg-white/[0.03] text-text-secondary"}`}>
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Large Text Mode</h4>
                  <p className="text-[9px] text-text-secondary font-light mt-0.5">Scale fonts up by 15%</p>
                </div>
              </div>
              <button
                onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
                className="w-11 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] relative cursor-pointer"
              >
                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all ${
                  accessibility.largeText ? "right-1 bg-pink-400" : "left-1 bg-text-secondary"
                }`} />
              </button>
            </div>

            {/* 4. Sign Language Video */}
            <div 
              onMouseEnter={() => handleSimulateHover("Activate Sign Language Interpreter. Opens a PiP panel translating security announcements.")}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors
                ${accessibility.signLanguageVideo ? "bg-pink-500/10 border-pink-400/30" : "bg-white/[0.01] border-white/[0.05]"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accessibility.signLanguageVideo ? "bg-pink-500/20 text-pink-400" : "bg-white/[0.03] text-text-secondary"}`}>
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Sign Interpreter Feed</h4>
                  <p className="text-[9px] text-text-secondary font-light mt-0.5">Interpreter picture-in-picture</p>
                </div>
              </div>
              <button
                onClick={() => updateAccessibility({ signLanguageVideo: !accessibility.signLanguageVideo })}
                className="w-11 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] relative cursor-pointer"
              >
                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all ${
                  accessibility.signLanguageVideo ? "right-1 bg-pink-400" : "left-1 bg-text-secondary"
                }`} />
              </button>
            </div>

            {/* 5. High Contrast */}
            <div 
              onMouseEnter={() => handleSimulateHover("Toggle High Contrast Mode. Applies dark black backgrounds with stark borders.")}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors
                ${accessibility.highContrast ? "bg-pink-500/10 border-pink-400/30" : "bg-white/[0.01] border-white/[0.05]"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accessibility.highContrast ? "bg-pink-500/20 text-pink-400" : "bg-white/[0.03] text-text-secondary"}`}>
                  <Contrast className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">High Contrast Mode</h4>
                  <p className="text-[9px] text-text-secondary font-light mt-0.5">Maximizes visual contrast</p>
                </div>
              </div>
              <button
                onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
                className="w-11 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] relative cursor-pointer"
              >
                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full transition-all ${
                  accessibility.highContrast ? "right-1 bg-pink-400" : "left-1 bg-text-secondary"
                }`} />
              </button>
            </div>

          </div>

          {/* Interactive Narrator Terminal */}
          <AnimatePresence>
            {accessibility.screenReader && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl bg-black border border-pink-500/20 text-pink-400 font-mono text-xs mt-4 flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-pink-400 animate-bounce" />
                <span>{screenReaderLog}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Floating Interpreter & Wheelchair redirection */}
        <div className="flex flex-col gap-6">
          
          {/* Wheelchair Shortcut */}
          <GlassCard 
            onMouseEnter={() => handleSimulateHover("Launch step-free navigation. Reroutes to wheelchair maps.")}
            className="p-5 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Navigation className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Step-Free Seating Map</h3>
            </div>
            
            <p className="text-xs text-text-secondary font-light leading-relaxed">
              Instantly open the Smart Navigation panel with step-free elevators and accessibility ramps pre-selected.
            </p>

            <GradientButton 
              onClick={handleLaunchWheelchair}
              className="w-full text-xs font-bold py-2.5 flex items-center justify-center gap-2"
            >
              Open Wheelchair Map <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </GlassCard>

          {/* Sign Language PiP Simulation */}
          <AnimatePresence>
            {accessibility.signLanguageVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard className="p-4 relative overflow-hidden bg-black border-pink-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase font-bold text-pink-400 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" /> Live Sign Interpreter
                    </span>
                    <span className="text-[8px] text-text-secondary font-mono">PiP Overlay</span>
                  </div>
                  
                  {/* Mock Video Feed */}
                  <div className="aspect-video w-full rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <Video className="w-8 h-8 text-pink-500/40 animate-pulse" />
                    <span className="text-[10px] text-text-secondary font-light mt-2 max-w-[80%]">Translating announcement: &quot;Security Notice: All bags larger than 12x12x6 inches...&quot;</span>
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Input dictate simulator */}
          <GlassCard className="p-5 space-y-3 bg-[#0d0714] border-pink-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold flex items-center gap-1 text-pink-400">
                <Mic className="w-4 h-4" /> Voice Commands Kiosk
              </span>
            </div>
            <p className="text-[10px] text-text-secondary font-light leading-relaxed">
              Test verbal search instructions: Click to simulate speaking &quot;Where is Gate C elevator?&quot;
            </p>
            <GradientButton
              variant="secondary"
              onClick={() => {
                setVoiceInputSim(true);
                setTimeout(() => {
                  setVoiceInputSim(false);
                  setActivePage("ai-assistant");
                }, 1500);
              }}
              className="w-full text-xs font-bold py-2 flex items-center justify-center gap-1.5"
            >
              {voiceInputSim ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-pink-400 animate-spin" /> Dictating...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Simulate Spoken Command
                </>
              )}
            </GradientButton>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default AccessibilityCenter;
