'use client'
import Scene from '@/components/3d/Scene'

import { useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'

import FluidSphere from '@/components/3d/FluidSphere'
import gsap from 'gsap'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = gsap.utils.toArray('.narrative-section')
    sections.forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'expo.out'
      })
    })
  }, [])

  return (
    <main ref={containerRef} className="relative min-h-screen w-full bg-white flex flex-col items-center overflow-x-hidden text-gray-900">
      {/* Immersive 3D Backdrop (Screen 29) */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={15} speed={0.05} distortion={0.02} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-32 flex flex-col gap-32">
         
         <section className="narrative-section text-center flex flex-col items-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-600">Unified Communication</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-gray-900">Breaking the Silence.</h1>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl">
               SignBridge is the world’s first high-fidelity AI orchestration layer designed specifically for the deaf and hard-of-hearing communities.
            </p>
         </section>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="narrative-section flex flex-col gap-6">
               <h2 className="text-3xl font-bold italic tracking-tighter text-gray-900">Our Mission</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that communication is a fundamental human right. By leveraging advanced computer vision and generative digital humans, we bridge the gap between signed and spoken languages in real-time.
               </p>
            </section>
            <section className="narrative-section flex flex-col gap-6">
               <h2 className="text-3xl font-bold italic tracking-tighter text-gray-900">The Technology</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  Utilizing fractional Brownian motion noise shaders and neural gesture synthesis, our platform delivers an experience that is both technically precise and emotionally resonant.
               </p>
            </section>
         </div>

         <section className="narrative-section">
            <GlassCard className="p-16 border-black/5 bg-transparent">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div>
                     <span className="text-5xl font-black block mb-2 text-gray-900">30+</span>
                     <span className="text-[10px] font-black uppercase tracking-wide text-gray-400">Operational Modules</span>
                  </div>
                  <div>
                     <span className="text-5xl font-black block mb-2 text-gray-900">12ms</span>
                     <span className="text-[10px] font-black uppercase tracking-wide text-gray-400">Average Latency</span>
                  </div>
                  <div>
                     <span className="text-5xl font-black block mb-2 text-gray-900">99%</span>
                     <span className="text-[10px] font-black uppercase tracking-wide text-gray-400">Accuracy Index</span>
                  </div>
               </div>
            </GlassCard>
         </section>

         <footer className="narrative-section text-center pt-32 pb-16 flex flex-col gap-4 border-t border-black/10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">SignBridge Global Documentation • v4.2.0 Build 99</p>
            <div className="flex justify-center gap-8 text-[10px] font-bold uppercase text-gray-500">
               <a href="#" className="hover:text-cyan-600 transition-colors">Privacy Framework</a>
               <a href="#" className="hover:text-cyan-600 transition-colors">Legal Terms</a>
               <a href="#" className="hover:text-cyan-600 transition-colors">Research API</a>
            </div>
         </footer>
      </div>
    </main>
  )
}
