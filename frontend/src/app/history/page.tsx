'use client'
import Scene from '@/components/3d/Scene'

import { useState, useEffect } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'
import GlassButton from '@/components/ui/GlassButton'

import FluidSphere from '@/components/3d/FluidSphere'
import gsap from 'gsap'

const HISTORY_DATA = [
  { id: 1, date: 'May 28, 2026', module: 'Hospital Mode', duration: '24m', accuracy: '98.5%', location: 'Mount Sinai - ER' },
  { id: 2, date: 'May 27, 2026', module: 'School Mode', duration: '45m', accuracy: '99.2%', location: 'NYU - Room 402' },
  { id: 3, date: 'May 27, 2026', module: 'Emergency Mode', duration: '12m', accuracy: '96.8%', location: 'Ambulance 04' },
  { id: 4, date: 'May 26, 2026', module: 'Live Translation', duration: '1h 10m', accuracy: '99.0%', location: 'Private Session' },
  { id: 5, date: 'May 25, 2026', module: 'Hospital Mode', duration: '32m', accuracy: '97.4%', location: 'Mount Sinai - Cardiology' },
]

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(HISTORY_DATA)

  useEffect(() => {
    const filtered = HISTORY_DATA.filter(item => 
      item.module.toLowerCase().includes(search.toLowerCase()) || 
      item.location.toLowerCase().includes(search.toLowerCase())
    )
    
    // Animate list refinement
    gsap.to('.history-row', {
      opacity: 0,
      x: -20,
      duration: 0.2,
      stagger: 0.05,
      onComplete: () => {
        setFilteredData(filtered)
        gsap.fromTo('.history-row', 
          { opacity: 0, x: 20 }, 
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
        )
      }
    })
  }, [search])

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={8} speed={0.05} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-8 max-w-7xl mx-auto w-full h-full">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 rounded-none">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Conversation History</h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Data-dense repository of dialogue records</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <GlassInput 
              placeholder="Search sessions..." 
              className="md:w-64" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <GlassButton variant="outline" className="text-xs">Export All</GlassButton>
          </div>
        </header>

        <GlassCard className="flex-1 p-0 overflow-hidden border-black/5 bg-transparent">
          <div className="grid grid-cols-5 p-6 border-b border-black/10 text-[10px] font-black text-gray-400 uppercase tracking-wide">
            <span>Date & Location</span>
            <span>Module</span>
            <span>Duration</span>
            <span>Accuracy Index</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="overflow-y-auto">
            {filteredData.map((item) => (
              <div key={item.id} className="history-row grid grid-cols-5 p-6 border-b border-black/5 last:border-0 items-center hover:bg-black/5 transition-colors cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 group-hover:text-cyan-600 transition-colors">{item.date}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{item.location}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">{item.module}</span>
                <span className="text-xs text-gray-500">{item.duration}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan" 
                      style={{ width: item.accuracy }}
                    />
                  </div>
                  <span className="text-xs font-bold text-cyan-600">{item.accuracy}</span>
                </div>
                <div className="text-right">
                  <GlassButton variant="outline" className="py-1 px-3 text-[10px] uppercase">View Transcript</GlassButton>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </main>
  )
}
