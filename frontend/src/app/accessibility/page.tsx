'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useState, useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'

export default function AccessibilityPreferencesPage() {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    gsap.from('.pref-row', {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    })
  }, [])

  const toggleContrast = () => {
    setHighContrast(!highContrast)
    gsap.to('main', {
      backgroundColor: !highContrast ? '#f3f4f6' : '#ffffff',
      duration: 0.3
    })
  }

  const prefs = [
    { label: 'Sign Language Dialect', value: 'American Sign Language (ASL)', type: 'select' },
    { label: 'Avatar Speed Multiplier', value: '1.2x', type: 'range' },
    { label: 'Captions Size', value: 'Medium', type: 'select' },
    { label: 'Haptic Feedback Intensity', value: 'High', type: 'range' },
  ]

  return (
    <main className={`relative min-h-screen w-full overflow-hidden transition-colors ${highContrast ? 'bg-gray-100' : 'bg-white'} text-gray-900`}>
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color={highContrast ? '#111827' : '#22D3EE'} scale={3} speed={0.1} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col items-center max-w-4xl mx-auto">
        <header className="w-full mb-12 rounded-none">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Accessibility Preferences</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Single-tap setup for custom communication profiles</p>
        </header>

        <GlassCard className={`w-full flex flex-col gap-8 ${highContrast ? 'border-black/40 bg-white/50' : 'border-black/10 bg-white/30'}`}>
           {prefs.map((p, i) => (
             <div key={i} className="pref-row flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-b border-black/5 last:border-0">
                <span className="text-lg font-bold text-gray-800">{p.label}</span>
                <div className="w-full md:w-64 flex items-center gap-4">
                   {p.type === 'range' ? (
                     <input type="range" className="w-full accent-cyan" />
                   ) : (
                     <div className="w-full glass px-4 py-2 rounded-xl border border-black/10 text-sm font-medium text-gray-700">
                        {p.value}
                     </div>
                   )}
                </div>
             </div>
           ))}

           <div className="pref-row flex justify-between items-center py-6">
              <span className="text-lg font-bold text-gray-800">High Contrast Mode</span>
              <button 
                onClick={toggleContrast}
                className={`w-14 h-8 rounded-full transition-colors relative ${highContrast ? 'bg-cyan' : 'bg-black/10'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${highContrast ? 'left-7' : 'left-1'}`} />
              </button>
           </div>

           <div className="mt-8 flex gap-4">
              <GlassButton variant="secondary" className="flex-1 py-4">Save Profile</GlassButton>
              <GlassButton variant="outline" className="flex-1 py-4">Reset Defaults</GlassButton>
           </div>
        </GlassCard>
      </div>
    </main>
  )
}