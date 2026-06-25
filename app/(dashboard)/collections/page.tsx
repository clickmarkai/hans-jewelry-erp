import TopBar from '@/components/layout/TopBar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { collections, formatRp, getStatusColor } from '@/lib/mock-data'
import { Layers, Plus } from 'lucide-react'

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
          <Button size="sm" variant="primary">
            <Plus size={13} strokeWidth={2} />
            Koleksi Baru
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Total Koleksi</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{collections.length}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Aktif</p>
            <p className="text-[22px] font-medium text-[#16A34A] mt-1">{active.length}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Total SKU</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{collections.reduce((s, c) => s + c.skuCount, 0)}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Revenue (30d)</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{formatRp(totalRevenue)}</p>
          </div>
        </div>

        {/* Active Collections */}
        <div>
          <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Koleksi Aktif</h2>
          <div className="grid grid-cols-3 gap-4">
            {active.map((col) => (
              <div
                key={col.id}
                className="border border-[#E5E5E5] rounded-[2px] bg-white overflow-hidden hover:border-[#C0C0C0] transition-colors cursor-pointer"
              >
                {/* Image placeholder */}
                <div className="aspect-[3/2] bg-[#FAFAFA] border-b border-[#E5E5E5] flex items-center justify-center">
                  <Layers size={40} strokeWidth={1} className="text-[#D4D4D4]" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[14px] font-medium text-[#0A0A0A]">{col.name}</h3>
                    <Badge variant={getStatusColor(col.status)} size="sm">{col.status}</Badge>
                  </div>
                  <p className="text-[11px] text-[#737373] leading-relaxed">{col.description}</p>
                  <div className="pt-1 border-t border-[#F0F0F0] flex items-center justify-between text-[11px]">
                    <span className="text-[#A3A3A3]">{col.skuCount} SKU · {col.season}</span>
                    <span className="font-medium text-[#0A0A0A]">{formatRp(col.revenue30dRp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draft Collections */}
        {draft.length > 0 && (
          <div>
            <h2 className="text-[13px] font-medium text-[#0A0A0A] mb-3">Draft</h2>
            <div className="grid grid-cols-3 gap-4">
              {draft.map((col) => (
                <div
                  key={col.id}
                  className="border border-dashed border-[#E5E5E5] rounded-[2px] bg-[#FAFAFA] overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[3/2] flex items-center justify-center">
                    <Layers size={32} strokeWidth={1} className="text-[#D4D4D4]" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-medium text-[#737373]">{col.name}</h3>
                      <Badge variant="default" size="sm">Draft</Badge>
                    </div>
                    <p className="text-[11px] text-[#A3A3A3]">{col.description}</p>
                    <div className="pt-1 border-t border-[#F0F0F0] flex items-center justify-between text-[11px]">
                      <span className="text-[#A3A3A3]">{col.skuCount} SKU · {col.season}</span>
                      <span className="text-[#A3A3A3]">Belum dipublikasi</span>
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
            <h2 className="text-[13px] font-medium text-[#737373] mb-3">Diarsipkan</h2>
            <div className="grid grid-cols-3 gap-4 opacity-60">
              {archived.map((col) => (
                <div
                  key={col.id}
                  className="border border-[#E5E5E5] rounded-[2px] bg-white overflow-hidden"
                >
                  <div className="aspect-[3/2] bg-[#F4F4F5] flex items-center justify-center">
                    <Layers size={32} strokeWidth={1} className="text-[#D4D4D4]" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[13px] font-medium text-[#737373]">{col.name}</h3>
                      <Badge variant="default" size="sm">Archived</Badge>
                    </div>
                    <p className="text-[11px] text-[#A3A3A3] mt-1">{col.skuCount} SKU · {col.season}</p>
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
