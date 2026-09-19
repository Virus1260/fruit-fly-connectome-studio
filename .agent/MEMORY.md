# Project Memory: Fruit Fly Connectome Studio

## 1. Ground Truth Biological Facts
- Species: Adult Drosophila melanogaster (fruit fly).
- Dataset: MaleCNS v1.0, published October 2024 by Janelia Research Campus (HHMI), Princeton University, Cambridge University, and FlyWire consortium.
- Total Neurons: 166,691 mapped neurons (including ventral nerve cord and subesophageal zone). Central brain has approximately 139,255 neurons.
- Total Synapses: 125,000,000+ reconstructed synaptic connections.
- Precision: 40nm electron microscope (EM) serial sections.
- Cell Types: 8,453 distinct cell types cataloged.
- Primary Neurotransmitters: Acetylcholine (excitatory), GABA (inhibitory), Glutamate (inhibitory/excitatory in insects), Dopamine (reward via PAM/PPL clusters), Octopamine (arousal/fight-or-flight).

## 2. Key Architecture Decisions
- Client-Side Computing: All differential equations run in client-side JavaScript or WebGL. No Python or C++ backend runs in production. This guarantees zero server hosting cost on Vercel.
- Separation of Concerns:
  - GitHub stores everything: Full code, documentation, offline Manim scripts, Graphify analysis, and research files.
  - Vercel deploys only web assets: The `.vercelignore` file excludes `reference_data/`, `manim/`, `graphify/`, and `*.py`.
- Dynamic Client Rendering: Any component using `<canvas>` or `window` must use `dynamic(() => import(...), { ssr: false })`.
- Icon Library Note: In `lucide-react` v1.x, social brand icons like `Github` do not exist. Use `GitFork`, `GitBranch`, or inline SVGs.

## 3. Mathematical Foundations
- Leaky Integrate-and-Fire (LIF):
  $$\tau_m \frac{dV}{dt} = -(V(t) - V_{rest}) + R_m \left[ \sum_j W_{ij} S_j(t) + I_{ext}(t) \right]$$
  Parameters:
  - $V_{rest} = -70\text{mV}$
  - $V_{th} = -55\text{mV}$
  - $V_{reset} = -80\text{mV}$
  - $\tau_m = R_m \cdot C_m \approx 20\text{ms}$
  - Refractory period: $2.0\text{ms}$
- Giant Fiber Reflex: Monosynaptic visual escape circuit with latency under 5ms, bypassing slow central processing for immediate escape jumps.

## 4. User Workflow Directives
- **Git Push Constraint (2026-09-20)**: NEVER execute `git push` without explicit user permission. The agent may only perform local staging (`git add`) and local commits (`git commit`). Any remote push to GitHub must be explicitly approved by the user.
