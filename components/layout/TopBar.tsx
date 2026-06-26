interface TopBarProps {
  title: string
  action?: React.ReactNode
}

export default function TopBar({ title, action }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/85 px-6 backdrop-blur-xl">
      <h1 className="font-serif text-[21px] font-semibold text-foreground">{title}</h1>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  )
}
