'use client'

import Navbar from '@/components/layout/Navbar'
import { Check, X, Sparkles, Building2, Zap, Shield, BarChart3, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const analyticsData = [
  { day: 'Mon', score: 55 }, { day: 'Tue', score: 62 }, { day: 'Wed', score: 70 },
  { day: 'Thu', score: 68 }, { day: 'Fri', score: 79 }, { day: 'Sat', score: 82 }, { day: 'Sun', score: 88 },
]

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'forever',
    desc: 'Perfect to get started with AI revision.',
    cta: 'Start for Free',
    ctaStyle: 'border',
    highlight: false,
    features: [
      { label: '10 AI generations per day', included: true },
      { label: 'Quiz generator (up to 5 questions)', included: true },
      { label: 'Flashcard creation', included: true },
      { label: 'Lesson summaries', included: true },
      { label: 'Notes (saved locally)', included: true },
      { label: 'Document upload (PDF, DOCX)', included: true },
      { label: 'Advanced analytics', included: false },
      { label: 'School dashboard', included: false },
      { label: 'Spaced repetition engine', included: false },
      { label: 'Progress reports & exports', included: false },
      { label: 'Priority AI (faster responses)', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '£4.99',
    period: '/month',
    desc: 'For students serious about their grades.',
    cta: 'Upgrade to Premium',
    ctaStyle: 'filled',
    highlight: true,
    badge: '⭐ Most Popular',
    features: [
      { label: 'Unlimited AI generations', included: true },
      { label: 'Quiz generator (up to 20 questions)', included: true },
      { label: 'Adaptive flashcards', included: true },
      { label: 'Detailed lesson summaries', included: true },
      { label: 'Notes with cloud sync', included: true },
      { label: 'Document upload (PDF, DOCX)', included: true },
      { label: 'Advanced analytics dashboard', included: true },
      { label: 'School dashboard integration', included: true },
      { label: 'Spaced repetition engine', included: true },
      { label: 'Progress reports & exports', included: true },
      { label: 'Priority AI (faster responses)', included: true },
    ],
  },
]

const stats = [
  { num: '87%', label: 'Average score improvement after 7 days', icon: BarChart3 },
  { num: '4.2×', label: 'Faster revision vs. traditional methods', icon: Zap },
  { num: '98%', label: 'Student satisfaction rating', icon: Sparkles },
  { num: '50k+', label: 'Students already revising smarter', icon: Users },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold px-4 py-2 rounded-full mb-4">
            <Sparkles size={12} />
            Simple pricing
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 mb-3">
            Invest in your <span className="gradient-text">future grades</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-base">Start free. Upgrade when you're ready to unlock the full power of AI revision.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative bg-white rounded-3xl p-7 flex flex-col',
                plan.highlight ? 'premium-glow' : 'border border-gray-100'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="mb-5">
                <div className="font-syne font-extrabold text-2xl text-gray-900 mb-0.5">{plan.name}</div>
                <div className="text-gray-400 text-sm">{plan.desc}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-syne font-extrabold text-4xl text-brand-500">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-3">
                    {f.included ? (
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-green-600" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <X size={11} className="text-gray-300" strokeWidth={3} />
                      </div>
                    )}
                    <span className={cn('text-sm', f.included ? 'text-gray-700' : 'text-gray-300')}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  'w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5',
                  plan.ctaStyle === 'filled'
                    ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md'
                    : 'border-2 border-brand-300 text-brand-600 hover:bg-brand-50'
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* School Plan */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
            <Building2 size={28} className="text-brand-500" />
          </div>
          <h2 className="font-syne font-extrabold text-2xl text-gray-900 mb-2">School & Institution Plan</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">Custom pricing for entire schools. Teacher dashboards, class analytics, LMS integration, and a dedicated account manager.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-7">
            {[
              { icon: BarChart3, label: 'Per-class analytics' },
              { icon: Users, label: 'Teacher tools' },
              { icon: Shield, label: 'GDPR compliant' },
              { icon: Zap, label: 'Fast onboarding' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-brand-50 rounded-2xl p-3 flex flex-col items-center gap-2">
                <Icon size={18} className="text-brand-500" />
                <span className="text-xs font-semibold text-gray-600">{label}</span>
              </div>
            ))}
          </div>
          <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md">
            Contact Sales →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map(({ num, label, icon: Icon }) => (
            <div key={num} className="bg-white rounded-2xl border border-gray-100 p-5 text-center card-lift">
              <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-brand-500" />
              </div>
              <div className="font-syne font-extrabold text-2xl text-brand-500">{num}</div>
              <div className="text-xs text-gray-400 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>

        {/* Analytics preview */}
        <div className="bg-white rounded-3xl border border-gray-100 p-7 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-syne font-bold text-lg text-gray-900">Premium Analytics Preview</h3>
              <p className="text-sm text-gray-400 mt-0.5">Weekly quiz score progression</p>
            </div>
            <span className="text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full">PREMIUM</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F0FF" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} unit="%" />
              <Tooltip
                contentStyle={{ border: '1px solid #EDE9FF', borderRadius: 12, fontFamily: 'DM Sans', fontSize: 13 }}
                formatter={(v: number) => [`${v}%`, 'Score']}
              />
              <Bar dataKey="score" fill="#6C4EFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <h3 className="font-syne font-bold text-xl text-gray-900 mb-2">Any questions?</h3>
          <p className="text-gray-400 text-sm">Email us at <a href="mailto:hello@reviseai.app" className="text-brand-500 font-medium hover:underline">hello@reviseai.app</a></p>
        </div>
      </main>
    </div>
  )
}
