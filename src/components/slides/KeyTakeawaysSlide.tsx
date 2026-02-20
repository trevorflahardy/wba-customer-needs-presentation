import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, WHITE } from "../../constants/theme";

export function KeyTakeawaysSlide() {
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
          Key Takeaways
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {[
          {
            emoji: "📋",
            text: "Customer needs come from your stakeholders. Identify at least 5 for your project.",
          },
          {
            emoji: "⚖️",
            text: "Weights (1–10) reflect YOUR team's engineering judgment on how important each need is — they don't need to add up to anything.",
          },
          {
            emoji: "📊",
            text: "The WBA ranks each design (1–10) on how well it fits each weighted need.",
          },
          {
            emoji: "🧮",
            text: "Multiply each ranking by its weight, sum the row — highest score is typically your pick.",
          },
          {
            emoji: "🤝",
            text: "The WBA is a tool, not a boss. If your team disagrees with the result, explain why.",
          },
        ].map((item, i) => (
          <FadeIn key={i} delay={200 + i * 150}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 20px",
                background: WHITE,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: 24, lineHeight: 1 }}>
                {item.emoji}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: DARK,
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
