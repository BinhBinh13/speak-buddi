import { useState } from "react";
import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const PLANS = [
  {
    name: "Miễn phí",
    monthlyPrice: 0,
    annualPrice: 0,
    unit: "",
    features: [
      "5 bài speaking / ngày",
      "50 từ vựng / ngày",
      "Lịch học cơ bản",
      "Phân tích cơ bản",
    ],
    cta: "Bắt đầu ngay",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 129000,
    annualPrice: 99000,
    unit: "/tháng",
    features: [
      "Speaking không giới hạn",
      "Từ vựng không giới hạn",
      "AI lên lịch thông minh",
      "Phân tích chi tiết",
      "500+ chủ đề chuyên sâu",
      "Hỗ trợ IELTS/TOEIC",
    ],
    cta: "Dùng thử 7 ngày miễn phí",
    highlight: true,
  },
  {
    name: "Team",
    monthlyPrice: 99000,
    annualPrice: 79000,
    unit: "/người/tháng",
    features: [
      "Tất cả tính năng Pro",
      "Quản lý nhóm học",
      "Dashboard giáo viên",
      "Báo cáo tiến độ nhóm",
      "Hỗ trợ ưu tiên",
    ],
    cta: "Liên hệ tư vấn",
    highlight: false,
  },
];

/**
 * PricingSection – 3 gói giá với toggle tháng/năm
 */
export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const [ref, inView] = useInView();

  return (
    <section
      style={{ background: COLORS.cream, padding: "100px clamp(20px, 5vw, 80px)" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header + toggle */}
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: inView ? 1 : 0,
            transition: "all 0.6s ease",
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: COLORS.navy,
              letterSpacing: "-0.8px",
              marginBottom: 20,
            }}
          >
            Chọn gói phù hợp
          </h2>

          {/* Billing toggle */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: COLORS.creamDark,
              borderRadius: 99,
              padding: "5px 6px",
            }}
          >
            <ToggleBtn active={!annual} onClick={() => setAnnual(false)}>
              Hàng tháng
            </ToggleBtn>
            <ToggleBtn active={annual} onClick={() => setAnnual(true)}>
              Hàng năm{" "}
              <span style={{ color: COLORS.emerald, fontSize: 11, fontWeight: 600 }}>
                -20%
              </span>
            </ToggleBtn>
          </div>
        </div>

        {/* Plan cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              annual={annual}
              delay={i * 80}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToggleBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONTS.body,
        fontSize: 13,
        border: "none",
        cursor: "pointer",
        borderRadius: 99,
        padding: "6px 18px",
        background: active ? "white" : "transparent",
        color: COLORS.navy,
        fontWeight: active ? 600 : 400,
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

function PlanCard({ plan, annual, delay, inView }) {
  const { name, monthlyPrice, annualPrice, unit, features, cta, highlight } = plan;
  const price = annual ? annualPrice : monthlyPrice;

  return (
    <div
      style={{
        background: highlight ? COLORS.navy : "white",
        borderRadius: 20,
        padding: "32px 28px",
        border: highlight ? "none" : `1px solid ${COLORS.creamDark}`,
        opacity: inView ? 1 : 0,
        transform: inView ? (highlight ? "scale(1.03)" : "none") : "translateY(20px)",
        transition: `all 0.5s ease ${delay}ms`,
        position: "relative",
      }}
    >
      {/* Popular badge */}
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: COLORS.emerald,
            color: "white",
            borderRadius: 99,
            padding: "4px 16px",
            fontFamily: FONTS.body,
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          ⚡ Phổ biến nhất
        </div>
      )}

      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 14,
          fontWeight: 600,
          color: highlight ? "rgba(255,255,255,0.6)" : COLORS.stone,
          marginBottom: 8,
        }}
      >
        {name}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 36,
            fontWeight: 700,
            color: highlight ? "white" : COLORS.navy,
          }}
        >
          {price === 0 ? "Free" : price.toLocaleString() + "đ"}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: highlight ? "rgba(255,255,255,0.5)" : COLORS.stone,
            }}
          >
            {unit}
          </span>
        )}
      </div>

      <div
        style={{
          height: 1,
          background: highlight ? "rgba(255,255,255,0.1)" : COLORS.creamDark,
          margin: "20px 0",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: FONTS.body,
              fontSize: 14,
              color: highlight ? "rgba(255,255,255,0.75)" : COLORS.navyMid,
              padding: "7px 0",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: COLORS.emeraldLight, fontSize: 16 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        style={{
          width: "100%",
          padding: "13px 0",
          background: highlight ? COLORS.emerald : "transparent",
          color: highlight ? "white" : COLORS.navy,
          border: highlight ? "none" : `1.5px solid ${COLORS.creamDark}`,
          borderRadius: 12,
          fontFamily: FONTS.body,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {cta}
      </button>
    </div>
  );
}
