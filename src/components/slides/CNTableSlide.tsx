import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

export function CNTableSlide() {
  const mobile = useIsMobile();

  const tableData = [
    {
      n: "CN₁",
      w: "W₁",
      justification:
        "\"We rated CN₁ a [W₁] because [reason related to stakeholder priority or project constraint].\"",
    },
    {
      n: "CN₂",
      w: "W₂",
      justification:
        "\"CN₂ received a [W₂] since [explain trade-off or stakeholder feedback].\"",
    },
    {
      n: "CN₃",
      w: "W₃",
      justification:
        "\"Our team assigned [W₃] to CN₃ based on [engineering judgment or feasibility].\"",
    },
    {
      n: "CN₄",
      w: "W₄",
      justification:
        "\"CN₄ scored a [W₄] because [impact on user experience or project goals].\"",
    },
    {
      n: "CN₅",
      w: "W₅",
      justification:
        "\"We chose [W₅] for CN₅ since [reason — e.g. less critical but still relevant].\"",
    },
  ];

  return (
    <div style={{ padding: mobile ? "28px 16px" : "48px 56px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 24 : 32,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Building a Customer Needs Table
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 12,
          }}
        />
        <p style={{ fontSize: 15, color: "#64748b", marginBottom: 20, lineHeight: 1.6 }}>
          This is the foundation you'll use before building your WBA. Minimum
          of 5 customer needs.
        </p>
      </FadeIn>

      <FadeIn delay={300}>
        <div
          style={{
            borderRadius: 16,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            border: "1px solid #e2e8f0",
            marginBottom: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: mobile ? 580 : undefined,
              borderCollapse: "collapse",
              fontSize: mobile ? 12 : 14,
            }}
          >
            <thead>
              <tr style={{ background: TEAL, color: WHITE }}>
                <th style={{ padding: "14px 16px", textAlign: "left", width: 40 }}>
                  #
                </th>
                <th style={{ padding: "14px 16px", textAlign: "left", width: 70 }}>
                  Need
                </th>
                <th style={{ padding: "14px 16px", textAlign: "center", width: 90 }}>
                  Weight (1–10)
                </th>
                <th style={{ padding: "14px 16px", textAlign: "left" }}>
                  Justification Template
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? WHITE : GRAY_BG,
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: 600,
                      color: TEAL,
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: 700,
                      color: DARK,
                      fontFamily: "'SF Mono', monospace",
                      fontSize: mobile ? 13 : 15,
                    }}
                  >
                    {row.n}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span
                      style={{
                        background: TEAL,
                        color: WHITE,
                        borderRadius: 10,
                        padding: "5px 14px",
                        fontWeight: 700,
                        fontSize: 13,
                        fontFamily: "'SF Mono', monospace",
                        display: "inline-block",
                      }}
                    >
                      {row.w}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: 12,
                      color: "#64748b",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                    }}
                  >
                    {row.justification}
                  </td>
                </tr>
              ))}
              <tr
                style={{
                  background: TEAL_LIGHT,
                  borderTop: `2px solid ${TEAL}`,
                }}
              >
                <td
                  colSpan={4}
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: TEAL,
                    fontSize: 13,
                  }}
                >
                  Each weight is an independent 1–10 rating of importance
                  to your team (10 = most important)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Justify your weightings callout */}
      <FadeIn delay={500}>
        <div
          style={{
            padding: "18px 22px",
            background: `linear-gradient(135deg, ${GOLD}12, ${GOLD}22)`,
            borderRadius: 16,
            border: `2px solid ${GOLD}44`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>⚠️</div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#92400e",
                  marginBottom: 6,
                }}
              >
                You Must Justify Your Weightings
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#78350f",
                  lineHeight: 1.6,
                }}
              >
                For each customer need, your team must <strong>explain why</strong> you
                assigned that specific weight. Use the templates in the table above as a
                starting point. A weight without a justification is incomplete — your engineering
                judgment must be backed by reasoning.
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={700}>
        <div style={{ display: "flex", gap: 14, flexDirection: mobile ? "column" : "row" }}>
          <div
            style={{
              flex: 1,
              background: "#eff6ff",
              borderRadius: 14,
              padding: 18,
              borderLeft: "3px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1e40af",
                marginBottom: 6,
              }}
            >
              Weightings ≠ Rankings
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#1e3a5f",
                lineHeight: 1.5,
              }}
            >
              <strong>Weightings</strong> (1–10) are <em>your</em> team's
              judgment of how <em>important</em> each need is.{" "}
              <strong>Rankings</strong> (1–10) are used in the WBA to rate
              how <em>well</em> a design <em>meets</em> each need.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#fef3c7",
              borderRadius: 14,
              padding: 18,
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#92400e",
                marginBottom: 6,
              }}
            >
              Your Team Decides
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#78350f",
                lineHeight: 1.5,
              }}
            >
              The stakeholder may not know what's technically possible. You
              decide what's most important based on project constraints.
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
