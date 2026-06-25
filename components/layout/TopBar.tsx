interface TopBarProps {
  title: string
  action?: React.ReactNode
}

export default function TopBar({ title, action }: TopBarProps) {
  return (
    <header className="h-14 px-6 flex items-center justify-between bg-white sticky top-0 z-20" style={{boxShadow: '0 1px 0 #EBEBEB'}}>
      <h1 className="text-[15px] font-medium text-[#0A0A0A]">{title}</h1>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  )
}
