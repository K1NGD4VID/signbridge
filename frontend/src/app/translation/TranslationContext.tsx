'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface TranslationContextType {
  signOutput: string
  voiceInput: string
  avatarPose: string
  avatarType: 'glass' | 'original' | 'realistic'
  avatarScale: number
  avatarPosition: [number, number, number]
  setSignOutput: (text: string) => void
  setVoiceInput: (text: string) => void
  triggerAvatarPose: (pose: string) => void
  toggleAvatarType: () => void
  setAvatarScale: (scale: number) => void
  setAvatarPosition: (pos: [number, number, number]) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [signOutput, setSignOutput] = useState("Awaiting sign input...")
  const [voiceInput, setVoiceInput] = useState("")
  const [avatarPose, setAvatarPose] = useState("idle")
  const [avatarType, setAvatarType] = useState<'glass' | 'original' | 'realistic'>('glass')
  const [avatarScale, setAvatarScale] = useState(1.0)
  const [avatarPosition, setAvatarPosition] = useState<[number, number, number]>([0, -1, 0])

  const triggerAvatarPose = useCallback((pose: string) => {
    setAvatarPose(pose)
    // Automatically reset to idle after animation duration
    setTimeout(() => setAvatarPose("idle"), 3000)
  }, [])

  const toggleAvatarType = useCallback(() => {
    setAvatarType(prev => {
      if (prev === 'glass') return 'original'
      if (prev === 'original') return 'realistic'
      return 'glass'
    })
  }, [])

  return (
    <TranslationContext.Provider value={{ 
      signOutput, 
      voiceInput, 
      avatarPose, 
      avatarType,
      avatarScale,
      avatarPosition,
      setSignOutput, 
      setVoiceInput, 
      triggerAvatarPose,
      toggleAvatarType,
      setAvatarScale,
      setAvatarPosition
    }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
