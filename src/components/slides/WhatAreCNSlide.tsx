import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function WhatAreCNSlide() {
  const mobile = useIsMobile();
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
          What Are Customer Needs?
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
      <FadeIn delay={200}>
        <div
          style={{
            background: TEAL_LIGHT,
            borderRadius: 12,
            padding: 24,
            marginBottom: 28,
            borderLeft: `4px solid ${TEAL}`,
          }}
        >
          <div
            style={{ fontSize: 18, fontWeight: 600, color: TEAL, lineHeight: 1.5 }}
          >
            Customer needs are what your client or stakeholder is asking for.
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#4a5568",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            In your robot project, those stakeholders are{" "}
            <strong>K-12 students</strong> and <strong>Dr. Hu</strong>. Their
            wants and expectations drive your design decisions.
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div
          style={{
            fontSize: 17,
            color: DARK,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          Think of it this way: before you build anything, you need to understand{" "}
          <em>what problem you're solving</em> and{" "}
          <em>who you're solving it for</em>. Customer needs capture that.
        </div>
      </FadeIn>
      <FadeIn delay={600}>
        <div style={{ display: "flex", gap: 16, flexDirection: mobile ? "column" : "row" }}>
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
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
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
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
