"use client";

/**
 * Notes Page — Full CRUD interface for managing notes
 *
 * Features:
 * - Create new note (modal form)
 * - View all notes (searchable, filterable grid)
 * - Edit existing notes
 * - Delete notes with confirmation
 *
 * TODO: All CRUD operations currently work on local state.
 * When the FastAPI backend is ready, the NotesContext will be updated
 * to dispatch API calls instead of local state mutations.
 */

import { useState } from "react";
import { useNotes } from "@/context/NotesContext";
import NoteList from "@/components/notes/NoteList";
import NoteForm from "@/components/notes/NoteForm";
import Button from "@/components/ui/Button";

export default function NotesPage() {
  const { removeNote } = useNotes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Notes</h1>
          <p className="text-sm text-text-light mt-0.5">
            Create, manage, and organize your Class 8 Social Studies notes
          </p>
        </div>

        <Button
          onClick={handleCreateNote}
          size="md"
          id="create-note-btn"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Note
        </Button>
      </div>

      {/* Notes List with Search & Filter */}
      <NoteList onEditNote={handleEditNote} />

      {/* Create/Edit Form Modal */}
      <NoteForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        editNote={editingNote}
      />
    </div>
  );
}
