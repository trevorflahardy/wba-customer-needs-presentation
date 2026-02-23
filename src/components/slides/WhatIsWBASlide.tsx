/**
 * **Slide 6 — What Is a WBA?**
 *
 * Defines Weighted Benefit Analysis (a.k.a. Pugh Chart) with a hero
 * callout, then shows a three-step flow: Customer Needs Table → WBA
 * Matrix → Best Design, connected by animated arrows.
 */
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WhatIsWBASlide() {
  const mobile = useIsMobile();
  return (
    <div style={{ padding: mobile ? "24px 16px" : "40px 56px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 24 : 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          What Is a Weighted Benefit Analysis?
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />
      </FadeIn>
      <FadeIn delay={200}>
        <div
          style={{
            background: `linear-gradient(135deg, ${DARK}, #1e3a5a)`,
            borderRadius: 18,
            padding: mobile ? 24 : 32,
            color: WHITE,
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${TEAL}88, transparent)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite linear",
            }}
          />
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.5 }}>
            A WBA (also called a Pugh Chart) is a decision matrix that
            compares your candidate designs against your customer needs.
          </div>
          <div
            style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7 }}
          >
            It takes the customer needs you've already weighted and asks:{" "}
            <em>"How well does each design meet each need?"</em> 🤔
          </div>
        </div>
      </FadeIn>
      <div
        style={{ display: "flex", gap: mobile ? 8 : 20, alignItems: "center", flexDirection: mobile ? "column" : "row" }}
      >
        {[
          {
            icon: "📋",
            title: "Customer Needs Table",
            desc: "What matters & how much (each weight rated 1–10)",
            delay: 400,
          },
          {
            icon: "⚖️",
            title: "WBA Matrix",
            desc: "Rank each design (1–10) on how well it fits each need, multiply by weight",
            delay: 600,
          },
          {
            icon: "🏆",
            title: "Best Design",
            desc: "Highest total score wins (usually!)",
            delay: 800,
          },
        ].map((item, i) => (
          <FadeIn key={i} delay={item.delay}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  background: TEAL_LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: 34,
                  boxShadow: "0 4px 16px rgba(0,103,71,0.1)",
                  transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                }}
              >
                {item.icon}
              </div>
              <div
                style={{ fontSize: 15, fontWeight: 700, color: TEAL }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
              {i < 2 && (
                <div
                  style={{
                    fontSize: 24,
                    color: GOLD,
                    marginTop: 8,
                    transform: mobile ? "rotate(90deg)" : "none",
                  }}
                >
                  →
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 24,
            padding: "16px 22px",
            background: "#fef3c7",
            borderRadius: 14,
            border: `1px solid ${GOLD}33`,
            fontSize: 14,
            color: "#7c6a1a",
            lineHeight: 1.6,
          }}
        >
          ⚠️ <strong>Important:</strong> The WBA is a decision-making{" "}
          <em>tool</em>, not a dictator. The highest-scoring design{" "}
          <em>should</em> be your choice, but if your team disagrees, you
          can choose differently — just be ready to explain why.
        </div>
      </FadeIn>
    </div>
  );
}
