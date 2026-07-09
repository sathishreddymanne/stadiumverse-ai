"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  MapPin, 
  Clock, 
  Users, 
  Activity, 
  ShieldAlert, 
  Compass, 
  MessageSquareCode, 
  Bus, 
  Accessibility, 
  AlertTriangle,
  CheckCircle2,
  ListTodo,
  Calendar,
  DollarSign,
  FlameKindling
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { StatRing } from "../primitives/StatRing";
import { AnimatedCounter } from "../primitives/AnimatedCounter";
import { GradientButton } from "../primitives/GradientButton";

export const DashboardHome: React.FC = () => {
  const { 
    role, 
    activeStadiumId, 
    activeMatchId, 
    setActivePage,
    currentStadium, 
    currentMatch, 
    currentWeather, 
    translate,
    volunteers,
    foodVendors,
    parkingLots,
    securityLogs,
    updateVolunteerTask
  } = useStadium();

  const unresolvedLogs = securityLogs.filter(l => !l.resolved);
  const activeVolunteersCount = volunteers.filter(v => v.status === "Active").length;
  
  // Calculate average gate occupancy
  const avgGateOccupancy = Math.round(
    currentStadium.gates.reduce((acc, curr) => acc + curr.occupancy, 0) / currentStadium.gates.length
  );

  // Volunteer-specific state
  const myVolunteerProfile = volunteers.find(v => v.id === 1) || volunteers[0];

  // Quick Action List
  const quickActions = [
    { label: "AI Assistant", desc: "Consult AI Co-Pilot", icon: <MessageSquareCode className="w-5 h-5 text-accent-blue" />, page: "ai-assistant" },
    { label: "Find Seats", desc: "Reroute wayfinding", icon: <Compass className="w-5 h-5 text-accent-purple" />, page: "navigation" },
    { label: "Transit Live", desc: "Check commute times", icon: <Bus className="w-5 h-5 text-orange-400" />, page: "transportation" },
    { label: "Accessibility", desc: "Access inclusion panel", icon: <Accessibility className="w-5 h-5 text-pink-400" />, page: "accessibility" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
            {role === "Fan" ? "Spectator Operations Portal" : `${role} Dashboard`}
          </h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Stadium sync active for <span className="text-text-primary font-medium">{currentStadium.name}</span> in {currentStadium.city}.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2 text-xs font-semibold text-text-secondary">
          <Activity className="w-4 h-4 text-green-400 animate-pulse" />
          <span>Real-Time Operations Active</span>
        </div>
      </div>

      {/* Main Grid: Telemetry Ring & Match Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Match Card */}
        <GlassCard className="p-6 col-span-1 lg:col-span-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-60 h-60 rounded-full bg-accent-blue/5 blur-[50px]" />
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-4">
              <span className="text-[10px] font-bold text-accent-purple bg-accent-purple/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {currentMatch.stage}
              </span>
              <span className="text-xs text-text-secondary flex items-center gap-1 font-light">
                <Clock className="w-3.5 h-3.5" /> Kickoff: {currentMatch.time}
              </span>
            </div>

            <div className="flex items-center justify-around py-4">
              {/* Team A */}
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl md:text-5xl mb-2 filter drop-shadow-md">{currentMatch.flagA}</span>
                <span className="font-bold text-sm md:text-base">{currentMatch.teamA}</span>
                <span className="text-[10px] text-text-secondary mt-1">Home Team</span>
              </div>

              {/* VERSUS / Score */}
              <div className="flex flex-col items-center gap-1.5">
                {currentMatch.status !== "Scheduled" ? (
                  <span className="font-display font-black text-2xl tracking-wider bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent px-3 py-0.5">
                    {currentMatch.scoreA} - {currentMatch.scoreB}
                  </span>
                ) : (
                  <span className="text-xs text-accent-blue font-bold tracking-widest uppercase bg-white/[0.03] px-3 py-1 rounded-lg border border-white/[0.06]">
                    VS
                  </span>
                )}
                
                <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider
                  ${currentMatch.status === "Live" 
                    ? "bg-red-500/10 border-red-500/20 text-red-400 animate-pulse" 
                    : currentMatch.status === "Completed" 
                    ? "bg-green-500/10 border-green-500/20 text-green-400" 
                    : "bg-white/[0.02] border-white/[0.08] text-text-secondary"
                  }
                `}>
                  {currentMatch.status}
                </span>
              </div>

              {/* Team B */}
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl md:text-5xl mb-2 filter drop-shadow-md">{currentMatch.flagB}</span>
                <span className="font-bold text-sm md:text-base">{currentMatch.teamB}</span>
                <span className="text-[10px] text-text-secondary mt-1">Away Team</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/[0.05] text-xs text-text-secondary font-light">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent-blue" /> {currentStadium.name}</span>
            <span>Date: {currentMatch.date}</span>
            <span>Est. Attendance: <AnimatedCounter value={currentMatch.attendance || 78000} /></span>
          </div>
        </GlassCard>

        {/* Live Occupancy Telemetry */}
        <GlassCard className="p-6 flex flex-col items-center justify-between">
          <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider text-center self-start">
            Total Venue Density
          </h3>
          <div className="py-2">
            <StatRing 
              value={avgGateOccupancy} 
              size={135} 
              strokeWidth={10} 
              title="Sensor Grid Average" 
              subtitle="Gates"
              showAlert={true}
            />
          </div>
          <div className="text-center text-[10px] text-text-secondary font-light">
            {avgGateOccupancy > 75 
              ? "Critical congestion: Recommend rerouting entry flows" 
              : "Concourse volumes are nominal. Safe entry active."}
          </div>
        </GlassCard>
      </div>

      {/* Role-Specific Custom Operations Section */}
      <AnimatePresence mode="wait">
        
        {/* 1. VOLUNTEER VIEW */}
        {role === "Volunteer" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <GlassCard className="p-6 md:col-span-2">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-accent-purple" /> Assigned Action Checklist
                </h3>
                <span className="text-[10px] text-text-secondary font-medium uppercase">My Active Taskboard</span>
              </div>

              <div className="space-y-3">
                {myVolunteerProfile.tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-2 h-2 rounded-full ${
                        t.status === "Completed" ? "bg-green-500" : t.status === "In Progress" ? "bg-accent-blue" : "bg-amber-400"
                      }`} />
                      <div>
                        <p className="font-medium text-text-primary">{t.task}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">Status: {t.status}</p>
                      </div>
                    </div>
                    {t.status !== "Completed" && (
                      <GradientButton
                        variant="secondary"
                        onClick={() => updateVolunteerTask(myVolunteerProfile.id, t.id, "Completed")}
                        className="px-2.5 py-1 text-[10px] font-semibold"
                      >
                        Complete
                      </GradientButton>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2 mb-3 border-b border-white/[0.05] pb-3">
                  <Calendar className="w-4 h-4 text-accent-blue" /> Volunteer Briefing
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  <strong>Briefing Profile:</strong> You are stationed at <strong>{myVolunteerProfile.assignedZone}</strong>. Shift hours: <strong>{myVolunteerProfile.shift}</strong>. Maintain radio sync and keep your sector clear.
                </p>
              </div>
              <GradientButton 
                onClick={() => setActivePage("volunteer-portal")} 
                className="w-full text-xs font-semibold py-2.5 mt-4"
              >
                Open Volunteer Desk
              </GradientButton>
            </GlassCard>
          </motion.div>
        )}

        {/* 2. ORGANIZER / SECURITY VIEW */}
        {(role === "Organizer" || role === "Security" || role === "Transport") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Active Volunteers */}
            <GlassCard className="p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Volunteers on Field</span>
              <div className="flex items-baseline gap-1.5 mt-2.5">
                <span className="font-display font-bold text-3xl text-gradient">
                  <AnimatedCounter value={activeVolunteersCount} />
                </span>
                <span className="text-xs text-text-secondary">/ {volunteers.length}</span>
              </div>
              <span className="text-[9px] text-green-400 font-semibold block mt-1.5">● Radio Network Synced</span>
            </GlassCard>

            {/* Unresolved Incidents */}
            <GlassCard className="p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Active Safety Alerts</span>
              <div className="flex items-baseline gap-1.5 mt-2.5">
                <span className="font-display font-bold text-3xl text-red-400">
                  <AnimatedCounter value={unresolvedLogs.length} />
                </span>
                <span className="text-xs text-text-secondary">Unresolved</span>
              </div>
              <span className="text-[9px] text-red-500 font-semibold block mt-1.5">🚨 Stretcher Teams on Guard</span>
            </GlassCard>

            {/* concessions average queue */}
            <GlassCard className="p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Average Food Queue</span>
              <div className="flex items-baseline gap-1.5 mt-2.5">
                <span className="font-display font-bold text-3xl text-orange-400">
                  <AnimatedCounter value={Math.round(foodVendors.reduce((acc, curr) => acc + curr.queueLength, 0) / foodVendors.length)} />
                </span>
                <span className="text-xs text-text-secondary">People</span>
              </div>
              <span className="text-[9px] text-text-secondary font-light block mt-1.5">Avg Wait: ~9 mins</span>
            </GlassCard>

            {/* Parking spots */}
            <GlassCard className="p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Parking Available</span>
              <div className="flex items-baseline gap-1.5 mt-2.5">
                <span className="font-display font-bold text-3xl text-emerald-400">
                  <AnimatedCounter value={parkingLots.reduce((acc, curr) => acc + curr.available, 0)} />
                </span>
                <span className="text-xs text-text-secondary">/ {parkingLots.reduce((acc, curr) => acc + curr.capacity, 0)}</span>
              </div>
              <span className="text-[9px] text-text-secondary font-light block mt-1.5">Lot E is under 50% fill</span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Grid */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-sm tracking-wide">Quick Action Utilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((a, idx) => (
            <GlassCard 
              key={idx} 
              onClick={() => setActivePage(a.page as any)}
              className="p-4 flex items-center gap-3.5 hover:bg-white/[0.04] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                {a.icon}
              </div>
              <div>
                <h4 className="font-semibold text-xs text-text-primary">{a.label}</h4>
                <p className="text-[9px] text-text-secondary mt-0.5 font-light">{a.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Gate Status & Transport Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gate Occupancy Status */}
        <GlassCard className="p-6 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Gate Entrance Scan Feeds</h3>
            <span className="text-[10px] text-accent-blue font-bold uppercase">Dynamic Telemetry</span>
          </div>

          <div className="space-y-3.5">
            {currentStadium.gates.map((g, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-text-primary">{g.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary font-light">Rate: {g.flowRate} scans/min</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      g.occupancy > 80 
                        ? "bg-red-500/10 text-red-400" 
                        : g.occupancy > 50 
                        ? "bg-amber-500/10 text-amber-400" 
                        : "bg-green-500/10 text-green-400"
                    }`}>
                      {g.status}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${g.occupancy}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className={`h-full rounded-full ${
                      g.occupancy > 80 
                        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                        : g.occupancy > 50 
                        ? "bg-amber-500" 
                        : "bg-green-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Transportation & Transit Ticker */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Transit Boarding Feeds</h3>
            <span className="text-[10px] text-orange-400 font-bold uppercase">Live Ticker</span>
          </div>

          <div className="space-y-4">
            {/* Metro */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0072C6]/10 border border-[#0072C6]/30 flex items-center justify-center text-[#0072C6]">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Metro (East Station)</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Train every 4 mins</p>
                </div>
              </div>
              <span className="text-red-400 font-bold text-right">25m queue</span>
            </div>

            {/* Shuttle bus */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Shuttle (Lot E Express)</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Departures every 3 mins</p>
                </div>
              </div>
              <span className="text-green-400 font-bold text-right">&lt; 4m wait</span>
            </div>

            {/* Rideshare multiplier */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Rideshare Surge (Lot D)</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Demand Multiplier</p>
                </div>
              </div>
              <span className="text-amber-400 font-bold text-right">1.4x surge</span>
            </div>

            {/* Traffic flow */}
            <div className="flex items-center justify-between text-xs border-t border-white/[0.04] pt-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple">
                  <FlameKindling className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Perimeter Congestion</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">External freeway status</p>
                </div>
              </div>
              <span className="text-green-400 font-bold text-right">Fluid</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
export default DashboardHome;
