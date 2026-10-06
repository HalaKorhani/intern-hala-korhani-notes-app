import { NOTE_CATEGORIES } from '../constants/categories'
import type { NoteCategory } from '../types/note'

export type CategoryFilterValue = 'All' | NoteCategory

interface CategoryFilterProps {
  value: CategoryFilterValue
  onChange: (value: CategoryFilterValue) => void
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  const filters: CategoryFilterValue[] = ['All', ...NOTE_CATEGORIES]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = value === filter

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700'
            }`}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
