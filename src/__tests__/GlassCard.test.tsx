import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GlassCard } from "../components/primitives/GlassCard";

describe("GlassCard Component", () => {
  it("renders card children elements correctly", () => {
    render(
      <GlassCard>
        <div data-testid="child-element">Card Content</div>
      </GlassCard>
    );
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
  });

  it("adds custom class names to wrapper container", () => {
    render(<GlassCard className="custom-test-class">Card</GlassCard>);
    const cardElement = screen.getByText("Card");
    expect(cardElement).toHaveClass("custom-test-class");
    expect(cardElement).toHaveClass("backdrop-blur-xl");
  });

  it("handles mouse actions and keyboard triggers if click listeners are passed", () => {
    const handleClick = vi.fn();
    render(<GlassCard onClick={handleClick}>Interactive Card</GlassCard>);
    
    const cardElement = screen.getByText("Interactive Card");
    
    // Assert ARIA accessibility details
    expect(cardElement).toHaveAttribute("role", "button");
    expect(cardElement).toHaveAttribute("tabindex", "0");
    
    // Mouse click trigger
    fireEvent.click(cardElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Keyboard enter trigger
    fireEvent.keyDown(cardElement, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(2);
    
    expect(cardElement).toHaveClass("cursor-pointer");
  });
});
