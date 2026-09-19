# Project Memory: Fruit Fly Connectome Studio

## 1. Ground Truth Biological Facts
- Species: Adult Drosophila melanogaster (fruit fly).
- Dataset: MaleCNS v1.0, published October 2024 by Janelia Research Campus (HHMI), Princeton University, Cambridge University, and FlyWire consortium.
- Total Neurons: 166,691 mapped neurons (central brain: ~139,255 neurons; ventral nerve cord and subesophageal zone: ~27,436 neurons).
- Total Synapses: 125,000,000+ reconstructed synaptic connections.
- Precision: 40nm electron microscope (EM) serial sections.
- Cell Types: 8,453 distinct cell types cataloged.
- Primary Neurotransmitters: Acetylcholine (excitatory), GABA (inhibitory), Glutamate (inhibitory/excitatory in insects), Dopamine (reward via PAM/PPL clusters), Octopamine (arousal/fight-or-flight).

## 2. Key Architecture Decisions
- Pure Client-Side Computation: Differential equations and physics solve client-side in requestAnimationFrame loops. No Python or C++ backend runs in production, ensuring zero hosting cost on Vercel.
- Dynamic Client Rendering: All canvas and physics components use Next.js `dynamic(() => import(...), { ssr: false })` to avoid server-side hydration mismatches.
- Separation of Concerns:
  - Git / GitHub: Stores all files, including heavy research briefs, offline Python Manim animation scripts, and Graphify analysis.
  - Vercel: Deploys only the web frontend bundle via `.vercelignore` exclusion rules.

## 3. Mathematical Models
- Leaky Integrate-and-Fire (LIF):
  $$\tau_m \frac{dV}{dt} = -(V(t) - V_{rest}) + R_m \left[ \sum_j W_{ij} S_j(t) + I_{ext}(t) \right]$$
  Parameters:
  - $V_{rest} = -70\text{mV}$
  - $V_{th} = -55\text{mV}$
  - $V_{reset} = -80\text{mV}$
  - $\tau_m = R_m \cdot C_m \approx 20\text{ms}$
  - Refractory period: $2.0\text{ms}$
- Giant Fiber Reflex: Monosynaptic visual escape circuit with latency under 5ms, bypassing slow central processing for immediate escape jumps.

## 4. Bug Resolution & Fix Log
- Issue 1: `Cannot find name 'Github'` in `src/app/page.tsx`.
  - Cause: Social brand icons were removed from `lucide-react` v1.x.
  - Fix: Switched to `GitFork` icon from `lucide-react`.
- Issue 2: TypeScript overload mismatch on `Eli5KnowledgeLabProps.onSelectTab`.
  - Cause: Component expected `(tab: string) => void`, while caller passed `(id: TabId) => void`.
  - Fix: Added type assertion wrapper `(tab) => selectTab(tab as TabId)` in `src/app/page.tsx`.
- Issue 3: Unicode em dashes in `src/app/page.tsx` violating spartan style guidelines.
  - Fix: Replaced all instances of `—` with standard commas and periods.
- Issue 4: Vercel deployment bloat from non-runtime files.
  - Fix: Added `.vercelignore` to exclude `reference_data/`, `manim/`, `graphify/`, and `*.py`.
