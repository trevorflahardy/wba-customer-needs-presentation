import { useState, useEffect, type ReactNode } from "react";

/**
 * A lightweight wrapper that fades its children in with a subtle
 * upward slide after an optional `delay` (in milliseconds).
 *
 * Used on virtually every slide to stagger content entry and create
 * the Duolingo-style "pop-in" feel.
 *
 * @param children - Content to reveal.
 * @param delay    - Milliseconds to wait before becoming visible (default 0).
 * @param className - Optional CSS class forwarded to the outer `<div>`.
 */
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}
