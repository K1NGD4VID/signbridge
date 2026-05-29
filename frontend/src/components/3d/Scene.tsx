'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function Scene({ children, camera = { position: [0, 0, 5], fov: 45 } }: { children: ReactNode, camera?: any }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 bg-white/50 animate-pulse" />
  }

  return (
    <Canvas camera={camera}>
      {children}
      <Environment preset="city" />
    </Canvas>
  )
}
