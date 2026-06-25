import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, UserPlus, Package, TrendingUp } from "lucide-react"

const activities = [
  {
    icon: ShoppingBag,
    iconBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    title: "New order #0420",
    desc: "Sari Dewi · Rp 630.000",
    time: "2 min ago",
  },
  {
    icon: UserPlus,
    iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    title: "New customer",
    desc: "Ayu Wulandari joined",
    time: "1 hour ago",
  },
  {
    icon: Package,
    iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    title: "Low stock alert",
    desc: "Minimal Stack Ring · 3 left",
    time: "3 hours ago",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    title: "Revenue milestone",
    desc: "Rp 38jt MTD · +12% vs last month",
    time: "Today",
  },
  {
    icon: ShoppingBag,
    iconBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    title: "Order delivered",
    desc: "Emma van der Berg · Rp 570.000",
    time: "Yesterday",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${a.iconBg}`}>
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
