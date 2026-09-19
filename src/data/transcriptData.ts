export interface TranscriptSegment {
  timeStart: number;
  timeEnd: number;
  timeLabel: string;
  hindi: string;
  english: string;
  annotation: string;
  visualCue: string;
}

export const REEL_TRANSCRIPTS: TranscriptSegment[] = [
  {
    timeStart: 0,
    timeEnd: 15,
    timeLabel: "00:00 - 00:15",
    hindi: "Yeh itna scary hai aur mere haath kaanp rahe hain literally dekhne ke baad! Toh recently Google Research ne ek experiment mein fruit fly ke brain ko thousands of ultra pieces mein kaata. Kaatne ke baad electron microscope se millions of 2D images banaye, aur phir us massive...",
    english: "This is so terrifying that my hands were literally shaking after seeing this! Recently, Google Research conducted an experiment where they sliced a fruit fly's brain into thousands of ultra-thin slices. After slicing, they took millions of 2D images using an electron microscope, and then...",
    annotation: "Serial-Section Transmission Electron Microscopy (ssTEM) at 40nm thickness, capturing synaptic vesicles and membranes.",
    visualCue: "Speaker introduction & 'Network of Artificial Neurons' headline overlay",
  },
  {
    timeStart: 15,
    timeEnd: 30,
    timeLabel: "00:15 - 00:30",
    hindi: "...dataset ko 3D mein process karne ke liye Flood-Filling Networks (FFNs) aur deep learning architecture ka use kiya. Aur yeh sab karne ke baad, ek fruit fly ke brain structure ko, with all the neurons and all the connections, virtually release kar diya! Aur ab log fruit fly se Rubik's cube solve karwa rahe hain,",
    english: "...to process that massive dataset into a 3D reconstruction, they used Flood-Filling Networks (FFNs) and deep learning architectures. And after achieving all this, they virtually released the complete fruit fly brain structure—with all its neurons and all its synaptic connections! And now people are making fruit flies solve Rubik's cubes...",
    annotation: "166,691 neurons and ~125 million synapses mapped in the adult male Drosophila melanogaster central nervous system (MaleCNS v1.0).",
    visualCue: "Fruit fly 3D mesh interacting with Rubik's cube alongside the 3D connectome scan",
  },
  {
    timeStart: 30,
    timeEnd: 45,
    timeLabel: "00:30 - 00:45",
    hindi: "3D games khila rahe hain, programming sikha rahe hain, aur pata nahi kya kya kar rahe hain! Ab jaise ki Google ne dataset publicly available kar diya hai, toh ab developers is model ke sensorimotor pathways ko use karke external data inject kar rahe hain. Ab isse ho kya raha hai? Woh fruit fly ke brain reactions ko...",
    english: "...they are making them play 3D games, teaching them programming, and who knows what else! Now that Google has made this dataset publicly available, developers are utilizing the model's sensorimotor pathways to inject external data. What is happening because of this? They are actively studying the brain's reactions...",
    annotation: "Closed-loop sensorimotor coupling: external stimuli convert to sensory firing rates, propagating through interneurons to descending motor outputs.",
    visualCue: "Google Research publication headline: 'A connectomics milestone: Mapping the complete male fruit fly brain'",
  },
  {
    timeStart: 45,
    timeEnd: 60,
    timeLabel: "00:45 - 01:00",
    hindi: "...study kar rahe hain. Jaise ki tumne dekha hoga recently ek bande ne fruit fly ka same simulation Minecraft mein run kiya [FLY-000 neural], Bitcoin trade karwaya [StonkFly]! Dekho, agar tumhe bhi karna hai toh uske 3 se 4 steps hain: Sabse pehle Google DeepMind / FlyWire ka dataset download karo. Is repository par jaoge toh tumhe pata chal jayega ki is model ka...",
    english: "...For example, as you might have seen recently, someone ran this exact fruit fly brain simulation in Minecraft [FLY-000 neural], and even had it trade Bitcoin [StonkFly]! Look, if you want to do this too, there are 3 to 4 steps: First, download the Google DeepMind / FlyWire dataset. If you visit this repository, you'll understand how to configure this model's data...",
    annotation: "StonkFly: Bitcoin chart visual feed into photoreceptors with 15 PAM11 dopamine reward neurons and 2 PPL101 penalty neurons.",
    visualCue: "StonkFly neural replay trading dashboard showing 775.5k spikes/s & Minecraft spider/fly model",
  },
  {
    timeStart: 60,
    timeEnd: 75,
    timeLabel: "01:00 - 01:15",
    hindi: "...dataset set kaise karte hain. After that, you have to choose a physics and body simulator. Agar motor output chahiye toh tumhe sensory inputs bhi dene honge! Ab dekho bhai, scary isliye hai ki developers abhi ek fruit fly ke brain ko itna control kar rahe hain, toh future mein agar yeh same experiment humans ke saath hua toh...",
    english: "...After that, you have to choose a physics and body simulator. If you want motor output, you must also provide sensory inputs! Now look brother, this is scary because if developers can already control a fruit fly's brain to this extent, what will happen in the future if this same experiment is conducted on human brains?...",
    annotation: "Embodiment requires physical simulation: flight aerodynamics, ground reaction forces, and continuous sensory feedback.",
    visualCue: "Circuit schematic: SENSORY -> INTERNEURONS -> MOTOR",
  },
  {
    timeStart: 75,
    timeEnd: 81.57,
    timeLabel: "01:15 - 01:21",
    hindi: "...socho hamara kya hoga! Baaki agar video achhi lagi ho toh follow kar lena, kyunki next video mein yeh simulation live karke dikhaunga!",
    english: "...Just think what will happen to us! Anyway, if you liked this video, make sure to follow, because in the next video I will demonstrate this simulation live!",
    annotation: "Upcoming live demonstration tease & call to action.",
    visualCue: "Speaker closing remarks and call to action",
  },
];

export const REEL2_TRANSCRIPTS: TranscriptSegment[] = [
  {
    timeStart: 0,
    timeEnd: 12,
    timeLabel: "00:00 - 00:12",
    hindi: "Agar tumne AI coding ke time yeh files include nahi ki hai toh woh tumhare project ka bilkul band baja dega! File number 1 hai PRD.md. Isme clearly mention karo ki tum kya bana rahe ho, kya problem solve kar rahe ho, kaun se features hone wale hain.",
    english: "If you haven't included these files while doing AI coding, the AI agent will completely ruin your project! File Number 1 is PRD.md. In this, clearly specify what you are building, what problem you are solving, and what the core features are.",
    annotation: "PRD.md anchors the high-level intent, preventing context drift across multi-turn agent sessions.",
    visualCue: "Speaker introduction & 'File 1: PRD.md' graphic overlay",
  },
  {
    timeStart: 12,
    timeEnd: 24,
    timeLabel: "00:12 - 00:24",
    hindi: "File number 2 hai ARCHITECTURE.md. Isme define karo tumhara app ka flow kya hoga, files and folders kaise organized honge, tech stack kya hoga, how different parts of the project are connected with each other.",
    english: "File Number 2 is ARCHITECTURE.md. Define your application flow here: how files and folders are organized, what the tech stack is, and how different parts of the project connect with each other.",
    annotation: "ARCHITECTURE.md defines component hierarchies, state boundaries, and data pipelines.",
    visualCue: "System architecture flow diagram showing file tree & component graph",
  },
  {
    timeStart: 24,
    timeEnd: 36,
    timeLabel: "00:24 - 00:36",
    hindi: "File number 3: RULES.md. Basically AI ke liye ek rule book hai jisme likha hota hai ki usko kya karna hai aur kya avoid karna hai, kaun si libraries ko use karna hai, error ko kaise handle karna hai aur kya constraints honge.",
    english: "File Number 3 is RULES.md. It is essentially a rule book for the AI stating what to do and what to avoid, which libraries to use, how to handle errors, and what technical constraints apply.",
    annotation: "RULES.md enforces code hygiene: strict TypeScript, no mock placeholders, explicit error catching.",
    visualCue: "AI Rules checklist overlay with Do's and Don'ts",
  },
  {
    timeStart: 36,
    timeEnd: 48,
    timeLabel: "00:36 - 00:48",
    hindi: "File number 4 hai DESIGN.md. Isme project ka overall primary and secondary colors, fonts, typography, components ka look, visual style define hota hai so that AI har bar alag alag UI na bana de.",
    english: "File Number 4 is DESIGN.md. This defines the overall primary and secondary colors, fonts, typography, component styling, and visual aesthetics so the AI doesn't generate completely mismatched UI on every turn.",
    annotation: "DESIGN.md standardizes hex color tokens, font families, glassmorphism, and responsive breakpoints.",
    visualCue: "Color palette swatches and typography hierarchy preview",
  },
  {
    timeStart: 48,
    timeEnd: 72,
    timeLabel: "00:48 - 01:12",
    hindi: "File number 5 hoga TASKS.md. Project ko structured milestone tasks mein chhote chhote parts mein divide kar dete ho. Task 1: logo/hero, Task 2: dashboard, Task 3: payment/simulation. Isse AI ek time par ek focused task efficiently kar payega.",
    english: "File Number 5 is TASKS.md. You decompose the project into structured, bite-sized milestone tasks: Task 1 for logo/hero, Task 2 for dashboard, Task 3 for simulation. This keeps the AI focused on one task at a time without hallucinations.",
    annotation: "TASKS.md establishes atomic engineering milestones for test-driven agentic execution.",
    visualCue: "Interactive milestone progress checklist",
  },
  {
    timeStart: 72,
    timeEnd: 96.02,
    timeLabel: "01:12 - 01:36",
    hindi: "File number 6 is MEMORY.md. Jaise jaise project banta jaa raha hai, uska context tum yahan save karte jaao — important decisions, bugs, changes. Agar template chahiye toh comment 'AI' and I'll send it in DM!",
    english: "File Number 6 is MEMORY.md. As your project evolves, record the context here — architectural decisions, resolved bugs, and key changes. Comment 'AI' if you want the template!",
    annotation: "MEMORY.md acts as persistent episodic memory across session compactions and context resets.",
    visualCue: "Persistent memory markdown preview and creator call to action",
  },
];
