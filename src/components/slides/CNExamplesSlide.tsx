import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, WHITE } from "../../constants/theme";

export function CNExamplesSlide() {
  const mobile = useIsMobile();
  const examples = [
    {
      need: "CN₁",
      icon: "🔵",
      desc: "A need related to protecting users or meeting regulatory standards",
    },
    {
      need: "CN₂",
      icon: "🟢",
      desc: "A need driven by budget or resource constraints",
    },
    {
      need: "CN₃",
      icon: "🟠",
      desc: "A need focused on longevity or reliability over time",
    },
    {
      need: "CN₄",
      icon: "🟣",
      desc: "A need concerning how intuitive or accessible the design is",
    },
    {
      need: "CN₅",
      icon: "🔴",
      desc: "A need about the visual or physical appeal of the design",
    },
    {
      need: "CN₆",
      icon: "🟡",
      desc: "A need relating to how effectively the design completes its task",
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
          Customer needs represent what your stakeholders care about. Below
          are <strong>generic categories</strong> — your team will define
          specific needs for your own project.
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
                borderRadius: 14,
                padding: 22,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{ex.icon}</div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: TEAL,
                  fontFamily: "monospace",
                  letterSpacing: 0.5,
                }}
              >
                {ex.need}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginTop: 6,
                  lineHeight: 1.5,
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
            padding: "14px 20px",
            background: "#FFF8E7",
            borderRadius: 10,
            border: `1px solid ${GOLD}33`,
            fontSize: 14,
            color: "#7c6a1a",
            lineHeight: 1.5,
          }}
        >
          💡 <strong>Tip:</strong> These are <em>categories</em> of needs,
          not the actual names you'll use. Your team decides the specific
          customer needs based on your stakeholders' requirements and your
          engineering judgment.
        </div>
      </FadeIn>
      <FadeIn delay={1100}>
        <div
          style={{
            marginTop: 12,
            padding: "14px 20px",
            background: `linear-gradient(135deg, ${TEAL}08, ${TEAL}15)`,
            borderRadius: 10,
            border: `1px solid ${TEAL}22`,
            fontSize: 13,
            color: DARK,
            lineHeight: 1.5,
          }}
        >
          📝 <strong>Note:</strong> You need a <strong>minimum of 5</strong>{" "}
          customer needs for your project. The examples above are generic —
          your needs should be specific to your project and stakeholders.
        </div>
      </FadeIn>
    </div>
  );
}
