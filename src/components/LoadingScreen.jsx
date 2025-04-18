import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center mt-6 text-green-900 font-semibold">
    <div className="mb-2 text-lg">Hang tight! Emotion magic in progress ✨</div>
    <div className="flex gap-2 animate-bounce text-3xl">
      <span>😊</span>
      <span>😲</span>
      <span>😢</span>
      <span>🩷</span>
      <span>😨</span>
      <span>😡</span>
      <span>❓</span>
    </div>
  </div>
  );
}
