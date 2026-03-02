'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { getResourceBySlug } from '@/lib/resources'

interface Props { theme: TemplateTheme; basePath: string; slug: string }

export default function ResourceDetailPage({ theme, basePath, slug }: Props) {
  const c = theme.colors
  const resource = getResourceBySlug(slug)

  if (!resource) return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh', padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ color: c.headingText, fontSize: '1.5rem', fontWeight: 700 }}>Resource Not Found</h1>
      <Link href={`${basePath}/resources`} style={{ color: c.primary, marginTop: '1rem', display: 'inline-block' }}>← Back to Resources</Link>
    </div>
  )

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link href={`${basePath}/resources`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Resources</Link>
          <h1 style={{ color: c.heroText, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, fontFamily: theme.fonts.heading, marginTop: '1rem', lineHeight: 1.2 }}>{resource.title}</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.5rem', fontSize: '0.9rem' }}>{resource.readTime}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <p style={{ color: c.bodyText, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>{resource.excerpt}</p>
        {resource.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: c.headingText, fontSize: '1.35rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '0.75rem' }}>{section.heading}</h2>
            {section.body.split('\n\n').map((para, j) => (
              <p key={j} style={{ color: c.bodyText, fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>{para}</p>
            ))}
            {section.items && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
                {section.items.map((item, k) => (
                  <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: c.primary, flexShrink: 0 }}>✓</span>
                    <span style={{ color: c.bodyText, fontSize: '0.9rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>
    </div>
  )
}
