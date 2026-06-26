'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  Truck,
  BarChart2,
  MessageSquare,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/collections', label: 'Collections', icon: Layers },
  { href: '/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/chat', label: 'AI Assistant', icon: MessageSquare },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-60 flex-col border-r bg-sidebar">
      {/* Brand */}
      <div className="px-4 pb-4 pt-5">
        <span className="font-serif text-[22px] font-semibold tracking-normal text-foreground">Hans Jewelry</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <Icon size={15} strokeWidth={1.75} className="shrink-0" />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="border-t px-4 py-4">
        <p className="text-[13px] font-semibold text-foreground">Hans</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Owner · Hans Jewelry</p>
      </div>
    </aside>
  )
}
