import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { NOTE_CATEGORIES } from '../constants/categories'
import type { Note, NoteFormData } from '../types/note'

interface NoteFormProps {
  note: Note | null
  onSave: (data: NoteFormData) => void
  onClose: () => void
}

const emptyForm: NoteFormData = {
  title: '',
  content: '',
  category: 'Personal',
}

export default function NoteForm({
  note,
  onSave,
  onClose,
}: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        category: note.category,
      })
    } else {
      setFormData(emptyForm)
    }

    setError('')
  }, [note])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = formData.title.trim()
    const content = formData.content.trim()

    if (!title || !content) {
      setError('Please enter both a title and note content.')
      return
    }

    onSave({
      ...formData,
      title,
      content,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              {note ? 'Update note' : 'Create note'}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {note ? 'Edit your note' : 'Add a new note'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close note form"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
              placeholder="e.g. React study plan"
              autoFocus
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  category: event.target.value as NoteFormData['category'],
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            >
              {NOTE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Note
            </label>
            <textarea
              id="content"
              rows={8}
              value={formData.content}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  content: event.target.value,
                }))
              }
              placeholder="Write your note here..."
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              {note ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
