"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  HelpCircle, 
  Info,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Activity
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { StatRing } from "../primitives/StatRing";

export const CrowdIntelligence: React.FC = () => {
  const { currentStadium, translate } = useStadium();
  const [selectedZone, setSelectedZone] = useState<string>("Zone A");
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);

  // Mock sector occupancy for heat map
  const zonesData = [
    { id: "Zone A", name: "North Concourse", occupancy: 88, status: "Critical", color: "#EF4444" },
    { id: "Zone B", name: "East Concourse", occupancy: 42, status: "Normal", color: "#22C55E" },
    { id: "Zone C", name: "South Concourse", occupancy: 28, status: "Underutilized", color: "#3B82F6" },
    { id: "Zone D", name: "West Concourse", occupancy: 65, status: "Moderate", color: "#F59E0B" },
    { id: "Zone E", name: "VIP Club Suite", occupancy: 12, status: "Low Density", color: "#A855F7" },
    { id: "Zone F", name: "Staff & Press Deck", occupancy: 5, status: "Restricted", color: "#9CA3AF" }
  ];

  const activeZone = zonesData.find(z => z.id === selectedZone) || zonesData[0];

  // Hourly Crowd scan telemetry (Match hours 16:00 to 23:00)
  const chartPoints = [
    { hour: "16:00", entering: 8500, exiting: 120, scans: 240, status: "Fluid" },
    { hour: "17:00", entering: 19800, exiting: 200, scans: 480, status: "Moderate" },
    { hour: "18:00", entering: 34000, exiting: 310, scans: 850, status: "Congested" },
    { hour: "19:00", entering: 15400, exiting: 550, scans: 910, status: "Peak Flow" },
    { hour: "20:00", entering: 2200, exiting: 1200, scans: 150, status: "Match Active" },
    { hour: "21:00", entering: 800, exiting: 6500, scans: 90, status: "Fluid" },
    { hour: "22:00", entering: 200, exiting: 48000, scans: 50, status: "Mass Exit" },
    { hour: "23:00", entering: 50, exiting: 18500, scans: 20, status: "Clearing" }
  ];

  // SVG dimensions for chart
  const width = 500;
  const height = 180;
  const padding = 30;

  // Max value to scale chart points
  const maxVolume = 50000;

  // Calculate coordinates for entering and exiting lines
  const getCoordinates = (type: "entering" | "exiting") => {
    return chartPoints.map((p, idx) => {
      const x = padding + (idx * (width - padding * 2)) / (chartPoints.length - 1);
      const val = p[type];
      const y = height - padding - (val / maxVolume) * (height - padding * 2);
      return { x, y };
    });
  };

  const enteringCoords = getCoordinates("entering");
  const exitingCoords = getCoordinates("exiting");

  const buildPath = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, c, idx) => {
      return idx === 0 ? `M ${c.x},${c.y}` : `${acc} L ${c.x},${c.y}`;
    }, "");
  };

  const buildAreaPath = (coords: { x: number; y: number }[]) => {
    const linePath = buildPath(coords);
    return `${linePath} L ${coords[coords.length - 1].x},${height - padding} L ${coords[0].x},${height - padding} Z`;
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Crowd Intelligence</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Real-time heatmaps overlaying stadium sectors and entry flow predictions.
          </p>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <GlassCard className="p-5 border border-accent-blue/20 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-accent-blue uppercase tracking-wider">AI Operations Recommendation</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed font-light mt-1">
              Gate A is currently at <strong className="text-red-400">87% capacity</strong>. We recommend dispatching volunteers to Gate B & Gate C to redirect arriving spectators. This will reduce entrance queue times by an estimated <strong className="text-text-primary">12 minutes</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-accent-blue font-bold hover:underline cursor-pointer shrink-0">
          Apply Rerouting Plan <ArrowRight className="w-4 h-4" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heat Map Overlay SVG */}
        <GlassCard className="p-6 lg:col-span-2 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
              <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">Sector Heatmap Grid</h3>
              <span className="text-[10px] text-text-secondary font-light">Click sectors to view details</span>
            </div>

            {/* Stadium Heatmap SVG */}
            <div className="flex items-center justify-center py-4">
              <svg viewBox="0 0 600 360" className="w-full max-w-[480px] h-auto select-none">
                {/* Stadium Outline */}
                <ellipse cx="300" cy="180" rx="190" ry="140" className="stroke-white/[0.05] fill-black/40" strokeWidth="2" />
                <ellipse cx="300" cy="180" rx="140" ry="100" className="stroke-white/[0.04] fill-none" strokeWidth="1" />
                
                {/* Heatmap Zones (Concentric arcs divided into sectors) */}
                {/* Zone A: North (Top) */}
                <path 
                  d="M 180,110 A 150,110 0 0,1 420,110 L 390,130 A 110,80 0 0,0 210,130 Z" 
                  fill={selectedZone === "Zone A" ? "#EF4444" : "#EF444455"}
                  className="stroke-[#0e0f18] hover:fill-[#EF4444] transition-all cursor-pointer"
                  strokeWidth="3"
                  onClick={() => setSelectedZone("Zone A")}
                />
                <text x="300" y="90" textAnchor="middle" className="fill-white text-[9px] font-bold">Zone A (88%)</text>

                {/* Zone B: East (Right) */}
                <path 
                  d="M 420,110 A 150,110 0 0,1 420,250 L 390,230 A 110,80 0 0,0 390,130 Z" 
                  fill={selectedZone === "Zone B" ? "#22C55E" : "#22C55E55"}
                  className="stroke-[#0e0f18] hover:fill-[#22C55E] transition-all cursor-pointer"
                  strokeWidth="3"
                  onClick={() => setSelectedZone("Zone B")}
                />
                <text x="440" y="185" textAnchor="start" className="fill-white text-[9px] font-bold">Zone B (42%)</text>

                {/* Zone C: South (Bottom) */}
                <path 
                  d="M 420,250 A 150,110 0 0,1 180,250 L 210,230 A 110,80 0 0,0 390,230 Z" 
                  fill={selectedZone === "Zone C" ? "#3B82F6" : "#3B82F655"}
                  className="stroke-[#0e0f18] hover:fill-[#3B82F6] transition-all cursor-pointer"
                  strokeWidth="3"
                  onClick={() => setSelectedZone("Zone C")}
                />
                <text x="300" y="285" textAnchor="middle" className="fill-white text-[9px] font-bold">Zone C (28%)</text>

                {/* Zone D: West (Left) */}
                <path 
                  d="M 180,250 A 150,110 0 0,1 180,110 L 210,130 A 110,80 0 0,0 210,230 Z" 
                  fill={selectedZone === "Zone D" ? "#F59E0B" : "#F59E0B55"}
                  className="stroke-[#0e0f18] hover:fill-[#F59E0B] transition-all cursor-pointer"
                  strokeWidth="3"
                  onClick={() => setSelectedZone("Zone D")}
                />
                <text x="160" y="185" textAnchor="end" className="fill-white text-[9px] font-bold">Zone D (65%)</text>

                {/* Pitch */}
                <rect x="230" y="135" width="140" height="90" rx="4" className="fill-green-600/10 stroke-green-500/10" strokeWidth="1" />
                <circle cx="300" cy="180" r="15" className="stroke-green-500/10 fill-none" strokeWidth="1" />

                {/* Center Labels */}
                <text x="300" y="175" textAnchor="middle" className="fill-white/30 text-[10px] font-bold tracking-widest">PITCH</text>
              </svg>
            </div>
          </div>

          {/* Color Key */}
          <div className="flex justify-center gap-6 text-[9px] text-text-secondary border-t border-white/[0.05] pt-4 font-light">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/30 border border-red-500" /> Red: High (&gt;80%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" /> Amber: Mod (50-80%)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500" /> Blue: Low (&lt;50%)</span>
          </div>
        </GlassCard>

        {/* Selected Zone telemetry + Traffic Chart */}
        <div className="flex flex-col gap-6">
          
          {/* Zone Details */}
          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Zone Telemetry</h3>
              <span className="text-[10px] text-accent-purple font-semibold uppercase">{activeZone.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary font-light uppercase">Sector Name</span>
                <span className="text-xs font-bold text-text-primary mt-1">{activeZone.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary font-light uppercase">Density Alert</span>
                <span className="text-xs font-bold mt-1" style={{ color: activeZone.color }}>{activeZone.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white/[0.01] border border-white/[0.05] rounded-xl p-3.5">
              <StatRing 
                value={activeZone.occupancy} 
                size={110} 
                strokeWidth={9} 
                title={`${activeZone.id} Load`}
                showAlert={true}
              />
            </div>
          </GlassCard>

          {/* Traffic Line Chart (Custom SVG implementation) */}
          <GlassCard className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Traffic Load Forecast</h3>
                <span className="text-[10px] text-text-secondary flex items-center gap-1 font-light">
                  <Activity className="w-3.5 h-3.5 text-accent-blue animate-pulse" /> Live Telemetry
                </span>
              </div>

              {/* Chart SVG */}
              <div className="relative mt-2">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={width - padding} y2={padding} className="stroke-white/[0.04]" strokeWidth="1" />
                  <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} className="stroke-white/[0.04]" strokeWidth="1" />
                  <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-white/[0.08]" strokeWidth="1" />

                  {/* Area fill for Entering */}
                  <path 
                    d={buildAreaPath(enteringCoords)} 
                    fill="url(#enteringGrad)" 
                    opacity="0.15" 
                  />

                  {/* Line for Entering */}
                  <path 
                    d={buildPath(enteringCoords)} 
                    fill="none" 
                    stroke="#4F7CFF" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />

                  {/* Area fill for Exiting */}
                  <path 
                    d={buildAreaPath(exitingCoords)} 
                    fill="url(#exitingGrad)" 
                    opacity="0.15" 
                  />

                  {/* Line for Exiting */}
                  <path 
                    d={buildPath(exitingCoords)} 
                    fill="none" 
                    stroke="#A855F7" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="enteringGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F7CFF" />
                      <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="exitingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* X Axis Labels */}
                  {chartPoints.map((p, idx) => {
                    const x = padding + (idx * (width - padding * 2)) / (chartPoints.length - 1);
                    return (
                      <text 
                        key={idx} 
                        x={x} 
                        y={height - 12} 
                        textAnchor="middle" 
                        className="fill-text-secondary text-[8px] font-medium"
                      >
                        {p.hour}
                      </text>
                    );
                  })}

                  {/* Interactive hover points */}
                  {chartPoints.map((p, idx) => {
                    const x = padding + (idx * (width - padding * 2)) / (chartPoints.length - 1);
                    return (
                      <rect
                        key={idx}
                        x={x - 15}
                        y={0}
                        width={30}
                        height={height}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredChartPoint(idx)}
                        onMouseLeave={() => setHoveredChartPoint(null)}
                      />
                    );
                  })}

                  {/* Hover vertical cursor line */}
                  {hoveredChartPoint !== null && (
                    <line 
                      x1={enteringCoords[hoveredChartPoint].x} 
                      y1={padding} 
                      x2={enteringCoords[hoveredChartPoint].x} 
                      y2={height - padding} 
                      className="stroke-accent-blue/40" 
                      strokeWidth="1" 
                      strokeDasharray="3 3"
                    />
                  )}
                </svg>

                {/* Live values indicator box based on hover */}
                {hoveredChartPoint !== null && (
                  <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 bg-[#0e0f18] border border-white/[0.1] rounded-lg p-2 flex gap-4 text-[9px] shadow-2xl z-10 pointer-events-none">
                    <div>
                      <span className="text-text-secondary font-light">Hour:</span>
                      <span className="font-bold text-text-primary block">{chartPoints[hoveredChartPoint].hour}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary font-light">Entering:</span>
                      <span className="font-bold text-accent-blue block">{chartPoints[hoveredChartPoint].entering.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary font-light">Exiting:</span>
                      <span className="font-bold text-accent-purple block">{chartPoints[hoveredChartPoint].exiting.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary font-light">Status:</span>
                      <span className="font-bold text-green-400 block">{chartPoints[hoveredChartPoint].status}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chart Legend */}
              <div className="flex justify-center gap-4 text-[9px] text-text-secondary mt-3 font-light">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-[2px] bg-accent-blue" /> Entering flow</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-[2px] bg-accent-purple" /> Exiting flow</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.05] mt-4 flex items-center justify-between text-[10px] text-text-secondary font-light">
              <span>Sensor scan rate: 10Hz</span>
              <span className="flex items-center gap-1 text-green-400"><ShieldCheck className="w-3.5 h-3.5" /> High Precision Data</span>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default CrowdIntelligence;
