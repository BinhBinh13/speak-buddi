import { useState } from "react";
import { COLORS, FONTS } from "../constants/theme";
import { useScrolled } from "../hooks/useScrolled";

// ─── Config ────────────────────────────────────────────────────────────────────
const APP_NAV_ITEMS = [
  { label: "Dashboard", icon: "⊞", path: "/dashboard"  },
  { label: "Speaking",  icon: "🎤", path: "/speaking"   },
  { label: "Từ vựng",   icon: "📚", path: "/vocabulary"  },
  { label: "Tiến độ",   icon: "📊", path: "/analytics"   },
];

const PUBLIC_NAV_LINKS = ["Tính năng", "Lộ trình", "Giá cả", "Cộng đồng"];

const APP_ROUTES = ["/dashboard", "/speaking", "/vocabulary", "/schedule", "/analytics"];

function isAppRoute(path) {
  return APP_ROUTES.some((r) => path.startsWith(r));
}

/**
 * PublicNavbar – Navbar dùng chung cho toàn bộ SpeakBuddi
 *
 * Props:
 *   user      – { name, streak, level } — dùng khi ở app route
 *   forcePath – string — override pathname detect (dùng khi chưa có react-router)
 *               VD: forcePath="/dashboard" → luôn render app nav
 *
 * Khi dùng react-router: xoá forcePath, thêm useLocation() bên trong
 */
export default function PublicNavbar({
  user = { name: "M", streak: 0, level: "B1" },
  forcePath,
}) {
  const scrolled = useScrolled(20);

  const pathname =
    forcePath ??
    (typeof window !== "undefined" ? window.location.pathname : "/");

  const isApp = isAppRoute(pathname);

  return (
    <nav
      style={{
        position: isApp ? "sticky" : "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background:
          scrolled || isApp ? "rgba(250,250,247,0.92)" : "transparent",
        backdropFilter: scrolled || isApp ? "blur(12px)" : "none",
        borderBottom:
          scrolled || isApp ? `1px solid ${COLORS.creamDark}` : "none",
        transition: "all 0.3s ease",
        padding: "0 clamp(20px, 5vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
          gap: 16,
        }}
      >
        <Logo />

        {isApp ? (
          <AppNav pathname={pathname} />
        ) : (
          <PublicLinks />
        )}

        {isApp ? (
          <AppRight user={user} />
        ) : (
          <PublicCTA />
        )}
      </div>
    </nav>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <a
      href="/"
      style={{
        display: "flex", alignItems: "center",
        gap: 9, textDecoration: "none", flexShrink: 0,
      }}
    >
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

// ─── App nav ───────────────────────────────────────────────────────────────────
function AppNav({ pathname }) {
  return (
    <nav style={{
      display: "flex", alignItems: "center",
      gap: 2, flex: 1, justifyContent: "center",
    }}>
      {APP_NAV_ITEMS.map((item) => (
        <AppNavItem
          key={item.label}
          item={item}
          isActive={pathname.startsWith(item.path)}
        />
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
        background: isActive
          ? COLORS.emeraldBg
          : hovered ? COLORS.creamDark : "transparent",
        opacity: isActive ? 1 : hovered ? 1 : 0.75,
        textDecoration: "none",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 15 }}>{item.icon}</span>
      {item.label}
    </a>
  );
}

// ─── App right (streak + level + notif + avatar) ───────────────────────────────
function AppRight({ user }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        background: "#FEF3DC", borderRadius: 99, padding: "5px 12px",
        fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: "#854F0B",
      }}>
        🔥 {user.streak}
      </div>

      <div style={{
        background: COLORS.emeraldBg, borderRadius: 99, padding: "5px 12px",
        fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.emeraldDark,
      }}>
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
        <span style={{
          position: "absolute", top: 6, right: 6,
          width: 7, height: 7, borderRadius: "50%",
          background: COLORS.coral, border: "1.5px solid white",
        }} />
      </button>

      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: `linear-gradient(135deg, ${COLORS.emerald}30, ${COLORS.sky}30)`,
        border: `2px solid ${COLORS.emeraldBg2}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FONTS.body, fontSize: 13, fontWeight: 700,
        color: COLORS.emeraldDark, cursor: "pointer",
      }}>
        {user.name[0]}
      </div>
    </div>
  );
}

// ─── Public links ──────────────────────────────────────────────────────────────
function PublicLinks() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
      {PUBLIC_NAV_LINKS.map((item) => (
        <a key={item} href="#" style={{
          fontFamily: FONTS.body, fontSize: 14.5,
          color: COLORS.navyMid, textDecoration: "none",
          opacity: 0.75, transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.75")}
        >
          {item}
        </a>
      ))}
    </div>
  );
}

// ─── Public CTA ────────────────────────────────────────────────────────────────
function PublicCTA() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <a href="/login" style={{
        fontFamily: FONTS.body, fontSize: 14,
        color: COLORS.navy, textDecoration: "none", padding: "8px 18px",
      }}>
        Đăng nhập
      </a>
      <button
        style={{
          fontFamily: FONTS.body, fontSize: 14, fontWeight: 500,
          background: COLORS.navy, color: COLORS.white,
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
        Bắt đầu miễn phí →
      </button>
    </div>
  );
}