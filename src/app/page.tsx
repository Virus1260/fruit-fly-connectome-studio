"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Brain,
  TrendingUp,
  Cpu,
  Bug,
  Video,
  MessageSquareMore,
  Zap,
  Activity,
  Sparkles,
  ChevronRight,
  GitFork,
  ExternalLink,
} from "lucide-react";

// Dynamic imports (disable SSR on canvas-heavy components)
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const StonkFlySimulator = dynamic(() => import("@/components/StonkFlySimulator"), { ssr: false });
const ConnectomeExplorer = dynamic(() => import("@/components/ConnectomeExplorer"), { ssr: false });
const EmbodiedFlySandbox = dynamic(() => import("@/components/EmbodiedFlySandbox"), { ssr: false });
const Eli5KnowledgeLab = dynamic(() => import("@/components/Eli5KnowledgeLab"), { ssr: false });
const ReelMediaVault = dynamic(() => import("@/components/ReelMediaVault"), { ssr: false });

const TABS = [
  { id: "home",      label: "Overview",         icon: Brain,          color: "text-emerald-400" },
  { id: "connectome",label: "Connectome Map",    icon: Cpu,            color: "text-cyan-400" },
  { id: "stonkfly",  label: "StonkFly Trader",  icon: TrendingUp,     color: "text-amber-400" },
  { id: "embodied",  label: "Embodied Sandbox",  icon: Bug,            color: "text-orange-400" },
  { id: "eli5",      label: "ELI5 Lab",          icon: MessageSquareMore, color: "text-purple-400" },
  { id: "vault",     label: "Media Vault",       icon: Video,          color: "text-pink-400" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// Animated neuron dots
function NeuronOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-emerald-400/20 blur-sm"
          style={{
            width: `${4 + (i % 5) * 3}px`,
            height: `${4 + (i % 5) * 3}px`,
            left: `${(i * 4.7 + 3) % 100}%`,
            top: `${(i * 7.3 + 10) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${5 + (i % 4)}s`,
            animation: "float-up ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}

// Hero landing section (shown when tab === 'home')
function HeroSection({ onSelectTab }: { onSelectTab: (t: TabId) => void }) {
  const stats = [
    { value: "166,691",  label: "Neurons Mapped",      color: "text-emerald-400" },
    { value: "125M",     label: "Synaptic Connections", color: "text-cyan-400" },
    { value: "40nm",     label: "EM Slice Precision",   color: "text-amber-400" },
    { value: "60 Hz",    label: "LIF Simulation Rate",  color: "text-purple-400" },
  ];

  const highlights = [
    {
      tab: "connectome" as TabId,
      icon: Cpu,
      color: "emerald",
      title: "3D Neuropil Atlas",
      desc: "Explore all 9 neuropil regions, from optic lamina to ventral nerve cord, with layer filtering and live stimulation.",
    },
    {
      tab: "stonkfly" as TabId,
      icon: TrendingUp,
      color: "amber",
      title: "StonkFly Bitcoin Trader",
      desc: "The fly connectome trades BTC/USDC with $100. Candlestick charts feed compound eyes; PAM11 dopamine fires on profit.",
    },
    {
      tab: "embodied" as TabId,
      icon: Bug,
      color: "orange",
      title: "Embodied Fly Sandbox",
      desc: "Animate FLY-000 [neural] in a physics arena with tripod gait, 200Hz wing beat, Giant Fiber escape reflex, and Minecraft-style sensor coupling.",
    },
    {
      tab: "eli5" as TabId,
      icon: MessageSquareMore,
      color: "purple",
      title: "ELI5 Knowledge Lab",
      desc: "Interactive LIF oscilloscope, Transformers-vs-Connectome matrix, and curated ideas from the Reddit ELI5 viral thread.",
    },
    {
      tab: "vault" as TabId,
      icon: Video,
      color: "pink",
      title: "Media & Research Vault",
      desc: "Watch the original viral reel by @yournishaant with synced Hindi-to-English transcript and 5 research dossiers.",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:border-emerald-500/60 shadow-emerald-500/10",
    amber:   "border-amber-500/30 bg-amber-950/20 text-amber-400 hover:border-amber-500/60 shadow-amber-500/10",
    orange:  "border-orange-500/30 bg-orange-950/20 text-orange-400 hover:border-orange-500/60 shadow-orange-500/10",
    purple:  "border-purple-500/30 bg-purple-950/20 text-purple-400 hover:border-purple-500/60 shadow-purple-500/10",
    pink:    "border-pink-500/30 bg-pink-950/20 text-pink-400 hover:border-pink-500/60 shadow-pink-500/10",
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <NeuronOrbs />

      {/* Hero Copy */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-400 mb-8 animate-neural-pulse">
          <Zap className="h-3.5 w-3.5" />
          MaleCNS v1.0 · Google Research × HHMI Janelia · Cell (2026)
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white mb-6">
          The Complete{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Drosophila Brain
          </span>{" "}
          <br className="hidden sm:block" />
          Running in Your Browser
        </h1>

        <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed mb-10">
          Google Research mapped every neuron and synapse of the adult male fruit fly brain. 
          Now developers worldwide are hooking it up to trade Bitcoin, play Minecraft, and pilot drones — 
          all powered by a differential equation you can tune <em>live right here</em>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onSelectTab("connectome")}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Brain className="h-4 w-4" />
            Explore Connectome
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onSelectTab("stonkfly")}
            className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-6 py-3 text-sm font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all"
          >
            <TrendingUp className="h-4 w-4" />
            Launch StonkFly
          </button>
          <a
            href="https://github.com/yournishaant/fruit-fly-connectome-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800/80 px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-500 active:scale-95 transition-all"
          >
            <GitFork className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center backdrop-blur-md"
            >
              <div className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-zinc-400 mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight Cards Grid */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white">Explore Five Laboratories</h2>
          <p className="text-sm text-zinc-400 mt-2">
            Each tab is an independent interactive experiment powered by the same 166,691-neuron graph.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map(({ tab, icon: Icon, color, title, desc }) => (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`text-left rounded-3xl border p-6 transition-all hover:shadow-xl group ${colorMap[color]}`}
            >
              <div className={`mb-4 h-10 w-10 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:translate-x-1 transition-transform">{title}</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{desc}</p>
              <div className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold`}>
                Open Lab <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Research Attribution Footer */}
        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Based on <span className="text-zinc-300 font-medium">Dorkenwald et al. (2026)</span> — 
            "Neuronal wiring diagram of an adult brain" published in <em>Cell</em>.{" "}
            Dataset released publicly on{" "}
            <a
              href="https://flywire.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              FlyWire.ai
            </a>{" "}
            &amp;{" "}
            <a
              href="https://connectome.janelia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              connectome.janelia.org
            </a>
            . This interactive studio was independently developed for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [globalSpikeRate, setGlobalSpikeRate] = useState(775500);
  const [dopamineLevel, setDopamineLevel] = useState(0.62);
  const [lifEngineHz, setLifEngineHz] = useState(60);

  // Simulate live telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalSpikeRate((v) => Math.max(400000, Math.min(1200000, v + (Math.random() - 0.5) * 8000)));
      setDopamineLevel((v) => Math.max(0.1, Math.min(0.95, v + (Math.random() - 0.5) * 0.04)));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#050508]">
      {/* Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={selectTab}
        globalSpikeRate={globalSpikeRate}
        dopamineLevel={dopamineLevel}
        lifEngineHz={lifEngineHz}
        tabs={TABS}
      />

      {/* Content Area */}
      <main className="relative z-10 pt-[72px]">
        {activeTab === "home" && (
          <HeroSection onSelectTab={selectTab} />
        )}

        {activeTab !== "home" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Tab Header */}
            <div className="mb-8">
              {TABS.filter((t) => t.id === activeTab).map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-2xl border border-zinc-700/60 bg-zinc-900/80 flex items-center justify-center ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className={`text-2xl font-black tracking-tight text-white`}>{label}</h1>
                    <p className="text-xs font-mono text-zinc-500">
                      FlyBrain Connectome Studio · MaleCNS v1.0 · {(globalSpikeRate / 1000).toFixed(1)}k spikes/s
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "connectome" && <ConnectomeExplorer />}
            {activeTab === "stonkfly" && <StonkFlySimulator />}
            {activeTab === "embodied" && <EmbodiedFlySandbox />}
            {activeTab === "eli5" && <Eli5KnowledgeLab onSelectTab={(tab) => selectTab(tab as TabId)} />}
            {activeTab === "vault" && <ReelMediaVault />}
          </div>
        )}
      </main>

      {/* Floating Footer Bar */}
      <div className="sticky bottom-0 z-50 border-t border-zinc-800/60 bg-[#050508]/90 backdrop-blur-xl py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-zinc-400">
              LIF Engine: {lifEngineHz}Hz · {(globalSpikeRate / 1000).toFixed(1)}k spikes/s · PAM11 dopamine:{" "}
              <span className="text-amber-400">{(dopamineLevel * 100).toFixed(0)}%</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-600">
            <a
              href="https://flywire.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors flex items-center gap-1"
            >
              FlyWire Dataset <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/yournishaant/fruit-fly-connectome-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors flex items-center gap-1"
            >
              GitHub <GitFork className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
