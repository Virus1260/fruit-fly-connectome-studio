# Technical Architecture: Fruit Fly Connectome Studio

## 1. System Overview
Fruit Fly Connectome Studio is built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. It compiles with Turbopack and deploys as a static or edge application. All computational biology calculations execute client-side inside HTML5 canvas loops without server round-trips.

```
+-------------------------------------------------------------+
|                     Next.js 16 Frontend                     |
|                                                             |
|  +----------------+  +------------------+  +-------------+  |
|  |   Navbar &     |  | ConnectomeAtlas  |  |  StonkFly   |  |
|  | Global Controls|  |   3D Canvas      |  | Trader Core |  |
|  +----------------+  +------------------+  +-------------+  |
|                                                             |
|  +----------------+  +------------------+  +-------------+  |
|  |  Embodied Fly  |  |  ELI5 Knowledge  |  | Reel Media  |  |
|  | Physics Engine |  | Oscilloscope+Math|  | Vault Player|  |
|  +----------------+  +------------------+  +-------------+  |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                     Client Physics & Math                   |
|  - LIF Numerical Solver: dV/dt = -(V - V_rest)/tau + I*R    |
|  - Matrix Graph Propagator: W_ij * S_j                      |
|  - Canvas 2D / WebGL 60Hz Render Loops                      |
+-------------------------------------------------------------+
```

## 2. Directory Structure
```
fruit-fly-connectome-studio/
├── .vercelignore           # Keeps heavy media and dev scripts off Vercel
├── .gitignore              # Standard git ignore rules
├── prd.md                  # Product Requirements Document
├── architecture.md         # System Architecture
├── rules.md                # Development and coding standards
├── design.md               # UI/UX design tokens and layout
├── tasks.md                # Task tracking and roadmap
├── memory.md               # Core domain facts and decision logs
├── manim/                  # Offline Python mathematical animation scripts
├── graphify/               # Knowledge graph pipeline and exports
├── public/                 # Static assets (icons, SVGs)
├── reference_data/         # Research papers, transcripts, source reels
└── src/
    ├── app/
    │   ├── globals.css     # Tailwind v4 theme and custom keyframes
    │   ├── layout.tsx      # Root metadata and font configuration
    │   └── page.tsx        # Top-level application shell and tabs
    ├── components/
    │   ├── ConnectomeExplorer.tsx  # 3D canvas neuropil visualizer
    │   ├── Eli5KnowledgeLab.tsx    # LIF oscilloscope and comparison matrix
    │   ├── EmbodiedFlySandbox.tsx  # Fly physics and locomotion arena
    │   ├── Navbar.tsx              # Navigation and simulation rate controls
    │   ├── ReelMediaVault.tsx      # Video player and transcript browser
    │   └── StonkFlySimulator.tsx   # Neural financial market trader
    └── data/
        ├── connectomeData.ts       # Brain regions and ELI5 ideas
        └── transcriptData.ts       # Full bilingual transcript corpus
```

## 3. Core Subsystems

### 3.1 Biophysical LIF Engine
- Equation: $\tau_m \frac{dV}{dt} = -(V - V_{rest}) + R_m \cdot I(t)$
- Solver: Explicit Euler integration with variable step $dt = 0.5\text{ms}$.
- Spiking state machine: When $V(t) \ge V_{th}$, emit spike pulse, clamp $V$ to $V_{reset}$ for $t_{ref} = 2.0\text{ms}$.

### 3.2 3D Canvas Rendering
- Custom orthographic projection engine transforming $(x, y, z)$ neuropil coordinates into screen space $(u, v)$.
- Interactive mouse and touch rotation around yaw and pitch axes.
- Synaptic pulse propagation rendered as glowing Bezier spline curves.

### 3.3 Dynamic Imports and Hydration Strategy
- All heavy canvas components (`ConnectomeExplorer`, `StonkFlySimulator`, `EmbodiedFlySandbox`, `Eli5KnowledgeLab`) load via `next/dynamic` with `ssr: false`.
- Prevents server-side canvas initialization failures and minimizes initial HTML payload.

## 4. Deployment Pipeline
- **GitHub**: Houses the complete source code, research briefs, offline Manim scripts, and Graphify analysis files.
- **Vercel**: Deploys the compiled Next.js bundle only. `.vercelignore` blocks heavy assets and Python tooling from entering the serverless build environment.
