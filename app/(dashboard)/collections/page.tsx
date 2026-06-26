import TopBar from '@/components/layout/TopBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { collections, formatRp, getStatusColor } from '@/lib/mock-data'
import { MaisonProductImage } from '@/components/maison'
import { Plus } from 'lucide-react'

export default function CollectionsPage() {
  const active = collections.filter((c) => c.status === 'Active')
  const draft = collections.filter((c) => c.status === 'Draft')
  const archived = collections.filter((c) => c.status === 'Archived')

  const totalRevenue = collections.reduce((s, c) => s + c.revenue30dRp, 0)

  return (
    <div>
      <TopBar
        title="Collections"
        action={
          <Button size="sm" variant="default">
            <Plus size={13} strokeWidth={2} />
            Koleksi Baru
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-4">
            <p className="maison-kicker">Total Koleksi</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-foreground">{collections.length}</p>
          </div>
          <div className="card p-4">
            <p className="maison-kicker">Aktif</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-emerald-700">{active.length}</p>
          </div>
          <div className="card p-4">
            <p className="maison-kicker">Total SKU</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-foreground">{collections.reduce((s, c) => s + c.skuCount, 0)}</p>
          </div>
          <div className="card p-4">
            <p className="maison-kicker">Revenue (30d)</p>
            <p className="mt-1 font-serif text-[28px] font-semibold text-foreground">{formatRp(totalRevenue)}</p>
          </div>
        </div>

        {/* Active Collections */}
        <div>
          <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Koleksi Aktif</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {active.map((col, index) => (
              <div
                key={col.id}
                className="card cursor-pointer overflow-hidden transition-colors hover:border-primary/40"
              >
                <MaisonProductImage className="aspect-[3/2] border-b" slot={index} alt={`${col.name} collection jewelry`} />
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{col.name}</h3>
                    <Badge variant={getStatusColor(col.status)} size="sm">{col.status}</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{col.description}</p>
                  <div className="flex items-center justify-between border-t pt-2 text-[11px]">
                    <span className="text-muted-foreground">{col.skuCount} SKU · {col.season}</span>
                    <span className="font-semibold text-foreground">{formatRp(col.revenue30dRp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draft Collections */}
        {draft.length > 0 && (
          <div>
            <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">Draft</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {draft.map((col, index) => (
                <div
                  key={col.id}
                  className="cursor-pointer overflow-hidden rounded-lg border border-dashed bg-card/50"
                >
                  <MaisonProductImage className="aspect-[3/2] border-b opacity-55 grayscale" slot={index + 2} alt={`${col.name} draft collection`} />
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-muted-foreground">{col.name}</h3>
                      <Badge variant="default" size="sm">Draft</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{col.description}</p>
                    <div className="flex items-center justify-between border-t pt-2 text-[11px] text-muted-foreground">
                      <span>{col.skuCount} SKU · {col.season}</span>
                      <span>Belum dipublikasi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Archived */}
        {archived.length > 0 && (
          <div>
            <h2 className="mb-3 font-serif text-2xl font-semibold text-muted-foreground">Diarsipkan</h2>
            <div className="grid grid-cols-1 gap-4 opacity-65 md:grid-cols-2 xl:grid-cols-3">
              {archived.map((col, index) => (
                <div
                  key={col.id}
                  className="card overflow-hidden"
                >
                  <MaisonProductImage className="aspect-[3/2] border-b grayscale" slot={index + 3} alt={`${col.name} archived collection`} />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-muted-foreground">{col.name}</h3>
                      <Badge variant="default" size="sm">Archived</Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{col.skuCount} SKU · {col.season}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
