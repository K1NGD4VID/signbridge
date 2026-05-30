'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import VoicePortal from '@/components/voice/VoicePortal'
import GlassCard from '@/components/ui/GlassCard'

export default function VoiceDemoPage() {
  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#22D3EE" scale={3} distortion={0.1} speed={0.2} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-4xl h-[500px]">
        <VoicePortal />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           <GlassCard className="p-4 flex flex-col items-center border-black/5">
              <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Confidence</span>
              <span className="text-2xl font-black text-cyan-600">98.2%</span>
           </GlassCard>
           <GlassCard className="p-4 flex flex-col items-center border-black/5">
              <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Noise Floor</span>
              <span className="text-2xl font-black text-gray-900">-64dB</span>
           </GlassCard>
           <GlassCard className="p-4 flex flex-col items-center border-black/5">
              <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Detected Language</span>
              <span className="text-2xl font-black text-gray-900">English</span>
           </GlassCard>
        </div>
      </div>
    </main>
  )
}