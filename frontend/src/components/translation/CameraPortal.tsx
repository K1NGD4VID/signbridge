'use client'

import { useState, useEffect, useRef } from 'react'

export default function CameraPortal() {
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }
    setupCamera()
  }, [])

  if (!mounted) return <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-2xl" />

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 glass">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover scale-x-[-1]"
      />
      
      {/* Simulated Landmark Grid (Screen 11) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <path d="M 100 100 L 150 150 M 150 150 L 200 120" stroke="#22D3EE" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="4" fill="#22D3EE" />
        <circle cx="150" cy="150" r="4" fill="#22D3EE" />
        <circle cx="200" cy="120" r="4" fill="#22D3EE" />
        {/* Add more simulated trackers */}
        <rect x="50" y="50" width="10" height="10" stroke="#22D3EE" fill="none" />
      </svg>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Live Tracking Active</span>
      </div>
    </div>
  )
}
