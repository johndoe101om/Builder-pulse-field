import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeSeriesData } from "@/lib/analytics";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface AnalyticsChartProps {
  data: TimeSeriesData[];
  title: string;
  type: "line" | "area" | "bar";
  dataKey: "bookings" | "revenue";
  height?: number;
}

export const AnalyticsChart = ({
  data,
  title,
  type,
  dataKey,
  height = 300,
}: AnalyticsChartProps) => {
  const formatValue = (value: number) => {
    if (dataKey === "revenue") {
      return `${CURRENCY_SYMBOL}${value.toLocaleString()}`;
    }
    return value.toString();
  };

  const color = dataKey === "revenue" ? "#22c55e" : "#3b82f6";

  const renderChart = () => {
    const chartProps = {
      data,
      height,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip formatter={formatValue} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip formatter={formatValue} />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={formatValue} />
            <Tooltip formatter={formatValue} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface StatusPieChartProps {
  data: PieChartData[];
  title: string;
}

export const StatusPieChart = ({ data, title }: StatusPieChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
