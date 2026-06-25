'use client'

import TopBar from '@/components/layout/TopBar'
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
  const categoryData = categoryRevenue.map((c) => ({
    name: c.category,
    value: c.revenue,
  }))

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
    <div>
      <TopBar title="Analytics" action={<span className="text-[12px] text-[#737373]">90 hari terakhir</span>} />

      <div className="p-6 space-y-6">
        {/* Revenue Section */}
        <section>
          <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Revenue</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide">Revenue 90 Hari</p>
              <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{formatRp(totalRevenue90d)}</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide">Rata-rata/Hari</p>
              <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{formatRp(avgDaily)}</p>
            </div>
            <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide">Pertumbuhan MoM</p>
              <p className="text-[22px] font-medium text-[#16A34A] mt-1">+12%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <p className="text-[13px] font-medium text-[#0A0A0A] mb-4">Revenue Harian — 90 Hari</p>
              <RevenueLineChart data={dailyRevenue} days={90} />
            </div>
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <p className="text-[13px] font-medium text-[#0A0A0A] mb-4">Revenue Bulanan (2025)</p>
              <CategoryBarChart
                data={monthlyData}
                height={200}
                valueFormatter={(v) => `Rp ${(v / 1000000).toFixed(0)}jt`}
                barColor="#0A0A0A"
              />
            </div>
          </div>
        </section>

        {/* Inventory & Demand Section */}
        <section>
          <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Inventory & Demand Forecast</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-medium text-[#0A0A0A]">Demand Forecast — 12 Minggu</p>
                <div className="flex items-center gap-3 text-[11px] text-[#737373]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#0A0A0A] inline-block" />
                    Aktual
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-[#A3A3A3] inline-block" />
                    Forecast
                  </span>
                </div>
              </div>
              <DemandForecastChart data={demandForecast} height={220} />
            </div>
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <p className="text-[13px] font-medium text-[#0A0A0A] mb-4">Inventory Turnover per Kategori</p>
              <CategoryBarChart
                data={turnoverData}
                height={220}
                valueFormatter={(v) => `${v}x`}
                barColor="#525252"
              />
            </div>
          </div>
        </section>

        {/* Customer & Channel Section */}
        <section>
          <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Pelanggan & Channel</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <p className="text-[13px] font-medium text-[#0A0A0A] mb-4">Revenue per Koleksi (MTD)</p>
              <DonutChart data={donutData} height={220} />
            </div>
            <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
              <p className="text-[13px] font-medium text-[#0A0A0A] mb-4">Revenue per Channel</p>
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
          <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Ringkasan Bulanan</h2>
          <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left px-5 py-3 text-[#737373] font-medium">Bulan</th>
                  <th className="text-right px-5 py-3 text-[#737373] font-medium">Revenue</th>
                  <th className="text-right px-5 py-3 text-[#737373] font-medium">vs Bulan Lalu</th>
                  <th className="text-right px-5 py-3 text-[#737373] font-medium">Performa</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRevenue.map((m, i) => {
                  const prev = i > 0 ? monthlyRevenue[i - 1].revenue : null
                  const delta = prev ? ((m.revenue - prev) / prev * 100).toFixed(1) : null
                  const positive = delta ? parseFloat(delta) > 0 : true
                  return (
                    <tr key={m.month} className="border-b border-[#F0F0F0] last:border-0">
                      <td className="px-5 py-3 text-[#0A0A0A] font-medium">{m.month} 2025</td>
                      <td className="px-5 py-3 text-right text-[#0A0A0A]">{formatRp(m.revenue)}</td>
                      <td className={`px-5 py-3 text-right ${positive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                        {delta ? `${positive ? '+' : ''}${delta}%` : '—'}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <div className="h-1.5 rounded-[2px] bg-[#E5E5E5] w-24 overflow-hidden">
                            <div
                              className="h-full bg-[#0A0A0A] rounded-[2px]"
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
    </div>
  )
}
