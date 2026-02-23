/**
 * **Slide 1 — Title.**
 *
 * Full-bleed gradient hero card showing the course name (EGN 3000L),
 * presentation title, tagline, and three step-preview badges.
 * Decorative circles and a gold shimmer edge add visual flair.
 */
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { DARK, TEAL, GOLD, WHITE } from "../../constants/theme";

export function TitleSlide() {
  const mobile = useIsMobile();
  return (
    <div
      style={{
        height: "100%",
        minHeight: mobile ? 360 : 480,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${DARK} 0%, ${TEAL} 100%)`,
        borderRadius: 20,
        padding: mobile ? 24 : 56,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.06)",
        }}
      />
      {/* Shimmer top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 3s infinite linear",
        }}
      />
      <FadeIn delay={100}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 4,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          EGN 3000L — Engineering Design
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div
          style={{
            fontSize: mobile ? 28 : 44,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.15,
            marginBottom: 14,
            letterSpacing: -0.5,
          }}
        >
          Customer Needs &<br />
          Weighted Benefit Analysis
        </div>
      </FadeIn>
      <FadeIn delay={500}>
        <div
          style={{
            fontSize: mobile ? 16 : 19,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          Learn how to figure out what matters most — and use it to pick your
          best design. 🚀
        </div>
      </FadeIn>
      <FadeIn delay={700}>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Identify Needs", emoji: "🎯" },
            { label: "Weigh Them", emoji: "⚖️" },
            { label: "Build the WBA", emoji: "📊" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: "8px 20px",
                fontSize: 14,
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <span>{s.emoji}</span> Step {i + 1}: {s.label}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
