//inputsection.jsx
import React, { useState, useEffect } from "react";

export default function InputSection({ onDetect, result }) {
  const [text, setText] = useState("");
  const [isDetected, setIsDetected] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleDetect = () => {
    if (text.trim()) {
      onDetect(text);
      setIsDetected(true);
    }
  };

  // For entry animation
  useEffect(() => {
    setTimeout(() => {
      setHasEntered(true);
    }, 100);
  }, []);

  return (
    <div
      className={`flex justify-center transition-all duration-700 ease-in-out px-4 ${
        isDetected ? "mt-8" : "mt-20"
      }`}
    >
      <div
        className={`transform transition-all duration-700 ease-in-out w-full md:w-[80%] lg:w-[60%] 
        ${hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
        bg-white border-2 border-pink-200 
        rounded-2xl p-6 shadow-xl text-left`}
      >
        <h2 className="text-gray-800 text-2xl font-semibold mb-6 pl-4">Enter your text here</h2>

      <textarea
          placeholder="Express your feelings here...✍️"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3} // You can adjust the height here (like rows={6} or rows={8})
          className="w-full px-5 py-3 mb-8 bg-pink-100 text-gray-900 rounded-lg 
          focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-300 resize-none"
        />


        <div className="flex justify-center gap-10">
          <button
            onClick={handleDetect}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 
            rounded-full transition-all duration-300 shadow-lg hover:scale-105"
          >
             DETECT EMOTION
          </button>
          <button
            onClick={() => setText("")}
            className="bg-purple-400 hover:bg-purple-500 text-white font-semibold px-6 py-2 
            rounded-full transition-all duration-300 shadow-lg hover:scale-105 w-45 "
          >
             CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}
