'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { templatesMeta, trending, freeTemplates, proTemplates, newTemplates, type TemplateMeta } from '@/data/templates-meta'

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template }: { template: TemplateMeta }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/${template.id}/loan-officer`}
      className="group block flex-shrink-0 w-72"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview image */}
      <div
        className="relative overflow-hidden rounded-xl mb-3 bg-gray-900"
        style={{
          height: '180px',
          boxShadow: hovered ? `0 0 0 2px ${template.accent}, 0 8px 32px rgba(0,0,0,0.4)` : '0 2px 12px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tier badge */}
        <div className={`absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full ${
          template.tier === 'free'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
        }`}>
          {template.tier === 'free' ? 'Free' : 'Pro'}
        </div>
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full">
            Preview Template →
          </span>
        </div>
      </div>

      {/* Card info */}
      <div>
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">{template.name}</h3>
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{template.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {template.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {template.remixes}
          </span>
          <div className="flex gap-1 ml-auto">
            {template.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-gray-800 text-gray-400 text-[10px] px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Section Row ─────────────────────────────────────────────────────────────
function TemplateSection({
  title,
  templates,
  browseHref,
}: {
  title: string
  templates: TemplateMeta[]
  browseHref?: string
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5 px-6 md:px-12">
        <h2 className="text-sm font-semibold text-gray-200 tracking-wide">{title}</h2>
        {browseHref && (
          <Link href={browseHref} className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
            Browse {title} <span>→</span>
          </Link>
        )}
      </div>
      <div className="px-6 md:px-12 flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {templates.map(t => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </section>
  )
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center gap-3 bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-3 focus-within:border-gray-500 transition-colors">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search templates — e.g. 'dark', 'minimal', 'lead gen'..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
        />
        {value && (
          <button onClick={() => onChange('')} className="text-gray-600 hover:text-gray-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 mt-3 justify-center">
        {['Dark', 'Minimal', 'Lead Gen', 'Bold', 'Elegant', 'Corporate'].map(tag => (
          <button
            key={tag}
            onClick={() => onChange(tag.toLowerCase())}
            className="text-[11px] text-gray-500 hover:text-gray-300 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/60 px-3 py-1 rounded-full transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [search, setSearch] = useState('')

  const filtered = search
    ? templatesMeta.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    : null

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="flex items-center justify-between px-6 md:px-12 h-14">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white font-semibold text-sm tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold">LG</div>
              LoanGraphs
            </Link>
            <div className="hidden md:flex items-center gap-6 text-xs text-gray-500">
              <Link href="/" className="hover:text-gray-200 transition-colors">Templates</Link>
              <a href="https://loangraphs.com/pricing" className="hover:text-gray-200 transition-colors">Pricing</a>
              <a href="https://loangraphs.com/docs" className="hover:text-gray-200 transition-colors">Docs</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://loangraphs.com/login"
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://loangraphs.com/signup"
              className="text-xs bg-white text-gray-900 font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get started free
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          9 LO-specific templates — built for mortgage pros
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
          Your professional LO website,<br />
          <span className="text-gray-500">ready in minutes</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Browse mortgage-focused templates. Pick one, preview it with your name, and go live with LoanGraphs.
        </p>
        <SearchBar value={search} onChange={setSearch} />
      </section>

      {/* ── Search Results ── */}
      {filtered !== null && (
        <section className="px-6 md:px-12 mb-12">
          <p className="text-xs text-gray-500 mb-5">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
          <div className="flex flex-wrap gap-5">
            {filtered.length === 0 ? (
              <p className="text-gray-600 text-sm">No templates match that search. Try &ldquo;dark&rdquo;, &ldquo;bold&rdquo;, or &ldquo;minimal&rdquo;.</p>
            ) : (
              filtered.map(t => <TemplateCard key={t.id} template={t} />)
            )}
          </div>
        </section>
      )}

      {/* ── Sections (hidden when searching) ── */}
      {filtered === null && (
        <>
          <TemplateSection title="Trending" templates={trending} browseHref="/?filter=trending" />
          <TemplateSection title="Free Templates" templates={freeTemplates} browseHref="/?filter=free" />
          <TemplateSection title="Pro Templates" templates={proTemplates} browseHref="/?filter=pro" />
          {newTemplates.length > 0 && (
            <TemplateSection title="New" templates={newTemplates} browseHref="/?filter=new" />
          )}
        </>
      )}

      {/* ── Stats bar ── */}
      <section className="border-t border-gray-800/60 py-14 px-6 md:px-12 mt-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '9', label: 'Templates' },
            { value: '3', label: 'Free' },
            { value: '6', label: 'Pro' },
            { value: '100%', label: 'Mortgage-Focused' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to go live?</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Sign up free — pick a template, add your info, and your professional LO website goes live instantly.
          </p>
          <a
            href="https://loangraphs.com/signup"
            className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Get started free →
          </a>
          <p className="text-xs text-gray-700 mt-4">No credit card required · Free tier includes 5,000 monthly visitors</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800/60 py-10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-700">© {new Date().getFullYear()} LoanGraphs. All rights reserved.</div>
          <div className="flex gap-6 text-xs text-gray-700">
            <a href="https://loangraphs.com" className="hover:text-gray-400 transition-colors">loangraphs.com</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
