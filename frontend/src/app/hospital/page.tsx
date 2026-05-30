'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })
const CameraPortal = dynamic(() => import('@/components/translation/CameraPortal'), { ssr: false })

import { useState } from 'react'

import GlassCard from '@/components/ui/GlassCard'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { User, Stethoscope, MessageSquare, Zap, Activity, FileText } from 'lucide-react'

import GlassButton from '@/components/ui/GlassButton'

export default function HospitalModePage() {
  const [transcript, setTranscript] = useState([
    { role: 'Doctor', text: 'Can you describe the pain in your chest?' },
    { role: 'Patient', text: 'It feels like a heavy pressure, starting from the center.' },
  ])

  const metadata = [
    { label: 'Patient ID', value: 'SB-99201', icon: User },
    { label: 'Department', value: 'Cardiology', icon: Stethoscope },
    { label: 'Sign Dialect', value: 'ASL - Medical Standard', icon: MessageSquare },
    { label: 'Latency', value: '12ms', icon: Zap },
  ]

  const medicalTerms = [
    { term: 'Myocardial Infarction', definition: 'Technical term for a heart attack.' },
    { term: 'Angina', definition: 'Chest pain caused by reduced blood flow to the heart.' },
    { term: 'Dyspnea', definition: 'Difficult or labored breathing.' },
  ]

  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-hidden">
      {/* Background Sphere */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#0EA5E9" scale={4} distortion={0.05} speed={0.1} />
        </Scene>
      </div>

      {/* Clinical Header */}
      <header className="relative z-10 p-6 glass border-b border-cyan-500/10 flex justify-between items-center bg-cyan-50/40 rounded-none">
        <div className="flex items-center gap-6">
          <Link href="/" className="w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center border border-cyan-600/20 hover:scale-105 transition-transform">
            <Logo className="w-6 h-6 text-cyan-600" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase text-cyan-600">Hospital Mode</h1>
            <span className="text-[10px] font-bold text-cyan-600/60 uppercase tracking-wide">Clinical Communication Interface v4.0</span>
          </div>
          <div className="h-10 w-px bg-black/5 mx-2" />
          <div className="flex gap-8">
            {metadata.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</span>
                <span className="text-sm font-bold text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <GlassButton variant="outline" className="border-red-500/20 text-red-600 hover:bg-red-50">Emergency Exit</GlassButton>
          <GlassButton variant="secondary">Freeze Stream</GlassButton>
        </div>
      </header>

      {/* Content Grid */}
      <div className="relative z-10 flex-1 p-6 grid grid-cols-12 gap-6 h-full overflow-hidden">
        
        {/* Left: Real-time Feeds (8 cols) */}
        <div className="col-span-8 flex flex-col gap-6 h-full">
          <div className="flex-1 relative rounded-3xl overflow-hidden border-2 border-cyan-400">
            <CameraPortal />
            {/* Neon Cyan Border Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-cyan-400/5" />
            
            <div className="absolute top-6 left-6 glass px-4 py-2 rounded-xl border-cyan-400/20 bg-white/60">
              <span className="text-xs font-black text-cyan-600 uppercase tracking-wide animate-pulse">Live Clinical Feed</span>
            </div>
          </div>

          <GlassCard className="h-48 flex flex-col bg-white/40 border-cyan-500/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Live Transcription Stream</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                <span className="text-[10px] font-bold text-cyan-600 uppercase">Syncing...</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              {transcript.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className={`text-[10px] font-black uppercase tracking-tighter w-16 mt-1 ${line.role === 'Doctor' ? 'text-cyan-600' : 'text-gray-400'}`}>{line.role}:</span>
                  <p className="text-lg font-medium text-gray-800">{line.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Metadata & Terminology (4 cols) */}
        <div className="col-span-4 flex flex-col gap-6 h-full">
          <GlassCard className="flex-1 flex flex-col bg-white/40 border-cyan-500/5 overflow-hidden">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-wide mb-6 border-b border-black/5 pb-4">Medical Metadata</h2>
            
            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
              <section>
                <h3 className="text-[10px] font-bold text-cyan-600 uppercase mb-4">Detected Clinical Terms</h3>
                <div className="space-y-3">
                  {medicalTerms.map((term, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-cyan-50 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors cursor-help group">
                      <p className="font-bold text-cyan-600 text-sm mb-1 group-hover:scale-105 transition-transform origin-left">{term.term}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-4">Vitals Summary (Sign-to-Data)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-black/5 border border-black/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Pain Intensity</p>
                    <p className="text-2xl font-black text-red-500">8/10</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/5 border border-black/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Duration</p>
                    <p className="text-2xl font-black text-gray-800">45m</p>
                  </div>
                </div>
              </section>
            </div>

            <GlassButton className="mt-6 w-full py-4 text-sm font-black uppercase tracking-wide border-cyan-500/20 text-cyan-600 bg-cyan-50 hover:bg-cyan-100">Export Clinical Log</GlassButton>
          </GlassCard>
        </div>

      </div>
    </main>
  )
}