"use client";

import { memo } from "react";

interface SparkLineProps {
  data?: number[];
  height?: number;
  color?: string;
  label?: string;
  value?: string;
}

function SparkLine({
  data = [],
  height = 80,
  color = "#3b82f6",
  label,
  value,
}: SparkLineProps) {
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;

  const points =
    data.length > 0
      ? data
          .map((val, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((val - minValue) / range) * 100;
            return `${x},${y}`;
          })
          .join(" ")
      : "";

  return (
    <div className="chart-sparkline">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {value && <span className="text-lg font-bold">{value}</span>}
        </div>
      )}
      <svg
        className="w-full"
        style={{ height }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {data.length > 0 && (
          <>
            <polyline
              points={`0,100 ${points} 100,100`}
              fill={color}
              opacity="0.1"
            />
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default memo(SparkLine);
