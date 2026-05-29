import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <div 
      className={`glass-card transition-all duration-700 hover:scale-[1.02] ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  )
}
