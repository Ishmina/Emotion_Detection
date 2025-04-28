// ResultPercentage.jsx

import React from "react";

const emotions = [
  { name: "Sad", emoji: "🥲", color: "bg-blue-500 border-blue-600 text-blue-100" },
  { name: "Joy", emoji: "😄", color: "bg-orange-500 border-yellow-500 text-yellow-100" },
  { name: "Anger", emoji: "😡", color: "bg-red-500 border-red-600 text-red-100"},
  { name: "Fear", emoji: "😱", color: "bg-purple-500 border-purple-600 text-purple-100" },
  { name: "Love", emoji: "🩷", color: "bg-pink-500 border-pink-600 text-pink-100" },
  { name: "Surprise", emoji: "😯", color: "bg-teal-500 border-teal-600 text-teal-100"},
];

export default function ResultPercentage({ predictions = emotions }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-1 mb-1 pt-4 bg-pink-200 p-4 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out hover:scale-105">
      <h2 className="text-center text-3xl font-bold mb-8 text-pink-800">RESULT IN %</h2>
      <div className="space-y-6">
        {predictions.map((emotion, idx) => (
          <div key={idx} className="transition-all duration-300 hover:shadow-lg rounded-xl p-4 bg-pink-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-medium text-pink-950">{emotion.emoji} {emotion.name}</span>
              <span className="text-xl font-semibold text-pink-950">{(emotion.value * 100).toFixed(2)}%</span>
            
            </div>
            <div className="w-full h-4 bg-pink-300 rounded-full overflow-hidden">
              <div
                className={`${emotion.color} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${emotion.value * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
