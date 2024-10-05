import { useState, useRef, useCallback } from 'react';
import { LiveTranscription } from '@deepgram/sdk';

interface VoiceRecorderProps {
  onNewNote: (transcription: string) => void
  deepgramClient: LiveTranscription | null
}

export default function VoiceRecorder({ onNewNote, deepgramClient }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsRecording(true);

      if (deepgramClient) {
        deepgramClient.addListener('transcriptReceived', (transcription) => {
          setTranscription((prev) => prev + ' ' + transcription.channel.alternatives[0].transcript);
        });

        deepgramClient.start();
      }

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [deepgramClient]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (deepgramClient) {
        deepgramClient.finish();
      }

      onNewNote(transcription.trim());
      setTranscription('');
    }
  }, [isRecording, deepgramClient, onNewNote, transcription]);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-full ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold transition-colors`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && (
        <div className="mt-4">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}
      {transcription && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-md">
          <p className="text-gray-700">{transcription}</p>
        </div>
      )}
    </div>
  );
}