# Project Tasks: Fruit Fly Connectome Studio

## 1. Project Milestones

### Milestone 1: Project Scaffolding & Design System
- [x] Initialize Next.js 16 project with React 19, TypeScript, and Tailwind CSS v4.
- [x] Configure dark obsidian palette (`#050508`), bioluminescent color tokens, and Geist font family.
- [x] Create responsive top navigation bar with tab switching and global simulation rate controls.

### Milestone 2: 3D Neuropil Connectome Atlas
- [x] Build pseudo-3D orthographic projection canvas for 9 neuropil brain regions (`ConnectomeExplorer.tsx`).
- [x] Implement layer filtering (Sensory, Interneuron, Motor, All).
- [x] Add interactive spike injection triggering animated synaptic wave pulses.
- [x] Display anatomical metadata: neuron count, synapse count, and primary neurotransmitter per region.

### Milestone 3: StonkFly Bitcoin Trader
- [x] Build automated neural market trading simulator (`StonkFlySimulator.tsx`).
- [x] Map 5-minute BTC candlestick price deltas to ommatidia optical input vectors.
- [x] Route visual spikes through Antennal/Central Complex and PAM11 dopaminergic cluster.
- [x] Implement automated Buy/Sell/Hold execution and track simulated PnL with confetti rewards.

### Milestone 4: Embodied Fly Locomotion Sandbox
- [x] Build 2D physics arena with interactive boundary collisions (`EmbodiedFlySandbox.tsx`).
- [x] Implement six-legged tripod gait kinematics.
- [x] Model 200 Hz wing beat kinematics during flight mode.
- [x] Implement monosynaptic Giant Fiber escape reflex triggered by looming mouse shadows.

### Milestone 5: ELI5 Knowledge Lab & Numerical LIF Solver
- [x] Build interactive Leaky Integrate-and-Fire oscilloscope (`Eli5KnowledgeLab.tsx`).
- [x] Implement explicit Euler differential equation solver ($dt = 0.5\text{ms}$).
- [x] Add real-time parameter tuning sliders ($R_m$, $C_m$, $V_{th}$, $I_{ext}$).
- [x] Create comparative matrix: Biological Connectomes vs Dense Transformers.

### Milestone 6: Reel Media Vault & Research Corpus
- [x] Create media vault player with dual-language transcripts (`ReelMediaVault.tsx`).
- [x] Embed research briefs from Janelia, Princeton, Nature, and FlyWire.

### Milestone 7: Manim Mathematical Animation Engine
- [x] Set up standalone `manim/` directory with `lif_neuron_equation.py`.
- [x] Set up `connectome_synapse_matrix.py` for synaptic weight vector animation.
- [x] Create `manim/README.md` with transparent WebM and vector SVG render commands.

### Milestone 8: Graphify Codebase & Concept Graph
- [x] Set up standalone `graphify/` directory.
- [x] Extract AST code dependency graph into `graphify-out/graph.json`.
- [x] Generate interactive D3 tree visualizer `GRAPH_TREE.html`.

### Milestone 9: Vercel vs GitHub Pipeline Hardening
- [x] Configure `.vercelignore` to exclude heavy media, Manim, and Graphify tooling from Vercel.
- [x] Keep all research files and scripts tracked in Git for GitHub backup.
- [x] Resolve TypeScript errors and verify clean build with `npm run build`.

## 2. Upcoming Backlog
- [ ] Add WebGL volumetric point-cloud rendering for full 166,691-neuron morphology skeletons.
- [ ] Render high-resolution transparent WebM animations with Manim for in-card looping equations.
- [ ] Add interactive synaptic adjacency matrix heatmap for Central Complex neuropils.
