interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'default'
  children: React.ReactNode
  size?: 'sm' | 'default'
}

const variantStyles = {
  success: 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]',
  warning: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
  error: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
  default: 'bg-[#F4F4F5] text-[#737373] border border-[#E4E4E7]',
}

export default function Badge({ variant = 'default', children, size = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-[2px] ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]'
      } ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}
