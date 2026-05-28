import { COLORS, FONTS } from "../../../shared/constants/theme";
import house from "../../../assets/icons/house.svg";
import mic from "../../../assets/icons/microphone.svg";
import vocab from "../../../assets/icons/vocab.svg";
const NAV_ITEMS = [
  { label: "Home", icon: house, path: "/dashboard"  },
  { label: "Speaking",  icon: mic, path: "/speaking"   },
  { label: "New words",   icon: vocab, path: "/vocabulary"  },
];

/**
 * MobileBottomNav – Thanh nav dưới cùng cho mobile (thay thế sidebar)
 */
export default function MobileBottomNav({ activePath = "/dashboard" }) {
  return (
    <>
      <style>{BOTTOM_NAV_CSS}</style>

      <nav className="mobile-bottom-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = activePath.startsWith(item.path);

          return (
            <a
              key={item.label}
              href={item.path}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <span className="mobile-nav-icon">
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: 22,
                    height: 22,
                    objectFit: "contain",
                  }}
                />
              </span>

              <span className="mobile-nav-label">
                {item.label}
              </span>

              {isActive && <div className="mobile-nav-indicator" />}
            </a>
          );
        })}
      </nav>
    </>
  );
}

const BOTTOM_NAV_CSS = `
  /* Only show on mobile */
  .mobile-bottom-nav {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-bottom-nav {
      display: flex;
      position: fixed; bottom: 0; left: 0; right: 0;
      z-index: 100;
      background: rgba(250,250,247,0.96);
      backdrop-filter: blur(12px);
      border-top: 1px solid ${COLORS.creamDark};
      padding: 6px 0 max(6px, env(safe-area-inset-bottom));
      justify-content: space-around;
    }

    .mobile-nav-item {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 3px; padding: 4px 12px;
      text-decoration: none; position: relative;
      flex: 1;
    }

    .mobile-nav-icon {
      font-size: 20px;
      transition: transform 0.15s;
    }
    .mobile-nav-item.active .mobile-nav-icon {
      transform: scale(1.15);
    }

    .mobile-nav-label {
      font-family: ${FONTS.body}; font-size: 10px;
      font-weight: 500; color: ${COLORS.stoneLight};
    }
    .mobile-nav-item.active .mobile-nav-label {
      color: ${COLORS.emeraldDark}; font-weight: 700;
    }

    .mobile-nav-indicator {
      position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 20px; height: 3px; border-radius: 99px;
      background: ${COLORS.emerald};
    }
  }
`;
