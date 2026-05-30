'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function AdminPage() {
  const [metrics] = useState([
    { label: 'Total Throughput', value: '42.8 GB', color: 'cyan' },
    { label: 'Live Sessions', value: '1,204', color: 'mint' },
    { label: 'System Errors', value: '0.02%', color: 'crimson' },
    { label: 'API Latency', value: '14ms', color: 'cyan' },
  ])

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 5] }}>
          <FluidSphere color="#0EA5E9" scale={3} speed={0.1} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-12 max-w-7xl mx-auto w-full h-full">
        <header className="flex justify-between items-end rounded-none">
           <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Admin Control Center</h1>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Enterprise Management & System Orchestration</p>
           </div>
           <div className="flex gap-4">
              <GlassButton variant="outline" className="text-xs">Audit Logs</GlassButton>
              <GlassButton variant="secondary" className="text-xs">System Reboot</GlassButton>
           </div>
        </header>

        {/* Structural Summary Cards (Screen 22) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {metrics.map((m, i) => (
             <GlassCard key={i} className="flex flex-col gap-4 border-black/5 bg-transparent">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{m.label}</span>
                   <div className={`w-2 h-2 rounded-full bg-${m.color}`} />
                </div>
                <span className="text-3xl font-black text-gray-900">{m.value}</span>
                <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                   <div className={`h-full bg-${m.color}`} style={{ width: '60%' }} />
                </div>
             </GlassCard>
           ))}
        </div>

        {/* Interactive User Management Matrix */}
        <section className="flex-1 flex flex-col gap-6">
           <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">User Management Matrix</h2>
              <div className="flex gap-2">
                 <input className="glass bg-black/5 border-black/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-cyan/50 text-gray-900 placeholder:text-gray-400" placeholder="Search users..." />
                 <GlassButton variant="primary" className="text-xs py-2 px-4">+ Provision User</GlassButton>
              </div>
           </div>

           <GlassCard className="flex-1 p-0 overflow-hidden border-black/5 bg-transparent">
              <div className="grid grid-cols-5 p-6 border-b border-black/10 text-[10px] font-black text-gray-400 uppercase tracking-wide">
                 <span>User Identity</span>
                 <span>Role</span>
                 <span>Access Level</span>
                 <span>Last Active</span>
                 <span className="text-right">Actions</span>
              </div>
              <div className="overflow-y-auto">
                 {[
                   { name: 'Alex Rivera', email: 'a.rivera@hospital.org', role: 'Clinical Staff', access: 'Tier 2', last: '2m ago' },
                   { name: 'Sarah Johnson', email: 's.johnson@hospital.org', role: 'Department Head', access: 'Tier 3', last: 'Now' },
                   { name: 'Marcus Chen', email: 'm.chen@hospital.org', role: 'Support Tech', access: 'Tier 1', last: '14h ago' },
                 ].map((user, i) => (
                   <div key={i} className="grid grid-cols-5 p-6 border-b border-black/5 last:border-0 items-center hover:bg-black/[0.02] transition-colors">
                      <div className="flex flex-col">
                         <span className="font-bold text-gray-800">{user.name}</span>
                         <span className="text-[10px] text-gray-500">{user.email}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{user.role}</span>
                      <span className="text-xs font-bold text-cyan-600">{user.access}</span>
                      <span className="text-xs text-gray-400 italic">{user.last}</span>
                      <div className="text-right flex justify-end gap-2">
                         <button className="p-2 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-900 transition-all text-xs">Edit</button>
                         <button className="p-2 rounded-lg hover:bg-black/5 text-red-500/40 hover:text-red-600 transition-all text-xs">Revoke</button>
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