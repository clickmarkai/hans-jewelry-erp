'use client'

import { useState } from 'react'
import FilterTabs from '@/components/ui/FilterTabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SlideOver from '@/components/layout/SlideOver'
import { customers, Customer, formatRp, getStatusColor, orders } from '@/lib/mock-data'
import { Download, Users } from 'lucide-react'

const TABS = ['All', 'VIP', 'Regular', 'New']

const FLAG: Record<string, string> = {
  ID: '🇮🇩', NL: '🇳🇱', AU: '🇦🇺', DE: '🇩🇪', SG: '🇸🇬', JP: '🇯🇵', CH: '🇨🇭',
}

function Avatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const colors = [
    'bg-indigo-100 text-indigo-700',
    'bg-amber-100 text-amber-700',
    'bg-emerald-100 text-emerald-700',
    'bg-pink-100 text-pink-700',
    'bg-violet-100 text-violet-700',
    'bg-cyan-100 text-cyan-700',
  ]
  const color = colors[name.charCodeAt(0) % colors.length]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const sz = size === 'sm' ? 'w-7 h-7 text-[11px]' : 'w-9 h-9 text-xs'
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
      {initials}
    </div>
  )
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
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Customers</h1>
        <Button size="sm" variant="secondary">
          <Download size={13} strokeWidth={1.75} />
          Export
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Pelanggan</p>
          <p className="text-2xl font-semibold text-foreground mt-0.5">{customers.length}</p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">VIP</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-0.5">
            {customers.filter(c => c.segment === 'VIP').length}
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Avg. LTV</p>
          <p className="text-2xl font-semibold text-foreground mt-0.5">
            {formatRp(Math.round(customers.reduce((s, c) => s + c.lifetimeValueRp, 0) / customers.length))}
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pelanggan Baru (MTD)</p>
          <p className="text-2xl font-semibold text-foreground mt-0.5">3</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b">
          <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Nama</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Lokasi</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Orders</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Lifetime Value</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Pembelian Terakhir</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Segmen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setSelected(customer)}
                >
                  <td className="px-4 py-3 text-foreground font-medium">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={customer.name} />
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{customer.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="mr-1.5">{FLAG[customer.country] || ''}</span>
                    {customer.city}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground tabular-nums">{customer.totalOrders}</td>
                  <td className={`px-4 py-3 text-right tabular-nums ${
                    customer.segment === 'VIP'
                      ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                      : 'font-medium text-foreground'
                  }`}>{formatRp(customer.lifetimeValueRp)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{customer.lastPurchase}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusColor(customer.segment)} size="sm">{customer.segment}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={32} strokeWidth={1} className="text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">Tidak ada pelanggan di segmen ini</p>
          </div>
        )}
      </div>

      {/* Customer Detail SlideOver */}
      <SlideOver open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''}>
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-muted border flex items-center justify-center text-[16px] font-medium text-muted-foreground">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-foreground">{selected.name}</h3>
                <p className="text-[12px] text-muted-foreground">{selected.email}</p>
                <div className="mt-1.5">
                  <Badge variant={getStatusColor(selected.segment)}>{selected.segment}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 border rounded-md p-3">
                <p className="text-[11px] text-muted-foreground">Lifetime Value</p>
                <p className="text-[16px] font-medium text-foreground mt-0.5 tabular-nums">{formatRp(selected.lifetimeValueRp)}</p>
              </div>
              <div className="bg-muted/30 border rounded-md p-3">
                <p className="text-[11px] text-muted-foreground">Total Orders</p>
                <p className="text-[16px] font-medium text-foreground mt-0.5">{selected.totalOrders}</p>
              </div>
              <div className="bg-muted/30 border rounded-md p-3">
                <p className="text-[11px] text-muted-foreground">Lokasi</p>
                <p className="text-[13px] font-medium text-foreground mt-0.5">{selected.city}, {selected.country}</p>
              </div>
              <div className="bg-muted/30 border rounded-md p-3">
                <p className="text-[11px] text-muted-foreground">Pembelian Terakhir</p>
                <p className="text-[13px] font-medium text-foreground mt-0.5">{selected.lastPurchase}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Produk Favorit</p>
              <div className="space-y-1.5">
                {selected.topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <span className="text-muted-foreground font-mono">{i + 1}.</span>
                    <span className="text-foreground">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {customerOrders.length > 0 && (
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Riwayat Pesanan</p>
                <div className="border rounded-md overflow-hidden">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between px-3 py-2.5 border-b last:border-0 bg-card text-[12px]">
                      <div>
                        <p className="font-mono text-muted-foreground">{order.id.replace('ORD-2025-', '#')}</p>
                        <p className="text-[11px] text-muted-foreground/70">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground tabular-nums">{formatRp(order.totalRp)}</p>
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
