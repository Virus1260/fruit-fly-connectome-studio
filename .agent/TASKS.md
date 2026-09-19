# Project Tasks: Fruit Fly Connectome Studio

## 1. Completed Milestones
- [x] Initialized Next.js 16 project with React 19, TypeScript, and Tailwind CSS v4.
- [x] Built the interactive 3D Neuropil Connectome Explorer (`ConnectomeExplorer.tsx`).
- [x] Implemented StonkFly Bitcoin Trader with dopamine reward feedback (`StonkFlySimulator.tsx`).
- [x] Built Embodied Fly Sandbox with physics locomotion and Giant Fiber reflex (`EmbodiedFlySandbox.tsx`).
- [x] Implemented ELI5 Knowledge Lab with real-time LIF oscilloscope solver (`Eli5KnowledgeLab.tsx`).
- [x] Created Reel Media Vault with bilingual transcripts (`ReelMediaVault.tsx`).
- [x] Configured `.vercelignore` to separate heavy media, Manim, and Graphify tooling from production Vercel builds.
- [x] Fixed TypeScript type checks and ensured clean production build via `npm run build`.
- [x] Cloned `TuragaLab/flybody` and configured local MuJoCo biomechanical physics model (`fruitfly.xml`).
- [x] Implemented standalone Python local simulation runner (`scripts/run_flybody_simulation.py`) with 78 actuators running at 10 kHz.
- [x] Upgraded `EmbodiedFlySandbox.tsx` to 100% offline local actuation, removing all external dependencies on `flywire.ai`.

## 2. In Progress
- [ ] Establish offline Manim mathematical animation pipeline for rendering publication-quality LIF equations.
- [ ] Configure Graphify pipeline for codebase and research brief knowledge indexing.

## 3. Backlog & Enhancements
- [ ] Add WebGL / Three.js accelerated renderer for full 166,691-neuron volumetric point cloud.
- [ ] Export rendered Manim equation clips to transparent WebM for in-card micro-animations.
- [ ] Add interactive synaptic weight matrix heatmap viewer for the central complex neuropil.
- [ ] Add local WebSocket bridge between Python MuJoCo runner and Web UI for real-time live telemetry streaming.

