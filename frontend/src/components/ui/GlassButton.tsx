import { ButtonHTMLAttributes, ReactNode } from 'react'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function GlassButton({ 
  children, 
  variant = 'primary', 
  className = "", 
  ...props 
}: GlassButtonProps) {
  const variants = {
    primary: "bg-black/5 hover:bg-black/10 text-gray-900 border-black/5",
    secondary: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 border-cyan-500/10",
    outline: "bg-transparent hover:bg-black/5 text-gray-900 border-black/10"
  }

  return (
    <button
      className={`px-6 py-3 rounded-xl border font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
