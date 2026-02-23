# Contributing to WBA & Customer Needs Presentation

Thanks for your interest in improving this presentation! Whether you're a fellow TA, instructor, or student in EGN 3000L, contributions are welcome.

## Ways to Contribute

- **Fix a bug** — typo on a slide, broken animation, styling issue
- **Improve content** — better wording, clearer examples, additional practice questions
- **Add a feature** — new slide type, accessibility improvements, better mobile UX
- **Update data** — semester-specific project info, updated customer needs examples

## Getting Started

1. **Fork** the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/wba-customer-needs-presentation.git
   cd wba-customer-needs-presentation
   ```

2. **Install dependencies** (requires [Bun](https://bun.sh/)):

   ```bash
   bun install
   ```

3. **Start the dev server:**

   ```bash
   bun run dev
   ```

4. **Create a branch** for your change:

   ```bash
   git checkout -b fix/typo-on-wba-slide
   ```

## Development Workflow

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start the Vite dev server with HMR |
| `bun run build` | Type-check and build for production |
| `bun run lint` | Run ESLint across the project |
| `bun test` | Run the Vitest test suite |

Before opening a PR, make sure the following all pass:

```bash
bun run lint
bun run build
bun test
```

## Pull Request Guidelines

1. **Keep PRs focused** — one bug fix or feature per PR.
2. **Describe what and why** — fill out the PR template so reviewers have context.
3. **Don't break the build** — `bun run build` should succeed without errors.
4. **Test visually** — open the dev server and click through all 10 slides to verify nothing looks off.
5. **Match the existing style** — this project uses inline styles with a shared theme from `src/constants/theme.ts`. Follow the same pattern.

## Adding or Editing Slides

Each slide is a self-contained React component in `src/components/slides/`. To add a new slide:

1. Create a new component file in `src/components/slides/`.
2. Register the slide in `src/constants/theme.ts` by adding an entry to the `slides` and `slideNames` arrays.
3. Import and add the component to the `slideComponents` map in `src/App.tsx`.

## Reporting Bugs

Use the [Bug Report](https://github.com/trevorflahardy/wba-customer-needs-presentation/issues/new?template=bug_report.md) issue template. Include:

- What you expected vs. what happened
- Browser and device info
- Screenshots if it's a visual issue

## Suggesting Features

Use the [Feature Request](https://github.com/trevorflahardy/wba-customer-needs-presentation/issues/new?template=feature_request.md) issue template. Describe the idea and why it would help students or instructors.

## Code of Conduct

Be respectful and constructive. This is an educational project — we're all here to learn.
