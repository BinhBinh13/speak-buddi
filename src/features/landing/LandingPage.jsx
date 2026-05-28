import { COLORS, FONTS, GOOGLE_FONTS_URL } from "../../shared/constants/theme";

// ── Shared components ──────────────────────────────────────────────────────────
import PublicNavbar from "../../shared/components/PublicNavbar";
import PublicFooter from "../../shared/components/PublicFooter";

// ── Feature sections (landing-specific) ───────────────────────────────────────
import HeroSection    from "./components/HeroSection";
import StatsBar       from "./components/StatsBar";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks     from "./components/HowItWorks";
import Testimonials   from "./components/Testimonials";
import PricingSection from "./components/PricingSection";
import CTABanner      from "./components/CTABanner";

/**
 * LandingPage – Trang chủ / giới thiệu sản phẩm SpeakBuddi
 * Đây là page-level component, được đặt trong router hoặc App.jsx
 *
 * Cấu trúc:
 *   PublicNavbar
 *   ├── HeroSection        (headline + demo card)
 *   ├── StatsBar           (số liệu animated)
 *   ├── FeaturesSection    (6 tính năng)
 *   ├── HowItWorks         (4 bước)
 *   ├── Testimonials       (3 review)
 *   ├── PricingSection     (3 gói giá)
 *   └── CTABanner          (call to action cuối)
 *   PublicFooter
 */
export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: FONTS.body,
        background: COLORS.cream,
        overflowX: "hidden",
      }}
    >
      {/* Load Google Fonts */}
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
