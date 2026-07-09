"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Bot, 
  LayoutDashboard, 
  Map, 
  Users, 
  Bus, 
  Accessibility, 
  Languages, 
  ShieldAlert, 
  Settings, 
  LogOut,
  ChevronDown,
  CloudSun,
  UserCheck,
  Building2,
  AlertTriangle,
  Leaf
} from "lucide-react";
import { useStadium, PageType, RoleType } from "../../context/StadiumContext";
import { GradientButton } from "../primitives/GradientButton";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { 
    role, 
    setRole, 
    logout, 
    activePage, 
    setActivePage, 
    activeStadiumId, 
    setActiveStadiumId, 
    activeMatchId, 
    setActiveMatchId, 
    language, 
    setLanguage, 
    emergencyMode, 
    setEmergencyMode, 
    accessibility,
    stadiums, 
    matches, 
    currentStadium, 
    currentMatch, 
    currentWeather, 
    translate,
    securityLogs
  } = useStadium();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Filter matches played at the active stadium
  const activeStadiumMatches = matches.filter(m => m.stadiumId === activeStadiumId);

  // Sidebar navigation menu items
  const menuItems = [
    { id: "dashboard" as PageType, label: translate("dashboard"), icon: <LayoutDashboard className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
    { id: "ai-assistant" as PageType, label: translate("aiAssistant"), icon: <Bot className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
    { id: "navigation" as PageType, label: translate("navigation"), icon: <Map className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
    { id: "crowd-analytics" as PageType, label: translate("crowdAnalytics"), icon: <Users className="w-5 h-5" />, roles: ["Organizer", "Security", "Transport"] },
    { id: "transportation" as PageType, label: translate("transportation"), icon: <Bus className="w-5 h-5" />, roles: ["Fan", "Organizer", "Transport", "Security"] },
    { id: "accessibility" as PageType, label: translate("accessibility"), icon: <Accessibility className="w-5 h-5" />, roles: ["Fan", "Accessibility Support", "Organizer"] },
    { id: "volunteer-portal" as PageType, label: translate("volunteerPortalTab"), icon: <UserCheck className="w-5 h-5" />, roles: ["Volunteer", "Organizer"] },
    { id: "organizer-command" as PageType, label: translate("organizerCommandTab"), icon: <Building2 className="w-5 h-5" />, roles: ["Organizer"] },
    { id: "emergency" as PageType, label: translate("emergencyCenter"), icon: <ShieldAlert className="w-5 h-5" />, roles: ["Security", "Organizer", "Volunteer", "Fan", "Transport", "Accessibility Support"] },
    { id: "multilingual" as PageType, label: "Multilingual Engine", icon: <Languages className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
    { id: "sustainability" as PageType, label: "Sustainability AI", icon: <Leaf className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
    { id: "settings" as PageType, label: translate("settings"), icon: <Settings className="w-5 h-5" />, roles: ["Fan", "Volunteer", "Organizer", "Security", "Transport", "Accessibility Support"] },
  ];

  // Filter menu items by active role
  const visibleMenuItems = menuItems.filter(item => item.roles.includes(role || "Fan"));

  const languagesList = [
    { code: "en", label: "EN", name: "English" },
    { code: "es", label: "ES", name: "Español" },
    { code: "fr", label: "FR", name: "Français" },
    { code: "pt", label: "PT", name: "Português" },
    { code: "de", label: "DE", name: "Deutsch" },
    { code: "ar", label: "AR", name: "العربية" },
    { code: "ja", label: "JA", name: "日本語" },
    { code: "ko", label: "KO", name: "한국어" },
    { code: "hi", label: "HI", name: "हिन्दी" },
    { code: "zh", label: "ZH", name: "中文" }
  ];

  const handleMatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMatch = matches.find(m => m.id === e.target.value);
    if (selectedMatch) {
      setActiveMatchId(selectedMatch.id);
      setActiveStadiumId(selectedMatch.stadiumId); // Auto switch stadium to match venue
    }
  };

  const handleStadiumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stadiumId = e.target.value;
    setActiveStadiumId(stadiumId);
    // Find first match at this stadium and select it
    const matchAtStadium = matches.find(m => m.stadiumId === stadiumId);
    if (matchAtStadium) {
      setActiveMatchId(matchAtStadium.id);
    }
  };

  return (
    <div className={`min-h-screen bg-bg-base text-text-primary flex flex-col`}>
      {/* Top Navbar */}
      <header className="relative z-30 bg-bg-base/70 backdrop-blur-md border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center cursor-pointer"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage("dashboard")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center shadow-[0_0_10px_rgba(79,124,255,0.4)]">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm tracking-wider block">STADIUMVERSE</span>
              <span className="text-[8px] block font-bold tracking-widest text-accent-blue uppercase leading-none">AI OS</span>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden lg:block w-[1px] h-6 bg-white/[0.08] mx-2" />

          {/* Stadium Selector */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Venue:</span>
            <select
              value={activeStadiumId}
              onChange={handleStadiumChange}
              className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-text-primary font-medium focus:outline-none focus:ring-1 focus:ring-accent-blue cursor-pointer"
            >
              {stadiums.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0e0f18] text-text-primary">
                  {s.name} ({s.city})
                </option>
              ))}
            </select>
          </div>

          {/* Match Selector */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Match:</span>
            <select
              value={activeMatchId}
              onChange={handleMatchChange}
              className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-text-primary font-medium focus:outline-none focus:ring-1 focus:ring-accent-blue cursor-pointer max-w-[200px]"
            >
              {matches.map(m => (
                <option key={m.id} value={m.id} className="bg-[#0e0f18] text-text-primary">
                  {m.flagA} {m.teamA} vs {m.teamB} {m.flagB}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Nav Utilities */}
        <div className="flex items-center gap-3.5">
          {/* Weather Widget */}
          <div className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-1.5 text-xs text-text-secondary">
            <CloudSun className="w-4 h-4 text-accent-blue animate-pulse" />
            <div className="flex flex-col">
              <span className="font-semibold text-text-primary text-[11px] leading-tight">{currentWeather.temp}</span>
              <span className="text-[9px] font-medium leading-none">{currentWeather.condition}</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] rounded-xl px-2.5 py-2 text-xs text-text-primary font-medium focus:outline-none cursor-pointer flex items-center gap-1 transition-all"
            >
              {languagesList.map(l => (
                <option key={l.code} value={l.code} className="bg-[#0e0f18] text-text-primary">
                  {l.label} ({l.name})
                </option>
              ))}
            </select>
          </div>

          {/* AI Quick Launch */}
          <button 
            onClick={() => setActivePage("ai-assistant")}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-blue/10 to-accent-purple/10 border border-accent-blue/30 hover:border-accent-blue/60 flex items-center justify-center text-accent-blue shadow-lg cursor-pointer transition-all hover:scale-105"
            title="Ask Stadium AI"
          >
            <Bot className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] flex items-center justify-center text-text-primary cursor-pointer relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {securityLogs.filter(l => !l.resolved).length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 bg-[#0c0d15] border border-white/[0.08] rounded-2xl shadow-2xl p-4 z-40"
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
                    <h4 className="font-semibold text-xs text-text-primary">Safety & Incident Feed</h4>
                    <span className="text-[9px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full">
                      {securityLogs.filter(l => !l.resolved).length} Alerts
                    </span>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {securityLogs.slice(0, 4).map((log) => (
                      <div 
                        key={log.id} 
                        onClick={() => {
                          setActivePage("emergency");
                          setNotificationsOpen(false);
                        }}
                        className={`p-2.5 rounded-xl border text-[11px] cursor-pointer hover:bg-white/[0.02] transition-colors
                          ${log.severity === "High" ? "border-red-500/20 bg-red-950/5" : "border-white/[0.05] bg-white/[0.01]"}
                        `}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-bold flex items-center gap-1 ${
                            log.severity === "High" ? "text-red-400" : log.severity === "Medium" ? "text-amber-400" : "text-accent-blue"
                          }`}>
                            <AlertTriangle className="w-3.5 h-3.5" /> {log.severity} Alert
                          </span>
                          <span className="text-[9px] text-text-secondary">{log.time}</span>
                        </div>
                        <p className="text-text-secondary leading-normal font-light">{log.message}</p>
                        <span className="text-[9px] text-accent-purple font-medium block mt-1">Zone: {log.zone}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setActivePage("emergency");
                      setNotificationsOpen(false);
                    }}
                    className="w-full text-center text-[10px] text-accent-blue font-bold hover:underline mt-3 block"
                  >
                    View All Incidents in Emergency Center
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] rounded-xl pl-2.5 pr-2 py-1.5 text-xs font-semibold text-text-primary cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white text-[10px] font-bold">
                {role ? role[0] : "F"}
              </div>
              <span className="hidden md:inline">{role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-48 bg-[#0c0d15] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-40"
                >
                  <div className="px-4 py-3 border-b border-white/[0.05] bg-white/[0.01]">
                    <span className="text-[9px] uppercase font-bold text-accent-purple tracking-widest block">Role Active</span>
                    <span className="text-xs font-bold text-text-primary block mt-0.5">{role}</span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setRole(null); // Triggers role select screen
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-text-primary hover:bg-white/[0.04] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-accent-blue" /> Change Role Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        setEmergencyMode(!emergencyMode);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" /> Test Emergency Mode
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-text-secondary hover:text-red-400 hover:bg-white/[0.04] transition-colors flex items-center gap-2 border-t border-white/[0.04] cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Dynamic Sidebar Nav */}
        <aside className={`
          fixed inset-y-0 left-0 z-20 w-64 border-r border-white/[0.06] bg-bg-base/90 md:bg-bg-base/40 backdrop-blur-xl md:backdrop-blur-md pt-20 md:pt-4 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="px-4 py-2 space-y-1.5 flex-1 overflow-y-auto">
            <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest px-3 block mb-3">
              Navigation matrix
            </span>
            
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false); // Close sidebar on mobile
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border cursor-pointer
                  ${activePage === item.id 
                    ? "bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border-accent-blue/30 text-accent-blue" 
                    : "bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/[0.05] text-text-secondary hover:text-text-primary"}
                `}
              >
                <div className={`transition-colors duration-300 ${activePage === item.id ? "text-accent-blue" : "text-text-secondary"}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
                {item.id === "emergency" && securityLogs.filter(l => !l.resolved).length > 0 && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Sidebar Footer Details */}
          <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold text-xs text-text-secondary">
                {role ? role[0] : "F"}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-text-primary truncate">{role} User</span>
                <span className="text-[9px] text-text-secondary truncate">FIFA Stadium Ops</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-bg-base relative p-6">
          {/* Global Emergency Alert Banner */}
          {emergencyMode && activePage !== "emergency" && (
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
                  <ShieldAlert className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">{translate("emergencyModeTitle")}</h4>
                  <p className="text-[11px] text-text-secondary font-light mt-1">An active stadium-wide security alert is ongoing. Follow automated evacuation guidance immediately.</p>
                </div>
              </div>
              <GradientButton 
                variant="danger" 
                onClick={() => setActivePage("emergency")}
                className="px-5 py-2 text-xs font-bold"
              >
                Access Evacuation Panel
              </GradientButton>
            </motion.div>
          )}

          {/* Dynamic Content */}
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppShell;
