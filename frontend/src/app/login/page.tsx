'use client'
import Scene from '@/components/3d/Scene'

import { useState, useRef } from 'react'

import { Float } from '@react-three/drei'
import FluidSphere from '@/components/3d/FluidSphere'
import GlassCard from '@/components/ui/GlassCard'
import GlassInput from '@/components/ui/GlassInput'
import GlassButton from '@/components/ui/GlassButton'
import gsap from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')
  const cardRef = useRef<HTMLDivElement>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate error for demonstration
    const isTestAccount = email === 'test@signbridge.com' && password === 'SignBridge2026'

    if (!isTestAccount && password !== 'password' && password !== '') {
      setStatus('error')
      triggerErrorAnimation()
    } else {
      setStatus('success')
      gsap.to(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'expo.in',
        onComplete: () => router.push('/dashboard')
      })
    }
  }

  const triggerErrorAnimation = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: [-20, 20, -10, 10, 0] as any,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => setStatus('idle'), 2000)
        }
      })
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center p-6">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Float speed={status === 'error' ? 5 : 1} rotationIntensity={0.5} floatIntensity={0.5}>
            <FluidSphere 
              color={status === 'error' ? '#EF4444' : '#0EA5E9'} 
              scale={2} 
              speed={status === 'error' ? 2 : 0.5}
              distortion={status === 'error' ? 0.4 : 0.15}
            />
          </Float>
          
          
        </Scene>
      </div>

      {/* Login Card */}
      <div ref={cardRef} className="relative z-10 w-full max-w-md">
        <GlassCard className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter mb-2 text-gray-900">Welcome Back</h1>
            <p className="text-gray-900 font-semibold text-sm">Sign in to your SignBridge account</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <GlassInput 
              label="Email Address" 
              type="email" 
              placeholder="name@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <GlassInput 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 bg-gray-50" />
                Remember me
              </label>
              <a href="#" className="text-medical-blue hover:underline">Forgot password?</a>
            </div>

            <GlassButton type="submit" variant="secondary" className="w-full py-4">
              Sign In
            </GlassButton>
          </form>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-gray-900 hover:text-medical-blue transition-colors font-semibold">
              Create an account
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}
