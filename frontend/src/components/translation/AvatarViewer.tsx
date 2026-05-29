'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, PresentationControls, Float } from '@react-three/drei'

function AvatarModel() {
  return (
    <group>
      {/* Body Silhouette Placeholder */}
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
        <meshPhysicalMaterial 
          color="#22D3EE" 
          emissive="#22D3EE" 
          emissiveIntensity={0.5}
          roughness={0.1} 
          transmission={0.8} 
          thickness={1}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial 
          color="#22D3EE" 
          emissive="#22D3EE" 
          emissiveIntensity={0.5}
          roughness={0.1} 
          transmission={0.8} 
          thickness={1}
        />
      </mesh>
      {/* Rim Lighting Separator */}
      <pointLight position={[2, 2, -2]} intensity={10} color="#22D3EE" />
      <pointLight position={[-2, 1, -1]} intensity={5} color="#E9D5FF" />
    </group>
  )
}

export default function AvatarViewer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-2xl" />

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass relative">
      <Canvas camera={{ position: [0, 0.2, 2.5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
            <AvatarModel />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full border border-black/5">
        <span className="text-[10px] font-bold tracking-tighter text-cyan-600 uppercase">Sign Avatar Active</span>
      </div>
    </div>
  )
}
