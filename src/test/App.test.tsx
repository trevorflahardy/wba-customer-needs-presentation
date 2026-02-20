import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the title slide by default", () => {
    const { container } = render(<App />);
    // Title slide should show EGN3000L branding in the nav
    expect(screen.getByText("EGN3000L")).toBeInTheDocument();
    // Title slide content
    expect(
      screen.getByText("EGN3000L — Engineering Design")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Customer Needs/)
    ).toBeInTheDocument();
    // Slide counter
    expect(screen.getByText("1 / 10")).toBeInTheDocument();
    // Snapshot for regression
    expect(container).toMatchSnapshot();
  });

  it("has 10 navigation dots", () => {
    render(<App />);
    // Each slide has a nav dot button with a title
    const dots = screen.getAllByRole("button", { name: /./i }).filter(
      (btn) => btn.title && btn.title.length > 0
    );
    expect(dots).toHaveLength(10);
  });
});
