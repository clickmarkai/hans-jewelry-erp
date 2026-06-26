'use client'

import { useState } from 'react'
import FilterTabs from '@/components/ui/FilterTabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SlideOver from '@/components/layout/SlideOver'
import { products, Product, formatRp, getStatusColor } from '@/lib/mock-data'
import { MaisonProductImage } from '@/components/maison'
import { Plus, Download } from 'lucide-react'

const TABS = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants']

function StockBar({ stock, reorderPoint }: { stock: number; reorderPoint: number }) {
  const max = Math.max(reorderPoint * 3, stock, 1)
  const pct = Math.min((stock / max) * 100, 100)
  const color = stock === 0 ? 'bg-red-500' : stock <= reorderPoint ? 'bg-amber-500' : 'bg-emerald-600'
  return (
    <div className="flex items-center gap-2">
      <span className="tabular-nums font-medium w-6 text-right">{stock}</span>
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<Product | null>(null)

  const filtered = activeTab === 'All'
    ? products
    : products.filter((p) => p.category === activeTab)

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="maison-kicker">Atelier stock</p>
          <h1 className="font-serif text-3xl font-semibold">Inventory</h1>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            <Download size={13} strokeWidth={1.75} />
            Export
          </Button>
          <Button size="sm" variant="default">
            <Plus size={13} strokeWidth={2} />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total SKU</p>
          <p className="mt-0.5 font-serif text-[28px] font-semibold text-foreground">{products.length}</p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Stock</p>
          <p className="mt-0.5 font-serif text-[28px] font-semibold text-emerald-700">
            {products.filter((p) => p.status === 'In Stock').length}
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Low Stock</p>
          <p className="mt-0.5 font-serif text-[28px] font-semibold text-amber-700">
            {products.filter((p) => p.status === 'Low').length}
          </p>
        </div>
        <div className="rounded-md border bg-card px-4 py-3">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Out of Stock</p>
          <p className="mt-0.5 font-serif text-[28px] font-semibold text-red-600">
            {products.filter((p) => p.status === 'Out of Stock').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b">
          <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left">Produk</th>
                <th className="px-4 py-3 text-left">Koleksi</th>
                <th className="px-4 py-3 text-left">Material</th>
                <th className="px-4 py-3 text-right">Berat</th>
                <th className="px-4 py-3 text-right">Harga</th>
                <th className="px-4 py-3 text-right">Stok</th>
                <th className="px-4 py-3 text-right">Min.</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setSelected(product)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <MaisonProductImage className="size-10 rounded-md border" slot={index} alt={`${product.name} product photo`} />
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{product.collection}</td>
                  <td className="px-4 py-3 text-muted-foreground">{product.material}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{product.weightG}g</td>
                  <td className="px-4 py-3 text-right text-foreground tabular-nums">{formatRp(product.priceRp)}</td>
                  <td className="px-4 py-3 text-right">
                    <StockBar stock={product.stock} reorderPoint={product.reorderPoint} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{product.reorderPoint}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusColor(product.status)} size="sm">{product.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail SlideOver */}
      <SlideOver open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''}>
        {selected && (
          <div className="space-y-5">
            <MaisonProductImage className="aspect-square rounded-lg border" slot={products.findIndex((p) => p.id === selected.id)} alt={`${selected.name} product detail`} />

            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">SKU</p>
                <p className="font-mono text-foreground">{selected.sku}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Status</p>
                <Badge variant={getStatusColor(selected.status)}>{selected.status}</Badge>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Koleksi</p>
                <p className="text-foreground">{selected.collection}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Kategori</p>
                <p className="text-foreground">{selected.category}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Material</p>
                <p className="text-foreground">{selected.material}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Berat</p>
                <p className="text-foreground">{selected.weightG}g</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Harga Jual</p>
                <p className="text-[18px] font-medium text-foreground tabular-nums">{formatRp(selected.priceRp)}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Stok Saat Ini</p>
                <p className={`text-[18px] font-medium tabular-nums ${
                  selected.stock === 0 ? 'text-red-500' :
                  selected.stock <= selected.reorderPoint ? 'text-amber-600' :
                  'text-emerald-600'
                }`}>{selected.stock} pcs</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Informasi Stok</p>
              <div className="bg-muted/30 border rounded-md p-3 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reorder Point</span>
                  <span className="text-foreground font-medium">{selected.reorderPoint} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nilai Stok</span>
                  <span className="text-foreground font-medium tabular-nums">{formatRp(selected.stock * selected.priceRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Perlu Reorder?</span>
                  <span className={`font-medium ${selected.stock <= selected.reorderPoint ? 'text-red-500' : 'text-emerald-600'}`}>
                    {selected.stock <= selected.reorderPoint ? 'Ya' : 'Belum'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">Perawatan Perak</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Simpan di tempat sejuk dan kering, hindari paparan air dan bahan kimia. Bersihkan dengan kain microfiber lembut. Material {selected.material} memerlukan perawatan rutin setiap 3–6 bulan untuk menjaga kilapnya.
              </p>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
