import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { orders } from "@/lib/mock-data"
import Link from "next/link"
import { MaisonProductImage } from "@/components/maison"

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

export function TopProductsCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <p className="maison-kicker">Assortment</p>
          <CardTitle className="mt-1 text-xl">Top Products</CardTitle>
        </div>
        <Link href="/inventory" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {topProducts.map((p, index) => (
          <div key={p.name} className="flex items-center gap-3">
            <MaisonProductImage className="size-11 rounded-md border" slot={index} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">0{p.rank}</span>
                <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
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
