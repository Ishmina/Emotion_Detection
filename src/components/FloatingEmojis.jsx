import React from "react";


export default function FloatingEmojis({ emoji = "🎈" }) {
  return (
    <div className="floating-emoji-wrapper">
      {Array.from({ length: 30 }).map((_, index) => {
        const size = 24 + Math.random() * 40; // between 24px and 64px
        const left = Math.random() * 100; // % from left
        const bottomOffset = Math.random() * 30; // appear from different bottom spots
        const floatDistance = 100 + Math.random() * 100; // how far it floats up
        const horizontalDrift = (Math.random() - 0.5) * 100; // drift left or right randomly

        const animationDelay = Math.random() * 0.5; // delay before appearing
        const duration = 5; // total 5s

        return (
          <span
            key={index}
            className="emoji-balloon"
            style={{
              left: `${left}%`,
              bottom: `${bottomOffset}px`,
              fontSize: `${size}px`,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${duration}s`,
              transform: `translateX(0) translateY(0)`,
              "--drift": `${horizontalDrift}px`,
              "--float": `${-floatDistance}vh`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

