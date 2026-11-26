'use client'

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function LiquidMetalButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <LiquidMetalButton label="Explore Portfolio" icon={<ArrowRight className="h-4 w-4" />} />
        <LiquidMetalButton label="Get in Touch" icon={<MessageSquare className="h-4 w-4 text-emerald-400" />} />
        <LiquidMetalButton label="Explore Featured Projects" size="lg" />
        <LiquidMetalButton viewMode="icon" aria-label="Sparkle action" />
      </div>
    </div>
  );
}
