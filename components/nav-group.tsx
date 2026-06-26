"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup } from "@/components/app-shared";
import { ChevronRightIcon } from "lucide-react";

export function NavGroup({ label, items }: SidebarNavGroup) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.path
            ? item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path)
            : false;
          const hasActiveSub = item.subItems?.some((s) =>
            s.path ? pathname.startsWith(s.path) : false
          );

          return (
            <Collapsible
              asChild
              className="group/collapsible"
              defaultOpen={isActive || hasActiveSub}
              key={item.title}
            >
              <SidebarMenuItem>
                {item.subItems?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive || hasActiveSub}>
                        {item.icon}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => {
                          const subActive = subItem.path
                            ? pathname === subItem.path
                            : false;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={subActive}>
                                <Link href={subItem.path ?? "#"}>
                                  {subItem.icon}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.path ?? "#"}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
