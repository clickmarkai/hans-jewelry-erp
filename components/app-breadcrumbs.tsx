"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { navLinks } from "@/components/app-shared";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  const match = navLinks.find((item) =>
    item.path && item.path !== "/" && pathname.startsWith(item.path)
  );
  return match?.title ?? "Hans Jewelry";
}

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-sm">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
