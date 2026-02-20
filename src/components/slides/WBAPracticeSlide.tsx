import { useState, useCallback, useMemo } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, WHITE } from "../../constants/theme";

// Generate a seeded random set of practice data
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

type QuizPhase =
  | "intro"
  | "product-quiz"
  | "sum-quiz"
  | "result"
  | "complete";

export function WBAPracticeSlide() {
  const mobile = useIsMobile();

  const [data, setData] = useState(() => generatePracticeData());
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [productAnswers, setProductAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const needLabels = useMemo(
    () => ["CN₁", "CN₂", "CN₃", "CN₄"],
    []
  );

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const startQuiz = useCallback(() => {
    setPhase("product-quiz");
    setCurrentProductIdx(0);
    setUserAnswer("");
    setProductAnswers([]);
    setShowHint(false);
    setAttempts(0);
    setTotalErrors(0);
  }, []);

  const checkProduct = useCallback(() => {
    const correctAnswer = data.products[currentProductIdx];
    const parsed = parseInt(userAnswer);
    if (parsed === correctAnswer) {
      const newAnswers = [...productAnswers, parsed];
      setProductAnswers(newAnswers);
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
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  }, [
    userAnswer,
    data.products,
    currentProductIdx,
    productAnswers,
    attempts,
    triggerShake,
    data.weights.length,
  ]);

  const checkSum = useCallback(() => {
    const parsed = parseInt(sumAnswer);
    if (parsed === data.total) {
      setPhase("complete");
    } else {
      setTotalErrors((e) => e + 1);
      setAttempts((a) => a + 1);
      triggerShake();
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  }, [sumAnswer, data.total, attempts, triggerShake]);

  const resetQuiz = useCallback(() => {
    setData(generatePracticeData());
    setPhase("intro");
    setCurrentProductIdx(0);
    setUserAnswer("");
    setSumAnswer("");
    setProductAnswers([]);
    setShowHint(false);
    setAttempts(0);
    setTotalErrors(0);
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

  // Shared input style
  const inputStyle = {
    width: mobile ? 80 : 100,
    height: 44,
    textAlign: "center" as const,
    border: `2px solid ${shake ? "#ef4444" : TEAL}`,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 700,
    color: DARK,
    outline: "none",
    transition: "border-color 0.3s, transform 0.1s",
    transform: shake ? "translateX(-4px)" : "none",
    animation: shake ? "shake 0.4s ease-in-out" : "none",
    fontFamily: "monospace",
  };

  const btnStyle = {
    padding: "10px 24px",
    borderRadius: 10,
    border: "none",
    background: TEAL,
    color: WHITE,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  // Progress dots
  const progressDots = data.weights.map((_, i) => {
    const isDone = i < productAnswers.length;
    const isCurrent = phase === "product-quiz" && i === currentProductIdx;
    return (
      <div
        key={i}
        style={{
          width: isCurrent ? 32 : 14,
          height: 14,
          borderRadius: 7,
          background: isDone ? "#22c55e" : isCurrent ? TEAL : "#e2e8f0",
          transition: "all 0.3s ease",
        }}
      />
    );
  });

  return (
    <div style={{ padding: mobile ? "20px 14px" : "32px 44px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 22 : 28,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Practice: WBA Calculation
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 6,
          }}
        />
        <p style={{ fontSize: 14, color: "#64748b", marginBottom: 16 }}>
          Test your understanding by calculating a WBA score step by step.
          <strong> No calculators</strong> — mental math or paper only!
        </p>
      </FadeIn>

      {/* Data Table — always visible */}
      <FadeIn delay={200}>
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid #e2e8f0`,
            marginBottom: 20,
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
                <th style={{ padding: "10px 16px", textAlign: "left" }}>
                  Need
                </th>
                {needLabels.map((label, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "10px 12px",
                      textAlign: "center",
                      fontFamily: "monospace",
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
                      fontSize: 16,
                      fontFamily: "monospace",
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
                      fontSize: 16,
                      fontFamily: "monospace",
                    }}
                  >
                    {s}
                  </td>
                ))}
              </tr>
              {/* Show computed products as they are answered */}
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
                      fontSize: 16,
                      fontFamily: "monospace",
                      color:
                        i < productAnswers.length ? "#22c55e" : "#cbd5e1",
                      transition: "color 0.3s",
                    }}
                  >
                    {i < productAnswers.length ? productAnswers[i] : "?"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Progress indicator */}
      {phase !== "intro" && phase !== "complete" && (
        <FadeIn delay={100}>
          <div
            style={{
              display: "flex",
              gap: 6,
              justifyContent: "center",
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            {progressDots}
            {phase === "sum-quiz" && (
              <div
                style={{
                  width: 32,
                  height: 14,
                  borderRadius: 7,
                  background: GOLD,
                  transition: "all 0.3s ease",
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        </FadeIn>
      )}

      {/* INTRO PHASE */}
      {phase === "intro" && (
        <FadeIn delay={400}>
          <div
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
              borderRadius: 16,
              padding: mobile ? 24 : 32,
              textAlign: "center",
              color: WHITE,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
            <div
              style={{
                fontSize: mobile ? 18 : 22,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Ready to Practice?
            </div>
            <div
              style={{
                fontSize: 15,
                opacity: 0.85,
                lineHeight: 1.6,
                maxWidth: 460,
                margin: "0 auto 20px",
              }}
            >
              You'll be given random weights and scores for a single design.
              Calculate each <strong>Wᵢ × Sᵢ</strong> product, then sum
              them all to find the <strong>WBA total</strong>.
            </div>
            <div
              style={{
                fontSize: 13,
                opacity: 0.65,
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              Numbers are randomly generated each time — no two rounds are
              the same!
            </div>
            <button
              onClick={startQuiz}
              style={{
                ...btnStyle,
                background: GOLD,
                color: DARK,
                fontSize: 17,
                padding: "12px 36px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Start Practice →
            </button>
          </div>
        </FadeIn>
      )}

      {/* PRODUCT QUIZ PHASE */}
      {phase === "product-quiz" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: WHITE,
              borderRadius: 14,
              padding: mobile ? 20 : 28,
              border: `2px solid ${TEAL}22`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              Step {currentProductIdx + 1} of {data.weights.length}
            </div>
            <div
              style={{
                fontSize: mobile ? 18 : 22,
                fontWeight: 700,
                color: DARK,
                marginBottom: 16,
              }}
            >
              What is{" "}
              <span
                style={{
                  color: TEAL,
                  fontFamily: "monospace",
                  padding: "2px 8px",
                  background: TEAL_LIGHT,
                  borderRadius: 6,
                }}
              >
                W{currentProductIdx + 1} × S{currentProductIdx + 1}
              </span>{" "}
              ?
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: mobile ? 20 : 28,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: DARK,
                }}
              >
                <span
                  style={{
                    background: TEAL_LIGHT,
                    color: TEAL,
                    padding: "4px 12px",
                    borderRadius: 8,
                  }}
                >
                  {data.weights[currentProductIdx]}
                </span>
                <span style={{ color: "#94a3b8" }}>×</span>
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#1e40af",
                    padding: "4px 12px",
                    borderRadius: 8,
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
              style={btnStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${TEAL}44`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Check Answer
            </button>

            {showHint && (
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 16px",
                  background: "#FFF8E7",
                  borderRadius: 8,
                  border: `1px solid ${GOLD}44`,
                  fontSize: 13,
                  color: "#7c6a1a",
                  lineHeight: 1.5,
                }}
              >
                💡 <strong>Hint:</strong> Multiply{" "}
                <strong>{data.weights[currentProductIdx]}</strong> ×{" "}
                <strong>{data.scores[currentProductIdx]}</strong>. Try breaking
                it down: {data.weights[currentProductIdx]} ×{" "}
                {Math.floor(data.scores[currentProductIdx] / 2)} ={" "}
                {data.weights[currentProductIdx] *
                  Math.floor(data.scores[currentProductIdx] / 2)}
                , then adjust from there!
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* SUM QUIZ PHASE */}
      {phase === "sum-quiz" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: WHITE,
              borderRadius: 14,
              padding: mobile ? 20 : 28,
              border: `2px solid ${GOLD}44`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: GOLD,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              Final Step
            </div>
            <div
              style={{
                fontSize: mobile ? 18 : 22,
                fontWeight: 700,
                color: DARK,
                marginBottom: 16,
              }}
            >
              Now sum all the products for the{" "}
              <span style={{ color: TEAL }}>WBA Total</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                fontSize: mobile ? 16 : 20,
                fontWeight: 700,
                fontFamily: "monospace",
                color: DARK,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              {productAnswers.map((p, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      padding: "4px 10px",
                      borderRadius: 6,
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
                style={{ ...inputStyle, width: mobile ? 90 : 110 }}
                placeholder="?"
              />
            </div>
            <button
              onClick={checkSum}
              style={{ ...btnStyle, background: GOLD, color: DARK }}
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
                  marginTop: 14,
                  padding: "10px 16px",
                  background: "#FFF8E7",
                  borderRadius: 8,
                  border: `1px solid ${GOLD}44`,
                  fontSize: 13,
                  color: "#7c6a1a",
                  lineHeight: 1.5,
                }}
              >
                💡 <strong>Hint:</strong> Add them step by step:{" "}
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

      {/* COMPLETE PHASE */}
      {phase === "complete" && (
        <FadeIn delay={100}>
          <div
            style={{
              background: `linear-gradient(135deg, #f0fdf4, #dcfce7)`,
              borderRadius: 16,
              padding: mobile ? 24 : 32,
              textAlign: "center",
              border: "2px solid #22c55e",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              {totalErrors === 0 ? "🌟" : totalErrors <= 2 ? "🎉" : "✅"}
            </div>
            <div
              style={{
                fontSize: mobile ? 20 : 26,
                fontWeight: 800,
                color: "#166534",
                marginBottom: 8,
              }}
            >
              {totalErrors === 0
                ? "Perfect Score!"
                : totalErrors <= 2
                ? "Great Job!"
                : "You Got It!"}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#14532d",
                lineHeight: 1.6,
                marginBottom: 8,
              }}
            >
              The WBA total is{" "}
              <strong
                style={{
                  fontSize: 22,
                  color: TEAL,
                  fontFamily: "monospace",
                }}
              >
                {data.total}
              </strong>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748b",
                marginBottom: 6,
                fontFamily: "monospace",
              }}
            >
              {data.weights.map((w, i) => `(${w}×${data.scores[i]})`).join(" + ")} ={" "}
              {data.products.join(" + ")} = {data.total}
            </div>
            {totalErrors > 0 && (
              <div
                style={{
                  fontSize: 13,
                  color: "#92400e",
                  marginBottom: 12,
                }}
              >
                You had {totalErrors} incorrect{" "}
                {totalErrors === 1 ? "attempt" : "attempts"} — keep
                practicing!
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={resetQuiz}
                style={{
                  ...btnStyle,
                  background: TEAL,
                  fontSize: 15,
                  padding: "10px 28px",
                }}
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
                marginTop: 20,
                padding: "12px 16px",
                background: WHITE,
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                fontSize: 13,
                color: DARK,
                lineHeight: 1.5,
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

      {/* CSS for shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
