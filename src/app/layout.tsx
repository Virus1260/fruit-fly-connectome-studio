import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlyBrain Connectome Studio — 166,691 Neuron Drosophila Simulation",
  description:
    "Interactive simulation of the complete male Drosophila melanogaster brain connectome. Explore 166,691 neurons, 125M synapses, StonkFly Bitcoin trading, LIF dynamics, and community experiments from the publicly released MaleCNS v1.0 dataset.",
  keywords: [
    "fruit fly brain",
    "connectome",
    "Drosophila melanogaster",
    "neuroscience",
    "spiking neural network",
    "LIF simulation",
    "Google Research",
    "HHMI Janelia",
    "FlyWire",
    "StonkFly",
    "MaleCNS",
    "brain simulation",
    "neuromorphic AI",
  ],
  authors: [{ name: "FlyBrain Connectome Studio" }],
  openGraph: {
    title: "FlyBrain Connectome Studio — Drosophila Brain Map Explorer",
    description:
      "Interactive 166,691-neuron fruit fly brain simulation with StonkFly Bitcoin trading, LIF oscilloscope, and embodied sensorimotor sandbox.",
    type: "website",
    locale: "en_US",
    siteName: "FlyBrain Connectome Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyBrain Connectome Studio",
    description:
      "Explore Google's complete Drosophila brain connectome — 166,691 neurons live in your browser.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050508",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#050508] text-zinc-100"
      >
        {children}
      </body>
    </html>
  );
}
