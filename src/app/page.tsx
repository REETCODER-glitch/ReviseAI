'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import FileUpload from '@/components/ui/FileUpload'
import Quiz from '@/components/ui/Quiz'
import Flashcards from '@/components/ui/Flashcards'
import Summary from '@/components/ui/Summary'
import { Sparkles, FileText, HelpCircle, Layers, AlignLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { QuizResult, FlashcardResult, SummaryResult } from '@/lib/types'

type Mode = 'quiz' | 'flashcards' | 'summary'

const modes = [
  { id: 'quiz' as Mode, label: 'Quiz Me', icon: HelpCircle, desc: 'Multiple choice questions with explanations', color: 'from-brand-500 to-brand-600' },
  { id: 'flashcards' as Mode, label: 'Flashcards', icon: Layers, desc: 'Active recall cards with spaced repetition', color: 'from-purple-500 to-brand-500' },
  { id: 'summary' as Mode, label: 'Summary', icon: AlignLeft, desc: 'Key points, overview & exam tips', color: 'from-accent-500 to-orange-500' },
]

const questionCounts = [5, 10, 15, 20]

export default function StudyPage() {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<Mode>('quiz')
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QuizResult | FlashcardResult | SummaryResult | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadedName, setUploadedName] = useState('')

  async function generate() {
    if (!text.trim() || text.trim().length < 20) {
      toast.error('Please add some lesson content first.')
      return
    }
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode, count }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data.data)
      toast.success(`✦ ${mode === 'quiz' ? 'Quiz' : mode === 'flashcards' ? 'Flashcards' : 'Summary'} generated!`)
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold px-4 py-2 rounded-full mb-4">
            <Sparkles size={12} />
            AI-powered revision
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-3">
            Turn notes into{' '}
            <span className="gradient-text">revision gold</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Paste your lesson content or upload a document — REVISEAI instantly creates quizzes, flashcards, and summaries.
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-3xl border border-brand-100 shadow-sm p-6 mb-6">
          {/* Upload toggle */}
          <button
            onClick={() => setUploadOpen(!uploadOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-700 mb-4 transition-colors"
          >
            <FileText size={16} />
            {uploadedName ? `Uploaded: ${uploadedName}` : 'Upload a document (PDF, DOCX, TXT)'}
            {uploadOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {uploadOpen && (
            <div className="mb-4 animate-fade-in">
              <FileUpload
                onTextExtracted={(extractedText, filename, wordCount) => {
                  setText(extractedText)
                  setUploadedName(filename)
                  setUploadOpen(false)
                }}
              />
            </div>
          )}

          {/* Text area */}
          <label className="block text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">
            Your Lesson Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Paste your notes, lesson text, or any study material here…\n\nExample: The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration involving glycolysis, the Krebs cycle, and the electron transport chain…`}
            className="w-full min-h-[160px] border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-y focus:outline-none focus:border-brand-400 transition-colors bg-gray-50/50 leading-relaxed"
          />
          <div className="flex justify-between mt-1 mb-4">
            <span className="text-xs text-gray-300">{text.length.toLocaleString()} characters</span>
            {text && (
              <button onClick={() => { setText(''); setUploadedName('') }} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                Clear
              </button>
            )}
          </div>

          {/* Mode selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {modes.map(({ id, label, icon: Icon, desc, color }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={cn(
                  'relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200',
                  mode === id
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-gray-100 hover:border-brand-200 hover:bg-gray-50'
                )}
              >
                <div className={cn('w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center mb-2', color)}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="font-semibold text-sm text-gray-800">{label}</div>
                <div className="text-xs text-gray-400 leading-snug mt-0.5">{desc}</div>
                {mode === id && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-500" />
                )}
              </button>
            ))}
          </div>

          {/* Question count (quiz/flashcards only) */}
          {mode !== 'summary' && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Count:</span>
              <div className="flex gap-2">
                {questionCounts.map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={cn(
                      'w-10 h-8 rounded-lg text-sm font-semibold transition-all',
                      count === n
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-brand-100 hover:text-brand-600'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || !text.trim()}
            className={cn(
              'w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-syne font-bold text-base transition-all duration-200',
              loading || !text.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:-translate-y-0.5 hover:shadow-brand-200 hover:shadow-lg'
            )}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating with AI…
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate {mode === 'quiz' ? 'Quiz' : mode === 'flashcards' ? 'Flashcards' : 'Summary'}
              </>
            )}
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="bg-white rounded-3xl border border-brand-100 p-6 space-y-4 animate-fade-in">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="shimmer h-4 w-3/4 rounded-lg" />
                <div className="shimmer h-3 w-1/2 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div id="results-section" className="bg-white rounded-3xl border border-brand-100 shadow-sm p-6">
            {mode === 'quiz' && (
              <Quiz result={result as QuizResult} onRetry={() => setResult(null)} />
            )}
            {mode === 'flashcards' && (
              <Flashcards result={result as FlashcardResult} onRetry={() => setResult(null)} />
            )}
            {mode === 'summary' && (
              <Summary result={result as SummaryResult} onRetry={() => setResult(null)} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
