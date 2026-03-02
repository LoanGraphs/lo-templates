'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { getAllResources } from '@/lib/resources'

interface Props { theme: TemplateTheme; basePath: string }

const categoryIcons: Record<string, string> = { guides: '📘', calculators: '🧮', checklists: '✅', glossary: '📖' }

export default function ResourcesListPage({ theme, basePath }: Props) {
  const c = theme.colors
  const resources = getAllResources()

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Mortgage Resources</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Guides, checklists, and tools to help you navigate the mortgage process.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map(r => (
            <Link key={r.slug} href={`${basePath}/resources/${r.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.5rem', height: '100%' }} className="hover:shadow-lg transition-shadow">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{categoryIcons[r.category] || '📄'}</span>
                  <span style={{ backgroundColor: c.primaryLight, color: c.primary, fontSize: '0.7rem', fontWeight: 600, borderRadius: theme.borderRadius.full, padding: '0.2rem 0.6rem', textTransform: 'uppercase' }}>{r.category}</span>
                </div>
                <h2 style={{ color: c.headingText, fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{r.title}</h2>
                <p style={{ color: c.mutedText, fontSize: '0.85rem', lineHeight: 1.5 }}>{r.excerpt.slice(0, 150)}...</p>
                <div style={{ color: c.primary, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.75rem' }}>Read Guide →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
