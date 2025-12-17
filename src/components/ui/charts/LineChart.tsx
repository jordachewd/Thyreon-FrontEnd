"use client";

import { memo } from "react";

interface LineChartProps {
  data?: { label: string; value: number }[];
  height?: number;
}

function LineChart({ data = [], height = 300 }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points =
    data.length > 0
      ? data
          .map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return `${x},${y}`;
          })
          .join(" ")
      : "";

  return (
    <div className="chart-container" style={{ height }}>
      {data.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-gray-400">No data available</div>
      ) : (
        <svg className="chart-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            className="text-blue-500"
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return (
              <circle
                key={index}
                className="fill-blue-500"
                cx={x}
                cy={y}
                r="1"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      )}
      {data.length > 0 && (
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {data.map((item, index) => (
            <span key={index}>
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(LineChart);
