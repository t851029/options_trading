import { useState, useEffect, useRef } from 'react';
import { useDeepgram } from '../lib/contexts/DeepgramContext';
import { useAuth } from '../lib/hooks/useAuth';
import { addNote } from '../lib/firebase/firebaseUtils';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { deepgramClient } = useDeepgram();
  const { user } = useAuth();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!deepgramClient) return;

    const live = deepgramClient.listen.live({
      language: 'en-US',
      smart_format: true,
      model: 'nova',
    });

    live.addListener('transcriptReceived', (message) => {
      const receivedTranscript = message.channel.alternatives[0].transcript;
      setTranscript((prev) => prev + ' ' + receivedTranscript);
    });

    return () => {
      live.finish();
    };
  }, [deepgramClient]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (deepgramClient) {
          deepgramClient.send(event.data);
        }
      };

      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Save the note to Firebase
      if (user) {
        const newNote = {
          text: transcript.trim(),
          createdAt: new Date().toISOString(),
          userId: user.uid,
        };
        addNote(newNote);
      }

      // Reset transcript
      setTranscript('');
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-full ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && (
        <div className="mt-4">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-pulse"></div>
          <p className="mt-2 text-gray-600">Recording in progress...</p>
        </div>
      )}
      {transcript && (
        <div className="mt-4">
          <h3 className="font-bold">Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;