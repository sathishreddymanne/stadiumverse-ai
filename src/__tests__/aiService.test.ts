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

  it("should generate a valid copilot query response for gate/crowd query", () => {
    const response = getAIResponse("Fan", "Is Gate A crowded right now?", mockContext);
    expect(response.text).toContain("MetLife Stadium");
    expect(response.text).toContain("Gate A");
    expect(response.actions).toBeDefined();
    expect(response.suggestions).toBeDefined();
  });

  it("should generate dynamic volunteer briefings based on role or briefing query", () => {
    const response = getAIResponse("Organizer", "operational summary", mockContext);
    expect(response.text).toContain("Stadium Operational Briefing");
    expect(response.text).toContain("USA vs France");
    expect(response.text).toContain("2 unresolved incidents");
  });
});
