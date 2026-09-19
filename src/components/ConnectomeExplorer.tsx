"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DROSOPHILA_NEUROPILS,
  NeuropilRegion,
} from "@/data/connectomeData";
import {
  Brain,
  Zap,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Play,
  RotateCcw,
  Network
} from "lucide-react";

export default function ConnectomeExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<NeuropilRegion>(DROSOPHILA_NEUROPILS[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isStimulating, setIsStimulating] = useState<boolean>(false);
  const [stimulatedRegionId, setStimulatedRegionId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered regions
  const displayedRegions = activeFilter === "all"
    ? DROSOPHILA_NEUROPILS
    : DROSOPHILA_NEUROPILS.filter((r) => r.layer === activeFilter);

  // Trigger pulse simulation on selected region
  const handleStimulate = (region: NeuropilRegion) => {
    setSelectedRegion(region);
    setStimulatedRegionId(region.id);
    setIsStimulating(true);
    setTimeout(() => {
      setIsStimulating(false);
      setStimulatedRegionId(null);
    }, 1800);
  };

  // 3D Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 420);

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const scale = Math.min(width, height) / 520;

      // Draw faint background grid
      ctx.strokeStyle = "rgba(15, 23, 42, 0.8)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw synthetic fly brain outline silhouette
      ctx.strokeStyle = "rgba(6, 182, 212, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Left eye lobe
      ctx.ellipse(centerX - 130 * scale, centerY - 20 * scale, 90 * scale, 120 * scale, -0.2, 0, Math.PI * 2);
      ctx.stroke();
      // Right eye lobe
      ctx.beginPath();
      ctx.ellipse(centerX + 130 * scale, centerY - 20 * scale, 90 * scale, 120 * scale, 0.2, 0, Math.PI * 2);
      ctx.stroke();
      // Central protocerebrum
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 30 * scale, 85 * scale, 95 * scale, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Ventral Nerve Cord
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 120 * scale, 35 * scale, 80 * scale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw connections between neuropils
      DROSOPHILA_NEUROPILS.forEach((r1, i) => {
        DROSOPHILA_NEUROPILS.forEach((r2, j) => {
          if (i < j) {
            // Check connectivity
            const dist = Math.hypot(
              r1.position[0] - r2.position[0],
              r1.position[1] - r2.position[1]
            );
            if (dist < 260) {
              const x1 = centerX + r1.position[0] * scale;
              const y1 = centerY + r1.position[1] * scale;
              const x2 = centerX + r2.position[0] * scale;
              const y2 = centerY + r2.position[1] * scale;

              const isPulse =
                isStimulating &&
                (stimulatedRegionId === r1.id || stimulatedRegionId === r2.id);

              ctx.strokeStyle = isPulse
                ? "rgba(6, 182, 212, 0.85)"
                : "rgba(30, 41, 59, 0.4)";
              ctx.lineWidth = isPulse ? 2.5 : 1;

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();

              // If pulse, draw traveling photon packet
              if (isPulse) {
                const t = (Date.now() % 1000) / 1000;
                const px = x1 + (x2 - x1) * t;
                const py = y1 + (y2 - y1) * t;
                ctx.fillStyle = "#38bdf8";
                ctx.beginPath();
                ctx.arc(px, py, 3.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        });
      });

      // Draw Neuropil Nodes
      DROSOPHILA_NEUROPILS.forEach((region) => {
        const isSelected = selectedRegion.id === region.id;
        const isPulsing = stimulatedRegionId === region.id;

        const x = centerX + region.position[0] * scale;
        const y = centerY + region.position[1] * scale;

        const radius = Math.max(14 * scale, Math.min(28 * scale, Math.sqrt(region.neuronCount) * 0.1 * scale));

        // Node Glow
        if (isSelected || isPulsing) {
          const grad = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 3);
          grad.addColorStop(0, region.color);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Base Node
        ctx.fillStyle = isSelected ? "#ffffff" : region.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node Border
        ctx.strokeStyle = isSelected ? "#38bdf8" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = "#e2e8f0";
        ctx.font = `bold ${Math.max(10, Math.round(11 * scale))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(region.shortName, x, y + radius + 13 * scale);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [selectedRegion, isStimulating, stimulatedRegionId, rotationAngle]);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-5 shadow-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-xs font-bold text-cyan-400">
                CONNECTOME TOPOLOGY
              </span>
              <span className="text-xs text-slate-400">Google Research & Janelia MaleCNS v1.0</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              166,691 Neurons & ~125 Million Synapses
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Interactive structural connectome map of the adult male fruit fly central nervous system.
              Click on any neuropil to inspect cellular counts or inject current to simulate synaptic transmission.
            </p>
          </div>

          {/* Quick Filter Pill Group */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
            {["all", "sensory", "interneuron", "modulatory", "motor"].map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveFilter(layer)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all ${
                  activeFilter === layer
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: 3D Canvas + Region Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 3D Brain Viewport Canvas */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Drosophila CNS Neuropil Scaffold</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStimulate(selectedRegion)}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition-all active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              >
                <Zap className="h-3.5 w-3.5 text-cyan-400 animate-bounce" />
                Stimulate {selectedRegion.shortName}
              </button>
            </div>
          </div>

          {/* 3D Visualizer Canvas Container */}
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            <canvas ref={canvasRef} className="w-full cursor-crosshair" height={420} />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[11px] text-slate-400 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Click any region below to focus & inspect</span>
            </div>
          </div>

          {/* Neuropil Grid Chips */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {displayedRegions.map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`flex flex-col rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{region.shortName}</span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                  </div>
                  <span className="truncate text-[11px] text-slate-300">{region.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {region.neuronCount.toLocaleString()} neurons
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Region Deep-Dive Inspector */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Neuropil Telemetry</h3>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: selectedRegion.color + "44", border: `1px solid ${selectedRegion.color}` }}
              >
                {selectedRegion.layer}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">{selectedRegion.name}</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {selectedRegion.functionDesc}
              </p>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Neuron Count</div>
                <div className="text-lg font-bold text-cyan-300 font-mono">
                  {selectedRegion.neuronCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Reconstructed Nodes</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Synaptic Edges</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  {selectedRegion.synapseCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Pre/Post Synapses</div>
              </div>
            </div>

            {/* Neurotransmitter Distribution */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-white">Neurotransmitter Profile</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Acetylcholine (Excitatory)</span>
                  <span className="font-mono text-cyan-300">~62%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: "62%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">GABA & Glutamate (Inhibitory)</span>
                  <span className="font-mono text-pink-400">~31%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-pink-400" style={{ width: "31%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Biogenic Amines (Dopamine/Octopamine)</span>
                  <span className="font-mono text-amber-400">~7%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: "7%" }} />
                </div>
              </div>
            </div>

            {/* Stimulate Action Button */}
            <button
              onClick={() => handleStimulate(selectedRegion)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-cyan-500 hover:to-teal-500 transition-all active:scale-95"
            >
              <Zap className="h-4 w-4" />
              Inject Neural Signal Into {selectedRegion.shortName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
