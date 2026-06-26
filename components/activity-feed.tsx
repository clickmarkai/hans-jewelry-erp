import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, UserPlus, Package, TrendingUp } from "lucide-react"

const activities = [
  {
    icon: ShoppingBag,
    iconBg: "bg-primary/10 text-primary",
    title: "New order #0420",
    desc: "Sari Dewi · Rp 630.000",
    time: "2 min ago",
  },
  {
    icon: UserPlus,
    iconBg: "bg-emerald-50 text-emerald-700",
    title: "New customer",
    desc: "Ayu Wulandari joined",
    time: "1 hour ago",
  },
  {
    icon: Package,
    iconBg: "bg-amber-50 text-amber-800",
    title: "Low stock alert",
    desc: "Minimal Stack Ring · 3 left",
    time: "3 hours ago",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-rose-50 text-rose-700",
    title: "Revenue milestone",
    desc: "Rp 38jt MTD · +12% vs last month",
    time: "Today",
  },
  {
    icon: ShoppingBag,
    iconBg: "bg-primary/10 text-primary",
    title: "Order delivered",
    desc: "Emma van der Berg · Rp 570.000",
    time: "Yesterday",
  },
]

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="maison-kicker">Live feed</p>
        <CardTitle className="mt-1 text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`flex size-8 shrink-0 items-center justify-center rounded-md border border-current/10 ${a.iconBg}`}>
              <a.icon size={13} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
            <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
