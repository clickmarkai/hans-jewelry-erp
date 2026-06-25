import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Percent, ArrowUpRight } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', revenue: 22400000, cogs: 8960000, grossProfit: 13440000, orders: 38 },
  { month: 'Feb', revenue: 27800000, cogs: 10530000, grossProfit: 17270000, orders: 45 },
  { month: 'Mar', revenue: 31200000, cogs: 11830000, grossProfit: 19370000, orders: 52 },
  { month: 'Apr', revenue: 29600000, cogs: 11250000, grossProfit: 18350000, orders: 49 },
  { month: 'May', revenue: 35100000, cogs: 13340000, grossProfit: 21760000, orders: 61 },
  { month: 'Jun', revenue: 38450000, cogs: 14590000, grossProfit: 23860000, orders: 67 },
]

const collectionRevenue = [
  { name: 'Classic Silver', revenue: 12400000, pct: 32, growth: 8 },
  { name: 'Bridal', revenue: 10000000, pct: 26, growth: 15 },
  { name: 'Minimalist', revenue: 7700000, pct: 20, growth: 22 },
  { name: 'Boho Chic', revenue: 6150000, pct: 16, growth: -3 },
  { name: 'Holiday 2025', revenue: 2300000, pct: 6, growth: 45 },
]

const channelRevenue = [
  { channel: 'Tokopedia', revenue: 14800000, pct: 38, orders: 28, color: 'bg-emerald-500' },
  { channel: 'Website', revenue: 11550000, pct: 30, orders: 19, color: 'bg-indigo-500' },
  { channel: 'Shopee', revenue: 8500000, pct: 22, orders: 14, color: 'bg-orange-500' },
  { channel: 'Instagram', revenue: 3600000, pct: 10, orders: 6, color: 'bg-pink-500' },
]

const currentMonth = monthlyData[monthlyData.length - 1]
const prevMonth = monthlyData[monthlyData.length - 2]
const margin = Math.round((currentMonth.grossProfit / currentMonth.revenue) * 100)
const revenueGrowth = Math.round(((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100)

function formatRp(v: number) {
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(1)}jt`
  return `Rp ${(v / 1_000).toFixed(0)}rb`
}

export default function FinancePage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Finance & Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">June 2025 · YTD summary</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">MTD Revenue</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center">
                <DollarSign size={13} strokeWidth={2} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{formatRp(currentMonth.revenue)}</p>
            <p className="text-xs text-emerald-600 mt-1">+{revenueGrowth}% vs May</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Gross Profit</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp size={13} strokeWidth={2} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{formatRp(currentMonth.grossProfit)}</p>
            <p className="text-xs text-muted-foreground mt-1">After COGS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Gross Margin</span>
              <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 flex items-center justify-center">
                <Percent size={13} strokeWidth={2} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{margin}%</p>
            <p className="text-xs text-emerald-600 mt-1">Healthy margin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Total Orders</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 flex items-center justify-center">
                <ArrowUpRight size={13} strokeWidth={2} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{currentMonth.orders}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Revenue Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Monthly Performance (2025)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Month</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">COGS</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Gross Profit</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Margin</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => {
                  const mg = Math.round((row.grossProfit / row.revenue) * 100)
                  const isLatest = i === monthlyData.length - 1
                  return (
                    <tr key={row.month} className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${isLatest ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}>
                      <td className="px-4 py-3 font-medium">{row.month} {isLatest && <span className="ml-1 text-[10px] bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 px-1.5 py-0.5 rounded-full font-medium">Current</span>}</td>
                      <td className="px-4 py-3 text-right font-medium tabular-nums">{formatRp(row.revenue)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground tabular-nums">{formatRp(row.cogs)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-600 tabular-nums">{formatRp(row.grossProfit)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${mg >= 60 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                          {mg}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Revenue by Collection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Revenue by Collection (MTD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {collectionRevenue.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{c.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-medium ${c.growth > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {c.growth > 0 ? '+' : ''}{c.growth}%
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">{formatRp(c.revenue)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue by Channel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Revenue by Channel (MTD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {channelRevenue.map((c) => (
                <div key={c.channel} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${c.color}`} />
                  <span className="text-sm font-medium flex-1">{c.channel}</span>
                  <span className="text-xs text-muted-foreground">{c.orders} orders</span>
                  <span className="text-sm font-semibold tabular-nums">{formatRp(c.revenue)}</span>
                  <span className="text-xs text-muted-foreground w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
