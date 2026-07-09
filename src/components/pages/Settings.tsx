"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  ShieldCheck, 
  Mail, 
  HelpCircle,
  CheckCircle2,
  Loader2,
  FileText,
  Globe2
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

export const Settings: React.FC = () => {
  const { currentStadium, role } = useStadium();

  // Profile Form states
  const [name, setName] = useState("Sathish Kumar");
  const [email, setEmail] = useState("sathish@worldcup2026.org");
  const [stadiumAlerts, setStadiumAlerts] = useState(true);
  const [transitAlerts, setTransitAlerts] = useState(false);
  const [medAlerts, setMedAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Contact Form states
  const [contactSubject, setContactSubject] = useState("Elevator malfunction reporting feedback");
  const [contactMsg, setContactMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 1200);
  };

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setIsSending(true);
    setSendSuccess(false);

    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setContactMsg("");
      setTimeout(() => setSendSuccess(false), 2500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight">System Settings</h1>
          <p className="text-xs text-text-secondary font-light mt-1">
            Manage your operating credentials, notification thresholds, and contact operations base.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile & Notifications Card */}
        <GlassCard className="p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
            <h3 className="font-bold text-xs uppercase text-text-secondary tracking-wider">User Profile Configuration</h3>
            <span className="text-[10px] text-accent-blue font-bold uppercase">{role} Credentials</span>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Email Address:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light"
                />
              </div>
            </div>

            {/* Notification Switches */}
            <div className="space-y-3 pt-3 border-t border-white/[0.05]">
              <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Notification Priorities:</label>
              
              <div className="space-y-2.5">
                {/* 1. Security alerts */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary">Critical Safety Broadcasts</span>
                    <span className="text-[10px] text-text-secondary font-light mt-0.5">High severity logs, evacuation sirens</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStadiumAlerts(!stadiumAlerts)}
                    className="w-10 h-5.5 rounded-full bg-white/[0.05] border border-white/[0.07] relative cursor-pointer"
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      stadiumAlerts ? "right-1 bg-accent-blue" : "left-1 bg-text-secondary"
                    }`} />
                  </button>
                </div>

                {/* 2. Transit alerts */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary">Transport Delay Updates</span>
                    <span className="text-[10px] text-text-secondary font-light mt-0.5">Live shuttle express queues, parking grids</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTransitAlerts(!transitAlerts)}
                    className="w-10 h-5.5 rounded-full bg-white/[0.05] border border-white/[0.07] relative cursor-pointer"
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      transitAlerts ? "right-1 bg-accent-blue" : "left-1 bg-text-secondary"
                    }`} />
                  </button>
                </div>

                {/* 3. Medical alerts */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary">First Aid / Medical Requests</span>
                    <span className="text-[10px] text-text-secondary font-light mt-0.5">Paramedic dispatches, heat exhaustion advisories</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMedAlerts(!medAlerts)}
                    className="w-10 h-5.5 rounded-full bg-white/[0.05] border border-white/[0.07] relative cursor-pointer"
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      medAlerts ? "right-1 bg-accent-blue" : "left-1 bg-text-secondary"
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex justify-end items-center gap-3">
              <AnimatePresence>
                {saveSuccess && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-green-400 font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> Settings updated
                  </motion.span>
                )}
              </AnimatePresence>

              <GradientButton 
                type="submit" 
                disabled={isSaving}
                className="px-6 py-2.5 text-xs font-semibold"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </GradientButton>
            </div>
          </form>
        </GlassCard>

        {/* Contact Operations Form */}
        <div className="flex flex-col gap-6">
          
          {/* Contact Form Card */}
          <GlassCard className="p-5">
            <form onSubmit={handleSendContact} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/[0.05] pb-3 mb-2">
                <Mail className="w-4 h-4 text-accent-purple" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Message Ops Command</h3>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Subject Inquiry:</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-[#0e0f18] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold block">Message Details:</label>
                <textarea
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  rows={4}
                  placeholder="Type your message to stadium operations center..."
                  className="w-full bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:outline-none placeholder-text-secondary/40 font-light resize-none"
                />
              </div>

              <div className="pt-2 border-t border-white/[0.05] flex justify-between items-center">
                <AnimatePresence>
                  {sendSuccess && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[9px] text-green-400 font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sent
                    </motion.span>
                  )}
                </AnimatePresence>

                <GradientButton 
                  type="submit" 
                  disabled={isSending || !contactMsg.trim()}
                  className="px-4 py-2 text-xs font-semibold ml-auto"
                >
                  {isSending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </GradientButton>
              </div>
            </form>
          </GlassCard>

          {/* About Platform details */}
          <GlassCard className="p-5 space-y-3.5 text-xs font-light">
            <h4 className="font-bold text-xs text-text-primary border-b border-white/[0.05] pb-2">Platform About</h4>
            <div className="flex justify-between">
              <span className="text-text-secondary">App Version:</span>
              <span className="font-bold text-text-primary">1.0.0 (Hackathon Build)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">AI Core Model:</span>
              <span className="font-bold text-text-primary flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5 text-accent-blue animate-spin" style={{ animationDuration: '8s' }} /> Gemini 1.5 Pro Sync</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Security Compliance:</span>
              <span className="font-bold text-green-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> HIPAA & GDPR compliant</span>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};
export default Settings;
