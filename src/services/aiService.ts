export interface AIResponse {
  text: string;
  actions?: { label: string; page: string; payload?: any }[];
  suggestions?: string[];
}

export const getAIResponse = (
  role: string,
  query: string,
  context: {
    stadiumName: string;
    matchName: string;
    gateList: { name: string; occupancy: number; status: string }[];
    activeVolunteers: number;
    unresolvedIncidents: number;
    parkingLots: { name: string; available: number; capacity: number }[];
  }
): AIResponse => {
  const q = query.toLowerCase();

  // 1. Crowd / Gate query
  if (q.includes("gate") || q.includes("crowd") || q.includes("entrance") || q.includes("busy") || q.includes("congest")) {
    const slowGate = context.gateList.find(g => g.occupancy > 75) || context.gateList[0];
    const fastGate = context.gateList.find(g => g.occupancy < 50) || context.gateList[1];
    
    return {
      text: `Based on real-time sensors at **${context.stadiumName}**, **${slowGate.name}** is currently experiencing high volumes with an occupancy rate of **${slowGate.occupancy}%** (average scan speed: 110/min, wait time ~15 min).\n\n**AI Recommendation:** We highly advise rerouting incoming fans to **${fastGate.name}**, which is currently operating at only **${fastGate.occupancy}%** capacity. By entering through this gate, you will save approximately **12 minutes** on entry security checks. The path to this entrance is marked on the digital navigation map.`,
      actions: [
        { label: "View Smart Map", page: "navigation" },
        { label: "See Crowd Analytics", page: "crowd-analytics" }
      ],
      suggestions: [
        "Where is the nearest food court from Gate B?",
        "Is there wheelchair access at Gate C?",
        "What is the best departure route?"
      ]
    };
  }

  // 2. Food / Washroom query
  if (q.includes("food") || q.includes("eat") || q.includes("hungry") || q.includes("burger") || q.includes("tacos") || q.includes("washroom") || q.includes("toilet") || q.includes("restroom")) {
    return {
      text: `Around your current sector at **${context.stadiumName}**, we recommend the following venues:\n\n1. **Azteca Tacos** (Sector 114, Level 1): **6 min wait** — rating: 4.8★. Specialty: Al Pastor Tacos.\n2. **Bavarian Brezels** (Sector 105, Level 1): **3 min wait** — rating: 4.3★. Specialty: Warm Pretzels.\n3. **Kickoff Burgers** (Sector 102, Level 1): **18 min wait** — rating: 4.6★. Specialty: Double Cheeseburger.\n\n**Washrooms:** The nearest restrooms (including fully equipped accessibility toilets) are located directly adjacent to **Sector 112** and **Sector 120** on Concourse Level 1. Look for the illuminated blue icons.`,
      actions: [
        { label: "Open Navigation Map", page: "navigation" },
        { label: "Check Vendor Queue Times", page: "organizer-command" }
      ],
      suggestions: [
        "Which food stalls have the shortest queue?",
        "Are there gluten-free or vegan options nearby?",
        "Show me directions to Azteca Tacos"
      ]
    };
  }

  // 3. Accessibility / Wheelchair query
  if (q.includes("wheelchair") || q.includes("accessib") || q.includes("lift") || q.includes("elevator") || q.includes("ramp") || q.includes("blind") || q.includes("deaf")) {
    return {
      text: `Accessibility Center active for **${context.stadiumName}**.\n\nTo reach your seat in **Sector 118**, the optimal step-free path is via the **South Entrance Elevator (Zone E)**. \n\n*Important Guidance:* Please avoid the Gate A main ramp, as it currently has an average 6% incline which exceeds self-propelled wheelchair comfort thresholds due to heavy head traffic. Digital tactile route signage has been enabled, and Volunteer **Sarah Jenkins** (Accessibility Support Liaison) is stationed in Zone D to provide immediate physical escort if requested.`,
      actions: [
        { label: "Open Accessibility Tools", page: "accessibility" },
        { label: "Request Volunteer Escort", page: "ai-assistant" }
      ],
      suggestions: [
        "Turn on voice assistant narration",
        "Show elevator locations on map",
        "Is there a sensory room available?"
      ]
    };
  }

  // 4. Departure / Transportation query
  if (q.includes("leave") || q.includes("depart") || q.includes("exit") || q.includes("transport") || q.includes("metro") || q.includes("bus") || q.includes("parking") || q.includes("rideshare")) {
    const availableParking = context.parkingLots.reduce((acc, curr) => acc + curr.available, 0);
    return {
      text: `Commute planning for **${context.matchName}** at **${context.stadiumName}**:\n\nCrowd density is projected to peak within 15 minutes of the final whistle. \n\n**AI Transportation Advisory:**\n- **Metro Line (East Station):** Projected boarding queue of 25-30 minutes. We recommend waiting until 21:50, or taking the shuttle to the **Outfield Park-and-Ride Lot E** (departures every 3 mins, wait time under 4 mins).\n- **Rideshare (Lot D):** Currently showing high demand surge pricing. Walking to the secondary zone near Sector 130 will save you approximately $15 and bypass exit gridlock.\n- **Parking:** ${availableParking} parking spaces remain available across all official lots.`,
      actions: [
        { label: "View Commute Rates", page: "transportation" },
        { label: "Check Transit Ticker", page: "dashboard" }
      ],
      suggestions: [
        "What is the cheapest way to get to downtown?",
        "When is the rideshare surge pricing expected to drop?",
        "Show shuttle bus departure gates"
      ]
    };
  }

  // 5. Translation / Language query
  if (q.includes("translate") || q.includes("language") || q.includes("spanish") || q.includes("french") || q.includes("announcement")) {
    return {
      text: `Language assistance mode active. We have translated the latest operational announcement for **${context.stadiumName}**:\n\n*Original (English):* "Security Notice: All bags larger than 12x12x6 inches are strictly prohibited. Please return oversized items to your vehicles."\n\n*Spanish (Español):* "Aviso de seguridad: Se prohíbe estrictamente el ingreso de bolsas mayores a 12x12x6 pulgadas. Por favor devuelva las pertenencias grandes a sus vehículos o casilleros."\n\n*French (Français):* "Avis de sécurité: Tous les sacs de plus de 12x12x6 pouces sont strictement interdits. Veuillez retourner les objets encombrants à vos véhicules ou casiers."\n\n*Arabic (العربية):* "تنويه أمني: يُمنع منعًا باتًا إدخال الحقائب التي تتجاوز أبعادها 12x12x6 بوصة. يرجى إعادة الأمتعة الكبيرة إلى سياراتكم."`,
      actions: [
        { label: "Open Translation Console", page: "dashboard" }
      ],
      suggestions: [
        "Translate security instructions to Japanese",
        "Change system language to Spanish",
        "List all translated announcements"
      ]
    };
  }

  // 6. Security incident / Executive Summary (Organizer & Security roles)
  if (role === "Organizer" || role === "Security" || q.includes("summary") || q.includes("briefing") || q.includes("status") || q.includes("operations") || q.includes("report")) {
    return {
      text: `### **Stadium Operational Briefing — ${context.stadiumName}**\n\n- **Attendance Status:** Live check-ins stand at **99.2%** of capacity for **${context.matchName}**. \n- **Crowd Control:** Redirection from Gate A to Gate B is active. Gate A flow rate is currently restricted at 150 scans/min.\n- **Security Alerts:** There are **${context.unresolvedIncidents} unresolved incidents**. The highest priority is *'Elevator malfunction in Zone E elevator'*. A mechanical crew is on-site with an estimated repair window of 20 minutes. Volunteer Sarah Jenkins is redirecting affected accessibility guests.\n- **Logistics & Utilities:** Waste collection is at 74% capacity in Zone C; sanitation teams are dispatched. Power, lighting, and water usage remain well within normal thresholds. Revenue across all concessions has reached $482k.`,
      actions: [
        { label: "Go to Command Center", page: "organizer-command" },
        { label: "Open Emergency Control", page: "emergency" }
      ],
      suggestions: [
        "Show current food inventory levels",
        "List active volunteer shift schedules",
        "Generate incident logs dispatch report"
      ]
    };
  }

  // 7. General fallback
  return {
    text: `Hello! I am your **StadiumVerse AI Co-Pilot** for **${context.stadiumName}**.\n\nI have access to real-time data feeds covering gate entry logs, concessions queue sensors, parking telemetry, volunteer task boards, accessibility routes, and security dispatches. \n\nHow can I assist you with operations, navigation, or crowd management today?`,
    actions: [
      { label: "AI Chat Help", page: "ai-assistant" },
      { label: "View Active Match Info", page: "dashboard" }
    ],
    suggestions: [
      "Is Gate A crowded right now?",
      "Nearest washroom and vegan options",
      "Show wheelchair route elevator guidance",
      "How is the parking availability?"
    ]
  };
};
