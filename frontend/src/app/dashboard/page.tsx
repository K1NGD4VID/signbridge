'use client'
import Scene from '@/components/3d/Scene'

import { useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import { LayoutDashboard, History, MessageSquare, Settings, Activity, Book, Database, Shield, User } from 'lucide-react'

import FluidSphere from '@/components/3d/FluidSphere'
import { fadeUpStagger } from '@/utils/animations'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      fadeUpStagger('.dashboard-module', 0.2, 0.1)
    }
  }, [])

  const modules = [
    { title: 'Active Conversation Hub', desc: 'Manage real-time translation sessions.', link: '/hub', color: 'cyan', icon: Activity },
    { title: 'Vocabulary Library', desc: 'Personalized sign language dictionary.', link: '/vocabulary/medical', color: 'brand-lavender', icon: Book },
    { title: 'Analytics Feed', desc: 'Usage stats and performance metrics.', link: '/analytics', color: 'medical-blue', icon: Database },
    { title: 'Security System', desc: 'Manage access keys and audit logs.', link: '/admin', color: 'crimson', icon: Shield },
  ]

  const sidebarItems = [
    { name: 'Overview', link: '/dashboard', icon: LayoutDashboard },
    { name: 'History', link: '/history', icon: History },
    { name: 'Saved Phrases', link: '/phrases', icon: MessageSquare },
    { name: 'Settings', link: '/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 15] }}>
          <FluidSphere color="#CCFBF1" scale={10} speed={0.05} />
        </Scene>
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-64 glass rounded-none border-r border-black/5 flex flex-col p-6 hidden md:flex">
        <Link href="/" className="mb-12 flex items-center gap-3 group">
          <Logo className="w-8 h-8 text-medical-blue group-hover:scale-105 transition-transform" />
          <span className="font-bold tracking-tighter text-gray-900 uppercase">SIGNBRIDGE</span>
        </Link>
        
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.link} className="px-4 py-3 rounded-xl text-left text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-black/5 transition-all flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <GlassCard className="p-4 rounded-2xl bg-black/[0.02] border-black/5">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Account Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mint" />
              <span className="text-xs font-semibold text-gray-900">Enterprise Pro</span>
            </div>
          </GlassCard>
        </div>
      </aside>

      {/* Main Content */}
      <main ref={containerRef} className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="mb-12 rounded-none">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 text-gray-900">Good morning, Dr. Sarah</h1>
          <p className="text-gray-500">Here is what's happening with your SignBridge nodes today.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {modules.map((m, i) => (
            <Link href={m.link} key={i}>
              <GlassCard className="dashboard-module h-64 hover:border-black/20 transition-all cursor-pointer group flex flex-col opacity-0">
                <m.icon className="w-8 h-8 text-gray-900 mb-auto group-hover:text-medical-blue transition-colors" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <section className="dashboard-module opacity-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tighter text-gray-900">Recent Activity</h2>
            <button className="text-sm text-medical-blue hover:underline">View all history</button>
          </div>
          <GlassCard className="p-0 overflow-hidden border-black/5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-6 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-gray-900">Patient Consultation: Sam Johnson</p>
                    <p className="text-xs text-gray-500">24 mins ago • Cardiology Dept.</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-mint bg-mint/10 px-2 py-1 rounded">Completed</span>
                </div>
              </div>
            ))}
          </GlassCard>
        </section>
      </main>
    </div>
  )
}
