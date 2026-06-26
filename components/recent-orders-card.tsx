import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders, formatRp, getStatusColor } from "@/lib/mock-data";
import { MaisonProductImage } from "@/components/maison";

const recentOrders = orders.slice(0, 6);

const variantMap: Record<string, "success" | "warning" | "error" | "secondary" | "outline"> = {
  success: "success",
  warning: "warning",
  error: "error",
  default: "secondary",
};

export function RecentOrdersCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="maison-kicker">Order workflow</p>
          <CardTitle className="mt-1">Recent Orders</CardTitle>
        </div>
        <Link href="/orders" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
          View all
        </Link>
      </CardHeader>
      <CardContent className="divide-y p-0">
        {recentOrders.map((order, index) => (
          <Link
            href="/orders"
            key={order.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 px-5 py-3 transition-colors hover:bg-muted/40"
          >
            <MaisonProductImage className="size-11 rounded-md border" slot={index} />
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold text-foreground">{order.id.replace("ORD-2025-", "#")}</p>
                  <p className="truncate text-sm font-semibold text-foreground">{order.customerName}</p>
                  <p className="text-[11px] text-muted-foreground">{order.customerCity} · {order.items.length} items</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold tabular-nums text-foreground">{formatRp(order.totalRp)}</p>
                  <Badge variant={variantMap[getStatusColor(order.status)] ?? "secondary"} className="mt-1 text-[10px]">
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
