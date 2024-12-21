import { ComparisonSection } from "@/components/comparision-section";
import { FeaturesSection } from "@/components/feature-section";
import { Header } from "@/components/header";
import { HowItWorks } from "@/components/how-it-works";
import { HeroSection } from "@/components/landing-page/hero-section";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen px-8">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <ComparisonSection />
        <div className="text-center text-black w-full grid place-items-center mb-7">
          <p>Made with 💙 by <Link href="https://github.com/Shivam-Katare">Shivam Katare</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
