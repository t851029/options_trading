'use client'

import { useState, useEffect } from 'react'
import { useDeepgram } from '@/lib/contexts/DeepgramContext'
import { useAuth } from '@/lib/hooks/useAuth'
import { addNote, getNotes } from '@/lib/firebase/firebaseUtils'
import VoiceRecorder from '@/components/VoiceRecorder'
import NotesList from '@/components/NotesList'

export default function Home() {
  const [notes, setNotes] = useState([])
  const { user } = useAuth()
  const { deepgramClient } = useDeepgram()

  useEffect(() => {
    if (user) {
      loadNotes()
    }
  }, [user])

  const loadNotes = async () => {
    if (user) {
      const userNotes = await getNotes(user.uid)
      setNotes(userNotes)
    }
  }

  const handleNewNote = async (transcription: string) => {
    if (user) {
      const newNote = {
        text: transcription,
        createdAt: new Date().toISOString(),
        userId: user.uid,
      }
      await addNote(newNote)
      await loadNotes()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Voice Notes App</h1>
      <VoiceRecorder onNewNote={handleNewNote} deepgramClient={deepgramClient} />
      <NotesList notes={notes} />
    </main>
  )
}
