import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ListingsSection from "@/components/ListingsSection";
import CTA from "@/components/CTA";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <ListingsSection />
      <MapSection />
      <CTA />
    </div>
  );
}
