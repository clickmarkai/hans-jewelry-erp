'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'

interface DataPoint {
  name: string
  value: number
  color?: string
}

interface CategoryBarChartProps {
  data: DataPoint[]
  horizontal?: boolean
  height?: number
  valueFormatter?: (v: number) => string
  barColor?: string
}

function defaultFormatter(v: number) {
  if (v >= 1000000) return `Rp ${(v / 1000000).toFixed(1)}jt`
  if (v >= 1000) return `Rp ${(v / 1000).toFixed(0)}rb`
  return String(v)
}

const tooltipStyle = {
  border: '1px solid var(--border)',
  borderRadius: '4px',
  fontSize: 12,
  backgroundColor: 'var(--card)',
  color: 'var(--foreground)',
  boxShadow: 'none',
}

export default function CategoryBarChart({
  data,
  horizontal = false,
  height = 200,
  valueFormatter = defaultFormatter,
  barColor = 'var(--chart-1)',
}: CategoryBarChartProps) {
  if (horizontal) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke="var(--border)" strokeOpacity={0.6} />
          <XAxis
            type="number"
            tickFormatter={valueFormatter}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip
            formatter={(value) => [valueFormatter(Number(value)), 'Revenue']}
            contentStyle={tooltipStyle}
          />
          <Bar dataKey="value" fill={barColor} radius={[0, 2, 2, 0]} barSize={18} isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color || barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={valueFormatter}
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value) => [valueFormatter(Number(value)), 'Revenue']}
          contentStyle={tooltipStyle}
        />
        <Bar dataKey="value" fill={barColor} radius={[2, 2, 0, 0]} barSize={28} isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || barColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
