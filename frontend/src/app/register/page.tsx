'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })
const CameraPortal = dynamic(() => import('@/components/translation/CameraPortal'), { ssr: false })

import { useState } from 'react'

import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'
import GlassButton from '@/components/ui/GlassButton'

import gsap from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleRegister = () => {
    gsap.to('.register-step', {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'expo.in',
      onComplete: () => router.push('/login')
    })
  }

  const nextStep = () => {
    gsap.to('.register-step', {
      x: -100,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setStep(step + 1)
        gsap.fromTo('.register-step', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
      }
    })
  }

  return (
    <main className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0 opacity-20">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#CCFBF1" scale={2.5} distortion={0.1} speed={0.3} />
        </Scene>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Video Profile Capture (Screen 4) */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex-1 aspect-video relative rounded-3xl overflow-hidden glass border border-black/10 p-2 bg-black/5">
             <CameraPortal />
             <div className="absolute inset-0 border-[12px] border-medical-blue/10 pointer-events-none" />
          </div>
          <div className="text-center">
             <h3 className="text-xl font-bold mb-2 text-gray-900">Sign Profile Capture</h3>
             <p className="text-gray-500 text-sm">Optional: Capture your profile data via sign gestures for a more personalized experience.</p>
          </div>
        </div>

        {/* Right: Registration Form */}
        <GlassCard className="register-step flex flex-col gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter mb-2 text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm">Join the SignBridge network today.</p>
          </div>

          {step === 1 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <GlassInput label="First Name" placeholder="Sarah" />
                <GlassInput label="Last Name" placeholder="Johnson" />
              </div>
              <GlassInput label="Email Address" type="email" placeholder="sarah@hospital.org" />
              <GlassInput label="Institution Code" placeholder="SB-XXXX-XXXX" />
              <GlassButton variant="secondary" className="w-full py-4" onClick={nextStep}>
                Continue
              </GlassButton>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <GlassInput label="Password" type="password" placeholder="••••••••" />
              <GlassInput label="Confirm Password" type="password" placeholder="••••••••" />
              <div className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed">
                <input type="checkbox" className="mt-1" />
                <p>I agree to the Terms of Service and Privacy Policy, including the collection of biometric gesture data for translation improvement.</p>
              </div>
              <GlassButton variant="secondary" className="w-full py-4" onClick={handleRegister}>
                Complete Registration
              </GlassButton>
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Go Back</button>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-900 hover:text-medical-blue transition-colors font-semibold">
              Sign In
            </Link>
          </div>
        </GlassCard>

      </div>
    </main>
  )
}