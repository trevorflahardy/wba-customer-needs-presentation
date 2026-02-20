import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "./hooks/useIsMobile";
import { slides, slideNames, TEAL, GOLD, DARK, WHITE } from "./constants/theme";
import { TitleSlide } from "./components/slides/TitleSlide";
import { WhatAreCNSlide } from "./components/slides/WhatAreCNSlide";
import { CNExamplesSlide } from "./components/slides/CNExamplesSlide";
import { WeightingRuleSlide } from "./components/slides/WeightingRuleSlide";
import { CNTableSlide } from "./components/slides/CNTableSlide";
import { WhatIsWBASlide } from "./components/slides/WhatIsWBASlide";
import { WBAStepsSlide } from "./components/slides/WBAStepsSlide";
import { WBAExampleSlide } from "./components/slides/WBAExampleSlide";
import { WBAPracticeSlide } from "./components/slides/WBAPracticeSlide";
import { KeyTakeawaysSlide } from "./components/slides/KeyTakeawaysSlide";

const slideComponents = {
  title: TitleSlide,
  "what-are-cn": WhatAreCNSlide,
  "cn-examples": CNExamplesSlide,
  "weighting-rule": WeightingRuleSlide,
  "cn-table": CNTableSlide,
  "what-is-wba": WhatIsWBASlide,
  "wba-steps": WBAStepsSlide,
  "wba-example": WBAExampleSlide,
  "wba-practice": WBAPracticeSlide,
  "key-takeaways": KeyTakeawaysSlide,
};

type SlideType = keyof typeof slideComponents;

export default function App() {
  const mobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrentSlide(idx);
      setAnimKey((k) => k + 1);
    }
  }, []);

  const SlideComponent =
    slideComponents[slides[currentSlide].type as SlideType];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(currentSlide + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentSlide - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentSlide, goTo]);

  // Swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goTo(currentSlide + 1);
        else goTo(currentSlide - 1);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentSlide, goTo]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: mobile ? "8px 12px" : "10px 24px",
          background: WHITE,
          borderBottom: "1px solid #e2e8f0",
          flexShrink: 0,
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: TEAL,
            letterSpacing: 1,
            flexShrink: 0,
          }}
        >
          EGN3000L
        </div>
        <div style={{ display: "flex", gap: mobile ? 3 : 4, flexWrap: "wrap", justifyContent: "center", flex: 1 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={slideNames[i]}
              style={{
                width: i === currentSlide ? (mobile ? 20 : 28) : (mobile ? 8 : 10),
                height: mobile ? 8 : 10,
                borderRadius: 5,
                background:
                  i === currentSlide
                    ? TEAL
                    : i < currentSlide
                    ? GOLD
                    : "#cbd5e1",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8", flexShrink: 0 }}>
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Slide area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: mobile ? "flex-start" : "center",
          justifyContent: "center",
          padding: mobile ? 8 : 24,
          overflow: "auto",
        }}
      >
        <div
          key={animKey}
          style={{
            width: "100%",
            maxWidth: 960,
            minHeight: mobile ? undefined : 540,
            background: WHITE,
            borderRadius: mobile ? 12 : 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <SlideComponent />
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: mobile ? "10px 12px" : "12px 24px",
          background: WHITE,
          borderTop: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => goTo(currentSlide - 1)}
          disabled={currentSlide === 0}
          style={{
            padding: mobile ? "8px 12px" : "8px 20px",
            borderRadius: 8,
            border: `1px solid ${TEAL}`,
            background: "transparent",
            color: TEAL,
            fontWeight: 600,
            fontSize: mobile ? 13 : 14,
            cursor:
              currentSlide === 0 ? "not-allowed" : "pointer",
            opacity: currentSlide === 0 ? 0.4 : 1,
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
        >
          {mobile ? "\u2190" : "\u2190 Previous"}
        </button>
        {!mobile && (
          <div
            style={{ fontSize: 14, fontWeight: 600, color: DARK }}
          >
            {slideNames[currentSlide]}
          </div>
        )}
        <button
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: mobile ? "8px 12px" : "8px 20px",
            borderRadius: 8,
            border: "none",
            background:
              currentSlide === slides.length - 1
                ? "#cbd5e1"
                : TEAL,
            color: WHITE,
            fontWeight: 600,
            fontSize: mobile ? 13 : 14,
            cursor:
              currentSlide === slides.length - 1
                ? "not-allowed"
                : "pointer",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          {mobile ? "\u2192" : "Next \u2192"}
        </button>
      </div>
    </div>
  );
}
