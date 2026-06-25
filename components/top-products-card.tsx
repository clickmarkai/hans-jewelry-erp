import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { orders } from "@/lib/mock-data"
import Link from "next/link"

function computeTopProducts() {
  const revenue: Record<string, number> = {}
  for (const order of orders) {
    for (const item of order.items) {
      revenue[item.productName] = (revenue[item.productName] || 0) + item.priceRp * item.qty
    }
  }
  return Object.entries(revenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, rev], i) => ({ rank: i + 1, name, revenue: rev }))
}

const topProducts = computeTopProducts()
const maxRev = topProducts[0]?.revenue || 1

const RANK_COLORS = [
  'text-amber-500',
  'text-slate-500',
  'text-orange-400',
  'text-slate-400',
  'text-slate-400',
]

export function TopProductsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">Top Products</CardTitle>
        <Link href="/inventory" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all →
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {topProducts.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className={`text-sm font-bold w-5 text-right ${RANK_COLORS[p.rank - 1]}`}>
              {p.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${(p.revenue / maxRev) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums shrink-0">
              Rp {(p.revenue / 1000000).toFixed(1)}jt
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
