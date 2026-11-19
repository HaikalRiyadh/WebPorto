import { SplineSceneBasic } from "@/components/ui/demo";
import IntegrationHero from "@/components/ui/integration-hero";
import CircularTestimonialsDemo from "@/components/ui/circular-testimonials-demo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-8 space-y-16">
      <div className="w-full max-w-6xl">
        <SplineSceneBasic />
      </div>
      <div className="w-full max-w-6xl">
        <IntegrationHero />
      </div>
      <div className="w-full max-w-6xl">
        <CircularTestimonialsDemo />
      </div>
    </main>
  );
}
