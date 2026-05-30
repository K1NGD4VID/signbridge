'use client'

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const FluidSphere = dynamic(() => import('@/components/3d/FluidSphere'), { ssr: false })

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function ConversationHubPage() {
  const sessions = [
    { title: 'New Real-Time Session', desc: 'Launch a high-fidelity translation stream.', primary: true },
    { title: 'Join Active Stream', desc: 'Connect to an ongoing institutional network.', primary: false },
    { title: 'Practice Sandbox', desc: 'Review gestures in a zero-latency environment.', primary: false },
  ]

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene camera={{ position: [0, 0, 10] }}>
          <FluidSphere color="#0EA5E9" scale={12} speed={0.05} />
        </Scene>
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-12 max-w-7xl mx-auto w-full h-full">
        <header className="rounded-none">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Conversation Hub</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Operational control center for translation streams</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {sessions.map((s, i) => (
             <GlassCard 
               key={i} 
               className={`group flex flex-col justify-between min-h-[350px] transition-all cursor-pointer hover:border-cyan/50 ${s.primary ? 'bg-cyan-50 border-cyan-200' : 'bg-transparent border-black/10'}`}
             >
                <div className="mb-8 relative z-10">
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all group-hover:scale-110 ${s.primary ? 'bg-cyan/20 border-cyan/40 text-cyan-700' : 'bg-black/5 border-black/10 text-gray-400'}`}>
                      <span className="text-2xl font-bold">{i + 1}</span>
                   </div>
                   <h2 className="text-3xl font-black tracking-tighter mb-4 leading-tight text-gray-900">{s.title}</h2>
                   <p className="text-gray-600 font-medium leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto relative z-10">
                   <GlassButton variant={s.primary ? 'secondary' : 'outline'} className="w-full py-4 uppercase tracking-wide text-xs font-black">
                      Initialize Stream
                   </GlassButton>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
             </GlassCard>
           ))}
        </div>

        <section>
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Recent Transcript Snippets</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <GlassCard key={i} className="p-6 border-black/5 bg-transparent hover:bg-black/5 transition-colors cursor-pointer">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-cyan-600 uppercase">May 28 • Hospital Mode</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">4.2k characters</span>
                   </div>
                   <p className="text-sm text-gray-600 line-clamp-2 italic">"Patient reports sharp abdominal pain following recent medication adjustment. Recommendation: immediate imaging..."</p>
                </GlassCard>
              ))}
           </div>
        </section>
      </div>
    </main>
  )
}