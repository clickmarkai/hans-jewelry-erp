'use client'

import RevenueLineChart from '@/components/charts/RevenueLineChart'
import CategoryBarChart from '@/components/charts/CategoryBarChart'
import DemandForecastChart from '@/components/charts/DemandForecastChart'
import DonutChart from '@/components/charts/DonutChart'
import {
  dailyRevenue,
  categoryRevenue,
  channelRevenue,
  monthlyRevenue,
  inventoryTurnover,
  demandForecast,
  formatRp,
} from '@/lib/mock-data'

export default function AnalyticsPage() {
  const channelData = channelRevenue.map((c) => ({
    name: c.channel,
    value: c.revenue,
  }))

  const turnoverData = inventoryTurnover.map((t) => ({
    name: t.category,
    value: t.turnover,
  }))

  const monthlyData = monthlyRevenue.map((m) => ({
    name: m.month,
    value: m.revenue,
  }))

  const donutData = categoryRevenue.map((c) => ({
    name: c.category,
    value: c.revenue,
  }))

  const totalRevenue90d = dailyRevenue.reduce((s, d) => s + d.revenueRp, 0)
  const avgDaily = Math.round(totalRevenue90d / dailyRevenue.length)

  return (
    <div className="space-y-6">
      <div>
        <p className="maison-kicker">Maison intelligence</p>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Revenue, inventory velocity, demand forecast, and customer channel mix.</p>
      </div>

      {/* Revenue Section */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Revenue</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Revenue 90 Hari</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-foreground">{formatRp(totalRevenue90d)}</p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Rata-rata/Hari</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-foreground">{formatRp(avgDaily)}</p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Pertumbuhan MoM</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-emerald-700">+12%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <p className="text-[13px] font-medium text-foreground mb-4">Revenue Harian — 90 Hari</p>
            <RevenueLineChart data={dailyRevenue} days={90} />
          </div>
          <div className="rounded-md border bg-card p-5">
            <p className="text-[13px] font-medium text-foreground mb-4">Revenue Bulanan (2025)</p>
            <CategoryBarChart
              data={monthlyData}
              height={200}
              valueFormatter={(v) => `Rp ${(v / 1000000).toFixed(0)}jt`}
            />
          </div>
        </div>
      </section>

      {/* Inventory & Demand Section */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Inventory & Demand Forecast</h2>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] font-medium text-foreground">Demand Forecast — 12 Minggu</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-foreground/70 inline-block" />
                  Aktual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-muted-foreground inline-block" />
                  Forecast
                </span>
              </div>
            </div>
            <DemandForecastChart data={demandForecast} height={220} />
          </div>
          <div className="rounded-md border bg-card p-5">
            <p className="text-[13px] font-medium text-foreground mb-4">Inventory Turnover per Kategori</p>
            <CategoryBarChart
              data={turnoverData}
              height={220}
              valueFormatter={(v) => `${v}x`}
              barColor="var(--chart-2)"
            />
          </div>
        </div>
      </section>

      {/* Customer & Channel Section */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Pelanggan & Channel</h2>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <p className="text-[13px] font-medium text-foreground mb-4">Revenue per Koleksi (MTD)</p>
            <DonutChart data={donutData} height={220} />
          </div>
          <div className="rounded-md border bg-card p-5">
            <p className="text-[13px] font-medium text-foreground mb-4">Revenue per Channel</p>
            <CategoryBarChart
              data={channelData}
              horizontal={true}
              height={180}
              valueFormatter={(v) => `Rp ${(v / 1000000).toFixed(1)}jt`}
            />
          </div>
        </div>
      </section>

      {/* Monthly Summary Table */}
      <section>
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Ringkasan Bulanan</h2>
        <div className="rounded-md border bg-card overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Bulan</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">vs Bulan Lalu</th>
                <th className="text-right px-5 py-3 text-muted-foreground font-medium">Performa</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map((m, i) => {
                const prev = i > 0 ? monthlyRevenue[i - 1].revenue : null
                const delta = prev ? ((m.revenue - prev) / prev * 100).toFixed(1) : null
                const positive = delta ? parseFloat(delta) > 0 : true
                return (
                  <tr key={m.month} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 text-foreground font-medium">{m.month} 2025</td>
                    <td className="px-5 py-3 text-right text-foreground">{formatRp(m.revenue)}</td>
                    <td className={`px-5 py-3 text-right ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                      {delta ? `${positive ? '+' : ''}${delta}%` : '—'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <div className="h-1.5 rounded-sm bg-muted w-24 overflow-hidden">
                          <div
                            className="h-full bg-foreground/60 rounded-sm"
                            style={{ width: `${(m.revenue / 45000000 * 100).toFixed(0)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
