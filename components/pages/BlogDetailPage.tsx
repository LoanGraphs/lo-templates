'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { getPostBySlug } from '@/lib/blog'

interface Props { theme: TemplateTheme; basePath: string; slug: string }

export default function BlogDetailPage({ theme, basePath, slug }: Props) {
  const c = theme.colors
  const post = getPostBySlug(slug)

  if (!post) return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh', padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ color: c.headingText, fontSize: '1.5rem', fontWeight: 700 }}>Article Not Found</h1>
      <Link href={`${basePath}/blog`} style={{ color: c.primary, marginTop: '1rem', display: 'inline-block' }}>← Back to Blog</Link>
    </div>
  )

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link href={`${basePath}/blog`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Blog</Link>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '0.75rem' }}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ backgroundColor: c.primaryLight, color: c.primary, fontSize: '0.7rem', fontWeight: 600, borderRadius: theme.borderRadius.full, padding: '0.2rem 0.6rem' }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ color: c.heroText, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, fontFamily: theme.fonts.heading, lineHeight: 1.2 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', color: c.heroMuted, fontSize: '0.85rem' }}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.publishedDate}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <p style={{ color: c.bodyText, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>{post.excerpt}</p>
        {post.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: c.headingText, fontSize: '1.35rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '0.75rem' }}>{section.heading}</h2>
            {section.body.split('\n\n').map((para, j) => (
              <p key={j} style={{ color: c.bodyText, fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>{para}</p>
            ))}
          </div>
        ))}

        {/* CTA */}
        <div style={{ backgroundColor: c.sectionAltBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ color: c.headingText, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ready to take the next step?</h3>
          <p style={{ color: c.mutedText, marginBottom: '1rem', fontSize: '0.9rem' }}>Get pre-approved in minutes.</p>
          <Link href={`${basePath}/get-started/purchase`} style={{ backgroundColor: c.primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Get Pre-Approved →
          </Link>
        </div>
      </article>
    </div>
  )
}
