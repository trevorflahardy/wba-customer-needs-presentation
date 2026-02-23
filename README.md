# WBA & Customer Needs — Interactive Presentation

An interactive, Duolingo-inspired web presentation for **EGN 3000L — Engineering Design** at the University of South Florida. It teaches students how to identify and weight customer needs, then apply **Weighted Benefit Analysis (WBA)** to evaluate competing design concepts.

> **Live site:** [trevorflahardy.github.io/wba-customer-needs-presentation](https://trevorflahardy.github.io/wba-customer-needs-presentation/)

## What's Inside

The presentation walks through ten sequential slides:

| # | Slide | Description |
|---|-------|-------------|
| 1 | **Title** | Course branding, overview of the three-step flow |
| 2 | **What Are Customer Needs?** | Definition + Specific / Weighted / Measurable cards |
| 3 | **Customer Needs Examples** | Real robot-project needs with flip-card interactions |
| 4 | **Weighting Needs** | The 1–10 importance scale rule with a visual bar chart |
| 5 | **Customer Needs Table** | Interactive table — hover any column to see the math breakdown |
| 6 | **What Is a WBA?** | Conceptual overview of Weighted Benefit Analysis |
| 7 | **WBA Steps** | Numbered walkthrough (list needs → weight → score → multiply → sum) |
| 8 | **WBA Example** | Worked example with three design concepts and highlighted winner |
| 9 | **Practice Quiz** | Multi-step interactive quiz with score tracking, confetti, and shake feedback |
| 10 | **Key Takeaways** | Summary cards + celebratory confetti on completion |

## Features

- **Keyboard, swipe, and click navigation** — Arrow keys, spacebar, swipe gestures, and on-screen buttons
- **Mobile-first responsive design** — Adapts layout, font sizes, and controls for small screens via a `useIsMobile` hook
- **Rocky the Bull mascot** — An animated SVG USF bull that displays contextual tips per slide with multiple moods
- **Practice quiz** — A multi-stage interactive quiz (concept naming → weighting → WBA grid scoring) with input validation, shake/pulse animations, and confetti celebrations
- **Duolingo-style UI** — Progress bar, bouncy transitions, and gamified feedback throughout
- **Accessible** — Focus-visible outlines, semantic HTML, and keyboard-navigable controls
- **Deployed automatically** — Pushes to `master` trigger a GitHub Actions workflow that builds with Bun and deploys to GitHub Pages

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | [React 19](https://react.dev/) with TypeScript |
| Build | [Vite 7](https://vite.dev/) |
| Runtime / Package Manager | [Bun](https://bun.sh/) |
| Compiler | [React Compiler](https://react.dev/learn/react-compiler) via `babel-plugin-react-compiler` |
| Linting | [ESLint 9](https://eslint.org/) with `typescript-eslint`, `react-hooks`, and `react-refresh` plugins |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + jsdom |
| Deployment | GitHub Actions → GitHub Pages |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/trevorflahardy/wba-customer-needs-presentation.git
cd wba-customer-needs-presentation

# Install dependencies
bun install

# Start the dev server (http://localhost:5173)
bun run dev
```

### Other Commands

```bash
# Production build (outputs to dist/)
bun run build

# Preview the production build locally
bun run preview

# Run linting
bun run lint

# Run tests
bun test
```

## Deployment

Every push to `master` triggers the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow, which:

1. Checks out the repo
2. Installs Bun
3. Runs `bun install` and `bun run build`
4. Uploads the `dist/` folder as a GitHub Pages artifact and deploys it

No manual steps are required — merge to `master` and the site updates automatically.

## Contributing

Contributions from instructors, TAs, and students are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Bug reports and feature requests can be filed via [GitHub Issues](https://github.com/trevorflahardy/wba-customer-needs-presentation/issues).

## License

This project is provided as an educational resource for USF's EGN 3000L course. See the repository for any additional license information.
