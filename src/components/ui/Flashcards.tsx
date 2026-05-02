'use client'

import { useState } from 'react'
import { FlashcardResult } from '@/lib/types'
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlashcardsProps {
  result: FlashcardResult
  onRetry: () => void
}

export default function Flashcards({ result, onRetry }: FlashcardsProps) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [ratings, setRatings] = useState<Record<string, 'easy' | 'medium' | 'hard'>>({})
  const [finished, setFinished] = useState(false)

  const { cards, subject } = result
  const card = cards[current]
  const progress = ((current) / cards.length) * 100

  function next() {
    setFlipped(false)
    setTimeout(() => {
      if (current < cards.length - 1) setCurrent(current + 1)
      else setFinished(true)
    }, 150)
  }

  function prev() {
    if (current === 0) return
    setFlipped(false)
    setTimeout(() => setCurrent(current - 1), 150)
  }

  function rate(r: 'easy' | 'medium' | 'hard') {
    setRatings((prev) => ({ ...prev, [card.id]: r }))
    next()
  }

  function restart() {
    setCurrent(0)
    setFlipped(false)
    setFinished(false)
    setRatings({})
  }

  if (finished) {
    const easy = Object.values(ratings).filter((r) => r === 'easy').length
    const medium = Object.values(ratings).filter((r) => r === 'medium').length
    const hard = Object.values(ratings).filter((r) => r === 'hard').length

    return (
      <div className="animate-fade-up">
        <div className="bg-white rounded-2xl border border-brand-200 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-8 text-white text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="font-syne font-extrabold text-2xl">Deck Complete!</h2>
            <p className="text-white/80 text-sm mt-1">{cards.length} cards reviewed</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-green-50 rounded-xl p-4">
                <div className="font-syne font-extrabold text-2xl text-green-600">{easy}</div>
                <div className="text-xs text-gray-500 mt-1">Easy</div>
              </div>
              <div className="text-center bg-orange-50 rounded-xl p-4">
                <div className="font-syne font-extrabold text-2xl text-orange-500">{medium}</div>
                <div className="text-xs text-gray-500 mt-1">Need work</div>
              </div>
              <div className="text-center bg-red-50 rounded-xl p-4">
                <div className="font-syne font-extrabold text-2xl text-red-500">{hard}</div>
                <div className="text-xs text-gray-500 mt-1">Hard</div>
              </div>
            </div>
            {hard > 0 && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700 font-medium">
                💡 You marked {hard} card{hard > 1 ? 's' : ''} as hard — focus on these next!
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-300 text-brand-600 hover:bg-brand-50 py-3 rounded-xl font-semibold transition-all"
              >
                <RotateCcw size={16} />
                Review Again
              </button>
              <button
                onClick={onRetry}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-semibold transition-all"
              >
                New Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-syne font-bold text-xl text-gray-900">{subject} Flashcards</h2>
          <p className="text-sm text-gray-400">{cards.length} cards · tap to flip</p>
        </div>
        <div className="text-right">
          <div className="font-syne font-extrabold text-2xl text-brand-500">{current + 1}<span className="text-gray-300 text-lg">/{cards.length}</span></div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
        <div
          className="bg-gradient-to-r from-brand-500 to-accent-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="perspective mb-4">
        <div
          className={cn(
            'relative w-full preserve-3d transition-transform-600 cursor-pointer',
            flipped && 'rotate-y-180'
          )}
          style={{ height: 280 }}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-brand-500 rounded-2xl flex flex-col items-center justify-center p-8 text-white">
            <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Question</div>
            <div className="text-center font-medium text-xl leading-relaxed">{card.front}</div>
            <div className="mt-6 text-xs opacity-50">Tap to reveal answer</div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-brand-200 rounded-2xl flex flex-col items-center justify-center p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-4">Answer</div>
            <div className="text-center text-gray-800 text-lg leading-relaxed">{card.back}</div>
            {card.difficulty && (
              <span className={cn(
                'mt-4 text-xs font-bold px-3 py-1 rounded-full',
                card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                card.difficulty === 'hard' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
              )}>
                {card.difficulty}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons (shown when flipped) */}
      {flipped ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-gray-400 font-medium">How well did you know this?</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => rate('hard')}
              className="flex flex-col items-center gap-2 py-3 px-4 rounded-xl border-2 border-red-200 hover:bg-red-50 transition-all text-red-500 font-semibold text-sm"
            >
              <ThumbsDown size={18} />
              Didn't know
            </button>
            <button
              onClick={() => rate('medium')}
              className="flex flex-col items-center gap-2 py-3 px-4 rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all text-orange-500 font-semibold text-sm"
            >
              <Minus size={18} />
              Partly knew
            </button>
            <button
              onClick={() => rate('easy')}
              className="flex flex-col items-center gap-2 py-3 px-4 rounded-xl border-2 border-green-200 hover:bg-green-50 transition-all text-green-600 font-semibold text-sm"
            >
              <ThumbsUp size={18} />
              Got it!
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-100 text-gray-400 hover:border-brand-300 hover:text-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ChevronLeft size={18} />
            Back
          </button>
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-semibold transition-all"
          >
            Skip
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
