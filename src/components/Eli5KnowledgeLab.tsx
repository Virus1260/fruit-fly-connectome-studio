"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Activity,
  Cpu,
  Brain,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Compass,
  Sliders,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { COMMUNITY_IDEAS, CommunityIdea } from "@/data/connectomeData";

interface Eli5KnowledgeLabProps {
  onSelectTab?: (tab: string) => void;
}

export default function Eli5KnowledgeLab({ onSelectTab }: Eli5KnowledgeLabProps) {
  // LIF Interactive Parameters
  const [resistance, setResistance] = useState(10); // Rm (Mega-ohms)
  const [capacitance, setCapacitance] = useState(1.0); // Cm (uF)
  const [threshold, setThreshold] = useState(-50); // Vth (mV)
  const [inputCurrent, setInputCurrent] = useState(2.8); // Iext (nA)
  const [noiseLevel, setNoiseLevel] = useState(0.4);
  const [isInjectingPulse, setIsInjectingPulse] = useState(false);
  const [isContinuous, setIsContinuous] = useState(true);

  // Filter state for community ideas
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Canvas ref for real-time LIF oscilloscope
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const voltageHistoryRef = useRef<number[]>([]);
  const spikeHistoryRef = useRef<boolean[]>([]);
  const currentVRef = useRef<number>(-70); // Vrest = -70mV
  const refractoryCountRef = useRef<number>(0);

  // Real-time animation loop for the LIF simulation
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize buffer
    if (voltageHistoryRef.current.length === 0) {
      voltageHistoryRef.current = new Array(250).fill(-70);
      spikeHistoryRef.current = new Array(250).fill(false);
    }

    const V_REST = -70; // Resting potential (mV)
    const V_RESET = -75; // Reset potential (mV)
    const V_SPIKE_PEAK = 30; // Spike peak (mV)
    const DT = 0.5; // Timestep (ms)

    const render = () => {
      // Numerical integration of LIF:
      // tau_m = Rm * Cm
      const tau_m = Math.max(1.0, resistance * capacitance);
      let v = currentVRef.current;
      let spiked = false;

      if (refractoryCountRef.current > 0) {
        refractoryCountRef.current -= 1;
        v = V_RESET;
      } else {
        // External current: continuous + optional pulse + stochastic biological noise
        const noise = (Math.random() - 0.5) * noiseLevel * 5;
        const currentNow =
          (isContinuous ? inputCurrent : 0) + (isInjectingPulse ? 8.0 : 0) + noise;

        // dV/dt = (-(V - Vrest) + Rm * I) / tau_m
        const dv = (-(v - V_REST) + (resistance * currentNow * 0.4)) / tau_m;
        v = v + dv * DT;

        // Threshold check
        if (v >= threshold) {
          spiked = true;
          v = V_SPIKE_PEAK;
          currentVRef.current = V_RESET;
          refractoryCountRef.current = 6; // ~3ms refractory period
        } else {
          currentVRef.current = v;
        }
      }

      // Shift buffers
      voltageHistoryRef.current.push(v);
      if (voltageHistoryRef.current.length > 250) {
        voltageHistoryRef.current.shift();
      }
      spikeHistoryRef.current.push(spiked);
      if (spikeHistoryRef.current.length > 250) {
        spikeHistoryRef.current.shift();
      }

      // Draw Oscilloscope
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Map Voltage (-85mV to +35mV) to canvas Y
      const vMin = -85;
      const vMax = 40;
      const mapY = (val: number) => h - ((val - vMin) / (vMax - vMin)) * h;

      // Draw Threshold line
      const thY = mapY(threshold);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.6)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, thY);
      ctx.lineTo(w, thY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#ef4444";
      ctx.font = "10px monospace";
      ctx.fillText(`Vth: ${threshold} mV`, w - 85, thY - 4);

      // Draw Resting Potential line
      const restY = mapY(V_REST);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, restY);
      ctx.lineTo(w, restY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#3b82f6";
      ctx.fillText(`Vrest: -70 mV`, 10, restY + 12);

      // Draw Voltage Trace
      ctx.beginPath();
      ctx.strokeStyle = "#10b981"; // Bioluminescent emerald
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(16, 185, 129, 0.8)";
      ctx.shadowBlur = 8;

      const step = w / 250;
      voltageHistoryRef.current.forEach((val, idx) => {
        const x = idx * step;
        const y = mapY(val);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Spikes
      spikeHistoryRef.current.forEach((spk, idx) => {
        if (spk) {
          const x = idx * step;
          ctx.fillStyle = "#fbbf24"; // Gold flash
          ctx.beginPath();
          ctx.arc(x, mapY(V_SPIKE_PEAK), 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [resistance, capacitance, threshold, inputCurrent, noiseLevel, isInjectingPulse, isContinuous]);

  // Filter community ideas
  const categories = ["All", "Trading & AI", "Gaming & Embodiment", "Robotics & Hardware", "Neuroscience"];
  const filteredIdeas = COMMUNITY_IDEAS.filter((idea) => {
    const matchesCat = selectedCategory === "All" || idea.category === selectedCategory;
    const matchesQuery =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.technicalMechanism.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-cyan-950/30 p-8">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400 mb-4">
            <Brain className="h-3.5 w-3.5" />
            Reddit ELI5 Computational Breakdown
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How Did They "Turn It On" & Make the Fly Brain Run?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            A 3D mesh is merely a biological statue. To animate 166,691 neurons, computational
            neuroscientists translate the static connectome graph into a dynamical system using the{" "}
            <span className="font-semibold text-emerald-400">Leaky Integrate-and-Fire (LIF)</span>{" "}
            differential equations, coupling sensory receptors with motor commands in a closed loop.
          </p>
        </div>
      </div>

      {/* Interactive LIF Playground */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Oscilloscope Canvas & Formula */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  Point-Neuron Membrane Oscilloscope
                </h3>
                <p className="text-xs text-zinc-400">
                  Real-time numerical integration of membrane voltage $V(t)$ with refractory reset.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onMouseDown={() => setIsInjectingPulse(true)}
                  onMouseUp={() => setIsInjectingPulse(false)}
                  onTouchStart={() => setIsInjectingPulse(true)}
                  onTouchEnd={() => setIsInjectingPulse(false)}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Hold to Inject +8nA Current
                </button>
                <button
                  onClick={() => setIsContinuous(!isContinuous)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isContinuous
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : "border-zinc-700 bg-zinc-800/80 text-zinc-400"
                  }`}
                >
                  {isContinuous ? "Sensory Inflow: ON" : "Sensory Inflow: OFF"}
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black/80">
              <canvas
                ref={canvasRef}
                width={700}
                height={260}
                className="w-full h-[260px] block"
              />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-500">
                LIF Solver: dt = 0.5ms | Scale: -85mV to +40mV
              </div>
            </div>
          </div>

          {/* Mathematical Formula Card */}
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
            <div className="text-xs font-mono font-medium text-emerald-400 mb-1">
              Differential Equation (Standard LIF):
            </div>
            <div className="text-sm font-mono text-zinc-200 overflow-x-auto">
              τₘ (dV/dt) = -(V - V_rest) + Rₘ · [ ∑ⱼ Wᵢⱼ Sⱼ(t) + I_ext(t) ]
            </div>
            <div className="mt-2 text-xs text-zinc-400 leading-normal">
              When $V(t) \ge V_{"{th}"}$, an action potential (spike) travels down the axon to downstream synapses,
              $V(t)$ snaps to $V_{"{reset}"}$, and the cell enters an absolute refractory period.
            </div>
          </div>
        </div>

        {/* Right: Biophysical Tuning Sliders */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Sliders className="h-5 w-5 text-cyan-400" />
              Biophysical Parameters
            </h3>

            <div className="space-y-4">
              {/* Membrane Resistance */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Membrane Resistance (Rₘ)</span>
                  <span className="text-cyan-400 font-bold">{resistance} MΩ</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Membrane Capacitance */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Membrane Capacitance (Cₘ)</span>
                  <span className="text-cyan-400 font-bold">{capacitance} µF</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={capacitance}
                  onChange={(e) => setCapacitance(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Spike Threshold */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Spike Threshold (V_th)</span>
                  <span className="text-red-400 font-bold">{threshold} mV</span>
                </div>
                <input
                  type="range"
                  min="-65"
                  max="-40"
                  step="1"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              {/* Input Current */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Sensory Drive (I_ext)</span>
                  <span className="text-emerald-400 font-bold">{inputCurrent} nA</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.2"
                  value={inputCurrent}
                  onChange={(e) => setInputCurrent(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Stochastic Noise */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Biological Ion Channel Noise</span>
                  <span className="text-amber-400 font-bold">{noiseLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Effective Time Constant:
            </div>
            <div className="font-mono text-emerald-300 bg-black/40 rounded-xl p-2.5 border border-zinc-800">
              τₘ = Rₘ · Cₘ = {(resistance * capacitance).toFixed(1)} ms
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side: Transformers vs Biological Connectomes */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-md">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <Cpu className="h-6 w-6 text-indigo-400" />
          Architectural Matrix: Modern LLMs vs Biological Connectomes
        </h3>
        <p className="text-sm text-zinc-400 mb-6 max-w-3xl">
          Why does the fruit fly connectome behave so differently from GPT or Claude? Comparing the
          fundamental physical and algorithmic substrates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deep Learning / Transformers */}
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Artificial Intelligence (LLM / ViT)</h4>
                <p className="text-xs text-indigo-300/80">Synchronous Matrix Multiplication</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>
                  <strong>Activation:</strong> Continuous floating-point numbers (FP16/BF16/FP8) evaluated in dense tensor blocks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>
                  <strong>Information Propagation:</strong> Layer-by-layer forward pass synchronized with clock ticks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>
                  <strong>Power Consumption:</strong> 300W - 700W per GPU cluster, burning megawatts in data centers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>
                  <strong>Learning Mechanism:</strong> Offline backpropagation with gradient descent across trillions of static tokens.
                </span>
              </li>
            </ul>
          </div>

          {/* Biological Connectome SNN */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Biological Spiking Connectome (FlyBrain)</h4>
                <p className="text-xs text-emerald-300/80">Asynchronous Event-Driven Spikes</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Activation:</strong> Sparse binary spikes (0 or 1). Information encoded in spike timing, intervals, and rates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Information Propagation:</strong> Continuous real-time electrical conduction across 125M physical synaptic branches.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Power Consumption:</strong> ~10 to 50 microwatts (µW) inside a living insect organism.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Learning Mechanism:</strong> Local plasticity (STDP, dopamine-mediated reward/aversion) in closed-loop physical embodiment.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Community Creative & Useful Ideas Showcase */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-400" />
              Creative & Useful Community Ideas from Reddit & Hacker News
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Curated experiments, wild hacks, and real robotics applications emerging from the public connectome.
            </p>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none w-full md:w-64"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20"
                  : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => {
            const isStonkFly = idea.id === "stonkfly-trading";
            const isMinecraft = idea.id === "minecraft-fly-000";

            return (
              <div
                key={idea.id}
                className="rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-sm flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                      {idea.category}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400/90">
                      {idea.redditVoteCount}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {idea.title}
                  </h4>

                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {idea.summary}
                  </p>

                  <div className="mt-4 rounded-xl border border-zinc-800 bg-black/40 p-3 text-[11px] text-zinc-400 font-mono">
                    <strong className="text-zinc-200">Mechanism:</strong> {idea.technicalMechanism}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  {isStonkFly && onSelectTab ? (
                    <button
                      onClick={() => onSelectTab("stonkfly")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                    >
                      Open In StonkFly Trader <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : isMinecraft && onSelectTab ? (
                    <button
                      onClick={() => onSelectTab("embodied")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                    >
                      Launch Sandbox Agent <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Active Research Vector
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
