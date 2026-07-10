import { describe, it, expect } from "vitest";
import { getAIResponse } from "../services/aiService";

describe("AI Service Telemetry Synthesis", () => {
  const mockContext = {
    stadiumName: "MetLife Stadium",
    matchName: "USA vs France",
    gateList: [
      { name: "Gate A", occupancy: 88, status: "Slow" },
      { name: "Gate B", occupancy: 35, status: "Open" },
    ],
    activeVolunteers: 18,
    unresolvedIncidents: 2,
    parkingLots: [
      { name: "Lot A", available: 120, capacity: 500 },
      { name: "Lot B", available: 80, capacity: 400 },
    ],
  };

  it("should generate a response for crowd/gate query", () => {
    const response = getAIResponse("Fan", "Is Gate A busy right now?", mockContext);
    expect(response.text).toContain("MetLife Stadium");
    expect(response.text).toContain("Gate A");
    expect(response.text).toContain("occupancy");
    expect(response.actions).toBeDefined();
    expect(response.suggestions).toBeDefined();
  });

  it("should generate a response for food/washroom query", () => {
    const response = getAIResponse("Fan", "Where can I eat tacos or burgers?", mockContext);
    expect(response.text).toContain("Azteca Tacos");
    expect(response.text).toContain("Washrooms");
    expect(response.actions).toBeDefined();
  });

  it("should generate a response for accessibility queries", () => {
    const response = getAIResponse("Fan", "Do you have wheelchair access elevator route?", mockContext);
    expect(response.text).toContain("Accessibility Center");
    expect(response.text).toContain("South Entrance Elevator");
    expect(response.actions).toBeDefined();
  });

  it("should generate a response for transportation/departure queries", () => {
    const response = getAIResponse("Fan", "How is parking and rideshare pricing?", mockContext);
    expect(response.text).toContain("Metro Line");
    expect(response.text).toContain("Rideshare");
    expect(response.text).toContain("200 parking spaces"); // 120 + 80 = 200 available
  });

  it("should generate a response for translation/announcements queries", () => {
    const response = getAIResponse("Fan", "translate announcement to spanish or french", mockContext);
    expect(response.text).toContain("Spanish (Español)");
    expect(response.text).toContain("French (Français)");
  });

  it("should generate a response for organizer command/briefings", () => {
    const response = getAIResponse("Organizer", "operational summary", mockContext);
    expect(response.text).toContain("Stadium Operational Briefing");
    expect(response.text).toContain("USA vs France");
    expect(response.text).toContain("2 unresolved incidents");
  });

  it("should fallback cleanly for generic chat queries", () => {
    const response = getAIResponse("Fan", "hello co-pilot assistant", mockContext);
    expect(response.text).toContain("StadiumVerse AI Co-Pilot");
    expect(response.suggestions).toContain("Is Gate A crowded right now?");
  });
});
