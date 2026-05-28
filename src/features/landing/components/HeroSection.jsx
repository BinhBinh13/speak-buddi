import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../../shared/constants/theme";
import Waveform from "./Waveform";

const TYPING_TEXT = "Tell me about a time you overcame a challenge at work.";

/**
 * HeroSection – Section đầu trang landing với demo card tương tác
 */
export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [micActive, setMicActive] = useState(false);

  // Typing animation cho câu hỏi AI
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(TYPING_TEXT.slice(0, i));
      i++;
      if (i > TYPING_TEXT.length) clearInterval(timer);
    }, 38);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background: COLORS.cream,
        padding: "140px clamp(20px, 5vw, 80px) 80px",
        overflow: "hidden",
      }}
    >
      <HeroOrbs />

      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <HeroLeft />
        <HeroDemoCard
          typed={typed}
          micActive={micActive}
          onToggleMic={() => setMicActive((v) => !v)}
        />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}

// ─── Background decorations ────────────────────────────────────────────────────
function HeroOrbs() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.emeraldBg2}60 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.amberBg}80 0%, transparent 70%)`,
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill={COLORS.stoneLight} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

// ─── Left column: headline + CTA ──────────────────────────────────────────────
function HeroLeft() {
  return (
    <div style={{ animation: "fadeUp 0.7s ease both" }}>
      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: COLORS.emeraldBg,
          borderRadius: 99,
          padding: "6px 14px 6px 8px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: COLORS.emerald,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "white" }}>✦</span>
        </div>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: 13,
            color: COLORS.emeraldDark,
            fontWeight: 500,
          }}
        >
          AI English Coach — Miễn phí
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(38px, 4.5vw, 58px)",
          fontWeight: 700,
          color: COLORS.navy,
          lineHeight: 1.12,
          letterSpacing: "-1.5px",
          marginBottom: 20,
        }}
      >
        Nói tiếng Anh
        <br />
        <span style={{ color: COLORS.emerald }}>tự tin hơn</span> mỗi
        <br />
        ngày cùng AI
      </h1>

      {/* Subheading */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 17,
          color: COLORS.stone,
          lineHeight: 1.7,
          marginBottom: 36,
          maxWidth: 440,
        }}
      >
        Luyện speaking với AI Coach, xây dựng kho từ vựng cá nhân và theo lịch
        học thông minh được tạo riêng cho bạn.
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <PrimaryButton>Bắt đầu miễn phí →</PrimaryButton>
        <OutlineButton>▶ Xem demo</OutlineButton>
      </div>

      {/* Social proof */}
      <SocialProof />
    </div>
  );
}

// ─── Demo card (right column) ──────────────────────────────────────────────────
function HeroDemoCard({ typed, micActive, onToggleMic }) {
  return (
    <div style={{ animation: "fadeUp 0.7s 0.15s ease both" }}>
      <div
        style={{
          background: "white",
          borderRadius: 24,
          border: `1px solid ${COLORS.creamDark}`,
          boxShadow: "0 20px 60px rgba(13,31,45,0.10)",
          padding: 28,
          position: "relative",
        }}
      >
        {/* Streak badge */}
        <div
          style={{
            position: "absolute",
            top: -14,
            right: 24,
            background: COLORS.amber,
            borderRadius: 10,
            padding: "6px 14px",
            fontFamily: FONTS.body,
            fontSize: 12,
            fontWeight: 600,
            color: "white",
            boxShadow: `0 4px 12px ${COLORS.amber}50`,
          }}
        >
          🔥 12 ngày streak
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 11,
                color: COLORS.stone,
                marginBottom: 2,
              }}
            >
              AI Speaking Coach
            </div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.navy,
              }}
            >
              Buổi luyện tập #42
            </div>
          </div>
          <div
            style={{
              background: COLORS.emeraldBg,
              borderRadius: 99,
              padding: "4px 12px",
              fontFamily: FONTS.body,
              fontSize: 12,
              color: COLORS.emeraldDark,
              fontWeight: 500,
            }}
          >
            ● Live
          </div>
        </div>

        {/* AI Question */}
        <div
          style={{
            background: COLORS.navy,
            borderRadius: "16px 16px 16px 4px",
            padding: "14px 18px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 5,
            }}
          >
            AI Coach hỏi:
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 14.5,
              color: "white",
              lineHeight: 1.55,
            }}
          >
            "{typed}
            <span
              style={{
                borderRight: "2px solid white",
                animation: "blink 0.8s step-end infinite",
              }}
            >
              {" "}
            </span>
            "
          </div>
        </div>

        {/* User recording area */}
        <div
          style={{
            background: COLORS.cream,
            borderRadius: "4px 16px 16px 16px",
            padding: "14px 18px",
            marginBottom: 20,
            border: `1px dashed ${COLORS.stoneLight}`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 13,
              color: COLORS.stone,
              marginBottom: 8,
            }}
          >
            Câu trả lời của bạn:
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={onToggleMic}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: micActive ? COLORS.coral : COLORS.emerald,
                color: "white",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
                boxShadow: micActive
                  ? `0 0 0 6px ${COLORS.coralBg}`
                  : `0 0 0 6px ${COLORS.emeraldBg}`,
              }}
            >
              {micActive ? "⏹" : "🎤"}
            </button>
            <div style={{ flex: 1 }}>
              <Waveform active={micActive} />
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 12,
                  color: COLORS.stone,
                  marginTop: 4,
                }}
              >
                {micActive
                  ? "Đang ghi âm... nhấn để dừng"
                  : "Nhấn mic để bắt đầu nói"}
              </div>
            </div>
          </div>
        </div>

        {/* Score chips */}
        <ScoreChips />
      </div>
    </div>
  );
}

// ─── Small reusable pieces ─────────────────────────────────────────────────────
function ScoreChips() {
  const scores = [
    { label: "Phát âm", score: 82, color: COLORS.emerald, bg: COLORS.emeraldBg },
    { label: "Ngữ pháp", score: 76, color: COLORS.amber, bg: COLORS.amberBg },
    { label: "Fluency", score: 79, color: COLORS.sky, bg: COLORS.skyBg },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {scores.map(({ label, score, color, bg }) => (
        <div
          key={label}
          style={{ background: bg, borderRadius: 12, padding: "10px 14px", textAlign: "center" }}
        >
          <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color }}>
            {score}%
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.stone, marginTop: 2 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function SocialProof() {
  const avatarColors = [COLORS.emerald, COLORS.sky, COLORS.amber, COLORS.coral];
  const avatarLetters = ["M", "A", "T", "L"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex" }}>
        {avatarColors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: c, border: "2.5px solid white",
              marginLeft: i === 0 ? 0 : -8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, color: "white", fontWeight: 600,
              fontFamily: FONTS.body,
            }}
          >
            {avatarLetters[i]}
          </div>
        ))}
      </div>
      <div
        style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: COLORS.navy }}
      >
        ★★★★★{" "}
        <span style={{ color: COLORS.stone, fontWeight: 400 }}>
          từ 12,000+ học viên
        </span>
      </div>
    </div>
  );
}

function PrimaryButton({ children }) {
  return (
    <button
      style={{
        fontFamily: FONTS.body, fontSize: 15, fontWeight: 600,
        background: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.emeraldLight})`,
        color: "white", border: "none", borderRadius: 12,
        padding: "14px 28px", cursor: "pointer",
        boxShadow: `0 4px 20px ${COLORS.emerald}40`,
        transition: "transform 0.15s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 28px ${COLORS.emerald}50`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.emerald}40`;
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children }) {
  return (
    <button
      style={{
        fontFamily: FONTS.body, fontSize: 15,
        background: "white", color: COLORS.navy,
        border: `1.5px solid ${COLORS.creamDark}`,
        borderRadius: 12, padding: "14px 28px", cursor: "pointer",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.stoneLight)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.creamDark)}
    >
      {children}
    </button>
  );
}
