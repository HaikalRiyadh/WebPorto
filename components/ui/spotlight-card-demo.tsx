import { GlowCard } from "@/components/ui/spotlight-card";

export function Default() {
  return (
    <div className="w-full min-h-[400px] flex flex-row flex-wrap items-center justify-center gap-10 p-6 custom-cursor">
      <GlowCard glowColor="blue">
        <div className="flex flex-col justify-between h-full p-2">
          <h3 className="text-lg font-bold text-white">Interactive Card</h3>
          <p className="text-xs text-neutral-400">Move your pointer across to trigger the reactive glow.</p>
        </div>
      </GlowCard>
      <GlowCard glowColor="purple">
        <div className="flex flex-col justify-between h-full p-2">
          <h3 className="text-lg font-bold text-white">Dynamic Hue</h3>
          <p className="text-xs text-neutral-400">Hue shifts smoothly based on horizontal coordinates.</p>
        </div>
      </GlowCard>
      <GlowCard glowColor="green">
        <div className="flex flex-col justify-between h-full p-2">
          <h3 className="text-lg font-bold text-white">Spotlight Border</h3>
          <p className="text-xs text-neutral-400">Masked border spotlight highlights card contour.</p>
        </div>
      </GlowCard>
    </div>
  );
}
