'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import FilterTabs from '@/components/ui/FilterTabs'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SlideOver from '@/components/layout/SlideOver'
import { products, Product, formatRp, getStatusColor } from '@/lib/mock-data'
import { Package, Plus, Download } from 'lucide-react'

const TABS = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants']

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [selected, setSelected] = useState<Product | null>(null)

  const filtered = activeTab === 'All'
    ? products
    : products.filter((p) => p.category === activeTab)

  return (
    <div>
      <TopBar
        title="Inventory"
        action={
          <>
            <Button size="sm" variant="secondary">
              <Download size={13} strokeWidth={1.75} />
              Export
            </Button>
            <Button size="sm" variant="primary">
              <Plus size={13} strokeWidth={2} />
              Tambah Produk
            </Button>
          </>
        }
      />

      <div className="p-6 space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-3">
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Total SKU</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{products.length}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">In Stock</p>
            <p className="text-[22px] font-medium text-[#16A34A] mt-1">
              {products.filter((p) => p.status === 'In Stock').length}
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Low Stock</p>
            <p className="text-[22px] font-medium text-[#D97706] mt-1">
              {products.filter((p) => p.status === 'Low').length}
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Out of Stock</p>
            <p className="text-[22px] font-medium text-[#DC2626] mt-1">
              {products.filter((p) => p.status === 'Out of Stock').length}
            </p>
          </div>
        </div>

        {/* Filter + Table */}
        <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
          <div className="px-5 py-4 border-b border-[#E5E5E5]">
            <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
          </div>

          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="text-left px-5 py-3 text-[#737373] font-medium">SKU</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Nama Produk</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Koleksi</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Material</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Berat</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Harga</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Stok</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Min.</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#FAFAFA] cursor-pointer transition-colors"
                  onClick={() => setSelected(product)}
                >
                  <td className="px-5 py-3 font-mono text-[#737373]">{product.sku}</td>
                  <td className="px-5 py-3 text-[#0A0A0A] font-medium">{product.name}</td>
                  <td className="px-5 py-3 text-[#737373]">{product.collection}</td>
                  <td className="px-5 py-3 text-[#737373]">{product.material}</td>
                  <td className="px-5 py-3 text-right text-[#737373]">{product.weightG}g</td>
                  <td className="px-5 py-3 text-right text-[#0A0A0A]">{formatRp(product.priceRp)}</td>
                  <td className={`px-5 py-3 text-right font-medium ${
                    product.stock === 0 ? 'text-[#DC2626]' : product.stock <= product.reorderPoint ? 'text-[#D97706]' : 'text-[#0A0A0A]'
                  }`}>{product.stock}</td>
                  <td className="px-5 py-3 text-right text-[#737373]">{product.reorderPoint}</td>
                  <td className="px-5 py-3">
                    <Badge variant={getStatusColor(product.status)} size="sm">{product.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail SlideOver */}
      <SlideOver
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ''}
      >
        {selected && (
          <div className="space-y-5">
            <div className="aspect-square bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] flex items-center justify-center">
              <Package size={48} strokeWidth={1} className="text-[#D4D4D4]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">SKU</p>
                <p className="font-mono text-[#0A0A0A]">{selected.sku}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Status</p>
                <Badge variant={getStatusColor(selected.status)}>{selected.status}</Badge>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Koleksi</p>
                <p className="text-[#0A0A0A]">{selected.collection}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Kategori</p>
                <p className="text-[#0A0A0A]">{selected.category}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Material</p>
                <p className="text-[#0A0A0A]">{selected.material}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Berat</p>
                <p className="text-[#0A0A0A]">{selected.weightG}g</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Harga Jual</p>
                <p className="text-[18px] font-medium text-[#0A0A0A]">{formatRp(selected.priceRp)}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-1">Stok Saat Ini</p>
                <p className={`text-[18px] font-medium ${
                  selected.stock === 0 ? 'text-[#DC2626]' : selected.stock <= selected.reorderPoint ? 'text-[#D97706]' : 'text-[#16A34A]'
                }`}>{selected.stock} pcs</p>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] pt-4">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-2">Informasi Stok</p>
              <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-[2px] p-3 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Reorder Point</span>
                  <span className="text-[#0A0A0A] font-medium">{selected.reorderPoint} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Nilai Stok</span>
                  <span className="text-[#0A0A0A] font-medium">{formatRp(selected.stock * selected.priceRp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Perlu Reorder?</span>
                  <span className={`font-medium ${selected.stock <= selected.reorderPoint ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                    {selected.stock <= selected.reorderPoint ? 'Ya' : 'Belum'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] pt-4">
              <p className="text-[11px] text-[#737373] uppercase tracking-wide mb-2">Perawatan Perak</p>
              <p className="text-[12px] text-[#737373] leading-relaxed">
                Simpan di tempat sejuk dan kering, hindari paparan air dan bahan kimia. Bersihkan dengan kain microfiber lembut. Material {selected.material} memerlukan perawatan rutin setiap 3-6 bulan untuk menjaga kilapnya.
              </p>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
