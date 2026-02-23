import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

export function WBAExampleSlide() {
  const mobile = useIsMobile();
  const [highlight, setHighlight] = useState<number | null>(null);
  const needs = ["CN₁", "CN₂", "CN₃", "CN₄", "CN₅"];
  const weights = ["W₁", "W₂", "W₃", "W₄", "W₅"];
  const weightVals = [8, 6, 7, 9, 5];
  const designs = [
    { name: "Design A", scores: [7, 5, 8, 6, 9] },
    { name: "Design B", scores: [6, 8, 5, 7, 4] },
    { name: "Design C", scores: [9, 4, 6, 8, 7] },
    { name: "Design D", scores: [5, 9, 7, 4, 8] },
    { name: "Design E", scores: [8, 7, 9, 5, 6] },
  ];
  const calcTotal = (scores: number[]) =>
    scores.reduce((sum: number, s: number, i: number) => sum + s * weightVals[i], 0);
  const totals = designs.map((d) => calcTotal(d.scores));
  const maxTotal = Math.max(...totals);

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
            Below is a sample WBA with 5 designs and 5 customer needs.
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
                      transition: "background 0.2s",
                      fontFamily: "monospace",
                      fontSize: mobile ? 13 : 15,
                    }}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseLeave={() => setHighlight(null)}
                  >
                    {n}
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
                      transition: "background 0.2s",
                    }}
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
                          transition: "background 0.2s",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            color: DARK,
                          }}
                        >
                          {s}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#94a3b8",
                            marginLeft: 2,
                          }}
                        >
                          ×{weightVals[si]}
                        </span>
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
              Each cell shows <strong>score × weight</strong>. The total
              is the sum of all products for that design row.
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
