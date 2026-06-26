import type { ReactNode } from "react";
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  BarChart2Icon,
  MessageSquareIcon,
  HelpCircleIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";

export type SidebarNavItem = {
  title: string;
  path?: string;
  icon?: ReactNode;
  isActive?: boolean;
  subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
  label: string;
  items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: <LayoutDashboardIcon />,
        isActive: true,
      },
      {
        title: "Analytics",
        path: "/analytics",
        icon: <BarChart2Icon />,
      },
      {
        title: "Finance",
        path: "/finance",
        icon: <WalletIcon />,
      },
    ],
  },
  {
    label: "Store",
    items: [
      {
        title: "Orders",
        path: "/orders",
        icon: <ShoppingBagIcon />,
      },
      {
        title: "Inventory",
        path: "/inventory",
        icon: <PackageIcon />,
        subItems: [
          { title: "All Products", path: "/inventory" },
          { title: "Collections", path: "/collections" },
          { title: "Suppliers", path: "/suppliers" },
        ],
      },
      {
        title: "Customers",
        path: "/customers",
        icon: <UsersIcon />,
      },
    ],
  },
  {
    label: "AI",
    items: [
      {
        title: "AI Assistant",
        path: "/chat",
        icon: <MessageSquareIcon />,
      },
    ],
  },
];

export const footerNavLinks: SidebarNavItem[] = [
  {
    title: "Settings",
    path: "#/settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Help",
    path: "#/help",
    icon: <HelpCircleIcon />,
  },
];

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) =>
    group.items.flatMap((item) =>
      item.subItems?.length ? [item, ...item.subItems] : [item]
    )
  ),
  ...footerNavLinks,
];
