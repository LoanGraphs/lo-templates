'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'

interface Props { theme: TemplateTheme; basePath: string }

const calculators = [
  { title: 'Conventional Loan', desc: 'Calculate payments with PMI based on credit score', href: '/calculators/conventional', icon: '🏠' },
  { title: 'FHA Loan', desc: 'FHA financing with MIP — as low as 3.5% down', href: '/calculators/fha', icon: '🏛️' },
  { title: 'VA Loan', desc: '$0 down for eligible veterans with no PMI', href: '/calculators/va', icon: '🎖️' },
  { title: 'USDA Loan', desc: 'Rural housing loan with no down payment', href: '/calculators/usda', icon: '🌾' },
  { title: 'Jumbo Loan', desc: 'High-value properties above conforming limits', href: '/calculators/jumbo', icon: '🏰' },
  { title: 'Refinance', desc: 'Calculate savings, cash-out potential, and break-even', href: '/calculators/refinance', icon: '🔄' },
]

export default function CalculatorsPage({ theme, basePath }: Props) {
  const c = theme.colors
  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Mortgage Calculators</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Estimate your monthly payment for any loan type — live calculations, no sign-up required.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map(calc => (
            <Link key={calc.href} href={`${basePath}${calc.href}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.75rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="hover:shadow-lg transition-shadow">
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{calc.icon}</div>
                <h2 style={{ color: c.headingText, fontSize: '1.1rem', fontWeight: 700 }}>{calc.title}</h2>
                <p style={{ color: c.mutedText, fontSize: '0.875rem', lineHeight: 1.5, flex: 1 }}>{calc.desc}</p>
                <div style={{ color: c.primary, fontSize: '0.85rem', fontWeight: 600 }}>Calculate →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
