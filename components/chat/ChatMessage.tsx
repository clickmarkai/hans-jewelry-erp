'use client'

import { ChatMessage as ChatMessageType } from '@/lib/mock-data'
import { getStatusColor } from '@/lib/mock-data'
import CategoryBarChart from '@/components/charts/CategoryBarChart'
import DonutChart from '@/components/charts/DonutChart'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

interface ChatMessageProps {
  message: ChatMessageType
}

type BarDataItem = { name: string; revenue: number }
type TableDataItem = { sku: string; name: string; stock: number; reorderPoint: number; status: string }
type DonutDataItem = { name: string; value: number }

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="flex items-end gap-2.5 max-w-[75%]">
          <div className="px-4 py-3 rounded-2xl rounded-br-sm bg-indigo-600 text-white text-sm leading-relaxed shadow-sm shadow-indigo-500/20">
            {message.content}
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-[11px] font-semibold text-white shrink-0 mb-0.5">
            H
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 max-w-[85%]">
      {/* AI Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles size={13} strokeWidth={2} className="text-white" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-card border text-sm leading-relaxed text-foreground">
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

        {/* Inline chart */}
        {message.chartType === 'bar' && message.chartData != null && (
          <div className="w-full border rounded-xl bg-card p-4 shadow-sm">
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
          <div className="w-full border rounded-xl bg-card p-4 shadow-sm">
            <DonutChart
              data={message.chartData as DonutDataItem[]}
              height={200}
            />
          </div>
        )}

        {message.chartType === 'table' && message.chartData && (
          <div className="w-full border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">SKU</th>
                  <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Product</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Stock</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">Min.</th>
                  <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(message.chartData as TableDataItem[]).map((row, i) => (
                  <tr key={i} className="border-b last:border-0 bg-card hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 text-muted-foreground font-mono text-[11px]">{row.sku}</td>
                    <td className="px-4 py-2.5 text-foreground font-medium">{row.name}</td>
                    <td className="px-4 py-2.5 text-right text-foreground font-semibold">{row.stock}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{row.reorderPoint}</td>
                    <td className="px-4 py-2.5">
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
