import React from "react";

export default function DetectedEmotion({ emotion }) {
  const emotionEmojiMap = {
    joy: "😊",
    sad: "😢",
    anger: "😡",
    fear: "😨",
    love: "🩷",
    surprise: "😲",
    happy: "😄",
  };

  const emotionColorMap = {
    joy: "bg-yellow-100 border-yellow-300 shadow-yellow-300/50 text-yellow-800",
    sad: "bg-blue-100 border-blue-300 shadow-blue-300/50 text-blue-800",
    anger: "bg-red-100 border-red-300 shadow-red-300/50 text-red-800",
    fear: "bg-purple-100 border-purple-300 shadow-purple-300/50 text-purple-800",
    love: "bg-pink-100 border-pink-300 shadow-pink-300/50 text-pink-800",
    surprise: "bg-green-100 border-green-300 shadow-green-300/50 text-green-800",
    happy: "bg-orange-100 border-orange-300 shadow-orange-300/50 text-orange-800",
  };

  const emoji = emotionEmojiMap[emotion?.toLowerCase()] || "❓";
  const styles =
    emotionColorMap[emotion?.toLowerCase()] ||
    "bg-gray-100 border-gray-300 shadow-gray-300/50 text-gray-800";

  return (
    <div className="w-[90%] max-w-xl mx-auto mt-6 mb-10 transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
      <h3 className="text-pink-500 text-shadow-black text-lg font-semibold mb-3 text-left pl-2 tracking-wide">
        DETECTED EMOTION :
      </h3>
      <div
        className={`p-6 rounded-[2rem] shadow-lg border-2 text-center ${styles}`}
      >
        <p className="text-3xl font-bold flex items-center justify-center gap-2">
          {emotion?.toUpperCase() || "NEUTRAL"}
          <span className="text-4xl">{emoji}</span>
        </p>
      </div>
    </div>
  );
}
