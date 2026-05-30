'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'

import gsap from 'gsap'

export default function SupportPage() {
  useEffect(() => {
    gsap.from('.support-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })
  }, [])

  const guides = [
    { title: 'Calibration Guide', desc: 'Step-by-step setup for camera gesture tracking.' },
    { title: 'Dialect Packs', desc: 'How to install and switch sign language dialects.' },
    { title: 'Node Management', desc: 'Enterprise workstation configuration guide.' },
    { title: 'Troubleshooting', desc: 'Common connectivity and rendering issues.' },
  ]

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col items-center p-8 md:p-12 overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#22D3EE" scale={3} speed={0.1} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-16">
         <header className="text-center flex flex-col items-center gap-6 rounded-none">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900">Support Center</h1>
            <div className="w-full max-w-2xl relative">
               <GlassInput placeholder="Search contextual troubleshooting guides..." className="py-5 px-8 text-lg" />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black uppercase text-[10px] tracking-wide">Type to Search</div>
            </div>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <GlassCard key={i} className="support-card group p-10 hover:border-cyan/50 transition-all cursor-pointer bg-transparent border-black/10 flex flex-col justify-between h-64">
                 <div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-600 transition-colors text-gray-900">{guide.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{guide.desc}</p>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wide text-gray-400">Read Full Guide</span>
                    <div className="w-8 h-8 rounded-full glass border border-black/10 flex items-center justify-center group-hover:bg-cyan group-hover:text-gray-900 transition-all">
                       →
                    </div>
                 </div>
              </GlassCard>
            ))}
         </div>

         <GlassCard className="support-card p-12 bg-cyan-50 border-cyan-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <h2 className="text-2xl font-bold mb-2 text-gray-900">Need direct technical assistance?</h2>
               <p className="text-gray-600">Our enterprise support engineers are available 24/7 for critical troubleshooting.</p>
            </div>
            <button className="px-8 py-4 bg-cyan text-gray-900 font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all">
               Open Support Request
            </button>
         </GlassCard>
      </div>
    </main>
  )
}