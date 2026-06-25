'use client'

import { ChatMessage as ChatMessageType } from '@/lib/mock-data'
import { getStatusColor } from '@/lib/mock-data'
import CategoryBarChart from '@/components/charts/CategoryBarChart'
import DonutChart from '@/components/charts/DonutChart'
import { Badge } from '@/components/ui/badge'

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
        className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-[11px] font-medium mt-0.5 ${
          isUser
            ? 'bg-foreground text-background'
            : 'bg-muted text-muted-foreground border'
        }`}
      >
        {isUser ? 'H' : 'AI'}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div
          className={`px-4 py-3 rounded-md text-[13px] leading-relaxed ${
            isUser
              ? 'bg-foreground text-background'
              : 'bg-muted text-foreground border'
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
          <div className="w-full border rounded-md bg-card p-4">
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
          <div className="w-full border rounded-md bg-card p-4">
            <DonutChart
              data={message.chartData as DonutDataItem[]}
              height={200}
            />
          </div>
        )}

        {message.chartType === 'table' && message.chartData && (
          <div className="w-full border rounded-md overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">SKU</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Produk</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Stok</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Min.</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(message.chartData as TableDataItem[]).map((row, i) => (
                  <tr key={i} className="border-b last:border-0 bg-card">
                    <td className="px-3 py-2 text-muted-foreground font-mono">{row.sku}</td>
                    <td className="px-3 py-2 text-foreground">{row.name}</td>
                    <td className="px-3 py-2 text-right text-foreground font-medium">{row.stock}</td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{row.reorderPoint}</td>
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
