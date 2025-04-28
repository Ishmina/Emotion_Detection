// App.jsx

import React, { useState, useEffect } from "react";
import InputSection from "./components/InputSection";
import DetectedEmotion from "./components/DetectedEmotion";
import ResultPercentage from "./components/ResultPercentage";
import AnalysisBox from "./components/AnalysisBox";
import LoadingScreen from "./components/LoadingScreen";
import FloatingEmojis from "./components/FloatingEmojis";

import axios from "axios";

import "./App.css";

export default function EmotionDetector() {
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emotionData, setEmotionData] = useState({
    joy: 0,
    sad: 0,
    anger: 0,
    fear: 0,
    love: 0,
    surprise: 0,
  });

  const emojiMap = {
    joy: "😊",
    sad: "😢",
    anger: "😡",
    fear: "😨",
    love: "🩷",
    surprise: "😲",
  };

  const colorMap = {
    joy: "bg-yellow-400 border-yellow-500 text-yellow-100",
    sad: "bg-blue-500 border-blue-600 text-blue-100",
    anger: "bg-red-500 border-red-600 text-red-100",
    fear: "bg-purple-500 border-purple-600 text-purple-100",
    love: "bg-pink-500 border-pink-600 text-pink-100",
    surprise: "bg-teal-500 border-teal-600 text-teal-100",
  };

  const handleDetect = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setEmotion(null);
    setShowEmojis(false);
  
    try {
      const response = await axios.post("http://localhost:8000/predict", { text });  
      console.log (response);
      const { prediction: detected, confidence_scores: emotion_probabilities } = response.data;
      //console.log (response.data.confidence_scores.joy);
      console.log(detected, emotion_probabilities);

      if (emotion_probabilities.suprise) {
        emotion_probabilities.surprise = emotion_probabilities.suprise;
        delete emotion_probabilities.suprise;
      }
    
      console.log(detected, emotion_probabilities);
      
  
      setEmotion(detected);
      setEmotionData({
        joy: emotion_probabilities.joy || 0,
        sad: emotion_probabilities.sad || 0,
        anger: emotion_probabilities.anger || 0,
        fear: emotion_probabilities.fear || 0,
        love: emotion_probabilities.love || 0,
        surprise: emotion_probabilities.surprise || 0,
      });
  
    } catch (error) {
      console.error("Error detecting emotion:", error);
      alert("Oops 😢 Something went wrong while detecting emotion.");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    if (emotion) {
      const timer = setTimeout(() => {
        setShowEmojis(true);
        setTimeout(() => setShowEmojis(false), 5000);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [emotion]);

  const getEmojiForEmotion = (emotion) => emojiMap[emotion.toLowerCase()] || "💭";

  const enhancedEmotionData = Object.entries(emotionData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    emoji: emojiMap[name],
    color: colorMap[name],
    value: value || 0, 
}));


  return (
    <div className="min-h-screen bg-white p-4">
      <div className=" bg-pink-300 px-6 py-4 flex justify-between items-center rounded-xl shadow-lg">
          
        <span className="flex ">
          <img src="LOGO.png" alt="" className="w-13 h-12 " />

          <h1 className="text-3xl font-semibold text-white tracking-wide pl-3"> Emotion Detector </h1>
        </span>

        <span className="text-shadow-md text-white">Analyze the emotional tone of any text</span>
      </div>

      <InputSection onDetect={handleDetect} />

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="relative mt-6">
          {emotion && (
            <>
              {showEmojis && (
                <FloatingEmojis emoji={getEmojiForEmotion(emotion)} />
              )}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 m-8 z-10 relative">
                <DetectedEmotion
                  emotion={emotion}
                  emoji={getEmojiForEmotion(emotion)}
                  emotionData={emotionData}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <ResultPercentage predictions={enhancedEmotionData} />
                <AnalysisBox emotionData={emotionData} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
