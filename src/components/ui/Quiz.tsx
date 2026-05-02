'use client'

import { useState } from 'react'
import { QuizResult, QuizQuestion } from '@/lib/types'
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizProps {
  result: QuizResult
  onRetry: () => void
}

export default function Quiz({ result, onRetry }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [showFinal, setShowFinal] = useState(false)

  const { questions, subject, difficulty } = result
  const totalAnswered = Object.keys(answers).length
  const correct = questions.filter((q) => answers[q.id] === q.answer).length
  const pct = totalAnswered > 0 ? Math.round((correct / questions.length) * 100) : 0

  function answer(qId: string, idx: number) {
    if (answers[qId] !== undefined) return
    setAnswers((prev) => ({ ...prev, [qId]: idx }))
    setRevealed((prev) => ({ ...prev, [qId]: true }))
    if (Object.keys(answers).length + 1 === questions.length) {
      setTimeout(() => setShowFinal(true), 800)
    }
  }

  const diffColor = difficulty === 'Advanced' ? 'text-red-500 bg-red-50' : difficulty === 'Intermediate' ? 'text-orange-500 bg-orange-50' : 'text-green-600 bg-green-50'

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-syne font-bold text-xl text-gray-900">{subject} Quiz</h2>
          <div className="flex gap-2 mt-1">
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', diffColor)}>{difficulty}</span>
            <span className="text-xs text-gray-400 font-medium">{questions.length} questions</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-syne font-extrabold text-brand-500">{totalAnswered}/{questions.length}</div>
          <div className="text-xs text-gray-400">answered</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-brand-500 to-accent-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={qi}
            selected={answers[q.id]}
            revealed={!!revealed[q.id]}
            onSelect={(idx) => answer(q.id, idx)}
          />
        ))}
      </div>

      {/* Final Score */}
      {showFinal && (
        <div className="mt-8 animate-fade-up">
          <div className="rounded-2xl overflow-hidden border border-brand-200">
            <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 text-white text-center">
              <Trophy size={40} className="mx-auto mb-3" />
              <div className="font-syne font-extrabold text-4xl">{pct}%</div>
              <div className="text-white/80 text-sm mt-1">
                {pct >= 80 ? '🔥 Outstanding! You nailed it.' : pct >= 60 ? '👍 Good work — keep it up!' : '💪 Keep practising — you\'ll get there!'}
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Correct', value: correct, color: 'text-green-600' },
                  { label: 'Wrong', value: questions.length - correct, color: 'text-red-500' },
                  { label: 'Score', value: `${pct}%`, color: 'text-brand-500' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center bg-gray-50 rounded-xl p-3">
                    <div className={cn('font-syne font-extrabold text-2xl', color)}>{value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
              >
                <RotateCcw size={16} />
                Try New Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function QuestionCard({
  question, index, selected, revealed, onSelect
}: {
  question: QuizQuestion
  index: number
  selected: number | undefined
  revealed: boolean
  onSelect: (idx: number) => void
}) {
  return (
    <div className={cn('bg-white rounded-2xl border p-6 card-lift', revealed ? 'border-brand-200' : 'border-gray-100')}>
      <div className="flex gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {index + 1}
        </div>
        <div className="font-medium text-gray-800 leading-relaxed">{question.question}</div>
      </div>

      <div className="grid gap-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === question.answer
          const isWrong = revealed && isSelected && !isCorrect
          const showCorrect = revealed && isCorrect

          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => onSelect(i)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                !revealed && 'hover:border-brand-300 hover:bg-brand-50 border-gray-100 text-gray-700',
                showCorrect && 'border-green-400 bg-green-50 text-green-800',
                isWrong && 'border-red-400 bg-red-50 text-red-800',
                !revealed && !isSelected && 'border-gray-100',
                revealed && !showCorrect && !isWrong && 'border-gray-100 text-gray-400',
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  showCorrect ? 'border-green-400 bg-green-400' : isWrong ? 'border-red-400 bg-red-400' : 'border-current'
                )}>
                  {showCorrect && <CheckCircle2 size={12} className="text-white" />}
                  {isWrong && <XCircle size={12} className="text-white" />}
                </div>
                {opt}
              </div>
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
          <div className="flex gap-2">
            <Brain size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-brand-700 leading-relaxed">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
