interface KPICardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
  highlight?: boolean
}

export default function KPICard({ label, value, delta, deltaPositive, highlight }: KPICardProps) {
  return (
    <div className="card p-6">
      <p className="text-[11px] text-[#A3A3A3] mb-3 tracking-wide">{label}</p>
      <p className={`text-[24px] font-medium tracking-tight leading-none truncate ${highlight ? 'text-[#DC2626]' : 'text-[#0A0A0A]'}`}>
        {value}
      </p>
      {delta && (
        <div className={`flex items-center gap-1 mt-3 text-[12px] ${deltaPositive !== false ? 'text-[#16A34A]' : 'text-[#737373]'}`}>
          {deltaPositive !== false && <span>↑</span>}
          <span>{delta}</span>
        </div>
      )}
    </div>
  )
}
