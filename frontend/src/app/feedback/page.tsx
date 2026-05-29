'use client'
import Scene from '@/components/3d/Scene'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import FluidSphere from '@/components/3d/FluidSphere'
import CameraPortal from '@/components/translation/CameraPortal'
import gsap from 'gsap'

export default function DatasetFeedbackPage() {
  const [rating, setRating] = useState(0)

  const handleRate = (val: number, e: React.MouseEvent) => {
    setRating(val)
    
    // Aesthetic fluid shockwave (Screen 24)
    const rect = e.currentTarget.getBoundingClientRect()
    const wave = document.createElement('div')
    wave.className = 'fixed w-4 h-4 rounded-full bg-cyan/30 pointer-events-none z-50'
    wave.style.left = `${rect.left + rect.width / 2}px`
    wave.style.top = `${rect.top + rect.height / 2}px`
    document.body.appendChild(wave)

    gsap.to(wave, {
      scale: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      onComplete: () => wave.remove()
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#CCFBF1" scale={3} speed={0.1} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-12 max-w-7xl mx-auto w-full h-full">
        <header className="rounded-none">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Dataset Feedback Portal</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Crowdsourced QA for gesture training verification</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="flex flex-col gap-6">
              <div className="flex-1 aspect-video relative rounded-3xl overflow-hidden glass border border-black/10 p-2 bg-black/5">
                 <CameraPortal />
              </div>
              <p className="text-gray-600 font-medium text-center">Compare captured gesture against expected semantic value.</p>
           </div>

           <GlassCard className="flex flex-col gap-8 border-black/5">
              <div>
                 <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wide mb-2 inline-block">Expected Semantic Value</span>
                 <h2 className="text-4xl font-black tracking-tighter italic text-gray-900">"Emergency Assistance"</h2>
              </div>

              <div className="flex flex-col gap-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Verify Translation Accuracy</h3>
                 <div className="flex justify-between gap-4">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button 
                        key={val}
                        onClick={(e) => handleRate(val, e)}
                        className={`flex-1 aspect-square rounded-2xl glass border transition-all flex items-center justify-center text-xl font-black ${rating >= val ? 'bg-cyan text-gray-900 border-cyan' : 'border-black/5 text-gray-400 hover:border-black/20'}`}
                      >
                        {val}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <textarea 
                   className="w-full glass bg-black/5 border-black/10 rounded-2xl p-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan/50 min-h-[120px]"
                   placeholder="Optional: Submit correct gesture training feedback strings..."
                 />
                 <GlassButton variant="secondary" className="w-full py-4 uppercase tracking-wide text-xs font-black">Submit Verification Data</GlassButton>
              </div>
           </GlassCard>
        </div>
      </div>
    </main>
  )
}
