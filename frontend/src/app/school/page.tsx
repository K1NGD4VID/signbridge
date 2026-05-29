'use client'
import Scene from '@/components/3d/Scene'

import { useState } from 'react'
import AvatarViewer from '@/components/translation/AvatarViewer'
import GlassCard from '@/components/ui/GlassCard'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { GraduationCap, Hand, BookOpen, Check } from 'lucide-react'

import FluidSphere from '@/components/3d/FluidSphere'
import GlassButton from '@/components/ui/GlassButton'
import { fadeUpStagger } from '@/utils/animations'
import { useEffect, useRef } from 'react'

export default function SchoolModePage() {
  const [vocab, setVocab] = useState([
    { word: 'Photosynthesis', type: 'Biology', learned: true },
    { word: 'Chlorophyll', type: 'Biology', learned: false },
    { word: 'Stomata', type: 'Biology', learned: false },
  ])

  const ledgerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fadeUpStagger('.vocab-item', 0.5, 0.1)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-hidden">
      {/* Background Sphere */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#34D399" scale={4} distortion={0.05} speed={0.1} />
        </Scene>
      </div>

      {/* Educational Header */}
      <header className="relative z-10 p-6 flex justify-between items-center rounded-none">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center justify-center hover:scale-105 transition-transform">
            <Logo className="w-8 h-8 text-mint" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-mint-600" />
              <h1 className="text-2xl font-black tracking-tighter uppercase text-mint">School Mode</h1>
            </div>
            <span className="text-[10px] font-bold text-mint-700 uppercase tracking-wide">Interactive Classroom System v2.4</span>
          </div>
          <div className="h-10 w-px bg-black/10 mx-2" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-mint-600" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">Active Lesson</span>
            </div>
            <span className="text-sm font-bold text-gray-800">Intro to Plant Biology: Unit 4</span>
          </div>
        </div>
        <div className="flex gap-4">
          <GlassButton variant="outline" className="border-black/5 text-gray-900 bg-transparent flex items-center gap-2">
            <Hand className="w-4 h-4 text-mint-600" />
            Raise Hand
          </GlassButton>
          <GlassButton variant="secondary" className="bg-mint/10 text-mint-700 border-none hover:bg-mint/20">Submit Quiz</GlassButton>
        </div>
      </header>

      {/* Content Grid */}
      <div className="relative z-10 flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-hidden">
        
        {/* Left: Instructor / Digital Board */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 relative rounded-3xl overflow-hidden border border-black/5 bg-black/5">
            {/* Simulated Digital Board */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-full max-w-lg aspect-video bg-black/5 rounded-2xl border border-black/5 flex items-center justify-center mb-8">
                <p className="text-gray-400 italic">Instructor Video Stream</p>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">"The process by which green plants and some other organisms use sunlight to synthesize foods..."</h3>
              <p className="text-mint-700 font-medium">Topic: Chemical Reaction Equation</p>
            </div>
            
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">Main Lecture Feed</span>
            </div>
          </div>
        </div>

        {/* Right: Sign Avatar Viewer */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 relative">
            <AvatarViewer />
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
               <span className="text-[10px] font-black uppercase text-gray-500 tracking-wide">Synchronized Sign Output</span>
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-1.5 h-6 bg-mint/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Vocabulary Ledger (Screen 9) */}
      <section className="relative z-10 p-6 pt-0 h-64">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-mint-700 uppercase tracking-wide">Real-time Lesson Vocabulary Ledger</h2>
            <span className="text-[10px] text-gray-500 uppercase font-bold">3 New Terms Detected</span>
          </div>
          <div ref={ledgerRef} className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {vocab.map((item, i) => (
              <div key={i} className="vocab-item flex-none w-64 p-2 transition-all group opacity-0">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.type}</span>
                    {item.learned && <Check className="w-4 h-4 text-mint" />}
                 </div>
                 <h4 className="text-xl font-bold mb-1 group-hover:text-mint-700 transition-colors text-gray-900">{item.word}</h4>
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Click to Review Sign</p>
              </div>
            ))}
            {/* Placeholder for more items */}
            <div className="flex-none w-64 flex items-center justify-center opacity-50">
               <span className="text-gray-400 font-bold uppercase text-[10px]">Listening...</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

