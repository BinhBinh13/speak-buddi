const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const API_URL = import.meta.env.VITE_API_URL;

export function createSpeechRecognizer({ lang = "en-US", onInterim, onFinal, onEnd, onError }) {
  if (!SpeechRecognition) {
    onError?.("Browser does not support Speech Recognition.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (e) => {
    let interim = "", final = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) final += t;
      else interim += t;
    }
    if (interim) onInterim?.(interim);
    if (final)   onFinal?.(final);
  };

  recognition.onend  = () => onEnd?.();
  recognition.onerror = (e) => onError?.(e.error);

  return recognition;
}

// context: free speak prompt hoặc topic label
// ttsOnly: true → chỉ lấy audio, không gọi Claude (dùng cho intro greeting)
export async function getAIResponse(transcript, context = null, ttsOnly = false) {
  if (ttsOnly) {
    const res = await fetch(`${API_URL}/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript }),
    });
    if (!res.ok) throw new Error("TTS error");
    const audioBlob = await res.blob();
    return { replyText: transcript, audioUrl: URL.createObjectURL(audioBlob) };
  }

  const res = await fetch(`${API_URL}/speak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: transcript, context }),
  });

  if (!res.ok) throw new Error("API error");

  const replyText = res.headers.get("X-Reply-Text") ?? "";
  const audioBlob = await res.blob();
  const audioUrl  = URL.createObjectURL(audioBlob);

  return { replyText, audioUrl };
}

export function playAudio(audioUrl, onEnd) {
  const audio = new Audio(audioUrl);
  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
    onEnd?.();
  };
  audio.play();
  return audio;
}
