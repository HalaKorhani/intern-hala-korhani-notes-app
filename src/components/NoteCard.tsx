import { Pencil, Trash2 } from 'lucide-react'
import { formatNoteDate } from '../utils/date'
import type { Note, NoteCategory } from '../types/note'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

const categoryStyles: Record<NoteCategory, string> = {
  Personal: 'bg-rose-50 text-rose-700 ring-rose-100',
  Study: 'bg-blue-50 text-blue-700 ring-blue-100',
  Work: 'bg-amber-50 text-amber-700 ring-amber-100',
  Ideas: 'bg-violet-50 text-violet-700 ring-violet-100',
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <article className="group flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${categoryStyles[note.category]}`}
        >
          {note.category}
        </span>

        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(note)}
            aria-label={`Edit ${note.title}`}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            aria-label={`Delete ${note.title}`}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900">
        {note.title}
      </h2>

      <p className="line-clamp-5 flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {note.content}
      </p>

      <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-400">
        {note.updatedAt !== note.createdAt ? 'Updated ' : 'Created '}
        {formatNoteDate(note.updatedAt)}
      </div>
    </article>
  )
}
