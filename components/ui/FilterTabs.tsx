'use client'

interface FilterTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export default function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-md border bg-card p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-[5px] px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            active === tab
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
