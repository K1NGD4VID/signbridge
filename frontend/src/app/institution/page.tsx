'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function InstitutionPage() {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from('.stat-card', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'expo.out'
    })
    
    gsap.from('.institution-row', {
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      delay: 0.4,
      ease: 'power2.out'
    })
  }, [])

  const stats = [
    { label: 'Active Nodes', value: '142', trend: '+12%' },
    { label: 'Licensed Users', value: '2.4k', trend: '+5%' },
    { label: 'Monthly Sessions', value: '18.9k', trend: '+24%' },
    { label: 'System Uptime', value: '99.99%', trend: 'Stable' },
  ]

  const departments = [
    { name: 'Emergency Room', nodes: 24, status: 'Online', load: 'High' },
    { name: 'Cardiology', nodes: 12, status: 'Online', load: 'Normal' },
    { name: 'Pediatrics', nodes: 18, status: 'Maintenance', load: 'Low' },
    { name: 'Neurology', nodes: 8, status: 'Online', load: 'Normal' },
    { name: 'General Triage', nodes: 42, status: 'Online', load: 'Critical' },
  ]

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      {/* Background Sphere */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#CCFBF1" scale={8} speed={0.05} />
        </Scene>
      </div>

      {/* Institution Banner (Screen 21) */}
      <div className="relative z-10 w-full h-80 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-cyan/20 to-white/80" />
         <div className="absolute inset-0 glass border-b border-black/5" />
         <div className="absolute bottom-12 left-12 flex items-center gap-8">
            <div className="w-32 h-32 rounded-3xl glass border border-black/10 p-6 flex items-center justify-center bg-black/5">
               <div className="w-16 h-16 bg-cyan rounded-2xl animate-pulse" />
            </div>
            <div>
               <h1 className="text-5xl font-black tracking-tighter mb-2 text-gray-900">Mount Sinai Hospital</h1>
               <div className="flex gap-4 items-center">
                  <span className="px-3 py-1 rounded-full glass border border-cyan/30 text-cyan-600 text-[10px] font-black uppercase tracking-wide">Enterprise Hub</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">New York, NY • Global Node: US-EAST-1</span>
               </div>
            </div>
         </div>
      </div>

      <div className="relative z-10 flex-1 p-12 flex flex-col gap-12 max-w-7xl mx-auto w-full">
         
         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <GlassCard key={i} className="stat-card p-6 flex flex-col gap-2 border-black/5 bg-transparent">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{stat.label}</span>
                 <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-gray-900">{stat.value}</span>
                    <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-mint' : 'text-gray-400'}`}>{stat.trend}</span>
                 </div>
              </GlassCard>
            ))}
         </div>

         {/* Departments Table */}
         <section className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black tracking-tighter text-gray-900">Departmental Node Status</h2>
               <GlassButton variant="outline" className="text-xs py-2">Manage All Nodes</GlassButton>
            </div>
            
            <GlassCard className="p-0 overflow-hidden border-black/5 bg-transparent">
               <div className="grid grid-cols-4 p-6 border-b border-black/10 text-[10px] font-black text-gray-400 uppercase tracking-wide">
                  <span>Department</span>
                  <span>Active Nodes</span>
                  <span>System Status</span>
                  <span className="text-right">Computational Load</span>
               </div>
               <div ref={tableRef}>
                  {departments.map((dept, i) => (
                    <div key={i} className="institution-row grid grid-cols-4 p-6 border-b border-black/5 last:border-0 items-center hover:bg-black/5 transition-colors cursor-pointer group">
                       <span className="font-bold text-gray-800 group-hover:text-cyan-600 transition-colors">{dept.name}</span>
                       <span className="font-medium text-gray-600">{dept.nodes} Nodes</span>
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${dept.status === 'Online' ? 'bg-mint' : 'bg-amber'}`} />
                          <span className="text-xs font-semibold text-gray-700">{dept.status}</span>
                       </div>
                       <div className="text-right">
                          <div className="inline-block w-24 h-1.5 bg-black/5 rounded-full overflow-hidden">
                             <div 
                               className={`h-full rounded-full ${dept.load === 'Critical' ? 'bg-red-500' : dept.load === 'High' ? 'bg-amber' : 'bg-mint'}`} 
                               style={{ width: dept.load === 'Critical' ? '90%' : dept.load === 'High' ? '70%' : '30%' }}
                             />
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </GlassCard>
         </section>
      </div>
    </main>
  )
}