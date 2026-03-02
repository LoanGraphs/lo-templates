'use client'

import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import { getAllPosts } from '@/lib/blog'

interface Props { theme: TemplateTheme; basePath: string }

export default function BlogListPage({ theme, basePath }: Props) {
  const c = theme.colors
  const posts = getAllPosts()

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2.25rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Mortgage Blog</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.75rem' }}>Expert insights on home loans, rates, and real estate investing.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`${basePath}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.lg, overflow: 'hidden', height: '100%' }} className="hover:shadow-lg transition-shadow">
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ backgroundColor: c.primaryLight, color: c.primary, fontSize: '0.7rem', fontWeight: 600, borderRadius: theme.borderRadius.full, padding: '0.2rem 0.6rem' }}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={{ color: c.headingText, fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: c.mutedText, fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{post.excerpt.slice(0, 120)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: c.mutedText, fontSize: '0.75rem' }}>{post.publishedDate}</span>
                    <span style={{ color: c.mutedText, fontSize: '0.75rem' }}>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
