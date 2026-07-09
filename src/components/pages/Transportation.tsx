"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bus, 
  Car, 
  MapPin, 
  Clock, 
  Activity, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  Navigation,
  Compass,
  CreditCard
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const Transportation: React.FC = () => {
  const { parkingLots, currentStadium, updateParkingAvailability, translate } = useStadium();
  const [selectedTransit, setSelectedTransit] = useState<string>("metro");

  // Mode comparison data
  const transitModes = [
    {
      id: "metro",
      name: "Metro (East Station)",
      icon: <Bus className="w-5 h-5 text-[#0072C6]" />,
      eta: "28 mins",
      cost: "$3.00",
      crowd: "High",
      crowdColor: "#EF4444",
      desc: "Direct subway connection to central transport terminal. High queues expected immediately after final whistle.",
      departureInterval: "Every 4 mins"
    },
    {
      id: "shuttle",
      name: "Express Shuttle (Lot E)",
      icon: <Bus className="w-5 h-5 text-green-400" />,
      eta: "12 mins",
      cost: "Free",
      crowd: "Low",
      crowdColor: "#22C55E",
      desc: "Fast lane shuttle transit to Outfield Park-and-Ride Lot E. Highly recommended for quick stadium egress.",
      departureInterval: "Every 3 mins"
    },
    {
      id: "rideshare",
      name: "Rideshare / Uber (Lot D)",
      icon: <Car className="w-5 h-5 text-amber-400" />,
      eta: "35 mins",
      cost: "$42.00",
      crowd: "Extreme",
      crowdColor: "#EF4444",
      desc: "High demand surge active. Pickup area is located at West Lot D. Expect traffic delays exiting the ring road.",
      departureInterval: "On Request (1.4x Surge)"
    },
    {
      id: "walking",
      name: "Walk to Metro West",
      icon: <Navigation className="w-5 h-5 text-accent-purple" />,
      eta: "15 mins",
      cost: "Free",
      crowd: "Moderate",
      crowdColor: "#F59E0B",
      desc: "Nice pedestrian lane bypassing primary vehicle gates. Safe corridor with active volunteer guides.",
      departureInterval: "Continuous flow"
    }
  ];

  const activeTransit = transitModes.find(t => t.id === selectedTransit) || transitModes[0];

  const handleSimulateParking = (lotId: string) => {
    const lot = parkingLots.find(p => p.id === lotId);
    if (lot && lot.available > 0) {
      // Simulate booking one spot
      updateParkingAvailability(lotId, lot.available - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Transportation AI</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Multi-modal travel routes, live-style queue times, and parking lot grids.
          </p>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <GlassCard className="p-5 border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-accent-purple/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Optimal Departure Advisory</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed font-light mt-1">
              Departing immediately at final whistle (21:30) results in a <strong className="text-red-400">28-min Metro wait</strong>. Delaying departure until 21:55 decreases Metro queues to <strong className="text-green-400">&lt; 5 mins</strong> and drops Uber/Lyft price multipliers by 20%.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-orange-400 font-bold hover:underline cursor-pointer shrink-0">
          Set Reminder Alarm <ArrowRight className="w-4 h-4" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transit Mode Comparison */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display font-semibold text-sm tracking-wide">Transit Options Comparison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transitModes.map((mode) => {
              const isSelected = selectedTransit === mode.id;
              return (
                <GlassCard
                  key={mode.id}
                  onClick={() => setSelectedTransit(mode.id)}
                  className={`p-5 flex flex-col justify-between min-h-[160px] border transition-all duration-300
                    ${isSelected 
                      ? "bg-white/[0.04] border-accent-blue/40 shadow-[0_0_15px_rgba(79,124,255,0.15)]" 
                      : "bg-transparent border-white/[0.06] hover:bg-white/[0.02]"}
                  `}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center`}>
                        {mode.icon}
                      </div>
                      <span 
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ backgroundColor: `${mode.crowdColor}15`, color: mode.crowdColor }}
                      >
                        {mode.crowd} Crowd
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-text-primary">{mode.name}</h4>
                    <p className="text-[10px] text-text-secondary mt-1 font-light leading-relaxed truncate-2-lines">{mode.desc}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 mt-4 text-[10px] text-text-secondary font-light">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ETA: {mode.eta}</span>
                    <span className="font-bold text-text-primary">{mode.cost}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Selected Transit Details */}
          <GlassCard className="p-5 space-y-4 bg-white/[0.01]">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Route Execution Details</h4>
              <span className="text-[10px] text-accent-purple font-semibold">{activeTransit.name}</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-light">{activeTransit.desc}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary font-light uppercase">Frequency</span>
                <span className="font-bold text-text-primary mt-1">{activeTransit.departureInterval}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary font-light uppercase">Fare Cost</span>
                <span className="font-bold text-accent-blue mt-1">{activeTransit.cost}</span>
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <span className="text-[10px] text-text-secondary font-light uppercase">Pickup Sector</span>
                <span className="font-bold text-accent-purple mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Lot D West</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Parking Lot Grid */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-sm tracking-wide">Parking Lots Telemetry</h3>
          
          <div className="space-y-4">
            {parkingLots.map((lot) => {
              const fillRate = Math.round(((lot.capacity - lot.available) / lot.capacity) * 100);
              return (
                <GlassCard key={lot.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-text-primary">{lot.name}</h4>
                      <p className="text-[9px] text-text-secondary mt-0.5 font-light">Walk distance: {lot.distance} | Price: {lot.price}</p>
                    </div>
                    {lot.available > 0 ? (
                      <button
                        onClick={() => handleSimulateParking(lot.id)}
                        className="px-2.5 py-1 rounded bg-accent-blue/10 hover:bg-accent-blue/20 border border-accent-blue/30 text-[9px] font-bold text-accent-blue transition-colors cursor-pointer"
                      >
                        Reserve Spot
                      </button>
                    ) : (
                      <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded">
                        FULL
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-text-secondary">
                      <span>Occupancy: {fillRate}%</span>
                      <span>{lot.available} / {lot.capacity} Spaces Free</span>
                    </div>
                    
                    <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          fillRate > 90 ? "bg-red-500" : fillRate > 60 ? "bg-amber-500" : "bg-green-500"
                        }`}
                        style={{ width: `${fillRate}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Transportation;
