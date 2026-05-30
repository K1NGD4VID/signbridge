'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import Logo from '@/components/ui/Logo'
import gsap from 'gsap'
import { Mic, Video, Settings, FileText, XOctagon, Send, User, Maximize, Move } from 'lucide-react'
import { TranslationProvider, useTranslation } from './TranslationContext'

// SSR-safe components
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })
const CameraPortal = dynamic(() => import('@/components/translation/CameraPortal'), { ssr: false })
const AvatarViewer = dynamic(() => import('@/components/translation/AvatarViewer'), { ssr: false })

function TranslationContent() {
  const { 
    signOutput, setSignOutput, 
    voiceInput, setVoiceInput, 
    triggerAvatarPose, 
    avatarType, toggleAvatarType,
    avatarScale, setAvatarScale,
    avatarPosition, setAvatarPosition
  } = useTranslation()
  
  const [localVoiceInput, setLocalVoiceInput] = useState("")
  const [showControls, setShowControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleVoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localVoiceInput) return
    
    setVoiceInput(localVoiceInput)
    
    const lowerInput = localVoiceInput.toLowerCase()
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      triggerAvatarPose('hello')
    } else if (lowerInput.includes('pain') || lowerInput.includes('hurt')) {
      triggerAvatarPose('pain')
    } else if (lowerInput.includes('help')) {
      triggerAvatarPose('help')
    }
    
    setLocalVoiceInput("")
  }

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

      {/* Header with Integrated Controls */}
      <header className="relative z-20 p-4 md:px-8 flex justify-between items-center glass rounded-none border-b border-black/5 h-20">
        <div className="flex items-center gap-6">
          <Logo className="w-8 h-8 text-cyan-600" />
          <h1 className="text-lg md:text-xl font-black tracking-tighter text-gray-900 uppercase hidden sm:block">
            SignBridge <span className="text-gray-400 font-medium ml-2 text-sm tracking-normal capitalize">Bidirectional Hub</span>
          </h1>
        </div>

        {/* Central Communication Dock (Moved to Header) */}
        <div className="flex items-center gap-2 md:gap-4 glass-heavy rounded-2xl px-4 py-2 border border-black/5 shadow-sm scale-90 md:scale-100">
          <button className="text-gray-400 hover:text-cyan-600 transition-all p-2 rounded-xl hover:bg-black/5 flex flex-col items-center gap-1">
            <Mic className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase">Mic</span>
          </button>
          <div className="w-px h-8 bg-black/5" />
          <button className="text-cyan-600 p-2 rounded-xl bg-cyan-50 border border-cyan-100 flex flex-col items-center gap-1">
            <Video className="w-5 h-5 animate-pulse" />
            <span className="text-[7px] font-black uppercase">Cam</span>
          </button>
          <div className="w-px h-8 bg-black/5" />
          <button 
            onClick={toggleAvatarType}
            className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${avatarType === 'original' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-black/5'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase">Avatar</span>
          </button>
          <div className="w-px h-8 bg-black/5" />
          <button 
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${showControls ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900 hover:bg-black/5'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase">Adjust</span>
          </button>
        </div>

        <div className="flex gap-2">
          <GlassButton variant="secondary" className="py-2 text-[10px] px-4 font-black uppercase tracking-wider text-red-600 border-red-100 bg-red-50 hover:bg-red-100">
            End
          </GlassButton>
        </div>
      </header>

      <div ref={containerRef} className="relative z-10 flex-1 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-y-auto pt-8">
        
        {/* Left Pane: Sign Capture */}
        <div className="flex flex-col gap-6 min-h-[500px]">
          <div className="flex-1 relative min-h-[350px]">
            <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" />}>
              <CameraPortal />
            </Suspense>
          </div>
          <GlassCard className="flex-none h-44 flex flex-col border-black/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">Detected Sign Language</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-bold text-cyan-600 uppercase">Real-time</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed italic">
              "{signOutput}"
            </p>
          </GlassCard>
        </div>

        {/* Right Pane: Avatar Output */}
        <div className="flex flex-col gap-6 min-h-[500px] relative">
          <div className="flex-1 relative min-h-[350px]">
            <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" />}>
              <AvatarViewer />
            </Suspense>

            {/* Float-over Transform Controls */}
            {showControls && (
              <div className="absolute top-6 left-6 z-30 w-64 glass-heavy p-6 border-black/5 animate-fade-in flex flex-col gap-6">
                <div className="flex items-center gap-2 text-cyan-600 mb-2">
                  <Maximize className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">Avatar Transform</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                      <span>Scale</span>
                      <span>{avatarScale.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="3" step="0.05"
                      value={avatarScale}
                      onChange={(e) => setAvatarScale(parseFloat(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                      <span>Vertical Pos</span>
                      <span>{avatarPosition[1].toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" min="-3" max="2" step="0.1"
                      value={avatarPosition[1]}
                      onChange={(e) => setAvatarPosition([avatarPosition[0], parseFloat(e.target.value), avatarPosition[2]])}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                      <span>Horizontal Pos</span>
                      <span>{avatarPosition[0].toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" min="-2" max="2" step="0.1"
                      value={avatarPosition[0]}
                      onChange={(e) => setAvatarPosition([parseFloat(e.target.value), avatarPosition[1], avatarPosition[2]])}
                      className="w-full accent-cyan-600"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => { setAvatarScale(1.0); setAvatarPosition([0, -1, 0]); }}
                  className="mt-2 py-2 border border-black/5 rounded-xl text-[8px] font-black uppercase hover:bg-black/5 transition-all"
                >
                  Reset Transforms
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <GlassCard className="flex-none h-32 flex flex-col border-black/5">
              <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase mb-4">Voice Input / Transcription</span>
              <p className="text-xl font-bold text-gray-800 leading-relaxed italic">
                {voiceInput ? `"${voiceInput}"` : "Waiting for spoken input..."}
              </p>
            </GlassCard>
            
            <form onSubmit={handleVoiceSubmit} className="relative">
              <input 
                value={localVoiceInput}
                onChange={(e) => setLocalVoiceInput(e.target.value)}
                placeholder="Type here to sign back (e.g., 'Hello')..."
                className="w-full glass-heavy bg-white/20 border-black/5 rounded-2xl py-4 px-6 pr-14 text-gray-900 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition-colors shadow-lg active:scale-95">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function LiveTranslationPage() {
  return (
    <TranslationProvider>
      <TranslationContent />
    </TranslationProvider>
  )
}
