import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { DARK, TEAL, GOLD, WHITE } from "../../constants/theme";

export function TitleSlide() {
  const mobile = useIsMobile();
  return (
    <div
      style={{
        height: "100%",
        minHeight: mobile ? 360 : 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${DARK} 0%, ${TEAL} 100%)`,
        borderRadius: 16,
        padding: mobile ? 20 : 48,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.08)",
        }}
      />
      <FadeIn delay={100}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 3,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          EGN3000L — Engineering Design
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div
          style={{
            fontSize: mobile ? 26 : 40,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Customer Needs &<br />
          Weighted Benefit Analysis
        </div>
      </FadeIn>
      <FadeIn delay={500}>
        <div
          style={{
            fontSize: mobile ? 15 : 18,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          How to figure out what matters most — and use it to pick your best
          design.
        </div>
      </FadeIn>
      <FadeIn delay={700}>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Step 1: Identify Needs",
            "Step 2: Weigh Them",
            "Step 3: Build the WBA",
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
