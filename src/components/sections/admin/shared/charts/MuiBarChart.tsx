import { BarChart } from "@mui/x-charts/BarChart";

export default function MuiBarChart() {
  const xAxisData = [
    {
      data: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
      categoryGapRatio: 0.4,
      barGapRatio: 0.2,
      label: "Month Overview (2025)",
      width: 60,
    },
  ];
  const seriesData = [
    { data: [8, 20, 46, 73, 84, 87, 122, 146], label: "Users" },
    { data: [12, 34, 62, 102, 136, 145, 218, 296], label: "Sites" },
    { data: [20, 76, 124, 192, 214, 252, 305, 354], label: "Alerts" },
    { data: [12, 36, 62, 84, 102, 112, 145, 166], label: "Transactions" },
  ];

  const otherChartSettings = {
    yAxis: [
      {
        label: "Items",
        width: 60,
      },
    ],
  };

  return (
    <BarChart
      xAxis={xAxisData}
      series={seriesData}
      height={300}
      {...otherChartSettings}
    />
  );
}
