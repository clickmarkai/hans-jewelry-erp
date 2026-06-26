import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { kpiData } from "@/lib/mock-data";
import { TrendingUp, ShoppingBag, AlertTriangle, UserPlus } from "lucide-react";

// Simple SVG sparkline component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 64, h = 24
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  })
  const area = `M${pts[0]} L${pts.join(' L')} L${w},${h} L0,${h} Z`
  const line = `M${pts[0]} L${pts.join(' L')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path d={area} fill={color} fillOpacity={0.15} />
      <path d={line} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const stats = [
  {
    label: "Revenue (MTD)",
    value: `Rp ${kpiData.revenueMtdRp.toLocaleString("id-ID")}`,
    delta: 12,
    hint: "vs bulan lalu",
    icon: TrendingUp,
    iconBg: "bg-primary/10 text-primary",
    sparkline: [820, 932, 901, 1134, 1290, 1330, 1520],
    sparkColor: "oklch(0.42 0.13 22)",
  },
  {
    label: "Active Orders",
    value: String(kpiData.activeOrders),
    delta: 3,
    hint: "this week",
    icon: ShoppingBag,
    iconBg: "bg-amber-100 text-amber-800",
    sparkline: [38, 42, 39, 44, 41, 45, 47],
    sparkColor: "#f59e0b",
  },
  {
    label: "Low Stock Items",
    value: String(kpiData.lowStockItems),
    delta: -2,
    hint: "needs reorder",
    icon: AlertTriangle,
    iconBg: "bg-red-50 text-red-600",
    sparkline: [4, 5, 7, 6, 5, 7, 6],
    sparkColor: "#ef4444",
  },
  {
    label: "New Customers (MTD)",
    value: String(kpiData.newCustomersMtd),
    delta: 4,
    hint: "vs bulan lalu",
    icon: UserPlus,
    iconBg: "bg-emerald-50 text-emerald-700",
    sparkline: [6, 8, 7, 9, 10, 11, 12],
    sparkColor: "#10b981",
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
  const { label, value, delta, hint, icon: Icon, iconBg, sparkline, sparkColor } = stat;
  return (
    <Card className="relative overflow-hidden border-x-0 border-y bg-card/70 shadow-none first:border-l sm:border-x">
      <CardHeader className="p-4 pb-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
          <div className={`flex size-8 items-center justify-center rounded-md border border-current/10 ${iconBg}`}>
            <Icon size={15} strokeWidth={2} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-1 pt-0">
        <p className="font-serif text-[25px] font-semibold tabular-nums tracking-normal">
          {value}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 pb-3 pt-0">
        <div className="flex items-center gap-1.5 text-xs">
          <Delta value={delta} variant="default">
            <DeltaIcon />
            <DeltaValue />
          </Delta>
          <span className="text-muted-foreground">{hint}</span>
        </div>
        <Sparkline data={[...sparkline]} color={sparkColor} />
      </CardFooter>
    </Card>
  );
}
