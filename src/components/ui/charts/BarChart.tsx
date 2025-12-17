"use client";

import { memo } from "react";

interface BarChartProps {
  data?: { label: string; value: number }[];
  height?: number;
}

function BarChart({ data = [], height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="chart-container" style={{ height }}>
      <div className="flex items-end justify-around h-full gap-2">
        {data.length === 0 ? (
          <div className="flex items-center justify-center w-full text-gray-400">No data available</div>
        ) : (
          data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 rounded-t relative hover:bg-blue-600 transition-colors"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold">{item.value}</span>
              </div>
              <span className="text-xs mt-2 text-center">{item.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default memo(BarChart);
