import { useState } from "react";
import { COLORS, FONTS } from "../../../shared/constants/theme";
import { useInView } from "../../../shared/hooks/useInView";

const FEATURES = [
  {
    icon: "🎤", color: COLORS.emerald, bg: COLORS.emeraldBg,
    title: "AI Speaking Coach",
    desc: "Luyện nói 1-1 với AI bất cứ lúc nào. AI nhận xét phát âm, ngữ pháp, fluency ngay sau mỗi câu và đưa ra gợi ý cải thiện cụ thể.",
    tags: ["Phát âm", "Ngữ điệu", "Fluency"],
  },
  {
    icon: "📚", color: COLORS.sky, bg: COLORS.skyBg,
    title: "Vocabulary Builder",
    desc: "Xây dựng kho từ vựng với flashcard thông minh. Hệ thống Spaced Repetition đảm bảo bạn nhớ từ lâu dài, không học đi học lại.",
    tags: ["Flashcard", "Spaced Repetition", "1000+ từ"],
  },
  {
    icon: "📅", color: COLORS.amber, bg: COLORS.amberBg,
    title: "Smart Schedule",
    desc: "AI phân tích mục tiêu, lịch rảnh và tốc độ học của bạn để lên lịch trình cá nhân hoá — không quá sức, không lãng phí thời gian.",
    tags: ["Cá nhân hoá", "Nhắc nhở", "Theo dõi tiến độ"],
  },
  {
    icon: "💬", color: COLORS.coral, bg: COLORS.coralBg,
    title: "Topic Conversation",
    desc: "Hơn 500 chủ đề hội thoại từ cơ bản đến nâng cao. Luyện tập tình huống thực tế: phỏng vấn, du lịch, công việc, cuộc sống.",
    tags: ["500+ chủ đề", "IELTS", "Giao tiếp thực tế"],
  },
  {
    icon: "📊", color: "#8B5CF6", bg: "#F3EFFE",
    title: "Progress Analytics",
    desc: "Dashboard trực quan theo dõi từng kỹ năng. Xem bạn đã cải thiện bao nhiêu, điểm yếu ở đâu và cần tập trung gì tiếp theo.",
    tags: ["Dashboard", "Biểu đồ", "Phân tích chi tiết"],
  },
  {
    icon: "🏆", color: "#0891B2", bg: "#E0F7FA",
    title: "Gamification",
    desc: "Streak, điểm kinh nghiệm, huy hiệu thành tích — mỗi ngày học là một thử thách vui. Cạnh tranh với bạn bè trên bảng xếp hạng.",
    tags: ["Streak", "Huy hiệu", "Leaderboard"],
  },
];

/**
 * FeaturesSection – 6 card tính năng nổi bật, stagger animation khi scroll vào
 */
export default function FeaturesSection() {
  const [ref, inView] = useInView();

  return (
    <section
      style={{ background: COLORS.cream, padding: "100px clamp(20px, 5vw, 80px)" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Section header */}
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: COLORS.emeraldBg,
              borderRadius: 99,
              padding: "5px 16px",
              marginBottom: 16,
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.emeraldDark,
              fontWeight: 500,
            }}
          >
            Tính năng nổi bật
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: COLORS.navy,
              letterSpacing: "-0.8px",
              marginBottom: 16,
            }}
          >
            Mọi thứ bạn cần để
            <br />
            thành thạo tiếng Anh
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.stone,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            SpeakBuddi kết hợp công nghệ AI tiên tiến với phương pháp học được
            kiểm chứng để đạt kết quả tốt nhất.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, color, bg, title, desc, tags, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 20,
        border: `1px solid ${hovered ? color + "40" : COLORS.creamDark}`,
        padding: "28px 24px",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 8px 32px ${color}18` : "none",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 48, height: 48, borderRadius: 14,
          background: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, marginBottom: 18,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: FONTS.display, fontSize: 19, fontWeight: 700,
          color: COLORS.navy, marginBottom: 10, letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body, fontSize: 14,
          color: COLORS.stone, lineHeight: 1.65, marginBottom: 16,
        }}
      >
        {desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: FONTS.body, fontSize: 12, fontWeight: 500,
              background: bg, color, borderRadius: 99, padding: "3px 10px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
