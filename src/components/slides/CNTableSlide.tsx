import { useIsMobile } from "../../hooks/useIsMobile";
import { FadeIn } from "../FadeIn";
import { TEAL, TEAL_LIGHT, GOLD, DARK, GRAY_BG, WHITE } from "../../constants/theme";

export function CNTableSlide() {
  const mobile = useIsMobile();
  return (
    <div style={{ padding: mobile ? "24px 16px" : "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: mobile ? 24 : 30,
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
        <p style={{ fontSize: 15, color: "#64748b", marginBottom: 24 }}>
          This is the foundation you'll use before building your WBA. Minimum
          of 5 customer needs.
        </p>
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
              minWidth: mobile ? 400 : undefined,
              borderCollapse: "collapse",
              fontSize: mobile ? 13 : 15,
            }}
          >
            <thead>
              <tr style={{ background: TEAL, color: WHITE }}>
                <th
                  style={{ padding: "14px 20px", textAlign: "left" }}
                >
                  #
                </th>
                <th
                  style={{ padding: "14px 20px", textAlign: "left" }}
                >
                  Customer Need
                </th>
                <th
                  style={{ padding: "14px 20px", textAlign: "center" }}
                >
                  Weight (1–10)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: "CN₁", w: "W₁" },
                { n: "CN₂", w: "W₂" },
                { n: "CN₃", w: "W₃" },
                { n: "CN₄", w: "W₄" },
                { n: "CN₅", w: "W₅" },
              ].map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? WHITE : GRAY_BG,
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 20px",
                      fontWeight: 600,
                      color: TEAL,
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      fontWeight: 600,
                      color: DARK,
                      fontFamily: "monospace",
                      fontSize: mobile ? 14 : 16,
                    }}
                  >
                    {row.n}
                  </td>
                  <td
                    style={{ padding: "12px 20px", textAlign: "center" }}
                  >
                    <span
                      style={{
                        background: TEAL,
                        color: WHITE,
                        borderRadius: 8,
                        padding: "4px 14px",
                        fontWeight: 700,
                        fontSize: 14,
                        fontFamily: "monospace",
                      }}
                    >
                      {row.w}
                    </span>
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
                  colSpan={3}
                  style={{
                    padding: "12px 20px",
                    fontWeight: 600,
                    color: TEAL,
                    fontSize: 14,
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
            padding: "16px 20px",
            background: `linear-gradient(135deg, ${GOLD}12, ${GOLD}22)`,
            borderRadius: 12,
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
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#92400e",
                  marginBottom: 6,
                }}
              >
                You Must Justify Your Weightings
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#78350f",
                  lineHeight: 1.6,
                }}
              >
                For each customer need, your team must <strong>explain why</strong> you
                assigned that specific weight. This rationale should be included in your
                report. A weight without a justification is incomplete — your engineering
                judgment must be backed by reasoning that considers your stakeholder's
                priorities and project constraints.
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
                marginBottom: 4,
              }}
            >
              Weightings ≠ Rankings
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#1e3a5f",
                lineHeight: 1.4,
              }}
            >
              <strong>Weightings</strong> (1–10) are <em>your</em> team's
              engineering judgment of how <em>important</em> each need is.{" "}
              <strong>Rankings</strong> (1–10) are used in the WBA to rate
              how <em>well</em> a design <em>meets</em> each need.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#fef3c7",
              borderRadius: 10,
              padding: 16,
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#92400e",
                marginBottom: 4,
              }}
            >
              Your Team Decides
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#78350f",
                lineHeight: 1.4,
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
