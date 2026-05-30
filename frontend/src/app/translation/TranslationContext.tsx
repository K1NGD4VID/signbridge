'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface TranslationContextType {
  signOutput: string
  voiceInput: string
  avatarPose: string
  setSignOutput: (text: string) => void
  setVoiceInput: (text: string) => void
  triggerAvatarPose: (pose: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [signOutput, setSignOutput] = useState("Awaiting sign input...")
  const [voiceInput, setVoiceInput] = useState("")
  const [avatarPose, setAvatarPose] = useState("idle")

  const triggerAvatarPose = useCallback((pose: string) => {
    setAvatarPose(pose)
    // Automatically reset to idle after animation duration
    setTimeout(() => setAvatarPose("idle"), 3000)
  }, [])

  return (
    <TranslationContext.Provider value={{ 
      signOutput, 
      voiceInput, 
      avatarPose, 
      setSignOutput, 
      setVoiceInput, 
      triggerAvatarPose 
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
