// src/components/BgmPlayer.tsx
import { useEffect, useRef, useState } from "react";

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // 시작부터 true

  useEffect(() => {
    const audio = new Audio("/audio/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;

    // 첫 자동재생 시도
    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (e) {
        // 자동재생 실패 → 첫 사용자 제스처 때 재생
        const resume = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (err) {
            console.error("BGM 재생 실패", err);
          } finally {
            document.removeEventListener("pointerdown", resume);
            document.removeEventListener("keydown", resume);
            document.removeEventListener("touchstart", resume);
          }
        };
        document.addEventListener("pointerdown", resume, { once: true });
        document.addEventListener("keydown", resume, { once: true });
        document.addEventListener("touchstart", resume, { once: true });
      }
    };

    tryPlay();
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleToggle = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("BGM 재생 실패", e);
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 p-2 rounded bg-gray-900 text-white"
    >
      {isPlaying ? "🔊 끄기" : "🎵 켜기"}
    </button>
  );
}
