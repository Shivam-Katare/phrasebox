import { Header } from "@/components/header";
import { HeroSection } from "@/components/landing-page/hero-section";

export default function Home() {
  return (
    <div className="relative min-h-screen px-8">
    <Header />
    <main>
      <HeroSection />
    </main>
  </div>
  );
}
