"use client";

import { GlowCard } from "@/components/ui/spotlight-card";

export function AboutPhotoCard() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Hanging Clasp Assembly */}
      <div className="flex flex-col items-center z-20 -mb-2">
        <div className="w-2.5 h-10 bg-neutral-950 border-x border-cyan-400/50 rounded-sm"></div>
        <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-neutral-950 -mt-1 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full border border-cyan-500/40"></div>
        </div>
        <div className="w-2.5 h-3 -mt-0.5 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-b-sm"></div>
      </div>

      {/* Spotlight Glow Photo Card */}
      <GlowCard
        glowColor="blue"
        customSize
        className="w-56 aspect-[4/5] p-2 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner">
          <img
            src="/About Me.jpeg"
            alt="Haikal Riyadh Romadhon"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </GlowCard>
    </div>
  );
}

export function Default() {
  return <AboutPhotoCard />;
}
