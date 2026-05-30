'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'

import gsap from 'gsap'

const NOTIFICATIONS = [
  { id: 1, type: 'Info', title: 'System Update Successful', desc: 'SignBridge v4.2.0 deployed across all nodes.', time: '2m ago' },
  { id: 2, type: 'Alert', title: 'Low Signal Detected', desc: 'Station 04B reporting intermittent network latency.', time: '14m ago' },
  { id: 3, type: 'Success', title: 'Calibration Complete', desc: '3D Avatar gesture synchronization successfully optimized.', time: '1h ago' },
  { id: 4, type: 'Info', title: 'New Vocabulary Pack', desc: 'Neurology - Pediatric dialect pack is now available.', time: '3h ago' },
]

export default function NotificationsPage() {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (drawerRef.current) {
      gsap.fromTo(drawerRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 1.2, ease: 'power4.out' }
      )
      
      gsap.from('.notif-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power2.out'
      })
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex justify-end text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#CCFBF1" scale={3} speed={0.1} />
        </Scene>
      </div>

      <div 
        ref={drawerRef}
        className="relative z-10 w-full max-w-lg h-full glass-heavy border-l border-black/10 p-10 flex flex-col bg-white/40"
      >
        <header className="mb-12 rounded-none">
          <h1 className="text-3xl font-black tracking-tighter mb-2 text-gray-900">Notifications Center</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide">Systemic Alerts & Diagnostic Milestones</p>
        </header>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
           {NOTIFICATIONS.map((n) => (
             <GlassCard key={n.id} className="notif-item p-6 border-black/5 bg-transparent hover:bg-black/5 transition-all cursor-pointer group">
                <div className="flex justify-between items-center mb-3">
                   <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${n.type === 'Alert' ? 'text-red-600' : n.type === 'Success' ? 'text-mint' : 'text-cyan-600'}`}>{n.type}</span>
                   <span className="text-[10px] text-gray-400 font-bold uppercase">{n.time}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors">{n.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{n.desc}</p>
             </GlassCard>
           ))}
        </div>

        <button className="mt-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors border-t border-black/10">
           Clear All Notification Strings
        </button>
      </div>
    </main>
  )
}