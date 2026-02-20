import { useState, useEffect, useCallback, useRef } from "react";
import { useIsMobile } from "./hooks/useIsMobile";
import { slides, slideNames, TEAL, DARK, WHITE } from "./constants/theme";
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
import { Mascot } from "./components/Mascot";

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
  const slideAreaRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
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

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      slideAreaRef.current?.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [currentSlide]);

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

  const progressPercent = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        background: "#f8fafb",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {/* Top nav — Duolingo-style progress header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: WHITE,
          borderBottom: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: mobile ? "10px 16px" : "12px 32px",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: TEAL,
              letterSpacing: 0.5,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>📐</span>
            EGN3000L
          </div>

          {/* Progress bar — Duolingo style */}
          <div
            style={{
              flex: 1,
              maxWidth: 500,
              height: 16,
              background: "#e8ecef",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${TEAL}, #00a86b)`,
                borderRadius: 12,
                transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: 4,
                  right: 4,
                  height: 5,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: DARK,
              flexShrink: 0,
              background: "#f0f4f8",
              borderRadius: 20,
              padding: "4px 12px",
            }}
          >
            {currentSlide + 1}/{slides.length}
          </div>
        </div>

      </div>

      {/* Slide area — expanded website sizing */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: mobile ? "12px 8px" : "32px 24px",
          overflow: "auto",
          overflowAnchor: "none",
        }}
        ref={slideAreaRef}
      >
        <div
          key={animKey}
          style={{
            width: "100%",
            maxWidth: 1080,
            background: WHITE,
            borderRadius: mobile ? 16 : 24,
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.06)",
            overflow: "hidden",
            position: "relative",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <SlideComponent />
        </div>
      </div>

      {/* Bottom nav — Duolingo style buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: mobile ? "12px 16px" : "14px 32px",
          background: WHITE,
          borderTop: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => goTo(currentSlide - 1)}
          disabled={currentSlide === 0}
          style={{
            padding: mobile ? "10px 16px" : "10px 24px",
            borderRadius: 12,
            border: `2px solid ${currentSlide === 0 ? "#dde3ea" : TEAL}`,
            background: "transparent",
            color: currentSlide === 0 ? "#94a3b8" : TEAL,
            fontWeight: 700,
            fontSize: mobile ? 14 : 15,
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
        >
          {mobile ? "←" : "← Back"}
        </button>
        {!mobile && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: DARK,
              textAlign: "center",
            }}
          >
            {slideNames[currentSlide]}
          </div>
        )}
        <button
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: mobile ? "10px 16px" : "10px 24px",
            borderRadius: 12,
            border: "none",
            background:
              currentSlide === slides.length - 1
                ? "#dde3ea"
                : `linear-gradient(135deg, ${TEAL}, #00a86b)`,
            color: currentSlide === slides.length - 1 ? "#94a3b8" : WHITE,
            fontWeight: 700,
            fontSize: mobile ? 14 : 15,
            cursor:
              currentSlide === slides.length - 1
                ? "not-allowed"
                : "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0,
            boxShadow:
              currentSlide === slides.length - 1
                ? "none"
                : `0 4px 12px ${TEAL}33`,
          }}
        >
          {currentSlide === slides.length - 1
            ? (mobile ? "✓" : "Complete ✓")
            : (mobile ? "→" : "Continue →")}
        </button>
      </div>

      {/* Mascot helper character */}
      <Mascot
        slideType={slides[currentSlide].type}
        slideIndex={currentSlide}
      />
    </div>
  );
}
