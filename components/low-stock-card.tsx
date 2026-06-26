import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, getStatusColor } from "@/lib/mock-data";
import { MaisonProductImage } from "@/components/maison";

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="maison-kicker">Atelier stock</p>
          <CardTitle className="mt-1">Stock Alerts</CardTitle>
        </div>
        <Link href="/inventory" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
          View inventory
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-2.5 text-left">Product</th>
              <th className="px-5 py-2.5 text-right">Stock</th>
              <th className="px-5 py-2.5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item, index) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <MaisonProductImage className="size-10 rounded-md border" slot={index + 1} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-right font-semibold tabular-nums text-primary">{item.stock}</td>
                <td className="px-5 py-3">
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
