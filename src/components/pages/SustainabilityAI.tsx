"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, 
  Sparkles, 
  MapPin, 
  Check, 
  ArrowRight,
  TrendingDown,
  Trophy,
  BatteryCharging,
  Trash2,
  Coffee,
  Coins
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { StatRing } from "../primitives/StatRing";
import { GradientButton } from "../primitives/GradientButton";

interface Badge {
  id: string;
  name: string;
  desc: string;
  points: number;
  unlocked: boolean;
  icon: React.ReactNode;
}

export const SustainabilityAI: React.FC = () => {
  const { currentStadium } = useStadium();
  
  // Interactive points state
  const [ecoPoints, setEcoPoints] = useState(150);
  const [claimedTasks, setClaimedTasks] = useState<string[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(["badge1"]);

  const badgesList: Badge[] = [
    { id: "badge1", name: "Green Commuter", desc: "Arrive at the stadium using metro or shuttle express.", points: 100, unlocked: unlockedBadges.includes("badge1"), icon: <Leaf className="w-5 h-5 text-emerald-400" /> },
    { id: "badge2", name: "Zero Waste Hero", desc: "Recycle three food containers at smart sorting bins.", points: 50, unlocked: unlockedBadges.includes("badge2"), icon: <Trash2 className="w-5 h-5 text-cyan-400" /> },
    { id: "badge3", name: "Hydration Champion", desc: "Refill your reusable bottle at stadium water kiosks twice.", points: 75, unlocked: unlockedBadges.includes("badge3"), icon: <Coffee className="w-5 h-5 text-blue-400" /> },
  ];

  const sustainabilityTasks = [
    { id: "task_metro", label: "Check-in via Metro", desc: "Take the East Line Metro (saves 2.1kg CO₂)", points: 50 },
    { id: "task_recycle", label: "Recycle Cup", desc: "Dispose cup in Sector 104 smart bin (saves 0.3kg CO₂)", points: 20 },
    { id: "task_water", label: "Water Refill", desc: "Refill reusable bottle at Sec 112 kiosk (saves 0.2kg CO₂)", points: 15 }
  ];

  const refillStations = [
    { name: "Smart Water Refill Station 4", location: "Concourse Level 1, Sec 104", distance: "15m away", status: "Active / Chilled" },
    { name: "Smart Recycling Hub B", location: "Gate B Entry Lobby", distance: "45m away", status: "Active / 82% Free" },
    { name: "Organic Compost Bin Grid 2", location: "Concourse Level 1, Sec 112", distance: "60m away", status: "Active / 40% Free" },
  ];

  const handleClaimPoints = (taskId: string, points: number) => {
    if (claimedTasks.includes(taskId)) return;
    
    setClaimedTasks(prev => [...prev, taskId]);
    const newPoints = ecoPoints + points;
    setEcoPoints(newPoints);

    // Evaluate badge unlock: Badge 2 unlocks at 170 points, Badge 3 unlocks at 220 points
    if (newPoints >= 170 && !unlockedBadges.includes("badge2")) {
      setUnlockedBadges(prev => [...prev, "badge2"]);
    }
    if (newPoints >= 220 && !unlockedBadges.includes("badge3")) {
      setUnlockedBadges(prev => [...prev, "badge3"]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Sustainability AI</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Gamified green travel incentives, smart recycling locations, and carbon emission telemetry.
          </p>
        </div>
        
        {/* Eco points tally */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-4 py-2 text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <Coins className="w-4 h-4 text-emerald-400" />
          <span>My Balance: {ecoPoints} Eco Points</span>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <GlassCard className="p-5 border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-accent-blue/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Leaf className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Eco-Transit Incentive</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed font-light mt-1">
              By choosing the **East Metro Line** over a personal rideshare, you save **2.3kg of carbon emissions**. Scan your digital transport ticket below to instantly claim **+50 Eco Points** toward official stadium merchandise discounts.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold hover:underline cursor-pointer shrink-0">
          Claim Metro Points <ArrowRight className="w-4 h-4" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Carbon Footprint Tracker */}
        <GlassCard className="p-6 flex flex-col items-center justify-between min-h-[380px]">
          <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider text-center self-start">
            My Carbon Savings Target
          </h3>
          
          <div className="py-4">
            <StatRing 
              value={74} 
              size={135} 
              strokeWidth={10} 
              title="Daily CO₂ Offset" 
              subtitle="Saved"
            />
          </div>

          <div className="space-y-2 w-full text-center">
            <div className="flex items-baseline justify-center gap-1.5 text-xs text-text-secondary">
              <span className="text-xl font-bold text-text-primary">4.2 kg</span>
              <span>/ 6.0 kg Offset Goal</span>
            </div>
            <p className="text-[10px] text-text-secondary font-light">
              Equivalent to charging 520 mobile smartphones from zero to 100%.
            </p>
          </div>
        </GlassCard>

        {/* Claimable Eco points & badges */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          {/* Claim points grid */}
          <GlassCard className="p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Claim Sustainability Rewards</h3>
            
            <div className="space-y-3">
              {sustainabilityTasks.map((t) => {
                const isClaimed = claimedTasks.includes(t.id);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.05] text-xs">
                    <div>
                      <h4 className="font-semibold text-text-primary">{t.label}</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5 font-light">{t.desc}</p>
                    </div>

                    <button
                      disabled={isClaimed}
                      onClick={() => handleClaimPoints(t.id, t.points)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer
                        ${isClaimed 
                          ? "bg-green-500/10 border border-green-500/20 text-green-400" 
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"}
                      `}
                    >
                      {isClaimed ? (
                        <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Claimed</span>
                      ) : (
                        `Claim +${t.points}`
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Gamified badge display */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">My Achieved Badges</h3>
              <span className="text-[10px] text-accent-purple font-semibold">Trophy Case</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {badgesList.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`
                    p-4 rounded-xl border flex flex-col justify-between min-h-[140px] transition-all
                    ${badge.unlocked 
                      ? "bg-gradient-to-tr from-[#10b981]/5 to-black/40 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                      : "bg-white/[0.01] border-white/[0.04] opacity-40"}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.08]`}>
                      {badge.icon}
                    </div>
                    {badge.unlocked && <span className="text-[8px] uppercase font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded">Unlocked</span>}
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-xs text-text-primary">{badge.name}</h4>
                    <p className="text-[9px] text-text-secondary font-light mt-0.5 leading-normal">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>

      {/* Water & Recycling station finder list */}
      <GlassCard className="p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
          <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Nearby Green Facilities Finder</h3>
          <span className="text-[10px] text-text-secondary font-light">Interactive Directory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {refillStations.map((station, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col justify-between text-xs space-y-3">
              <div>
                <h4 className="font-bold text-text-primary">{station.name}</h4>
                <p className="text-[10px] text-text-secondary mt-0.5 font-light flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent-blue" /> {station.location}</p>
              </div>

              <div className="flex justify-between items-center text-[10px] border-t border-white/[0.04] pt-2 text-text-secondary font-light">
                <span>{station.distance}</span>
                <span className="text-green-400 font-semibold">{station.status}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
};
export default SustainabilityAI;
