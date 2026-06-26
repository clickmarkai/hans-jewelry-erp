"use client";

import { useId, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatChartAxisTick, formatChartTooltipDate } from "@/components/formater";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { dailyRevenue } from "@/lib/mock-data";

type PeriodDays = 7 | 14 | 30 | 60 | 90;

const xAxisIntervalByPeriod: Record<PeriodDays, number> = {
  7: 0,
  14: 1,
  30: 3,
  60: 4,
  90: 6,
};

const chartConfig = {
  revenueRp: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function formatRpShort(value: number) {
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
  if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)}rb`;
  return `Rp ${value}`;
}

export function RevenueChart() {
  const chartUid = useId().replace(/:/g, "");
  const idAreaGradient = `revenue-area-grad-${chartUid}`;
  const [periodDays, setPeriodDays] = useState<PeriodDays>(30);

  const chartRows = useMemo(
    () => dailyRevenue.slice(-periodDays),
    [periodDays]
  );

  const growthPct = useMemo(() => {
    const first = chartRows[0]?.revenueRp ?? 0;
    const last = chartRows.at(-1)?.revenueRp ?? first;
    if (!first) return 0;
    return ((last - first) / first) * 100;
  }, [chartRows]);

  let xAxisMinTickGap: number | undefined;
  if (periodDays <= 7) {
    xAxisMinTickGap = undefined;
  } else {
    xAxisMinTickGap = Math.max(8, Math.min(52, Math.floor(periodDays / 2)));
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="maison-kicker">Revenue overview</p>
          <CardTitle className="mt-1 text-balance">Rp 38.4jt</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Channel revenue trend across the selected period.</p>
        </div>
        <Select
          onValueChange={(v) => setPeriodDays(Number(v) as PeriodDays)}
          value={String(periodDays)}
        >
          <SelectTrigger
            aria-label="Revenue time range"
            className="w-full min-w-36 sm:w-fit"
            
          >
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[248px] w-full p-0"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={[...chartRows]}
            margin={{ left: 24, right: 8, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id={idAreaGradient} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenueRp)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-revenueRp)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              interval={xAxisIntervalByPeriod[periodDays]}
              minTickGap={xAxisMinTickGap}
              tickFormatter={(value) => formatChartAxisTick(String(value), periodDays)}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatRpShort}
              tick={{ fontSize: 11 }}
              width={64}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="min-w-40"
                  indicator="line"
                  formatter={(value) => [`Rp ${Number(value).toLocaleString("id-ID")}`, "Revenue"]}
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload;
                    if (!row?.date) return "";
                    return formatChartTooltipDate(row.date, "short");
                  }}
                />
              }
            />
            <Area
              dataKey="revenueRp"
              dot={false}
              fill={`url(#${idAreaGradient})`}
              stroke="var(--color-revenueRp)"
              strokeWidth={2.5}
              type="monotone"
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Delta value={growthPct}>
            <DeltaIcon />
            <DeltaValue />
          </Delta>
          <p className="inline-flex text-pretty">
            dibanding {periodDays} hari lalu
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
