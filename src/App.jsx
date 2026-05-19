import { useMotion } from "./hooks/useMotion";
import TopBar from "@components/TopBar";
import Navigation from "@components/Navigation";
import Hero from "@components/Hero";
import ProblemSection from "@components/ProblemSection";
import SolutionSection from "@components/SolutionSection";
import ValueProposition from "@components/ValueProposition";
import Features from "@components/Features";
import HowItWorks from "@components/HowItWorks";
import UseCases from "@components/UseCases";
import Industries from "@components/Industries";
import WooCommerceIntegration from "@components/WooCommerceIntegration";
import Analytics from "@components/Analytics";
import Comparison from "@components/Comparison";
import SocialProof from "@components/SocialProof";
import Pricing from "@components/Pricing";
import FAQ from "@components/FAQ";
import FinalCTA from "@components/FinalCTA";
import Footer from "@components/Footer";

export default function App() {
  useMotion();

  return (
    <>
      <TopBar />
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ValueProposition />
        <Features />
        <HowItWorks />
        <UseCases />
        <Industries />
        <WooCommerceIntegration />
        <Analytics />
        <Comparison />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
