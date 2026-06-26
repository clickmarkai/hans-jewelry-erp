import { orders, products } from "@/lib/mock-data"
import { MaisonHeroImage } from "@/components/maison"
import { AlertTriangle, ArrowRight, Clock, Sparkles } from "lucide-react"

export function WelcomeBanner() {
  const pendingOrders = orders.filter(o => o.status === 'Pending').length
  const lowStockCount = products.filter(p => p.status === 'Low' || p.status === 'Out of Stock').length

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <section className="relative overflow-hidden rounded-lg border bg-stone-950 text-white shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]">
      <MaisonHeroImage className="absolute inset-0 h-full w-full opacity-88" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.92)_0%,rgba(17,17,17,0.76)_38%,rgba(17,17,17,0.16)_72%,rgba(17,17,17,0.05)_100%)]" />
      <div className="relative grid min-h-[196px] content-between gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(300px,1fr)]">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
            <Sparkles className="size-3.5 text-[#d8b26e]" />
            Today&apos;s highlights
          </div>
          <p className="font-serif text-[32px] font-semibold leading-none tracking-normal sm:text-[38px]">
            {greeting}, Hans
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/72">
            Operations at a glance for Hans Jewelry, from atelier stock and channel orders to revenue quality.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#d8b26e]">
            View full analytics
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="grid content-end gap-3 sm:grid-cols-3 lg:pl-8">
          <div className="border-l border-white/18 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/58">Revenue MTD</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">Rp 38.4jt</p>
            <p className="mt-1 text-xs text-emerald-300">+12.6% vs May</p>
          </div>
          <div className="border-l border-white/18 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/58">Orders MTD</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{orders.length}</p>
            <p className="mt-1 text-xs text-emerald-300">+8.3% this week</p>
          </div>
          <div className="border-l border-white/18 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/58">Open alerts</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{pendingOrders + lowStockCount}</p>
            <p className="mt-1 text-xs text-[#f4c2c2]">Needs review</p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap items-center gap-2 border-t border-white/12 bg-black/24 px-5 py-2.5 backdrop-blur sm:px-6">
        {pendingOrders > 0 && (
          <div className="flex items-center gap-1.5 rounded-md border border-amber-200/25 bg-amber-100/12 px-3 py-1.5 text-xs font-semibold text-amber-100">
            <Clock size={12} />
            {pendingOrders} pending orders
          </div>
        )}
        {lowStockCount > 0 && (
          <div className="flex items-center gap-1.5 rounded-md border border-red-200/25 bg-red-100/12 px-3 py-1.5 text-xs font-semibold text-red-100">
            <AlertTriangle size={12} />
            {lowStockCount} stock alerts
          </div>
        )}
      </div>
    </section>
  )
}
