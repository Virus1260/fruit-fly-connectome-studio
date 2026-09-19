export interface NeuropilRegion {
  id: string;
  name: string;
  shortName: string;
  neuronCount: number;
  synapseCount: number;
  functionDesc: string;
  layer: "sensory" | "interneuron" | "modulatory" | "motor";
  color: string;
  position: [number, number, number]; // 3D coordinates in brain space
}

export const DROSOPHILA_NEUROPILS: NeuropilRegion[] = [
  {
    id: "optic-lamina",
    name: "Lamina & Compound Eyes",
    shortName: "LAM",
    neuronCount: 16800,
    synapseCount: 14200000,
    functionDesc: "Primary visual processing from ~800 ommatidia; photoreceptor R1-R6 signal amplification.",
    layer: "sensory",
    color: "#06b6d4", // cyan
    position: [-220, 40, 20],
  },
  {
    id: "optic-medulla",
    name: "Medulla & Lobula Plate",
    shortName: "MED/LOB",
    neuronCount: 54000,
    synapseCount: 41000000,
    functionDesc: "Elementary motion detection (T4/T5 cells) and wide-field optical flow integration.",
    layer: "interneuron",
    color: "#3b82f6", // blue
    position: [-140, 50, 40],
  },
  {
    id: "antennal-lobe",
    name: "Antennal Lobes",
    shortName: "AL",
    neuronCount: 3800,
    synapseCount: 3200000,
    functionDesc: "Olfactory glomerular map decoding odors, food volatiles, and sex pheromones.",
    layer: "sensory",
    color: "#10b981", // emerald
    position: [0, -60, -40],
  },
  {
    id: "mushroom-body",
    name: "Mushroom Body (Kenyon Cells)",
    shortName: "MB",
    neuronCount: 10400,
    synapseCount: 12500000,
    functionDesc: "Associative learning, episodic odor memory, and sparse representation storage.",
    layer: "interneuron",
    color: "#ec4899", // pink
    position: [50, 70, 60],
  },
  {
    id: "central-complex",
    name: "Central Complex (Ellipsoid/Protocerebral)",
    shortName: "CX",
    neuronCount: 3200,
    synapseCount: 4800000,
    functionDesc: "Internal ring attractor celestial compass, spatial navigation, and heading direction.",
    layer: "interneuron",
    color: "#a855f7", // purple
    position: [0, 20, 80],
  },
  {
    id: "dopamine-pam",
    name: "PAM Dopamine Cluster (Reward)",
    shortName: "PAM11",
    neuronCount: 15,
    synapseCount: 480000,
    functionDesc: "Appetitive reinforcement signaling. Activated during sugar feeding and trading profit in StonkFly.",
    layer: "modulatory",
    color: "#f59e0b", // amber/gold
    position: [20, 10, 30],
  },
  {
    id: "aversive-ppl",
    name: "PPL101 Aversive Dopamine Cluster",
    shortName: "PPL101",
    neuronCount: 2,
    synapseCount: 190000,
    functionDesc: "Punishment / negative valence signaling. Triggered by electric shocks, heat, or trading losses in StonkFly.",
    layer: "modulatory",
    color: "#ef4444", // red
    position: [-20, 10, 30],
  },
  {
    id: "descending-neurons",
    name: "Descending Neurons (Brain-to-VNC)",
    shortName: "DNs",
    neuronCount: 1300,
    synapseCount: 3100000,
    functionDesc: "Command highway transmitting behavioral decisions from central brain to motor circuits.",
    layer: "motor",
    color: "#eab308", // yellow
    position: [0, -100, 0],
  },
  {
    id: "ventral-nerve-cord",
    name: "Ventral Nerve Cord (Thoracic/Abdominal)",
    shortName: "VNC",
    neuronCount: 77000,
    synapseCount: 45000000,
    functionDesc: "Insect equivalent of the spinal cord; coordinates six-legged tripod gait and wing motor mechanics.",
    layer: "motor",
    color: "#f97316", // orange
    position: [0, -220, -60],
  },
];

export interface CommunityIdea {
  id: string;
  category: "Trading & AI" | "Gaming & Embodiment" | "Robotics & Hardware" | "Neuroscience";
  title: string;
  summary: string;
  technicalMechanism: string;
  redditVoteCount: string;
}

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: "stonkfly-trading",
    category: "Trading & AI",
    title: "StonkFly: Fruit Fly Bitcoin Quant",
    summary: "Alex Wormuth (Coinbase engineer) hooked the 166.7k connectome up to trade BTC/USDC with a $100 fund.",
    technicalMechanism: "Renders 320x180 candlestick charts into compound eye ommatidia; stimulates 15 PAM11 dopamine neurons upon profit and 2 PPL101 neurons on losses/fees. Decodes descending neurons into Buy/Sell/Hold actions.",
    redditVoteCount: "2.4k upvotes",
  },
  {
    id: "minecraft-fly-000",
    category: "Gaming & Embodiment",
    title: "Minecraft Autonomous Spider/Fly (`FLY-000 [neural]`)",
    summary: "A community developer connected the full brain map to control an entity in a Minecraft sandbox.",
    technicalMechanism: "Converts block proximity, light levels, and lava heat into sensory receptor firing rates; reads motor neuron spikes to drive Minecraft WASD movement packets.",
    redditVoteCount: "1.8k upvotes",
  },
  {
    id: "haltere-drone-autopilot",
    category: "Robotics & Hardware",
    title: "Micro-UAV Haltere Gyroscopic Stabilizer",
    summary: "Replicating the fly's 200 Hz oscillating haltere sensory circuit for ultra-low latency drone stabilization.",
    technicalMechanism: "Halteres detect Coriolis forces during rapid wind gusts. Point-to-point connections directly reflexively adjust wing stroke amplitude in sub-10ms without software PID delays.",
    redditVoteCount: "950 upvotes",
  },
  {
    id: "browser-lif-simulation",
    category: "Neuroscience",
    title: "Browser-Executable Spiking Connectome",
    summary: "Running the whole 166,691 neuron Leaky Integrate-and-Fire dynamical network in WebGL/WebGPU shaders.",
    technicalMechanism: "Sparse adjacency matrices encoded as 2D textures; fragment shaders compute membrane potential leakage and integrate voltage per timestep at 60 FPS.",
    redditVoteCount: "1.4k upvotes",
  },
  {
    id: "chemical-plume-tracker",
    category: "Robotics & Hardware",
    title: "Gas Leak Search & Rescue Robot",
    summary: "Autonomous terrestrial rovers navigating turbulent chemical odor plumes using fly antennal lobe algorithms.",
    technicalMechanism: "Glomerular lateral inhibition sharpens weak odor signals, triggering crosswind casting and upwind surges when plume contact is detected.",
    redditVoteCount: "780 upvotes",
  },
  {
    id: "rubiks-cube-manipulation",
    category: "Gaming & Embodiment",
    title: "3D Rubik's Cube Spatial Manipulation",
    summary: "Stimulating optic flow and central complex ring neurons to solve spatial orientation puzzles in simulated physics.",
    technicalMechanism: "Visual feature detectors in the lobula plate track face colors while thoracic central pattern generators (CPGs) actuate leg grasp routines.",
    redditVoteCount: "1.1k upvotes",
  },
];
