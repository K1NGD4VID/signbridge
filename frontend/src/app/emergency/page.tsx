'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import { AlertTriangle, Activity, Heart, Zap, Droplets, Wind, ShieldAlert } from 'lucide-react'

import gsap from 'gsap'

const EMERGENCY_TILES = [
  { id: 'pain', label: 'Severe Pain', icon: Zap },
  { id: 'breathing', label: 'Difficulty Breathing', icon: Activity },
  { id: 'allergic', label: 'Allergic Reaction', icon: AlertTriangle },
  { id: 'bleeding', label: 'Bleeding', icon: Droplets },
  { id: 'choking', label: 'Choking', icon: Wind },
  { id: 'chest', label: 'Chest Pain', icon: Heart },
]

export default function EmergencyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Continuous breathing background glow
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.2,
        opacity: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // Entrance animation
    gsap.from('.emergency-tile', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    })
  }, [])

  const handleAlert = (label: string) => {
    // Visual feedback for alert activation
    gsap.to('body', {
      backgroundColor: '#fee2e2',
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        gsap.to('body', { backgroundColor: '#ffffff', duration: 0.5 })
      }
    })
    
    // Large format text output simulation
    const overlay = document.createElement('div')
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-red-600 pointer-events-none'
    overlay.innerHTML = `<h1 class="text-gray-900 text-6xl md:text-9xl font-black text-center px-10 uppercase tracking-tighter">${label}</h1>`
    document.body.appendChild(overlay)
    
    gsap.fromTo(overlay, { opacity: 0, scale: 2 }, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.5, 
      ease: 'expo.out',
      onComplete: () => {
        gsap.to(overlay, { 
          opacity: 0, 
          scale: 0.5, 
          delay: 1.5, 
          duration: 0.5, 
          onComplete: () => overlay.remove() 
        })
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col p-6 md:p-10">
      {/* Pulse Background */}
      <div ref={pulseRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none opacity-10" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#EF4444" scale={2.5} speed={1.5} distortion={0.3} />
        </Scene>
      </div>

      <header className="relative z-10 mb-10 flex justify-between items-center rounded-none">
        <div className="flex items-center gap-4">
          <ShieldAlert className="w-10 h-10 text-red-600" />
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-red-600 tracking-tighter uppercase italic">Emergency Mode</h1>
            <p className="text-red-500/60 font-bold text-sm tracking-wide uppercase mt-1">Critical Triage Interface Active</p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors uppercase tracking-wide text-xs border border-red-100">Exit Mode</button>
      </header>

      <div ref={containerRef} className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {EMERGENCY_TILES.map((tile) => (
          <button 
            key={tile.id}
            onClick={() => handleAlert(tile.label)}
            className="emergency-tile group relative glass-card hover:border-red-500/40 transition-all flex flex-col items-center justify-center gap-6 active:scale-95"
          >
            <div className="w-20 h-20 rounded-full bg-red-600/5 flex items-center justify-center border border-red-600/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <tile.icon className="w-10 h-10 text-red-600" strokeWidth={1.5} />
            </div>
            <span className="text-2xl md:text-3xl font-black text-red-700 text-center uppercase leading-none tracking-tighter">{tile.label}</span>
          </button>
        ))}
      </div>

      <footer className="relative z-10 mt-10 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-red-50">
        <div className="flex items-center gap-4">
          <Activity className="w-6 h-6 text-red-600 animate-pulse" />
          <div>
            <p className="text-red-900 font-bold text-sm uppercase">Auto-Broadcast Active</p>
            <p className="text-red-500/50 text-[10px] font-bold uppercase tracking-wide">Broadcasting to Hospital Network...</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-red-900 font-black text-2xl tracking-tighter">STATION 04A-RED</p>
        </div>
      </footer>
    </main>
  )
}