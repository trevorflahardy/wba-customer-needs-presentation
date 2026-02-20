import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { StaggerList } from "../StaggerList";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WBAStepsSlide() {
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
          How to Build a WBA — Step by Step
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
      <StaggerList
        startDelay={200}
        items={[
          <span>
            <strong style={{ color: TEAL }}>
              Pick at least 5 customer needs
            </strong>{" "}
            (CN₁, CN₂, CN₃, …) from your customer needs table. These become
            the columns of your WBA.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Assign weights</strong>{" "}
            (W₁, W₂, W₃, …) — each a 1–10 importance rating you already
            determined. These go in the first row under the headers.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>
              List your candidate designs
            </strong>{" "}
            (D₁, D₂, D₃, …) as rows. You need at least 2 designs to compare.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Score each design</strong> on
            how well it meets each customer need on a scale of{" "}
            <strong>1–10</strong> (1 = poor fit, 10 = excellent fit).
            These are your <strong>scores</strong> (S).
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Multiply & sum:</strong> For
            each cell, compute <strong>Wᵢ × Sᵢ</strong>, then add all
            products for each design to get the total.
          </span>,
        ]}
      />

      {/* The Equation */}
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 20,
            background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
            borderRadius: 18,
            padding: mobile ? 20 : 28,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 32 }}>🧮</div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontSize: 15, fontWeight: 700, color: WHITE }}
            >
              The WBA Equation
            </div>
            <div
              style={{
                fontSize: mobile ? 16 : 20,
                fontFamily: "monospace",
                color: WHITE,
                marginTop: 8,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Total = Σ (Wᵢ × Sᵢ)
            </div>
            <div
              style={{
                fontSize: mobile ? 14 : 16,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.75)",
                marginTop: 6,
              }}
            >
              = (W₁ × S₁) + (W₂ × S₂) + (W₃ × S₃) + …
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  padding: "4px 12px",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <strong>W</strong> = Weight (1–10 importance)
              </div>
              <div
                style={{
                  padding: "4px 12px",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <strong>S</strong> = Score (1–10 how well design fits)
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Variable legend */}
      <FadeIn delay={1200}>
        <div
          style={{
            marginTop: 14,
            padding: "16px 22px",
            background: TEAL_LIGHT,
            borderRadius: 14,
            fontSize: 14,
            color: TEAL,
            lineHeight: 1.6,
          }}
        >
          📝 <strong>In plain English:</strong> For each customer need, multiply
          your team's <em>importance weight</em> by the design's <em>score</em> for
          that need. Add up all those products — that's the design's total.
          The design with the <strong>highest total</strong> is typically your
          candidate design.
        </div>
      </FadeIn>
    </div>
  );
}
