export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface Note {
  id: string
  title: string
  content: string
  subject: string
  createdAt: string
  updatedAt: string
  tags: string[]
  color: string
}

export interface GenerateRequest {
  text: string
  mode: 'quiz' | 'flashcards' | 'summary'
  count?: number
}

export interface QuizResult {
  questions: QuizQuestion[]
  subject: string
  difficulty: string
}

export interface FlashcardResult {
  cards: Flashcard[]
  subject: string
}

export interface SummaryResult {
  title: string
  overview: string
  keyPoints: string[]
  examTip: string
  subject: string
  difficulty: string
  estimatedReadTime: number
}

export interface UploadResult {
  text: string
  filename: string
  pages?: number
  wordCount: number
}
