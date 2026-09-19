# UI/UX Design System: Fruit Fly Connectome Studio

## 1. Visual Direction
The interface uses a dark cyber-biophysical aesthetic. Deep obsidian backgrounds contrast with high-visibility luminescent accents representing bio-electric neural signaling.

## 2. Color Palette
- Canvas Background: `#050508` (Deep void black)
- Card Background: `rgba(24, 24, 27, 0.6)` (`bg-zinc-900/60` with `backdrop-blur-md`)
- Card Borders: `rgba(63, 63, 70, 0.5)` (`border-zinc-800`)
- Primary Bio-Accent (Sensory/Active): `#34d399` (`text-emerald-400`, `bg-emerald-500`)
- Secondary Signal (Synapses/Computation): `#22d3ee` (`text-cyan-400`, `bg-cyan-500`)
- Reward/Dopamine Signal: `#fbbf24` (`text-amber-400`, `bg-amber-500`)
- Motor/Locomotion Signal: `#fb923c` (`text-orange-400`, `bg-orange-500`)
- Higher Processing/Cognition: `#c084fc` (`text-purple-400`, `bg-purple-500`)

## 3. Typography
- Body Font: Inter or system sans-serif. Clean, legibly spaced at small sizes.
- Monospace Font: JetBrains Mono, Menlo, or Courier New for all equations, telemetry readings, and numerical coordinates.
- Heading Scale: Bold and black font weights (`font-black`, `font-bold`) to create strong visual hierarchy.

## 4. UI Components

### 4.1 Navigation
- Top navigation bar fixed with `backdrop-blur-xl`.
- Quick-switch tabs with distinct colored iconography and active state indicator pill.
- Global simulation speed slider and dopamine telemetry indicator visible across views.

### 4.2 Interactive Canvases
- Pseudo-3D neuropil sphere with smooth drag-to-rotate interaction.
- Real-time oscilloscope with crisp waveform rendering and variable time base.
- Arena physics view with responsive boundary collision and interactive mouse stimulus.

### 4.3 Interactive Sliders and Controls
- Custom range inputs with colored accent tracks.
- Instant parameter readout in monospace typography next to each slider.
- Direct feedback buttons that pulse when clicked to simulate action potentials.

## 5. Responsive Breakpoints
- Mobile (`< 640px`): Single-column stacked layouts, touch-friendly slider targets (minimum 44px height).
- Tablet (`640px - 1024px`): Two-column grid layouts for control panels and telemetry readouts.
- Desktop (`> 1024px`): Split-pane layouts with persistent 3D canvas and side parameter docks.
