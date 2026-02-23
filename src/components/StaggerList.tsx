import { type ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { TEAL, WHITE, DARK } from "../constants/theme";

/**
 * Renders an ordered list of items where each entry fades in
 * sequentially with a 150 ms gap between items.
 *
 * Each item is prefixed with a numbered TEAL circle badge,
 * giving the list a step-by-step "lesson" appearance.
 *
 * @param items      - Array of ReactNode content for each row.
 * @param startDelay - Base delay (ms) before the first item appears (default 200).
 */
export function StaggerList({ items, startDelay = 200 }: { items: ReactNode[]; startDelay?: number }) {
  return items.map((item: ReactNode, i: number) => (
    <FadeIn key={i} delay={startDelay + i * 150}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            minWidth: 28,
            height: 28,
            borderRadius: "50%",
            background: TEAL,
            color: WHITE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            marginTop: 2,
          }}
        >
          {i + 1}
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.55, color: DARK }}>{item}</div>
      </div>
    </FadeIn>
  ));
}
