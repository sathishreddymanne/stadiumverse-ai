"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Sparkles, 
  Users, 
  ShieldAlert, 
  Activity, 
  Droplet, 
  Lightbulb, 
  Trash2, 
  TrendingUp, 
  Pizza, 
  DollarSign, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { StatRing } from "../primitives/StatRing";
import { GradientButton } from "../primitives/GradientButton";

export const OrganizerCommand: React.FC = () => {
  const { 
    currentStadium, 
    currentMatch, 
    securityLogs, 
    volunteers, 
    foodVendors, 
    parkingLots, 
    addSecurityLog,
    translate 
  } = useStadium();

  const [localLogs, setLocalLogs] = useState(securityLogs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toggle log resolution state
  const handleToggleResolve = (id: number) => {
    setLocalLogs(prev => 
      prev.map(log => log.id === id ? { ...log, resolved: !log.resolved } : log)
    );
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const activeVolunteersCount = volunteers.filter(v => v.status === "Active").length;
  const unresolvedIncidents = localLogs.filter(l => !l.resolved);

  // Concessions Inventory
  const foodInventory = [
    { name: "Kickoff Burgers", stock: 45, max: 100, unit: "Patties", status: "Nominal" },
    { name: "Azteca Tacos", stock: 12, max: 100, unit: "Taco Shells", status: "Critical Low" },
    { name: "Golden Goal Pizza", stock: 68, max: 100, unit: "Dough", status: "Nominal" },
    { name: "Eco-Green Bowls", stock: 35, max: 100, unit: "Salad Bases", status: "Normal" }
  ];

  // Infrastructure Telemetry
  const infraMetrics = [
    { label: "Power Grid Load", val: 78, max: 100, unit: "MW", icon: <Lightbulb className="w-4 h-4 text-yellow-400" /> },
    { label: "Water Reserves", val: 82, max: 100, unit: "k Gal", icon: <Droplet className="w-4 h-4 text-blue-400" /> },
    { label: "Waste Bin Capacity", val: 54, max: 100, unit: "tons", icon: <Trash2 className="w-4 h-4 text-accent-purple" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Executive Command Center</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Global operational telemetry and automated AI synthesis reports for <strong>{currentStadium.name}</strong>.
          </p>
        </div>
        
        <GradientButton 
          variant="secondary" 
          onClick={handleRefreshData}
          disabled={isRefreshing}
          className="px-4 py-2 text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-accent-blue" : ""}`} />
          {isRefreshing ? "Syncing Sensors..." : "Sync Telemetry"}
        </GradientButton>
      </div>

      {/* AI Synthesized Executive Summary */}
      <GlassCard className="p-5 border border-green-500/20 bg-gradient-to-r from-green-500/10 to-accent-blue/10 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-48 h-48 rounded-full bg-green-500/5 blur-[40px]" />
        
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">AI Executive Synthesis</h3>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed font-light">
          <strong>Operations Summary:</strong> Attendance stands at <strong>99.2%</strong> (82,100 checked in) for {currentMatch.teamA} vs {currentMatch.teamB}. Entry volumes at Gate A have successfully decreased after redirection. Water and power infrastructures remain stable at 82% and 78% respectively. <strong className="text-red-400">{unresolvedIncidents.length} active alerts</strong> require attention, dominated by the elevator malfunction at Zone E. Concessions revenue reached <strong>$482k</strong>.
        </p>
      </GlassCard>

      {/* Grid: Infrastructure, Inventory, Alerts, Concessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Infrastructure Telemetry */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-sm tracking-wide">Stadium Infrastructure</h3>
          
          <div className="space-y-4">
            {infraMetrics.map((infra, idx) => (
              <GlassCard key={idx} className="p-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-primary flex items-center gap-2">
                    {infra.icon} {infra.label}
                  </span>
                  <span className="text-text-secondary">{infra.val} / {infra.max} {infra.unit}</span>
                </div>
                
                <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${infra.val}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                  />
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Revenue Widget */}
          <GlassCard className="p-5 flex flex-col justify-between min-h-[140px] bg-gradient-to-br from-[#10b981]/5 to-black/40 border-emerald-500/20">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Concessions Revenue</span>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="font-display font-bold text-3xl text-emerald-400">
                  <DollarSign className="w-6 h-6 inline text-emerald-400" />482,500
                </span>
                <span className="text-xs text-text-secondary">USD</span>
              </div>
            </div>
            <span className="text-[9px] text-green-400 font-semibold block mt-4">▲ +12% over group stage average</span>
          </GlassCard>
        </div>

        {/* concessions inventory */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Concessions Inventory</h3>
            <span className="text-[10px] text-orange-400 font-bold uppercase">Restock Telemetry</span>
          </div>

          <div className="space-y-4">
            {foodInventory.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-text-primary">{item.name}</span>
                  <span className={`text-[9px] font-bold ${
                    item.status === "Critical Low" ? "text-red-400" : "text-text-secondary"
                  }`}>{item.stock}% ({item.status})</span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.stock}%` }}
                    className={`h-full rounded-full ${
                      item.status === "Critical Low" ? "bg-red-500" : "bg-accent-blue"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[9px] text-text-secondary font-light text-center border-t border-white/[0.04] pt-3.5 mt-5">
            Automatic triggers dispatched to logistics hubs
          </div>
        </GlassCard>

        {/* Security & Incident Log feeds */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Live Security Logs</h3>
            <span className="text-[10px] text-red-400 font-bold uppercase">{unresolvedIncidents.length} Pending</span>
          </div>

          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {localLogs.map((log) => (
              <div 
                key={log.id} 
                className={`p-3 rounded-xl border text-[11px] leading-normal space-y-2
                  ${log.resolved 
                    ? "border-white/[0.03] bg-white/[0.01] opacity-50" 
                    : log.severity === "High" 
                    ? "border-red-500/20 bg-red-950/5" 
                    : "border-white/[0.06] bg-white/[0.02]"}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`font-bold flex items-center gap-1 ${
                    log.resolved ? "text-text-secondary" : log.severity === "High" ? "text-red-400" : "text-amber-400"
                  }`}>
                    {log.severity === "High" ? <ShieldAlert className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {log.severity} Alert
                  </span>
                  <span className="text-[9px] text-text-secondary">{log.time}</span>
                </div>
                
                <p className="text-text-secondary font-light">{log.message}</p>
                <div className="flex justify-between items-center border-t border-white/[0.04] pt-2">
                  <span className="text-[9px] text-accent-purple font-medium">Zone: {log.zone}</span>
                  <button
                    onClick={() => handleToggleResolve(log.id)}
                    className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-colors cursor-pointer ${
                      log.resolved 
                        ? "bg-white/[0.06] text-text-secondary" 
                        : "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                    }`}
                  >
                    {log.resolved ? "Reopen" : "Resolve"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
export default OrganizerCommand;
