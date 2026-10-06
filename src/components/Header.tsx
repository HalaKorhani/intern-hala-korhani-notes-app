import { Plus } from 'lucide-react'

interface HeaderProps {
  noteCount: number
  onCreate: () => void
}

export default function Header({ noteCount, onCreate }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          NoteSpace
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          My Notes
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {noteCount} {noteCount === 1 ? 'note' : 'notes'} saved
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
      >
        <Plus size={18} />
        New note
      </button>
    </header>
  )
}
