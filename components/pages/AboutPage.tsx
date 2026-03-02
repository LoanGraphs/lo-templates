'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { TemplateTheme } from '@/lib/themes'
import type { TemplateProps } from '../templates/types'

interface Props { theme: TemplateTheme; data: TemplateProps; basePath: string }

const processSteps = [
  { step: '01', title: 'Application & Pre-Approval', desc: 'Submit your documents and application. Get a pre-approval letter within 24-48 hours.' },
  { step: '02', title: 'Find Your Home', desc: 'Shop with confidence. Your pre-approval shows sellers you are serious.' },
  { step: '03', title: 'Loan Processing', desc: 'Once under contract, your loan package goes to underwriting. Appraisal is ordered.' },
  { step: '04', title: 'Underwriting & Approval', desc: 'Underwriting reviews all documents. Most conditions are straightforward.' },
  { step: '05', title: 'Clear to Close', desc: 'Closing Disclosure sent 3 days before closing. Sign and get your keys.' },
]

export default function AboutPage({ theme, data, basePath }: Props) {
  const c = theme.colors
  const lo = data.loanOfficer

  return (
    <div style={{ backgroundColor: c.bodyBg }}>
      {/* Hero */}
      <section style={{ background: c.heroBg }} className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div style={{ display: 'inline-block', backgroundColor: c.primaryLight, border: `1px solid ${c.primaryBorder}`, borderRadius: theme.borderRadius.full, padding: '0.3rem 0.875rem', marginBottom: '1rem' }}>
                <span style={{ color: c.primary, fontSize: '0.8rem', fontWeight: 600 }}>About</span>
              </div>
              <h1 style={{ color: c.heroText, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, fontFamily: theme.fonts.heading }} className="mb-5">
                A Loan Officer Who Actually Picks Up the Phone
              </h1>
              <p style={{ color: c.heroMuted, lineHeight: 1.7, marginBottom: '1.5rem' }}>{lo.bio}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${lo.phone.replace(/[^0-9]/g, '')}`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.6rem 1.25rem', borderRadius: theme.borderRadius.md, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  📞 {lo.phone}
                </a>
                <a href={`mailto:${lo.email}`} style={{ border: `1px solid ${c.primaryBorder}`, color: c.heroText, padding: '0.6rem 1.25rem', borderRadius: theme.borderRadius.md, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                  ✉️ Email
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: `${lo.yearsInIndustry}+`, label: 'Years Experience' },
                { value: `${lo.licensedStates.length}`, label: 'States Licensed' },
                { value: `${lo.loanTypes.length}`, label: 'Loan Programs' },
                { value: '5★', label: 'Client Rating' },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ color: c.primary, fontSize: '2rem', fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: c.mutedText, fontSize: '0.8rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ color: c.headingText, fontSize: '1.75rem', fontWeight: 800, fontFamily: theme.fonts.heading }} className="mb-5">Credentials & Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-2">
                {lo.certifications.map(cert => (
                  <li key={cert} className="flex items-start gap-2.5">
                    <span style={{ color: c.primary }}>✓</span>
                    <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>{cert}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <span style={{ color: c.primary }}>✓</span>
                  <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>NMLS# {lo.nmls}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span style={{ color: c.primary }}>✓</span>
                  <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>Licensed in {lo.licensedStates.join(', ')}</span>
                </li>
              </ul>
            </div>
            <div>
              <Image src={lo.photo} alt={lo.name} width={300} height={300} style={{ borderRadius: theme.borderRadius.xl }} />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section style={{ backgroundColor: c.sectionAltBg }} className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ color: c.headingText, fontSize: '1.75rem', fontWeight: 800, fontFamily: theme.fonts.heading, textAlign: 'center' }} className="mb-10">The Mortgage Process</h2>
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <div key={step.step} className="flex gap-5">
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: i === 0 ? c.primary : c.headingText, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.35rem' }}>{step.title}</h3>
                  <p style={{ color: c.mutedText, fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`${basePath}/get-started/purchase`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Start Your Application →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
