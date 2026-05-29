import { InputHTMLAttributes } from 'react'

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function GlassInput({ label, className = "", ...props }: GlassInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-gray-600 ml-1">{label}</label>}
      <input
        className={`bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 ${className}`}
        {...props}
      />
    </div>
  )
}
