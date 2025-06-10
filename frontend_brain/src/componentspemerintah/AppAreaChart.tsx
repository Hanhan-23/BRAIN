"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/componentspemerintah/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const chartConfig = {
  jalan: {
    label: "Jalan Rusak",
    color: "var(--chart-3)",
  },
  lampu: {
    label: "Lampu Penerangan",
    color: "var(--chart-2)",
  },
  jembatan: {
    label: "Jembatan Rusak",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", jalan: 12, lampu: 2, jembatan: 1 },
  { month: "Feb", jalan: 18, lampu: 4, jembatan: 4 },
  { month: "Mar", jalan: 16, lampu: 8, jembatan: 1 },
  { month: "Apr", jalan: 9, lampu: 1, jembatan: 3 },
  { month: "Mei", jalan: 28, lampu: 9, jembatan: 2 },
  { month: "Jun", jalan: 3, lampu: 0, jembatan: 3 },
  { month: "Jul", jalan: 15, lampu: 5, jembatan: 2 },
];

const AppAreaChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            fontSize={12}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            interval={0} // Show all labels
          />
          <YAxis
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            fontSize={12}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            width={30} // Fixed width for consistent spacing
          />
          <ChartTooltip 
            content={<ChartTooltipContent />} 
            wrapperStyle={{ outline: "none" }}
          />
          <ChartLegend 
            content={<ChartLegendContent />}
            wrapperStyle={{ paddingTop: "10px" }}
          />
          <defs>
            <linearGradient id="fillJalan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-jalan)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-jalan)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillLampu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-lampu)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-lampu)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillJembatan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-jembatan)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-jembatan)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="jalan"
            type="monotone"
            fill="url(#fillJalan)"
            fillOpacity={0.4}
            stroke="var(--color-jalan)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Area
            dataKey="lampu"
            type="monotone"
            fill="url(#fillLampu)"
            fillOpacity={0.4}
            stroke="var(--color-lampu)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Area
            dataKey="jembatan"
            type="monotone"
            fill="url(#fillJembatan)"
            fillOpacity={0.4}
            stroke="var(--color-jembatan)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AppAreaChart;