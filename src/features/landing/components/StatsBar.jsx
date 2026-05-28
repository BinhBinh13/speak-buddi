import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const STATS = [
  { value: 12000, suffix: "+", label: "Học viên đang dùng" },
  { value: 98,    suffix: "%", label: "Hài lòng sau 30 ngày" },
  { value: 500,   suffix: "+", label: "Chủ đề speaking" },
  { value: 4,     suffix: ".9★", label: "Đánh giá trung bình" },
];

/**
 * StatsBar – Thanh thống kê nằm ngay dưới Hero, số đếm animate khi scroll vào
 */
export default function StatsBar() {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ background: COLORS.navy, padding: "36px clamp(20px, 5vw, 80px)" }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map(({ value, suffix, label }, i) => (
          <StatItem
            key={label}
            value={value}
            suffix={suffix}
            label={label}
            inView={inView}
            delay={i * 100}
            isLast={i === STATS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, suffix, label, inView, delay, isLast }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "0 20px",
        borderRight: !isLast ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.emeraldLight,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(8px)",
          transition: `all 0.5s ease ${delay}ms`,
        }}
      >
        {inView && <AnimatedCounter target={value} suffix={suffix} />}
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
