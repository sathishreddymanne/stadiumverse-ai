"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCheck, 
  ListTodo, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Send,
  Loader2,
  Clock,
  MapPin
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const VolunteerPortal: React.FC = () => {
  const { 
    volunteers, 
    currentStadium, 
    currentMatch, 
    addSecurityLog, 
    updateVolunteerTask, 
    addVolunteerTask 
  } = useStadium();

  // We act as Volunteer ID: 1 (Alejandro Ruiz) for demonstration
  const myVolunteer = volunteers.find(v => v.id === 1) || volunteers[0];

  const [activeTab, setActiveTab] = useState<"tasks" | "schedule" | "incident">("tasks");
  const [taskDescription, setTaskDescription] = useState("");
  
  // Incident Form state
  const [incidentType, setIncidentType] = useState("Facilities Malfunction");
  const [incidentZone, setIncidentZone] = useState("Sec 104 Concourse");
  const [incidentSeverity, setIncidentSeverity] = useState<"Low" | "Medium" | "High">("Medium");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription.trim()) return;
    addVolunteerTask(myVolunteer.id, taskDescription);
    setTaskDescription("");
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentDesc.trim()) return;
    
    setIsSubmitting(true);
    setSubmitSuccess(false);

    setTimeout(() => {
      // Add to global security logs via context
      addSecurityLog({
        message: `${incidentType}: ${incidentDesc}`,
        severity: incidentSeverity,
        zone: incidentZone
      });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setIncidentDesc("");
      
      // Clear success notification after 3s
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1200);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/10 border border-green-500/20 text-green-400";
      case "In Progress": return "bg-accent-blue/10 border border-accent-blue/20 text-accent-blue";
      default: return "bg-amber-500/10 border border-amber-500/20 text-amber-400";
    }
  };

  const shiftCalendar = [
    { day: "Today (Match Day)", shift: "08:00 - 16:00", zone: "North Concourse (Zone A)", status: "Active" },
    { day: "Tomorrow (Rest Day)", shift: "Off-Duty", zone: "N/A", status: "Off-Duty" },
    { day: "Saturday (Match Day)", shift: "15:00 - 23:00", zone: "South Entrance Plaza (Zone D)", status: "Scheduled" },
    { day: "Sunday (Rest Day)", shift: "Off-Duty", zone: "N/A", status: "Off-Duty" }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Volunteer Portal</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Signed in as <strong className="text-text-primary">{myVolunteer.name}</strong> ({myVolunteer.role}).
          </p>
        </div>
      </div>

      {/* AI Generated Briefing Card */}
      <GlassCard className="p-5 border border-accent-purple/20 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-48 h-48 rounded-full bg-accent-purple/5 blur-[40px]" />
        
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple">
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">AI Shift Briefing</h3>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed font-light">
          <strong>Shift Directive:</strong> USA vs England kickoff is in 30 minutes. Concourse Zone A is at <strong>88% density</strong>. We anticipate high concession traffic in Sectors 102 & 104 in approx 10 minutes. Standby near information kiosk 3 to assist accessibility groups arriving via the elevator. Maintain radio contact with base operations.
        </p>
      </GlassCard>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] gap-2">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "tasks" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-secondary"
          }`}
        >
          <ListTodo className="w-4 h-4 inline mr-1.5" /> Assigned Tasks
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "schedule" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-secondary"
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-1.5" /> Shift Schedule
        </button>
        <button
          onClick={() => setActiveTab("incident")}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "incident" ? "border-accent-blue text-accent-blue" : "border-transparent text-text-secondary"
          }`}
        >
          <ShieldAlert className="w-4 h-4 inline mr-1.5" /> Report Incident
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TASKS VIEW */}
        {activeTab === "tasks" && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Task list */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-semibold text-sm tracking-wide">Action Tasks</h3>
              
              <div className="space-y-3">
                {myVolunteer.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] text-xs">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2.5 h-2.5 rounded-full ${
                        task.status === "Completed" ? "bg-green-500" : task.status === "In Progress" ? "bg-accent-blue" : "bg-amber-400"
                      }`} />
                      <div>
                        <h4 className="font-semibold text-text-primary">{task.task}</h4>
                        <p className="text-[10px] text-text-secondary mt-0.5 font-light">Assigned Zone: {myVolunteer.assignedZone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${getStatusStyle(task.status)}`}>
                        {task.status}
                      </span>
                      {task.status !== "Completed" && (
                        <select
                          value={task.status}
                          onChange={(e) => updateVolunteerTask(myVolunteer.id, task.id, e.target.value as any)}
                          className="bg-[#0e0f18] border border-white/[0.08] rounded px-2 py-0.5 text-[10px] text-text-primary focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Task Addition Form */}
            <GlassCard className="p-5 flex flex-col justify-between h-fit">
              <form onSubmit={handleAddTask} className="space-y-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary border-b border-white/[0.05] pb-2">Create Personal Task</h3>
                <div className="space-y-1.5">
                  <label htmlFor="personal-task-input" className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Task Description:</label>
                  <input
                    id="personal-task-input"
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="e.g. Replenish flyer maps at desk..."
                    className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light"
                  />
                </div>
                <GradientButton type="submit" className="w-full text-xs font-semibold py-2 flex items-center justify-center gap-1.5">
                  Add Task <ArrowRight className="w-3.5 h-3.5" />
                </GradientButton>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {/* CALENDAR VIEW */}
        {activeTab === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-4"
          >
            <h3 className="font-display font-semibold text-sm tracking-wide">Shift Calendar</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {shiftCalendar.map((shift, idx) => (
                <GlassCard key={idx} className="p-5 space-y-3.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-text-primary block">{shift.day}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      shift.status === "Active" 
                        ? "bg-green-500/10 border border-green-500/20 text-green-400" 
                        : shift.status === "Scheduled" 
                        ? "bg-accent-blue/10 border border-accent-blue/20 text-accent-blue" 
                        : "bg-white/[0.02] border border-white/[0.05] text-text-secondary"
                    }`}>
                      {shift.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-3.5 h-3.5" /> <span>{shift.shift}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin className="w-3.5 h-3.5" /> <span className="truncate">{shift.zone}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* INCIDENT REPORT VIEW */}
        {activeTab === "incident" && (
          <motion.div
            key="incident"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-xl"
          >
            <GlassCard className="p-6">
              <form onSubmit={handleIncidentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
                  <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">File Incident Dispatch</h3>
                  <span className="text-[10px] text-red-400 font-bold uppercase flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" /> High Priority Channel</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label htmlFor="incident-category-select" className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Incident Category:</label>
                    <select
                      id="incident-category-select"
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                      className="w-full bg-[#0e0f18] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none cursor-pointer"
                    >
                      <option value="Facilities Malfunction">Facilities Malfunction</option>
                      <option value="Crowd Blockage">Crowd Blockage</option>
                      <option value="Medical Emergency">Medical Emergency</option>
                      <option value="Security Violation">Security Violation</option>
                    </select>
                  </div>

                  {/* Zone */}
                  <div className="space-y-1.5">
                    <label htmlFor="incident-location-input" className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Location / Zone:</label>
                    <input
                      id="incident-location-input"
                      type="text"
                      value={incidentZone}
                      onChange={(e) => setIncidentZone(e.target.value)}
                      placeholder="e.g. Sec 112 Stairs"
                      className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light"
                    />
                  </div>
                </div>

                {/* Severity */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Severity Level:</label>
                  <div className="flex gap-4 text-xs font-semibold">
                    {["Low", "Medium", "High"].map((sev) => (
                      <label key={sev} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="severity"
                          value={sev}
                          checked={incidentSeverity === sev}
                          onChange={() => setIncidentSeverity(sev as any)}
                          className="accent-pink-500 cursor-pointer"
                        />
                        <span className={sev === "High" ? "text-red-400" : sev === "Medium" ? "text-amber-400" : "text-accent-blue"}>{sev} Priority</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label htmlFor="incident-details-textarea" className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Incident Details:</label>
                  <textarea
                    id="incident-details-textarea"
                    value={incidentDesc}
                    onChange={(e) => setIncidentDesc(e.target.value)}
                    rows={4}
                    placeholder="Provide specific details e.g. Slippery spill on stairs leading to Section 104, requesting sanitation cleanup..."
                    className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/[0.05]">
                  <span className="text-[9px] text-text-secondary font-light">Submitting broadcasts warning to organizer dashboards</span>
                  
                  <div className="flex items-center gap-3">
                    <GradientButton 
                      type="submit" 
                      disabled={isSubmitting || !incidentDesc.trim()}
                      className="px-6 py-2.5 text-xs font-semibold flex items-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Dispatching...
                        </>
                      ) : (
                        <>
                          Send Alert <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </GradientButton>
                  </div>
                </div>

                {/* Success Indicator */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold flex items-center gap-2 mt-4"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Incident log successfully broadcast to Organizer Command & Security.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default VolunteerPortal;
