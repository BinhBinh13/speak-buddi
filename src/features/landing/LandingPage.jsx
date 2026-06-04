import { COLORS, FONTS, GOOGLE_FONTS_URL } from "../../shared/constants/theme";

// ── Shared components ──────────────────────────────────────────────
import PublicNavbar from "../../shared/components/PublicNavbar";
import PublicFooter from "../../shared/components/PublicFooter";

// ── Landing sections ───────────────────────────────────────────────
import HeroSection     from "./components/HeroSection";
import StatsBar        from "./components/StatsBar";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks      from "./components/HowItWorks";
import Testimonials    from "./components/Testimonials";
import PricingSection  from "./components/PricingSection";
import CTABanner       from "./components/CTABanner";

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: FONTS.body,
        background: COLORS.cream,
        overflowX: "hidden",
      }}
    >
      <link rel="stylesheet" href={GOOGLE_FONTS_URL} />

      <PublicNavbar />

      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <CTABanner />
      </main>

      <PublicFooter />
    </div>
  );
}
