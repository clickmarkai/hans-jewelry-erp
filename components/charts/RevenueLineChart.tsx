'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { DailyRevenue } from '@/lib/mock-data'

interface RevenueLineChartProps {
  data: DailyRevenue[]
  days?: number
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })
}

function formatRpShort(value: number) {
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}jt`
  if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)}rb`
  return `Rp ${value}`
}

export default function RevenueLineChart({ data, days = 30 }: RevenueLineChartProps) {
  const sliced = data.slice(-days)

  const chartData = sliced.map((d, i) => ({
    ...d,
    label: i % 7 === 0 ? formatShortDate(d.date) : '',
    displayDate: formatShortDate(d.date),
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#F0F0F0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatRpShort}
          tick={{ fontSize: 11, fill: '#A3A3A3' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Revenue']}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.displayDate || ''}
          contentStyle={{
            border: '1px solid #E5E5E5',
            borderRadius: '2px',
            fontSize: 12,
            backgroundColor: '#fff',
            boxShadow: 'none',
          }}
        />
        <Line
          type="monotone"
          dataKey="revenueRp"
          stroke="#0A0A0A"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 3, fill: '#0A0A0A' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
