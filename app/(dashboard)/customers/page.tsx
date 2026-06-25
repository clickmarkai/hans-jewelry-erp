'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import FilterTabs from '@/components/ui/FilterTabs'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SlideOver from '@/components/layout/SlideOver'
import { customers, Customer, formatRp, getStatusColor, orders } from '@/lib/mock-data'
import { Download, Users } from 'lucide-react'

const TABS = ['All', 'VIP', 'Regular', 'New']

const FLAG: Record<string, string> = {
  ID: '🇮🇩', NL: '🇳🇱', AU: '🇦🇺', DE: '🇩🇪', SG: '🇸🇬', JP: '🇯🇵', CH: '🇨🇭',
}

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<Customer | null>(null)

  const filtered = activeTab === 'All'
    ? customers
    : customers.filter((c) => c.segment === activeTab)

  const customerOrders = selected
    ? orders.filter((o) => o.customerName === selected.name)
    : []

  return (
    <div>
      <TopBar
        title="Customers"
        action={
          <Button size="sm" variant="secondary">
            <Download size={13} strokeWidth={1.75} />
            Export
          </Button>
        }
      />

      <div className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Total Pelanggan</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{customers.length}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">VIP</p>
            <p className="text-[22px] font-medium text-[#16A34A] mt-1">
              {customers.filter(c => c.segment === 'VIP').length}
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Avg. LTV</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">
              {formatRp(Math.round(customers.reduce((s, c) => s + c.lifetimeValueRp, 0) / customers.length))}
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Pelanggan Baru (MTD)</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">3</p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
          <div className="px-5 py-4 border-b border-[#E5E5E5]">
            <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
          </div>

          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Nama</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Email</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Lokasi</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Orders</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Lifetime Value</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Pembelian Terakhir</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Segmen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#FAFAFA] cursor-pointer transition-colors"
                  onClick={() => setSelected(customer)}
                >
                  <td className="px-5 py-3 text-[#0A0A0A] font-medium">{customer.name}</td>
                  <td className="px-5 py-3 text-[#737373]">{customer.email}</td>
                  <td className="px-5 py-3 text-[#737373]">
                    <span className="mr-1.5">{FLAG[customer.country] || ''}</span>
                    {customer.city}
                  </td>
                  <td className="px-5 py-3 text-right text-[#0A0A0A]">{customer.totalOrders}</td>
                  <td className="px-5 py-3 text-right text-[#0A0A0A] font-medium">{formatRp(customer.lifetimeValueRp)}</td>
                  <td className="px-5 py-3 text-[#737373]">{customer.lastPurchase}</td>
                  <td className="px-5 py-3">
                    <Badge variant={getStatusColor(customer.segment)} size="sm">{customer.segment}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users size={32} strokeWidth={1} className="text-[#D4D4D4] mx-auto mb-3" />
              <p className="text-[13px] text-[#737373]">Tidak ada pelanggan di segmen ini</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Detail SlideOver */}
      <SlideOver
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ''}
      >
        {selected && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[2px] bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-center text-[16px] font-medium text-[#737373]">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[#0A0A0A]">{selected.name}</h3>
                <p className="text-[12px] text-[#737373]">{selected.email}</p>
                <div className="mt-1.5">
                  <Badge variant={getStatusColor(selected.segment)}>{selected.segment}</Badge>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] p-3">
                <p className="text-[11px] text-[#737373]">Lifetime Value</p>
                <p className="text-[16px] font-medium text-[#0A0A0A] mt-0.5">{formatRp(selected.lifetimeValueRp)}</p>
              </div>
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] p-3">
                <p className="text-[11px] text-[#737373]">Total Orders</p>
                <p className="text-[16px] font-medium text-[#0A0A0A] mt-0.5">{selected.totalOrders}</p>
              </div>
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] p-3">
                <p className="text-[11px] text-[#737373]">Lokasi</p>
                <p className="text-[13px] font-medium text-[#0A0A0A] mt-0.5">{selected.city}, {selected.country}</p>
              </div>
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] p-3">
                <p className="text-[11px] text-[#737373]">Pembelian Terakhir</p>
                <p className="text-[13px] font-medium text-[#0A0A0A] mt-0.5">{selected.lastPurchase}</p>
              </div>
            </div>

            {/* Top Products */}
            <div>
              <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-2">Produk Favorit</p>
              <div className="space-y-1.5">
                {selected.topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <span className="text-[#A3A3A3] font-mono">{i + 1}.</span>
                    <span className="text-[#0A0A0A]">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order History */}
            {customerOrders.length > 0 && (
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-2">Riwayat Pesanan</p>
                <div className="border border-[#E5E5E5] rounded-[2px] overflow-hidden">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between px-3 py-2.5 border-b border-[#F0F0F0] last:border-0 text-[12px]">
                      <div>
                        <p className="font-mono text-[#737373]">{order.id.replace('ORD-2025-', '#')}</p>
                        <p className="text-[11px] text-[#A3A3A3]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#0A0A0A]">{formatRp(order.totalRp)}</p>
                        <Badge variant={getStatusColor(order.status)} size="sm">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SlideOver>
    </div>
  )
}
