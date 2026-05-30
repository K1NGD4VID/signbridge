'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, CameraOff, AlertCircle, RefreshCw } from 'lucide-react'

export default function CameraPortal() {
  const [mounted, setMounted] = useState(false)
  const [trackingActive, setTrackingActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    let holistic: any = null
    let camera: any = null
    let isMounted = true

    async function initMediaPipe() {
      try {
        setIsInitializing(true)
        setError(null)

        // 1. Proactive Hardware Check
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          throw new Error('MediaDevices API not supported in this browser.')
        }

        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasCamera = devices.some(device => device.kind === 'videoinput')
        
        if (!hasCamera) {
          if (isMounted) {
            setError("No camera detected. Please connect a camera and refresh.")
            setIsInitializing(false)
          }
          return
        }

        // 2. Dynamic Library Imports
        const HolisticLib = await import('@mediapipe/holistic')
        const Holistic = HolisticLib.Holistic
        const CameraUtils = await import('@mediapipe/camera_utils')
        const DrawingUtils = await import('@mediapipe/drawing_utils')

        if (!videoRef.current || !canvasRef.current || !isMounted) return

        // 3. Holistic Engine Setup
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
          if (!isMounted) return
          if (!trackingActive) setTrackingActive(true)
          if (isInitializing) setIsInitializing(false)
          
          const canvasCtx = canvasRef.current?.getContext('2d')
          if (!canvasCtx || !canvasRef.current) return

          canvasCtx.save()
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          
          canvasCtx.translate(canvasRef.current.width, 0)
          canvasCtx.scale(-1, 1)

          if (results.poseLandmarks) {
            DrawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, HolisticLib.POSE_CONNECTIONS, {
              color: '#22D3EE',
              lineWidth: 2,
            })
          }
          
          if (results.leftHandLandmarks) {
            DrawingUtils.drawConnectors(canvasCtx, results.leftHandLandmarks, HolisticLib.HAND_CONNECTIONS, {
              color: '#CCFBF1',
              lineWidth: 1.5,
            })
          }
          if (results.rightHandLandmarks) {
            DrawingUtils.drawConnectors(canvasCtx, results.rightHandLandmarks, HolisticLib.HAND_CONNECTIONS, {
              color: '#CCFBF1',
              lineWidth: 1.5,
            })
          }

          if (results.faceLandmarks) {
            DrawingUtils.drawConnectors(canvasCtx, results.faceLandmarks, HolisticLib.FACEMESH_TESSELATION, {
              color: '#C0C0C070',
              lineWidth: 0.5,
            })
          }

          canvasCtx.restore()
        })

        // 4. Camera Lifecycle Management
        camera = new CameraUtils.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && holistic) {
              await holistic.send({ image: videoRef.current }).catch(() => {})
            }
          },
          width: 1280,
          height: 720,
        })
        
        await camera.start().catch((err: any) => {
          if (!isMounted) return
          console.warn("Handled Camera Start Exception:", err)
          if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setError("Requested camera device not found.")
          } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setError("Camera access was denied by the user.")
          } else {
            setError("Could not access camera. It may be in use.")
          }
          setIsInitializing(false)
        })
      } catch (err: any) {
        if (!isMounted) return
        console.error("Vision Engine Initialization Error:", err)
        setError(err.message || "Failed to initialize vision engine.")
        setIsInitializing(false)
      }
    }

    if (mounted) {
      initMediaPipe()
    }

    return () => {
      isMounted = false
      if (camera) camera.stop().catch(() => {})
      if (holistic) holistic.close().catch(() => {})
    }
  }, [mounted])

  if (!mounted) return <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-2xl" />

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 glass flex items-center justify-center bg-gray-50/10">
      {error ? (
        <div className="relative z-40 flex flex-col items-center gap-5 p-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100 shadow-inner">
            <CameraOff className="w-10 h-10 text-red-500" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
              Vision Offline
            </h3>
            <p className="text-sm text-gray-500 max-w-[240px] leading-relaxed font-medium">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection
          </button>
        </div>
      ) : (
        <>
          {isInitializing && (
            <div className="absolute inset-0 z-30 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-700">Booting Vision Engine...</p>
            </div>
          )}
          
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

          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 glass px-3 py-1.5 border-black/5">
            <div className={`w-2 h-2 rounded-full ${trackingActive ? 'bg-cyan-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-bold tracking-wide text-gray-700 uppercase">
              {trackingActive ? 'Live Biometric Stream' : 'Calibrating Sensors...'}
            </span>
          </div>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-24 w-full animate-scanline z-30" />
        </>
      )}
    </div>
  )
}
