"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Download,
  Clock,
  Sparkles,
  BookOpen,
  Info,
  Flame,
  Layers,
  Code2,
  FileCode,
} from "lucide-react";
import { REEL_TRANSCRIPTS, REEL2_TRANSCRIPTS, TranscriptSegment } from "@/data/transcriptData";

export default function ReelMediaVault() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedReel, setSelectedReel] = useState<"reel1" | "reel2">("reel1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(81.57);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [selectedDossier, setSelectedDossier] = useState<string>("prd");

  const currentTranscriptList: TranscriptSegment[] =
    selectedReel === "reel1" ? REEL_TRANSCRIPTS : REEL2_TRANSCRIPTS;

  const currentMediaSrc =
    selectedReel === "reel1"
      ? "/media/reel_DdX_J5ovev8.mp4"
      : "/media/reel_DdeCyNIqBWz.mp4";

  // When switching reels, reset playback state
  const handleSwitchReel = (reel: "reel1" | "reel2") => {
    setSelectedReel(reel);
    setCurrentTime(0);
    setActiveSegmentIndex(0);
    setIsPlaying(false);
    setDuration(reel === "reel1" ? 81.57 : 96.02);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    const index = currentTranscriptList.findIndex(
      (seg) => time >= seg.timeStart && time < seg.timeEnd
    );
    if (index !== -1 && index !== activeSegmentIndex) {
      setActiveSegmentIndex(index);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekToSegment = (timeStart: number, index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeStart;
    setCurrentTime(timeStart);
    setActiveSegmentIndex(index);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-zinc-950 to-purple-950/30 p-8">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-medium text-cyan-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Media & Field Intelligence Vault
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Viral Instagram Reels & Spec-Driven Engineering Dossiers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            Archived from creator <span className="font-semibold text-cyan-400">@yournishaant</span>.
            Toggle between Reel 1 (Google Fruit Fly Connectome, 166.7k neurons, StonkFly) and Reel 2
            (The 6 Essential Spec Files for AI Coding: PRD, Architecture, Rules, Design, Tasks, Memory).
          </p>

          {/* Reel Toggle Selector */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleSwitchReel("reel1")}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                selectedReel === "reel1"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25"
                  : "border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white"
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              Reel 1: Connectome & StonkFly (81s)
            </button>
            <button
              onClick={() => handleSwitchReel("reel2")}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                selectedReel === "reel2"
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white"
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              Reel 2: 6 AI Spec Files Framework (96s)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Video Player + Interactive Synced Transcript */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Video Player Column */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Play className="h-4 w-4 text-cyan-400" />
                {selectedReel === "reel1" ? "Reel 1: Brain Connectome" : "Reel 2: AI Coding Framework"}
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">
                720x1280 (9:16) • {formatTime(duration)}
              </span>
            </div>

            {/* Video Container */}
            <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl border border-zinc-700/80 bg-black shadow-2xl">
              <video
                key={currentMediaSrc}
                ref={videoRef}
                src={currentMediaSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration || (selectedReel === "reel1" ? 81.57 : 96.02));
                }}
                onEnded={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
                playsInline
              />

              {/* Play / Pause Center Overlay Button */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
              >
                <div className="h-16 w-16 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                  {isPlaying ? (
                    <Pause className="h-7 w-7 fill-white" />
                  ) : (
                    <Play className="h-7 w-7 fill-white translate-x-0.5" />
                  )}
                </div>
              </button>

              {/* In-Video Active Caption Pill */}
              <div className="absolute bottom-4 inset-x-3 rounded-xl bg-black/85 backdrop-blur-md p-3 border border-white/10 text-xs text-white">
                <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5 mb-1">
                  <Flame className="h-3 w-3 text-amber-400" />
                  {currentTranscriptList[activeSegmentIndex]?.visualCue}
                </div>
                <div className="line-clamp-2 text-zinc-200">
                  {currentTranscriptList[activeSegmentIndex]?.english}
                </div>
              </div>
            </div>
          </div>

          {/* Media Player Controls */}
          <div className="mt-6 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCurrentTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-zinc-400">{formatTime(duration)}</span>
            </div>

            {/* Buttons Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-white hover:bg-zinc-700 transition-all"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => seekToSegment(0, 0)}
                  className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-zinc-300 hover:text-white transition-all"
                  title="Restart"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-zinc-300 hover:text-white transition-all"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>

              <a
                href={currentMediaSrc}
                download={selectedReel === "reel1" ? "fruit_fly_connectome_reel1.mp4" : "ai_coding_framework_reel2.mp4"}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                Download MP4
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Transcript Column */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-md lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                Synchronized Transcript & Neural Annotations
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">
                Click any timestamp to seek video
              </span>
            </div>

            {/* Scrollable Transcript List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              {currentTranscriptList.map((seg, idx) => {
                const isActive = idx === activeSegmentIndex;

                return (
                  <div
                    key={idx}
                    onClick={() => seekToSegment(seg.timeStart, idx)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isActive
                        ? "border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40"
                        : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-800/40"
                    }`}
                  >
                    {/* Header line with timestamp and visual cue */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-cyan-300">
                        <Clock className="h-3 w-3" />
                        {seg.timeLabel}
                      </div>

                      <div className="text-[11px] font-mono text-zinc-400 line-clamp-1">
                        {seg.visualCue}
                      </div>
                    </div>

                    {/* Original Hindi / Hinglish */}
                    <p className="text-xs text-zinc-300 font-sans italic mb-2 leading-relaxed">
                      "{seg.hindi}"
                    </p>

                    {/* Annotated English */}
                    <p className="text-xs text-white font-medium mb-3 leading-relaxed">
                      {seg.english}
                    </p>

                    {/* Scientific Annotation */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-2.5 text-[11px] font-mono text-emerald-300 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-emerald-400" />
                      <span>{seg.annotation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dossier Documentation Reader */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-400" />
              Archived Specifications & Research Dossiers
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Read the complete 6 spec-driven files created per Reel 2 along with scientific briefs.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "prd", label: "PRD.md" },
              { id: "arch", label: "ARCHITECTURE.md" },
              { id: "rules", label: "RULES.md" },
              { id: "design", label: "DESIGN.md" },
              { id: "tasks", label: "TASKS.md" },
              { id: "memory", label: "MEMORY.md" },
              { id: "reddit", label: "Reddit ELI5" },
              { id: "google", label: "Google Brief" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDossier(d.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedDossier === d.id
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dossier Content Viewer */}
        <div className="rounded-2xl border border-zinc-800 bg-black/60 p-6 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto max-h-[380px] overflow-y-auto">
          {selectedDossier === "prd" && (
            <div className="space-y-3">
              <div className="text-emerald-400 font-bold text-sm"># Product Requirements Document (PRD.md)</div>
              <p><strong>Problem:</strong> Connectome datasets are massive (166k neurons, 125M synapses) and lack interactive, low-barrier web-based simulation environments.</p>
              <p><strong>Solution:</strong> FlyBrain Connectome Studio delivers client-side 60 FPS Leaky Integrate-and-Fire simulation, StonkFly Bitcoin quant trading, and embodied sensorimotor physics.</p>
            </div>
          )}

          {selectedDossier === "arch" && (
            <div className="space-y-3">
              <div className="text-cyan-400 font-bold text-sm"># System Architecture & Technical Flow (ARCHITECTURE.md)</div>
              <p><strong>Stack:</strong> Next.js 16+ App Router, Tailwind CSS v4, TypeScript 5+, Canvas 2D/WebGL.</p>
              <p><strong>Pipeline:</strong> Visual Candlestick / Sensory Input → Retinotopic Transduction (320x180) → LIF Numerical Solver → PAM11/PPL101 Dopamine Plasticity → Descending Motor Actuators.</p>
            </div>
          )}

          {selectedDossier === "rules" && (
            <div className="space-y-3">
              <div className="text-amber-400 font-bold text-sm"># AI Agent Engineering & Coding Rules (RULES.md)</div>
              <p><strong>Zero Mock Placeholders:</strong> Every UI element has active simulation state or deterministic fallback.</p>
              <p><strong>Strict TypeScript:</strong> Zero `any` or `@ts-ignore` allowed. Full discriminated unions for actions and neuropils.</p>
            </div>
          )}

          {selectedDossier === "design" && (
            <div className="space-y-3">
              <div className="text-pink-400 font-bold text-sm"># Design System (DESIGN.md)</div>
              <p><strong>Aesthetic:</strong> Bioluminescent Cyber-Neuroscience on deep void background (#050508).</p>
              <p><strong>Tokens:</strong> Emerald (#10b981), Cyan (#06b6d4), Amber Dopamine (#f59e0b), Crimson (#ef4444).</p>
            </div>
          )}

          {selectedDossier === "tasks" && (
            <div className="space-y-3">
              <div className="text-orange-400 font-bold text-sm"># Implementation Tasks & Roadmap (TASKS.md)</div>
              <p><strong>Milestones:</strong> Phase 1 Archival (Done) → Phase 2 Next.js Engine (Done) → Phase 3 Labs & StonkFly (Done) → Phase 4 6-File Framework (Done) → Phase 5 Deployment.</p>
            </div>
          )}

          {selectedDossier === "memory" && (
            <div className="space-y-3">
              <div className="text-purple-400 font-bold text-sm"># Agent Memory & Bug Log (MEMORY.md)</div>
              <p><strong>Key Decisions:</strong> Client-side LIF in TypeScript vs server HPC; dual viral reel archival; retinotopic compound eye projection.</p>
              <p><strong>Resolved Bugs:</strong> Fixed directory collisions, CSS import order, and Lucide React icon exports.</p>
            </div>
          )}

          {selectedDossier === "reddit" && (
            <div className="space-y-3">
              <div className="text-blue-400 font-bold text-sm"># Reddit ELI5 Analysis: How Did They Turn It On?</div>
              <p>1. Connectome is a directed graph: 166,691 nodes, 125,000,000 edges.</p>
              <p>2. Differential equation: τₘ (dV/dt) = -(V - V_rest) + R ∑ W S + I_ext.</p>
              <p>3. StonkFly trades BTC/USDC with 15 PAM11 dopamine reward neurons and 2 PPL101 penalty neurons.</p>
            </div>
          )}

          {selectedDossier === "google" && (
            <div className="space-y-3">
              <div className="text-teal-400 font-bold text-sm"># Google Research & HHMI Janelia MaleCNS v1.0 (Cell 2026)</div>
              <p>Serial-section transmission electron microscopy (ssTEM) at 40nm resolution segmented with 3D Flood-Filling Networks (FFNs).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
