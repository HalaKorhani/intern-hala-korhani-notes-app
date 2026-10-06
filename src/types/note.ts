export type NoteCategory = 'Personal' | 'Study' | 'Work' | 'Ideas'

export interface Note {
  id: string
  title: string
  content: string
  category: NoteCategory
  createdAt: string
  updatedAt: string
}

export type NoteFormData = Pick<Note, 'title' | 'content' | 'category'>
