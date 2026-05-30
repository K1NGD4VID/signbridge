'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'

export default function GlobalSettingsPage() {
  const [activeTab, setActiveTab] = useState('Rendering')

  const handleTabChange = (tab: string) => {
    gsap.to('.settings-content', {
      x: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(tab)
        gsap.fromTo('.settings-content', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'expo.out' })
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={8} speed={0.05} />
        </Scene>
      </div>

      {/* Sidebar Tabs (Screen 27) */}
      <aside className="relative z-10 w-72 glass rounded-none border-r border-black/5 flex flex-col p-8 gap-12 bg-gray-50/50">
         <div>
            <h1 className="text-2xl font-black tracking-tighter mb-1 text-gray-900">Global Settings</h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">Universal System Hub</p>
         </div>

         <nav className="flex flex-col gap-2">
            {['Rendering', 'Audio Input', 'Caching Layer', 'API Orchestration'].map(tab => (
              <button 
                key={tab} 
                onClick={() => handleTabChange(tab)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-black/5 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'}`}
              >
                {tab}
              </button>
            ))}
         </nav>
      </aside>

      <div className="relative z-10 flex-1 p-12 overflow-y-auto">
         <div className="settings-content max-w-3xl flex flex-col gap-8">
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">{activeTab}</h2>
            
            <GlassCard className="flex flex-col gap-10 border-black/5 bg-transparent">
               {activeTab === 'Rendering' && (
                 <div className="flex flex-col gap-8">
                    <section>
                       <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-wide mb-4">Performance Optimization</h3>
                       <div className="flex justify-between items-center py-4 border-b border-black/5">
                          <span className="font-medium">Hardware Acceleration</span>
                          <span className="text-xs text-mint font-bold">Enabled</span>
                       </div>
                       <div className="flex justify-between items-center py-4 border-b border-black/5">
                          <span className="font-medium">FPS Cap (WebGL)</span>
                          <span className="text-xs text-gray-400">60 FPS</span>
                       </div>
                    </section>
                    <section>
                       <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-wide mb-4">Visual Fidelity</h3>
                       <div className="flex flex-col gap-4">
                          <label className="text-xs font-medium text-gray-500">Backdrop Blur Strength</label>
                          <input type="range" className="w-full accent-cyan" />
                       </div>
                    </section>
                 </div>
               )}

               {activeTab === 'Caching Layer' && (
                 <div className="flex flex-col gap-8">
                    <section>
                       <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-wide mb-4">Local Model Storage</h3>
                       <div className="p-6 rounded-2xl bg-black/5 border border-black/10 flex justify-between items-center">
                          <div>
                             <p className="font-bold text-gray-900">Medical Dataset v4.2</p>
                             <p className="text-[10px] text-gray-500 uppercase">Last Sync: Today, 08:42 AM</p>
                          </div>
                          <GlassButton variant="outline" className="text-[10px] py-2">Update</GlassButton>
                       </div>
                    </section>
                    <GlassButton variant="primary" className="py-4">Purge Application Cache</GlassButton>
                 </div>
               )}

               <div className="pt-8 border-t border-black/10">
                  <GlassButton variant="secondary" className="w-full py-4 uppercase tracking-wide text-xs font-black">Apply Configuration Strings</GlassButton>
               </div>
            </GlassCard>
         </div>
      </div>
    </main>
  )
}