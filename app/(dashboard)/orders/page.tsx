'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import FilterTabs from '@/components/ui/FilterTabs'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SlideOver from '@/components/layout/SlideOver'
import { orders, Order, formatRp, getStatusColor } from '@/lib/mock-data'
import { Download, ChevronDown, ShoppingBag } from 'lucide-react'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Returned']

const channelColors: Record<string, string> = {
  Tokopedia: '#34C759',
  Shopee: '#FF5733',
  Website: '#0A0A0A',
  Instagram: '#E1306C',
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selected, setSelected] = useState<Order | null>(null)

  const filtered = activeTab === 'All'
    ? orders
    : orders.filter((o) => o.status === activeTab)

  const counts = {
    All: orders.length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Processing: orders.filter(o => o.status === 'Processing').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
    Returned: orders.filter(o => o.status === 'Returned').length,
  }

  return (
    <div>
      <TopBar
        title="Orders"
        action={
          <Button size="sm" variant="secondary">
            <Download size={13} strokeWidth={1.75} />
            Export
          </Button>
        }
      />

      <div className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-5 gap-3">
          {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Returned'] as const).map((status) => (
            <div key={status} className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide">{status}</p>
              <p className="text-[22px] font-medium mt-1">
                <span className={
                  status === 'Delivered' ? 'text-[#16A34A]' :
                  status === 'Returned' ? 'text-[#DC2626]' :
                  status === 'Pending' ? 'text-[#D97706]' :
                  'text-[#0A0A0A]'
                }>{counts[status]}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
          <div className="px-5 py-4 border-b border-[#E5E5E5]">
            <FilterTabs tabs={STATUS_TABS} active={activeTab} onChange={setActiveTab} />
          </div>

          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="w-8 px-3 py-3" />
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Order ID</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Tanggal</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Pelanggan</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Kota</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Items</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Total</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Channel</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  >
                    <td className="px-3 py-3 text-[#737373]">
                      <ChevronDown
                        size={13}
                        strokeWidth={1.75}
                        className={`transition-transform ${expanded === order.id ? 'rotate-180' : ''}`}
                      />
                    </td>
                    <td className="px-5 py-3 font-mono text-[#737373]">{order.id.replace('ORD-2025-', '#')}</td>
                    <td className="px-5 py-3 text-[#737373]">{order.date}</td>
                    <td className="px-5 py-3 text-[#0A0A0A] font-medium">{order.customerName}</td>
                    <td className="px-5 py-3 text-[#737373]">{order.customerCity}</td>
                    <td className="px-5 py-3 text-right text-[#737373]">{order.items.length}</td>
                    <td className="px-5 py-3 text-right text-[#0A0A0A] font-medium">{formatRp(order.totalRp)}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: channelColors[order.channel] || '#737373' }}
                      >
                        {order.channel}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={getStatusColor(order.status)} size="sm">{order.status}</Badge>
                    </td>
                  </tr>
                  {expanded === order.id && (
                    <tr key={`${order.id}-expand`} className="border-b border-[#F0F0F0] bg-[#FAFAFA]">
                      <td colSpan={9} className="px-12 py-3">
                        <div className="space-y-1">
                          <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-2">Item Detail</p>
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#F0F0F0] last:border-0">
                              <div>
                                <span className="text-[12px] text-[#0A0A0A]">{item.productName}</span>
                                <span className="text-[11px] text-[#A3A3A3] ml-2">SKU: {item.productSku}</span>
                              </div>
                              <div className="flex gap-6 text-right text-[12px]">
                                <span className="text-[#737373]">Qty: {item.qty}</span>
                                <span className="text-[#0A0A0A] font-medium">{formatRp(item.priceRp)}</span>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2 text-[12px]">
                            <span className="text-[#737373]">Ongkir: {formatRp(order.shippingRp)}</span>
                            <span className="font-medium text-[#0A0A0A]">Total: {formatRp(order.totalRp)}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <ShoppingBag size={32} strokeWidth={1} className="text-[#D4D4D4] mx-auto mb-3" />
              <p className="text-[13px] text-[#737373]">Tidak ada pesanan dengan status ini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
