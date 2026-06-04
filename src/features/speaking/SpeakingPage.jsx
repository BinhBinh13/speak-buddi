import { useState, useRef, useEffect } from "react";
import { useLocation }      from "react-router-dom";
import AppLayout            from "../../shared/components/AppLayout";
import Waveform             from "./components/Waveform";
import MicButton            from "./components/MicButton";
import SpeakingHeader       from "./components/SpeakingHeader";
import { createSpeechRecognizer, getAIResponse, playAudio } from "./services/speechService";

const STATUS = {
  IDLE:      "tap to speak",
  LISTENING: "listening…",
  THINKING:  "AI is responding…",
  SPEAKING:  "AI is speaking…",
  ERROR:     "something went wrong",
};

export default function SpeakingPage() {
  const { state }  = useLocation();
  const topic      = state?.topic     ?? null; // từ roadmap node
  const freeTopic  = state?.freeTopic ?? null; // từ free speak banner

  const [recording,      setRecording]      = useState(false);
  const [status,         setStatus]         = useState(STATUS.IDLE);
  const [interimText,    setInterimText]    = useState("");
  const [aiReply,        setAiReply]        = useState("");
  const [typing,         setTyping]         = useState(false);
  const [replyVisible,   setReplyVisible]   = useState(false);
  const [userTranscript, setUserTranscript] = useState("");

  const recognizerRef = useRef(null);
  const finalRef      = useRef("");
  const audioRef      = useRef(null);
  const typeIvRef     = useRef(null);

  // Khi vào free topic mode → AI tự hỏi câu mở đầu
  useEffect(() => {
    if (!freeTopic) return;

    const greeting = freeTopic.prompt
      ? `Sure! Let's talk about "${freeTopic.prompt}". What would you like to say first?`
      : "What do you want to talk about today?";

    setReplyVisible(true);
    setStatus(STATUS.SPEAKING);
    typeReply(greeting);

    getAIAudio(greeting).then((audioUrl) => {
      if (!audioUrl) return;
      audioRef.current = playAudio(audioUrl, () => setStatus(STATUS.IDLE));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMic() {
    if (recording) { recognizerRef.current?.stop(); return; }

    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    clearInterval(typeIvRef.current);

    finalRef.current = "";
    setInterimText("");
    setUserTranscript("");
    setAiReply("");
    setReplyVisible(false);
    setStatus(STATUS.LISTENING);
    setRecording(true);

    const recognizer = createSpeechRecognizer({
      lang: "en-US",
      onInterim: (t) => setInterimText(t),
      onFinal: (t) => {
        finalRef.current += t;
        setInterimText("");
        setUserTranscript(finalRef.current);
      },
      onEnd: async () => {
        setRecording(false);
        setInterimText("");
        const text = finalRef.current.trim();
        if (!text) { setStatus(STATUS.IDLE); return; }

        setUserTranscript(text);
        setStatus(STATUS.THINKING);
        try {
          const { replyText, audioUrl } = await getAIResponse(
            text,
            freeTopic?.prompt ?? null,  // free-speak prompt
            false,
            topic ?? null,              // learning path node (words, grammarTopics)
          );
          setStatus(STATUS.SPEAKING);
          setReplyVisible(true);
          typeReply(replyText);
          audioRef.current = playAudio(audioUrl, () => setStatus(STATUS.IDLE));
        } catch { setStatus(STATUS.ERROR); }
      },
      onError: () => { setRecording(false); setStatus(STATUS.ERROR); },
    });

    recognizerRef.current = recognizer;
    recognizer?.start();
  }

  function typeReply(text) {
    setAiReply(""); setTyping(true);
    let i = 0;
    typeIvRef.current = setInterval(() => {
      setAiReply(text.slice(0, ++i));
      if (i >= text.length) { clearInterval(typeIvRef.current); setTyping(false); }
    }, 22);
  }

  async function getAIAudio(text) {
    try {
      const { audioUrl } = await getAIResponse(text, null, /* ttsOnly */ true);
      return audioUrl;
    } catch {
      return null;
    }
  }

  const showUserBubble = userTranscript || interimText;

  return (
    <AppLayout>
      <div style={styles.page}>
        <SpeakingHeader topic={topic} freeTopic={freeTopic} />

        <div style={styles.body}>
          <div style={styles.transcriptArea}>
            {showUserBubble && (
              <div style={styles.txRow}>
                <div style={styles.txWrapUser}>
                  <span style={styles.txLabel}>You</span>
                  <div style={{ ...styles.txBubble, ...styles.txBubbleUser }}>
                    {userTranscript || interimText}
                    {recording && !userTranscript && <span style={styles.cursor} />}
                  </div>
                </div>
              </div>
            )}
            {replyVisible && (
              <div style={styles.txRow}>
                <div style={styles.txWrapAI}>
                  <span style={styles.txLabel}>AI</span>
                  <div style={{ ...styles.txBubble, ...styles.txBubbleAI }}>
                    {aiReply}
                    {typing && <span style={styles.cursor} />}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Waveform active={recording || status === STATUS.SPEAKING} />

          <div style={styles.micWrap}>
            <MicButton recording={recording} onClick={handleMic} />
            <span style={styles.statusText}>{status}</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes blink-cur{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </AppLayout>
  );
}

const styles = {
  page:           { display: "flex", flexDirection: "column", minHeight: "calc(100vh - 60px)" },
  body:           { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", gap: "1.75rem" },
  transcriptArea: { width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 10 },
  txRow:          { display: "flex", width: "100%" },
  txWrapUser:     { display: "flex", flexDirection: "column", alignItems: "flex-end", marginLeft: "auto", maxWidth: "82%" },
  txWrapAI:       { display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "82%" },
  txLabel:        { fontSize: 11, color: "#9ca3af", letterSpacing: "0.03em", marginBottom: 4 },
  txBubble:       { padding: "9px 13px", borderRadius: 12, fontSize: 14, lineHeight: 1.7 },
  txBubbleUser:   { background: "#ef4444", color: "#fff", borderRadius: "12px 4px 12px 12px" },
  txBubbleAI:     { background: "#f9fafb", color: "#111827", border: "0.5px solid #e5e7eb", borderRadius: "4px 12px 12px 12px" },
  micWrap:        { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  statusText:     { fontSize: 12, color: "#9ca3af", letterSpacing: "0.03em" },
  cursor:         { display: "inline-block", width: 2, height: "1em", background: "currentColor", verticalAlign: "text-bottom", marginLeft: 2, opacity: 0.6, animation: "blink-cur 0.8s infinite" },
};
