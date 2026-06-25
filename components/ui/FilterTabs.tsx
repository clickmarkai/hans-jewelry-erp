'use client'

interface FilterTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export default function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-0 border border-[#E5E5E5] rounded-[2px] w-fit">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1.5 text-[12px] font-medium transition-colors ${
            i > 0 ? 'border-l border-[#E5E5E5]' : ''
          } ${
            active === tab
              ? 'bg-[#0A0A0A] text-white'
              : 'bg-white text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F9F9F9]'
          } ${i === 0 ? 'rounded-l-[2px]' : ''} ${i === tabs.length - 1 ? 'rounded-r-[2px]' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
