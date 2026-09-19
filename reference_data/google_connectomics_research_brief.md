# Google Research & HHMI Janelia Connectomics Brief

**Research Title**: *A connectome of the adult Drosophila melanogaster central nervous system*  
**Publication**: *Cell* (September 2026), with companion papers in *Current Biology*  
**Lead Authors**: Michał Januszewski, Viren Jain (Google Research), alongside teams from HHMI Janelia Research Campus, Cambridge Connectomics Group, and Princeton University.  
**Public Announcement**: [Google Research Blog: A connectomics milestone: Mapping the complete male fruit fly brain](https://blog.google/innovation-and-ai/technology/research/male-fruit-fly-brain-map/)

---

## 1. Project Background & Key Metrics

| Metric | Details |
|---|---|
| **Specimen** | Adult male fruit fly (*Drosophila melanogaster*) |
| **Scope** | Complete Central Nervous System: Brain, Optic Lobes, and Ventral Nerve Cord (VNC) |
| **Total Reconstructed Neurons** | **166,691 neurons** (MaleCNS v1.0) |
| **Total Synaptic Connections** | **~125 million synapses** |
| **Imaging Technology** | High-throughput Serial-Section Transmission Electron Microscopy (ssTEM) |
| **Computational AI Segmentation** | Flood-Filling Networks (FFNs) trained with 3D Deep Convolutional Ensembles |
| **Public Viewer** | Neuroglancer (Google's open-source WebGL volumetric data visualizer) |

---

## 2. Technical Breakthroughs

### Flood-Filling Networks (FFNs)
Previously, tracing thousands of interlocking neural branches required millions of human proofreading hours. Google developed **Flood-Filling Networks**, a 3D machine learning segmentation approach where a recurrent convolutional network predicts neuron shape by "filling" voxel by voxel from a seed location, resolving ambiguous membrane boundaries and reducing error rates by orders of magnitude.

### The Complete Sensorimotor Loop
Unlike partial brain slices, MaleCNS v1.0 connects the entire nervous system:
- **Sensory Periphery**: Photoreceptors in the compound eyes and olfactory receptor neurons on antennae.
- **Central Processing Units**:
  - *Mushroom Body*: Learning, associative memory, odor discrimination.
  - *Central Complex*: Spatial navigation, celestial compass heading, velocity estimation.
  - *Optic Lobes (Lamina, Medulla, Lobula, Lobula Plate)*: Motion and visual feature detection.
- **Motor Control**: Ventral Nerve Cord with motor neurons actuating six legs, wings, proboscis, and abdominal muscles.

---

## 3. Sexual Dimorphism & Behavioral Discoveries
By comparing the new male connectome with the previously mapped female fruit fly brain:
- Identified sex-specific neural circuits governing courtship songs (wing vibration circuits).
- Mapped sexual dimorphism in P1 command neurons that integrate pheromone signals to initiate mating behaviors.
- Revealed differences in aggressive lunging and boxing circuits between male and female flies.

---

## 4. Exploration Links & Tools
- **Neuroglancer Connectome Explorer**: Interactive WebGL browser viewer for exploring 3D neuron morphologies.
- **FlyWire Community Platform**: Global collaborative ecosystem for neuron annotation and proofreading.
- **Codex (Connectome Data Explorer)**: Searchable programmatic interface for querying neuron types, neurotransmitters, and connectivity matrices.
