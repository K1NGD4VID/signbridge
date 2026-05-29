'use client'
import Scene from '@/components/3d/Scene'

import { useState, useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'

import FluidSphere from '@/components/3d/FluidSphere'
import gsap from 'gsap'

export default function OfflineModePage() {
  const [syncProgress, setSyncProgress] = useState(65)

  useEffect(() => {
    // Soft amber aesthetic (Screen 26)
    gsap.to('.amber-glow', {
      opacity: 0.3,
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-[#0a0500] flex flex-col items-center justify-center p-6">
      <div className="amber-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#F59E0B" scale={2.5} speed={0.05} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-xl">
         <GlassCard className="flex flex-col items-center text-center gap-8 border-amber/20 bg-amber/5">
            <div className="w-20 h-20 rounded-3xl glass border border-amber/30 flex items-center justify-center">
               <div className="w-8 h-8 rounded-lg bg-amber animate-pulse" />
            </div>
            
            <div>
               <h1 className="text-3xl font-black text-amber uppercase tracking-tighter mb-2">Offline Mode Active</h1>
               <p className="text-gray-500 font-medium">Network disruption detected. Utilizing local model caches for uninterrupted translation.</p>
            </div>

            <div className="w-full flex flex-col gap-4">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <span>Synchronization State</span>
                  <span>{syncProgress}% Complete</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber transition-all duration-500" style={{ width: `${syncProgress}%` }} />
               </div>
               <p className="text-[10px] font-bold text-amber/60 uppercase tracking-wider animate-pulse">Waiting for network uplink...</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
               <div className="p-4 rounded-xl glass border-white/5 text-left">
                  <p className="text-[8px] font-black text-gray-300 uppercase mb-1">Local Cache</p>
                  <p className="text-sm font-bold">Clinical v2.4 (Active)</p>
               </div>
               <div className="p-4 rounded-xl glass border-white/5 text-left">
                  <p className="text-[8px] font-black text-gray-300 uppercase mb-1">Queued Inputs</p>
                  <p className="text-sm font-bold">14 Statements</p>
               </div>
            </div>
         </GlassCard>
      </div>
    </main>
  )
}
