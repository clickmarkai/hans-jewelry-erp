'use client'

import { X } from 'lucide-react'

interface SlideOverProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function SlideOver({ open, onClose, title, children }: SlideOverProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white border-l border-[#E5E5E5] z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-[15px] font-medium text-[#0A0A0A]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F0F0F0] rounded-[2px] transition-colors"
          >
            <X size={15} strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </>
  )
}
