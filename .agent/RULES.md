# Engineering Rules: Fruit Fly Connectome Studio

## 1. Code Standards
- Write strict TypeScript. Do not use `any` unless wrapping un-typed third-party payloads.
- Use functional React components with hooks.
- Disable Server-Side Rendering (`ssr: false`) for components using HTML5 `<canvas>` or `window` objects.
- Keep components modular. Isolate physics calculation logic from presentation markup.
- Prefer Tailwind CSS utility classes over custom inline CSS styles.

## 2. Writing and Documentation Style
- Use clear, simple language.
- Be spartan and informative.
- Use short, impactful sentences.
- Use active voice; avoid passive voice.
- Focus on practical, actionable insights.
- Use bullet point lists for dense information.
- Use data and examples to support claims.
- Use "you" and "your" to directly address the reader.
- AVOID using em dashes (—) anywhere. Use only commas, periods, or semicolons. Never use an em dash.
- AVOID constructions like "...not just this, but also this".
- AVOID metaphors and clichés.
- AVOID generalizations.
- AVOID common setup language (e.g., in conclusion, in closing, as an AI, obviously).
- AVOID unnecessary adjectives and adverbs.
- AVOID hashtags.

## 3. Performance Guidelines
- Maintain 60 FPS in all canvas animation loops.
- Use `requestAnimationFrame` for animation frames; never use `setInterval` for rendering.
- Always clean up animation frames, event listeners, and timers in `useEffect` return functions to avoid memory leaks.
- Keep assets organized. Do not bundle video files larger than 5MB directly inside `public/`.

## 4. Git and Deployment Hygiene
- STRICT CONSTRAINT: NEVER execute `git push` without explicit user permission. Only staging (`git add`) and local commits (`git commit`) are permitted autonomously.
- Commit all documentation, scripts, and research data to Git for local version control.
- Ensure `.vercelignore` excludes non-runtime assets (`reference_data/`, `manim/`, `graphify/`, `*.py`) to keep Vercel deployments fast and lean.
- Verify that `npm run build` succeeds locally before requesting push approval.
