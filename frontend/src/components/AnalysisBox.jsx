//AnalysisBox.jsx

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalysisBox({ emotionData }) {
  const data = Object.entries(emotionData).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  const darkColors = {
    joy: "#F9CB43",      // bright yellow
    sad: "#4F88E3",      // blue
    anger: "#F73131",    // red
    fear: "#9F54D9",     // purple
    love: "#F56597",     // pink
    surprise: "#F77F21", // orange
  };

  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 100).toFixed(2)}%`;  // Fixed decimal places

  return (
    <div className="w-full  max-w-xl mx-auto mt-1 mb-1 bg-pink-200 p-6 rounded-2xl shadow-lg h-[650px] flex flex-col justify-between transition-transform duration-500 ease-in-out hover:scale-105">
      <h2 className="text-center text-3xl font-extrabold text-pink-800 mb-2">
        EMOTION ANALYSIS
      </h2>

      <div className="flex justify-center items-center flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={190}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={darkColors[entry.name.toLowerCase()] || "#E5E7EB"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                color: "#111",
                border: "none",
                fontSize: "12px",
              }}
              formatter={(value) =>
                `${value} (${((value / total) * 100).toFixed(2)}%)`
              }
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                color: "#4B5563",
                fontSize: "13px",
                marginTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
