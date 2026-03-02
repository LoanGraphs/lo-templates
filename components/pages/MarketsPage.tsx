'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { ALL_STATES } from '@/lib/states'

interface Props { theme: TemplateTheme; basePath: string }

export default function MarketsPage({ theme, basePath }: Props) {
  const c = theme.colors
  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Market Data</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Explore mortgage market data by state and county.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Select a State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {ALL_STATES.map(s => (
            <Link key={s.slug} href={`${basePath}/markets/${s.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md, padding: '0.75rem 1rem', textAlign: 'center' }} className="hover:shadow-md transition-shadow">
                <div style={{ color: c.primary, fontWeight: 800, fontSize: '1.1rem' }}>{s.abbreviation}</div>
                <div style={{ color: c.mutedText, fontSize: '0.75rem' }}>{s.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
