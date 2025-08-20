import * as React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Remediation", value: 400 },
  { label: "Untriaged", value: 300 },
  { label: "Administrative", value: 100 },
  { label: "Other", value: 50 },
];

export default function MuiHalfPieChart() {
  return (
    <Stack width="100%" direction="row" flexWrap="wrap">
      <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data,
          },
        ]}
        width={200}
        height={200}
        hideLegend
      />
      {/*       <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            cy: '75%',
            data,
          },
        ]}
        width={200}
        height={150}
        hideLegend
      /> */}
    </Stack>
  );
}
