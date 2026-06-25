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

export default function CategoryBarChart({
  data,
  horizontal = false,
  height = 200,
  valueFormatter = defaultFormatter,
  barColor = '#0A0A0A',
}: CategoryBarChartProps) {
  if (horizontal) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke="#F0F0F0" />
          <XAxis
            type="number"
            tickFormatter={valueFormatter}
            tick={{ fontSize: 11, fill: '#A3A3A3' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#737373' }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip
            formatter={(value) => [valueFormatter(Number(value)), 'Revenue']}
            contentStyle={{
              border: '1px solid #E5E5E5',
              borderRadius: '2px',
              fontSize: 12,
              backgroundColor: '#fff',
              boxShadow: 'none',
            }}
          />
          <Bar dataKey="value" fill={barColor} radius={[0, 2, 2, 0]} barSize={18}>
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
        <CartesianGrid vertical={false} stroke="#F0F0F0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={valueFormatter}
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value) => [valueFormatter(Number(value)), 'Revenue']}
          contentStyle={{
            border: '1px solid #E5E5E5',
            borderRadius: '2px',
            fontSize: 12,
            backgroundColor: '#fff',
            boxShadow: 'none',
          }}
        />
        <Bar dataKey="value" fill={barColor} radius={[2, 2, 0, 0]} barSize={28}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || barColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
