"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Navigation, 
  Accessibility, 
  Users, 
  ShieldAlert, 
  Crown, 
  MapPin, 
  Clock, 
  ArrowRight,
  Info,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

interface RouteStep {
  text: string;
  sub: string;
}

export const SmartNavigation: React.FC = () => {
  const { currentStadium, translate } = useStadium();
  const [routeType, setRouteType] = useState<"shortest" | "accessible" | "low-crowd" | "emergency" | "vip">("shortest");
  const [drawPath, setDrawPath] = useState(false);

  // Restart path animation whenever route type changes
  useEffect(() => {
    setDrawPath(false);
    const timer = setTimeout(() => setDrawPath(true), 150);
    return () => clearTimeout(timer);
  }, [routeType]);

  // Route configurations
  const routeConfigs = {
    shortest: {
      label: "Shortest Route",
      icon: <Navigation className="w-4 h-4 text-accent-blue" />,
      color: "#4F7CFF",
      path: "M 300,370 Q 300,320 330,300 T 400,240 T 440,180",
      eta: "4 mins",
      dist: "210m",
      steps: [
        { text: "Enter through Gate A (Main)", sub: "Proceed through ticket checklane 3" },
        { text: "Take Sector 104 stairs up", sub: "Go up 18 steps to Level 1 concourse" },
        { text: "Turn right and walk 40m", sub: "Arrive at Seat Row 12, Sec 118" }
      ]
    },
    accessible: {
      label: "Wheelchair Step-Free",
      icon: <Accessibility className="w-4 h-4 text-pink-400" />,
      color: "#F472B6",
      path: "M 480,110 Q 400,120 360,110 T 170,140 T 170,220 T 360,220 T 440,180",
      eta: "6 mins",
      dist: "340m",
      steps: [
        { text: "Enter through Gate C (Accessibility)", sub: "Level threshold checkin" },
        { text: "Proceed to Elevator Lobby E", sub: "Take elevator E to level 1 concourse" },
        { text: "Follow blue tactile lines", sub: "Step-free ramp direct access to Sec 118" }
      ]
    },
    "low-crowd": {
      label: "Low-Crowd Bypass",
      icon: <Users className="w-4 h-4 text-green-400" />,
      color: "#22C55E",
      path: "M 480,290 Q 480,340 430,350 T 260,330 T 200,200 T 320,140 T 440,180",
      eta: "7 mins",
      dist: "420m",
      steps: [
        { text: "Enter through Gate B (Low congestion)", sub: "Zero wait queue active" },
        { text: "Take Outer Perimeter Ring Road", sub: "Bypasses the crowded Gate A plaza" },
        { text: "Enter Sec 118 from the North Corridor", sub: "Saves ~10 mins in crowd delays" }
      ]
    },
    emergency: {
      label: "Evacuation Route",
      icon: <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />,
      color: "#EF4444",
      path: "M 440,180 Q 400,130 350,110 T 300,30",
      eta: "2.5 mins",
      dist: "140m",
      steps: [
        { text: "Leave Seat Sector 118 immediately", sub: "Follow green illuminated exit signs" },
        { text: "Bypass elevator shafts", sub: "Take Emergency stairs exit 12 direct to ground" },
        { text: "Exit via Gate D assembly plaza", sub: "Muster point located in Outer Field Lot C" }
      ]
    },
    vip: {
      label: "VIP Steward Corridor",
      icon: <Crown className="w-4 h-4 text-amber-400" />,
      color: "#F59E0B",
      path: "M 120,110 Q 200,90 280,100 T 380,140 T 440,180",
      eta: "3 mins",
      dist: "180m",
      steps: [
        { text: "Enter through VIP Entry Lobby E", sub: "Requires credential badge check" },
        { text: "Take Club Level Private corridor", sub: "Climate controlled pathway" },
        { text: "Direct access to executive box Sec 118", sub: "Hostess greeting at doorway" }
      ]
    }
  };

  const activeRoute = routeConfigs[routeType];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Smart Navigation</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Real-time vector wayfinding synced with stadium occupancy counters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Navigation Map Panel */}
        <GlassCard className="p-6 lg:col-span-2 flex flex-col justify-between overflow-hidden relative min-h-[420px]">
          {/* Overlay Coordinates info */}
          <div className="absolute top-4 left-6 flex items-center gap-1.5 text-[10px] text-text-secondary bg-black/40 px-2.5 py-1 rounded-full border border-white/[0.05]">
            <Layers className="w-3.5 h-3.5 text-accent-blue" />
            <span>Map Layers: Concourse Level 1 | 2D Orthographic Vector</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="flex-1 flex items-center justify-center py-6 mt-4">
            <svg 
              viewBox="0 0 600 400" 
              className="w-full max-w-[520px] h-auto select-none"
            >
              {/* STADIUM CONTAINER GRID */}
              <circle cx="300" cy="200" r="180" className="stroke-white/[0.04] fill-none" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="300" cy="200" r="150" className="stroke-white/[0.04] fill-none" strokeWidth="1" />

              {/* Stadium Outer Shell Boundary */}
              <ellipse 
                cx="300" 
                cy="200" 
                rx="200" 
                ry="160" 
                className="stroke-white/[0.08] fill-black/30" 
                strokeWidth="4" 
              />

              {/* Stadium Seating Ring */}
              <ellipse 
                cx="300" 
                cy="200" 
                rx="150" 
                ry="115" 
                className="stroke-white/[0.08] fill-white/[0.01]" 
                strokeWidth="15" 
              />

              {/* Pitch (Football Field) */}
              <rect 
                x="220" 
                y="145" 
                width="160" 
                height="110" 
                rx="8" 
                className="fill-green-600/10 stroke-green-500/20" 
                strokeWidth="1.5" 
              />
              {/* Field Markings */}
              <line x1="300" y1="145" x2="300" y2="255" className="stroke-green-500/10" strokeWidth="1.5" />
              <circle cx="300" cy="200" r="22" className="stroke-green-500/10 fill-none" strokeWidth="1.5" />

              {/* MAP NODES / LABELS */}
              
              {/* Gates (Outer Ring) */}
              {/* Gate A (Main, bottom) */}
              <g transform="translate(300, 370)">
                <circle r="8" className="fill-bg-base stroke-accent-blue" strokeWidth="2" />
                <text y="18" textAnchor="middle" className="fill-text-secondary text-[8px] font-bold">Gate A (Main)</text>
              </g>
              
              {/* Gate B (bottom right) */}
              <g transform="translate(480, 290)">
                <circle r="8" className="fill-bg-base stroke-green-400" strokeWidth="2" />
                <text x="12" y="3" textAnchor="start" className="fill-text-secondary text-[8px] font-bold">Gate B</text>
              </g>

              {/* Gate C (Accessibility, top right) */}
              <g transform="translate(480, 110)">
                <circle r="8" className="fill-bg-base stroke-pink-400" strokeWidth="2" />
                <text x="12" y="3" textAnchor="start" className="fill-text-secondary text-[8px] font-bold">Gate C (ADA)</text>
              </g>

              {/* Gate D (top) */}
              <g transform="translate(300, 30)">
                <circle r="8" className="fill-bg-base stroke-red-500" strokeWidth="2" />
                <text y="-12" textAnchor="middle" className="fill-text-secondary text-[8px] font-bold">Gate D</text>
              </g>

              {/* Gate E (VIP, top left) */}
              <g transform="translate(120, 110)">
                <circle r="8" className="fill-bg-base stroke-amber-400" strokeWidth="2" />
                <text x="-12" y="3" textAnchor="end" className="fill-text-secondary text-[8px] font-bold">Gate E (VIP)</text>
              </g>

              {/* Elevator Nodes */}
              <g transform="translate(170, 140)">
                <rect x="-6" y="-6" width="12" height="12" rx="2" className="fill-bg-base stroke-pink-400" strokeWidth="1" />
                <text x="-10" y="3" textAnchor="end" className="fill-text-secondary text-[6px] font-medium uppercase tracking-wider">Lift E</text>
              </g>

              {/* Destination Point: Seat Sector 118 (Right Side concourse) */}
              <g transform="translate(440, 180)">
                {/* Ping wave */}
                <circle r="12" className="fill-accent-purple/20 stroke-accent-purple/30 animate-ping" />
                <circle r="6" className="fill-accent-purple stroke-white" strokeWidth="1.5" />
                <text x="10" y="3" textAnchor="start" className="fill-text-primary text-[9px] font-bold tracking-wide">Sec 118</text>
              </g>

              {/* ANIMATED WAYFINDING ROUTE LINE */}
              {drawPath && (
                <motion.path
                  d={activeRoute.path}
                  fill="none"
                  stroke={activeRoute.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="filter drop-shadow-[0_0_8px_rgba(79,124,255,0.4)]"
                  style={{
                    filter: `drop-shadow(0 0 6px ${activeRoute.color}88)`
                  }}
                />
              )}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[9px] text-text-secondary border-t border-white/[0.05] pt-4 font-light">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-accent-blue" /> Shortest Pathway</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-400" /> ADA Elevator Ramps</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Low-Density Corridors</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Evacuation Corridors</span>
          </div>
        </GlassCard>

        {/* Route Details & Control Panel */}
        <div className="flex flex-col gap-6">
          
          {/* Route Selector Card */}
          <GlassCard className="p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Route Options</h3>
            
            <div className="space-y-2">
              {(Object.keys(routeConfigs) as Array<keyof typeof routeConfigs>).map((type) => {
                const config = routeConfigs[type];
                const isActive = routeType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setRouteType(type)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl border transition-all text-xs font-semibold cursor-pointer
                      ${isActive 
                        ? "bg-white/[0.03] border-accent-blue/40 text-text-primary" 
                        : "bg-transparent border-white/[0.05] hover:bg-white/[0.02] text-text-secondary"}
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/[0.04]" : ""}`}>
                        {config.icon}
                      </div>
                      <span>{config.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Stepper Details */}
          <GlassCard className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Rerouting Directives</h3>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1 text-accent-blue"><Clock className="w-3.5 h-3.5" /> {activeRoute.eta}</span>
                  <span className="text-text-secondary">{activeRoute.dist}</span>
                </div>
              </div>

              {/* Step checklist */}
              <div className="space-y-4">
                {activeRoute.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-accent-blue">
                        {idx + 1}
                      </div>
                      {idx < activeRoute.steps.length - 1 && (
                        <div className="w-[1px] h-8 bg-white/[0.08] mt-1" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{step.text}</h4>
                      <p className="text-[10px] text-text-secondary font-light mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] mt-6">
              <GradientButton className="w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5">
                Send Path to Mobile Wallet <ArrowUpRight className="w-4 h-4" />
              </GradientButton>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default SmartNavigation;
