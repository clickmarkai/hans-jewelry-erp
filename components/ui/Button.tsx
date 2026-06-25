interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'default'
  children: React.ReactNode
}

const variants = {
  primary: 'bg-[#0A0A0A] text-white hover:bg-[#262626] border border-[#0A0A0A]',
  secondary: 'bg-white text-[#0A0A0A] hover:bg-[#F4F4F5] border border-[#E5E5E5]',
  ghost: 'bg-transparent text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] border border-transparent',
}

const sizes = {
  sm: 'px-3 py-1.5 text-[12px]',
  default: 'px-4 py-2 text-[13px]',
}

export default function Button({ variant = 'secondary', size = 'default', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 font-medium rounded-[2px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
