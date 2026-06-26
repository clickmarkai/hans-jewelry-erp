"use client";

import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { NavUser } from "@/components/nav-user";
import { ThemeToggle } from "@/components/theme-toggle";
import { Notifications } from "@/components/notifications";
import { Search, CalendarDays } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-3 z-20 mb-5 flex items-center justify-between gap-3 rounded-lg border bg-background/86 px-3 py-2 shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="mr-2 h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <AppBreadcrumbs />
      </div>
      <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
        <label className="relative w-full max-w-[480px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-md border bg-card/80 pl-9 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            placeholder="Search orders, SKU, customers..."
            type="search"
          />
        </label>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="hidden h-9 items-center gap-2 rounded-md border bg-card px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground lg:inline-flex">
          <CalendarDays className="size-3.5" />
          Jun 20 - Jun 26
        </button>
        <ThemeToggle />
        <Notifications />
        <Separator
          className="h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <NavUser />
      </div>
    </header>
  );
}
