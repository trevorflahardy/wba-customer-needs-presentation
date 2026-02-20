import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { StaggerList } from "../StaggerList";
import { TEAL, TEAL_LIGHT, GOLD, DARK } from "../../constants/theme";

export function WBAStepsSlide() {
  const mobile = useIsMobile();
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
          How to Build a WBA — Step by Step
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 28,
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
            from your customer needs table. These become the columns of
            your WBA.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Use your weights</strong> —
            the 1–10 importance ratings you already assigned. These go in
            the first row under the headers.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>
              List your candidate designs
            </strong>{" "}
            as rows. You need at least 2 designs to compare.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Rank each design</strong> on
            how well it meets each customer need on a scale of{" "}
            <strong>1–10</strong> (1 = poor fit, 10 = excellent fit).
            These are your <strong>rankings</strong>.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Multiply & sum:</strong> For
            each design, multiply each rating by its weight, then add them
            all up. That's your total score.
          </span>,
        ]}
      />
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 20,
            background: TEAL_LIGHT,
            borderRadius: 12,
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 32 }}>🧮</div>
          <div>
            <div
              style={{ fontSize: 15, fontWeight: 700, color: TEAL }}
            >
              The Math
            </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: "monospace",
                color: DARK,
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              Total = (W₁ × R₁) + (W₂ × R₂) + (W₃ × R₃) + ...
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748b",
                marginTop: 4,
              }}
            >
              W = weight (1–10 importance) | R = ranking (1–10 how well
              the design fits)
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
