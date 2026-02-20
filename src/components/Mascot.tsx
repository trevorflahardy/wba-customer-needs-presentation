import { useState, useEffect, useCallback } from "react";
import { WHITE, DARK, TEAL } from "../constants/theme";

/* ── Show mascot on most slides (skip only cn-examples and cn-table) ── */
const MASCOT_SLIDES = new Set([
  "title",
  "what-are-cn",
  "weighting-rule",
  "what-is-wba",
  "wba-steps",
  "wba-example",
  "wba-practice",
  "key-takeaways",
]);

const MASCOT_TIPS: Record<string, string[]> = {
  title: [
    "Hey! I'm Rocky — your WBA guide. Let's do this!",
    "Use the arrows or swipe to go through slides. Horns up!",
  ],
  "what-are-cn": [
    "Customer needs = what makes your client go 'YES!'",
    "Think about what the stakeholder actually cares about.",
  ],
  "weighting-rule": [
    "10 = super important, 1 = meh. Choose wisely!",
    "These weights are examples — yours will be different.",
  ],
  "what-is-wba": [
    "WBA = your team's secret weapon for picking designs!",
    "It turns opinions into math. Pretty neat, right?",
  ],
  "wba-steps": [
    "Multiply then sum — that's the whole trick!",
    "W × S for each need, then add 'em up!",
  ],
  "wba-example": [
    "The trophy goes to the highest total!",
    "Each cell is score × weight. Row sums = totals.",
  ],
  "wba-practice": [
    "You got this! Start with concepts, then crunch numbers!",
    "Take your time — no rush!",
  ],
  "key-takeaways": [
    "You made it! Now go build an awesome WBA!",
    "Remember: the WBA is a tool, not a dictator.",
  ],
};

/* ── Cute SVG Rocky the Bull — USF gray bull, Duolingo-style ── */
type Mood = "happy" | "wink" | "thinking" | "excited" | "cool" | "surprised";

function BullFace({ mood, size = 56 }: { mood: Mood; size?: number }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2 + 2; // shift down slightly so horns fit in viewBox
  const r = s * 0.36; // head radius

  // Eye positions
  const eyeL = { x: cx - r * 0.34, y: cy - r * 0.12 };
  const eyeR = { x: cx + r * 0.34, y: cy - r * 0.12 };

  // Color palette — USF Rocky gray
  const headMain = "#6B7280";    // gray-500
  const headLight = "#9CA3AF";   // gray-400 (face area)
  const headDark = "#4B5563";    // gray-600 (ears)
  const earInner = "#F9A8D4";    // pink inner ear
  const hornFill = "#D4A843";    // golden horns
  const hornStroke = "#B8922E";
  const snoutColor = "#D1D5DB";  // gray-300
  const nostrilColor = "#4B5563";
  const browColor = "#374151";
  const mouthColor = "#374151";

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: "block" }}>
      {/* Left horn — filled, connected to head */}
      <path
        d={`M${cx - r * 0.45} ${cy - r * 0.75}
            C${cx - r * 0.65} ${cy - r * 1.2}, ${cx - r * 0.85} ${cy - r * 1.35}, ${cx - r * 0.5} ${cy - r * 1.25}
            C${cx - r * 0.2} ${cy - r * 1.15}, ${cx - r * 0.25} ${cy - r * 0.9}, ${cx - r * 0.3} ${cy - r * 0.8}
            Z`}
        fill={hornFill}
        stroke={hornStroke}
        strokeWidth={1}
      />
      {/* Right horn — filled, connected to head */}
      <path
        d={`M${cx + r * 0.45} ${cy - r * 0.75}
            C${cx + r * 0.65} ${cy - r * 1.2}, ${cx + r * 0.85} ${cy - r * 1.35}, ${cx + r * 0.5} ${cy - r * 1.25}
            C${cx + r * 0.2} ${cy - r * 1.15}, ${cx + r * 0.25} ${cy - r * 0.9}, ${cx + r * 0.3} ${cy - r * 0.8}
            Z`}
        fill={hornFill}
        stroke={hornStroke}
        strokeWidth={1}
      />

      {/* Ears */}
      <ellipse
        cx={cx - r * 0.9}
        cy={cy - r * 0.2}
        rx={r * 0.24}
        ry={r * 0.35}
        fill={headDark}
        transform={`rotate(-25 ${cx - r * 0.9} ${cy - r * 0.2})`}
      />
      <ellipse
        cx={cx + r * 0.9}
        cy={cy - r * 0.2}
        rx={r * 0.24}
        ry={r * 0.35}
        fill={headDark}
        transform={`rotate(25 ${cx + r * 0.9} ${cy - r * 0.2})`}
      />
      {/* Inner ears */}
      <ellipse
        cx={cx - r * 0.9}
        cy={cy - r * 0.2}
        rx={r * 0.13}
        ry={r * 0.22}
        fill={earInner}
        transform={`rotate(-25 ${cx - r * 0.9} ${cy - r * 0.2})`}
      />
      <ellipse
        cx={cx + r * 0.9}
        cy={cy - r * 0.2}
        rx={r * 0.13}
        ry={r * 0.22}
        fill={earInner}
        transform={`rotate(25 ${cx + r * 0.9} ${cy - r * 0.2})`}
      />

      {/* Head */}
      <circle cx={cx} cy={cy} r={r} fill={headMain} />
      {/* Face lighter area */}
      <ellipse cx={cx} cy={cy + r * 0.18} rx={r * 0.62} ry={r * 0.52} fill={headLight} />

      {/* Snout */}
      <ellipse cx={cx} cy={cy + r * 0.42} rx={r * 0.44} ry={r * 0.28} fill={snoutColor} />
      {/* Nose ring (subtle) */}
      <path
        d={`M${cx - r * 0.1} ${cy + r * 0.52} Q${cx} ${cy + r * 0.62} ${cx + r * 0.1} ${cy + r * 0.52}`}
        fill="none"
        stroke="#9CA3AF"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      {/* Nostrils */}
      <ellipse cx={cx - r * 0.16} cy={cy + r * 0.42} rx={r * 0.08} ry={r * 0.055} fill={nostrilColor} />
      <ellipse cx={cx + r * 0.16} cy={cy + r * 0.42} rx={r * 0.08} ry={r * 0.055} fill={nostrilColor} />

      {/* ── Eyes by mood ── */}
      {mood === "wink" ? (
        <>
          <circle cx={eyeL.x} cy={eyeL.y} r={r * 0.14} fill={WHITE} />
          <circle cx={eyeL.x + 1} cy={eyeL.y} r={r * 0.085} fill="#1F2937" />
          <circle cx={eyeL.x + 2} cy={eyeL.y - 1.5} r={r * 0.035} fill={WHITE} />
          {/* Wink */}
          <path
            d={`M${eyeR.x - r * 0.11} ${eyeR.y} Q${eyeR.x} ${eyeR.y + r * 0.09} ${eyeR.x + r * 0.11} ${eyeR.y}`}
            fill="none" stroke="#1F2937" strokeWidth={2.2} strokeLinecap="round"
          />
        </>
      ) : mood === "thinking" ? (
        <>
          {/* Eyes looking up-right */}
          <circle cx={eyeL.x} cy={eyeL.y} r={r * 0.14} fill={WHITE} />
          <circle cx={eyeL.x + 3} cy={eyeL.y - 2.5} r={r * 0.07} fill="#1F2937" />
          <circle cx={eyeR.x} cy={eyeR.y} r={r * 0.14} fill={WHITE} />
          <circle cx={eyeR.x + 3} cy={eyeR.y - 2.5} r={r * 0.07} fill="#1F2937" />
        </>
      ) : mood === "excited" ? (
        <>
          {/* Big sparkly eyes */}
          <circle cx={eyeL.x} cy={eyeL.y} r={r * 0.16} fill={WHITE} />
          <circle cx={eyeL.x + 1} cy={eyeL.y} r={r * 0.1} fill="#1F2937" />
          <circle cx={eyeL.x + 2.5} cy={eyeL.y - 2} r={r * 0.04} fill={WHITE} />
          <circle cx={eyeL.x - 0.5} cy={eyeL.y + 1.5} r={r * 0.025} fill={WHITE} />
          <circle cx={eyeR.x} cy={eyeR.y} r={r * 0.16} fill={WHITE} />
          <circle cx={eyeR.x + 1} cy={eyeR.y} r={r * 0.1} fill="#1F2937" />
          <circle cx={eyeR.x + 2.5} cy={eyeR.y - 2} r={r * 0.04} fill={WHITE} />
          <circle cx={eyeR.x - 0.5} cy={eyeR.y + 1.5} r={r * 0.025} fill={WHITE} />
        </>
      ) : mood === "cool" ? (
        <>
          {/* Star eyes */}
          <text x={eyeL.x} y={eyeL.y + 3} textAnchor="middle" fontSize={r * 0.35} fill="#FBBF24">★</text>
          <text x={eyeR.x} y={eyeR.y + 3} textAnchor="middle" fontSize={r * 0.35} fill="#FBBF24">★</text>
        </>
      ) : mood === "surprised" ? (
        <>
          {/* Wide open eyes */}
          <circle cx={eyeL.x} cy={eyeL.y} r={r * 0.17} fill={WHITE} />
          <circle cx={eyeL.x} cy={eyeL.y + 1} r={r * 0.09} fill="#1F2937" />
          <circle cx={eyeL.x + 1.5} cy={eyeL.y - 1} r={r * 0.03} fill={WHITE} />
          <circle cx={eyeR.x} cy={eyeR.y} r={r * 0.17} fill={WHITE} />
          <circle cx={eyeR.x} cy={eyeR.y + 1} r={r * 0.09} fill="#1F2937" />
          <circle cx={eyeR.x + 1.5} cy={eyeR.y - 1} r={r * 0.03} fill={WHITE} />
        </>
      ) : (
        <>
          {/* Default happy */}
          <circle cx={eyeL.x} cy={eyeL.y} r={r * 0.14} fill={WHITE} />
          <circle cx={eyeL.x + 1} cy={eyeL.y} r={r * 0.085} fill="#1F2937" />
          <circle cx={eyeL.x + 2} cy={eyeL.y - 1.5} r={r * 0.035} fill={WHITE} />
          <circle cx={eyeR.x} cy={eyeR.y} r={r * 0.14} fill={WHITE} />
          <circle cx={eyeR.x + 1} cy={eyeR.y} r={r * 0.085} fill="#1F2937" />
          <circle cx={eyeR.x + 2} cy={eyeR.y - 1.5} r={r * 0.035} fill={WHITE} />
        </>
      )}

      {/* Eyebrows — mood-dependent */}
      {mood === "surprised" ? (
        <>
          <line x1={eyeL.x - r * 0.1} y1={eyeL.y - r * 0.28} x2={eyeL.x + r * 0.1} y2={eyeL.y - r * 0.3}
            stroke={browColor} strokeWidth={2} strokeLinecap="round" />
          <line x1={eyeR.x - r * 0.1} y1={eyeR.y - r * 0.3} x2={eyeR.x + r * 0.1} y2={eyeR.y - r * 0.28}
            stroke={browColor} strokeWidth={2} strokeLinecap="round" />
        </>
      ) : mood === "cool" ? (
        <>
          <line x1={eyeL.x - r * 0.1} y1={eyeL.y - r * 0.2} x2={eyeL.x + r * 0.12} y2={eyeL.y - r * 0.18}
            stroke={browColor} strokeWidth={2} strokeLinecap="round" />
          <line x1={eyeR.x - r * 0.12} y1={eyeR.y - r * 0.18} x2={eyeR.x + r * 0.1} y2={eyeR.y - r * 0.2}
            stroke={browColor} strokeWidth={2} strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1={eyeL.x - r * 0.1} y1={eyeL.y - r * 0.22} x2={eyeL.x + r * 0.1} y2={eyeL.y - r * 0.24}
            stroke={browColor} strokeWidth={1.8} strokeLinecap="round" />
          <line x1={eyeR.x - r * 0.1} y1={eyeR.y - r * 0.24} x2={eyeR.x + r * 0.1} y2={eyeR.y - r * 0.22}
            stroke={browColor} strokeWidth={1.8} strokeLinecap="round" />
        </>
      )}

      {/* Mouth — mood-dependent */}
      {mood === "excited" ? (
        /* Big open smile */
        <path
          d={`M${cx - r * 0.18} ${cy + r * 0.24} Q${cx} ${cy + r * 0.45} ${cx + r * 0.18} ${cy + r * 0.24}`}
          fill="#EF4444" stroke={mouthColor} strokeWidth={1}
        />
      ) : mood === "surprised" ? (
        /* Small O shape */
        <ellipse cx={cx} cy={cy + r * 0.28} rx={r * 0.08} ry={r * 0.1} fill={mouthColor} />
      ) : mood === "happy" || mood === "wink" || mood === "cool" ? (
        /* Smile */
        <path
          d={`M${cx - r * 0.15} ${cy + r * 0.24} Q${cx} ${cy + r * 0.38} ${cx + r * 0.15} ${cy + r * 0.24}`}
          fill="none" stroke={mouthColor} strokeWidth={1.5} strokeLinecap="round"
        />
      ) : (
        /* Neutral */
        <line x1={cx - r * 0.08} y1={cy + r * 0.27} x2={cx + r * 0.08} y2={cy + r * 0.27}
          stroke={mouthColor} strokeWidth={1.5} strokeLinecap="round" />
      )}


    </svg>
  );
}

const SLIDE_MOODS: Record<string, Mood> = {
  title: "happy",
  "what-are-cn": "thinking",
  "weighting-rule": "cool",
  "what-is-wba": "wink",
  "wba-steps": "thinking",
  "wba-example": "surprised",
  "wba-practice": "excited",
  "key-takeaways": "happy",
};

interface MascotProps {
  slideType: string;
  slideIndex: number;
}

export function Mascot({ slideType }: MascotProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = MASCOT_TIPS[slideType] || [];
  const mood = SLIDE_MOODS[slideType] || "happy";
  const shouldShow = MASCOT_SLIDES.has(slideType);

  // Reset on slide change
  useEffect(() => {
    setVisible(false);
    setDismissed(false);
    setTipIndex(0);

    if (!shouldShow) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [slideType, shouldShow]);

  const cycleTip = useCallback(() => {
    if (tipIndex < tips.length - 1) {
      setTipIndex((i) => i + 1);
    } else {
      setDismissed(true);
    }
  }, [tipIndex, tips.length]);

  if (!shouldShow || dismissed || !visible || tips.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 20,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        animation: "mascotBounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        maxWidth: "min(320px, calc(100vw - 40px))",
      }}
    >
      {/* Speech bubble */}
      <div
        style={{
          background: WHITE,
          borderRadius: 18,
          padding: "10px 14px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
          border: `2px solid ${TEAL}22`,
          position: "relative",
          flex: 1,
          cursor: "pointer",
          transition: "transform 0.15s ease",
        }}
        onClick={cycleTip}
        onMouseDown={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(0.97)")
        }
        onMouseUp={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
        }
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
          }}
        >
          {tipIndex < tips.length - 1 ? "tap for more →" : "tap to close ✕"}
        </div>
        {/* Tail pointing right toward bull */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: -7,
            width: 0,
            height: 0,
            borderLeft: `7px solid ${WHITE}`,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            filter: "drop-shadow(1px 0 1px rgba(0,0,0,0.04))",
          }}
        />
      </div>

      {/* Animated bull face */}
      <div
        onClick={() => setDismissed(true)}
        style={{
          cursor: "pointer",
          flexShrink: 0,
          animation: "mascotBob 2.5s ease-in-out infinite",
          filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.15))",
          transition: "transform 0.2s ease",
        }}
        title="Click to dismiss"
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
        }
      >
        <BullFace mood={mood} size={56} />
      </div>
    </div>
  );
}
