import { WelcomeBanner } from "@/components/welcome-banner"
import { DashboardStats } from "@/components/stats"
import { RevenueChart } from "@/components/revenue-chart"
import { RecentOrdersCard } from "@/components/recent-orders-card"
import { LowStockCard } from "@/components/low-stock-card"
import { TopProductsCard } from "@/components/top-products-card"
import { ActivityFeed } from "@/components/activity-feed"
import { FeaturedCollections } from "@/components/featured-collections"

export function Dashboard() {
  return (
    <div className="space-y-5">
      <WelcomeBanner />
      <div className="grid grid-cols-1 overflow-hidden rounded-lg border bg-card sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <RecentOrdersCard />
      </div>
      <FeaturedCollections />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TopProductsCard />
        <ActivityFeed />
        <div className="lg:col-span-2">
          <LowStockCard />
        </div>
      </div>
    </div>
  )
}
