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
  // console.log(emotionData);
  const data = Object.entries(emotionData).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  const darkColors = {
    joy: "#ffa500",      // orange
    sad: "#4F88E3",      // blue
    anger: "#F73131",    // red
    fear: "#9F54D9",     // purple
    love: "#F56597",     // pink
    surprise: "#009688", // green
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.01) return null; // Hide labels for <5%
  
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
      >
        {(percent * 100).toFixed(2) + "%"}
      </text>
    );
  };
  

  return (
    <div className="w-full mt-14 max-w-xl mx-auto mb-1 bg-pink-200 p-6  rounded-2xl shadow-lg h-[650px] flex flex-col justify-between transition-transform duration-500 ease-in-out hover:scale-105">
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
              formatter={(value, name) => {
                const safeValue = parseFloat(value) || 0;
                const percentage = ((safeValue / total) * 100).toFixed(2);
                return [`${safeValue} (${percentage}%)`, name];  // ✅ Must return [value, name]
              }}

            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />


            {/* <Legend
              formatter={(value, entry) => {
                const item = data.find(d => d.name === value);
                const pct = ((item.value / total) * 100).toFixed(2);
                return `${value.toUpperCase()} - ${pct}%`;
              }}
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            /> */}




          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
