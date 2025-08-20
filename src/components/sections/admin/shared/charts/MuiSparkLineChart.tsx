"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  SparkLineChart,
  SparkLineChartProps,
} from "@mui/x-charts/SparkLineChart";
import {
  areaElementClasses,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import { chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import { sparklineDemoData } from "./demo-data/sparkline-data.const";
import { useState } from "react";

const downloads = sparklineDemoData.map((item) => item.downloads);
const weeks = sparklineDemoData.map((item) => `${item.start} to ${item.end}`);

const settings: SparkLineChartProps = {
  data: downloads,
  baseline: "min",
  margin: { bottom: 0, top: 5, left: 4, right: 0 },
  xAxis: { id: "week-axis", data: weeks },
  yAxis: {
    domainLimit: (_, maxValue: number) => ({
      min: -maxValue / 6, //  Hack to add 5px bellow 0 like npm.
      max: maxValue,
    }),
  },
  sx: {
    [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
    [`& .${lineElementClasses.root}`]: { strokeWidth: 3 },
    [`& .${chartsAxisHighlightClasses.root}`]: {
      stroke: "rgb(137, 86, 255)",
      strokeDasharray: "none",
      strokeWidth: 2,
    },
  },
  slotProps: {
    lineHighlight: { r: 4 }, // Reduce the radius of the axis highlight.
  },
  clipAreaOffset: { top: 2, bottom: 2 },
  axisHighlight: { x: "line" },
};

export default function MuiSparkLineChart() {
  const [weekIndex, setWeekIndex] = useState<null | number>(null);

  return (
    <div
      onKeyDown={(event) => {
        switch (event.key) {
          case "ArrowLeft":
            setWeekIndex((p) =>
              p === null
                ? weeks.length - 1
                : (weeks.length + p - 1) % weeks.length
            );
            break;
          case "ArrowRight":
            setWeekIndex((p) => (p === null ? 0 : (p + 1) % weeks.length));
            break;
          default:
        }
      }}
      onFocus={() => {
        setWeekIndex((p) => (p === null ? 0 : p));
      }}
      role="button"
      aria-label="Showing weekly"
      tabIndex={0}
    >
      <Stack direction="column" width={300}>
        <Typography
          sx={{
            color: "rgb(117, 117, 117)",
            fontWeight: 500,
            fontSize: "0.9rem",
            pt: 1,
          }}
        >
          {weekIndex === null ? "Weekly" : weeks[weekIndex]}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ borderBottom: "solid 2px rgba(137, 86, 255, 0.2)" }}
        >
          <Typography sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
            {downloads[weekIndex ?? downloads.length - 1].toLocaleString()}
          </Typography>

          <SparkLineChart
            height={40}
            width={195}
            area
            showHighlight
            color="rgb(137, 86, 255)"
            onHighlightedAxisChange={(axisItems) => {
              setWeekIndex(axisItems[0]?.dataIndex ?? null);
            }}
            highlightedAxis={
              weekIndex === null
                ? []
                : [{ axisId: "week-axis", dataIndex: weekIndex }]
            }
            {...settings}
          />
        </Stack>
      </Stack>
    </div>
  );
}
