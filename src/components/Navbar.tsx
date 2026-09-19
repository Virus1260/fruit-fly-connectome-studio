"use client";

import React from "react";
import {
  Activity,
  Brain,
  TrendingUp,
  Cpu,
  Bug,
  Video,
  MessageSquareMore,
  Zap,
  Sparkles,
  Home,
} from "lucide-react";

export type TabId = "home" | "stonkfly" | "connectome" | "embodied" | "eli5" | "vault";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  color: string;
}

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: TabId) => void;
  globalSpikeRate: number;
  dopamineLevel: number;
  lifEngineHz: number;
  tabs: readonly Tab[];
}

export default function Navbar({
  activeTab,
  onSelectTab,
  globalSpikeRate,
  dopamineLevel,
  lifEngineHz,
  tabs,
}: NavbarProps) {
  const dopaminePulse = dopamineLevel > 0.65;

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/60 bg-[#050508]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand */}
        <button onClick={() => onSelectTab("home")} className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-shadow">
            <Brain className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white">
                FlyBrain{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Connectome
                </span>{" "}
                Studio
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-1.5 py-0.5 text-[9px] font-mono font-medium text-emerald-300">
                MaleCNS v1.0
              </span>
            </div>
            <p className="text-[10px] text-zinc-500">166,691 neurons · Google Research × HHMI Janelia · Cell (2026)</p>
          </div>
        </button>

        {/* Live Telemetry Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <div
            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 transition-all duration-500 ${
              dopaminePulse
                ? "border-amber-400/60 bg-amber-950/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                : "border-zinc-800 bg-zinc-900/70 text-zinc-400"
            }`}
          >
            <Sparkles className={`h-3 w-3 ${dopaminePulse ? "text-amber-400" : "text-zinc-600"}`} />
            <span className="font-mono text-[10px]">PAM11</span>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                dopaminePulse ? "bg-amber-400 animate-pulse" : "bg-zinc-700"
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-zinc-300">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span className="font-mono text-[10px] text-cyan-300">
              {(globalSpikeRate / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] text-zinc-500">spikes/s</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-emerald-300">
            <Cpu className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] font-mono">LIF {lifEngineHz}Hz</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center space-x-0.5 overflow-x-auto pb-1.5 no-scrollbar">
          {/* Home Tab */}
          <button
            onClick={() => onSelectTab("home")}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
              activeTab === "home"
                ? "border border-zinc-700/60 bg-zinc-800 text-white"
                : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Overview</span>
          </button>

          {tabs
            .filter((t) => t.id !== "home")
            .map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => onSelectTab(id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                  activeTab === id
                    ? `border bg-zinc-800/80 text-white ${
                        id === "stonkfly"   ? "border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.15)]" :
                        id === "connectome" ? "border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.15)]" :
                        id === "embodied"   ? "border-orange-500/40 shadow-[0_0_8px_rgba(249,115,22,0.15)]" :
                        id === "eli5"       ? "border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.15)]" :
                        id === "vault"      ? "border-pink-500/40 shadow-[0_0_8px_rgba(236,72,153,0.15)]" :
                        "border-zinc-700"
                      }`
                    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${activeTab === id ? color : ""}`} />
                <span>{label}</span>
                {id === "stonkfly" && (
                  <span className="rounded bg-amber-500/20 px-1 text-[8px] font-bold text-amber-400">
                    VIRAL
                  </span>
                )}
              </button>
            ))}
        </nav>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  );
}
