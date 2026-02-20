import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, WHITE } from "../../constants/theme";

export function KeyTakeawaysSlide() {
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
          Key Takeaways
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
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
                padding: "16px 22px",
                background: WHITE,
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
              }}
            >
              <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: DARK,
                  lineHeight: 1.6,
                }}
              >
                {item.text}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Completion encouragement */}
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 20,
            padding: "18px 24px",
            background: `linear-gradient(135deg, ${TEAL}, #00a86b)`,
            borderRadius: 16,
            textAlign: "center",
            color: WHITE,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 6 }}>🎓</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            You're ready!
          </div>
          <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>
            Head back to the Practice slide if you want another round, or start
            building your team's WBA. Good luck! 💪
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
