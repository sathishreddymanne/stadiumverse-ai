export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  gates: { name: string; occupancy: number; flowRate: number; status: "Open" | "Slow" | "Closed" }[];
}

export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  date: string;
  time: string;
  stadiumId: string;
  attendance: number;
  stage: string;
  status: "Scheduled" | "Completed" | "Live";
  scoreA?: number;
  scoreB?: number;
}

export interface Volunteer {
  id: number;
  name: string;
  role: string;
  shift: string;
  status: "Active" | "Off-Duty" | "On-Break";
  assignedZone: string;
  tasks: { id: number; task: string; status: "Completed" | "Pending" | "In Progress" }[];
}

export interface FoodVendor {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  queueLength: number; // people waiting
  waitTime: number; // minutes
  rating: number;
  specialty: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  capacity: number;
  available: number;
  distance: string; // e.g., "5 min walk"
  price: string;
  fillRate: number; // percentage
}

export interface SecurityLog {
  id: number;
  time: string;
  stadiumId: string;
  message: string;
  severity: "Low" | "Medium" | "High";
  zone: string;
  resolved: boolean;
}

// 8 Host Stadiums for World Cup 2026
export const stadiums: Stadium[] = [
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "East Rutherford, NJ/NY",
    country: "USA",
    capacity: 82500,
    gates: [
      { name: "Gate A (Main)", occupancy: 87, flowRate: 150, status: "Slow" },
      { name: "Gate B", occupancy: 42, flowRate: 280, status: "Open" },
      { name: "Gate C", occupancy: 28, flowRate: 310, status: "Open" },
      { name: "Gate D (Family)", occupancy: 65, flowRate: 190, status: "Open" },
      { name: "Gate E (VIP)", occupancy: 12, flowRate: 80, status: "Open" },
      { name: "Gate F (Staff)", occupancy: 5, flowRate: 50, status: "Open" }
    ]
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    city: "Arlington, Dallas",
    country: "USA",
    capacity: 80000,
    gates: [
      { name: "Gate 1", occupancy: 92, flowRate: 110, status: "Slow" },
      { name: "Gate 2", occupancy: 70, flowRate: 180, status: "Open" },
      { name: "Gate 3", occupancy: 35, flowRate: 290, status: "Open" },
      { name: "Gate 4", occupancy: 48, flowRate: 240, status: "Open" },
      { name: "Gate 5 (VIP)", occupancy: 15, flowRate: 90, status: "Open" },
      { name: "Gate 6", occupancy: 95, flowRate: 40, status: "Slow" }
    ]
  },
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87523,
    gates: [
      { name: "Acceso Principal", occupancy: 78, flowRate: 200, status: "Open" },
      { name: "Acceso Norte", occupancy: 88, flowRate: 120, status: "Slow" },
      { name: "Acceso Sur", occupancy: 45, flowRate: 260, status: "Open" },
      { name: "Acceso Oriente", occupancy: 30, flowRate: 300, status: "Open" },
      { name: "Acceso VIP", occupancy: 20, flowRate: 90, status: "Open" },
      { name: "Acceso Ambulancias", occupancy: 2, flowRate: 10, status: "Open" }
    ]
  },
  {
    id: "bc-place",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    capacity: 54500,
    gates: [
      { name: "Gate H (Main)", occupancy: 60, flowRate: 220, status: "Open" },
      { name: "Gate A", occupancy: 75, flowRate: 140, status: "Open" },
      { name: "Gate B", occupancy: 50, flowRate: 200, status: "Open" },
      { name: "Gate C (Accessibility)", occupancy: 22, flowRate: 120, status: "Open" },
      { name: "Gate D", occupancy: 82, flowRate: 100, status: "Slow" },
      { name: "Gate E", occupancy: 10, flowRate: 80, status: "Open" }
    ]
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    capacity: 70240,
    gates: [
      { name: "Entry 1", occupancy: 82, flowRate: 160, status: "Slow" },
      { name: "Entry 2", occupancy: 55, flowRate: 230, status: "Open" },
      { name: "Entry 3", occupancy: 40, flowRate: 270, status: "Open" },
      { name: "Entry 4", occupancy: 62, flowRate: 190, status: "Open" },
      { name: "Entry 5 (VIP)", occupancy: 18, flowRate: 110, status: "Open" },
      { name: "Entry 6", occupancy: 90, flowRate: 90, status: "Slow" }
    ]
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta",
    country: "USA",
    capacity: 71000,
    gates: [
      { name: "Gate 1 (Main)", occupancy: 85, flowRate: 140, status: "Slow" },
      { name: "Gate 2", occupancy: 50, flowRate: 220, status: "Open" },
      { name: "Gate 3", occupancy: 33, flowRate: 290, status: "Open" },
      { name: "Gate 4", occupancy: 61, flowRate: 180, status: "Open" },
      { name: "Gate 5 (VIP)", occupancy: 8, flowRate: 70, status: "Open" },
      { name: "Gate 6", occupancy: 40, flowRate: 210, status: "Open" }
    ]
  },
  {
    id: "hard-rock",
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "USA",
    capacity: 64767,
    gates: [
      { name: "North Gate", occupancy: 70, flowRate: 210, status: "Open" },
      { name: "South Gate", occupancy: 85, flowRate: 130, status: "Slow" },
      { name: "East Gate", occupancy: 45, flowRate: 250, status: "Open" },
      { name: "West Gate", occupancy: 32, flowRate: 290, status: "Open" },
      { name: "Club Entry", occupancy: 15, flowRate: 100, status: "Open" },
      { name: "Media Entry", occupancy: 4, flowRate: 30, status: "Open" }
    ]
  },
  {
    id: "lumen-field",
    name: "Lumen Field",
    city: "Seattle",
    country: "USA",
    capacity: 69000,
    gates: [
      { name: "North Plaza", occupancy: 75, flowRate: 180, status: "Open" },
      { name: "South Plaza", occupancy: 88, flowRate: 110, status: "Slow" },
      { name: "West Gate", occupancy: 50, flowRate: 230, status: "Open" },
      { name: "East Gate", occupancy: 38, flowRate: 280, status: "Open" },
      { name: "VIP Suite Entry", occupancy: 10, flowRate: 80, status: "Open" },
      { name: "Staff Gate", occupancy: 8, flowRate: 40, status: "Open" }
    ]
  }
];

// 15 Sample Matches
export const matches: Match[] = [
  { id: "match1", teamA: "USA", teamB: "England", flagA: "🇺🇸", flagB: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", date: "2026-06-12", time: "20:00", stadiumId: "metlife", attendance: 81900, stage: "Group Stage", status: "Completed", scoreA: 2, scoreB: 1 },
  { id: "match2", teamA: "Mexico", teamB: "Germany", flagA: "🇲🇽", flagB: "🇩🇪", date: "2026-06-13", time: "18:00", stadiumId: "azteca", attendance: 87100, stage: "Group Stage", status: "Completed", scoreA: 1, scoreB: 0 },
  { id: "match3", teamA: "Canada", teamB: "Argentina", flagA: "🇨🇦", flagB: "🇦🇷", date: "2026-06-14", time: "17:00", stadiumId: "bc-place", attendance: 54100, stage: "Group Stage", status: "Completed", scoreA: 0, scoreB: 3 },
  { id: "match4", teamA: "Brazil", teamB: "Japan", flagA: "🇧🇷", flagB: "🇯🇵", date: "2026-06-15", time: "19:30", stadiumId: "sofi", attendance: 69800, stage: "Group Stage", status: "Completed", scoreA: 3, scoreB: 1 },
  { id: "match5", teamA: "France", teamB: "Morocco", flagA: "🇫🇷", flagB: "🇲🇦", date: "2026-06-16", time: "20:00", stadiumId: "att-stadium", attendance: 78500, stage: "Group Stage", status: "Completed", scoreA: 2, scoreB: 0 },
  { id: "match6", teamA: "Spain", teamB: "South Korea", flagA: "🇪🇸", flagB: "🇰🇷", date: "2026-06-17", time: "16:00", stadiumId: "mercedes-benz", attendance: 68900, stage: "Group Stage", status: "Completed", scoreA: 1, scoreB: 1 },
  { id: "match7", teamA: "Italy", teamB: "Portugal", flagA: "🇮🇹", flagB: "🇵🇹", date: "2026-06-18", time: "21:00", stadiumId: "hard-rock", attendance: 63900, stage: "Group Stage", status: "Completed", scoreA: 0, scoreB: 2 },
  { id: "match8", teamA: "Netherlands", teamB: "Colombia", flagA: "🇳🇱", flagB: "🇨🇴", date: "2026-06-19", time: "15:00", stadiumId: "lumen-field", attendance: 67800, stage: "Group Stage", status: "Completed", scoreA: 1, scoreB: 2 },
  { id: "match9", teamA: "USA", teamB: "Italy", flagA: "🇺🇸", flagB: "🇮🇹", date: "2026-06-25", time: "20:00", stadiumId: "metlife", attendance: 82100, stage: "Round of 32", status: "Completed", scoreA: 2, scoreB: 1 },
  { id: "match10", teamA: "Mexico", teamB: "France", flagA: "🇲🇽", flagB: "🇫🇷", date: "2026-06-26", time: "19:00", stadiumId: "azteca", attendance: 87400, stage: "Round of 32", status: "Completed", scoreA: 0, scoreB: 2 },
  { id: "match11", teamA: "Argentina", teamB: "Germany", flagA: "🇦🇷", flagB: "🇩🇪", date: "2026-07-02", time: "18:00", stadiumId: "sofi", attendance: 70100, stage: "Quarter-Final", status: "Completed", scoreA: 2, scoreB: 0 },
  { id: "match12", teamA: "Brazil", teamB: "Spain", flagA: "🇧🇷", flagB: "🇪🇸", date: "2026-07-03", time: "20:00", stadiumId: "att-stadium", attendance: 79200, stage: "Quarter-Final", status: "Completed", scoreA: 3, scoreB: 2 },
  { id: "match13", teamA: "Argentina", teamB: "Brazil", flagA: "🇦🇷", flagB: "🇧🇷", date: "2026-07-08", time: "20:00", stadiumId: "azteca", attendance: 87500, stage: "Semi-Final", status: "Completed", scoreA: 1, scoreB: 0 },
  { id: "match14", teamA: "USA", teamB: "France", flagA: "🇺🇸", flagB: "🇫🇷", date: "2026-07-09", time: "20:00", stadiumId: "metlife", attendance: 82500, stage: "Semi-Final", status: "Live", scoreA: 1, scoreB: 0 },
  { id: "match15", teamA: "Finalist A", teamB: "Finalist B", flagA: "🏳️", flagB: "🏳️", date: "2026-07-19", time: "19:00", stadiumId: "metlife", attendance: 0, stage: "World Cup Final", status: "Scheduled" }
];

// 22 Named Volunteers with shifts and tasks
export const volunteers: Volunteer[] = [
  {
    id: 1,
    name: "Alejandro Ruiz",
    role: "Fan Information Specialist",
    shift: "08:00 - 16:00",
    status: "Active",
    assignedZone: "North Concourses (Zone A)",
    tasks: [
      { id: 1, task: "Escort accessibility group from Metrolink arrival to Gate C elevator", status: "Completed" },
      { id: 2, task: "Distribute stadium guides and QR map cards at Info Booth 3", status: "In Progress" },
      { id: 3, task: "Perform visual check of dynamic digital navigation signage in Sector 104", status: "Pending" }
    ]
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Accessibility Support Liaison",
    shift: "15:00 - 23:00",
    status: "Active",
    assignedZone: "South Accessibility Deck (Zone D)",
    tasks: [
      { id: 1, task: "Deliver assistive listening audio headset to Seat Row 12, Sec 118", status: "Completed" },
      { id: 2, task: "Deploy automated tactile guiding strip checker for visually impaired row ramp", status: "In Progress" },
      { id: 3, task: "Assist family with wheelchair transfer at south parking lot drop-off spot", status: "Pending" }
    ]
  },
  {
    id: 3,
    name: "Mateo Silva",
    role: "Crowd Flow Monitor",
    shift: "16:00 - 00:00",
    status: "Active",
    assignedZone: "Gate A Entrance Plaza",
    tasks: [
      { id: 1, task: "Report queuing delay at main ticket scanning lane 4", status: "Completed" },
      { id: 2, task: "Set up auxiliary crowd barricades for overflow management near Gate A", status: "Completed" },
      { id: 3, task: "Redirect fans to underutilized Gate B entry point to reduce congestion", status: "In Progress" }
    ]
  },
  {
    id: 4,
    name: "Amara Okoye",
    role: "Multilingual Guest Relations",
    shift: "08:00 - 16:00",
    status: "On-Break",
    assignedZone: "Main Entrance Gate B & C",
    tasks: [
      { id: 1, task: "Provide translation support at security checkpoint 2 for French tourists", status: "Completed" },
      { id: 2, task: "Resolve ticket re-entry issue for Portuguese-speaking fans at Gate C", status: "Completed" }
    ]
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    role: "First Aid & Health Volunteer",
    shift: "14:00 - 22:00",
    status: "Active",
    assignedZone: "First Aid Station 2 (Zone B)",
    tasks: [
      { id: 1, task: "Replenish ice packs and hydration supplies at concourse kiosk", status: "Completed" },
      { id: 2, task: "Treat fan with mild heat exhaustion in Section 202", status: "Completed" },
      { id: 3, task: "Coordinate emergency stretcher transport for ankle injury", status: "In Progress" }
    ]
  },
  {
    id: 6,
    name: "Elena Petrova",
    role: "Transport & Parking Coordinator",
    shift: "12:00 - 20:00",
    status: "Active",
    assignedZone: "East Parking Lot P3",
    tasks: [
      { id: 1, task: "Guide rideshare vehicles into official drop-off lane 12", status: "In Progress" },
      { id: 2, task: "Coordinate accessible shuttle schedule with base operations", status: "Pending" }
    ]
  },
  { id: 7, name: "Marcus Dupont", role: "Fan Information Specialist", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone C", tasks: [{ id: 1, task: "Answer ticketing questions", status: "Pending" }] },
  { id: 8, name: "Sofia Loren", role: "Accessibility Support Liaison", shift: "12:00 - 20:00", status: "Active", assignedZone: "Zone F", tasks: [] },
  { id: 9, name: "Carlos Santana", role: "Crowd Flow Monitor", shift: "16:00 - 00:00", status: "Off-Duty", assignedZone: "Zone A", tasks: [] },
  { id: 10, name: "Chloe Kim", role: "Multilingual Guest Relations", shift: "08:00 - 16:00", status: "Active", assignedZone: "Zone E", tasks: [] },
  { id: 11, name: "John Doe", role: "Emergency Guide", shift: "15:00 - 23:00", status: "Active", assignedZone: "Zone B", tasks: [] },
  { id: 12, name: "Emma Watson", role: "Transport Coordinator", shift: "15:00 - 23:00", status: "Active", assignedZone: "Zone D", tasks: [] },
  { id: 13, name: "Aisha Rahman", role: "Fan Information Specialist", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone B", tasks: [] },
  { id: 14, name: "Vikram Singh", role: "Crowd Flow Monitor", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone C", tasks: [] },
  { id: 15, name: "Lin Wei", role: "Multilingual Guest Relations", shift: "12:00 - 20:00", status: "Active", assignedZone: "Zone B", tasks: [] },
  { id: 16, name: "Fatima Al-Sayed", role: "First Aid & Health", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone D", tasks: [] },
  { id: 17, name: "Diego Maradona", role: "VIP Assistant", shift: "14:00 - 22:00", status: "Active", assignedZone: "Zone E", tasks: [] },
  { id: 18, name: "Hans Müller", role: "Transport Coordinator", shift: "08:00 - 16:00", status: "Off-Duty", assignedZone: "Zone A", tasks: [] },
  { id: 19, name: "Olivia Brown", role: "Sustainability Guide", shift: "12:00 - 20:00", status: "Active", assignedZone: "Zone B", tasks: [] },
  { id: 20, name: "Liam Neeson", role: "Emergency Guard", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone C", tasks: [] },
  { id: 21, name: "Hiroshi Sato", role: "Tech Support Liaison", shift: "08:00 - 16:00", status: "Active", assignedZone: "Zone A", tasks: [] },
  { id: 22, name: "Zainab Yusuf", role: "First Aid & Health", shift: "16:00 - 00:00", status: "Active", assignedZone: "Zone F", tasks: [] }
];

// 10+ Food Court Vendors
export const foodVendors: FoodVendor[] = [
  { id: 1, name: "Kickoff Burgers", cuisine: "American", location: "Sec 102 (Concourse Level 1)", queueLength: 35, waitTime: 18, rating: 4.6, specialty: "Double Cheeseburger & Fries" },
  { id: 2, name: "Azteca Tacos", cuisine: "Mexican", location: "Sec 114 (Concourse Level 1)", queueLength: 12, waitTime: 6, rating: 4.8, specialty: "Al Pastor Street Tacos" },
  { id: 3, name: "Stripe Sushi & Wok", cuisine: "Asian Fusion", location: "Sec 205 (Club Level)", queueLength: 8, waitTime: 5, rating: 4.5, specialty: "Spicy Tuna Crunch Roll" },
  { id: 4, name: "Golden Goal Pizza", cuisine: "Italian", location: "Sec 120 (Concourse Level 1)", queueLength: 28, waitTime: 14, rating: 4.2, specialty: "Pepperoni Slice Combo" },
  { id: 5, name: "Eco-Green Bowls", cuisine: "Healthy / Vegan", location: "Sec 108 (Concourse Level 1)", queueLength: 4, waitTime: 2, rating: 4.7, specialty: "Quinoa Harvest Bowl" },
  { id: 6, name: "Maple Waffles & Coffee", cuisine: "Dessert & Cafe", location: "Sec 220 (Club Level)", queueLength: 15, waitTime: 8, rating: 4.4, specialty: "Caramel Maple Waffle Grid" },
  { id: 7, name: "Halal Corner", cuisine: "Middle Eastern", location: "Sec 126 (Concourse Level 1)", queueLength: 18, waitTime: 10, rating: 4.6, specialty: "Chicken Over Rice Platter" },
  { id: 8, name: "The Dog House", cuisine: "Hot Dogs & Sausages", location: "Sec 130 (Concourse Level 1)", queueLength: 22, waitTime: 11, rating: 4.1, specialty: "Jumbo Bacon Wrapped Dog" },
  { id: 9, name: "Samba Skewers", cuisine: "Brazilian BBQ", location: "Sec 210 (Club Level)", queueLength: 25, waitTime: 15, rating: 4.7, specialty: "Picanha Steak Skewers" },
  { id: 10, name: "Bavarian Brezels", cuisine: "Snacks", location: "Sec 105 (Concourse Level 1)", queueLength: 6, waitTime: 3, rating: 4.3, specialty: "Giant Warm Pretzel & Beer Cheese" }
];

// Parking Lots per Stadium
export const parkingLots: ParkingLot[] = [
  { id: "lot-a", name: "Lot A (North Premium)", capacity: 2500, available: 120, distance: "3 min walk", price: "$50", fillRate: 95 },
  { id: "lot-b", name: "Lot B (East Standard)", capacity: 4000, available: 1420, distance: "8 min walk", price: "$35", fillRate: 64 },
  { id: "lot-c", name: "Lot C (South Accessibility)", capacity: 1200, available: 410, distance: "2 min walk", price: "$25", fillRate: 65 },
  { id: "lot-d", name: "Lot D (West Rideshare/Taxi)", capacity: 800, available: 20, distance: "4 min walk", price: "Free drop", fillRate: 97 },
  { id: "lot-e", name: "Lot E (Outfield Park-and-Ride)", capacity: 8000, available: 3950, distance: "15 min shuttle", price: "$15", fillRate: 50 },
  { id: "lot-f", name: "Lot F (VIP & Media)", capacity: 500, available: 15, distance: "1 min walk", price: "Permit", fillRate: 97 }
];

// Security Events Log
export const securityLogs: SecurityLog[] = [
  { id: 1, time: "18:42", stadiumId: "metlife", message: "Suspicious unattended duffel bag detected near Gate A ticket barrier", severity: "High", zone: "Gate A Plaza", resolved: false },
  { id: 2, time: "18:35", stadiumId: "metlife", message: "Minor verbal confrontation between opposing fan factions defused in Section 106", severity: "Low", zone: "Sec 106", resolved: true },
  { id: 3, time: "18:10", stadiumId: "metlife", message: "Localized power outage reported in Sector 232 food vendor grid", severity: "Medium", zone: "Sec 232 Concourse", resolved: false },
  { id: 4, time: "17:45", stadiumId: "metlife", message: "Lost child reunited with parents at North Information Desk", severity: "Low", zone: "North Lobby", resolved: true },
  { id: 5, time: "17:30", stadiumId: "metlife", message: "Medical incident: Elderly fan treated for shortness of breath in Section 112", severity: "Medium", zone: "Sec 112", resolved: true },
  { id: 6, time: "19:02", stadiumId: "att-stadium", message: "Crowd congestion warning: Access stairs blocked near sector 12", severity: "Medium", zone: "Stairwell 12", resolved: false },
  { id: 7, time: "18:50", stadiumId: "att-stadium", message: "Elevator malfunction reported in Zone E accessibility lift", severity: "High", zone: "Zone E Elevator", resolved: false },
  { id: 8, time: "18:22", stadiumId: "azteca", message: "Flares detected and confiscated at Accesso Norte checkpoint", severity: "High", zone: "Accesso Norte Checkpoint", resolved: true },
  { id: 9, time: "18:05", stadiumId: "azteca", message: "Slippery surface reported due to spilled beverage near Section 202 stairs", severity: "Low", zone: "Sec 202 Stairs", resolved: false },
  { id: 10, time: "17:40", stadiumId: "bc-place", message: "Unauthorized drone spotted flying within 100m of stadium roof dome", severity: "High", zone: "Airspace North", resolved: false }
];

// Weather per City
export const weatherData: Record<string, { temp: string; condition: string; humidity: string; wind: string }> = {
  "metlife": { temp: "24°C", condition: "Partly Cloudy", humidity: "62%", wind: "14 km/h" },
  "att-stadium": { temp: "31°C", condition: "Hot / Indoors AC Active", humidity: "40%", wind: "8 km/h" },
  "azteca": { temp: "22°C", condition: "Scattered Rain", humidity: "78%", wind: "10 km/h" },
  "bc-place": { temp: "19°C", condition: "Clear", humidity: "50%", wind: "16 km/h" },
  "sofi": { temp: "23°C", condition: "Sunny", humidity: "55%", wind: "11 km/h" },
  "mercedes-benz": { temp: "28°C", condition: "Mostly Cloudy", humidity: "65%", wind: "9 km/h" },
  "hard-rock": { temp: "29°C", condition: "Humid / Wind Breezy", humidity: "82%", wind: "22 km/h" },
  "lumen-field": { temp: "18°C", condition: "Overcast", humidity: "70%", wind: "13 km/h" }
};

// Multilingual Announcements (English -> 4 languages populated)
export const multilingualAnnouncements = [
  {
    id: 1,
    time: "18:55",
    original: "Security Notice: All bags larger than 12x12x6 inches are strictly prohibited. Please return oversized items to your vehicles or lockers.",
    translations: {
      es: "Aviso de seguridad: Se prohíbe estrictamente el ingreso de bolsas mayores a 12x12x6 pulgadas. Por favor devuelva las pertenencias grandes a sus vehículos o casilleros.",
      fr: "Avis de sécurité: Tous les sacs de plus de 12x12x6 pouces sont strictement interdits. Veuillez retourner les objets encombrants à vos véhicules ou casiers.",
      ar: "تنويه أمني: يُمنع منعًا باتًا إدخال الحقائب التي تتجاوز أبعادها 12x12x6 بوصة. يرجى إعادة الأمتعة الكبيرة إلى سياراتكم أو الخزائن.",
      de: "Sicherheitshinweis: Alle Taschen, die größer als 30x30x15 cm sind, sind strengstens verboten. Bitte bringen Sie übergroße Gegenstände zurück in Ihre Fahrzeuge oder Schließfächer.",
      ja: "セキュリティ通知：12x12x6インチを超える大きさのバッグの持ち込みは固く禁止されています。サイズ超過の荷物は、お車またはロッカーにお戻しください。"
    }
  },
  {
    id: 2,
    time: "18:40",
    original: "Operations Notice: Gate A is currently experiencing high crowd volumes. Fans are advised to enter through Gate B or Gate C to save up to 15 minutes.",
    translations: {
      es: "Aviso de operaciones: La Puerta A registra un volumen alto de personas. Se recomienda a los aficionados ingresar por la Puerta B o C para ahorrar hasta 15 minutos.",
      fr: "Avis d'exploitation: La porte A fait face à un flux de foule important. Il est conseillé d'entrer par la porte B ou C afin de gagner jusqu'à 15 minutes.",
      ar: "تنويه تشغيلي: تشهد البوابة (أ) حالياً ازدحاماً شديداً. يُنصح المشجعون بالدخول عبر البوابة (ب) أو البوابة (ج) لتوفير ما يصل إلى 15 دقيقة.",
      de: "Betriebshinweis: Am Tor A herrscht derzeit ein hohes Zuschaueraufkommen. Den Fans wird empfohlen, durch die Tore B oder C einzutreten, um bis zu 15 Minuten zu sparen.",
      ja: "運営通知：現在、ゲートAが大変混雑しております。混雑を避けるため、ゲートBまたはゲートCからの入場をお勧めします（最大15分の時間短縮になります）。"
    }
  },
  {
    id: 3,
    time: "18:30",
    original: "Accessibility Notice: Complimentary wheelchair assistance and sensory room access are available at Sector 112 Guest Relations.",
    translations: {
      es: "Aviso de accesibilidad: Asistencia gratuita en silla de ruedas y acceso a salas sensoriales disponibles en Atención al Invitado en el Sector 112.",
      fr: "Avis d'accessibilité: Une assistance en fauteuil roulant et un accès à la salle sensorielle sont disponibles gratuitement au point d'information Secteur 112.",
      ar: "تنويه ذوي الهمم: تتوفر خدمة الكراسي المتحركة المجانية وغرفة الاسترخاء الحسي في مكتب علاقات الزوار بالقطاع 112.",
      de: "Hinweis zur Barrierefreiheit: Kostenlose Unterstützung für Rollstuhlfahrer und Zugang zu sensorischen Räumen sind im Sektor 112 beim Gästeservice verfügbar.",
      ja: "アクセシビリティ通知：セクター112のゲストリレーションズにて、無料の車椅子アシスタントおよびセンサリールーム（静養室）をご利用いただけます。"
    }
  }
];

// Complete 10-language translations dictionary
export const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "The AI Operating System for FIFA World Cup Stadiums",
    welcomeSub: "A Generative-AI platform coordinating navigation, safety, accessibility, and real-time operations across FIFA World Cup 2026 venues.",
    getStarted: "Get Started",
    howItWorks: "How It Works",
    selectRole: "Choose Your Dashboard Role",
    roleDesc: "Select a user profile to load personalized interfaces, telemetry widgets, and AI recommendations.",
    fanRole: "Fan Portal",
    volunteerRole: "Volunteer Portal",
    organizerRole: "Organizer Command Center",
    securityRole: "Security Operations",
    transportRole: "Transport & Logistics",
    accessRole: "Accessibility Center",
    // Navigation tabs
    dashboard: "Dashboard",
    aiAssistant: "AI Assistant",
    navigation: "Smart Navigation",
    crowdAnalytics: "Crowd Intelligence",
    transportation: "Transportation",
    accessibility: "Accessibility Center",
    volunteerPortalTab: "Volunteer Tasks",
    organizerCommandTab: "Executive Command",
    emergencyCenter: "Emergency Center",
    settings: "Settings",
    // Common terms
    stadium: "Stadium",
    match: "Match",
    weather: "Weather",
    occupancy: "Live Occupancy",
    gates: "Gate Status",
    activeVolunteers: "Volunteers Active",
    incidents: "Security Alerts",
    emergencyModeTitle: "EMERGENCY EVACUATION DIRECTIVE",
    alertActive: "Emergency Mode Active",
    carbonSaved: "CO₂ Saved",
    ecoPoints: "Eco Points"
  },
  es: {
    welcome: "El Sistema Operativo de IA para Estadios de la Copa Mundial de la FIFA",
    welcomeSub: "Una plataforma de IA generativa que coordina la navegación, la seguridad, la accesibilidad y las operaciones en tiempo real en las sedes de la Copa Mundial de la FIFA 2026.",
    getStarted: "Comenzar",
    howItWorks: "Cómo funciona",
    selectRole: "Seleccione su Rol de Tablero",
    roleDesc: "Seleccione un perfil de usuario para cargar interfaces personalizadas, widgets de telemetría y recomendaciones de IA.",
    fanRole: "Portal de Fanáticos",
    volunteerRole: "Portal de Voluntarios",
    organizerRole: "Centro de Mando del Organizador",
    securityRole: "Operaciones de Seguridad",
    transportRole: "Transporte y Logística",
    accessRole: "Centro de Accesibilidad",
    dashboard: "Tablero",
    aiAssistant: "Asistente de IA",
    navigation: "Navegación Inteligente",
    crowdAnalytics: "Inteligencia de Multitudes",
    transportation: "Transporte",
    accessibility: "Centro de Accesibilidad",
    volunteerPortalTab: "Tareas de Voluntarios",
    organizerCommandTab: "Comando Ejecutivo",
    emergencyCenter: "Centro de Emergencia",
    settings: "Ajustes",
    stadium: "Estadio",
    match: "Partido",
    weather: "Clima",
    occupancy: "Ocupación en Vivo",
    gates: "Estado de Puertas",
    activeVolunteers: "Voluntarios Activos",
    incidents: "Alertas de Seguridad",
    emergencyModeTitle: "DIRECTIVA DE EVACUACIÓN DE EMERGENCIA",
    alertActive: "Modo de Emergencia Activo",
    carbonSaved: "CO₂ Ahorrado",
    ecoPoints: "Puntos Eco"
  },
  fr: {
    welcome: "Le système d'exploitation IA pour les stades de la Coupe du Monde de la FIFA",
    welcomeSub: "Une plateforme d'IA générative coordonnant la navigation, la sécurité, l'accessibilité et les opérations en temps réel dans les stades de la Coupe du Monde de la FIFA 2026.",
    getStarted: "Commencer",
    howItWorks: "Comment ça fonctionne",
    selectRole: "Choisissez votre rôle de tableau de bord",
    roleDesc: "Sélectionnez un profil d'utilisateur pour charger des interfaces personnalisées, des widgets de télémétrie et des recommandations d'IA.",
    fanRole: "Portail des supporters",
    volunteerRole: "Portail des bénévoles",
    organizerRole: "Centre de commandement de l'organisateur",
    securityRole: "Opérations de sécurité",
    transportRole: "Transport et logistique",
    accessRole: "Centre d'accessibilité",
    dashboard: "Tableau de bord",
    aiAssistant: "Assistant IA",
    navigation: "Navigation intelligente",
    crowdAnalytics: "Intelligence des foules",
    transportation: "Transport",
    accessibility: "Centre d'accessibilité",
    volunteerPortalTab: "Tâches des bénévoles",
    organizerCommandTab: "Commandement exécutif",
    emergencyCenter: "Centre d'urgence",
    settings: "Paramètres",
    stadium: "Stade",
    match: "Match",
    weather: "Météo",
    occupancy: "Occupation en direct",
    gates: "Statut des portes",
    activeVolunteers: "Bénévoles actifs",
    incidents: "Alertes de sécurité",
    emergencyModeTitle: "DIRECTIVE D'ÉVACUATION D'URGENCE",
    alertActive: "Mode d'urgence actif",
    carbonSaved: "CO₂ Économisé",
    ecoPoints: "Points Éco"
  },
  pt: {
    welcome: "O Sistema Operacional de IA para Estádios da Copa do Mundo da FIFA",
    welcomeSub: "Uma plataforma de IA generativa que coordena navegação, segurança, acessibilidade e operações em tempo real nas sedes da Copa do Mundo da FIFA 2026.",
    getStarted: "Iniciar",
    howItWorks: "Como Funciona",
    selectRole: "Escolha o seu Função no Painel",
    roleDesc: "Selecione um perfil de usuário para carregar interfaces personalizadas, widgets de telemetria e recomendações de IA.",
    fanRole: "Portal do Torcedor",
    volunteerRole: "Portal do Voluntário",
    organizerRole: "Centro de Comando do Organizador",
    securityRole: "Operações de Segurança",
    transportRole: "Transporte e Logística",
    accessRole: "Centro de Acessibilidade",
    dashboard: "Painel",
    aiAssistant: "Assistente de IA",
    navigation: "Navegação Inteligente",
    crowdAnalytics: "Inteligência de Multidão",
    transportation: "Transporte",
    accessibility: "Centro de Acessibilidade",
    volunteerPortalTab: "Tarefas de Voluntários",
    organizerCommandTab: "Comando Executivo",
    emergencyCenter: "Centro de Emergência",
    settings: "Ajustes",
    stadium: "Estádio",
    match: "Partida",
    weather: "Clima",
    occupancy: "Ocupação ao Vivo",
    gates: "Status dos Portões",
    activeVolunteers: "Voluntários Ativos",
    incidents: "Alertas de Segurança",
    emergencyModeTitle: "DIRETRIZ DE EVACUAÇÃO DE EMERGÊNCIA",
    alertActive: "Modo de Emergência Ativo",
    carbonSaved: "CO₂ Salvo",
    ecoPoints: "Pontos Eco"
  },
  de: {
    welcome: "Das KI-Betriebssystem für FIFA-Weltmeisterschaftsstadien",
    welcomeSub: "Eine generative KI-Plattform, die Navigation, Sicherheit, Barrierefreiheit und Echtzeitbetrieb an den Austragungsorten der FIFA Fussball-Weltmeisterschaft 2026 koordiniert.",
    getStarted: "Loslegen",
    howItWorks: "Wie es funktioniert",
    selectRole: "Wählen Sie Ihre Dashboard-Rolle",
    roleDesc: "Wählen Sie ein Benutzerprofil aus, um personalisierte Benutzeroberflächen, Telemetrie-Widgets und KI-Empfehlungen zu laden.",
    fanRole: "Fan-Portal",
    volunteerRole: "Freiwilligen-Portal",
    organizerRole: "Organisator-Kommandozentrale",
    securityRole: "Sicherheitsbetrieb",
    transportRole: "Transport & Logistik",
    accessRole: "Barrierefreiheitscenter",
    dashboard: "Dashboard",
    aiAssistant: "KI-Assistent",
    navigation: "Intelligente Navigation",
    crowdAnalytics: "Massenintelligenz",
    transportation: "Transportwesen",
    accessibility: "Barrierefreiheit",
    volunteerPortalTab: "Helfer-Aufgaben",
    organizerCommandTab: "Führungskommando",
    emergencyCenter: "Notfallzentrum",
    settings: "Einstellungen",
    stadium: "Stadion",
    match: "Spiel",
    weather: "Wetter",
    occupancy: "Live-Auslastung",
    gates: "Tor-Status",
    activeVolunteers: "Aktive Helfer",
    incidents: "Sicherheitswarnungen",
    emergencyModeTitle: "NOTFALL-EVAKUIERUNGSANWEISUNG",
    alertActive: "Notfallmodus aktiv",
    carbonSaved: "CO₂ Eingespart",
    ecoPoints: "Ökopunkte"
  },
  ar: {
    welcome: "نظام تشغيل الذكاء الاصطناعي لملاعب كأس العالم FIFA",
    welcomeSub: "منصة ذكاء اصطناعي توليدي لتنسيق الملاحة والسلامة والوصول والعمليات في الوقت الفعلي عبر ملاعب كأس العالم 2026.",
    getStarted: "ابدأ الآن",
    howItWorks: "كيف يعمل",
    selectRole: "اختر دور لوحة التحكم الخاص بك",
    roleDesc: "حدد ملفًا شخصيًا للمستخدم لتحميل الواجهات المخصصة وأدوات القياس وتوصيات الذكاء الاصطناعي.",
    fanRole: "بوابة المشجعين",
    volunteerRole: "بوابة المتطوعين",
    organizerRole: "مركز قيادة المنظمين",
    securityRole: "العمليات الأمنية",
    transportRole: "النقل والخدمات اللوجستية",
    accessRole: "مركز إمكانية الوصول",
    dashboard: "لوحة التحكم",
    aiAssistant: "مساعد الذكاء الاصطناعي",
    navigation: "الملاحة الذكية",
    crowdAnalytics: "ذكاء الحشود",
    transportation: "النقل والمواصلات",
    accessibility: "مركز ذوي الهمم",
    volunteerPortalTab: "مهام المتطوعين",
    organizerCommandTab: "القيادة التنفيذية",
    emergencyCenter: "مركز الطوارئ",
    settings: "الإعدادات",
    stadium: "الملعب",
    match: "المباراة",
    weather: "الطقس",
    occupancy: "الإشغال المباشر",
    gates: "حالة البوابات",
    activeVolunteers: "المتطوعين النشطين",
    incidents: "التنبيهات الأمنية",
    emergencyModeTitle: "توجيه إخلاء الطوارئ الفوري",
    alertActive: "وضع الطوارئ نشط",
    carbonSaved: "CO₂ الموفر",
    ecoPoints: "نقاط البيئة"
  },
  ja: {
    welcome: "FIFAワールドカップスタジアム向けAIオペレーティングシステム",
    welcomeSub: "FIFAワールドカップ2026の各会場において、リアルタイムの案内、安全管理、アクセシビリティ、運営体制を統合調整する生成AIプラットフォーム。",
    getStarted: "スタート",
    howItWorks: "仕組みについて",
    selectRole: "ダッシュボードのロール（役割）を選択",
    roleDesc: "ユーザープロファイルを選択して、カスタマイズされたUI、テレメトリウィジェット、AIによる推奨情報を読み込みます。",
    fanRole: "ファンポータル",
    volunteerRole: "ボランティアポータル",
    organizerRole: "運営ディレクターコマンドセンター",
    securityRole: "セキュリティ統括部門",
    transportRole: "交通・輸送ロジスティクス",
    accessRole: "アクセシビリティセンター",
    dashboard: "ダッシュボード",
    aiAssistant: "AIアシスタント",
    navigation: "スマートナビゲーション",
    crowdAnalytics: "群衆流動インテリジェンス",
    transportation: "交通機関・シャトル",
    accessibility: "バリアフリー支援",
    volunteerPortalTab: "ボランティア業務",
    organizerCommandTab: "統括司令部",
    emergencyCenter: "緊急対策室",
    settings: "各種設定",
    stadium: "スタジアム",
    match: "マッチ",
    weather: "ウェザー",
    occupancy: "現在入場率",
    gates: "各ゲートステータス",
    activeVolunteers: "ボランティア配置数",
    incidents: "セキュリティアラート",
    emergencyModeTitle: "【緊急避難指示】",
    alertActive: "緊急警報モード作動中",
    carbonSaved: "CO₂削減量",
    ecoPoints: "エコポイント"
  },
  ko: {
    welcome: "FIFA 월드컵 경기장 전용 AI 운영 체제",
    welcomeSub: "2026 FIFA 월드컵 경기장의 내비게이션, 안전, 교통, 접근성 및 실시간 운영을 조정하는 생성형 AI 플랫폼.",
    getStarted: "시작하기",
    howItWorks: "작동 원리",
    selectRole: "대시보드 역할 선택",
    roleDesc: "개인화된 인터페이스, 통계 위젯 및 AI 권장 사항을 로드하려면 사용자 프로필을 선택하십시오.",
    fanRole: "팬 포털",
    volunteerRole: "자원봉사 포털",
    organizerRole: "조직위 커맨드 센터",
    securityRole: "보안 운영 본부",
    transportRole: "교통 및 물류",
    accessRole: "접근성 센터",
    dashboard: "대시보드",
    aiAssistant: "AI 비서",
    navigation: "스마트 내비게이션",
    crowdAnalytics: "인파 분석 인텔리전스",
    transportation: "교통수단 안내",
    accessibility: "접근성 지원",
    volunteerPortalTab: "봉사자 업무",
    organizerCommandTab: "총괄 지휘부",
    emergencyCenter: "비상 대책 센터",
    settings: "설정",
    stadium: "경기장",
    match: "경기",
    weather: "날씨",
    occupancy: "실시간 혼잡도",
    gates: "게이트 상태",
    activeVolunteers: "활성 자원봉사자",
    incidents: "보안 경보",
    emergencyModeTitle: "긴급 대피 지시",
    alertActive: "긴급 비상 모드 작동 중",
    carbonSaved: "CO₂ 절감량",
    ecoPoints: "에코 포인트"
  },
  hi: {
    welcome: "फीफा विश्व कप स्टेडियमों के लिए एआई ऑपरेटिंग सिस्टम",
    welcomeSub: "फीफा विश्व कप 2026 स्थलों में नेविगेशन, सुरक्षा, सुगमता और वास्तविक समय के संचालन के समन्वय के लिए एक जनरेटिव एआई प्लेटफॉर्म।",
    getStarted: "शुरू करें",
    howItWorks: "यह कैसे काम करता है",
    selectRole: "अपने डैशबोर्ड की भूमिका चुनें",
    roleDesc: "व्यक्तिगत इंटरफ़ेस, टेलीमेट्री विजेट और एआई सिफारिशों को लोड करने के लिए एक उपयोगकर्ता प्रोफ़ाइल चुनें।",
    fanRole: "प्रशंसक पोर्टल",
    volunteerRole: "स्वयंसेवक पोर्टल",
    organizerRole: "आयोजक कमान केंद्र",
    securityRole: "सुरक्षा संचालन",
    transportRole: "परिवहन और रसद",
    accessRole: "सुगमता केंद्र",
    dashboard: "डैशबोर्ड",
    aiAssistant: "एआई सहायक",
    navigation: "स्मार्ट नेविगेशन",
    crowdAnalytics: "भीड़ खुफिया जानकारी",
    transportation: "परिवहन",
    accessibility: "सुगमता केंद्र",
    volunteerPortalTab: "स्वयंसेवक कार्य",
    organizerCommandTab: "कार्यकारी कमान",
    emergencyCenter: "आपातकालीन केंद्र",
    settings: "सेटिंग्स",
    stadium: "स्टेडियम",
    match: "मैच",
    weather: "मौसम",
    occupancy: "लाइव अधिभोग",
    gates: "गेट की स्थिति",
    activeVolunteers: "सक्रिय स्वयंसेवक",
    incidents: "सुरक्षा अलर्ट",
    emergencyModeTitle: "आपातकालीन निकासी निर्देश",
    alertActive: "आपातकालीन मोड सक्रिय",
    carbonSaved: "CO₂ बचाया गया",
    ecoPoints: "इको पॉइंट"
  },
  zh: {
    welcome: "国际足联世界杯体育场 AI 操作系统",
    welcomeSub: "在 2026 年国际足联世界杯场馆中协调导航、安全、无障碍设施以及实时运营的生成式 AI 平台。",
    getStarted: "开始使用",
    howItWorks: "工作原理",
    selectRole: "选择您的控制面板角色",
    roleDesc: "选择用户配置文件以加载个性化界面、遥测组件和 AI 建议内容。",
    fanRole: "球迷门户",
    volunteerRole: "志愿者门户",
    organizerRole: "赛事主办方指挥中心",
    securityRole: "安全保卫中心",
    transportRole: "交通运输与物流",
    accessRole: "无障碍支持中心",
    dashboard: "控制面板",
    aiAssistant: "AI 助理",
    navigation: "智能导航",
    crowdAnalytics: "人流情报分析",
    transportation: "交通出行",
    accessibility: "无障碍中心",
    volunteerPortalTab: "志愿者任务",
    organizerCommandTab: "行政指挥部",
    emergencyCenter: "紧急应变中心",
    settings: "系统设置",
    stadium: "体育场",
    match: "比赛",
    weather: "天气",
    occupancy: "实时上座率",
    gates: "闸口状态",
    activeVolunteers: "在岗志愿者",
    incidents: "安全告警",
    emergencyModeTitle: "【紧急疏散指令】",
    alertActive: "紧急警报模式已启用",
    carbonSaved: "CO₂ 减排量",
    ecoPoints: "环保积分"
  }
};
