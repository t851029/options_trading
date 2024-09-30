import { useState, useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import { getNotes } from '../lib/firebase/firebaseUtils';

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const userNotes = await getNotes(user.uid);
        setNotes(userNotes);
      };
      fetchNotes();
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Start recording to create your first note!</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
              <p>{note.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;