/**
 * Shared design tokens for the presentation.
 *
 * All colour values reference the USF brand palette so that every
 * slide and component stays visually consistent.
 */

/** USF brand green — primary accent for headers, buttons, and highlights. */
export const TEAL = "#006747";

/** Light tint of TEAL — used for callout backgrounds and soft accents. */
export const TEAL_LIGHT = "#e6f2ee";

/** USF brand gold — used for decorative underlines, badges, and warnings. */
export const GOLD = "#C5960C";

/** Near-black used for body text and dark gradients. */
export const DARK = "#1a2332";

/** Light gray background for alternating table rows. */
export const GRAY_BG = "#f4f6f8";

/** Pure white used for card backgrounds and text-on-dark. */
export const WHITE = "#ffffff";

/**
 * Ordered list of every slide rendered by the presentation.
 *
 * Each entry's `type` maps to a key in the `slideComponents` record
 * inside `App.tsx`, which determines which React component to render.
 */
export const slides = [
    { id: "title", type: "title" },
    { id: "what-are-cn", type: "what-are-cn" },
    { id: "cn-examples", type: "cn-examples" },
    { id: "weighting-rule", type: "weighting-rule" },
    { id: "cn-table", type: "cn-table" },
    { id: "what-is-wba", type: "what-is-wba" },
    { id: "wba-steps", type: "wba-steps" },
    { id: "wba-example", type: "wba-example" },
    { id: "wba-practice", type: "wba-practice" },
    { id: "key-takeaways", type: "key-takeaways" },
];

/**
 * Human-readable display names for each slide, shown in the bottom
 * navigation bar on desktop viewports. Indices correspond 1-to-1
 * with the {@link slides} array.
 */
export const slideNames = [
    "Title",
    "What Are Customer Needs?",
    "Examples",
    "Weighting Needs",
    "Customer Needs Table",
    "What Is a WBA?",
    "WBA Steps",
    "WBA Example",
    "Practice Quiz",
    "Key Takeaways",
];
