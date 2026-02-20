import { type ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { TEAL, WHITE, DARK } from "../constants/theme";

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
