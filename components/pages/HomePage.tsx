'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { TemplateTheme } from '@/lib/themes'
import type { TemplateProps } from '../templates/types'

interface Props {
  theme: TemplateTheme
  data: TemplateProps
  basePath: string
}

export default function HomePage({ theme, data, basePath }: Props) {
  const c = theme.colors
  const lo = data.loanOfficer
  const stats = [
    { value: `${lo.yearsInIndustry}+`, label: 'Years Experience' },
    { value: `${lo.licensedStates.length}`, label: 'States Licensed' },
    { value: `${lo.loanTypes.length}`, label: 'Loan Programs' },
    { value: '5★', label: 'Client Rating' },
  ]

  return (
    <div style={{ backgroundColor: c.bodyBg }}>
      {/* Hero */}
      <section style={{ background: c.heroBg }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: c.primaryLight, border: `1px solid ${c.primaryBorder}`, borderRadius: theme.borderRadius.full, padding: '0.35rem 0.9rem', marginBottom: '1.25rem' }}>
                <span style={{ color: c.primary, fontSize: '0.8rem', fontWeight: 600 }}>NMLS #{lo.nmls}</span>
              </div>
              <h1 style={{ color: c.heroText, fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, fontFamily: theme.fonts.heading }} className="mb-5">
                {lo.headline || `Your Mortgage, Done Right.`}
              </h1>
              <p style={{ color: c.heroMuted, fontSize: '1.1rem', lineHeight: 1.7 }} className="mb-8 max-w-xl">
                {lo.subheadline || lo.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`${basePath}/get-started/purchase`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none' }}>
                  Get Pre-Approved →
                </Link>
                <a href={`tel:${lo.phone.replace(/[^0-9]/g, '')}`} style={{ border: `2px solid ${c.primaryBorder}`, color: c.heroText, borderRadius: theme.borderRadius.lg, padding: '0.75rem 1.5rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  📞 {lo.phone}
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src={lo.photo} alt={lo.name} width={320} height={320} style={{ borderRadius: theme.borderRadius.xl, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: c.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div style={{ color: '#fff', fontSize: '2.25rem', fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Loan Programs */}
      <section style={{ backgroundColor: c.sectionAltBg }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ color: c.headingText, fontSize: '1.875rem', fontWeight: 800, fontFamily: theme.fonts.heading }} className="mb-3">Loan Programs for Every Situation</h2>
            <p style={{ color: c.mutedText, maxWidth: '600px' }} className="mx-auto">From first-time buyers to experienced investors.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🏡', title: 'Conventional', desc: 'Flexible terms, as low as 3% down, PMI cancellable at 20% equity.', href: '/loans/conventional' },
              { icon: '🏠', title: 'FHA Loans', desc: '3.5% down for first-time buyers with flexible credit requirements.', href: '/loans/fha' },
              { icon: '🎖️', title: 'VA Loans', desc: '$0 down for veterans and active duty. No PMI ever.', href: '/loans/va' },
              { icon: '📈', title: 'DSCR Loans', desc: 'Qualify on rental income. No W-2 or tax returns required.', href: '/loans/dscr' },
              { icon: '🏰', title: 'Jumbo Loans', desc: 'Luxury homes above conforming limits with competitive rates.', href: '/loans/jumbo' },
              { icon: '🔄', title: 'Refinance', desc: 'Lower your rate, shorten your term, or access cash.', href: '/calculators/refinance' },
            ].map(svc => (
              <Link key={svc.title} href={`${basePath}${svc.href}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.5rem', height: '100%' }} className="hover:shadow-lg transition-shadow">
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{svc.icon}</div>
                  <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.5rem' }}>{svc.title}</h3>
                  <p style={{ color: c.mutedText, fontSize: '0.875rem', lineHeight: 1.6 }}>{svc.desc}</p>
                  <div style={{ color: c.primary, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.75rem' }}>Learn More →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20" style={{ backgroundColor: c.bodyBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 style={{ color: c.headingText, fontSize: '1.875rem', fontWeight: 800, fontFamily: theme.fonts.heading, textAlign: 'center' }} className="mb-10">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lo.testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '1.5rem' }}>
                <div style={{ color: '#f59e0b', marginBottom: '0.75rem' }}>{'★'.repeat(t.rating)}</div>
                <p style={{ color: c.bodyText, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ color: c.headingText, fontWeight: 700, fontSize: '0.875rem' }}>{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teasers */}
      <section style={{ backgroundColor: c.sectionAltBg }} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 style={{ color: c.headingText, fontSize: '1.875rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Mortgage Tips & Insights</h2>
              <p style={{ color: c.mutedText }}>Learn before you borrow.</p>
            </div>
            <Link href={`${basePath}/blog`} style={{ color: c.primary, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>All Articles →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.blogPosts.slice(0, 3).map(post => (
              <Link key={post.id} href={`${basePath}/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, overflow: 'hidden' }} className="hover:shadow-lg transition-shadow">
                  <div style={{ position: 'relative', height: '180px' }}>
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <p style={{ color: c.mutedText, fontSize: '0.75rem', marginBottom: '0.5rem' }}>{post.date}</p>
                    <h3 style={{ color: c.headingText, fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                    <p style={{ color: c.mutedText, fontSize: '0.85rem', lineHeight: 1.5 }}>{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: c.primary }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, fontFamily: theme.fonts.heading }} className="mb-2">Ready to Get Started?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem' }}>Get pre-approved in minutes. No commitment required.</p>
          <Link href={`${basePath}/get-started/purchase`} style={{ display: 'inline-block', backgroundColor: '#fff', color: c.primary, padding: '0.75rem 2rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none' }}>
            Start Your Application →
          </Link>
        </div>
      </section>
    </div>
  )
}
