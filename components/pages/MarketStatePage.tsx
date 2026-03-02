'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { ALL_STATES } from '@/lib/states'

interface Props { theme: TemplateTheme; basePath: string; stateSlug: string; countySlug?: string }

// Sample counties for demo (in real deployment this comes from API/data)
const SAMPLE_COUNTIES = ['maricopa', 'los-angeles', 'harris', 'cook', 'miami-dade', 'king', 'clark', 'tarrant', 'bexar', 'orange']
const countyName = (slug: string) => slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

export default function MarketStatePage({ theme, basePath, stateSlug, countySlug }: Props) {
  const c = theme.colors
  const stateData = ALL_STATES.find(s => s.slug === stateSlug)

  if (!stateData) return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh', padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ color: c.headingText }}>State Not Found</h1>
      <Link href={`${basePath}/markets`} style={{ color: c.primary }}>← Back to Markets</Link>
    </div>
  )

  if (countySlug) {
    // County detail page
    const name = countyName(countySlug)
    return (
      <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
        <div style={{ background: c.heroBg }} className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link href={`${basePath}/markets/${stateSlug}`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← {stateData.name}</Link>
            <h1 style={{ color: c.heroText, fontSize: '2rem', fontWeight: 800, fontFamily: theme.fonts.heading, marginTop: '0.5rem' }}>
              {name} County, {stateData.abbreviation} — Mortgage Market Data
            </h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Median Home Price', value: '$425,000' },
              { label: 'Avg. Rate', value: '6.875%' },
              { label: 'Median Payment', value: '$2,850/mo' },
              { label: 'Price Change (YoY)', value: '+4.2%' },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ color: c.primary, fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: c.mutedText, fontSize: '0.75rem', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: c.sectionAltBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.5rem' }}>Get pre-approved for a home in {name} County</h3>
            <Link href={`${basePath}/get-started/purchase`} style={{ display: 'inline-block', backgroundColor: c.primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none', marginTop: '0.75rem' }}>
              Get Pre-Approved →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // State page with county links
  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link href={`${basePath}/markets`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← All States</Link>
          <h1 style={{ color: c.heroText, fontSize: '2rem', fontWeight: 800, fontFamily: theme.fonts.heading, marginTop: '0.5rem' }}>
            {stateData.name} Mortgage Market Data
          </h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Explore market data by county in {stateData.name}.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Median Home Price', value: '$385,000' },
            { label: 'Avg. Mortgage Rate', value: '6.875%' },
            { label: 'Homes Sold (Mo)', value: '12,450' },
            { label: 'Price Change (YoY)', value: '+3.8%' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ color: c.primary, fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: c.mutedText, fontSize: '0.75rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '1rem' }}>Counties in {stateData.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SAMPLE_COUNTIES.map(county => (
            <Link key={county} href={`${basePath}/markets/${stateSlug}/${county}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md, padding: '0.75rem 1rem' }} className="hover:shadow-md transition-shadow">
                <div style={{ color: c.headingText, fontWeight: 600, fontSize: '0.9rem' }}>{countyName(county)}</div>
                <div style={{ color: c.mutedText, fontSize: '0.75rem' }}>View Data →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
