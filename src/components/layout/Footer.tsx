import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-syne font-extrabold text-brand-500">REVISE<span className="text-accent-500">AI</span></span>
        </div>
        <div className="text-xs text-gray-400">© 2025 REVISEAI · Built to make revision actually work.</div>
        <div className="flex gap-5 text-xs text-gray-400">
          <Link href="/pricing" className="hover:text-brand-500 transition-colors">Pricing</Link>
          <Link href="/partners" className="hover:text-brand-500 transition-colors">Schools</Link>
          <a href="mailto:hello@reviseai.app" className="hover:text-brand-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
