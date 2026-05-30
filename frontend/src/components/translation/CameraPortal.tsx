'use client'

import { useState, useEffect, useRef } from 'react'

export default function CameraPortal() {
  const [mounted, setMounted] = useState(false)
  const [trackingActive, setTrackingActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    let holistic: any = null
    let camera: any = null

    async function initMediaPipe() {
      const HolisticLib = await import('@mediapipe/holistic')
      const Holistic = HolisticLib.Holistic
      const CameraUtils = await import('@mediapipe/camera_utils')
      const DrawingUtils = await import('@mediapipe/drawing_utils')

      if (!videoRef.current || !canvasRef.current) return

      holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      })

      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      holistic.onResults((results: any) => {
        if (!trackingActive) setTrackingActive(true)
        const canvasCtx = canvasRef.current?.getContext('2d')
        if (!canvasCtx || !canvasRef.current) return

        canvasCtx.save()
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        
        canvasCtx.translate(canvasRef.current.width, 0)
        canvasCtx.scale(-1, 1)

        // Use pre-loaded connections
        DrawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, HolisticLib.POSE_CONNECTIONS, {
          color: '#22D3EE',
          lineWidth: 2,
        })
        
        DrawingUtils.drawConnectors(canvasCtx, results.leftHandLandmarks, HolisticLib.HAND_CONNECTIONS, {
          color: '#CCFBF1',
          lineWidth: 1.5,
        })
        DrawingUtils.drawConnectors(canvasCtx, results.rightHandLandmarks, HolisticLib.HAND_CONNECTIONS, {
          color: '#CCFBF1',
          lineWidth: 1.5,
        })

        DrawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, HolisticLib.FACEMESH_TESSELATION, {
          color: '#C0C0C070',
          lineWidth: 0.5,
        })

        canvasCtx.restore()
      })

      camera = new CameraUtils.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await holistic.send({ image: videoRef.current })
          }
        },
        width: 1280,
        height: 720,
      })
      camera.start()
    }

    if (mounted) {
      initMediaPipe().catch(err => console.error("MediaPipe initialization error:", err))
    }

    return () => {
      if (camera) camera.stop()
      if (holistic) holistic.close()
    }
  }, [mounted])

  if (!mounted) return <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-2xl" />

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 glass">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        width={1280}
        height={720}
      />

      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${trackingActive ? 'bg-cyan animate-pulse' : 'bg-gray-300'}`} />
        <span className="text-xs font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] uppercase">
          {trackingActive ? 'Real-Time Tracking Active' : 'Initializing Vision...'}
        </span>
      </div>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan/5 to-transparent h-20 w-full animate-scanline z-30" />
    </div>
  )
}
