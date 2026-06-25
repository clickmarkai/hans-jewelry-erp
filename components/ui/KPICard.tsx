interface KPICardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
  highlight?: boolean
}

export default function KPICard({ label, value, delta, deltaPositive, highlight }: KPICardProps) {
  return (
    <div className={`border border-[#E5E5E5] p-5 rounded-[2px] bg-white`}>
      <p className="text-[12px] text-[#737373] font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-[26px] font-medium mt-2 tracking-tight ${highlight ? 'text-[#DC2626]' : 'text-[#0A0A0A]'}`}>
        {value}
      </p>
      {delta && (
        <p className={`text-[12px] mt-1.5 ${deltaPositive !== false ? 'text-[#16A34A]' : 'text-[#737373]'}`}>
          {delta}
        </p>
      )}
    </div>
  )
}
