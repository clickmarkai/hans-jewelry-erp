"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { footerNavLinks, navGroups } from "@/components/app-shared";
import { GemIcon } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="border-r-0">
      <SidebarHeader className="h-[76px] justify-center border-b border-sidebar-border/70">
        <SidebarMenuButton asChild className="h-12 px-3 hover:bg-transparent">
          <Link href="/" className="group">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary text-primary-foreground shadow-sm">
              <GemIcon className="size-4" />
            </span>
            <span className="grid leading-tight">
              <span className="font-serif text-[20px] font-semibold tracking-normal text-foreground">Hans</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Jewelry ERP</span>
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {navGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-3">
        <div className="mb-3 rounded-md border bg-card/80 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Maison sync</p>
          <p className="mt-1 text-xs text-muted-foreground">Live rates, channel orders, and atelier stock are current.</p>
        </div>
        <SidebarMenu>
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                size="sm"
              >
                <Link href={item.path ?? "#"}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
