# Product Requirements Document: Fruit Fly Connectome Studio

## 1. Problem Statement
The Howard Hughes Medical Institute (HHMI) Janelia Research Campus and Princeton University published the complete adult Drosophila melanogaster brain connectome. This dataset contains 166,691 neurons and 125 million synaptic connections across 40-nanometer electron microscope slices. Raw connectome files exist as massive terabyte-scale graph arrays and complex SWC skeletons. Most engineers, students, and computational neuroscientists lack an intuitive interface to interact with this data or simulate spiking dynamics in real time.

## 2. Product Objectives
- Provide a browser-native 3D neuropil atlas for the fruit fly central brain.
- Run interactive Leaky Integrate-and-Fire (LIF) simulations at 60 Hz on the client.
- Provide a sensorimotor sandbox demonstrating embodied locomotion, compound eye optics, and escape reflexes.
- Demonstrate novel biologically inspired computational concepts like the StonkFly Bitcoin Trader and transformer comparisons.
- Archive curated community insights from Reddit ELI5 discussions, Google connectomics briefs, and video reels.

## 3. Target Users
- Computational neuroscientists researching spiking neural networks and graph topology.
- Machine learning engineers exploring sparse graph architectures vs dense transformers.
- Students and educators learning biophysical neuron mechanics.
- Curious developers exploring biologically inspired algorithmic systems.

## 4. Feature Specifications

### 4.1 3D Neuropil Atlas (Connectome Map)
- Render all 9 major brain regions in pseudo-3D canvas space: Optic Lamina, Medulla, Lobula Complex, Antennal Lobe, Central Complex, Mushroom Body, Lateral Horn, Subesophageal Zone, and Ventral Nerve Cord.
- Allow user selection by anatomical layer: Sensory, Interneuron, Motor, or All.
- Provide real-time spike injection buttons that pulse activation waveforms through synaptic pathways.
- Display biophysical metadata per region: neuron count, synapse count, primary neurotransmitter, and functional description.

### 4.2 StonkFly Bitcoin Trader
- Connect compound eye visual input to live and historical BTC/USDC candlestick price data.
- Convert 5-minute price deltas into ommatidia photon intensity vectors.
- Route visual spikes through the Antennal/Central Complex and PAM11 dopaminergic cluster.
- Execute automated Buy, Sell, or Hold actions based on thresholded motor output spikes.
- Track real-time portfolio value, win rate, PnL, and dopamine reward levels.

### 4.3 Embodied Fly Sandbox
- Simulate a virtual fly agent (FLY-000) inside a physics boundary.
- Model six-legged tripod gait dynamics with alternating leg support triads.
- Implement 200 Hz wing beat kinematics during flight mode.
- Model the Giant Fiber escape reflex: looming visual shadows trigger a 5-millisecond backward jump and rapid wing depression.
- Provide interactive obstacle avoidance and food foraging behaviors.

### 4.4 ELI5 Knowledge Lab
- Interactive Leaky Integrate-and-Fire (LIF) oscilloscope with adjustable membrane resistance ($R_m$), capacitance ($C_m$), threshold voltage ($V_{th}$), and injection current ($I_{ext}$).
- Comparative matrix analyzing biological connectomes vs artificial transformer networks (energy efficiency, parameter counts, sparsity, learning rules).
- Curated community concept cards from the Reddit ELI5 viral thread.

### 4.5 Media & Research Vault
- Embedded local video reel player with speed controls and chapter timestamps.
- Synchronized dual-language transcripts (English annotated and Hindi original).
- Deep links to research papers from Janelia, Nature, and FlyWire.

## 5. Non-Functional Requirements
- Client-side performance: Maintain 60 frames per second on modern desktop and mobile browsers.
- Zero server-side biophysical compute dependencies: All differential equations solve in browser web workers or requestAnimationFrame loops.
- Lightweight production bundle: Static export under 2MB total JavaScript.
- Mobile responsive layout with touch controls for physics and 3D canvases.
