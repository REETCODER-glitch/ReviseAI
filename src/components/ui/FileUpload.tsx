'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onTextExtracted: (text: string, filename: string, wordCount: number) => void
}

export default function FileUpload({ onTextExtracted }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    setUploadedFile(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setUploadedFile(file.name)
      onTextExtracted(data.text, data.filename, data.wordCount)
      toast.success(`✓ Extracted ${data.wordCount.toLocaleString()} words from ${file.name}`)
    } catch (err: any) {
      toast.error(err.message || 'Failed to process file')
    } finally {
      setUploading(false)
    }
  }, [onTextExtracted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200',
        isDragActive
          ? 'border-brand-500 bg-brand-50 dropzone-active'
          : 'border-brand-200 hover:border-brand-400 hover:bg-brand-50/50',
        uploading && 'opacity-70 cursor-wait'
      )}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="text-brand-500 animate-spin" />
          <p className="text-sm font-medium text-brand-600">Extracting text…</p>
        </div>
      ) : uploadedFile ? (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 size={32} className="text-green-500" />
          <div>
            <p className="text-sm font-semibold text-gray-700">{uploadedFile}</p>
            <p className="text-xs text-gray-400 mt-0.5">Click or drag to replace</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
            <Upload size={22} className="text-brand-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {isDragActive ? 'Drop your file here' : 'Upload a document'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT or Markdown · Max 10MB</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['PDF', 'DOCX', 'TXT', 'MD'].map((ext) => (
              <span key={ext} className="text-[10px] font-bold bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full">
                {ext}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
