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
            marginBottom: 24,
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: mobile ? 520 : undefined,
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
                  Weight
                </th>
                <th
                  style={{ padding: "14px 20px", textAlign: "left" }}
                >
                  Why This Weight?
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  n: "Safety",
                  w: 9,
                  why: "Top priority — K-12 students are the end users",
                },
                {
                  n: "Cost",
                  w: 7,
                  why: "Must stay within the class budget",
                },
                {
                  n: "Durability",
                  w: 6,
                  why: "Robot needs to survive repeated demos",
                },
                {
                  n: "Ease of Use",
                  w: 8,
                  why: "Young students should operate it independently",
                },
                {
                  n: "Performance",
                  w: 5,
                  why: "Important, but less critical than safety",
                },
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
                      }}
                    >
                      {row.w}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      color: "#64748b",
                      fontSize: 14,
                    }}
                  >
                    {row.why}
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
      <FadeIn delay={600}>
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
