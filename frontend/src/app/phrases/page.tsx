'use client'
import Scene from '@/components/3d/Scene'

import { useState, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'
import GlassButton from '@/components/ui/GlassButton'

import FluidSphere from '@/components/3d/FluidSphere'
import gsap from 'gsap'

const PHRASES = [
  { id: 1, text: 'Hello, how can I help you today?', category: 'Greeting' },
  { id: 2, text: 'I need medical assistance immediately.', category: 'Urgent' },
  { id: 3, text: 'Could you please repeat that slower?', category: 'Communication' },
  { id: 4, text: 'Where is the nearest pharmacy?', category: 'Logistics' },
  { id: 5, text: 'Thank you for your patience.', category: 'Greeting' },
  { id: 6, text: 'My name is Sarah, I am your nurse.', category: 'Professional' },
  { id: 7, text: 'Please wait here for a moment.', category: 'Instructions' },
  { id: 8, text: 'Are you feeling any pain right now?', category: 'Medical' },
]

export default function SavedPhrasesPage() {
  const [search, setSearch] = useState('')
  
  const handlePhraseClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget
    
    // Scale down and ripple effect (Screen 16)
    gsap.to(card, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })

    const ripple = document.createElement('div')
    ripple.className = 'absolute inset-0 bg-cyan/20 rounded-2xl pointer-events-none opacity-0 scale-0'
    card.appendChild(ripple)

    gsap.to(ripple, {
      opacity: 1,
      scale: 1.5,
      duration: 0.4,
      onComplete: () => ripple.remove()
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#E9D5FF" scale={8} speed={0.05} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-8 max-w-7xl mx-auto w-full h-full">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 rounded-none">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Saved Phrases</h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Quick access to high-frequency communication shortcuts</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <GlassInput 
              placeholder="Filter phrases..." 
              className="md:w-64" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <GlassButton variant="primary" className="text-xs px-6">+ Add Phrase</GlassButton>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto">
          {PHRASES.filter(p => p.text.toLowerCase().includes(search.toLowerCase())).map((phrase) => (
            <GlassCard 
              key={phrase.id} 
              className="relative h-44 flex flex-col justify-between hover:border-cyan/50 transition-all cursor-pointer group bg-transparent border-black/10"
              onClick={(e) => handlePhraseClick(e, phrase.id)}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black px-2 py-1 rounded bg-black/5 text-gray-500 uppercase tracking-tighter">
                  {phrase.category}
                </span>
                <div className="w-2 h-2 rounded-full bg-cyan/40 group-hover:bg-cyan transition-colors" />
              </div>
              <p className="text-lg font-bold text-gray-900 leading-snug group-hover:text-cyan-700 transition-colors">
                "{phrase.text}"
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-wide">Broadcast to Avatar</span>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-3 h-3 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            </GlassCard>
          ))}
          
          <div className="h-44 rounded-3xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-3 hover:border-black/20 transition-all cursor-pointer group">
             <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl text-gray-400 group-hover:text-gray-600">+</span>
             </div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">New Shortcut</span>
          </div>
        </div>
      </div>
    </main>
  )
}
