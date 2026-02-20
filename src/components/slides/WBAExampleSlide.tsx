import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

export function WBAExampleSlide() {
  const mobile = useIsMobile();
  const [highlight, setHighlight] = useState<number | null>(null);
  const needs = [
    "Safety",
    "Cost",
    "Durability",
    "Ease of Use",
    "Performance",
  ];
  const weights = [9, 7, 6, 8, 5];
  const designs = [
    { name: "Design A", scores: [8, 6, 7, 5, 9] },
    { name: "Design B", scores: [6, 9, 5, 8, 4] },
    { name: "Design C", scores: [9, 4, 8, 6, 7] },
  ];
  const calcTotal = (scores: number[]) =>
    scores.reduce((sum: number, s: number, i: number) => sum + s * weights[i], 0);
  const totals = designs.map((d) => calcTotal(d.scores));
  const maxTotal = Math.max(...totals);

  return (
    <div style={{ padding: mobile ? "24px 12px" : "36px 44px" }}>
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
          WBA Example: Robot Project
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 20,
          }}
        />
      </FadeIn>
      <FadeIn delay={300}>
        <div
          style={{
            borderRadius: 12,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            border: "1px solid #e2e8f0",
            marginBottom: 20,
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: mobile ? 560 : undefined,
              borderCollapse: "collapse",
              fontSize: mobile ? 12 : 14,
            }}
          >
            <thead>
              <tr style={{ background: TEAL, color: WHITE }}>
                <th
                  style={{
                    padding: "12px 16px",
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
                    }}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseLeave={() => setHighlight(null)}
                  >
                    {n}
                  </th>
                ))}
                <th
                  style={{
                    padding: "12px 16px",
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
                    padding: "8px 16px",
                    fontWeight: 700,
                    color: TEAL,
                    fontSize: 13,
                  }}
                >
                  Weights
                </td>
                {weights.map((w, i) => (
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
                    {w}
                  </td>
                ))}
                <td
                  style={{
                    padding: "8px 16px",
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
                        padding: "12px 16px",
                        fontWeight: 700,
                        color: DARK,
                      }}
                    >
                      {d.name} {isWinner && "🏆"}
                    </td>
                    {d.scores.map((s, si) => (
                      <td
                        key={si}
                        style={{
                          padding: "12px 10px",
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
                          ×{weights[si]}
                        </span>
                      </td>
                    ))}
                    <td
                      style={{
                        padding: "12px 16px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: 18,
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
      <FadeIn delay={600}>
        <div style={{ display: "flex", gap: 14, flexDirection: mobile ? "column" : "row" }}>
          <div
            style={{
              flex: 1,
              background: "#f0fdf4",
              borderRadius: 10,
              padding: 16,
              borderLeft: "3px solid #22c55e",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#166534",
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
              Hover over a column to highlight it. Each cell shows{" "}
              <strong>rating × weight</strong>. The total is the sum of
              all products.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#eff6ff",
              borderRadius: 10,
              padding: 16,
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
              Example Calc (Design A)
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#1e3a5f",
                lineHeight: 1.5,
                marginTop: 4,
                fontFamily: "monospace",
              }}
            >
              (9×8)+(7×6)+(6×7)+(8×5)+(5×9) = 72+42+42+40+45 ={" "}
              <strong>241</strong>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
