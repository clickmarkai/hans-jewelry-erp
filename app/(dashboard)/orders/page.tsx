'use client'

import { useState } from 'react'
import FilterTabs from '@/components/ui/FilterTabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SlideOver from '@/components/layout/SlideOver'
import { orders, Order, formatRp, getStatusColor } from '@/lib/mock-data'
import { Download, ChevronDown, ShoppingBag } from 'lucide-react'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Returned']

const chipColor: Record<string, string> = {
  Tokopedia: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Shopee:    'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
  Instagram: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
  Website:   'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400',
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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selected, setSelected] = useState<Order | null>(null)

  const filtered = activeTab === 'All'
    ? orders
    : orders.filter((o) => o.status === activeTab)

  const counts = {
    Pending:    orders.filter(o => o.status === 'Pending').length,
    Processing: orders.filter(o => o.status === 'Processing').length,
    Shipped:    orders.filter(o => o.status === 'Shipped').length,
    Delivered:  orders.filter(o => o.status === 'Delivered').length,
    Returned:   orders.filter(o => o.status === 'Returned').length,
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Orders</h1>
        <Button size="sm" variant="secondary">
          <Download size={13} strokeWidth={1.75} />
          Export
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Returned'] as const).map((status) => (
          <div key={status} className="rounded-md border bg-card px-4 py-3">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{status}</p>
            <p className={`text-2xl font-semibold mt-0.5 ${
              status === 'Delivered'  ? 'text-emerald-600' :
              status === 'Returned'   ? 'text-red-500' :
              status === 'Pending'    ? 'text-amber-600' :
              'text-foreground'
            }`}>{counts[status]}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b">
          <FilterTabs tabs={STATUS_TABS} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="w-8 px-3 py-3" />
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Order ID</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Tanggal</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Pelanggan</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Kota</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Items</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Total</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Channel</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  >
                    <td className="px-3 py-3 text-muted-foreground">
                      <ChevronDown
                        size={13}
                        strokeWidth={1.75}
                        className={`transition-transform ${expanded === order.id ? 'rotate-180' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{order.id.replace('ORD-2025-', '#')}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3 text-foreground font-medium">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={order.customerName} />
                        <span>{order.customerName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{order.customerCity}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{order.items.length}</td>
                    <td className="px-4 py-3 text-right text-foreground font-medium tabular-nums">{formatRp(order.totalRp)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${chipColor[order.channel] || 'bg-slate-100 text-slate-600'}`}>
                        {order.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusColor(order.status)} size="sm">{order.status}</Badge>
                    </td>
                  </tr>
                  {expanded === order.id && (
                    <tr key={`${order.id}-expand`} className="border-b bg-muted/20">
                      <td colSpan={9} className="px-10 py-3">
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Item Detail</p>
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-1.5 border-b last:border-0">
                              <div>
                                <span className="text-[12px] text-foreground">{item.productName}</span>
                                <span className="text-[11px] text-muted-foreground ml-2">SKU: {item.productSku}</span>
                              </div>
                              <div className="flex gap-6 text-right text-[12px]">
                                <span className="text-muted-foreground">Qty: {item.qty}</span>
                                <span className="text-foreground font-medium tabular-nums">{formatRp(item.priceRp)}</span>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2 text-[12px]">
                            <span className="text-muted-foreground">Ongkir: {formatRp(order.shippingRp)}</span>
                            <span className="font-medium text-foreground tabular-nums">Total: {formatRp(order.totalRp)}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <ShoppingBag size={32} strokeWidth={1} className="text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">Tidak ada pesanan dengan status ini</p>
          </div>
        )}
      </div>

      <SlideOver open={!!selected} onClose={() => setSelected(null)} title={selected?.id.replace('ORD-2025-', '#') || ''}>
        {selected && (
          <div className="space-y-4 text-[13px]">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border bg-muted/30 p-3">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Pelanggan</p>
                <p className="font-medium text-foreground">{selected.customerName}</p>
                <p className="text-muted-foreground">{selected.customerCity}</p>
              </div>
              <div className="rounded-md border bg-muted/30 p-3">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Status</p>
                <Badge variant={getStatusColor(selected.status)}>{selected.status}</Badge>
                <p className="text-muted-foreground mt-1">{selected.date}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Items</p>
              <div className="rounded-md border overflow-hidden">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between px-3 py-2.5 border-b last:border-0 bg-card">
                    <div>
                      <p className="text-foreground">{item.productName}</p>
                      <p className="text-[11px] text-muted-foreground">SKU: {item.productSku} · Qty: {item.qty}</p>
                    </div>
                    <p className="font-medium text-foreground tabular-nums">{formatRp(item.priceRp)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground">Ongkir</span>
              <span className="tabular-nums">{formatRp(selected.shippingRp)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="tabular-nums">{formatRp(selected.totalRp)}</span>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
