import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
    ]

    const ext = file.name.split('.').pop()?.toLowerCase()
    const isPdf = file.type === 'application/pdf' || ext === 'pdf'
    const isDocx = file.type.includes('wordprocessingml') || ext === 'docx'
    const isText = file.type.startsWith('text/') || ext === 'txt' || ext === 'md'

    if (!isPdf && !isDocx && !isText) {
      return NextResponse.json({
        error: 'Unsupported file type. Please upload PDF, DOCX, TXT, or Markdown files.',
      }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ''
    let pages: number | undefined

    if (isPdf) {
      const pdfParse = (await import('pdf-parse')).default
      const result = await pdfParse(buffer)
      text = result.text
      pages = result.numpages
    } else if (isDocx) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      text = buffer.toString('utf-8')
    }

    // Clean up extracted text
    text = text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\t/g, ' ')
      .trim()

    if (text.length < 50) {
      return NextResponse.json({
        error: 'Could not extract enough text from this file. Please try a different file.',
      }, { status: 400 })
    }

    const wordCount = text.split(/\s+/).filter(Boolean).length

    return NextResponse.json({
      success: true,
      text: text.slice(0, 12000),
      filename: file.name,
      pages,
      wordCount,
    })
  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: err.message || 'Failed to process file.' }, { status: 500 })
  }
}
