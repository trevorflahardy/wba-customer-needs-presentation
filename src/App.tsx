import { useState, useEffect, type ReactNode } from "react";

const TEAL = "#006747";
const TEAL_LIGHT = "#e6f2ee";
const GOLD = "#C5960C";
const DARK = "#1a2332";
const GRAY_BG = "#f4f6f8";
const WHITE = "#ffffff";

const slides = [
  { id: "title", type: "title" },
  { id: "what-are-cn", type: "what-are-cn" },
  { id: "cn-examples", type: "cn-examples" },
  { id: "weighting-rule", type: "weighting-rule" },
  { id: "cn-table", type: "cn-table" },
  { id: "what-is-wba", type: "what-is-wba" },
  { id: "wba-steps", type: "wba-steps" },
  { id: "wba-example", type: "wba-example" },
  { id: "wba-interactive", type: "wba-interactive" },
  { id: "key-takeaways", type: "key-takeaways" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}

function StaggerList({ items, startDelay = 200 }: { items: ReactNode[]; startDelay?: number }) {
  return items.map((item: ReactNode, i: number) => (
    <FadeIn key={i} delay={startDelay + i * 150}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            minWidth: 28,
            height: 28,
            borderRadius: "50%",
            background: TEAL,
            color: WHITE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            marginTop: 2,
          }}
        >
          {i + 1}
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.55, color: DARK }}>{item}</div>
      </div>
    </FadeIn>
  ));
}

function TitleSlide() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${DARK} 0%, ${TEAL} 100%)`,
        borderRadius: 16,
        padding: 48,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.08)",
        }}
      />
      <FadeIn delay={100}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 3,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          EGN3000L — Engineering Design
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Customer Needs &<br />
          Weighted Benefit Analysis
        </div>
      </FadeIn>
      <FadeIn delay={500}>
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          How to figure out what matters most — and use it to pick your best
          design.
        </div>
      </FadeIn>
      <FadeIn delay={700}>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Step 1: Identify Needs",
            "Step 2: Weigh Them",
            "Step 3: Build the WBA",
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

function WhatAreCNSlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          What Are Customer Needs?
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />
      </FadeIn>
      <FadeIn delay={200}>
        <div
          style={{
            background: TEAL_LIGHT,
            borderRadius: 12,
            padding: 24,
            marginBottom: 28,
            borderLeft: `4px solid ${TEAL}`,
          }}
        >
          <div
            style={{ fontSize: 18, fontWeight: 600, color: TEAL, lineHeight: 1.5 }}
          >
            Customer needs are what your client or stakeholder is asking for.
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#4a5568",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            In your robot project, those stakeholders are{" "}
            <strong>K-12 students</strong> and <strong>Dr. Hu</strong>. Their
            wants and expectations drive your design decisions.
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div
          style={{
            fontSize: 17,
            color: DARK,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          Think of it this way: before you build anything, you need to understand{" "}
          <em>what problem you're solving</em> and{" "}
          <em>who you're solving it for</em>. Customer needs capture that.
        </div>
      </FadeIn>
      <FadeIn delay={600}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            {
              icon: "🎯",
              title: "Specific",
              desc: "Each need should be clear and identifiable",
            },
            {
              icon: "⚖️",
              title: "Weighted",
              desc: "Not all needs are equally important",
            },
            {
              icon: "📊",
              title: "Measurable",
              desc: "You should be able to evaluate how well a design meets each need",
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: WHITE,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: TEAL,
                  marginBottom: 4,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

function CNExamplesSlide() {
  const examples = [
    {
      need: "Safety",
      icon: "🛡️",
      desc: "Robot should not harm the user or environment",
    },
    { need: "Cost", icon: "💰", desc: "Stays within the project budget" },
    {
      need: "Durability",
      icon: "🔩",
      desc: "Can withstand repeated use without breaking",
    },
    {
      need: "Ease of Use",
      icon: "🤲",
      desc: "Simple enough for K-12 students to operate",
    },
    {
      need: "Aesthetics",
      icon: "🎨",
      desc: "Looks appealing and well-crafted",
    },
    {
      need: "Performance",
      icon: "⚡",
      desc: "Completes the task effectively and quickly",
    },
  ];
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Examples of Customer Needs
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
          Common needs you might identify for your robot project. Your team
          picks the ones that matter most.
        </p>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
        }}
      >
        {examples.map((ex, i) => (
          <FadeIn key={i} delay={200 + i * 100}>
            <div
              style={{
                background: WHITE,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{ex.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEAL }}>
                {ex.need}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {ex.desc}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={900}>
        <div
          style={{
            marginTop: 20,
            padding: "12px 20px",
            background: "#FFF8E7",
            borderRadius: 10,
            border: `1px solid ${GOLD}33`,
            fontSize: 14,
            color: "#7c6a1a",
          }}
        >
          💡 <strong>Tip:</strong> You can define your own customer needs or
          select from highlighted stakeholder needs. The stakeholder may not
          always know what's technically possible — that's where your
          engineering judgment comes in.
        </div>
      </FadeIn>
    </div>
  );
}

function WeightingRuleSlide() {
  const [animStep, setAnimStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimStep(1), 400),
      setTimeout(() => setAnimStep(2), 800),
      setTimeout(() => setAnimStep(3), 1200),
      setTimeout(() => setAnimStep(4), 1600),
      setTimeout(() => setAnimStep(5), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const weights = [
    { need: "Safety", w: 9, color: "#ef4444" },
    { need: "Cost", w: 7, color: "#f59e0b" },
    { need: "Durability", w: 6, color: "#3b82f6" },
    { need: "Ease of Use", w: 8, color: "#8b5cf6" },
    { need: "Performance", w: 5, color: "#10b981" },
  ];

  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          The Weighting Rule
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />
      </FadeIn>
      <FadeIn delay={200}>
        <div
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${DARK})`,
            borderRadius: 14,
            padding: 28,
            color: WHITE,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Key Rule: Rate Each Need 1–10 for Importance
          </div>
          <div style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6 }}>
            Each customer need gets a weight from <strong>1 to 10</strong>{" "}
            based on how important it is to your team.{" "}
            <strong>10 = extremely important</strong>,{" "}
            <strong>1 = low but still important</strong>. Weights are
            independent — they do <strong>not</strong> need to add up to any
            particular number.
          </div>
        </div>
      </FadeIn>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <FadeIn delay={400}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: DARK,
                marginBottom: 16,
              }}
            >
              Example: Robot Project Weightings
            </div>
          </FadeIn>
          {weights.map((w, i) => (
            <FadeIn key={i} delay={500 + i * 120}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 110,
                    fontSize: 14,
                    fontWeight: 600,
                    color: DARK,
                  }}
                >
                  {w.need}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 28,
                    background: "#f1f5f9",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width:
                        animStep >= i + 1 ? `${(w.w / 10) * 100}%` : "0%",
                      height: "100%",
                      background: w.color,
                      borderRadius: 14,
                      transition:
                        "width 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {animStep >= i + 1 && (
                      <span
                        style={{
                          color: WHITE,
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {w.w}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={1200}>
            <div
              style={{
                marginTop: 12,
                padding: "10px 16px",
                background: TEAL_LIGHT,
                borderRadius: 10,
                fontSize: 13,
                color: TEAL,
                lineHeight: 1.5,
              }}
            >
              Each weight is an <strong>independent</strong> 1–10 rating.
              Higher weight = more important to your team's design
              decisions.
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={600}>
          <div
            style={{
              width: 240,
              background: "#fef3c7",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #fbbf2433",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 8 }}>🤔</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#92400e",
                marginBottom: 6,
              }}
            >
              Why 1–10?
            </div>
            <div
              style={{ fontSize: 13, color: "#78350f", lineHeight: 1.5 }}
            >
              The 1–10 scale lets your team express how important each need
              is independently. A 10 means "absolutely critical" and a 1
              means "nice to have but not a dealbreaker." This reflects your
              engineering judgment.
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function CNTableSlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
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
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            marginBottom: 24,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 15,
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
        <div style={{ display: "flex", gap: 14 }}>
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

function WhatIsWBASlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          What Is a Weighted Benefit Analysis?
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />
      </FadeIn>
      <FadeIn delay={200}>
        <div
          style={{
            background: `linear-gradient(135deg, ${DARK}, #1e3a5a)`,
            borderRadius: 14,
            padding: 28,
            color: WHITE,
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            A WBA (also called a Pugh Chart) is a decision matrix that
            compares your candidate designs against your customer needs.
          </div>
          <div
            style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.6 }}
          >
            It takes the customer needs you've already weighted and asks:{" "}
            <em>"How well does each design meet each need?"</em>
          </div>
        </div>
      </FadeIn>
      <div
        style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
      >
        {[
          {
            icon: "📋",
            title: "Customer Needs Table",
            desc: "What matters & how much (each weight rated 1–10)",
            delay: 400,
          },
          {
            icon: "⚖️",
            title: "WBA Matrix",
            desc: "Rank each design (1–10) on how well it fits each need, multiply by weight",
            delay: 600,
          },
          {
            icon: "🏆",
            title: "Best Design",
            desc: "Highest total score wins (usually!)",
            delay: 800,
          },
        ].map((item, i) => (
          <FadeIn key={i} delay={item.delay}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: TEAL_LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: 32,
                }}
              >
                {item.icon}
              </div>
              <div
                style={{ fontSize: 15, fontWeight: 700, color: TEAL }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  marginTop: 4,
                }}
              >
                {item.desc}
              </div>
              {i < 2 && (
                <div
                  style={{
                    fontSize: 24,
                    color: GOLD,
                    marginTop: 8,
                  }}
                >
                  →
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 24,
            padding: "14px 20px",
            background: "#fef3c7",
            borderRadius: 10,
            border: `1px solid ${GOLD}33`,
            fontSize: 14,
            color: "#7c6a1a",
            lineHeight: 1.5,
          }}
        >
          ⚠️ <strong>Important:</strong> The WBA is a decision-making{" "}
          <em>tool</em>, not a dictator. The highest-scoring design{" "}
          <em>should</em> be your choice, but if your team disagrees, you
          can choose differently — just be ready to explain why.
        </div>
      </FadeIn>
    </div>
  );
}

function WBAStepsSlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          How to Build a WBA — Step by Step
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />
      </FadeIn>
      <StaggerList
        startDelay={200}
        items={[
          <span>
            <strong style={{ color: TEAL }}>
              Pick at least 5 customer needs
            </strong>{" "}
            from your customer needs table. These become the columns of
            your WBA.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Use your weights</strong> —
            the 1–10 importance ratings you already assigned. These go in
            the first row under the headers.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>
              List your candidate designs
            </strong>{" "}
            as rows. You need at least 2 designs to compare.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Rank each design</strong> on
            how well it meets each customer need on a scale of{" "}
            <strong>1–10</strong> (1 = poor fit, 10 = excellent fit).
            These are your <strong>rankings</strong>.
          </span>,
          <span>
            <strong style={{ color: TEAL }}>Multiply & sum:</strong> For
            each design, multiply each rating by its weight, then add them
            all up. That's your total score.
          </span>,
        ]}
      />
      <FadeIn delay={1000}>
        <div
          style={{
            marginTop: 20,
            background: TEAL_LIGHT,
            borderRadius: 12,
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 32 }}>🧮</div>
          <div>
            <div
              style={{ fontSize: 15, fontWeight: 700, color: TEAL }}
            >
              The Math
            </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: "monospace",
                color: DARK,
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              Total = (W₁ × R₁) + (W₂ × R₂) + (W₃ × R₃) + ...
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748b",
                marginTop: 4,
              }}
            >
              W = weight (1–10 importance) | R = ranking (1–10 how well
              the design fits)
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function WBAExampleSlide() {
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
    <div style={{ padding: "36px 44px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 28,
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
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            marginBottom: 20,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
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
        <div style={{ display: "flex", gap: 14 }}>
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

function WBAInteractiveSlide() {
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
    <div style={{ padding: "32px 40px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 26,
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
          overflow: "hidden",
          border: `2px solid ${allWeightsValid ? TEAL : "#ef4444"}`,
          marginBottom: 14,
          transition: "border-color 0.3s",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
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
        <div style={{ display: "flex", gap: 12 }}>
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

function KeyTakeawaysSlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <FadeIn>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: TEAL,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Key Takeaways
        </h2>
        <div
          style={{
            width: 60,
            height: 4,
            background: GOLD,
            borderRadius: 2,
            marginBottom: 28,
          }}
        />
      </FadeIn>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {[
          {
            emoji: "📋",
            text: "Customer needs come from your stakeholders. Identify at least 5 for your project.",
          },
          {
            emoji: "⚖️",
            text: "Weights (1–10) reflect YOUR team's engineering judgment on how important each need is — they don't need to add up to anything.",
          },
          {
            emoji: "📊",
            text: "The WBA ranks each design (1–10) on how well it fits each weighted need.",
          },
          {
            emoji: "🧮",
            text: "Multiply each ranking by its weight, sum the row — highest score is typically your pick.",
          },
          {
            emoji: "🤝",
            text: "The WBA is a tool, not a boss. If your team disagrees with the result, explain why.",
          },
        ].map((item, i) => (
          <FadeIn key={i} delay={200 + i * 150}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 20px",
                background: WHITE,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: 24, lineHeight: 1 }}>
                {item.emoji}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: DARK,
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={1200}>
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: 14,
            color: "#94a3b8",
          }}
        >
          You'll include a WBA in your Robot Design Review Presentation —
          start building yours now!
        </div>
      </FadeIn>
    </div>
  );
}

const slideComponents = {
  title: TitleSlide,
  "what-are-cn": WhatAreCNSlide,
  "cn-examples": CNExamplesSlide,
  "weighting-rule": WeightingRuleSlide,
  "cn-table": CNTableSlide,
  "what-is-wba": WhatIsWBASlide,
  "wba-steps": WBAStepsSlide,
  "wba-example": WBAExampleSlide,
  "wba-interactive": WBAInteractiveSlide,
  "key-takeaways": KeyTakeawaysSlide,
};

type SlideType = keyof typeof slideComponents;

const slideNames = [
  "Title",
  "What Are Customer Needs?",
  "Examples",
  "Weighting Needs",
  "Customer Needs Table",
  "What Is a WBA?",
  "WBA Steps",
  "WBA Example",
  "Try It Yourself",
  "Key Takeaways",
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrentSlide(idx);
      setAnimKey((k) => k + 1);
    }
  };

  const SlideComponent =
    slideComponents[slides[currentSlide].type as SlideType];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(currentSlide + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentSlide - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentSlide]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          background: WHITE,
          borderBottom: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: TEAL,
            letterSpacing: 1,
          }}
        >
          EGN3000L
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={slideNames[i]}
              style={{
                width: i === currentSlide ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background:
                  i === currentSlide
                    ? TEAL
                    : i < currentSlide
                    ? GOLD
                    : "#cbd5e1",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Slide area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          key={animKey}
          style={{
            width: "100%",
            maxWidth: 960,
            minHeight: 540,
            background: WHITE,
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <SlideComponent />
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: WHITE,
          borderTop: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => goTo(currentSlide - 1)}
          disabled={currentSlide === 0}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: `1px solid ${TEAL}`,
            background: "transparent",
            color: TEAL,
            fontWeight: 600,
            fontSize: 14,
            cursor:
              currentSlide === 0 ? "not-allowed" : "pointer",
            opacity: currentSlide === 0 ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          ← Previous
        </button>
        <div
          style={{ fontSize: 14, fontWeight: 600, color: DARK }}
        >
          {slideNames[currentSlide]}
        </div>
        <button
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: "none",
            background:
              currentSlide === slides.length - 1
                ? "#cbd5e1"
                : TEAL,
            color: WHITE,
            fontWeight: 600,
            fontSize: 14,
            cursor:
              currentSlide === slides.length - 1
                ? "not-allowed"
                : "pointer",
            transition: "background 0.2s",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}