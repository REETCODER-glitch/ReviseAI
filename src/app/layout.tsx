import type { Metadata } from 'next'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'REVISEAI — Smart Revision for Students',
  description: 'Turn any lesson into quizzes, flashcards, and summaries. AI-powered revision that actually works.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'DM Sans, sans-serif',
              borderRadius: '12px',
              border: '1px solid #D5CCFF',
              background: '#fff',
              color: '#1A1033',
            },
            success: { iconTheme: { primary: '#6C4EFF', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
