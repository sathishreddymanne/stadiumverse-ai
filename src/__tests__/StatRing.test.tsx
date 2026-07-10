import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatRing } from "../components/primitives/StatRing";

describe("StatRing Telemetry Component", () => {
  it("renders status percentage value correctly", () => {
    render(<StatRing value={75} title="Gate Occupancy" subtitle="Sector A" />);
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Gate Occupancy")).toBeInTheDocument();
    expect(screen.getByText("Sector A")).toBeInTheDocument();
  });

  it("assigns progressbar ARIA accessibility tags correctly", () => {
    render(<StatRing value={45} title="Main Parking" />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "45");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-label", "Main Parking");
  });
});
