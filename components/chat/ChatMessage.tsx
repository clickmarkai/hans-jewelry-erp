'use client'

import { ChatMessage as ChatMessageType } from '@/lib/mock-data'
import { formatRp, getStatusColor } from '@/lib/mock-data'
import CategoryBarChart from '@/components/charts/CategoryBarChart'
import DonutChart from '@/components/charts/DonutChart'
import Badge from '@/components/ui/Badge'

interface ChatMessageProps {
  message: ChatMessageType
}

type BarDataItem = { name: string; revenue: number }
type TableDataItem = { sku: string; name: string; stock: number; reorderPoint: number; status: string }
type DonutDataItem = { name: string; value: number }

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-[2px] shrink-0 flex items-center justify-center text-[11px] font-medium mt-0.5 ${
          isUser ? 'bg-[#0A0A0A] text-white' : 'bg-[#F4F4F5] text-[#737373] border border-[#E5E5E5]'
        }`}
      >
        {isUser ? 'H' : 'AI'}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div
          className={`px-4 py-3 rounded-[2px] text-[13px] leading-relaxed ${
            isUser
              ? 'bg-[#0A0A0A] text-white'
              : 'bg-[#F9F9F9] text-[#0A0A0A] border border-[#E5E5E5]'
          }`}
        >
          {message.content.split('\n').map((line, i) => {
            const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            return (
              <span key={i} className="block">
                {formatted.includes('<strong>') ? (
                  <span dangerouslySetInnerHTML={{ __html: formatted }} />
                ) : (
                  line
                )}
              </span>
            )
          })}
        </div>

        {/* Chart/Table inline rendering */}
        {message.chartType === 'bar' && message.chartData != null && (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-[2px] p-4">
            <CategoryBarChart
              data={(message.chartData as BarDataItem[]).map((d) => ({
                name: d.name,
                value: d.revenue,
              }))}
              horizontal={true}
              height={180}
              valueFormatter={(v) => `Rp ${(v / 1000000).toFixed(1)}jt`}
            />
          </div>
        )}

        {message.chartType === 'donut' && message.chartData && (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-[2px] p-4">
            <DonutChart
              data={message.chartData as DonutDataItem[]}
              height={200}
            />
          </div>
        )}

        {message.chartType === 'table' && message.chartData && (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-[2px] overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left px-3 py-2 text-[#737373] font-medium">SKU</th>
                  <th className="text-left px-3 py-2 text-[#737373] font-medium">Produk</th>
                  <th className="text-right px-3 py-2 text-[#737373] font-medium">Stok</th>
                  <th className="text-right px-3 py-2 text-[#737373] font-medium">Min.</th>
                  <th className="text-left px-3 py-2 text-[#737373] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(message.chartData as TableDataItem[]).map((row, i) => (
                  <tr key={i} className="border-b border-[#F0F0F0] last:border-0">
                    <td className="px-3 py-2 text-[#737373] font-mono">{row.sku}</td>
                    <td className="px-3 py-2 text-[#0A0A0A]">{row.name}</td>
                    <td className="px-3 py-2 text-right text-[#0A0A0A] font-medium">{row.stock}</td>
                    <td className="px-3 py-2 text-right text-[#737373]">{row.reorderPoint}</td>
                    <td className="px-3 py-2">
                      <Badge variant={getStatusColor(row.status)} size="sm">{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
