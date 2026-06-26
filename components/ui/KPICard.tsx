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
      <p className="maison-kicker mb-3">{label}</p>
      <p className={`truncate font-serif text-[28px] font-semibold leading-none tracking-normal ${highlight ? 'text-destructive' : 'text-foreground'}`}>
        {value}
      </p>
      {delta && (
        <div className={`mt-3 flex items-center gap-1 text-[12px] ${deltaPositive !== false ? 'text-emerald-700' : 'text-muted-foreground'}`}>
          <span>{delta}</span>
        </div>
      )}
    </div>
  )
}
