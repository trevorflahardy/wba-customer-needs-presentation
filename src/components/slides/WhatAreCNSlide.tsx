import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WhatAreCNSlide() {
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
          What Are Customer Needs?
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
            background: TEAL_LIGHT,
            borderRadius: 16,
            padding: mobile ? 20 : 28,
            marginBottom: 24,
            borderLeft: `4px solid ${TEAL}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{ fontSize: 18, fontWeight: 700, color: TEAL, lineHeight: 1.5 }}
          >
            Customer needs are what your client or stakeholder is asking for.
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#4a5568",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            In your robot project, those stakeholders are{" "}
            <strong>K-12 students</strong> and <strong>your professor</strong>. Their
            wants and expectations drive your design decisions.
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div
          style={{
            fontSize: 16,
            color: DARK,
            lineHeight: 1.7,
            marginBottom: 22,
          }}
        >
          Think of it this way: before you build anything, you need to understand{" "}
          <em>what problem you're solving</em> and{" "}
          <em>who you're solving it for</em>. Customer needs capture that. 💡
        </div>
      </FadeIn>
      <FadeIn delay={600}>
        <div style={{ display: "flex", gap: 14, flexDirection: mobile ? "column" : "row" }}>
          {[
            {
              icon: "🎯",
              title: "Specific",
              desc: "Each need should be clear and identifiable",
            },
            {
              icon: "⚖️",
              title: "Weighted",
              desc: "Not all needs are equally important",
            },
            {
              icon: "📊",
              title: "Measurable",
              desc: "You should be able to evaluate how well a design meets each need",
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: WHITE,
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: mobile ? 18 : 22,
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: TEAL,
                  marginBottom: 4,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
