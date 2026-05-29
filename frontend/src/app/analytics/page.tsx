'use client'
import Scene from '@/components/3d/Scene'

import { useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'

import FluidSphere from '@/components/3d/FluidSphere'
import gsap from 'gsap'

export default function AnalyticsPage() {
  const chartRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Animate SVG path (Screen 23)
    if (chartRef.current) {
      const path = chartRef.current.querySelector('.chart-line') as SVGPathElement
      const length = path.getTotalLength()
      
      gsap.fromTo(path, 
        { strokeDasharray: length, strokeDashoffset: length }, 
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut', delay: 0.5 }
      )
    }

    gsap.from('.analytic-card', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    })
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={12} speed={0.05} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-12 max-w-7xl mx-auto w-full h-full">
        <header className="rounded-none">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">High-fidelity visualization of translation performance</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Daily Accuracy', value: '99.2%', trend: '+0.4%' },
             { label: 'System Latency', value: '12ms', trend: '-2ms' },
             { label: 'Total Tokens', value: '1.4M', trend: '+18%' },
             { label: 'Live Nodes', value: '142', trend: 'Stable' },
           ].map((stat, i) => (
             <GlassCard key={i} className="analytic-card p-6 flex flex-col gap-2 border-black/5 bg-transparent">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-baseline gap-3">
                   <span className="text-3xl font-black text-gray-900">{stat.value}</span>
                   <span className="text-[10px] font-bold text-mint">{stat.trend}</span>
                </div>
             </GlassCard>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <GlassCard className="col-span-8 h-[400px] flex flex-col border-black/5 bg-transparent">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-8">Performance Volume (24h)</h2>
              <div className="flex-1 relative">
                 <svg ref={chartRef} className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                    <path 
                      className="chart-line" 
                      d="M0,250 Q100,220 200,240 T400,100 T600,150 T800,50" 
                      fill="none" 
                      stroke="#22D3EE" 
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M0,250 Q100,220 200,240 T400,100 T600,150 T800,50 V300 H0 Z" 
                      fill="url(#gradient)" 
                      className="opacity-10"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                 </svg>
              </div>
           </GlassCard>

           <GlassCard className="col-span-4 flex flex-col border-black/5 bg-transparent">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-8">Metric Distribution</h2>
              <div className="flex-1 flex flex-col gap-6 justify-center">
                 {[
                   { label: 'Clinical Accuracy', value: 95 },
                   { label: 'Educational Sync', value: 88 },
                   { label: 'Voice Stability', value: 92 },
                 ].map((m, i) => (
                   <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                         <span className="text-gray-500">{m.label}</span>
                         <span className="text-gray-900">{m.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                         <div className="h-full bg-cyan transition-all duration-1000" style={{ width: `${m.value}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </main>
  )
}
