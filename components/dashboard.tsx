import { WelcomeBanner } from "@/components/welcome-banner"
import { DashboardStats } from "@/components/stats"
import { RevenueChart } from "@/components/revenue-chart"
import { CategoryRankChart } from "@/components/category-rank-chart"
import { RecentOrdersCard } from "@/components/recent-orders-card"
import { LowStockCard } from "@/components/low-stock-card"
import { TopProductsCard } from "@/components/top-products-card"
import { ActivityFeed } from "@/components/activity-feed"

export function Dashboard() {
  return (
    <div className="space-y-5">
      <WelcomeBanner />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <RevenueChart />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersCard />
        </div>
        <ActivityFeed />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TopProductsCard />
        <div className="lg:col-span-2">
          <LowStockCard />
        </div>
      </div>
    </div>
  )
}
