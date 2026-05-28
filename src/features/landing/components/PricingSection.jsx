import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const PLANS = [
  {
    name: "Free",
    price: 0,
    unit: "",
    features: [
      "Full access to the learning roadmap",
      "Unlimited AI speaking practice",
      "36 lessons from Beginner to Fluent",
      "Free topic conversations",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: 129000,
    unit: "/month",
    features: [
      "Everything in Free",
      "Priority access to new features",
      "Direct support",
      "Early access: Vocabulary, Analytics, Schedule",
    ],
    cta: "Try free for 7 days",
    highlight: true,
    badge: "Coming soon",
  },
];

export default function PricingSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: COLORS.cream, padding: "100px clamp(20px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 56, opacity: inView ? 1 : 0, transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: COLORS.emeraldBg, borderRadius: 99, padding: "5px 16px", marginBottom: 16, fontFamily: FONTS.body, fontSize: 13, color: COLORS.emeraldDark, fontWeight: 600 }}>Pricing</div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: COLORS.navy, letterSpacing: "-0.8px", marginBottom: 16 }}>Start completely free</h2>
          <p style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.stone, maxWidth: 440, margin: "0 auto" }}>
            All core features are free. Upgrade to Pro for early access to upcoming features.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {PLANS.map((plan, i) => <PlanCard key={plan.name} {...plan} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ name, price, unit, features, cta, highlight, badge, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background: highlight ? COLORS.navy : "white", borderRadius: 20, border: highlight ? "none" : `1px solid ${COLORS.creamDark}`, padding: "32px 28px", position: "relative", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `all 0.5s ease ${delay}ms` }}>
      {badge && (
        <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.emerald, color: "white", fontFamily: FONTS.body, fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>{badge}</div>
      )}
      <div style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: highlight ? "rgba(255,255,255,0.5)" : COLORS.stone, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span style={{ fontFamily: FONTS.display, fontSize: 42, fontWeight: 700, color: highlight ? "white" : COLORS.navy, lineHeight: 1 }}>
          {price === 0 ? "Free" : price.toLocaleString("vi-VN") + "đ"}
        </span>
        {unit && <span style={{ fontFamily: FONTS.body, fontSize: 14, color: highlight ? "rgba(255,255,255,0.5)" : COLORS.stone }}>{unit}</span>}
      </div>
      <div style={{ height: 1, background: highlight ? "rgba(255,255,255,0.1)" : COLORS.creamDark, margin: "20px 0" }} />
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
        {features.map((f) => (
          <li key={f} style={{ fontFamily: FONTS.body, fontSize: 14, color: highlight ? "rgba(255,255,255,0.75)" : COLORS.navyMid, padding: "7px 0", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ color: COLORS.emeraldLight, fontSize: 16, flexShrink: 0 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <button style={{ width: "100%", padding: "13px 0", background: highlight ? COLORS.emerald : "transparent", color: highlight ? "white" : COLORS.navy, border: highlight ? "none" : `1.5px solid ${COLORS.creamDark}`, borderRadius: 12, fontFamily: FONTS.body, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
        {cta}
      </button>
    </div>
  );
}
