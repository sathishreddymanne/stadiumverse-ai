"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Compass, 
  ArrowRight,
  HelpCircle,
  Clock,
  RotateCcw,
  Loader2
} from "lucide-react";
import { useStadium } from "../../context/StadiumContext";
import { getAIResponse, AIResponse } from "../../services/aiService";
import { GlassCard } from "../primitives/GlassCard";
import { GradientButton } from "../primitives/GradientButton";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  isStreaming?: boolean;
  actions?: AIResponse["actions"];
}

export const AIAssistant: React.FC = () => {
  const { 
    role, 
    currentStadium, 
    currentMatch, 
    volunteers, 
    securityLogs, 
    parkingLots,
    setActivePage 
  } = useStadium();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: `Hello! I am your **StadiumVerse AI Co-Pilot** for **${currentStadium.name}**. I have access to live gate occupancy counters, transit queue tickers, volunteer task boards, accessibility routes, and security dispatch logs.\n\nHow can I assist you with stadium operations, navigation, or crowd management today?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Context details to inject into AI service
  const activeVolunteersCount = volunteers.filter(v => v.status === "Active").length;
  const unresolvedIncidentsCount = securityLogs.filter(l => !l.resolved).length;
  
  const dataContext = {
    stadiumName: currentStadium.name,
    matchName: `${currentMatch.teamA} vs ${currentMatch.teamB}`,
    gateList: currentStadium.gates.map(g => ({ name: g.name, occupancy: g.occupancy, status: g.status })),
    activeVolunteers: activeVolunteersCount,
    unresolvedIncidents: unresolvedIncidentsCount,
    parkingLots: parkingLots.map(p => ({ name: p.name, available: p.available, capacity: p.capacity }))
  };

  // Role-aware suggested prompts
  const getSuggestedPrompts = () => {
    switch (role) {
      case "Fan":
        return [
          { text: "Is Gate A crowded right now?", label: "Gate Occupancy" },
          { text: "Where is the nearest food court and washroom?", label: "Food & Toilet Locations" },
          { text: "How do I get to Seat 118 with a wheelchair?", label: "Wheelchair Access" },
          { text: "What is the best way to get home after the match?", label: "Departure Transit" }
        ];
      case "Volunteer":
        return [
          { text: "Show my shift and assigned volunteer tasks", label: "My Duties" },
          { text: "How do I report a security incident?", label: "Report Incident" },
          { text: "List translated safety guidelines to Spanish", label: "Translate Announcements" }
        ];
      case "Organizer":
      case "Security":
        return [
          { text: "Generate executive operations summary report", label: "Operations Briefing" },
          { text: "Are there any unresolved security incidents?", label: "Incident Status" },
          { text: "Which gates are slow and what is the bypass route?", label: "Gate Congestion" }
        ];
      default:
        return [
          { text: "Is Gate A congested?", label: "Gate Crowd" },
          { text: "Help with wheelchair directions", label: "Wheelchair Guide" }
        ];
    }
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsgId = messages.length + 1;
    const aiMsgId = userMsgId + 1;

    // 1. Add User message
    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsTyping(true);

    // 2. Fetch AI Response
    const response = getAIResponse(role || "Fan", textToSend, dataContext);

    // 3. Simulate Streaming Reveal after a slight initial delay
    setTimeout(() => {
      setIsTyping(false);
      
      const words = response.text.split(" ");
      let currentWordIndex = 0;
      let displayedText = "";

      const aiMessage: Message = {
        id: aiMsgId,
        sender: "ai",
        text: "",
        isStreaming: true,
        actions: response.actions
      };

      setMessages(prev => [...prev, aiMessage]);

      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          displayedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          
          setMessages(prev => 
            prev.map(m => m.id === aiMsgId ? { ...m, text: displayedText } : m)
          );
          
          currentWordIndex++;
        } else {
          clearInterval(interval);
          // Mark streaming as done
          setMessages(prev => 
            prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m)
          );
        }
      }, 40); // 40ms per word creates a highly natural text stream effect

    }, 800); // 800ms thought delay
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: `Chat log reset. I am synchronized with **${currentStadium.name}** telemetry. Ask me anything about gate queues, navigation routes, concessions, or transport options.`
      }
    ]);
  };

  // Format markdown helper (bold tags to HTML, lists to bullets)
  const formatText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Bold
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-blue font-semibold">$1</strong>');
      // Headers
      if (formattedLine.startsWith("###")) {
        return <h4 key={idx} className="font-bold text-sm text-text-primary mt-3 mb-1 uppercase tracking-wide" dangerouslySetInnerHTML={{ __html: formattedLine.replace("###", "") }} />;
      }
      // Bullet points
      if (formattedLine.startsWith("- ")) {
        return <li key={idx} className="ml-4 list-disc text-xs text-text-secondary leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} />;
      }
      return <p key={idx} className="text-xs text-text-secondary leading-relaxed mt-2 font-light" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
      
      {/* Suggested prompts Sidebar */}
      <GlassCard className="p-5 flex flex-col justify-between col-span-1 h-full overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.05] pb-3">
            <HelpCircle className="w-4 h-4 text-accent-purple" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Suggested Queries</h3>
          </div>

          <div className="space-y-3">
            {getSuggestedPrompts().map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.text)}
                disabled={isTyping}
                className="w-full text-left p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.12] transition-all text-xs cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-[10px] text-accent-blue font-bold uppercase tracking-wider block mb-1 group-hover:text-accent-purple transition-colors">
                  {p.label}
                </span>
                <span className="text-text-secondary group-hover:text-text-primary transition-colors font-light">
                  {p.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.05] mt-6">
          <button 
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-2 text-xs text-text-secondary hover:text-red-400 bg-white/[0.02] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/20 py-2 rounded-xl transition-all cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Chat Log
          </button>
        </div>
      </GlassCard>

      {/* Main Chat Console */}
      <GlassCard className="lg:col-span-3 h-full flex flex-col justify-between overflow-hidden relative">
        
        {/* Chat Banner header */}
        <div className="px-6 py-4 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider">AI Stadium Co-Pilot</h3>
              <p className="text-[9px] text-text-secondary mt-0.5 font-light">
                Connected to venue telemetry | Active City: {currentStadium.city}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase">
            ONLINE
          </span>
        </div>

        {/* Message Feed Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                  ${m.sender === "user" 
                    ? "bg-[#2A2B3D] border border-white/[0.08]" 
                    : "bg-gradient-to-tr from-accent-blue to-accent-purple text-white"}
                `}>
                  {m.sender === "user" ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                </div>

                {/* Bubble */}
                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed
                    ${m.sender === "user" 
                      ? "bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 border border-accent-blue/20 rounded-tr-none text-text-primary" 
                      : "bg-white/[0.03] border border-white/[0.06] rounded-tl-none text-text-secondary"}
                  `}>
                    {formatText(m.text)}
                  </div>

                  {/* Actions (if available on reply completion) */}
                  {!m.isStreaming && m.actions && m.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {m.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => setActivePage(act.page as any)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-[10px] text-accent-blue font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {act.label} <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Loading typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 max-w-[50%]"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white shrink-0">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl rounded-tl-none px-4 py-3 flex items-center justify-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 text-accent-blue animate-spin" />
                  <span className="text-[10px] text-text-secondary font-light">Analyzing sensor feeds...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input box form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(query);
          }}
          className="p-4 border-t border-white/[0.05] bg-black/25 flex items-center gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "AI is processing..." : "Ask about gate congestion, food wait times, parking spaces, or transportation..."}
            className="flex-1 bg-white/[0.02] border border-white/[0.07] focus:border-accent-blue/50 rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none placeholder-text-secondary/50 font-light disabled:opacity-50"
          />
          <GradientButton
            type="submit"
            disabled={!query.trim() || isTyping}
            className="px-4 py-3 rounded-xl shrink-0"
          >
            <Send className="w-4 h-4" />
          </GradientButton>
        </form>
      </GlassCard>
    </div>
  );
};
export default AIAssistant;
