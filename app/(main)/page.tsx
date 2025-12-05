import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { AiAssistantSection } from "@/components/home/ai-assistant-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiAssistantSection />
      <CTASection />
    </div>
  );
}
