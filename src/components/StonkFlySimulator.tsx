"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Sliders,
  DollarSign,
  Flame,
} from "lucide-react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradeLog {
  id: string;
  time: string;
  action: "BUY" | "SELL" | "HOLD";
  price: number;
  pnl?: number;
  reason: string;
  dopamineLevel: number;
}

interface StonkFlySimulatorProps {
  onDopamineChange?: (active: boolean) => void;
  onSpikeRateChange?: (rate: number) => void;
}

export default function StonkFlySimulator({
  onDopamineChange,
  onSpikeRateChange,
}: StonkFlySimulatorProps) {
  // Financial State
  const [balance, setBalance] = useState<number>(100.0);
  const [btcHoldings, setBtcHoldings] = useState<number>(0.0);
  const [btcPrice, setBtcPrice] = useState<number>(64250.0);
  const [lastBuyPrice, setLastBuyPrice] = useState<number>(0);
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);

  // Connectome State
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [dopaminePamLevel, setDopaminePamLevel] = useState<number>(65); // 15 PAM11 neurons (0-100)
  const [aversivePplLevel, setAversivePplLevel] = useState<number>(12); // 2 PPL101 neurons (0-100)
  const [spikeRate, setSpikeRate] = useState<number>(775500); // 775.5k spikes/s
  const [currentDecision, setCurrentDecision] = useState<"BUY" | "SELL" | "HOLD">("HOLD");

  // Canvas Refs
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rasterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const retinaCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Candles History
  const [candles, setCandles] = useState<Candle[]>(() => {
    let p = 64000;
    const initial: Candle[] = [];
    for (let i = 0; i < 35; i++) {
      const change = (Math.random() - 0.48) * 180;
      const open = p;
      const close = p + change;
      const high = Math.max(open, close) + Math.random() * 80;
      const low = Math.min(open, close) - Math.random() * 80;
      p = close;
      initial.push({
        time: `${10 + Math.floor(i / 6)}:${(i * 2) % 60 < 10 ? "0" : ""}${(i * 2) % 60}`,
        open,
        high,
        low,
        close,
      });
    }
    return initial;
  });

  // Calculate Portfolio Value
  const totalValue = balance + btcHoldings * btcPrice;
  const totalPnL = totalValue - 100.0;
  const pnlPercent = ((totalPnL / 100.0) * 100).toFixed(2);

  // Synchronize global telemetry
  useEffect(() => {
    if (onSpikeRateChange) onSpikeRateChange(spikeRate);
    if (onDopamineChange) onDopamineChange(dopaminePamLevel > 75);
  }, [spikeRate, dopaminePamLevel, onSpikeRateChange, onDopamineChange]);

  // Main Connectome Engine Loop (Tick every 1.4s)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // 1. Tick Price
      const delta = (Math.random() - 0.49) * (btcPrice * 0.005);
      const newPrice = Math.max(30000, Math.round((btcPrice + delta) * 100) / 100);
      setBtcPrice(newPrice);

      // Add Candle update
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const newCandle: Candle = {
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          open: last.close,
          close: newPrice,
          high: Math.max(last.close, newPrice) + Math.random() * 40,
          low: Math.min(last.close, newPrice) - Math.random() * 40,
        };
        return [...prev.slice(1), newCandle];
      });

      // 2. Simulated Photoreceptor Retinotopic Firing
      // Compute optical contrast: green candles stimulate dorsal photoreceptors; red stimulate ventral
      const isGreen = newPrice >= btcPrice;
      const baseSpikes = 760000 + Math.random() * 32000;
      setSpikeRate(Math.round(baseSpikes));

      // 3. Connectome Decision Logic (LIF Spiking Integration)
      // Descending Neurons integrate photoreceptor activity + dopamine gating
      const buyScore = (isGreen ? 0.65 : 0.2) + (dopaminePamLevel / 200) + Math.random() * 0.3;
      const sellScore = (!isGreen ? 0.65 : 0.15) + (aversivePplLevel / 200) + Math.random() * 0.3;

      let decision: "BUY" | "SELL" | "HOLD" = "HOLD";

      if (buyScore > 0.85 && balance >= 10) {
        decision = "BUY";
        // Execute 10 USDC Buy order (exact rule in StonkFly)
        const buyAmountUSDC = 10;
        const btcBought = buyAmountUSDC / newPrice;
        setBalance((b) => b - buyAmountUSDC);
        setBtcHoldings((h) => h + btcBought);
        setLastBuyPrice(newPrice);
        setDopaminePamLevel((d) => Math.min(100, d + 8));
        setAversivePplLevel((a) => Math.max(5, a - 5));

        setTradeLogs((logs) => [
          {
            id: Math.random().toString(36).substring(7),
            time: new Date().toLocaleTimeString(),
            action: "BUY",
            price: newPrice,
            reason: "DNp01 threshold crossed (10 USDC order)",
            dopamineLevel: dopaminePamLevel,
          },
          ...logs.slice(0, 19),
        ]);
      } else if (sellScore > 0.85 && btcHoldings > 0.00001) {
        decision = "SELL";
        // Sell all holdings
        const proceeds = btcHoldings * newPrice;
        const tradeProfit = proceeds - (btcHoldings * lastBuyPrice);
        setBalance((b) => b + proceeds);
        setBtcHoldings(0);

        if (tradeProfit > 0) {
          // Trigger PAM11 Dopamine reinforcement
          setDopaminePamLevel((d) => Math.min(100, d + 22));
          setAversivePplLevel((a) => Math.max(5, a - 10));
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#f59e0b", "#10b981", "#06b6d4"],
          });
        } else {
          // Trigger PPL101 Aversive punishment
          setAversivePplLevel((a) => Math.min(100, a + 25));
          setDopaminePamLevel((d) => Math.max(10, d - 18));
        }

        setTradeLogs((logs) => [
          {
            id: Math.random().toString(36).substring(7),
            time: new Date().toLocaleTimeString(),
            action: "SELL",
            price: newPrice,
            pnl: tradeProfit,
            reason: tradeProfit > 0 ? "PAM11 Dopamine Reward (+PnL)" : "PPL101 Aversion Stop (-PnL)",
            dopamineLevel: dopaminePamLevel,
          },
          ...logs.slice(0, 19),
        ]);
      } else {
        decision = "HOLD";
        // Natural dopamine decay
        setDopaminePamLevel((d) => Math.max(20, d * 0.98));
        setAversivePplLevel((a) => Math.max(10, a * 0.98));
      }

      setCurrentDecision(decision);
    }, 1400);

    return () => clearInterval(interval);
  }, [isSimulating, btcPrice, balance, btcHoldings, dopaminePamLevel, aversivePplLevel, lastBuyPrice]);

  // Render Candlestick Canvas
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 240);

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Candle Scaling
    const prices = candles.flatMap((c) => [c.high, c.low]);
    const minP = Math.min(...prices) * 0.999;
    const maxP = Math.max(...prices) * 1.001;
    const range = maxP - minP || 1;

    const candleWidth = width / candles.length;

    candles.forEach((c, i) => {
      const x = i * candleWidth + candleWidth / 2;
      const isUp = c.close >= c.open;
      const color = isUp ? "#10b981" : "#ef4444";

      const yHigh = height - ((c.high - minP) / range) * (height - 40) - 20;
      const yLow = height - ((c.low - minP) / range) * (height - 40) - 20;
      const yOpen = height - ((c.open - minP) / range) * (height - 40) - 20;
      const yClose = height - ((c.close - minP) / range) * (height - 40) - 20;

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Body
      ctx.fillStyle = color;
      const bodyY = Math.min(yOpen, yClose);
      const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
      ctx.fillRect(x - candleWidth * 0.35, bodyY, candleWidth * 0.7, bodyH);
    });
  }, [candles]);

  // Render 96-Cell Neural Spike Raster Canvas (Exact metric from Reel!)
  useEffect(() => {
    const canvas = rasterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 110);
    const channels = 32;

    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    // Draw raster channel lines
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.5;
    for (let ch = 0; ch < channels; ch++) {
      const y = (ch / channels) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw live raster spikes
    const density = dopaminePamLevel > 70 ? 0.35 : 0.18;
    ctx.fillStyle = "#06b6d4"; // cyan spikes

    for (let x = 0; x < width; x += 3) {
      for (let ch = 0; ch < channels; ch++) {
        if (Math.random() < density) {
          const y = (ch / channels) * height;
          // highlight dopamine PAM rows in gold
          if (ch >= 12 && ch <= 16 && dopaminePamLevel > 50) {
            ctx.fillStyle = "#f59e0b";
          } else if (ch >= 28 && aversivePplLevel > 50) {
            ctx.fillStyle = "#ef4444";
          } else {
            ctx.fillStyle = "#06b6d4";
          }
          ctx.fillRect(x, y, 1.5, height / channels - 1);
        }
      }
    }
  }, [candles, dopaminePamLevel, aversivePplLevel]);

  // Render 320x180 Visual Retinotopic Compound Eye Simulation Canvas
  useEffect(() => {
    const canvas = retinaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = 160);
    const height = (canvas.height = 90);

    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, width, height);

    // Draw low-res ommatidia hexagons
    const cols = 20;
    const rows = 12;
    const cellW = width / cols;
    const cellH = height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Ommatidia activation based on candle position
        const active = Math.sin(c * 0.4 + r * 0.5 + Date.now() * 0.003) > 0.1;
        ctx.fillStyle = active
          ? (dopaminePamLevel > 60 ? "rgba(245, 158, 11, 0.75)" : "rgba(6, 182, 212, 0.7)")
          : "rgba(30, 41, 59, 0.4)";
        ctx.beginPath();
        ctx.arc(c * cellW + cellW / 2, r * cellH + cellH / 2, cellW * 0.38, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [candles, dopaminePamLevel]);

  // Trigger Events
  const triggerBullPump = () => {
    setBtcPrice((p) => Math.round(p * 1.052 * 100) / 100);
    setDopaminePamLevel(95);
    setAversivePplLevel(5);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const triggerFlashCrash = () => {
    setBtcPrice((p) => Math.round(p * 0.93 * 100) / 100);
    setAversivePplLevel(95);
    setDopaminePamLevel(10);
  };

  const injectDopamine = () => {
    setDopaminePamLevel(100);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ["#f59e0b"] });
  };

  const resetPortfolio = () => {
    setBalance(100.0);
    setBtcHoldings(0);
    setDopaminePamLevel(50);
    setAversivePplLevel(10);
    setTradeLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: StonkFly Connectome Header */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400">
                STONKFLY v1.0
              </span>
              <span className="text-xs text-slate-400">
                Coinbase Engineer Alex Wormuth Experiment
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Fruit Fly Brain Trading Bitcoin ($100 Fund)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Candlestick charts are projected at 320×180 into the fly&apos;s virtual optic lobes.
              Profitable trades release <span className="font-semibold text-amber-400">PAM11 Dopamine</span>,
              while drawdowns stimulate <span className="font-semibold text-red-400">PPL101 Aversive Neurons</span>.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="text-[10px] font-medium text-slate-400">PORTFOLIO VAL</div>
              <div className="text-lg font-bold text-white">${totalValue.toFixed(2)}</div>
              <div className={`text-[11px] font-semibold flex items-center ${Number(pnlPercent) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {Number(pnlPercent) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {pnlPercent}%
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="text-[10px] font-medium text-slate-400">BTC PRICE</div>
              <div className="text-lg font-bold text-cyan-300">${btcPrice.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Live Tick</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="text-[10px] font-medium text-slate-400">NEURAL ACTION</div>
              <div className={`text-lg font-bold ${
                currentDecision === "BUY" ? "text-emerald-400" : currentDecision === "SELL" ? "text-red-400" : "text-slate-400"
              }`}>
                {currentDecision}
              </div>
              <div className="text-[10px] text-slate-400">DNp01/02 Gating</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <div className="text-[10px] font-medium text-slate-400">SPIKE RATE</div>
              <div className="text-lg font-bold text-amber-400 font-mono">
                {(spikeRate / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-slate-400">spikes / sec</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Neural Raster */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Live Candlestick Chart + Controls */}
        <div className="space-y-6 lg:col-span-2">
          {/* Candlestick Canvas Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">
                  BTC/USDC Candlestick Stream (Visual Input Feed)
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-slate-400">Live Sensory Injection</span>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <canvas ref={chartCanvasRef} className="w-full" height={240} />
            </div>

            {/* Interactive Market Stimulus Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={triggerBullPump}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-all active:scale-95"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Pump (+5%)
                </button>

                <button
                  onClick={triggerFlashCrash}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/50 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/60 transition-all active:scale-95"
                >
                  <TrendingDown className="h-3.5 w-3.5" />
                  Crash (-7%)
                </button>

                <button
                  onClick={injectDopamine}
                  className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/50 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/60 transition-all active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Dopamine Pulse (+100µA)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSimulating
                      ? "border-cyan-500/30 bg-cyan-950/50 text-cyan-300"
                      : "border-slate-700 bg-slate-800 text-slate-300"
                  }`}
                >
                  {isSimulating ? "Pause Connectome" : "Resume"}
                </button>

                <button
                  onClick={resetPortfolio}
                  title="Reset $100 starting fund"
                  className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 96-Cell Neural Spike Raster Plot (from the reel!) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">
                    96-Cell Neural Spike Raster (Replay 0.73s)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time action potential spikes across 96 recorded connectome channels
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400">
                166,700 NEURONS EMULATED
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <canvas ref={rasterCanvasRef} className="w-full" height={110} />
            </div>
          </div>
        </div>

        {/* Right Col: Neuromodulation Center & Fly Eye Vision */}
        <div className="space-y-6">
          {/* Retinotopic Compound Eye Sensor Display */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Retinotopic Input (320×180)</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">800 Ommatidia</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="overflow-hidden rounded-xl border border-cyan-900/50 bg-black p-1 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <canvas ref={retinaCanvasRef} width={160} height={90} className="rounded" />
              </div>
              <p className="text-center text-[11px] text-slate-400">
                Downscaled candlestick image projected onto R1-R6 photoreceptors in the fly&apos;s lamina.
              </p>
            </div>
          </div>

          {/* Neuromodulation Meters: PAM11 vs PPL101 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Neuromodulatory Feedback</h3>
            </div>

            {/* PAM11 Reward Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> 15 PAM11 Neurons (Dopamine Reward)
                </span>
                <span className="font-mono font-bold text-amber-400">{dopaminePamLevel.toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-amber-950">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  style={{ width: `${dopaminePamLevel}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Fires when trades generate profit (+PnL reinforcement).
              </p>
            </div>

            {/* PPL101 Aversive Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-red-300 flex items-center gap-1">
                  <Flame className="h-3 w-3" /> 2 PPL101 Neurons (Aversive Penalty)
                </span>
                <span className="font-mono font-bold text-red-400">{aversivePplLevel.toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-red-950">
                <div
                  className="h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  style={{ width: `${aversivePplLevel}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Fires during drawdowns and trading fees (-PnL negative punishment).
              </p>
            </div>
          </div>

          {/* Connectome Trade Ledger */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Execution Ledger</h3>
              </div>
              <span className="text-[10px] text-slate-400">Last 20 Trades</span>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2 pr-1 text-xs">
              {tradeLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Awaiting descending neuron triggers...
                </div>
              ) : (
                tradeLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/60 p-2 text-[11px]"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                            log.action === "BUY"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="text-white">${log.price.toLocaleString()}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{log.reason}</div>
                    </div>
                    <div className="text-right">
                      {log.pnl !== undefined && (
                        <div className={`font-mono font-bold ${log.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {log.pnl >= 0 ? `+$${log.pnl.toFixed(2)}` : `-$${Math.abs(log.pnl).toFixed(2)}`}
                        </div>
                      )}
                      <div className="text-[9px] text-slate-500">{log.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
