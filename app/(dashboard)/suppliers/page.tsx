import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { suppliers, getStatusColor } from '@/lib/mock-data'
import { Plus, Truck } from 'lucide-react'

function Avatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) {
  const colors = [
    'bg-indigo-100 text-indigo-700',
    'bg-amber-100 text-amber-700',
    'bg-emerald-100 text-emerald-700',
    'bg-pink-100 text-pink-700',
    'bg-violet-100 text-violet-700',
    'bg-cyan-100 text-cyan-700',
  ]
  const color = colors[name.charCodeAt(0) % colors.length]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const sz = size === 'sm' ? 'w-7 h-7 text-[11px]' : 'w-9 h-9 text-xs'
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-medium flex-shrink-0`}>
      {initials}
    </div>
  )
}

function leadTimeColor(days: number): string {
  if (days <= 7) return 'text-emerald-600 dark:text-emerald-400'
  if (days <= 14) return 'text-amber-600 dark:text-amber-400'
  return 'text-slate-500 dark:text-slate-400'
}

export default function SuppliersPage() {
  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Suppliers</h1>
        <Button size="sm" variant="default">
          <Plus size={13} strokeWidth={2} />
          Tambah Supplier
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Supplier</p>
          <p className="text-2xl font-semibold text-foreground mt-0.5">{suppliers.length}</p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Aktif</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-0.5">
            {suppliers.filter(s => s.status === 'Active').length}
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Avg. Lead Time</p>
          <p className="text-2xl font-semibold text-foreground mt-0.5">
            {Math.round(suppliers.reduce((s, sup) => s + sup.leadTimeDays, 0) / suppliers.length)} hari
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Supplier</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Lokasi</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Material</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">MOQ</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Lead Time</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Order Terakhir</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Payment</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={supplier.name} />
                      <span>{supplier.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.materials}</td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.moq}</td>
                  <td className={`px-4 py-3 text-right tabular-nums font-medium ${leadTimeColor(supplier.leadTimeDays)}`}>
                    {supplier.leadTimeDays} hari
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.lastOrderDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.paymentTerms}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusColor(supplier.status)} size="sm">{supplier.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier cards */}
      <div className="grid grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id + '-card'} className="rounded-md border bg-card p-4 hover:bg-muted/20 cursor-pointer transition-colors">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-9 h-9 rounded-md bg-muted border flex items-center justify-center">
                <Truck size={16} strokeWidth={1.5} className="text-muted-foreground" />
              </div>
              <Badge variant={getStatusColor(supplier.status)} size="sm">{supplier.status}</Badge>
            </div>
            <h3 className="text-[13px] font-medium text-foreground">{supplier.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{supplier.location}</p>
            <div className="mt-3 pt-3 border-t space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lead Time</span>
                <span className={`font-medium ${leadTimeColor(supplier.leadTimeDays)}`}>{supplier.leadTimeDays} hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">MOQ</span>
                <span className="text-foreground">{supplier.moq}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-foreground">{supplier.paymentTerms}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
