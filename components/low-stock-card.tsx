import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, getStatusColor } from "@/lib/mock-data";

const lowStockItems = products
  .filter((p) => p.status === "Low" || p.status === "Out of Stock")
  .slice(0, 6);

const variantMap: Record<string, "success" | "warning" | "error" | "secondary"> = {
  success: "success",
  warning: "warning",
  error: "error",
  default: "secondary",
};

export function LowStockCard() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stock Alerts</CardTitle>
        <Link href="/inventory" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View inventory →
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">SKU</th>
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">Product</th>
              <th className="text-right px-6 py-2.5 text-xs font-medium text-muted-foreground">Stock</th>
              <th className="text-left px-6 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{item.sku}</td>
                <td className="px-6 py-3 text-sm">{item.name}</td>
                <td className="px-6 py-3 text-right font-medium tabular-nums">{item.stock}</td>
                <td className="px-6 py-3">
                  <Badge variant={variantMap[getStatusColor(item.status)] ?? "secondary"} className="text-[10px]">
                    {item.status}
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
