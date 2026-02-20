import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

/* ─── Animated math breakdown when hovering a column ─── */
function MathBreakdown({
  colIndex,
  weight,
  weightLabel,
  needLabel,
  designs,
}: {
  colIndex: number;
  weight: number;
  weightLabel: string;
  needLabel: string;
  designs: { name: string; scores: number[] }[];
}) {
  const [visibleRows, setVisibleRows] = useState(0);
  const products = designs.map((d) => d.scores[colIndex] * weight);
  const sumAll = products.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setVisibleRows(0);
    let row = 0;
    const id = setInterval(() => {
      row++;
      setVisibleRows(row);
      if (row > designs.length) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, [colIndex, designs.length]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fefce8 0%, #fff7ed 100%)",
        borderRadius: 14,
        padding: "16px 18px",
        border: `2px solid ${GOLD}`,
        boxShadow: "0 8px 32px rgba(197,150,12,0.15)",
        animation: "mathSlideDown 0.3s ease-out",
        minWidth: 260,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 20 }}>🔍</span>
        <span style={{ fontWeight: 800, color: DARK, fontSize: 15 }}>
          {needLabel} Breakdown
        </span>
        <span
          style={{
            marginLeft: "auto",
            padding: "2px 10px",
            borderRadius: 20,
            background: TEAL,
            color: WHITE,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {weightLabel} = {weight}
        </span>
      </div>

      {designs.map((d, di) => {
        const score = d.scores[colIndex];
        const product = score * weight;
        const visible = di < visibleRows;
        return (
          <div
            key={di}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 8,
              marginBottom: 4,
              background: visible ? "rgba(255,255,255,0.7)" : "transparent",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-12px)",
              transition: "all 0.3s ease-out",
              fontFamily: "monospace",
              fontSize: 13,
            }}
          >
            <span style={{ fontWeight: 700, color: TEAL, width: 28 }}>
              {d.name}
            </span>
            <span style={{ color: "#64748b" }}>:</span>
            <span
              style={{
                background: "#e0f2fe",
                padding: "2px 6px",
                borderRadius: 4,
                fontWeight: 600,
                color: "#0369a1",
              }}
            >
              {score}
            </span>
            <span style={{ color: "#94a3b8", fontSize: 11 }}>×</span>
            <span
              style={{
                background: "#e6f2ee",
                padding: "2px 6px",
                borderRadius: 4,
                fontWeight: 600,
                color: TEAL,
              }}
            >
              {weight}
            </span>
            <span style={{ color: "#94a3b8", fontSize: 11 }}>=</span>
            <span
              style={{
                fontWeight: 800,
                color: DARK,
                background: "#fef3c7",
                padding: "2px 8px",
                borderRadius: 4,
                minWidth: 28,
                textAlign: "center",
              }}
            >
              {product}
            </span>
          </div>
        );
      })}

      {/* Sum row */}
      <div
        style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: "2px dashed #d4d4d4",
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: visibleRows > designs.length ? 1 : 0.3,
          transition: "opacity 0.4s",
        }}
      >
        <span style={{ fontSize: 14 }}>📊</span>
        <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
          Column products:
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: 700,
            color: DARK,
          }}
        >
          {products.join(" + ")} = {sumAll}
        </span>
      </div>
    </div>
  );
}

export function WBAExampleSlide() {
  const mobile = useIsMobile();
  const [highlight, setHighlight] = useState<number | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const needs = ["CN₁", "CN₂", "CN₃", "CN₄", "CN₅"];
  const weights = ["W₁", "W₂", "W₃", "W₄", "W₅"];
  const weightVals = [8, 6, 7, 9, 5];
  const designs = [
    { name: "D₁", scores: [7, 5, 8, 6, 9] },
    { name: "D₂", scores: [6, 8, 5, 7, 4] },
    { name: "D₃", scores: [9, 4, 6, 8, 7] },
    { name: "D₄", scores: [5, 9, 7, 4, 8] },
    { name: "D₅", scores: [8, 7, 9, 5, 6] },
  ];
  const calcTotal = (scores: number[]) =>
    scores.reduce((sum: number, s: number, i: number) => sum + s * weightVals[i], 0);
  const totals = designs.map((d) => calcTotal(d.scores));
  const maxTotal = Math.max(...totals);

  const handleMouseEnter = (i: number) => {
    clearTimeout(hoverTimeout.current);
    setHighlight(i);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHighlight(null), 200);
  };

  return (
    <div style={{ padding: mobile ? "20px 12px" : "36px 56px" }}>
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
          WBA Example with Anonymous Data
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
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
            Below is a sample WBA with 5 designs and 5 customer needs.{" "}
            <strong>Hover a column</strong> to see the math animated step-by-step!
          </p>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              border: "2px dashed #C5960C88",
              background: "#fef3c7",
              fontSize: 12,
              fontWeight: 700,
              color: "#92400e",
              textTransform: "uppercase",
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            Example Only
          </span>
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div
          style={{
            borderRadius: 16,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            border: "2px dashed #e2e8f0",
            marginBottom: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: mobile ? 600 : undefined,
              borderCollapse: "collapse",
              fontSize: mobile ? 12 : 14,
            }}
          >
            <thead>
              <tr style={{ background: TEAL, color: WHITE }}>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                  }}
                >
                  Design \ Need
                </th>
                {needs.map((n, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "12px 10px",
                      textAlign: "center",
                      cursor: "pointer",
                      background:
                        highlight === i ? GOLD : "transparent",
                      transition: "all 0.25s ease",
                      fontFamily: "monospace",
                      fontSize: mobile ? 13 : 15,
                      transform: highlight === i ? "scale(1.08)" : "scale(1)",
                      borderRadius: highlight === i ? 6 : 0,
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {n}
                    {highlight === i && (
                      <div
                        style={{
                          fontSize: 8,
                          opacity: 0.85,
                          marginTop: 2,
                          letterSpacing: 1,
                        }}
                      >
                        ▼ MATH ▼
                      </div>
                    )}
                  </th>
                ))}
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "center",
                    fontWeight: 800,
                  }}
                >
                  Total
                </th>
              </tr>
              <tr style={{ background: "#e6f2ee" }}>
                <td
                  style={{
                    padding: "8px 14px",
                    fontWeight: 700,
                    color: TEAL,
                    fontSize: 13,
                  }}
                >
                  Weights
                </td>
                {weightVals.map((w, i) => (
                  <td
                    key={i}
                    style={{
                      padding: "8px 10px",
                      textAlign: "center",
                      fontWeight: 800,
                      color: TEAL,
                      background:
                        highlight === i
                          ? "#fef3c7"
                          : "transparent",
                      transition: "all 0.25s ease",
                      transform: highlight === i ? "scale(1.15)" : "scale(1)",
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#64748b", marginBottom: 2 }}>
                      {weights[i]}
                    </div>
                    {w}
                  </td>
                ))}
                <td
                  style={{
                    padding: "8px 14px",
                    textAlign: "center",
                    fontWeight: 800,
                    color: GOLD,
                  }}
                >
                  (1–10)
                </td>
              </tr>
            </thead>
            <tbody>
              {designs.map((d, di) => {
                const total = calcTotal(d.scores);
                const isWinner = total === maxTotal;
                return (
                  <tr
                    key={di}
                    style={{
                      background: isWinner
                        ? "#f0fdf4"
                        : di % 2 === 0
                        ? WHITE
                        : GRAY_BG,
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        fontWeight: 700,
                        color: DARK,
                        fontFamily: "monospace",
                        fontSize: mobile ? 13 : 15,
                      }}
                    >
                      {d.name} {isWinner && "🏆"}
                    </td>
                    {d.scores.map((s, si) => (
                      <td
                        key={si}
                        style={{
                          padding: "10px 10px",
                          textAlign: "center",
                          background:
                            highlight === si
                              ? "#fefce8"
                              : "transparent",
                          transition: "all 0.25s ease",
                          transform: highlight === si ? "scale(1.1)" : "scale(1)",
                        }}
                        onMouseEnter={() => handleMouseEnter(si)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            color: highlight === si ? "#92400e" : DARK,
                            transition: "color 0.2s",
                          }}
                        >
                          {s}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: highlight === si ? GOLD : "#94a3b8",
                            marginLeft: 2,
                            fontWeight: highlight === si ? 700 : 400,
                            transition: "all 0.2s",
                          }}
                        >
                          ×{weightVals[si]}
                        </span>
                        {highlight === si && (
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: TEAL,
                              animation: "popIn 0.25s ease-out",
                            }}
                          >
                            = {s * weightVals[si]}
                          </div>
                        )}
                      </td>
                    ))}
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: 17,
                        color: isWinner ? TEAL : DARK,
                      }}
                    >
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Animated math breakdown panel - appears on column hover */}
      {highlight !== null && (
        <div style={{ marginBottom: 16 }}>
          <MathBreakdown
            colIndex={highlight}
            weight={weightVals[highlight]}
            weightLabel={weights[highlight]}
            needLabel={needs[highlight]}
            designs={designs}
          />
        </div>
      )}

      {/* Candidate design callout */}
      <FadeIn delay={600}>
        <div
          style={{
            padding: "14px 20px",
            background: "#f0fdf4",
            borderRadius: 12,
            border: "2px solid #22c55e",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 24 }}>🏆</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#166534" }}>
              Highest Total = Candidate Design
            </div>
            <div style={{ fontSize: 13, color: "#14532d", lineHeight: 1.5, marginTop: 2 }}>
              The design with the <strong>highest WBA total score</strong> is
              your <strong>candidate design</strong> — the one your team should
              move forward with, unless there's a justified reason not to (which
              you must explain).
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={800}>
        <div style={{ display: "flex", gap: 14, flexDirection: mobile ? "column" : "row" }}>
          <div
            style={{
              flex: 1,
              background: "#eff6ff",
              borderRadius: 10,
              padding: 14,
              borderLeft: "3px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1e40af",
              }}
            >
              Reading the Table
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#14532d",
                lineHeight: 1.5,
                marginTop: 4,
              }}
            >
              <strong>Hover any column header</strong> to see each design's
              score × weight animated step-by-step! The total column is
              the sum of all products for that row.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#f5f3ff",
              borderRadius: 10,
              padding: 14,
              borderLeft: "3px solid #8b5cf6",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#5b21b6",
              }}
            >
              Example Calc ({designs[0].name})
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#4c1d95",
                lineHeight: 1.5,
                marginTop: 4,
                fontFamily: "monospace",
              }}
            >
              {designs[0].scores.map((s, i) => `(${weightVals[i]}×${s})`).join(" + ")} ={" "}
              {designs[0].scores.map((s, i) => s * weightVals[i]).join(" + ")} ={" "}
              <strong>{calcTotal(designs[0].scores)}</strong>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
