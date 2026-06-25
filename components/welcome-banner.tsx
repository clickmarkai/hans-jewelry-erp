import { orders, products } from "@/lib/mock-data"
import { AlertTriangle, Clock } from "lucide-react"

export function WelcomeBanner() {
  const pendingOrders = orders.filter(o => o.status === 'Pending').length
  const lowStockCount = products.filter(p => p.status === 'Low' || p.status === 'Out of Stock').length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{greeting}, Hans 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Here's what's happening at Hans Jewelry today.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {pendingOrders > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400">
            <Clock size={12} />
            {pendingOrders} pending orders
          </div>
        )}
        {lowStockCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            <AlertTriangle size={12} />
            {lowStockCount} stock alerts
          </div>
        )}
      </div>
    </div>
  )
}
