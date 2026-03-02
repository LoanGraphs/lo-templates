import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'

interface Props {
  theme: TemplateTheme
  lo: { name: string; phone: string; email: string; nmls: string }
  company: { name: string }
  basePath: string
}

const footerSections = [
  { title: 'Loan Programs', links: [
    { label: 'Conventional', href: '/loans/conventional' },
    { label: 'FHA', href: '/loans/fha' },
    { label: 'VA', href: '/loans/va' },
    { label: 'DSCR', href: '/loans/dscr' },
    { label: 'Jumbo', href: '/loans/jumbo' },
  ]},
  { title: 'Calculators', links: [
    { label: 'Conventional', href: '/calculators/conventional' },
    { label: 'FHA', href: '/calculators/fha' },
    { label: 'VA', href: '/calculators/va' },
    { label: 'Refinance', href: '/calculators/refinance' },
  ]},
  { title: 'Resources', links: [
    { label: 'Blog', href: '/blog' },
    { label: 'Resources', href: '/resources' },
    { label: 'Licensed States', href: '/licensed-states' },
    { label: 'Market Data', href: '/markets' },
  ]},
]

export default function ThemedFooter({ theme, lo, company, basePath }: Props) {
  const c = theme.colors
  return (
    <footer style={{ backgroundColor: c.footerBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 style={{ color: c.navText, fontWeight: 800, fontSize: '1.1rem', fontFamily: theme.fonts.heading, marginBottom: '0.75rem' }}>{lo.name}</h3>
            <p style={{ color: c.footerText, fontSize: '0.85rem', lineHeight: 1.6 }}>{company.name}</p>
            <p style={{ color: c.footerText, fontSize: '0.8rem', marginTop: '0.5rem' }}>NMLS# {lo.nmls}</p>
            <div style={{ marginTop: '1rem' }}>
              <a href={`tel:${lo.phone.replace(/[^0-9]/g, '')}`} style={{ color: c.primary, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'block' }}>{lo.phone}</a>
              <a href={`mailto:${lo.email}`} style={{ color: c.footerText, fontSize: '0.85rem', textDecoration: 'none', display: 'block', marginTop: '0.25rem' }}>{lo.email}</a>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h4 style={{ color: c.navText, fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {section.links.map(link => (
                  <li key={link.href} style={{ marginBottom: '0.4rem' }}>
                    <Link href={`${basePath}${link.href}`} style={{ color: c.footerText, fontSize: '0.85rem', textDecoration: 'none' }} className="hover:opacity-80 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${c.cardBorder}`, marginTop: '2rem', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem' }}>
          <p style={{ color: c.footerText, fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href={`${basePath}/accessibility-statement`} style={{ color: c.footerText, fontSize: '0.75rem', textDecoration: 'none' }}>Accessibility</Link>
            <span style={{ color: c.footerText, fontSize: '0.75rem' }}>Equal Housing Lender</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
