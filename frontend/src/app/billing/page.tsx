'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import { useEffect } from 'react'
import gsap from 'gsap'

export default function BillingPage() {
  useEffect(() => {
    gsap.from('.pricing-card', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'expo.out'
    })
    
    // Floating motion for the premium card
    gsap.to('.premium-card', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  const tiers = [
    {
      name: 'Freemium',
      price: '$0',
      desc: 'Essential translation for personal exploration.',
      features: ['100 translation mins/mo', 'Basic 3D Avatar', 'Web & Mobile App', 'Community Support'],
      variant: 'outline'
    },
    {
      name: 'Pro',
      price: '$49',
      desc: 'Advanced features for professional individuals.',
      features: ['Unlimited translation', 'High-Fidelity 3D Avatar', 'Custom Vocabulary Hub', 'Priority Support'],
      variant: 'secondary',
      premium: true
    },
    {
      name: 'Institutional',
      price: 'Custom',
      desc: 'Enterprise-grade orchestration for organizations.',
      features: ['SSO & User Provisioning', 'Dedicated Node Deployment', 'On-premise Options', '24/7 Enterprise Support'],
      variant: 'outline'
    }
  ]

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-20">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={8} speed={0.1} />
        </Scene>
      </div>

      <header className="relative z-10 text-center mb-16 max-w-2xl rounded-none">
         <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900">Scale your communication</h1>
         <p className="text-gray-500 font-medium">Choose the perfect SignBridge licensing category for your needs.</p>
      </header>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
         {tiers.map((tier, i) => (
           <GlassCard 
             key={i} 
             className={`pricing-card flex flex-col p-10 h-full border-black/5 bg-transparent hover:border-black/20 transition-all ${tier.premium ? 'premium-card ring-2 ring-cyan/20 border-cyan-200 bg-cyan-50/50' : ''}`}
           >
              {tier.premium && (
                <div className="mb-6">
                   <span className="px-3 py-1 rounded-full bg-cyan text-gray-900 text-[10px] font-black uppercase tracking-wide">Recommended</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-wide mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                 <span className="text-5xl font-black text-gray-900">{tier.price}</span>
                 {tier.price !== 'Custom' && <span className="text-gray-400 font-bold uppercase text-xs">/ month</span>}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{tier.desc}</p>
              
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                 {tier.features.map((f, j) => (
                   <li key={j} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan/60" />
                      {f}
                   </li>
                 ))}
              </ul>

              <GlassButton variant={tier.variant as any} className="w-full py-4 uppercase tracking-wide text-xs font-black">
                 {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </GlassButton>
           </GlassCard>
         ))}
      </div>

      <footer className="relative z-10 mt-16 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Secure Enterprise Billing Orchestrated by SignBridge Global</p>
      </footer>
    </main>
  )
}