import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const TESTIMONIALS = [
  {
    name: "Nguyễn Minh Anh", role: "Sinh viên đại học",
    avatar: "MA", color: COLORS.emerald,
    text: "Sau 2 tháng dùng SpeakBuddi, điểm IELTS Speaking của mình tăng từ 5.5 lên 7.0. AI Coach góp ý rất chi tiết và mình thấy tiến bộ rõ rệt mỗi tuần.",
  },
  {
    name: "Trần Hoàng Long", role: "Kỹ sư phần mềm",
    avatar: "HL", color: COLORS.sky,
    text: "Mình hay ngại nói tiếng Anh với người thật vì sợ sai. SpeakBuddi cho phép luyện không giới hạn với AI, giờ họp online với khách nước ngoài mình đã tự tin hơn nhiều.",
  },
  {
    name: "Lê Thu Hà", role: "Marketing Manager",
    avatar: "TH", color: COLORS.coral,
    text: "Tính năng lên lịch học tự động rất hay! Mình chỉ cần 20 phút mỗi ngày mà từ vựng tăng đáng kể. App nhắc đúng lúc và không bao giờ bị cảm giác quá tải.",
  },
];

/**
 * Testimonials – 3 review card từ học viên thực tế
 */
export default function Testimonials() {
  const [ref, inView] = useInView();

  return (
    <section
      style={{
        background: COLORS.creamDark,
        padding: "100px clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
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
            }}
          >
            Học viên nói gì
            <br />
            về SpeakBuddi?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, avatar, color, text, delay }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 20,
        padding: "28px 24px",
        border: `1px solid ${COLORS.creamDark}`,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: `all 0.5s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 28,
          color: COLORS.stoneLight,
          lineHeight: 1,
          marginBottom: 14,
        }}
      >
        "
      </div>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 14.5,
          color: COLORS.navyMid,
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {text}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: color + "20", color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: FONTS.body, fontSize: 13, fontWeight: 600,
          }}
        >
          {avatar}
        </div>
        <div>
          <div
            style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 600, color: COLORS.navy }}
          >
            {name}
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.stone }}>
            {role}
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: COLORS.amber, fontSize: 13 }}>
          ★★★★★
        </div>
      </div>
    </div>
  );
}
