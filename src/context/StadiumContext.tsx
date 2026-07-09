"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  stadiums as initialStadiums, 
  matches as initialMatches, 
  volunteers as initialVolunteers, 
  foodVendors as initialFoodVendors, 
  parkingLots as initialParkingLots, 
  securityLogs as initialSecurityLogs,
  weatherData,
  translations
} from "../data/mockData";

export type RoleType = "Fan" | "Volunteer" | "Organizer" | "Security" | "Transport" | "Accessibility Support";

export type PageType = 
  | "landing"
  | "role-select"
  | "dashboard"
  | "ai-assistant"
  | "navigation"
  | "crowd-analytics"
  | "transportation"
  | "accessibility"
  | "volunteer-portal"
  | "organizer-command"
  | "emergency"
  | "settings"
  | "multilingual"
  | "sustainability";

export interface AccessibilitySettings {
  voiceAssistant: boolean;
  screenReader: boolean;
  largeText: boolean;
  signLanguageVideo: boolean;
  highContrast: boolean;
}

interface StadiumContextProps {
  // Authentication & Role
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  role: RoleType | null;
  setRole: (role: RoleType | null) => void;
  
  // Navigation
  activePage: PageType;
  setActivePage: (page: PageType) => void;

  // Active Selections
  activeStadiumId: string;
  setActiveStadiumId: (id: string) => void;
  activeMatchId: string;
  setActiveMatchId: (id: string) => void;
  
  // System State
  language: string;
  setLanguage: (lang: string) => void;
  emergencyMode: boolean;
  setEmergencyMode: (mode: boolean) => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  
  // Live Operations Data State (Interactive updates)
  stadiums: typeof initialStadiums;
  matches: typeof initialMatches;
  volunteers: typeof initialVolunteers;
  foodVendors: typeof initialFoodVendors;
  parkingLots: typeof initialParkingLots;
  securityLogs: typeof initialSecurityLogs;
  
  // Update helpers
  addSecurityLog: (log: { message: string; severity: "Low" | "Medium" | "High"; zone: string }) => void;
  updateVolunteerTask: (volunteerId: number, taskId: number, newStatus: "Completed" | "Pending" | "In Progress") => void;
  addVolunteerTask: (volunteerId: number, taskDescription: string) => void;
  updateVendorQueue: (vendorId: number, newQueueLength: number) => void;
  updateParkingAvailability: (lotId: string, available: number) => void;
  
  // Utility maps
  currentStadium: typeof initialStadiums[0];
  currentMatch: typeof initialMatches[0];
  currentWeather: { temp: string; condition: string; humidity: string; wind: string };
  translate: (key: string) => string;
}

const StadiumContext = createContext<StadiumContextProps | undefined>(undefined);

export const StadiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRoleState] = useState<RoleType | null>(null);
  const [activePage, setActivePageState] = useState<PageType>("landing");
  
  const [activeStadiumId, setActiveStadiumId] = useState<string>("metlife");
  const [activeMatchId, setActiveMatchId] = useState<string>("match1");
  const [language, setLanguage] = useState<string>("en");
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    voiceAssistant: false,
    screenReader: false,
    largeText: false,
    signLanguageVideo: false,
    highContrast: false,
  });

  // Dynamic state loaded from mock data
  const [stadiums, setStadiums] = useState(initialStadiums);
  const [matches, setMatches] = useState(initialMatches);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [foodVendors, setFoodVendors] = useState(initialFoodVendors);
  const [parkingLots, setParkingLots] = useState(initialParkingLots);
  const [securityLogs, setSecurityLogs] = useState(initialSecurityLogs);

  // Authentication Mock
  const login = () => {
    setIsAuthenticated(true);
    setActivePageState("role-select");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRoleState(null);
    setActivePageState("landing");
    setEmergencyMode(false);
  };

  const setRole = (newRole: RoleType | null) => {
    setRoleState(newRole);
    if (newRole) {
      // Direct user to appropriate page based on role
      setActivePageState("dashboard");
    } else {
      setActivePageState("role-select");
    }
  };

  const setActivePage = (page: PageType) => {
    // If not authenticated, force landing
    if (!isAuthenticated && page !== "landing") {
      setActivePageState("landing");
      return;
    }
    // If authenticated but no role selection, restrict page access
    if (isAuthenticated && !role && page !== "role-select" && page !== "landing") {
      setActivePageState("role-select");
      return;
    }
    setActivePageState(page);
  };

  // Keep HTML classes up to date with accessibility toggles & emergency mode
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (accessibility.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }

    if (emergencyMode) {
      root.classList.add("emergency-alert-mode");
    } else {
      root.classList.remove("emergency-alert-mode");
    }
  }, [accessibility.highContrast, accessibility.largeText, emergencyMode]);

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...settings }));
  };

  // Operations state update modifiers
  const addSecurityLog = (log: { message: string; severity: "Low" | "Medium" | "High"; zone: string }) => {
    const newLog = {
      id: securityLogs.length + 1,
      time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' }),
      stadiumId: activeStadiumId,
      message: log.message,
      severity: log.severity,
      zone: log.zone,
      resolved: false,
    };
    setSecurityLogs(prev => [newLog, ...prev]);
  };

  const updateVolunteerTask = (volunteerId: number, taskId: number, newStatus: "Completed" | "Pending" | "In Progress") => {
    setVolunteers(prevVolunteers => 
      prevVolunteers.map(vol => {
        if (vol.id === volunteerId) {
          return {
            ...vol,
            tasks: vol.tasks.map(task => 
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          };
        }
        return vol;
      })
    );
  };

  const addVolunteerTask = (volunteerId: number, taskDescription: string) => {
    setVolunteers(prevVolunteers => 
      prevVolunteers.map(vol => {
        if (vol.id === volunteerId) {
          const newId = vol.tasks.length + 1;
          return {
            ...vol,
            tasks: [...vol.tasks, { id: newId, task: taskDescription, status: "Pending" }]
          };
        }
        return vol;
      })
    );
  };

  const updateVendorQueue = (vendorId: number, newQueueLength: number) => {
    setFoodVendors(prev =>
      prev.map(vendor => 
        vendor.id === vendorId ? { ...vendor, queueLength: newQueueLength } : vendor
      )
    );
  };

  const updateParkingAvailability = (lotId: string, available: number) => {
    setParkingLots(prev =>
      prev.map(lot => 
        lot.id === lotId ? { ...lot, available: Math.max(0, Math.min(lot.capacity, available)) } : lot
      )
    );
  };

  // Find active stadium, match, and weather
  const currentStadium = stadiums.find(s => s.id === activeStadiumId) || stadiums[0];
  const currentMatch = matches.find(m => m.id === activeMatchId) || matches[0];
  const currentWeather = weatherData[activeStadiumId] || { temp: "22°C", condition: "Clear", humidity: "45%", wind: "12 km/h" };

  // Simple Translation Engine
  const translate = (key: string): string => {
    const langSet = translations[language] || translations["en"];
    return langSet[key] || translations["en"][key] || key;
  };

  return (
    <StadiumContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        role,
        setRole,
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
        updateAccessibility,
        stadiums,
        matches,
        volunteers,
        foodVendors,
        parkingLots,
        securityLogs,
        addSecurityLog,
        updateVolunteerTask,
        addVolunteerTask,
        updateVendorQueue,
        updateParkingAvailability,
        currentStadium,
        currentMatch,
        currentWeather,
        translate,
      }}
    >
      {children}
    </StadiumContext.Provider>
  );
};

export const useStadium = () => {
  const context = useContext(StadiumContext);
  if (!context) {
    throw new Error("useStadium must be used within a StadiumProvider");
  }
  return context;
};
