import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders, formatRp, getStatusColor } from "@/lib/mock-data";

const recentOrders = orders.slice(0, 6);

const variantMap: Record<string, "success" | "warning" | "error" | "secondary" | "outline"> = {
  success: "success",
  warning: "warning",
  error: "error",
  default: "secondary",
};

export function RecentOrdersCard() {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Link href="/orders" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all →
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">Order</th>
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">Customer</th>
              <th className="text-right px-6 py-2.5 text-xs font-medium text-muted-foreground">Total</th>
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">
                  {order.id.replace("ORD-2025-", "#")}
                </td>
                <td className="px-6 py-3 text-sm">{order.customerName}</td>
                <td className="px-6 py-3 text-right text-sm font-medium tabular-nums">
                  {formatRp(order.totalRp)}
                </td>
                <td className="px-6 py-3">
                  <Badge variant={variantMap[getStatusColor(order.status)] ?? "secondary"} className="text-[10px]">
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
