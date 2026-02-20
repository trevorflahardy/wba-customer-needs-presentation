import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WeightingRuleSlide() {
  const mobile = useIsMobile();
  const [animStep, setAnimStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimStep(1), 400),
      setTimeout(() => setAnimStep(2), 800),
      setTimeout(() => setAnimStep(3), 1200),
      setTimeout(() => setAnimStep(4), 1600),
      setTimeout(() => setAnimStep(5), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const weights = [
    { need: "CN₁", w: 9, color: "#ef4444" },
    { need: "CN₂", w: 7, color: "#f59e0b" },
    { need: "CN₃", w: 6, color: "#3b82f6" },
    { need: "CN₄", w: 8, color: "#8b5cf6" },
    { need: "CN₅", w: 5, color: "#10b981" },
  ];

  return (
    <div style={{ padding: mobile ? "24px 16px" : "40px 48px" }}>
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
          The Weighting Rule
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
            background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
            borderRadius: 14,
            padding: 28,
            color: WHITE,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Key Rule: Rate Each Need 1–10 for Importance
          </div>
          <div style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6 }}>
            Each customer need gets a weight from <strong>1 to 10</strong>{" "}
            based on how important it is to your team.{" "}
            <strong>10 = extremely important</strong>,{" "}
            <strong>1 = low but still important</strong>. Weights are
            independent — they do <strong>not</strong> need to add up to any
            particular number.
          </div>
        </div>
      </FadeIn>
      <div style={{ display: "flex", gap: mobile ? 16 : 32, alignItems: "flex-start", flexDirection: mobile ? "column" : "row" }}>
        <div style={{ flex: 1, width: "100%" }}>
          <FadeIn delay={400}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: DARK,
                marginBottom: 16,
              }}
            >
              Example: Weighting Customer Needs
            </div>
          </FadeIn>
          {weights.map((w, i) => (
            <FadeIn key={i} delay={500 + i * 120}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 110,
                    fontSize: 14,
                    fontWeight: 600,
                    color: DARK,
                  }}
                >
                  {w.need}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 28,
                    background: "#f1f5f9",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width:
                        animStep >= i + 1 ? `${(w.w / 10) * 100}%` : "0%",
                      height: "100%",
                      background: w.color,
                      borderRadius: 14,
                      transition:
                        "width 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {animStep >= i + 1 && (
                      <span
                        style={{
                          color: WHITE,
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {w.w}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={1200}>
            <div
              style={{
                marginTop: 12,
                padding: "10px 16px",
                background: TEAL_LIGHT,
                borderRadius: 10,
                fontSize: 13,
                color: TEAL,
                lineHeight: 1.5,
              }}
            >
              Each weight is an <strong>independent</strong> 1–10 rating.
              Higher weight = more important to your team's design
              decisions.
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={600}>
          <div
            style={{
              width: mobile ? "100%" : 240,
              background: "#fef3c7",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #fbbf2433",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 8 }}>🤔</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#92400e",
                marginBottom: 6,
              }}
            >
              Why 1–10?
            </div>
            <div
              style={{ fontSize: 13, color: "#78350f", lineHeight: 1.5 }}
            >
              The 1–10 scale lets your team express how important each need
              is independently. A 10 means "absolutely critical" and a 1
              means "nice to have but not a dealbreaker." This reflects your
              engineering judgment.
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
