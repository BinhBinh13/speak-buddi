import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "../constants/theme";
import { useScrolled } from "../hooks/useScrolled";

// ── Config ─────────────────────────────────────────────────────────
const PUBLIC_NAV_LINKS = ["Features", "Roadmap", "Pricing", "Community"];

const APP_NAV_ITEMS = [
  { label: "Dashboard",  path: "/dashboard"  },
  { label: "Speaking",   path: "/speaking"   },
  { label: "Vocabulary", path: "/vocabulary" },
  { label: "Progress",   path: "/analytics"  },
];

const APP_ROUTES = ["/dashboard", "/speaking", "/vocabulary", "/schedule", "/analytics"];

function isAppRoute(path) {
  return APP_ROUTES.some((r) => path.startsWith(r));
}

// ── Main ────────────────────────────────────────────────────────────
export default function PublicNavbar({
  user = { name: "M", streak: 0, level: "B1" },
  forcePath,
}) {
  const scrolled  = useScrolled(20);
  const pathname  = forcePath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const isApp     = isAppRoute(pathname);

  // Navbar luôn có nền sáng — tránh chữ biến mất khi hero section sáng màu
  const hasBg = scrolled || isApp;

  return (
    <nav
      style={{
        position: isApp ? "sticky" : "fixed",
        top: 0, left: 0, right: 0, zIndex: 100,
        background: hasBg ? "rgba(250,250,247,0.95)" : "rgba(250,250,247,0.0)",
        backdropFilter: hasBg ? "blur(14px)" : "none",
        borderBottom: hasBg ? `1px solid ${COLORS.creamDark}` : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        padding: "0 clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          height: 68, gap: 16,
        }}
      >
        <Logo />
        {isApp ? <AppNav pathname={pathname} /> : <PublicLinks />}
        {isApp ? <AppRight user={user} /> : <PublicCTA />}
      </div>
    </nav>
  );
}

// ── Logo ────────────────────────────────────────────────────────────
function Logo() {
  return (
    <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
      <div
        style={{
          width: 34, height: 34, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.emeraldLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
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
          fontFamily: FONTS.display, fontSize: 20, fontWeight: 700,
          color: COLORS.navy, letterSpacing: "-0.3px",
        }}
      >
        SpeakBuddi
      </span>
    </a>
  );
}

// ── Public nav links ────────────────────────────────────────────────
function PublicLinks() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
      {PUBLIC_NAV_LINKS.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          style={{
            fontFamily: FONTS.body, fontSize: 14.5,
            color: COLORS.navyMid, textDecoration: "none",
            opacity: 0.8, transition: "opacity 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.target.style.opacity = "1"; e.target.style.color = COLORS.emerald; }}
          onMouseLeave={(e) => { e.target.style.opacity = "0.8"; e.target.style.color = COLORS.navyMid; }}
        >
          {item}
        </a>
      ))}
    </div>
  );
}

// ── Public CTA (Log in + Get started) ──────────────────────────────
function PublicCTA() {
  const navigate = useNavigate();
  const goToSpeaking = () => navigate("/speaking", { state: { freeTopic: { prompt: "" } } });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <a
        href="/login"
        style={{
          fontFamily: FONTS.body, fontSize: 14,
          color: COLORS.navy, textDecoration: "none",
          padding: "8px 18px", opacity: 0.8,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
      >
        Log in
      </a>
      <button
        onClick={goToSpeaking}
        style={{
          fontFamily: FONTS.body, fontSize: 14, fontWeight: 600,
          background: COLORS.navy, color: "white",
          border: "none", borderRadius: 10,
          padding: "10px 22px", cursor: "pointer",
          transition: "transform 0.15s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.emeraldDark;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = COLORS.navy;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Get started free →
      </button>
    </div>
  );
}

// ── App nav (dashboard / speaking / ...) ───────────────────────────
function AppNav({ pathname }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
      {APP_NAV_ITEMS.map((item) => (
        <AppNavItem key={item.label} item={item} isActive={pathname.startsWith(item.path)} />
      ))}
    </nav>
  );
}

function AppNavItem({ item, isActive }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 8,
        fontFamily: FONTS.body, fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? COLORS.emeraldDark : COLORS.navyMid,
        background: isActive ? COLORS.emeraldBg : hovered ? COLORS.creamDark : "transparent",
        opacity: isActive ? 1 : hovered ? 1 : 0.75,
        textDecoration: "none", transition: "all 0.15s", whiteSpace: "nowrap",
      }}
    >
      {item.label}
    </a>
  );
}

// ── App right (streak + level + notif + avatar) ─────────────────────
function AppRight({ user }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "#FEF3DC", borderRadius: 99, padding: "5px 12px",
          fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: "#854F0B",
        }}
      >
        🔥 {user.streak}
      </div>

      <div
        style={{
          background: COLORS.emeraldBg, borderRadius: 99, padding: "5px 12px",
          fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.emeraldDark,
        }}
      >
        {user.level}
      </div>

      <button
        onClick={() => setNotifOpen((v) => !v)}
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: notifOpen ? COLORS.emeraldBg : "transparent",
          border: `1px solid ${notifOpen ? COLORS.emeraldBg2 : COLORS.creamDark}`,
          cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", transition: "all 0.2s",
        }}
      >
        🔔
        <span
          style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, borderRadius: "50%",
            background: COLORS.coral, border: "1.5px solid white",
          }}
        />
      </button>

      <div
        style={{
          width: 34, height: 34, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.emerald}30, ${COLORS.sky}30)`,
          border: `2px solid ${COLORS.emeraldBg2}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FONTS.body, fontSize: 13, fontWeight: 700,
          color: COLORS.emeraldDark, cursor: "pointer",
        }}
      >
        {user.name[0]}
      </div>
    </div>
  );
}
