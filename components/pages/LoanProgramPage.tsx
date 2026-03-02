'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { LOAN_PROGRAMS } from '@/lib/loan-programs'
import { ALL_STATES } from '@/lib/states'

interface Props { theme: TemplateTheme; basePath: string; programSlug: string; stateSlug?: string }

export default function LoanProgramPage({ theme, basePath, programSlug, stateSlug }: Props) {
  const c = theme.colors
  const program = LOAN_PROGRAMS.find(p => p.slug === programSlug)

  if (!program) return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh', padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ color: c.headingText, fontSize: '1.5rem', fontWeight: 700 }}>Program Not Found</h1>
      <Link href={`${basePath}/loans`} style={{ color: c.primary }}>← Back to Loans</Link>
    </div>
  )

  const stateData = stateSlug ? ALL_STATES.find(s => s.slug === stateSlug) : undefined
  const stateName = stateData?.name || 'Your Area'
  const faqs = program.faqs(stateName)

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link href={`${basePath}/loans`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← All Loan Programs</Link>
          <div style={{ fontSize: '3rem', marginTop: '1rem' }}>{program.icon}</div>
          <h1 style={{ color: c.heroText, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: theme.fonts.heading, marginTop: '0.5rem' }}>
            {stateData ? program.headline(stateName) : program.name}
          </h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem', fontSize: '1.05rem', maxWidth: '600px' }}>
            {program.intro(stateName)}
          </p>
          <Link href={`${basePath}/get-started/purchase`} style={{ display: 'inline-block', backgroundColor: c.primary, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none', marginTop: '1.5rem' }}>
            {program.ctaText} →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Benefits + Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Benefits</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {program.benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Requirements</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {program.requirements.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: c.primary }}>•</span>
                  <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} style={{ backgroundColor: c.sectionAltBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md, padding: '1.25rem' }}>
                <h3 style={{ color: c.headingText, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{faq.q}</h3>
                <p style={{ color: c.bodyText, fontSize: '0.9rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* State Links (if showing program overview, not state-specific) */}
        {!stateSlug && (
          <div>
            <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>{program.name} by State</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {ALL_STATES.map(s => (
                <Link key={s.slug} href={`${basePath}/loans/${programSlug}/${s.slug}`} style={{
                  backgroundColor: c.primaryLight, color: c.primary, fontSize: '0.75rem', fontWeight: 600,
                  borderRadius: theme.borderRadius.full, padding: '0.25rem 0.75rem', textDecoration: 'none',
                  border: `1px solid ${c.primaryBorder}`,
                }}>
                  {s.abbreviation}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
