'use client'

import Navbar from '@/components/layout/Navbar'
import { Building2, CheckCircle2, Sparkles, Users, BarChart3, Shield, Zap, BookOpen, GraduationCap, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const integrations = [
  { name: 'Google Classroom', icon: '📚', desc: 'Import lessons & assignments automatically', badge: 'Popular' },
  { name: 'Microsoft Teams', icon: '🎓', desc: 'Sync with class channels & Teams EDU', badge: '' },
  { name: 'Canvas LMS', icon: '🧠', desc: 'Full LMS integration with grade passback', badge: '' },
  { name: 'Edexcel / AQA', icon: '📋', desc: 'UK exam board curriculum aligned content', badge: 'UK' },
  { name: 'MAT Networks', icon: '🏫', desc: 'Multi-academy trust ready infrastructure', badge: '' },
  { name: 'Moodle', icon: '🌐', desc: 'Seamless Moodle plugin for instant setup', badge: '' },
]

const features = [
  { icon: BarChart3, title: 'Class Analytics', desc: 'See every student\'s quiz scores, revision time, and weak topics in one dashboard.' },
  { icon: Users, title: 'Teacher Controls', desc: 'Set assignments, choose topics, and track completion — all from your teacher portal.' },
  { icon: Shield, title: 'GDPR Compliant', desc: 'Full data protection compliance. No student data used for AI training. Ever.' },
  { icon: Zap, title: 'Fast Onboarding', desc: 'Your whole school is live in under 48 hours with a dedicated onboarding manager.' },
  { icon: BookOpen, title: 'Curriculum Aligned', desc: 'Content mapped to UK, US, IB, and A-Level curricula automatically.' },
  { icon: GraduationCap, title: 'Student Insights', desc: 'Identify students at risk early with AI-powered learning gap detection.' },
]

const testimonials = [
  {
    quote: 'My Year 11s went from dreading revision to actually asking for more quizzes. REVISEAI made the difference.',
    name: 'Ms. Rahman',
    role: 'Biology Teacher',
    school: 'Parkside Academy, London',
    avatar: 'MR',
    color: 'bg-brand-500',
  },
  {
    quote: 'I upload the lesson on Monday. By Friday students have revised it three times without me chasing them.',
    name: 'Mr. O\'Connor',
    role: 'History Teacher',
    school: 'St. Mary\'s College, Manchester',
    avatar: 'MO',
    color: 'bg-accent-500',
  },
  {
    quote: 'The analytics dashboard shows me exactly which students need support before exam season. It\'s transformed how I plan lessons.',
    name: 'Dr. Patel',
    role: 'Head of Science',
    school: 'Greenfield High, Birmingham',
    avatar: 'DP',
    color: 'bg-green-500',
  },
  {
    quote: 'We rolled out REVISEAI across 6 schools in our trust. Results improved 23% in the first term.',
    name: 'Sarah Chen',
    role: 'Director of Learning',
    school: 'Horizon MAT, Leeds',
    avatar: 'SC',
    color: 'bg-purple-500',
  },
]

const steps = [
  { num: '01', title: 'School signs up', desc: 'Simple onboarding form. We handle all the technical setup and integration.' },
  { num: '02', title: 'Teachers upload', desc: 'Lessons are automatically converted into quizzes, flashcards, and summaries.' },
  { num: '03', title: 'Students revise', desc: 'Every student\'s progress is tracked, scored, and surfaced in your dashboard.' },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold px-4 py-2 rounded-full mb-5">
            <Building2 size={12} />
            School Partnerships
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight mb-4">
            Bring REVISEAI to<br />
            <span className="gradient-text">your entire school</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-8">
            REVISEAI integrates directly with your school's systems. Teachers set assignments, students revise smarter, and leadership sees the data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md">
              <Sparkles size={16} />
              Request a School Demo
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-brand-300 text-brand-600 hover:bg-brand-50 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all">
              View Pricing →
            </button>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-brand-500 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
              {[
                { num: '500+', label: 'Partner Schools' },
                { num: '50k+', label: 'Students Revising' },
                { num: '23%', label: 'Avg Grade Improvement' },
                { num: '98%', label: 'Teacher Satisfaction' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-syne font-extrabold text-3xl">{num}</div>
                  <div className="text-brand-200 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="font-syne font-extrabold text-3xl text-gray-900 mb-2">How it works</h2>
            <p className="text-gray-400 text-sm">From sign-up to full deployment in 48 hours.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative bg-white rounded-3xl border border-gray-100 p-7 card-lift">
                <div className="font-syne font-extrabold text-5xl text-brand-100 mb-4">{step.num}</div>
                <h3 className="font-syne font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-brand-200 text-2xl z-10">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-syne font-extrabold text-3xl text-gray-900 mb-2">Works with your existing tools</h2>
              <p className="text-gray-400 text-sm">Plug REVISEAI into the platforms your school already uses.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map(({ name, icon, desc, badge }) => (
                <div key={name} className="relative bg-[#F8F7FF] rounded-2xl border border-brand-100 p-5 flex gap-4 items-start card-lift">
                  {badge && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">{badge}</div>
                  )}
                  <div className="text-2xl flex-shrink-0">{icon}</div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm mb-0.5">{name}</div>
                    <div className="text-xs text-gray-400 leading-snug">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="font-syne font-extrabold text-3xl text-gray-900 mb-2">Everything your school needs</h2>
            <p className="text-gray-400 text-sm">Built specifically for schools, not retrofitted from a consumer app.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 card-lift">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-500" />
                </div>
                <h3 className="font-syne font-bold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-syne font-extrabold text-3xl text-gray-900 mb-2">What teachers say</h2>
              <p className="text-gray-400 text-sm">Real feedback from educators across the UK.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {testimonials.map(({ quote, name, role, school, avatar, color }) => (
                <div key={name} className="bg-[#F8F7FF] rounded-2xl border border-brand-100 p-6 card-lift">
                  <div className="text-brand-300 text-4xl font-serif leading-none mb-3">"</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">{quote}</p>
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', color)}>
                      {avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{name}</div>
                      <div className="text-xs text-gray-400">{role} · {school}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-10 text-center text-white">
            <Globe size={40} className="mx-auto mb-4 text-white/60" />
            <h2 className="font-syne font-extrabold text-3xl mb-3">Ready to transform revision at your school?</h2>
            <p className="text-brand-200 text-sm max-w-md mx-auto mb-7">Join 500+ schools already using REVISEAI. Get a free demo and custom pricing for your institution.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md">
                Book a Free Demo
              </button>
              <button className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all">
                hello@reviseai.app
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-syne font-extrabold text-lg text-brand-500">REVISE<span className="text-accent-500">AI</span></div>
          <div className="text-xs text-gray-400">© 2025 REVISEAI. Built to make revision actually work.</div>
          <div className="flex gap-5 text-xs text-gray-400">
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms</a>
            <a href="mailto:hello@reviseai.app" className="hover:text-brand-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
