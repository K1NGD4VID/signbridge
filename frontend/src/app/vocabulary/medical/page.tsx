'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })
const AvatarViewer = dynamic(() => import('@/components/translation/AvatarViewer'), { ssr: false })

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'

const CATEGORIES = [
  { id: 'cardio', name: 'Cardiology', terms: [
    { name: 'Myocardial Infarction', def: 'Technical term for a heart attack, occurring when blood flow decreases or stops to a part of the heart.' },
    { name: 'Angina', def: 'Chest pain caused by reduced blood flow to the heart muscle.' },
    { name: 'Arrhythmia', def: 'A condition in which the heart beats with an irregular or abnormal rhythm.' }
  ]},
  { id: 'neuro', name: 'Neurology', terms: [
    { name: 'Encephalopathy', def: 'Any disease or disorder that affects the function or structure of your brain.' },
    { name: 'Paresthesia', def: 'An abnormal sensation, typically tingling or pricking (“pins and needles”), caused by pressure on or damage to peripheral nerves.' }
  ]},
  { id: 'triage', name: 'General Triage', terms: [
    { name: 'Dyspnea', def: 'Difficult or labored breathing.' },
    { name: 'Syncope', def: 'Temporary loss of consciousness caused by a fall in blood pressure.' }
  ]}
]

export default function MedicalVocabularyPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])
  const [activeTerm, setActiveTerm] = useState(CATEGORIES[0].terms[0])

  const handleCategoryChange = (cat: typeof CATEGORIES[0]) => {
    gsap.to('.details-pane', {
      y: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveCategory(cat)
        setActiveTerm(cat.terms[0])
        gsap.fromTo('.details-pane', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' })
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#0EA5E9" scale={4} speed={0.05} />
        </Scene>
      </div>

      <header className="relative z-10 p-6 glass rounded-none border-b border-cyan-500/30 flex justify-between items-center bg-cyan-50">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter uppercase text-cyan-600">Medical Vocabulary Hub</h1>
          <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wide">Specialized Clinical Sign Library v1.2</span>
        </div>
        <GlassButton variant="outline" className="text-xs">Download Offline Pack</GlassButton>
      </header>

      <div className="relative z-10 flex-1 flex h-full overflow-hidden">
        {/* Left: Index Ledger (Screen 17) */}
        <aside className="w-80 glass rounded-none border-r border-black/5 flex flex-col p-6 gap-6 bg-black/5">
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-2">Clinical Classifications</h2>
           <nav className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat)}
                  className={`p-4 rounded-2xl text-left transition-all ${activeCategory.id === cat.id ? 'bg-cyan-600/10 border border-cyan-600/30 text-cyan-600' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'}`}
                >
                  <span className="text-sm font-bold">{cat.name}</span>
                </button>
              ))}
           </nav>
        </aside>

        {/* Right: Expanded Details Window */}
        <div className="details-pane flex-1 p-8 grid grid-cols-12 gap-8 overflow-y-auto">
           <div className="col-span-7 flex flex-col gap-8">
              <header className="rounded-none">
                 <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wide mb-2 inline-block">{activeCategory.name}</span>
                 <h2 className="text-4xl font-black tracking-tighter text-gray-900">{activeTerm.name}</h2>
              </header>
              
              <GlassCard className="bg-transparent border-black/5 p-8">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-4">Semantic Definition</h3>
                 <p className="text-xl font-medium leading-relaxed text-gray-700">{activeTerm.def}</p>
              </GlassCard>

              <div className="grid grid-cols-2 gap-6">
                 <GlassCard className="p-6 bg-transparent border-black/5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-2 inline-block">Dialect Variants</span>
                    <p className="text-sm font-bold text-gray-900">ASL, BSL, SEE</p>
                 </GlassCard>
                 <GlassCard className="p-6 bg-transparent border-black/5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-2 inline-block">Usage Frequency</span>
                    <p className="text-sm font-bold text-mint">High (Level 4)</p>
                 </GlassCard>
              </div>

              <div className="mt-auto">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-4">Related Terms in {activeCategory.name}</h3>
                 <div className="flex flex-wrap gap-3">
                    {activeCategory.terms.map((term, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveTerm(term)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTerm.name === term.name ? 'bg-cyan-600 text-gray-900' : 'glass border border-black/10 text-gray-500 hover:text-gray-900'}`}
                      >
                        {term.name}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="col-span-5 flex flex-col gap-6">
              <div className="flex-1 min-h-[400px] relative rounded-3xl overflow-hidden glass border border-cyan-600/20">
                 <AvatarViewer />
                 <div className="absolute top-6 left-6 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-black/10">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">Looped Sign Preview</span>
                 </div>
              </div>
              <GlassButton variant="secondary" className="w-full py-4 uppercase tracking-wide text-xs font-black">Add to Quick Phrases</GlassButton>
           </div>
        </div>
      </div>
    </main>
  )
}