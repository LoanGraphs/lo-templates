'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { LOAN_PROGRAMS } from '@/lib/loan-programs'

interface Props { theme: TemplateTheme; basePath: string }

export default function LoansPage({ theme, basePath }: Props) {
  const c = theme.colors
  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Loan Programs</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Find the right loan for your situation — from first-time buyer programs to investment property financing.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PROGRAMS.map(program => (
            <Link key={program.slug} href={`${basePath}/loans/${program.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column' }} className="hover:shadow-lg transition-shadow">
                <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.75rem' }}>{program.icon}</div>
                <h2 style={{ color: c.headingText, fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{program.name}</h2>
                <p style={{ color: c.mutedText, fontSize: '0.875rem', marginBottom: '0.75rem' }}>{program.tagline}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {program.benefits.slice(0, 3).map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: c.primary, fontSize: '0.8rem' }}>✓</span>
                      <span style={{ color: c.mutedText, fontSize: '0.8rem' }}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ color: c.primary, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.75rem' }}>Learn More →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
