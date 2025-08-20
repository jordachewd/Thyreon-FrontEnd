import { PieChart } from "@mui/x-charts/PieChart";

export default function MuiPieChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 86, label: "Detected" },
            { id: 1, value: 38, label: "Pending" },
            { id: 2, value: 18, label: "Active" },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -45,
          endAngle: 225,
          //  cx: 150,
          //  cy: 150,
        },
      ]}
      width={200}
      height={200}
    />
  );
}
