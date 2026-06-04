import { COLORS, FONTS } from "../constants/theme";

// ── Config ──────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Product: [
    { label: "Features",   href: "#features"   },
    { label: "Roadmap",    href: "#roadmap"     },
    { label: "Pricing",    href: "#pricing"     },
    { label: "Community",  href: "#community"   },
  ],
  Learn: [
    { label: "Beginner",       href: "#" },
    { label: "Intermediate",   href: "#" },
    { label: "Advanced",       href: "#" },
    { label: "IELTS Speaking", href: "#" },
  ],
  Company: [
    { label: "About",   href: "#" },
    { label: "Blog",    href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

const SOCIALS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ── Component ───────────────────────────────────────────────────────
export default function PublicFooter() {
  return (
    <footer
      style={{
        background: COLORS.cream,
        borderTop: `1px solid ${COLORS.creamDark}`,
        padding: "64px clamp(20px, 5vw, 80px) 32px",
      }}
    >
      <style>{`
        .footer-top {
          max-width: 1160px;
          margin: 0 auto;
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
        }
        .footer-link { color: ${COLORS.stone}; text-decoration: none; font-family: ${FONTS.body}; font-size: 14px; transition: color 0.15s; }
        .footer-link:hover { color: ${COLORS.emerald}; }
        .footer-social-btn { color: ${COLORS.stone}; transition: all 0.15s; }
        .footer-social-btn:hover { color: ${COLORS.emeraldDark}; background: ${COLORS.emeraldBg} !important; border-color: ${COLORS.emeraldBg2} !important; }
        .footer-bottom-link { color: ${COLORS.stoneLight}; text-decoration: none; font-family: ${FONTS.body}; font-size: 13px; transition: color 0.15s; }
        .footer-bottom-link:hover { color: ${COLORS.navy}; }

        @media (max-width: 640px) {
          .footer-top { gap: 32px; }
          .footer-brand-col { max-width: 100% !important; }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      {/* ── Top grid ── */}
      <div className="footer-top">

        {/* Brand col */}
        <div
          className="footer-brand-col"
          style={{ flex: "1 1 260px", maxWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div
              style={{
                width: 34, height: 34, borderRadius: 10,
                background: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.emeraldLight})`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="8"  cy="12" r="2" fill="white" />
                <circle cx="12" cy="9"  r="2" fill="white" />
                <circle cx="16" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: FONTS.display, fontSize: 19, fontWeight: 700,
                color: COLORS.navy, letterSpacing: "-0.3px",
              }}
            >
              SpeakBuddi
            </span>
          </a>

          <p
            style={{
              fontFamily: FONTS.body, fontSize: 14,
              color: COLORS.stone, lineHeight: 1.65, margin: 0,
            }}
          >
            Practice English speaking with AI — anytime, anywhere.
            Follow a structured path from Beginner to Fluent.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="footer-social-btn"
                style={{
                  width: 36, height: 36, borderRadius: 9,
                  border: `1px solid ${COLORS.creamDark}`,
                  background: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group} style={{ flex: "0 0 auto", minWidth: 120 }}>
            <p
              style={{
                fontFamily: FONTS.body, fontSize: 11, fontWeight: 700,
                color: COLORS.navy, letterSpacing: "0.08em",
                textTransform: "uppercase", margin: "0 0 16px",
              }}
            >
              {group}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          maxWidth: 1160, margin: "48px auto 28px",
          height: 1, background: COLORS.creamDark,
        }}
      />

      {/* ── Bottom bar ── */}
      <div
        className="footer-bottom"
        style={{
          maxWidth: 1160, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}
      >
        <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.stoneLight, margin: 0 }}>
          © {new Date().getFullYear()} SpeakBuddi. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Terms", "Privacy", "Cookies"].map((item) => (
            <a key={item} href="#" className="footer-bottom-link">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
