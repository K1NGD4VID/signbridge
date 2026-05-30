'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Identity Settings')

  const handleTabChange = (tab: string) => {
    gsap.to('.profile-content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(tab)
        gsap.fromTo('.profile-content', { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' })
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col items-center p-6 md:p-12 text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#E9D5FF" scale={3} speed={0.1} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 rounded-none">
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 rounded-3xl glass border border-black/10 p-1">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan/40 to-brand-lavender/40 flex items-center justify-center text-3xl font-black text-gray-900">SJ</div>
             </div>
             <div>
                <h1 className="text-4xl font-black tracking-tighter mb-1 text-gray-900">Dr. Sarah Johnson</h1>
                <p className="text-gray-500 font-bold uppercase tracking-wide text-xs">Medical Staff • Mount Sinai Hospital</p>
             </div>
          </div>
          <div className="flex gap-4">
             {['Identity Settings', 'Security Keys', 'Integrations'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => handleTabChange(tab)}
                 className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${activeTab === tab ? 'bg-black/5 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </header>

        <GlassCard className="profile-content p-10 min-h-[500px] border-black/5">
          {activeTab === 'Identity Settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="flex flex-col gap-8">
                 <h2 className="text-xl font-bold border-b border-black/10 pb-4 text-gray-900">Personal Demographics</h2>
                 <GlassInput label="Full Name" defaultValue="Sarah Johnson" />
                 <GlassInput label="Professional Title" defaultValue="Senior Cardiologist" />
                 <GlassInput label="Primary Language" defaultValue="English" />
                 <GlassInput label="Sign Dialect" defaultValue="American Sign Language (ASL)" />
              </section>
              <section className="flex flex-col gap-8">
                 <h2 className="text-xl font-bold border-b border-black/10 pb-4 text-gray-900">Communication Preferences</h2>
                 <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-gray-600 ml-1">Avatar Personality</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['Clinical', 'Friendly', 'Minimal'].map(v => (
                         <button key={v} className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-wide ${v === 'Clinical' ? 'border-cyan/40 bg-cyan/10 text-cyan-600' : 'border-black/5 bg-black/5 text-gray-400'}`}>
                           {v}
                         </button>
                       ))}
                    </div>
                 </div>
                 <GlassInput label="Transcription Speed" type="range" min="0" max="100" defaultValue="50" />
                 <div className="mt-auto">
                    <GlassButton variant="secondary" className="w-full">Save Changes</GlassButton>
                 </div>
              </section>
            </div>
          )}

          {activeTab === 'Security Keys' && (
            <div className="flex flex-col items-center justify-center py-20 gap-8">
               <div className="w-20 h-20 rounded-full glass border border-cyan/30 flex items-center justify-center">
                  <div className="w-10 h-10 bg-cyan/20 rounded-xl border border-cyan/40" />
               </div>
               <div className="text-center max-w-sm">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">Biometric Authentication</h2>
                  <p className="text-gray-500 text-sm">Use your device biometrics or a security key to protect your SignBridge account.</p>
               </div>
               <GlassButton variant="outline">Provision New Key</GlassButton>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  )
}