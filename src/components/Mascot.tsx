import { useState, useEffect, useCallback } from "react";
import { WHITE, DARK, TEAL } from "../constants/theme";

/* ── Mascot messages per slide ── */
const MASCOT_TIPS: Record<string, string[]> = {
  title: [
    "Hey there! I'm Benny the Bull 🐂 — I'll help you learn WBA!",
    "Use the arrows or swipe to navigate. Let's go!",
  ],
  "what-are-cn": [
    "Customer needs = what your client actually wants!",
    "Think: what would make the stakeholder say 'perfect!'?",
  ],
  "cn-examples": [
    "These are placeholders — YOUR needs will be unique!",
    "Talk to your stakeholders to figure out what matters.",
  ],
  "weighting-rule": [
    "Remember: 10 = super important, 1 = meh.",
    "These weights are just examples! Yours will be different.",
  ],
  "cn-table": [
    "Pro tip: always justify your weights!",
    "If someone asks 'why 8?', you should have a good answer.",
  ],
  "what-is-wba": [
    "WBA = your team's secret weapon for picking designs!",
    "It's math + judgment. Best of both worlds!",
  ],
  "wba-steps": [
    "Multiply then sum — that's the whole trick!",
    "W × S for each need, then add 'em up! 🧮",
  ],
  "wba-example": [
    "Hover the columns to see the math in action!",
    "The trophy 🏆 goes to the highest total.",
  ],
  "wba-practice": [
    "You got this! Start with the concepts, then crunch numbers!",
    "No calculators — it's more fun this way! 😄",
  ],
  "key-takeaways": [
    "You made it! Now go build an awesome WBA! 🎉",
    "Remember: the WBA is a tool, not a dictator.",
  ],
};

const MASCOT_FACES = ["🐂", "😄", "🤓", "💪", "🎯", "🧠"];

interface MascotProps {
  slideType: string;
  slideIndex: number;
}

export function Mascot({ slideType, slideIndex }: MascotProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [face, setFace] = useState(MASCOT_FACES[0]);

  const tips = MASCOT_TIPS[slideType] || ["Keep going — you're doing great!"];

  // Reset when slide changes
  useEffect(() => {
    setVisible(false);
    setDismissed(false);
    setTipIndex(0);
    setFace(MASCOT_FACES[slideIndex % MASCOT_FACES.length]);

    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [slideType, slideIndex]);

  const cycleTip = useCallback(() => {
    if (tipIndex < tips.length - 1) {
      setTipIndex((i) => i + 1);
      setFace(MASCOT_FACES[(slideIndex + tipIndex + 1) % MASCOT_FACES.length]);
    } else {
      setDismissed(true);
    }
  }, [tipIndex, tips.length, slideIndex]);

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 20,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        animation: "mascotBounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        maxWidth: "min(340px, calc(100vw - 40px))",
      }}
    >
      {/* Speech bubble */}
      <div
        style={{
          background: WHITE,
          borderRadius: 16,
          padding: "12px 16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          border: `2px solid ${TEAL}22`,
          position: "relative",
          flex: 1,
          cursor: "pointer",
        }}
        onClick={cycleTip}
      >
        <div
          style={{
            fontSize: 13,
            color: DARK,
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          {tips[tipIndex]}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 4,
            fontStyle: "italic",
          }}
        >
          {tipIndex < tips.length - 1 ? "tap for more →" : "tap to dismiss"}
        </div>
        {/* Bubble tail */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: -8,
            width: 0,
            height: 0,
            borderLeft: "8px solid white",
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
          }}
        />
      </div>

      {/* Mascot face */}
      <div
        onClick={() => setDismissed(true)}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${TEAL}, #00a86b)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,103,71,0.25)",
          flexShrink: 0,
          animation: "mascotBob 2s ease-in-out infinite",
          border: "3px solid white",
        }}
        title="Click to dismiss Benny"
      >
        {face}
      </div>
    </div>
  );
}
