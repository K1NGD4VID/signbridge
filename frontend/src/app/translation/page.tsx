'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import Logo from '@/components/ui/Logo'
import gsap from 'gsap'
import { Mic, Video, Settings, FileText, XOctagon } from 'lucide-react'

// SSR-safe components
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })
const CameraPortal = dynamic(() => import('@/components/translation/CameraPortal'), { ssr: false })
const AvatarViewer = dynamic(() => import('@/components/translation/AvatarViewer'), { ssr: false })

export default function LiveTranslationPage() {
  const [signOutput, setSignOutput] = useState("Waiting for sign input...")
  const [voiceInput, setVoiceInput] = useState("Waiting for voice input...")
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerShimmer = () => {
    const cards = containerRef.current?.querySelectorAll('.translation-pane')
    if (cards) {
      gsap.to(cards, {
        borderColor: 'rgba(34, 211, 238, 0.4)',
        duration: 0.5,
        stagger: 0.2,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSignOutput("Hello, how can I help you today?")
      triggerShimmer()
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      {/* Background Fluid Mesh */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-white/50 animate-pulse" />}>
          <Scene camera={{ position: [0, 0, 10] }}>
            <FluidSphere color="#0EA5E9" scale={12} distortion={0.05} speed={0.1} />
          </Scene>
        </Suspense>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex justify-between items-center glass border-b border-black/5 rounded-none">
        <div className="flex items-center gap-4">
          <Logo className="w-8 h-8 text-cyan-600" />
          <h1 className="text-lg md:text-xl font-bold tracking-tighter text-gray-900 uppercase">
            SignBridge <span className="text-gray-400 font-medium ml-2 text-sm hidden md:inline tracking-normal capitalize">Live Translation</span>
          </h1>
        </div>
        <div className="flex gap-2 md:gap-4">
          <GlassButton variant="outline" className="py-2 text-xs md:text-sm px-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Transcript
          </GlassButton>
          <GlassButton variant="secondary" className="py-2 text-xs md:text-sm px-4 flex items-center gap-2 border-red-100 hover:bg-red-50 text-red-600">
            <XOctagon className="w-4 h-4" />
            End Session
          </GlassButton>
        </div>
      </header>

      <div ref={containerRef} className="relative z-10 flex-1 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-y-auto">
        <div className="flex flex-col gap-6 min-h-[500px]">
          <div className="flex-1 relative min-h-[350px]">
            <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" />}>
              <CameraPortal />
            </Suspense>
          </div>
          <GlassCard className="translation-pane flex-none h-44 flex flex-col border-black/5 hover:scale-[1.01] transition-transform">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">Detected Sign Language</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-tighter">Real-time</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed italic italic">
              "{signOutput}"
            </p>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-6 min-h-[500px]">
          <div className="flex-1 relative min-h-[350px]">
            <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" />}>
              <AvatarViewer />
            </Suspense>
          </div>
          <GlassCard className="translation-pane flex-none h-44 flex flex-col border-black/5 hover:scale-[1.01] transition-transform">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">Voice Transcription</span>
              <div className="flex gap-1 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-1 h-3 bg-cyan-600/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed italic italic">
              "{voiceInput}"
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Floating Controls Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 glass-heavy rounded-full px-8 py-5 flex gap-8 border border-black/5 scale-90 md:scale-100">
        <button className="text-gray-400 hover:text-cyan-600 transition-all hover:scale-110 flex flex-col items-center gap-1.5">
          <Mic className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase tracking-tighter">Mic</span>
        </button>
        <div className="w-px h-10 bg-black/5 self-center" />
        <button className="text-cyan-600 hover:text-cyan-700 transition-all hover:scale-110 flex flex-col items-center gap-1.5">
          <Video className="w-6 h-6 animate-pulse" />
          <span className="text-[8px] font-bold uppercase tracking-tighter">Cam</span>
        </button>
        <div className="w-px h-10 bg-black/5 self-center" />
        <button className="text-gray-400 hover:text-gray-900 transition-all hover:scale-110 flex flex-col items-center gap-1.5">
          <Settings className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase tracking-tighter">Settings</span>
        </button>
      </div>
    </main>
  )
}
