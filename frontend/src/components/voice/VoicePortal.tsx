'use client'

import { useRef, useEffect } from 'react'

export default function VoicePortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800
      canvas.height = canvas.parentElement?.clientHeight || 400
    }

    window.addEventListener('resize', resize)
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const width = canvas.width
      const height = canvas.height
      const centerY = height / 2
      
      // Draw undulating liquid frequency string (Screen 12)
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      
      // Gradient for the line
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.2)')
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 1)')
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0.2)')
      ctx.strokeStyle = gradient

      for (let x = 0; x < width; x += 1) {
        // Multi-layered sine waves for "fluid" feel
        const amplitude = 40 * Math.sin(time * 0.02) + 20
        const y = centerY + 
                  amplitude * Math.sin(x * 0.01 + time * 0.05) * Math.sin(time * 0.01) +
                  (amplitude / 2) * Math.sin(x * 0.02 - time * 0.08)
        
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      
      ctx.stroke()
      
      // Add glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(34, 211, 238, 0.5)'

      // Draw particle nodes on the string
      for (let i = 0; i < 5; i++) {
        const x = (width / 5) * i + (width / 10) + Math.sin(time * 0.02 + i) * 50
        const y = centerY + 30 * Math.sin(x * 0.01 + time * 0.05)
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#22D3EE'
        ctx.fill()
      }

      time += 1
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden glass border border-black/10 bg-black/5 flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
        <div className="w-24 h-24 rounded-full glass border border-cyan-400/50 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center">
             <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold tracking-tighter text-gray-900 mb-2">Voice Recognition Portal</h3>
          <p className="text-[10px] font-black uppercase text-cyan-600 tracking-wide animate-pulse">Analyzing Frequency Spectrum...</p>
        </div>
      </div>

      {/* Decorative Corner Instrumentation */}
      <div className="absolute top-4 right-4 text-right">
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Gain: +4.2dB</p>
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Sample: 48kHz</p>
      </div>
    </div>
  )
}
