import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { kpiData } from "@/lib/mock-data";
import { TrendingUp, ShoppingBag, AlertTriangle, UserPlus } from "lucide-react";

const stats = [
  {
    label: "Revenue (MTD)",
    value: `Rp ${kpiData.revenueMtdRp.toLocaleString("id-ID")}`,
    delta: 12,
    hint: "vs bulan lalu",
    icon: TrendingUp,
    iconBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  {
    label: "Active Orders",
    value: String(kpiData.activeOrders),
    delta: 3,
    hint: "this week",
    icon: ShoppingBag,
    iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    label: "Low Stock Items",
    value: String(kpiData.lowStockItems),
    delta: -2,
    hint: "needs reorder",
    icon: AlertTriangle,
    iconBg: "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400",
  },
  {
    label: "New Customers (MTD)",
    value: String(kpiData.newCustomersMtd),
    delta: 4,
    hint: "vs bulan lalu",
    icon: UserPlus,
    iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
] as const;

export function DashboardStats() {
  return (
    <>
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const { label, value, delta, hint, icon: Icon, iconBg } = stat;
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon size={15} strokeWidth={2} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-2xl font-semibold tabular-nums tracking-tight">
          {value}
        </p>
      </CardContent>
      <CardFooter className="gap-1.5 text-xs">
        <Delta value={delta} variant="default">
          <DeltaIcon />
          <DeltaValue />
        </Delta>
        <span className="text-muted-foreground">{hint}</span>
      </CardFooter>
    </Card>
  );
}
