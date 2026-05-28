import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const FEATURES = [
  {
    icon: "🎤", color: COLORS.emerald, bg: COLORS.emeraldBg,
    title: "AI Speaking Coach",
    desc: "Practice 1-on-1 with AI anytime you want. Pick a topic, speak naturally in English — the AI responds and keeps the conversation going.",
    tags: ["Natural dialogue", "Real-time response", "Any topic"],
  },
  {
    icon: "🗺️", color: COLORS.sky, bg: COLORS.skyBg,
    title: "Structured Roadmap",
    desc: "36 lessons organized from Beginner to Fluent. Each node focuses on a real-world topic with specific vocabulary, grammar, and speaking practice.",
    tags: ["36 lessons", "Beginner → Fluent", "Vocab & Grammar"],
  },
  {
    icon: "💬", color: COLORS.coral, bg: COLORS.coralBg,
    title: "Diverse Topics",
    desc: "From daily life to work, travel, and IELTS — practice exactly what you need. Every topic comes with real vocabulary and grammar structures.",
    tags: ["Daily life", "Work & Career", "IELTS"],
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: COLORS.cream, padding: "100px clamp(20px, 5vw, 80px)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: COLORS.emeraldBg, borderRadius: 99, padding: "5px 16px", marginBottom: 16, fontFamily: FONTS.body, fontSize: 13, color: COLORS.emeraldDark, fontWeight: 600 }}>Features</div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: COLORS.navy, letterSpacing: "-0.8px", marginBottom: 16 }}>
            Everything you need<br />to speak better English
          </h2>
          <p style={{ fontFamily: FONTS.body, fontSize: 17, color: COLORS.stone, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Two core tools, focused on one thing: helping you speak better every day.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {FEATURES.map(({ icon, color, bg, title, desc, tags }, i) => (
            <FeatureCard key={title} icon={icon} color={color} bg={bg} title={title} desc={desc} tags={tags} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, color, bg, title, desc, tags, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background: "white", borderRadius: 20, border: `1px solid ${COLORS.creamDark}`, padding: "28px 24px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: `all 0.5s ease ${delay}ms` }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>{icon}</div>
      <h3 style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: FONTS.body, fontSize: 14.5, color: COLORS.stone, lineHeight: 1.65, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color, background: bg, borderRadius: 99, padding: "4px 12px" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
