"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStadium } from "../context/StadiumContext";

// Page imports
import { LandingPage } from "../components/pages/LandingPage";
import { AuthRoleSelector } from "../components/pages/AuthRoleSelector";
import { AppShell } from "../components/pages/AppShell";
import { DashboardHome } from "../components/pages/DashboardHome";
import { AIAssistant } from "../components/pages/AIAssistant";
import { SmartNavigation } from "../components/pages/SmartNavigation";
import { CrowdIntelligence } from "../components/pages/CrowdIntelligence";
import { Transportation } from "../components/pages/Transportation";
import { AccessibilityCenter } from "../components/pages/AccessibilityCenter";
import { VolunteerPortal } from "../components/pages/VolunteerPortal";
import { OrganizerCommand } from "../components/pages/OrganizerCommand";
import { EmergencyCenter } from "../components/pages/EmergencyCenter";
import { Settings } from "../components/pages/Settings";
import { SustainabilityAI } from "../components/pages/SustainabilityAI";

export default function Home() {
  const { isAuthenticated, role, activePage } = useStadium();

  // Master page switch router
  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "ai-assistant":
        return <AIAssistant />;
      case "navigation":
        return <SmartNavigation />;
      case "crowd-analytics":
        return <CrowdIntelligence />;
      case "transportation":
        return <Transportation />;
      case "accessibility":
        return <AccessibilityCenter />;
      case "volunteer-portal":
        return <VolunteerPortal />;
      case "organizer-command":
        return <OrganizerCommand />;
      case "emergency":
        return <EmergencyCenter />;
      case "settings":
        return <Settings />;
      case "sustainability":
        return <SustainabilityAI />;
      default:
        return <DashboardHome />;
    }
  };

  // Entry transitions
  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  // 1. Landing state
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // 2. Authentication selection state
  if (isAuthenticated && !role) {
    return <AuthRoleSelector />;
  }

  // 3. Authenticated app state
  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {renderActivePage()}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
