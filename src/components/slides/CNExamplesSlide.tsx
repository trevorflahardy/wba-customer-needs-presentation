import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, WHITE } from "../../constants/theme";

export function CNExamplesSlide() {
  const mobile = useIsMobile();
  const examples = [
    {
      need: "Safety",
      icon: "🛡️",
      desc: "Robot should not harm the user or environment",
    },
    { need: "Cost", icon: "💰", desc: "Stays within the project budget" },
    {
      need: "Durability",
      icon: "🔩",
      desc: "Can withstand repeated use without breaking",
    },
    {
      need: "Ease of Use",
      icon: "🤲",
      desc: "Simple enough for K-12 students to operate",
    },
    {
      need: "Aesthetics",
      icon: "🎨",
      desc: "Looks appealing and well-crafted",
    },
    {
      need: "Performance",
      icon: "⚡",
      desc: "Completes the task effectively and quickly",
    },
  ];
  return (
    <div style={{ padding: mobile ? "24px 16px" : "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Examples of Customer Needs
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 12,
          }}
        />
        <p style={{ fontSize: 15, color: "#64748b", marginBottom: 24 }}>
          Common needs you might identify for your robot project. Your team
          picks the ones that matter most.
        </p>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: mobile ? 10 : 14,
        }}
      >
        {examples.map((ex, i) => (
          <FadeIn key={i} delay={200 + i * 100}>
            <div
              style={{
                background: WHITE,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{ex.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEAL }}>
                {ex.need}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {ex.desc}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={900}>
        <div
          style={{
            marginTop: 20,
            padding: "12px 20px",
            background: "#FFF8E7",
            borderRadius: 10,
            border: `1px solid ${GOLD}33`,
            fontSize: 14,
            color: "#7c6a1a",
          }}
        >
          💡 <strong>Tip:</strong> You can define your own customer needs or
          select from highlighted stakeholder needs. The stakeholder may not
          always know what's technically possible — that's where your
          engineering judgment comes in.
        </div>
      </FadeIn>
    </div>
  );
}
