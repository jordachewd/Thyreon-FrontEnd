"use client";

import { memo } from "react";

interface PieChartProps {
  data?: { label: string; value: number; color?: string }[];
  height?: number;
}

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

function PieChart({ data = [], height = 300 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let cumulativeAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;

    return {
      ...item,
      percentage,
      angle,
      startAngle,
      color: item.color || COLORS[index % COLORS.length],
    };
  });

  const createSlicePath = (startAngle: number, angle: number) => {
    const start = polarToCartesian(50, 50, 40, startAngle);
    const end = polarToCartesian(50, 50, 40, startAngle + angle);
    const largeArc = angle > 180 ? 1 : 0;
    return `M 50 50 L ${start.x} ${start.y} A 40 40 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  return (
    <div className="chart-container" style={{ height }}>
      {data.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-gray-400">No data available</div>
      ) : (
        <>
          <svg className="chart-pie-svg" viewBox="0 0 100 100">
            {slices.map((slice, index) => (
              <path
                key={index}
                className="hover:opacity-80 transition-opacity"
                d={createSlicePath(slice.startAngle, slice.angle)}
                fill={slice.color}
              />
            ))}
          </svg>
          <div className="chart-legend">
            {slices.map((slice, index) => (
              <div key={index} className="chart-legend-item">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-sm">
                  {slice.label} ({slice.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(PieChart);
