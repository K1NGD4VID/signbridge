'use client'
import Scene from '@/components/3d/Scene'


import { Float } from '@react-three/drei'
import FluidSphere from '@/components/3d/FluidSphere'
import { useEffect, useRef, useState } from 'react'
import { splitTextReveal } from '@/utils/animations'
import GlassButton from '@/components/ui/GlassButton'
import gsap from 'gsap'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function Home() {
  const [phase, setPhase] = useState<'splash' | 'welcome'>('splash')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (phase === 'splash') {
      if (titleRef.current) {
        const text = titleRef.current.innerText
        titleRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')
        
        splitTextReveal(titleRef.current.querySelectorAll('span'), 0.8)
      }

      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { scale: 0, opacity: 0, rotate: -45 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.7)', delay: 0.2 }
        )
      }

      // Transition to Welcome screen after 4.5 seconds
      const timeout = setTimeout(() => {
        handleTransition()
      }, 4500)

      return () => clearTimeout(timeout)
    }
  }, [phase])

  const handleTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => setPhase('welcome')
    })

    tl.to([titleRef.current, logoRef.current], {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.inOut'
    })
  }

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          
          <Float speed={phase === 'splash' ? 2 : 1} rotationIntensity={0.5} floatIntensity={0.5}>
            <FluidSphere 
              color={phase === 'splash' ? '#E9D5FF' : '#0EA5E9'} 
              scale={phase === 'splash' ? 1.5 : 2.5} 
              speed={phase === 'splash' ? 0.5 : 0.2}
              distortion={phase === 'splash' ? 0.15 : 0.1}
            />
          </Float>
          
          
        </Scene>
      </div>

      {/* Splash Phase */}
      {phase === 'splash' && (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12">
          <div ref={logoRef} className="opacity-0">
            <Logo className="w-24 h-24 text-cyan-600" />
          </div>
          <h1 
            ref={titleRef}
            className="text-5xl md:text-8xl font-black text-black tracking-normal select-none"
          >
            SIGNBRIDGE
          </h1>
        </div>
      )}

      {/* Welcome Phase Placeholder (Screen 2) */}
      {phase === 'welcome' && (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/login" className="glass-card hover:border-cyan/50 transition-colors group cursor-pointer flex flex-col">
              <h2 className="text-3xl font-bold mb-4 tracking-tighter text-gray-900">Healthcare Portal</h2>
              <p className="text-gray-600 mb-8">Specialized clinical translation for doctor-patient communication.</p>
              <div className="mt-auto">
                <GlassButton variant="secondary" className="w-full pointer-events-none">Enter Portal</GlassButton>
              </div>
            </Link>
            <Link href="/school" className="glass-card hover:border-brand-lavender/50 transition-colors group cursor-pointer flex flex-col">
              <h2 className="text-3xl font-bold mb-4 tracking-tighter text-gray-900">Educational System</h2>
              <p className="text-gray-600 mb-8">Interactive classroom tools for students and instructors.</p>
              <div className="mt-auto">
                <GlassButton variant="outline" className="w-full pointer-events-none text-black border-black/10 hover:bg-black/5">Open System</GlassButton>
              </div>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
