'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { TemplateTheme } from '@/lib/themes'

interface Props {
  theme: TemplateTheme
  lo: { name: string; phone: string; nmls: string }
  basePath: string // e.g. /template-1/loan-officer
}

const navLinks = [
  { label: 'Home', href: '' },
  { label: 'About', href: '/about' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'Loans', href: '/loans' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resources', href: '/resources' },
  { label: 'Markets', href: '/markets' },
]

export default function ThemedNav({ theme, lo, basePath }: Props) {
  const [open, setOpen] = useState(false)
  const c = theme.colors

  return (
    <nav style={{ backgroundColor: c.navBg, borderBottom: `1px solid ${c.cardBorder}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href={basePath} style={{ color: c.navText, fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', fontFamily: theme.fonts.heading }}>
          {lo.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(l => (
            <Link key={l.href} href={`${basePath}${l.href}`} style={{ color: c.navText, fontSize: '0.85rem', textDecoration: 'none', opacity: 0.8 }} className="hover:opacity-100 transition-opacity">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href={`${basePath}/get-started/purchase`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.5rem 1rem', borderRadius: theme.borderRadius.md, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
            Get Pre-Approved
          </Link>
          <a href={`tel:${lo.phone.replace(/[^0-9]/g, '')}`} style={{ color: c.navText, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            {lo.phone}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: c.navText, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{ backgroundColor: c.navBg, padding: '1rem' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={`${basePath}${l.href}`} onClick={() => setOpen(false)} style={{ display: 'block', color: c.navText, padding: '0.5rem 0', textDecoration: 'none', fontSize: '0.9rem' }}>
              {l.label}
            </Link>
          ))}
          <Link href={`${basePath}/get-started/purchase`} onClick={() => setOpen(false)} style={{ display: 'block', backgroundColor: c.primary, color: '#fff', padding: '0.75rem 1rem', borderRadius: theme.borderRadius.md, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginTop: '0.75rem' }}>
            Get Pre-Approved
          </Link>
        </div>
      )}
    </nav>
  )
}
