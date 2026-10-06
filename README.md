# NoteSpace — React Notes Application

A CRUD notes application built with React, TypeScript, Vite, Tailwind CSS, and localStorage.

## Features

- Create notes
- Read/display notes
- Edit notes
- Delete notes
- Search by title or note content
- Filter by category
- Categories: Personal, Study, Work, Ideas
- Persist notes in browser localStorage
- Responsive Tailwind CSS interface
- TypeScript data modeling

## Run the project

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## CRUD mapping

- Create → `createNote()` in `src/App.tsx`
- Read → `visibleNotes` + `NoteList`
- Update → `updateNote()` in `src/App.tsx`
- Delete → `deleteNote()` in `src/App.tsx`

## Main learning concepts

### State management
`App.tsx` owns the important application state:
- `notes`
- `search`
- `category`
- `isFormOpen`
- `editingNote`

### Data modeling
The `Note` and `NoteCategory` types are in:

`src/types/note.ts`

### Search functionality
Search is derived from the `notes` array and `search` state in `visibleNotes`.

### Persistence
`src/hooks/useLocalStorage.ts` synchronizes the notes state with browser localStorage.
