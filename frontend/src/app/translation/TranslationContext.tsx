'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface TranslationContextType {
  signOutput: string
  voiceInput: string
  avatarPose: string
  avatarType: 'glass' | 'original'
  setSignOutput: (text: string) => void
  setVoiceInput: (text: string) => void
  triggerAvatarPose: (pose: string) => void
  toggleAvatarType: () => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [signOutput, setSignOutput] = useState("Awaiting sign input...")
  const [voiceInput, setVoiceInput] = useState("")
  const [avatarPose, setAvatarPose] = useState("idle")
  const [avatarType, setAvatarType] = useState<'glass' | 'original'>('glass')

  const triggerAvatarPose = useCallback((pose: string) => {
    setAvatarPose(pose)
    // Automatically reset to idle after animation duration
    setTimeout(() => setAvatarPose("idle"), 3000)
  }, [])

  const toggleAvatarType = useCallback(() => {
    setAvatarType(prev => prev === 'glass' ? 'original' : 'glass')
  }, [])

  return (
    <TranslationContext.Provider value={{ 
      signOutput, 
      voiceInput, 
      avatarPose, 
      avatarType,
      setSignOutput, 
      setVoiceInput, 
      triggerAvatarPose,
      toggleAvatarType
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
