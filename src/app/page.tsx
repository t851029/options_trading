import VoiceRecorder from '../components/VoiceRecorder';
import NotesList from '../components/NotesList';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Voice Notes App</h1>
      <VoiceRecorder />
      <NotesList />
    </main>
  );
}
