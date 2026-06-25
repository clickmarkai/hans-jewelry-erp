'use client'

import TopBar from '@/components/layout/TopBar'
import KPICard from '@/components/ui/KPICard'
import Badge from '@/components/ui/Badge'
import RevenueLineChart from '@/components/charts/RevenueLineChart'
import CategoryBarChart from '@/components/charts/CategoryBarChart'
import {
  kpiData,
  dailyRevenue,
  categoryRevenue,
  orders,
  products,
  formatRp,
  getStatusColor,
} from '@/lib/mock-data'

const recentOrders = orders.slice(0, 5)
const lowStockItems = products.filter((p) => p.status === 'Low' || p.status === 'Out of Stock').slice(0, 6)

const categoryData = categoryRevenue.map((c) => ({
  name: c.category,
  value: c.revenue,
}))

export default function DashboardPage() {
  return (
    <div>
      <TopBar
        title="Overview"
        action={
          <span className="text-[12px] text-[#737373]">Juni 2025</span>
        }
      />

      <div className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard
            label="Revenue (MTD)"
            value={formatRp(kpiData.revenueMtdRp)}
            delta={`${kpiData.revenueMtdDelta} vs bulan lalu`}
            deltaPositive={true}
          />
          <KPICard
            label="Active Orders"
            value={String(kpiData.activeOrders)}
            delta={kpiData.activeOrdersDelta}
            deltaPositive={true}
          />
          <KPICard
            label="Low Stock Items"
            value={String(kpiData.lowStockItems)}
            highlight={kpiData.lowStockItems > 0}
          />
          <KPICard
            label="New Customers (MTD)"
            value={String(kpiData.newCustomersMtd)}
            delta={kpiData.newCustomersDelta}
            deltaPositive={true}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-medium text-[#0A0A0A]">Revenue — 30 Hari Terakhir</h2>
              <span className="text-[11px] text-[#A3A3A3]">Harian</span>
            </div>
            <RevenueLineChart data={dailyRevenue} days={30} />
          </div>

          <div className="border border-[#E5E5E5] rounded-[2px] p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-medium text-[#0A0A0A]">Revenue per Kategori</h2>
              <span className="text-[11px] text-[#A3A3A3]">MTD</span>
            </div>
            <CategoryBarChart
              data={categoryData}
              horizontal={true}
              height={200}
              valueFormatter={(v) => `Rp ${(v / 1000000).toFixed(1)}jt`}
            />
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Recent Orders */}
          <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
            <div className="px-5 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-[#0A0A0A]">Pesanan Terbaru</h2>
              <a href="/orders" className="text-[11px] text-[#737373] hover:text-[#0A0A0A]">Lihat semua →</a>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#F0F0F0]">
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">Order</th>
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">Pelanggan</th>
                  <th className="text-right px-5 py-2.5 text-[#737373] font-medium">Total</th>
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#F0F0F0] last:border-0">
                    <td className="px-5 py-3 font-mono text-[#737373]">{order.id.replace('ORD-2025-', '#')}</td>
                    <td className="px-5 py-3 text-[#0A0A0A]">{order.customerName}</td>
                    <td className="px-5 py-3 text-right text-[#0A0A0A] font-medium">{formatRp(order.totalRp)}</td>
                    <td className="px-5 py-3">
                      <Badge variant={getStatusColor(order.status)} size="sm">{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Alerts */}
          <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
            <div className="px-5 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-[#0A0A0A]">Peringatan Stok</h2>
              <a href="/inventory" className="text-[11px] text-[#737373] hover:text-[#0A0A0A]">Lihat inventory →</a>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#F0F0F0]">
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">SKU</th>
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">Produk</th>
                  <th className="text-right px-5 py-2.5 text-[#737373] font-medium">Stok</th>
                  <th className="text-left px-5 py-2.5 text-[#737373] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#F0F0F0] last:border-0">
                    <td className="px-5 py-3 font-mono text-[#737373]">{item.sku}</td>
                    <td className="px-5 py-3 text-[#0A0A0A]">{item.name}</td>
                    <td className="px-5 py-3 text-right font-medium text-[#0A0A0A]">{item.stock}</td>
                    <td className="px-5 py-3">
                      <Badge variant={getStatusColor(item.status)} size="sm">{item.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
