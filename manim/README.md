# Manim Mathematical Animation Suite for Connectome & Equations

This directory contains standalone Python scripts powered by **Manim** ([3b1b/manim](https://github.com/3b1b/manim) / Manim Community).

## Why Use Manim for Mathematical Equations?
Manim is Grant Sanderson's (3Blue1Brown) programmatic mathematical animation engine. It provides the highest-fidelity visual representations of mathematical concepts available:
- **Symbolic Term Morphing**: `TransformMatchingTex` tracks matching LaTeX symbols across equations, animating variables as they move, factor, or cancel across equality signs.
- **Biophysical Voltage Plots**: Synchronize animated 2D/3D axes with formula terms to visualize membrane depolarization in real time.
- **Connectome Synaptic Matrices**: Render sparse matrix-vector products ($W_{ij} \cdot S_j$) as pulsing nodes and weighted network flows.

## Best Web Extraction Workflow
Running Manim directly inside serverless cloud functions (like Vercel) is not practical due to heavy dependencies (Python, FFmpeg, Cairo, and full TeXLive). The best workflow is:
1. Render animations locally or in GitHub Actions.
2. Export as **transparent WebM** or **vector SVG frames**.
3. Embed the rendered assets directly into your Next.js application using standard `<video>` or `<svg>` tags.

## Prerequisites & Installation
Install Manim and required system binaries:

```powershell
# 1. Install FFmpeg (via winget or choco)
winget install Gyan.FFmpeg

# 2. Install a LaTeX distribution (TinyTeX or MiKTeX for Windows)
winget install ChristianSchenk.MiKTeX

# 3. Install Manim Community Edition
pip install manim
```

## Available Scripts

### 1. `lif_neuron_equation.py`
Animates the Leaky Integrate-and-Fire (LIF) differential equation from fundamental biophysics into action potential spiking.

**Render Commands:**
```powershell
# Render high-definition video (1080p, 60fps)
manim -pqh lif_neuron_equation.py LIFEquationScene

# Render transparent background WebM for web embedding
manim -pqh -t --format=webm lif_neuron_equation.py LIFEquationScene

# Export final frame as clean vector SVG
manim -s --format=svg lif_neuron_equation.py LIFEquationScene
```

### 2. `connectome_synapse_matrix.py`
Visualizes synaptic input vector aggregation through the fruit fly connectome weight matrix.

**Render Command:**
```powershell
manim -pqh -t --format=webm connectome_synapse_matrix.py ConnectomeMatrixScene
```

## Production Web Strategy
- Keep all `.py` files and rendered raw media in this `manim/` directory.
- This directory is ignored by `.vercelignore` to keep your Vercel deployments small and fast.
- All files remain tracked in Git so your team never loses work on GitHub.
