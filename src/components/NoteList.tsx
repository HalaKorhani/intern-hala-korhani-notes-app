import { FileText } from 'lucide-react'
import type { Note } from '../types/note'
import NoteCard from './NoteCard'

interface NoteListProps {
  notes: Note[]
  hasFilters: boolean
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onCreate: () => void
}

export default function NoteList({
  notes,
  hasFilters,
  onEdit,
  onDelete,
  onCreate,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <FileText size={26} />
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          {hasFilters ? 'No matching notes' : 'No notes yet'}
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {hasFilters
            ? 'Try another search term or category.'
            : 'Create your first note and it will appear here.'}
        </p>

        {!hasFilters && (
          <button
            type="button"
            onClick={onCreate}
            className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Create first note
          </button>
        )}
      </div>
    )
  }

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
