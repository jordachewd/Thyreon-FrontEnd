import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { scatterDemoData } from "./demo-data/scatter-data.const";

export default function MuiScatterChart() {
  return (
    <ScatterChart
      height={300}
      series={[
        {
          label: "Lite",
          data: scatterDemoData.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
        },
        {
          label: "Pro",
          data: scatterDemoData.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
        },
        {
          label: "Premium",
          data: scatterDemoData.map((v) => ({ x: v.y1, y: v.y2, id: v.id })),
        },
      ]}
    />
  );
}
