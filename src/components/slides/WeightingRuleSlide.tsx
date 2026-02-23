/**
 * **Slide 4 — The Weighting Rule.**
 *
 * Explains the 1–10 importance rating with a prominent rule card,
 * an animated horizontal bar chart showing example weights, and
 * side-panel guidance tips. An "Example Only" badge prevents students
 * from treating the sample weights as canonical.
 */
import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WeightingRuleSlide() {
  const mobile = useIsMobile();
  const [animStep, setAnimStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimStep(1), 600),
      setTimeout(() => setAnimStep(2), 1000),
      setTimeout(() => setAnimStep(3), 1400),
      setTimeout(() => setAnimStep(4), 1800),
      setTimeout(() => setAnimStep(5), 2200),
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
    <div style={{ padding: mobile ? "28px 16px" : "48px 56px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 24 : 32,
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

      {/* Key rule card */}
      <FadeIn delay={200}>
        <div
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
            borderRadius: 18,
            padding: mobile ? 24 : 32,
            color: WHITE,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 800, marginBottom: 10 }}>
            ⚖️ Key Rule: Rate Each Need 1–10 for Importance
          </div>
          <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.7 }}>
            Each customer need gets a weight from <strong>1 to 10</strong>{" "}
            based on how important it is to your team.{" "}
            <strong>10 = extremely important</strong>,{" "}
            <strong>1 = low but still relevant</strong>. Weights are
            independent — they do <strong>not</strong> need to add up to any
            particular number.
          </div>
        </div>
      </FadeIn>

      <div style={{ display: "flex", gap: mobile ? 16 : 28, alignItems: "flex-start", flexDirection: mobile ? "column" : "row" }}>
        <div style={{ flex: 1, width: "100%" }}>
          <FadeIn delay={400}>
            {/* Example badge — makes it crystal clear */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: "4px 12px",
                  background: "#fef3c7",
                  border: "2px dashed #fbbf24",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#92400e",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                Example Only
              </div>
              <div style={{ fontSize: 14, color: "#64748b" }}>
                These weights are made up — yours will be different!
              </div>
            </div>
          </FadeIn>

          {/* Animated bar chart with dashed border container */}
          <div
            style={{
              border: "2px dashed #e2e8f0",
              borderRadius: 16,
              padding: mobile ? 16 : 20,
              background: "#fafbfc",
            }}
          >
            {weights.map((w, i) => (
              <FadeIn key={i} delay={500 + i * 120}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      fontSize: 15,
                      fontWeight: 700,
                      color: DARK,
                      fontFamily: "'SF Mono', monospace",
                    }}
                  >
                    {w.need}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 32,
                      background: "#f1f5f9",
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width:
                          animStep >= i + 1 ? `${(w.w / 10) * 100}%` : "0%",
                        height: "100%",
                        background: `linear-gradient(90deg, ${w.color}, ${w.color}cc)`,
                        borderRadius: 16,
                        transition:
                          "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      {animStep >= i + 1 && (
                        <span
                          style={{
                            color: WHITE,
                            fontSize: 14,
                            fontWeight: 800,
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
          </div>

          <FadeIn delay={1300}>
            <div
              style={{
                marginTop: 14,
                padding: "12px 16px",
                background: TEAL_LIGHT,
                borderRadius: 12,
                fontSize: 14,
                color: TEAL,
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
              Each weight is an <strong>independent</strong> 1–10 rating.
              Higher weight = more important to your team.
            </div>
          </FadeIn>
        </div>

        {/* Why 1-10 card */}
        <FadeIn delay={600}>
          <div
            style={{
              width: mobile ? "100%" : 260,
              background: "#fef3c7",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #fbbf2433",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>🤔</div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#92400e",
                marginBottom: 8,
              }}
            >
              Why 1–10?
            </div>
            <div
              style={{ fontSize: 14, color: "#78350f", lineHeight: 1.6 }}
            >
              The 1–10 scale lets your team express how important each need
              is independently. A <strong>10</strong> means "absolutely critical" and a{" "}
              <strong>1</strong> means "nice to have but not a dealbreaker."
            </div>
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: 10,
                fontSize: 13,
                color: "#78350f",
                lineHeight: 1.5,
              }}
            >
              💡 <strong>Remember:</strong> This reflects your team's
              engineering judgment — not a formula!
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
