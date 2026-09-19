# Engineering Rules: Fruit Fly Connectome Studio

## 1. Code Standards & Constraints
- Write strict TypeScript. Do not use `any` or `@ts-ignore`.
- Use functional React components with hooks.
- Disable Server-Side Rendering (`ssr: false`) for components using HTML5 `<canvas>`, `window`, or WebGL contexts.
- Enforce clean module boundaries: Keep differential equation solvers and physics calculation loops isolated from React DOM presentation markup.
- Forbidden libraries: Do not install arbitrary UI kits (MUI, Chakra, AntD). Stick strictly to Tailwind CSS v4, Lucide React, and Canvas Confetti.
- Error Handling: Wrap async routines in `try/catch` blocks with typed errors. Implement error boundaries around canvas viewports to prevent uncaught webgl/context exceptions from crashing the entire app shell.

## 2. Canvas & Performance Rules
- Maintain 60 FPS in all canvas animation loops.
- Use `requestAnimationFrame` for all animation cycles; never use `setInterval` or `setTimeout` for rendering.
- Always clean up animation frame IDs, event listeners, and timers in `useEffect` cleanup return functions to prevent memory leaks.
- Keep assets organized. Do not bundle video files larger than 5MB directly inside `public/`.

## 3. Spartan Writing & Style Rules
- Use clear, simple language.
- Be spartan and informative.
- Use short, impactful sentences.
- Use active voice; avoid passive voice.
- Focus on practical, actionable insights.
- Use bullet point lists for dense technical information.
- Use data and examples to support claims.
- Use "you" and "your" to directly address the reader.
- AVOID using em dashes (—) anywhere. Use only commas, periods, or semicolons. Never use an em dash.
- AVOID constructions like "...not just this, but also this".
- AVOID metaphors and clichés.
- AVOID generalizations.
- AVOID common setup language (e.g., in conclusion, in closing, as an AI, obviously).
- AVOID unnecessary adjectives and adverbs.
- AVOID hashtags.

## 4. Git & Vercel Deployment Hygiene
- Commit all documentation, Manim scripts, Graphify data, and research briefs to Git so nothing is lost on GitHub.
- Keep `.vercelignore` strictly configured to exclude `reference_data/`, `manim/`, `graphify/`, `*.py`, and agent markdown docs from Vercel deployments.
- Always verify that `npm run build` succeeds locally before pushing changes.
