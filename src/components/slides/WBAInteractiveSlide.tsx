import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

export function WBAInteractiveSlide() {
  const mobile = useIsMobile();
  const [weights, setWeights] = useState([9, 7, 6, 8, 5]);
  const [scores, setScores] = useState([
    [8, 6, 7, 5, 9],
    [6, 9, 5, 8, 4],
  ]);
  const needs = [
    "Safety",
    "Cost",
    "Durability",
    "Ease of Use",
    "Performance",
  ];
  const allWeightsValid = weights.every((w) => w >= 1 && w <= 10);
  const calcTotal = (row: number[]) =>
    row.reduce((sum: number, s: number, i: number) => sum + s * weights[i], 0);
  const totals = scores.map(calcTotal);
  const maxT = Math.max(...totals);

  const updateWeight = (i: number, val: string) => {
    const v = Math.max(0, Math.min(10, parseInt(val) || 0));
    setWeights((prev) => {
      const n = [...prev];
      n[i] = v;
      return n;
    });
  };
  const updateScore = (di: number, si: number, val: string) => {
    const v = Math.max(0, Math.min(10, parseInt(val) || 0));
    setScores((prev) => {
      const n = prev.map((r) => [...r]);
      n[di][si] = v;
      return n;
    });
  };

  return (
    <div style={{ padding: mobile ? "20px 12px" : "32px 40px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 22 : 26,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 6,
            marginTop: 0,
          }}
        >
          Try It Yourself!
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
        <p
          style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 16,
          }}
        >
          Edit the weights and scores below to see how totals change in
          real time.
        </p>
      </FadeIn>
      <div
        style={{
          borderRadius: 12,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          border: `2px solid ${allWeightsValid ? TEAL : "#ef4444"}`,
          marginBottom: 14,
          transition: "border-color 0.3s",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: mobile ? 520 : undefined,
            borderCollapse: "collapse",
            fontSize: mobile ? 12 : 14,
          }}
        >
          <thead>
            <tr style={{ background: TEAL, color: WHITE }}>
              <th
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  width: 100,
                }}
              ></th>
              {needs.map((n, i) => (
                <th
                  key={i}
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                  {n}
                </th>
              ))}
              <th
                style={{
                  padding: "10px 14px",
                  textAlign: "center",
                }}
              >
                Total
              </th>
            </tr>
            <tr style={{ background: TEAL_LIGHT }}>
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
              {weights.map((w, i) => (
                <td
                  key={i}
                  style={{
                    padding: "6px 4px",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={w}
                    onChange={(e) =>
                      updateWeight(i, e.target.value)
                    }
                    style={{
                      width: 44,
                      height: 32,
                      textAlign: "center",
                      border: `2px solid ${
                        weights[i] >= 1 && weights[i] <= 10 ? TEAL : "#ef4444"
                      }`,
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 700,
                      color: TEAL,
                      outline: "none",
                      transition: "border-color 0.3s",
                    }}
                  />
                </td>
              ))}
              <td
                style={{
                  padding: "8px 14px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: TEAL,
                  }}
                >
                  1–10 each
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {scores.map((row, di) => {
              const total = calcTotal(row);
              const isWinner = allWeightsValid && total === maxT;
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
                      fontSize: 14,
                    }}
                  >
                    Design {String.fromCharCode(65 + di)}{" "}
                    {isWinner && "🏆"}
                  </td>
                  {row.map((s, si) => (
                    <td
                      key={si}
                      style={{
                        padding: "6px 4px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={s}
                        onChange={(e) =>
                          updateScore(di, si, e.target.value)
                        }
                        style={{
                          width: 44,
                          height: 32,
                          textAlign: "center",
                          border: "2px solid #cbd5e1",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 600,
                          color: DARK,
                          outline: "none",
                        }}
                      />
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "10px 14px",
                      textAlign: "center",
                      fontWeight: 800,
                      fontSize: 20,
                      color: isWinner ? TEAL : DARK,
                    }}
                  >
                    {allWeightsValid ? total : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!allWeightsValid && (
        <div
          style={{
            padding: "10px 16px",
            background: "#fef2f2",
            borderRadius: 8,
            border: "1px solid #fca5a5",
            fontSize: 13,
            color: "#b91c1c",
            marginBottom: 12,
          }}
        >
          ⚠️ Each weight must be between 1 and 10!
        </div>
      )}
      {allWeightsValid && (
        <div style={{ display: "flex", gap: 12, flexDirection: mobile ? "column" : "row" }}>
          {scores.map((row, di) => {
            const total = calcTotal(row);
            const isWinner = total === maxT;
            return (
              <div
                key={di}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 10,
                  background: isWinner ? "#f0fdf4" : GRAY_BG,
                  border: `2px solid ${
                    isWinner ? "#22c55e" : "#e2e8f0"
                  }`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isWinner ? "#166534" : DARK,
                  }}
                >
                  Design {String.fromCharCode(65 + di)}{" "}
                  {isWinner && "— Winner!"}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 12,
                    background: "#e2e8f0",
                    borderRadius: 6,
                    marginTop: 8,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, (total / maxT) * 100)}%`,
                      height: "100%",
                      background: isWinner
                        ? "#22c55e"
                        : "#94a3b8",
                      borderRadius: 6,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 4,
                  }}
                >
                  Score: {total}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
