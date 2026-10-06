import { useMemo, useState } from 'react'
import CategoryFilter, {
  type CategoryFilterValue,
} from './components/CategoryFilter'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import SearchBar from './components/SearchBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Note, NoteFormData } from './types/note'

const STORAGE_KEY = 'notes-app-notes'

export default function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEY, [])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilterValue>('All')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const visibleNotes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return notes
      .filter((note) => {
        const matchesCategory =
          category === 'All' || note.category === category

        const matchesSearch =
          normalizedSearch === '' ||
          note.title.toLowerCase().includes(normalizedSearch) ||
          note.content.toLowerCase().includes(normalizedSearch)

        return matchesCategory && matchesSearch
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
  }, [notes, search, category])

  const openCreateForm = () => {
    setEditingNote(null)
    setIsFormOpen(true)
  }

  const openEditForm = (note: Note) => {
    setEditingNote(note)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingNote(null)
    setIsFormOpen(false)
  }

  const createNote = (data: NoteFormData) => {
    const now = new Date().toISOString()

    const newNote: Note = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }

    setNotes((prev) => [newNote, ...prev])
  }

  const updateNote = (id: string, data: NoteFormData) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const saveNote = (data: NoteFormData) => {
    if (editingNote) {
      updateNote(editingNote.id, data)
    } else {
      createNote(data)
    }

    closeForm()
  }

  const deleteNote = (id: string) => {
    const note = notes.find((item) => item.id === id)

    if (!note) return

    const confirmed = window.confirm(
      `Delete "${note.title}"? This action cannot be undone.`,
    )

    if (!confirmed) return

    setNotes((prev) => prev.filter((item) => item.id !== id))
  }

  const hasFilters = search.trim() !== '' || category !== 'All'

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Header noteCount={notes.length} onCreate={openCreateForm} />

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            Showing {visibleNotes.length} of {notes.length}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Clear filters
            </button>
          )}
        </div>

        <NoteList
          notes={visibleNotes}
          hasFilters={hasFilters}
          onEdit={openEditForm}
          onDelete={deleteNote}
          onCreate={openCreateForm}
        />
      </div>

      {isFormOpen && (
        <NoteForm
          note={editingNote}
          onSave={saveNote}
          onClose={closeForm}
        />
      )}
    </main>
  )
}
