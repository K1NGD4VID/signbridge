'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useState, useRef, useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'

const SUBJECTS = [
  { id: 'stem', name: 'STEM', color: '#34D399', terms: ['Velocity', 'Calculus', 'Microbiology', 'Circuitry'] },
  { id: 'lit', name: 'Literature', color: '#60A5FA', terms: ['Metaphor', 'Soliloquy', 'Anthology', 'Prose'] },
  { id: 'hist', name: 'History', color: '#F59E0B', terms: ['Revolution', 'Dynasty', 'Treaty', 'Civilization'] },
]

export default function ClassroomVocabularyPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleComplete = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Gamified micro-interaction flurry (Screen 18)
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.className = 'fixed w-2 h-2 rounded-full glass border border-mint/40 pointer-events-none z-50'
      particle.style.left = `${rect.left + rect.width / 2}px`
      particle.style.top = `${rect.top + rect.height / 2}px`
      document.body.appendChild(particle)

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 300,
        y: -Math.random() * 400 - 100,
        opacity: 0,
        scale: Math.random() * 2,
        duration: 1.5,
        ease: 'power3.out',
        onComplete: () => particle.remove()
      })
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#34D399" scale={4} speed={0.05} />
        </Scene>
      </div>

      <header className="relative z-10 p-6 glass border-b border-mint/30 flex justify-between items-center bg-mint/10 rounded-none">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter uppercase text-mint">Classroom Vocabulary Hub</h1>
          <span className="text-[10px] font-bold text-mint-700 uppercase tracking-wide">Academic Subject Sign Libraries v2.1</span>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-end justify-center">
              <span className="text-[8px] font-black text-gray-400 uppercase">Mastery Progress</span>
              <div className="w-32 h-1.5 bg-black/5 rounded-full overflow-hidden mt-1">
                 <div className="h-full bg-mint" style={{ width: '65%' }} />
              </div>
           </div>
           <GlassButton variant="outline" className="text-xs border-mint/20 text-mint-700">Daily Review</GlassButton>
        </div>
      </header>

      <div ref={containerRef} className="relative z-10 flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto">
         {SUBJECTS.map((subject) => (
           <div key={subject.id} className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-xl font-black tracking-tighter text-gray-900">{subject.name}</h2>
                 <span className="text-[10px] font-bold text-gray-400 uppercase">{subject.terms.length} Terms</span>
              </div>
              
              <div className="flex flex-col gap-4">
                 {subject.terms.map((term, i) => (
                   <GlassCard 
                     key={i} 
                     className="p-6 hover:bg-mint/5 border-black/10 transition-all cursor-pointer group flex justify-between items-center bg-transparent"
                   >
                      <div className="flex flex-col gap-1">
                         <span className="text-[8px] font-black text-gray-400 uppercase tracking-wide">Scientific Terminology</span>
                         <h3 className="text-lg font-bold group-hover:text-mint-700 transition-colors text-gray-900">{term}</h3>
                      </div>
                      <div 
                        onClick={handleComplete}
                        className="w-10 h-10 rounded-full glass border border-black/10 flex items-center justify-center hover:bg-mint hover:text-gray-900 transition-all"
                      >
                         <span className="text-xs">→</span>
                      </div>
                   </GlassCard>
                 ))}
                 
                 <GlassButton 
                   variant="outline" 
                   className="mt-2 py-4 border-dashed border-black/10 text-gray-400 hover:text-gray-600 hover:bg-black/5"
                 >
                    Load More {subject.name}
                 </GlassButton>
              </div>
           </div>
         ))}
      </div>

      <footer className="relative z-10 p-6 glass border-t border-black/10 bg-black/5 flex justify-center">
         <div className="flex gap-12 items-center">
            <div className="flex flex-col items-center">
               <span className="text-3xl font-black text-mint">124</span>
               <span className="text-[8px] font-black uppercase text-gray-400">Total Signs</span>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex flex-col items-center">
               <span className="text-3xl font-black text-gray-900">82</span>
               <span className="text-[8px] font-black uppercase text-gray-400">Mastered</span>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex flex-col items-center">
               <span className="text-3xl font-black text-cyan-600">12</span>
               <span className="text-[8px] font-black uppercase text-gray-400">Day Streak</span>
            </div>
         </div>
      </footer>
    </main>
  )
}