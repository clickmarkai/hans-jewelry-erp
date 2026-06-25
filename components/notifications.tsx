"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, PackageIcon, ShoppingBagIcon, AlertTriangleIcon } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: <AlertTriangleIcon className="size-4 text-amber-500" />,
    title: "Low stock alert",
    message: "SLV-E001 Dome Studs — only 2 left",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: <ShoppingBagIcon className="size-4 text-blue-500" />,
    title: "New order",
    message: "ORD-2025-0420 from Sari Dewi — Rp 630.000",
    time: "14 min ago",
    unread: true,
  },
  {
    id: 3,
    icon: <AlertTriangleIcon className="size-4 text-red-500" />,
    title: "Out of stock",
    message: "SLV-B001 Hammered Cuff — reorder needed",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 4,
    icon: <PackageIcon className="size-4 text-green-500" />,
    title: "Shipment dispatched",
    message: "ORD-2025-0414 shipped to Berlin",
    time: "3 hr ago",
    unread: false,
  },
  {
    id: 5,
    icon: <ShoppingBagIcon className="size-4 text-blue-500" />,
    title: "New order",
    message: "ORD-2025-0419 from Emma van der Berg",
    time: "5 hr ago",
    unread: false,
  },
];

export function Notifications() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter((n) => n.unread).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Notifications" size="icon" variant="ghost" className="relative">
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Mark all read
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((n) => (
          <DropdownMenuItem key={n.id} className="flex items-start gap-3 py-3 cursor-pointer">
            <div className="mt-0.5 shrink-0">{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-xs font-medium truncate ${n.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {n.title}
                </p>
                <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.message}</p>
            </div>
            {n.unread && <span className="mt-1.5 size-1.5 rounded-full bg-blue-500 shrink-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
