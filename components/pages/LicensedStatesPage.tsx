'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import type { TemplateProps } from '../templates/types'

interface Props { theme: TemplateTheme; data: TemplateProps; basePath: string }

export default function LicensedStatesPage({ theme, data, basePath }: Props) {
  const c = theme.colors
  const states = data.loanOfficer.licensedStates

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Licensed States</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Helping homebuyers in {states.length} state{states.length !== 1 ? 's' : ''} nationwide.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
          {states.map(s => (
            <span key={s} style={{
              backgroundColor: c.primaryLight, color: c.primary, fontWeight: 700, fontSize: '1rem',
              borderRadius: theme.borderRadius.full, padding: '0.5rem 1.25rem',
              border: `1px solid ${c.primaryBorder}`,
            }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Link href={`${basePath}/loans`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            View Loan Programs →
          </Link>
        </div>
      </div>
    </div>
  )
}
