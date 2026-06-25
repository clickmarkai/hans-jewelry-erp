import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { kpiData } from "@/lib/mock-data";

const stats = [
  {
    label: "Revenue (MTD)",
    value: `Rp ${kpiData.revenueMtdRp.toLocaleString("id-ID")}`,
    delta: 12,
    hint: "vs bulan lalu",
  },
  {
    label: "Active Orders",
    value: String(kpiData.activeOrders),
    delta: 3,
    hint: "this week",
  },
  {
    label: "Low Stock Items",
    value: String(kpiData.lowStockItems),
    delta: -2,
    hint: "needs reorder",
  },
  {
    label: "New Customers (MTD)",
    value: String(kpiData.newCustomersMtd),
    delta: 4,
    hint: "vs bulan lalu",
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
  const { label, value, delta, hint } = stat;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-xs">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-balance font-semibold text-2xl tabular-nums tracking-tight">
          {value}
        </p>
      </CardContent>
      <CardFooter className="gap-1.5 text-xs">
        <Delta value={delta} variant="default">
          <DeltaIcon />
          <DeltaValue />
        </Delta>
        <span className="text-pretty text-muted-foreground">{hint}</span>
      </CardFooter>
    </Card>
  );
}
