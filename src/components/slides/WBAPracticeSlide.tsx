/**
 * **Slide 9 — Practice Quiz.**
 *
 * A multi-stage interactive quiz that walks students through building
 * a WBA from scratch:
 *
 * 1. **Stage 0** — Name student-generated concepts (free-text input).
 * 2. **Stage 1** — Assign 1–10 weights to five customer needs.
 * 3. **Stage 2** — Score each concept against every need, building the
 *    full WBA grid.
 * 4. **Stage 3** — Review the completed WBA, see the computed winner,
 *    and celebrate with confetti.
 *
 * All practice data (needs, reference weights, reference scores) is
 * randomly generated on mount via {@link generatePracticeData} to keep
 * the exercise fresh on every visit.
 */
import { useState, useCallback, useMemo } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { Confetti } from "../Confetti";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

/* ── helpers ───────────────────────────────────────────── */

/**
 * Generates a randomised practice dataset with five customer needs,
 * sample weights, and three candidate design rows with pre-filled
 * scores. Called once when the slide mounts.
 */
function generatePracticeData() {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const numNeeds = 4;
  const weights = Array.from({ length: numNeeds }, () => rand(3, 10));
  const scores = Array.from({ length: numNeeds }, () => rand(2, 10));
  const products = scores.map((s, i) => s * weights[i]);
  const total = products.reduce((a, b) => a + b, 0);
  return { weights, scores, products, total };
}

/* ── conceptual questions ──────────────────────────────── */

interface ConceptQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const CONCEPT_QUESTIONS: ConceptQuestion[] = [
  {
    question: "What does the weight (W) represent in a WBA?",
    options: [
      "How much the design costs",
      "How important a customer need is to your team",
      "The number of customer needs",
      "The final score of a design",
    ],
    correctIdx: 1,
    explanation:
      "The weight represents your team's engineering judgment of how important each customer need is, rated 1–10.",
  },
  {
    question:
      "If CN₁ has weight 8 and Design A scores 6 on CN₁, what operation do you perform?",
    options: [
      "8 + 6 = 14",
      "8 − 6 = 2",
      "8 × 6 = 48",
      "8 ÷ 6 ≈ 1.3",
    ],
    correctIdx: 2,
    explanation:
      "You multiply the weight by the score: W × S. So 8 × 6 = 48. This gives the weighted contribution for that need.",
  },
  {
    question:
      "After calculating W × S for every customer need, what do you do next?",
    options: [
      "Pick the largest W × S value",
      "Average all the W × S values",
      "Add (sum) all the W × S values",
      "Subtract the smallest from the largest",
    ],
    correctIdx: 2,
    explanation:
      "You sum all the products: Total = Σ(Wᵢ × Sᵢ). This gives the design's overall WBA score.",
  },
  {
    question: "Which design does the WBA say you should typically choose?",
    options: [
      "The one your team likes most",
      "The one with the lowest total",
      "The one with the highest total",
      "The one with the most 10-scores",
    ],
    correctIdx: 2,
    explanation:
      "The design with the highest WBA total is your candidate design — it best meets your weighted customer needs.",
  },
];

/* ── types ─────────────────────────────────────────────── */

type QuizPhase =
  | "intro"
  | "concept"
  | "product-quiz"
  | "sum-quiz"
  | "complete";

/* ── component ─────────────────────────────────────────── */

export function WBAPracticeSlide() {
  const mobile = useIsMobile();

  /* state */
  const [data, setData] = useState(() => generatePracticeData());
  const [phase, setPhase] = useState<QuizPhase>("intro");

  /* concept quiz state */
  const [conceptIdx, setConceptIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [conceptCorrect, setConceptCorrect] = useState<boolean | null>(null);
  const [conceptErrors, setConceptErrors] = useState(0);

  /* math quiz state */
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [productAnswers, setProductAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [confettiCount, setConfettiCount] = useState(0);

  const needLabels = useMemo(() => ["CN₁", "CN₂", "CN₃", "CN₄"], []);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  /* ── concept quiz handlers ── */

  const handleConceptAnswer = useCallback(
    (optionIdx: number) => {
      setSelectedOption(optionIdx);
      const correct = optionIdx === CONCEPT_QUESTIONS[conceptIdx].correctIdx;
      setConceptCorrect(correct);
      if (correct) {
        setConfettiCount((c) => c + 1);
      } else {
        setConceptErrors((e) => e + 1);
        setTotalErrors((e) => e + 1);
      }
    },
    [conceptIdx]
  );

  const handleConceptContinue = useCallback(() => {
    if (conceptCorrect) {
      if (conceptIdx < CONCEPT_QUESTIONS.length - 1) {
        setConceptIdx((i) => i + 1);
        setSelectedOption(null);
        setConceptCorrect(null);
      } else {
        /* done with concepts → start math */
        setPhase("product-quiz");
        setCurrentProductIdx(0);
        setUserAnswer("");
        setProductAnswers([]);
        setShowHint(false);
        setAttempts(0);
      }
    } else {
      /* wrong — reset so they try again */
      setSelectedOption(null);
      setConceptCorrect(null);
    }
  }, [conceptCorrect, conceptIdx]);

  /* ── math quiz handlers ── */

  const checkProduct = useCallback(() => {
    const correctAnswer = data.products[currentProductIdx];
    const parsed = parseInt(userAnswer);
    if (parsed === correctAnswer) {
      const newAnswers = [...productAnswers, parsed];
      setProductAnswers(newAnswers);
      setConfettiCount((c) => c + 1);
      setShowHint(false);
      setAttempts(0);
      if (currentProductIdx < data.weights.length - 1) {
        setCurrentProductIdx((i) => i + 1);
        setUserAnswer("");
      } else {
        setPhase("sum-quiz");
        setUserAnswer("");
        setSumAnswer("");
      }
    } else {
      setTotalErrors((e) => e + 1);
      setAttempts((a) => a + 1);
      triggerShake();
      if (attempts >= 1) setShowHint(true);
    }
  }, [userAnswer, data, currentProductIdx, productAnswers, attempts, triggerShake]);

  const checkSum = useCallback(() => {
    const parsed = parseInt(sumAnswer);
    if (parsed === data.total) {
      setConfettiCount((c) => c + 1);
      setPhase("complete");
    } else {
      setTotalErrors((e) => e + 1);
      setAttempts((a) => a + 1);
      triggerShake();
      if (attempts >= 1) setShowHint(true);
    }
  }, [sumAnswer, data.total, attempts, triggerShake]);

  const resetQuiz = useCallback(() => {
    setData(generatePracticeData());
    setPhase("intro");
    setConceptIdx(0);
    setSelectedOption(null);
    setConceptCorrect(null);
    setConceptErrors(0);
    setCurrentProductIdx(0);
    setUserAnswer("");
    setSumAnswer("");
    setProductAnswers([]);
    setShowHint(false);
    setAttempts(0);
    setTotalErrors(0);
    setConfettiCount(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (phase === "product-quiz") checkProduct();
        else if (phase === "sum-quiz") checkSum();
      }
    },
    [phase, checkProduct, checkSum]
  );

  /* ── shared styles ── */

  const inputStyle = {
    width: mobile ? 80 : 100,
    height: 48,
    textAlign: "center" as const,
    border: `2px solid ${shake ? "#ef4444" : TEAL}`,
    borderRadius: 14,
    fontSize: 22,
    fontWeight: 700,
    color: DARK,
    outline: "none",
    transition: "border-color 0.3s, transform 0.1s",
    animation: shake ? "shake 0.5s ease-in-out" : "none",
    fontFamily: "'SF Mono', monospace",
    background: WHITE,
  };

  const btnPrimary = {
    padding: "12px 28px",
    borderRadius: 14,
    border: "none",
    background: `linear-gradient(135deg, ${TEAL}, #00a86b)`,
    color: WHITE,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: `0 4px 12px ${TEAL}33`,
  };

  const btnGold = {
    ...btnPrimary,
    background: `linear-gradient(135deg, ${GOLD}, #d4a50e)`,
    color: DARK,
    boxShadow: `0 4px 12px ${GOLD}33`,
  };

  /* progress for the whole quiz */
  const totalSteps = CONCEPT_QUESTIONS.length + data.weights.length + 1; /* +1 for sum */
  let completedSteps = 0;
  if (phase === "concept") completedSteps = conceptIdx;
  else if (phase === "product-quiz")
    completedSteps = CONCEPT_QUESTIONS.length + productAnswers.length;
  else if (phase === "sum-quiz")
    completedSteps = CONCEPT_QUESTIONS.length + data.weights.length;
  else if (phase === "complete") completedSteps = totalSteps;
  const progressPct = (completedSteps / totalSteps) * 100;

  /* ── render ── */

  return (
    <div style={{ padding: mobile ? "24px 14px" : "40px 56px", position: "relative" }}>
      <Confetti trigger={confettiCount} duration={3000} />
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 22 : 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          🧠 Practice: WBA Calculation
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 8,
          }}
        />
        <p style={{ fontSize: 14, color: "#64748b", marginBottom: 16, lineHeight: 1.5 }}>
          Test your understanding step by step — first concepts, then math.
          <strong> You got this!</strong> 💪
        </p>
      </FadeIn>

      {/* Quiz progress bar — Duolingo-style */}
      {phase !== "intro" && (
        <FadeIn delay={100}>
          <div
            style={{
              height: 12,
              background: "#e8ecef",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${TEAL}, #00a86b)`,
                borderRadius: 8,
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
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* ═══════════ INTRO PHASE ═══════════ */}
      {phase === "intro" && (
        <FadeIn delay={400}>
          <div
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
              borderRadius: 20,
              padding: mobile ? 28 : 40,
              textAlign: "center",
              color: WHITE,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16, animation: "bounceIn 0.6s ease-out" }}>
              🎯
            </div>
            <div
              style={{
                fontSize: mobile ? 20 : 26,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              Ready to Practice?
            </div>
            <div
              style={{
                fontSize: 16,
                opacity: 0.9,
                lineHeight: 1.7,
                maxWidth: 500,
                margin: "0 auto 12px",
              }}
            >
              First, we'll check your understanding with a few quick concept
              questions. Then you'll crunch the numbers on a real WBA
              calculation!
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                marginTop: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {["📝 Concept Qs", "🧮 Calculate", "🏆 Results"].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 16px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setPhase("concept");
                setConceptIdx(0);
                setSelectedOption(null);
                setConceptCorrect(null);
              }}
              style={{
                ...btnGold,
                fontSize: 18,
                padding: "14px 40px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Let's Go! →
            </button>
          </div>
        </FadeIn>
      )}

      {/* ═══════════ CONCEPT QUIZ PHASE ═══════════ */}
      {phase === "concept" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              padding: mobile ? 24 : 36,
              border: `2px solid ${TEAL}18`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* Phase label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  padding: "4px 12px",
                  background: TEAL_LIGHT,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: TEAL,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Concept {conceptIdx + 1} of {CONCEPT_QUESTIONS.length}
              </span>
            </div>

            {/* Question */}
            <div
              style={{
                fontSize: mobile ? 18 : 22,
                fontWeight: 700,
                color: DARK,
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              {CONCEPT_QUESTIONS[conceptIdx].question}
            </div>

            {/* Options — Duolingo-style cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {CONCEPT_QUESTIONS[conceptIdx].options.map((opt, oi) => {
                const isSelected = selectedOption === oi;
                const isCorrectOption = oi === CONCEPT_QUESTIONS[conceptIdx].correctIdx;
                const showResult = conceptCorrect !== null;

                let bg = WHITE;
                let borderColor = "#e2e8f0";
                let textColor = DARK;

                if (showResult && isSelected && conceptCorrect) {
                  bg = "#f0fdf4";
                  borderColor = "#22c55e";
                  textColor = "#166534";
                } else if (showResult && isSelected && !conceptCorrect) {
                  bg = "#fef2f2";
                  borderColor = "#ef4444";
                  textColor = "#991b1b";
                } else if (showResult && isCorrectOption) {
                  bg = "#f0fdf4";
                  borderColor = "#22c55e";
                  textColor = "#166534";
                } else if (isSelected) {
                  bg = TEAL_LIGHT;
                  borderColor = TEAL;
                  textColor = TEAL;
                }

                return (
                  <button
                    key={oi}
                    onClick={() => !showResult && handleConceptAnswer(oi)}
                    disabled={showResult}
                    style={{
                      padding: "14px 20px",
                      borderRadius: 14,
                      border: `2px solid ${borderColor}`,
                      background: bg,
                      color: textColor,
                      fontWeight: 600,
                      fontSize: mobile ? 14 : 16,
                      cursor: showResult ? "default" : "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: showResult && isCorrectOption ? "#22c55e" : showResult && isSelected && !conceptCorrect ? "#ef4444" : isSelected ? TEAL : "#f1f5f9",
                        color: isSelected || showResult ? WHITE : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {showResult && isCorrectOption
                        ? "✓"
                        : showResult && isSelected && !conceptCorrect
                          ? "✗"
                          : String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {conceptCorrect !== null && (
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: conceptCorrect ? "#f0fdf4" : "#fef2f2",
                  border: `1px solid ${conceptCorrect ? "#22c55e44" : "#ef444444"}`,
                  marginBottom: 16,
                  animation: "bounceIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: conceptCorrect ? "#166534" : "#991b1b",
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 20 }}>
                    {conceptCorrect ? "🎉" : "😅"}
                  </span>
                  {conceptCorrect ? "Correct!" : "Not quite!"}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: conceptCorrect ? "#14532d" : "#7f1d1d",
                    lineHeight: 1.6,
                  }}
                >
                  {CONCEPT_QUESTIONS[conceptIdx].explanation}
                </div>
              </div>
            )}

            {/* Continue button */}
            {conceptCorrect !== null && (
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={handleConceptContinue}
                  style={conceptCorrect ? btnPrimary : { ...btnPrimary, background: "#ef4444" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  {conceptCorrect
                    ? conceptIdx < CONCEPT_QUESTIONS.length - 1
                      ? "Next Question →"
                      : "On to the Math! 🧮"
                    : "Try Again"}
                </button>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ═══════════ DATA TABLE (visible during math phases) ═══════════ */}
      {(phase === "product-quiz" || phase === "sum-quiz" || phase === "complete") && (
        <FadeIn delay={200}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              marginBottom: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: mobile ? 13 : 15,
              }}
            >
              <thead>
                <tr style={{ background: TEAL, color: WHITE }}>
                  <th style={{ padding: "12px 16px", textAlign: "left" }}>Need</th>
                  {needLabels.map((label, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "12px 12px",
                        textAlign: "center",
                        fontFamily: "'SF Mono', monospace",
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: TEAL_LIGHT }}>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontWeight: 700,
                      color: TEAL,
                      fontSize: 13,
                    }}
                  >
                    Weight (Wᵢ)
                  </td>
                  {data.weights.map((w, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        fontWeight: 800,
                        color: TEAL,
                        fontSize: 18,
                        fontFamily: "'SF Mono', monospace",
                      }}
                    >
                      {w}
                    </td>
                  ))}
                </tr>
                <tr style={{ background: WHITE }}>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontWeight: 700,
                      color: DARK,
                      fontSize: 13,
                    }}
                  >
                    Score (Sᵢ)
                  </td>
                  {data.scores.map((s, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        fontWeight: 600,
                        color: DARK,
                        fontSize: 18,
                        fontFamily: "'SF Mono', monospace",
                      }}
                    >
                      {s}
                    </td>
                  ))}
                </tr>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderTop: `2px solid ${TEAL}33`,
                  }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontWeight: 700,
                      color: GOLD,
                      fontSize: 13,
                    }}
                  >
                    Wᵢ × Sᵢ
                  </td>
                  {data.weights.map((_, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "10px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "'SF Mono', monospace",
                        color: i < productAnswers.length ? "#22c55e" : "#cbd5e1",
                        transition: "color 0.3s",
                      }}
                    >
                      {i < productAnswers.length ? (
                        <span style={{ animation: "popIn 0.3s ease-out" }}>{productAnswers[i]}</span>
                      ) : (
                        "?"
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>
      )}

      {/* ═══════════ PRODUCT QUIZ PHASE ═══════════ */}
      {phase === "product-quiz" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              padding: mobile ? 24 : 32,
              border: `2px solid ${TEAL}18`,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                padding: "4px 12px",
                background: TEAL_LIGHT,
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                color: TEAL,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              Step {currentProductIdx + 1} of {data.weights.length}
            </div>
            <div
              style={{
                fontSize: mobile ? 18 : 24,
                fontWeight: 700,
                color: DARK,
                marginBottom: 20,
              }}
            >
              What is{" "}
              <span
                style={{
                  color: TEAL,
                  fontFamily: "'SF Mono', monospace",
                  padding: "2px 10px",
                  background: TEAL_LIGHT,
                  borderRadius: 8,
                }}
              >
                W{currentProductIdx + 1} × S{currentProductIdx + 1}
              </span>
              ?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: mobile ? 22 : 32,
                  fontWeight: 800,
                  fontFamily: "'SF Mono', monospace",
                  color: DARK,
                }}
              >
                <span
                  style={{
                    background: TEAL_LIGHT,
                    color: TEAL,
                    padding: "6px 16px",
                    borderRadius: 12,
                  }}
                >
                  {data.weights[currentProductIdx]}
                </span>
                <span style={{ color: "#94a3b8" }}>×</span>
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#1e40af",
                    padding: "6px 16px",
                    borderRadius: 12,
                  }}
                >
                  {data.scores[currentProductIdx]}
                </span>
                <span style={{ color: "#94a3b8" }}>=</span>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  style={inputStyle}
                  placeholder="?"
                />
              </div>
            </div>
            <button
              onClick={checkProduct}
              style={btnPrimary}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Check Answer
            </button>

            {showHint && (
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 18px",
                  background: "#FFF8E7",
                  borderRadius: 12,
                  border: `1px solid ${GOLD}44`,
                  fontSize: 14,
                  color: "#7c6a1a",
                  lineHeight: 1.6,
                  animation: "bounceIn 0.3s ease-out",
                }}
              >
                💡 <strong>Hint:</strong> Multiply{" "}
                <strong>{data.weights[currentProductIdx]}</strong> ×{" "}
                <strong>{data.scores[currentProductIdx]}</strong>. Try: {data.weights[currentProductIdx]} ×{" "}
                {Math.floor(data.scores[currentProductIdx] / 2)} ={" "}
                {data.weights[currentProductIdx] * Math.floor(data.scores[currentProductIdx] / 2)}
                , then adjust!
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ═══════════ SUM QUIZ PHASE ═══════════ */}
      {phase === "sum-quiz" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              padding: mobile ? 24 : 32,
              border: `2px solid ${GOLD}33`,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                padding: "4px 12px",
                background: "#fef3c7",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                color: "#92400e",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              Final Step
            </div>
            <div
              style={{
                fontSize: mobile ? 18 : 24,
                fontWeight: 700,
                color: DARK,
                marginBottom: 20,
              }}
            >
              Sum all products for the{" "}
              <span style={{ color: TEAL }}>WBA Total</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                fontSize: mobile ? 18 : 22,
                fontWeight: 700,
                fontFamily: "'SF Mono', monospace",
                color: DARK,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              {productAnswers.map((p, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      padding: "6px 12px",
                      borderRadius: 8,
                    }}
                  >
                    {p}
                  </span>
                  {i < productAnswers.length - 1 && (
                    <span style={{ color: "#94a3b8" }}>+</span>
                  )}
                </span>
              ))}
              <span style={{ color: "#94a3b8", marginLeft: 4 }}>=</span>
              <input
                type="number"
                value={sumAnswer}
                onChange={(e) => setSumAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{ ...inputStyle, width: mobile ? 90 : 120 }}
                placeholder="?"
              />
            </div>
            <button
              onClick={checkSum}
              style={btnGold}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Check Total
            </button>

            {showHint && (
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 18px",
                  background: "#FFF8E7",
                  borderRadius: 12,
                  border: `1px solid ${GOLD}44`,
                  fontSize: 14,
                  color: "#7c6a1a",
                  lineHeight: 1.6,
                  animation: "bounceIn 0.3s ease-out",
                }}
              >
                💡 <strong>Hint:</strong> Add step by step:{" "}
                {productAnswers[0]} + {productAnswers[1]} ={" "}
                {productAnswers[0] + productAnswers[1]}, then +{" "}
                {productAnswers[2]} ={" "}
                {productAnswers[0] + productAnswers[1] + productAnswers[2]}
                , then + {productAnswers[3]} = ?
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ═══════════ COMPLETE PHASE ═══════════ */}
      {phase === "complete" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: `linear-gradient(135deg, #f0fdf4, #dcfce7)`,
              borderRadius: 20,
              padding: mobile ? 28 : 40,
              textAlign: "center",
              border: "2px solid #22c55e",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Celebration shimmer overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, transparent, #22c55e, #fbbf24, #22c55e, transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite linear",
              }}
            />

            <div style={{ fontSize: 56, marginBottom: 16, animation: "bounceIn 0.6s ease-out" }}>
              {totalErrors === 0 ? "🌟" : totalErrors <= 3 ? "🎉" : "✅"}
            </div>
            <div
              style={{
                fontSize: mobile ? 22 : 30,
                fontWeight: 800,
                color: "#166534",
                marginBottom: 8,
              }}
            >
              {totalErrors === 0
                ? "Perfect Score!"
                : totalErrors <= 3
                  ? "Great Job!"
                  : "You Got It!"}
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#14532d",
                lineHeight: 1.6,
                marginBottom: 8,
              }}
            >
              The WBA total is{" "}
              <strong
                style={{
                  fontSize: 26,
                  color: TEAL,
                  fontFamily: "'SF Mono', monospace",
                }}
              >
                {data.total}
              </strong>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#64748b",
                marginBottom: 8,
                fontFamily: "'SF Mono', monospace",
              }}
            >
              {data.weights.map((w, i) => `(${w}×${data.scores[i]})`).join(" + ")} ={" "}
              {data.products.join(" + ")} = {data.total}
            </div>

            {/* XP-style score badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                background: WHITE,
                borderRadius: 24,
                border: "1px solid #e2e8f0",
                marginBottom: 16,
                animation: "popIn 0.5s ease-out 0.3s both",
              }}
            >
              <span style={{ fontSize: 18 }}>⭐</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: DARK }}>
                {totalErrors === 0
                  ? "+100 XP"
                  : totalErrors <= 3
                    ? "+75 XP"
                    : "+50 XP"}
              </span>
              {conceptErrors === 0 && (
                <span
                  style={{
                    padding: "2px 8px",
                    background: "#fef3c7",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#92400e",
                  }}
                >
                  Concepts Aced
                </span>
              )}
            </div>

            {totalErrors > 0 && (
              <div
                style={{
                  fontSize: 14,
                  color: "#92400e",
                  marginBottom: 16,
                }}
              >
                {totalErrors} incorrect {totalErrors === 1 ? "attempt" : "attempts"} — keep practicing!
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={resetQuiz}
                style={{ ...btnPrimary, fontSize: 16, padding: "12px 32px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                🔄 Try New Numbers
              </button>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: "14px 20px",
                background: WHITE,
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                color: DARK,
                lineHeight: 1.6,
                textAlign: "left",
              }}
            >
              📝 <strong>Remember:</strong> In your actual WBA, you'll do
              this for <em>every design row</em>, then compare the totals.
              The design with the highest total is your{" "}
              <strong>candidate design</strong>.
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
