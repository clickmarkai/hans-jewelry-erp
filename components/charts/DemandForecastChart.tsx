'use client'

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { ForecastPoint } from '@/lib/mock-data'

interface DemandForecastChartProps {
  data: ForecastPoint[]
  height?: number
}

function formatRpShort(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}jt`
  return String(value)
}

export default function DemandForecastChart({ data, height = 220 }: DemandForecastChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#F0F0F0" />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatRpShort}
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value, name) => [
            `Rp ${Number(value).toLocaleString('id-ID')}`,
            name === 'actualRp' ? 'Aktual' : 'Forecast',
          ]}
          contentStyle={{
            border: '1px solid #E5E5E5',
            borderRadius: '2px',
            fontSize: 12,
            backgroundColor: '#fff',
            boxShadow: 'none',
          }}
        />
        <Legend
          formatter={(value) => (value === 'actualRp' ? 'Aktual' : 'Forecast')}
          wrapperStyle={{ fontSize: 11, color: '#737373' }}
        />
        <Line
          type="monotone"
          dataKey="actualRp"
          stroke="#0A0A0A"
          strokeWidth={2}
          dot={{ r: 3, fill: '#0A0A0A' }}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="forecastRp"
          stroke="#A3A3A3"
          strokeWidth={1.5}
          strokeDasharray="5 4"
          dot={false}
          activeDot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
