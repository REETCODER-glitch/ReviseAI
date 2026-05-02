'use client'

import { SummaryResult } from '@/lib/types'
import { Clock, BookOpen, Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SummaryProps {
  result: SummaryResult
  onRetry: () => void
}

export default function Summary({ result, onRetry }: SummaryProps) {
  const { title, subject, overview, keyPoints, examTip, difficulty, estimatedReadTime } = result

  const diffColor =
    difficulty === 'Advanced'
      ? 'bg-red-50 text-red-600'
      : difficulty === 'Intermediate'
      ? 'bg-orange-50 text-orange-500'
      : 'bg-green-50 text-green-600'

  return (
    <div className="animate-fade-up space-y-5">
      {/* Header card */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-brand-200 text-xs font-bold uppercase tracking-widest mb-2">{subject}</div>
            <h2 className="font-syne font-extrabold text-2xl leading-tight">{title}</h2>
          </div>
          <BookOpen size={32} className="text-white/30 flex-shrink-0 ml-4 mt-1" />
        </div>
        <div className="flex gap-3 mt-4">
          <span className={cn('text-xs font-bold px-3 py-1 rounded-full bg-white/20')}>{difficulty}</span>
          <span className="text-xs font-medium flex items-center gap-1 text-white/70">
            <Clock size={11} />
            {estimatedReadTime} min read
          </span>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-syne font-bold text-gray-900 mb-3 flex items-center gap-2">
          <div className="w-1 h-5 bg-brand-500 rounded-full" />
          Overview
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">{overview}</p>
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-syne font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-accent-500 rounded-full" />
          Key Points to Remember
        </h3>
        <ul className="space-y-3">
          {keyPoints.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 p-3 bg-brand-50 rounded-xl border border-brand-100 animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Exam Tip */}
      <div className="bg-gradient-to-r from-accent-50 to-orange-50 rounded-2xl border border-accent-200 p-6">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-gray-900 mb-1">Exam Tip</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{examTip}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-300 text-brand-600 hover:bg-brand-50 py-3 rounded-xl font-semibold transition-all text-sm"
        >
          <RotateCcw size={15} />
          New Summary
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-semibold transition-all text-sm"
        >
          <Sparkles size={15} />
          Save Summary
        </button>
      </div>
    </div>
  )
}
