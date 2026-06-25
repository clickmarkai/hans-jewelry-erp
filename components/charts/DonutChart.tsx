'use client'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

interface DonutData {
  name: string
  value: number
}

interface DonutChartProps {
  data: DonutData[]
  height?: number
  valueFormatter?: (v: number) => string
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

function defaultFormatter(v: number) {
  if (v >= 1000000) return `Rp ${(v / 1000000).toFixed(1)}jt`
  return `Rp ${v.toLocaleString('id-ID')}`
}

export default function DonutChart({ data, height = 220, valueFormatter = defaultFormatter }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [valueFormatter(Number(value)), '']}
          contentStyle={{
            border: '1px solid var(--border)',
            borderRadius: '4px',
            fontSize: 12,
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
            boxShadow: 'none',
          }}
        />
        <Legend
          formatter={(value) => value}
          wrapperStyle={{ fontSize: 11, color: 'var(--muted-foreground)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
