import { useState, useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import { getNotes } from '../lib/firebase/firebaseUtils';

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet. Start recording to create your first note!</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-white shadow rounded-lg p-4">
              <p className="text-gray-800">{note.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}