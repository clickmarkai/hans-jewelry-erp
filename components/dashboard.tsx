import { CategoryRankChart } from "@/components/category-rank-chart";
import { RevenueChart } from "@/components/revenue-chart";
import { DashboardStats } from "@/components/stats";
import { RecentOrdersCard } from "@/components/recent-orders-card";
import { LowStockCard } from "@/components/low-stock-card";

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardStats />
      <RevenueChart />
      <CategoryRankChart />
      <RecentOrdersCard />
      <LowStockCard />
    </div>
  );
}
