import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GradientButton } from "../components/primitives/GradientButton";

describe("GradientButton Primitive Component", () => {
  it("renders children correctly", () => {
    render(<GradientButton>Click Me</GradientButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<GradientButton onClick={handleClick}>Click Me</GradientButton>);
    
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the disabled state correctly", () => {
    render(<GradientButton disabled>Disabled Button</GradientButton>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});
