'use client'

import type { TemplateTheme } from '@/lib/themes'

interface Props { theme: TemplateTheme }

export default function AccessibilityPage({ theme }: Props) {
  const c = theme.colors
  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '2rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>Accessibility Statement</h1>
        </div>
      </div>
      <article className="max-w-3xl mx-auto px-4 py-10">
        {[
          { heading: 'Our Commitment', body: 'We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.' },
          { heading: 'Standards', body: 'This website strives to conform to WCAG 2.1 Level AA guidelines. These guidelines help make web content more accessible to a wider range of people with disabilities.' },
          { heading: 'Features', body: 'We have taken the following measures to ensure accessibility: semantic HTML structure, ARIA landmarks, sufficient color contrast ratios, keyboard navigability, descriptive alt text for images, and responsive design for all screen sizes.' },
          { heading: 'Feedback', body: 'We welcome your feedback on the accessibility of this site. If you encounter accessibility barriers, please contact us so we can improve.' },
          { heading: 'Equal Housing', body: 'We are an Equal Housing Lender. All loan programs are subject to credit approval and property appraisal. Terms and conditions apply.' },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: c.headingText, fontSize: '1.25rem', fontWeight: 700, fontFamily: theme.fonts.heading, marginBottom: '0.5rem' }}>{section.heading}</h2>
            <p style={{ color: c.bodyText, fontSize: '0.95rem', lineHeight: 1.7 }}>{section.body}</p>
          </div>
        ))}
      </article>
    </div>
  )
}
