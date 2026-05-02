'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Plus, Search, Tag, Trash2, Edit3, Save, X, Clock, BookOpen, Sparkles } from 'lucide-react'
import { cn, generateId, formatDate, truncate } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Note } from '@/lib/types'

const NOTE_COLORS = [
  { id: 'purple', bg: 'bg-brand-50', border: 'border-brand-200', dot: 'bg-brand-500', text: 'text-brand-700' },
  { id: 'orange', bg: 'bg-accent-50', border: 'border-accent-200', dot: 'bg-accent-500', text: 'text-accent-600' },
  { id: 'green', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500', text: 'text-green-700' },
  { id: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', text: 'text-blue-700' },
  { id: 'pink', bg: 'bg-pink-50', border: 'border-pink-200', dot: 'bg-pink-500', text: 'text-pink-700' },
  { id: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-400', text: 'text-yellow-700' },
]

const SUBJECTS = ['Biology', 'Chemistry', 'Physics', 'Maths', 'History', 'Geography', 'English', 'Computer Science', 'Economics', 'Other']

function getColor(id: string) {
  return NOTE_COLORS.find((c) => c.id === id) || NOTE_COLORS[0]
}

const STORAGE_KEY = 'reviseai_notes'

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [editing, setEditing] = useState<Note | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    setNotes(loadNotes())
  }, [])

  function updateNotes(updated: Note[]) {
    setNotes(updated)
    saveNotes(updated)
  }

  function createNote() {
    const note: Note = {
      id: generateId(),
      title: '',
      content: '',
      subject: 'Other',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      color: 'purple',
    }
    setEditing(note)
    setCreating(true)
  }

  function saveNote(note: Note) {
    if (!note.title.trim()) { toast.error('Please add a title.'); return }
    const updated = note.updatedAt !== note.createdAt
      ? notes.map((n) => n.id === note.id ? { ...note, updatedAt: new Date().toISOString() } : n)
      : [{ ...note, updatedAt: new Date().toISOString() }, ...notes]
    updateNotes(updated)
    setEditing(null)
    setCreating(false)
    toast.success(creating ? 'Note created!' : 'Note saved!')
  }

  function deleteNote(id: string) {
    if (!confirm('Delete this note?')) return
    updateNotes(notes.filter((n) => n.id !== id))
    toast.success('Note deleted.')
  }

  const allTags = [...new Set(notes.flatMap((n) => n.tags))]

  const filtered = notes.filter((n) => {
    const q = search.toLowerCase()
    const matchSearch = !search || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    const matchTag = !activeTag || n.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-syne font-extrabold text-3xl text-gray-900">My Notes</h1>
            <p className="text-gray-400 text-sm mt-1">{notes.length} note{notes.length !== 1 ? 's' : ''} · saved locally</p>
          </div>
          <button
            onClick={createNote}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <Plus size={18} />
            New Note
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm focus:outline-none focus:border-brand-400 transition-colors"
            />
          </div>
          {allTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTag('')}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all', !activeTag ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-100 text-gray-500 hover:border-brand-300')}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1', activeTag === tag ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-gray-100 text-gray-500 hover:border-brand-300')}
                >
                  <Tag size={10} />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Note editor modal */}
        {editing && (
          <NoteEditor note={editing} onChange={setEditing} onSave={saveNote} onCancel={() => { setEditing(null); setCreating(false) }} />
        )}

        {/* Empty state */}
        {filtered.length === 0 && !editing && (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-brand-200 mx-auto mb-4" />
            <h2 className="font-syne font-bold text-xl text-gray-400 mb-2">
              {search || activeTag ? 'No notes match your search' : 'No notes yet'}
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              {search || activeTag ? 'Try a different search term.' : 'Create your first note to get started.'}
            </p>
            {!search && !activeTag && (
              <button onClick={createNote} className="inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm hover:bg-brand-600 transition-all">
                <Plus size={16} /> Create a note
              </button>
            )}
          </div>
        )}

        {/* Notes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => {
            const color = getColor(note.color)
            return (
              <div
                key={note.id}
                className={cn('rounded-2xl border p-5 cursor-pointer card-lift', color.bg, color.border)}
                onClick={() => setEditing(note)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={cn('w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0', color.dot)} />
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditing(note) }}
                      className="p-1.5 rounded-lg hover:bg-white/60 text-gray-400 hover:text-brand-500 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                      className="p-1.5 rounded-lg hover:bg-white/60 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="font-syne font-bold text-gray-900 mb-1 leading-snug">{note.title || 'Untitled'}</h3>
                <span className={cn('text-xs font-semibold', color.text)}>{note.subject}</span>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-3">
                  {truncate(note.content.replace(/\n/g, ' '), 120)}
                </p>
                {note.tags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold bg-white/70 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-1 mt-3 text-gray-300">
                  <Clock size={10} />
                  <span className="text-[10px]">{formatDate(new Date(note.updatedAt))}</span>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function NoteEditor({ note, onChange, onSave, onCancel }: {
  note: Note
  onChange: (n: Note) => void
  onSave: (n: Note) => void
  onCancel: () => void
}) {
  const [tagInput, setTagInput] = useState('')

  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (!t || note.tags.includes(t)) return
    onChange({ ...note, tags: [...note.tags, t] })
    setTagInput('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-syne font-bold text-lg text-gray-900">Edit Note</h2>
            <div className="flex gap-2">
              <button onClick={onCancel} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"><X size={18} /></button>
              <button onClick={() => onSave(note)} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-brand-600 transition-all">
                <Save size={15} /> Save
              </button>
            </div>
          </div>

          {/* Title */}
          <input
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
            placeholder="Note title…"
            className="w-full font-syne font-bold text-2xl text-gray-900 border-0 border-b border-gray-100 pb-3 mb-4 focus:outline-none placeholder-gray-200"
          />

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-5">
            {/* Subject */}
            <select
              value={note.subject}
              onChange={(e) => onChange({ ...note, subject: e.target.value })}
              className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-xl focus:outline-none"
            >
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>

            {/* Color */}
            <div className="flex gap-1.5 items-center">
              {NOTE_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onChange({ ...note, color: c.id })}
                  className={cn('w-5 h-5 rounded-full transition-transform', c.dot, note.color === c.id ? 'scale-125 ring-2 ring-offset-1 ring-gray-300' : 'hover:scale-110')}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <textarea
            value={note.content}
            onChange={(e) => onChange({ ...note, content: e.target.value })}
            placeholder="Start writing your notes here…"
            className="note-editor w-full border-0 text-gray-700 resize-none focus:outline-none placeholder-gray-200 text-sm leading-relaxed min-h-[250px]"
          />

          {/* Tags */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex gap-2 flex-wrap mb-2">
              {note.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full">
                  #{tag}
                  <button onClick={() => onChange({ ...note, tags: note.tags.filter((t) => t !== tag) })} className="hover:text-red-400 transition-colors"><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="Add tag (press Enter)…"
                className="flex-1 text-xs border border-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-400"
              />
              <button onClick={addTag} className="px-3 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-xl text-xs font-semibold transition-colors">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
