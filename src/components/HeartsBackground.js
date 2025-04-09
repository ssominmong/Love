// src/components/HeartsBackground.js
import { useEffect, useRef } from "react";

export default function HeartsBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.textContent = "💗";
      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animation = "fall 6s linear forwards";
      heart.style.fontSize = `${20 + Math.random() * 20}px`;
      heart.style.opacity = 0.8;

      containerRef.current.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-5%);
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
