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
    <aside className="fixed left-0 top-0 h-full w-60 bg-white border-r border-[#EBEBEB] flex flex-col z-30">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4">
        <span className="text-[13px] font-medium text-[#0A0A0A] tracking-tight">Hans Jewelry</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5 pb-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-[2px] transition-colors w-full ${
                isActive
                  ? 'bg-[#0A0A0A] text-white'
                  : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F0F0F0]'
              }`}
            >
              <Icon size={15} strokeWidth={1.75} className="shrink-0" />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-[#E5E5E5] px-4 py-4">
        <p className="text-[13px] font-medium text-[#0A0A0A]">Hans</p>
        <p className="text-[11px] text-[#737373] mt-0.5">Owner · Hans Jewelry</p>
      </div>
    </aside>
  )
}
