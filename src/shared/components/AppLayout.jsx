import { useLocation } from "react-router-dom";
import { COLORS, FONTS, GOOGLE_FONTS_URL } from "../constants/theme";
import DashSidebar     from "../../features/dashboard/components/DashSidebar";
import DashTopbar      from "../../features/dashboard/components/DashTopbar";
import MobileBottomNav from "../../features/dashboard/components/MobileBottomNav";

const USER = { name: "Minh", streak: 12, level: "B2", goal: "IELTS 7.0" };

const PAGE_TITLES = {
  "/dashboard":  { title: "Learning path", icon: "" },
  "/speaking":   { title: "Speaking",      icon: "" },
  "/vocabulary": { title: "New words",     icon: "" },
};

/**
 * AppLayout – shared shell dùng chung cho mọi page
 *
 * ┌──────────┬────────────────────────────────────┐
 * │          │  DashTopbar (fixed)                │
 * │ Sidebar  ├────────────────────────────────────┤
 * │ (240px)  │  {children}                        │
 * │          │                                    │
 * └──────────┴────────────────────────────────────┘
 * Mobile: sidebar ẩn → MobileBottomNav hiện
 *
 * Usage:
 *   <AppLayout>
 *     <YourPageContent />
 *   </AppLayout>
 */
export default function AppLayout({ children, rightPanel = null }) {
  const { pathname } = useLocation();
  const { title, icon } = PAGE_TITLES[pathname] ?? { title: "SpeakBuddi", icon: "✨" };

  return (
    <div style={{ fontFamily: FONTS.body, background: COLORS.cream, minHeight: "100vh" }}>
      <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      <style>{SHELL_CSS}</style>

      {/* Topbar — fixed, spans col 2 + col 3 */}
      <div className="shell-topbar-wrapper">
        <DashTopbar title={title} icon={icon} user={USER} />
      </div>

      <div className="shell-outer">
        {/* Col 1: Sidebar */}
        <DashSidebar activePath={pathname} user={USER} />

        {/* Col 2 + 3 */}
        <div className="shell-body">
          <div className="shell-content">
            {children}
          </div>
          {rightPanel && (
            <div className="shell-right-panel">{rightPanel}</div>
          )}
        </div>
      </div>

      <MobileBottomNav activePath={pathname} />
    </div>
  );
}

const SHELL_CSS = `
  .shell-topbar-wrapper {
    position: fixed;
    top: 0; left: 240px; right: 0;
    z-index: 40;
  }

  .shell-outer {
    display: flex;
    min-height: 100vh;
  }

  .shell-body {
    flex: 1;
    min-width: 0;
    display: flex;
    padding-top: 60px;
  }

  .shell-content {
    flex: 1;
    min-width: 0;
    background: ${COLORS.cream};
  }

  .shell-right-panel {
    padding: 20px 20px 24px 0;
    overflow-y: auto;
    height: calc(100vh - 60px);
    position: sticky;
    top: 60px;
  }

  @media (max-width: 768px) {
    .shell-topbar-wrapper { left: 0; }
  }
`;
