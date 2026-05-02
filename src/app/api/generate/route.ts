import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient, CLAUDE_MODEL } from '@/lib/anthropic'
import { generateId } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { text, mode, count = 5 } = await req.json()

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: 'Please provide at least a paragraph of content.' }, { status: 400 })
    }

    const client = getAnthropicClient()
    const trimmed = text.trim().slice(0, 8000)

    let prompt = ''

    if (mode === 'quiz') {
      prompt = `You are REVISEAI, an expert educational AI. Analyse this lesson content and create ${count} high-quality multiple-choice quiz questions.

Return ONLY a valid JSON object (no markdown fences, no preamble):
{
  "subject": "detected subject name",
  "difficulty": "Beginner|Intermediate|Advanced",
  "questions": [
    {
      "id": "q1",
      "question": "Clear, specific question text",
      "options": ["A) First option", "B) Second option", "C) Third option", "D) Fourth option"],
      "answer": 0,
      "explanation": "Brief explanation of why this answer is correct"
    }
  ]
}

Rules:
- Make questions progressively harder
- All 4 options must be plausible
- "answer" is the 0-based index of the correct option
- Explanations should be educational and concise

Lesson content:
${trimmed}`

    } else if (mode === 'flashcards') {
      prompt = `You are REVISEAI. Create ${count} flashcards from this lesson content for active recall revision.

Return ONLY valid JSON (no markdown, no preamble):
{
  "subject": "detected subject name",
  "cards": [
    {
      "id": "fc1",
      "front": "Question or term to recall",
      "back": "Complete answer or definition",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Rules:
- Mix definitions, concepts, processes, and application questions
- Keep fronts concise (under 15 words)
- Backs should be complete but not too long (under 40 words)
- Mark difficulty honestly

Lesson content:
${trimmed}`

    } else if (mode === 'summary') {
      prompt = `You are REVISEAI. Create a structured revision summary of this lesson content.

Return ONLY valid JSON (no markdown, no preamble):
{
  "subject": "detected subject name",
  "title": "Clear lesson title",
  "difficulty": "Beginner|Intermediate|Advanced",
  "estimatedReadTime": 3,
  "overview": "2-3 sentence overview of the entire lesson",
  "keyPoints": [
    "First important point explained clearly",
    "Second key concept with detail",
    "Third point students must remember",
    "Fourth important idea",
    "Fifth key takeaway"
  ],
  "examTip": "Specific exam strategy or common mistake to avoid for this topic"
}

Lesson content:
${trimmed}`
    }

    const message = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = message.content.map((b) => (b.type === 'text' ? b.text : '')).join('')
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    const parsed = JSON.parse(clean)

    // Add IDs if missing
    if (mode === 'quiz' && parsed.questions) {
      parsed.questions = parsed.questions.map((q: any, i: number) => ({
        ...q,
        id: q.id || generateId(),
      }))
    }
    if (mode === 'flashcards' && parsed.cards) {
      parsed.cards = parsed.cards.map((c: any) => ({
        ...c,
        id: c.id || generateId(),
      }))
    }

    return NextResponse.json({ success: true, data: parsed, mode })
  } catch (err: any) {
    console.error('Generate error:', err)
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'AI returned unexpected format. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ error: err.message || 'Something went wrong.' }, { status: 500 })
  }
}
