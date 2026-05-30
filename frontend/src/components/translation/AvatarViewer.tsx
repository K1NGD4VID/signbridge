'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, PresentationControls, Float, useGLTF } from '@react-three/drei'
import { useTranslation } from '@/app/translation/TranslationContext'
import * as THREE from 'three'

function OriginalModel() {
  const { scene } = useGLTF('/models/character.glb')
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    // Simple breathing for the original model
    group.current.rotation.y = Math.sin(t * 0.5) * 0.05
  })

  return <primitive ref={group} object={scene} scale={1.2} position={[0, -1, 0]} />
}

function GlassModel() {
  const { avatarPose } = useTranslation()
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (avatarPose === 'idle') {
      if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(t) * 0.05 + 0.1
      if (rightArmRef.current) rightArmRef.current.rotation.z = -Math.sin(t) * 0.05 - 0.1
      if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.5) * 0.1
    } else if (avatarPose === 'hello') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -1.5
        rightArmRef.current.rotation.y = Math.sin(t * 10) * 0.5
      }
    } else if (avatarPose === 'pain') {
      if (rightArmRef.current) rightArmRef.current.rotation.set(-1, -0.5, -0.5)
      if (leftArmRef.current) leftArmRef.current.rotation.set(-1, 0.5, 0.5)
      if (headRef.current) headRef.current.rotation.x = 0.3
    } else if (avatarPose === 'help') {
      if (rightArmRef.current) rightArmRef.current.rotation.set(-1.2, 0, -0.2)
      if (leftArmRef.current) leftArmRef.current.rotation.set(-1.2, 0, 0.2)
    }
  })

  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
        <meshPhysicalMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.2} roughness={0.05} transmission={0.9} thickness={1} />
      </mesh>
      <mesh ref={headRef} position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshPhysicalMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.3} roughness={0.05} transmission={0.9} thickness={1} />
      </mesh>
      <group ref={leftArmRef} position={[-0.35, 0.2, 0]}>
        <mesh position={[-0.2, -0.25, 0]}>
          <capsuleGeometry args={[0.08, 0.5, 4, 12]} />
          <meshPhysicalMaterial color="#22D3EE" transmission={0.9} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.35, 0.2, 0]}>
        <mesh position={[0.2, -0.25, 0]}>
          <capsuleGeometry args={[0.08, 0.5, 4, 12]} />
          <meshPhysicalMaterial color="#22D3EE" transmission={0.9} />
        </mesh>
      </group>
      <pointLight position={[2, 2, -2]} intensity={5} color="#22D3EE" />
      <pointLight position={[-2, 1, -1]} intensity={3} color="#E9D5FF" />
    </group>
  )
}

export default function AvatarViewer() {
  const { avatarType } = useTranslation()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-2xl" />

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden glass relative">
      <Canvas camera={{ position: [0, 0.2, 2.5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI / 6, Math.PI / 6]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <Suspense fallback={null}>
              {avatarType === 'glass' ? <GlassModel /> : <OriginalModel />}
            </Suspense>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1, 0]} opacity={0.2} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full border border-black/5">
        <span className="text-[10px] font-bold tracking-tighter text-cyan-600 uppercase">
          {avatarType === 'glass' ? 'Water Glass Avatar' : 'Original Engine Avatar'}
        </span>
      </div>
    </div>
  )
}
