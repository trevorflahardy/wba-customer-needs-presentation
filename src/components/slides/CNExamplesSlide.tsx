/**
 * **Slide 3 — Customer Needs Examples.**
 *
 * Shows six anonymous placeholder cards (CN₁–CN₆) with a dashed-border
 * "your need goes here" style, plus a hint banner explaining that these
 * are placeholders. A bottom section covers how to identify needs
 * (stakeholders, requirements, engineering judgment).
 */
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

export function CNExamplesSlide() {
  const mobile = useIsMobile();

  const placeholders = [
    { label: "CN₁", color: "#006747", bg: "#e6f2ee" },
    { label: "CN₂", color: "#1e40af", bg: "#eff6ff" },
    { label: "CN₃", color: "#7c3aed", bg: "#f5f3ff" },
    { label: "CN₄", color: "#b45309", bg: "#fffbeb" },
    { label: "CN₅", color: "#be123c", bg: "#fff1f2" },
    { label: "CN₆", color: "#047857", bg: "#ecfdf5" },
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
          Examples of Customer Needs
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 16,
          }}
        />
        <p style={{ fontSize: 16, color: "#64748b", marginBottom: 8, lineHeight: 1.6 }}>
          Customer needs represent what your stakeholders care about. Your team
          decides these — they are <strong>unique to your project</strong>.
        </p>
      </FadeIn>

      {/* Placeholder hint banner — Apple-style frosted glass */}
      <FadeIn delay={200}>
        <div
          style={{
            padding: "14px 20px",
            background: "linear-gradient(135deg, rgba(0,103,71,0.06), rgba(0,103,71,0.02))",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 14,
            border: "1px dashed rgba(0,103,71,0.25)",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: TEAL_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            💡
          </div>
          <div style={{ fontSize: 14, color: DARK, lineHeight: 1.5 }}>
            <strong style={{ color: TEAL }}>CN₁, CN₂, CN₃…</strong> are{" "}
            <strong>placeholders</strong> — they represent the customer needs{" "}
            <em>your team</em> will define. Think of these as blank slots
            waiting for your project-specific needs.
          </div>
        </div>
      </FadeIn>

      {/* Placeholder cards — dashed border, "your need here" style */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: mobile ? 10 : 16,
          marginBottom: 24,
        }}
      >
        {placeholders.map((p, i) => (
          <FadeIn key={i} delay={300 + i * 100}>
            <div
              style={{
                background: p.bg,
                border: `2px dashed ${p.color}44`,
                borderRadius: 16,
                padding: mobile ? 18 : 24,
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                cursor: "default",
                animation: "glowPulse 3s ease-in-out infinite",
                animationDelay: `${i * 0.5}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                el.style.borderColor = p.color;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = `${p.color}44`;
              }}
            >
              <div
                style={{
                  fontSize: mobile ? 20 : 24,
                  fontWeight: 800,
                  color: p.color,
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  letterSpacing: 0.5,
                  marginBottom: 8,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                Your team's need goes here
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* How to identify needs — Duolingo-style info cards */}
      <FadeIn delay={900}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: DARK,
            marginBottom: 12,
          }}
        >
          🔍 How do you identify customer needs?
        </div>
        <div style={{ display: "flex", gap: 12, flexDirection: mobile ? "column" : "row", marginBottom: 20 }}>
          {[
            {
              icon: "🗣️",
              title: "Talk to stakeholders",
              desc: "Ask what they care about most",
            },
            {
              icon: "📄",
              title: "Review requirements",
              desc: "Check project docs and constraints",
            },
            {
              icon: "🧠",
              title: "Apply eng. judgment",
              desc: "Consider feasibility and trade-offs",
            },
          ].map((item, j) => (
            <div
              key={j}
              style={{
                flex: 1,
                background: WHITE,
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 16,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEAL }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={1100}>
        <div
          style={{
            padding: "14px 20px",
            background: TEAL_LIGHT,
            borderRadius: 12,
            border: `1px solid ${TEAL}22`,
            fontSize: 14,
            color: TEAL,
            lineHeight: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>📝</span>
          <span>
            You need a <strong>minimum of 5</strong> customer needs. They should be
            specific to <em>your</em> project and stakeholders — not generic categories
            copied from a list.
          </span>
        </div>
      </FadeIn>
    </div>
  );
}
