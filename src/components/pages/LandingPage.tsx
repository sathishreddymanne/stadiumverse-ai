"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Map, 
  Users, 
  Bus, 
  Accessibility, 
  Languages, 
  Leaf, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Trophy,
  Globe2,
  Activity
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";
import { AnimatedCounter } from "../primitives/AnimatedCounter";

export const LandingPage: React.FC = () => {
  const { login } = useStadium();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { value: 48, label: "Host Stadiums", suffix: "", prefix: "" },
    { value: 6, label: "Attending Fans", suffix: "M+", prefix: "" },
    { value: 10, label: "Supported Languages", suffix: "", prefix: "" },
    { value: 99, label: "AI Response Accuracy", suffix: "%", prefix: "" }
  ];

  const features = [
    {
      icon: <Bot className="w-6 h-6 text-accent-blue" />,
      title: "AI Co-Pilot Assistant",
      description: "Chatbot offering real-time guidance on gates, seating, dining queue forecasts, and transport schedules."
    },
    {
      icon: <Map className="w-6 h-6 text-accent-purple" />,
      title: "Smart Wayfinding",
      description: "Vector-based routing that shifts paths dynamically based on crowd congestion, safety hazards, and accessibility."
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      title: "Crowd Flow Telemetry",
      description: "Live occupancy dashboards and gate traffic scan metrics to prevent choke points at entrance lobbies."
    },
    {
      icon: <Bus className="w-6 h-6 text-orange-400" />,
      title: "Multi-Modal Transport",
      description: "Live transit boarding queue checks, taxi/rideshare price surges, and official parking lot space indicators."
    },
    {
      icon: <Accessibility className="w-6 h-6 text-pink-400" />,
      title: "Accessibility Center",
      description: "Assistive tools featuring screen narration, custom zoom controls, sign language overlays, and step-free paths."
    },
    {
      icon: <Languages className="w-6 h-6 text-yellow-400" />,
      title: "Multilingual Engine",
      description: "Instantly translates local stadium audio announcements across 10 official FIFA languages with voice playback."
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: "Sustainability Tracker",
      description: "Track carbon footprints, claim eco-point tickets for green transit, and find local recycling hubs."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-indigo-400" />,
      title: "Volunteer Command",
      description: "Interactive scheduling portal with push notifications for tasks and one-tap emergency incident reports."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "Emergency Evacuation",
      description: "Active high-contrast layout mode pushing instant step-by-step guidance to safety zones."
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "Authenticate & Select Role",
      description: "Sign in securely via mock Google auth. Pick your profile: Fan, Volunteer, Security, Organizer, or Logistics Liaison."
    },
    {
      step: "02",
      title: "Connect Real-Time Telemetry",
      description: "StadiumVerse AI aggregates gate flow scanners, crowd heatmaps, first aid logs, and weather feeds dynamically."
    },
    {
      step: "03",
      title: "Activate AI Assistance",
      description: "Interact with live vector navigators, custom accessibility panels, or the Generative AI text chat for tailored support."
    }
  ];

  const testimonials = [
    {
      quote: "StadiumVerse AI was vital for MetLife operations. We detected a choke point at Gate A and redirected 8,000 fans to Gate B within minutes, averting safety issues.",
      author: "Robert Kowalski",
      title: "FIFA Venue Director",
      avatar: "RK"
    },
    {
      quote: "The wheelchair-accessible wayfinding is a game-changer. It routed us through the South Lift (Zone E) automatically, avoiding massive stairways and crowds.",
      author: "Helena & James Carter",
      title: "England Fans",
      avatar: "HC"
    },
    {
      quote: "Reporting a localized power issue as a volunteer took 5 seconds on my phone. The organizer command center saw it instantly and dispatched engineers.",
      author: "Sarah Jenkins",
      title: "Accessibility Operations Lead",
      avatar: "SJ"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary overflow-hidden flex flex-col justify-between">
      {/* Animated Mesh Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/15 blur-[120px] animate-gradient-mesh" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/15 blur-[150px] animate-gradient-mesh" style={{ animationDelay: "-5s" }} />

      {/* Header / Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center shadow-[0_0_15px_rgba(79,124,255,0.4)]">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">STADIUMVERSE</span>
            <span className="text-[10px] block font-bold tracking-widest text-accent-blue uppercase">AI OS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-text-secondary hidden sm:inline-flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.05]">
            <Globe2 className="w-3.5 h-3.5 text-accent-blue animate-spin" style={{ animationDuration: '6s' }} /> FIFA 2026 Operations
          </span>
          <GradientButton onClick={login} variant="secondary" className="px-4 py-2 text-xs">
            Sign In
          </GradientButton>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 pt-16 pb-24 flex flex-col items-center">
        {/* Sparkle Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-accent-blue/20 mb-8 animate-fade-in-scale"
        >
          <Sparkles className="w-4 h-4 text-accent-blue animate-pulse" />
          <span className="text-xs font-semibold text-accent-blue tracking-wide">Next-Gen Crowd Intelligence OS</span>
        </div>

        {/* Headline */}
        <h1 
          className="font-display font-bold text-5xl md:text-7xl text-center tracking-tight max-w-4xl leading-tight animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          The AI Operating System for{" "}
          <span className="text-gradient">FIFA World Cup Stadiums</span>
        </h1>

        {/* Sub-text */}
        <p 
          className="text-text-secondary text-center max-w-2xl mt-6 text-base md:text-lg font-light leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          A Generative-AI platform that assists fans, volunteers, organizers, security, and transport teams with real-time navigation, crowd intelligence, accessibility, and emergency response.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <GradientButton onClick={login} className="px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
            Launch Platform <ArrowRight className="w-4 h-4" />
          </GradientButton>
          <a href="#how-it-works">
            <GradientButton variant="secondary" className="px-8 py-3.5 text-sm font-semibold w-full">
              Explore Features
            </GradientButton>
          </a>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mt-24 border-t border-b border-white/[0.06] py-10 bg-white/[0.01] backdrop-blur-sm rounded-xl">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-display font-bold text-3xl md:text-4xl text-gradient">
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="text-xs text-text-secondary uppercase tracking-wider mt-2 font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div id="features" className="w-full mt-32">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl">Complete Venue Operations Matrix</h2>
            <p className="text-text-secondary font-light text-sm mt-3">
              One unified AI coordinator responding to every spectator, operator, and emergency dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <GlassCard key={idx} delay={idx * 0.05} className="p-6 flex flex-col justify-between min-h-[180px]">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-5">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-text-primary text-base mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-xs font-light leading-relaxed">{f.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="w-full mt-36 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-0 hidden md:block" />
          
          <div className="text-center max-w-xl mx-auto mb-20 relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl">Platform Execution Pipeline</h2>
            <p className="text-text-secondary font-light text-sm mt-3">
              See how StadiumVerse AI connects venue telemetry to role-aware interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {workflow.map((w, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 relative">
                <div className="w-14 h-14 rounded-full bg-bg-base border border-accent-blue/40 flex items-center justify-center font-display font-bold text-accent-blue text-lg mb-6 shadow-[0_0_15px_rgba(79,124,255,0.15)]">
                  {w.step}
                </div>
                <h3 className="font-bold text-text-primary text-base mb-2">{w.title}</h3>
                <p className="text-text-secondary text-xs font-light leading-relaxed max-w-xs">{w.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full max-w-4xl mt-36 border border-white/[0.07] rounded-[24px] p-8 md:p-12 bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-6 right-8 text-white/[0.02] text-8xl font-serif select-none pointer-events-none">“</div>
          
          <div className="relative min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-text-primary text-sm md:text-base italic leading-relaxed font-light">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center font-bold text-xs text-white">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-text-primary">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-[10px] text-text-secondary font-medium">{testimonials[activeTestimonial].title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial navigation */}
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={prevTestimonial} 
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-text-secondary" />
              </button>
              <button 
                onClick={nextTestimonial} 
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] bg-black/40 backdrop-blur-md w-full pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center shadow-[0_0_10px_rgba(79,124,255,0.4)]">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-wider">STADIUMVERSE AI</span>
            </div>
            <p className="text-text-secondary text-xs font-light leading-relaxed max-w-xs">
              Generative-AI operating console coordinating navigation, transit telemetry, and crowd safety grids for FIFA World Cup venues.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Operations Center</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary font-light">
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Crowd Intelligence Panel</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Emergency Evacuation Hub</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Volunteer Coordination Deck</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Multilingual Translation Module</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Spectator Utilities</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary font-light">
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Smart Wayfinding Map</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Accessibility Center Panel</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Concessions Wait-Times Tracker</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer" onClick={login}>Carbon Footprint Offset</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">Corporate & Tech</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary font-light">
              <li className="hover:text-accent-blue transition-colors cursor-pointer">Gemini API Integrations</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer">Security Compliance & SLA</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer">Developer SDK Specs</li>
              <li className="hover:text-accent-blue transition-colors cursor-pointer">Contact Operations Command</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-light">
          <p>© 2026 StadiumVerse AI. All rights reserved. Built for the FIFA World Cup Stadium Operations.</p>
          <div className="flex gap-6">
            <span className="hover:text-text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-text-primary transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-text-primary transition-colors cursor-pointer">Security Shield</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
