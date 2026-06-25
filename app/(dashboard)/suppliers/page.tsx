import TopBar from '@/components/layout/TopBar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { suppliers, getStatusColor } from '@/lib/mock-data'
import { Plus, Truck } from 'lucide-react'

export default function SuppliersPage() {
  return (
    <div>
      <TopBar
        title="Suppliers"
        action={
          <Button size="sm" variant="primary">
            <Plus size={13} strokeWidth={2} />
            Tambah Supplier
          </Button>
        }
      />

      <div className="p-6 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Total Supplier</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">{suppliers.length}</p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Aktif</p>
            <p className="text-[22px] font-medium text-[#16A34A] mt-1">
              {suppliers.filter(s => s.status === 'Active').length}
            </p>
          </div>
          <div className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide">Avg. Lead Time</p>
            <p className="text-[22px] font-medium text-[#0A0A0A] mt-1">
              {Math.round(suppliers.reduce((s, sup) => s + sup.leadTimeDays, 0) / suppliers.length)} hari
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#E5E5E5] rounded-[2px] bg-white">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Supplier</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Lokasi</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Email</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Material</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">MOQ</th>
                <th className="text-right px-5 py-3 text-[#737373] font-medium">Lead Time</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Order Terakhir</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Payment</th>
                <th className="text-left px-5 py-3 text-[#737373] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#FAFAFA] cursor-pointer transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-[#0A0A0A] font-medium">{supplier.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.location}</td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.email}</td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.materials}</td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.moq}</td>
                  <td className="px-5 py-3 text-right text-[#0A0A0A]">{supplier.leadTimeDays} hari</td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.lastOrderDate}</td>
                  <td className="px-5 py-3 text-[#737373]">{supplier.paymentTerms}</td>
                  <td className="px-5 py-3">
                    <Badge variant={getStatusColor(supplier.status)} size="sm">{supplier.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Supplier cards — alternative view */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {suppliers.map((supplier) => (
            <div key={supplier.id + '-card'} className="border border-[#E5E5E5] rounded-[2px] p-4 bg-white hover:border-[#C0C0C0] cursor-pointer transition-colors">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-9 h-9 rounded-[2px] bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-center">
                  <Truck size={16} strokeWidth={1.5} className="text-[#737373]" />
                </div>
                <Badge variant={getStatusColor(supplier.status)} size="sm">{supplier.status}</Badge>
              </div>
              <h3 className="text-[13px] font-medium text-[#0A0A0A]">{supplier.name}</h3>
              <p className="text-[11px] text-[#737373] mt-0.5">{supplier.location}</p>
              <div className="mt-3 pt-3 border-t border-[#F0F0F0] space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#A3A3A3]">Lead Time</span>
                  <span className="text-[#0A0A0A]">{supplier.leadTimeDays} hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A3A3A3]">MOQ</span>
                  <span className="text-[#0A0A0A]">{supplier.moq}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A3A3A3]">Payment</span>
                  <span className="text-[#0A0A0A]">{supplier.paymentTerms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
