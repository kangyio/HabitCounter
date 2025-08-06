"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig;

export function BaseCardBarChart({ currentCardInfo }: { currentCardInfo: CardInfo | undefined }) {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [currentYearCount, setCurrentYearCount] = useState(0);

  useEffect(() => {
    if (!currentCardInfo) return;
    const { barChartData, currentYearCount } = generateBarChartData(currentCardInfo.updatedAt);
    setBarChartData(barChartData);
    setCurrentYearCount(currentYearCount);
  }, [currentCardInfo]);

  function generateBarChartData(updateHistory: number[]): {
    barChartData: BarChartData[];
    currentYearCount: number;
  } {
    const MONTHS: Month[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ] as const;

    const chartDataInMonth = MONTHS.map(month => ({
      month,
      count: 0
    }));

    let currentYearCount = 0;

    for (let i = 0; i < updateHistory.length; i++) {
      // For BarChartData used for displaying the bar chart
      const month = dayjs(updateHistory[i]).month();
      chartDataInMonth[month].count++;

      // For CardFooter used for displaying the chart footer
      if (dayjs(updateHistory[i]).year() === dayjs().year()) currentYearCount++;
    }

    return { barChartData: chartDataInMonth, currentYearCount: currentYearCount };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{currentCardInfo?.title} Chart</CardTitle>
        <CardDescription>{`January - December ${dayjs().year()}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[360px]"
        >
          <BarChart
            accessibilityLayer
            data={barChartData}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              fill={currentCardInfo?.color || "var(--color-count)"}
              radius={8}
              minPointSize={5}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Current Year Total: {currentYearCount}
        </div>
        <div className="text-muted-foreground leading-none">Showing total counts for 12 months</div>
      </CardFooter>
    </Card>
  );
}
