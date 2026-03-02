/**
 * Theme system for LO website templates.
 * Each template defines colors, fonts, border radius, and layout variant.
 * Shared page components use these to render fully-themed pages.
 */

export interface TemplateTheme {
  id: string
  name: string
  description: string
  colors: {
    primary: string       // Main brand color (buttons, links, accents)
    primaryHover: string   // Hover state
    primaryLight: string   // Light bg tint (badges, cards)
    primaryBorder: string  // Border tint
    accent: string        // Secondary accent
    heroBg: string        // Hero background
    heroText: string      // Hero text color
    heroMuted: string     // Hero secondary text
    cardBg: string        // Card background
    cardBorder: string    // Card border
    sectionAltBg: string  // Alternating section bg
    navBg: string         // Navbar background
    navText: string       // Navbar text
    footerBg: string      // Footer background
    footerText: string    // Footer text
    bodyBg: string        // Main body bg
    bodyText: string      // Main body text
    mutedText: string     // Secondary text
    headingText: string   // Heading color
  }
  fonts: {
    heading: string  // CSS font-family for headings
    body: string     // CSS font-family for body text
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  style: 'dark' | 'light' | 'mixed'  // Overall page feel
}

// ─── 16 Template Themes ──────────────────────────────────────────────────────

export const THEMES: Record<string, TemplateTheme> = {
  'template-1': {
    id: 'template-1',
    name: 'Midnight Pro',
    description: 'Dark, modern tech aesthetic with electric blue accents',
    colors: {
      primary: '#0ea5e9', primaryHover: '#0284c7', primaryLight: 'rgba(14,165,233,0.12)',
      primaryBorder: 'rgba(14,165,233,0.3)', accent: '#8b5cf6',
      heroBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      heroText: '#ffffff', heroMuted: '#94a3b8',
      cardBg: '#1e293b', cardBorder: '#334155', sectionAltBg: '#0f172a',
      navBg: '#0f172a', navText: '#e2e8f0', footerBg: '#0f172a', footerText: '#94a3b8',
      bodyBg: '#0f172a', bodyText: '#e2e8f0', mutedText: '#94a3b8', headingText: '#ffffff',
    },
    fonts: { heading: 'system-ui, -apple-system, sans-serif', body: 'system-ui, -apple-system, sans-serif' },
    borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem', full: '999px' },
    style: 'dark',
  },
  'template-2': {
    id: 'template-2',
    name: 'Ocean Breeze',
    description: 'Coastal vibes with teal and sandy undertones',
    colors: {
      primary: '#0d9488', primaryHover: '#0f766e', primaryLight: 'rgba(13,148,136,0.1)',
      primaryBorder: 'rgba(13,148,136,0.3)', accent: '#f59e0b',
      heroBg: 'linear-gradient(135deg, #042f2e 0%, #134e4a 100%)',
      heroText: '#ffffff', heroMuted: '#99f6e4',
      cardBg: '#f0fdfa', cardBorder: '#ccfbf1', sectionAltBg: '#f0fdfa',
      navBg: '#042f2e', navText: '#ccfbf1', footerBg: '#042f2e', footerText: '#99f6e4',
      bodyBg: '#ffffff', bodyText: '#374151', mutedText: '#6b7280', headingText: '#0f172a',
    },
    fonts: { heading: 'Georgia, "Times New Roman", serif', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem', full: '999px' },
    style: 'mixed',
  },
  'template-3': {
    id: 'template-3',
    name: 'Crimson Edge',
    description: 'Bold red and charcoal with sharp edges',
    colors: {
      primary: '#dc2626', primaryHover: '#b91c1c', primaryLight: 'rgba(220,38,38,0.08)',
      primaryBorder: 'rgba(220,38,38,0.25)', accent: '#f97316',
      heroBg: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
      heroText: '#ffffff', heroMuted: '#a8a29e',
      cardBg: '#ffffff', cardBorder: '#e7e5e4', sectionAltBg: '#fafaf9',
      navBg: '#1c1917', navText: '#e7e5e4', footerBg: '#1c1917', footerText: '#a8a29e',
      bodyBg: '#ffffff', bodyText: '#44403c', mutedText: '#78716c', headingText: '#1c1917',
    },
    fonts: { heading: '"Helvetica Neue", Arial, sans-serif', body: '"Helvetica Neue", Arial, sans-serif' },
    borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '999px' },
    style: 'mixed',
  },
  'template-4': {
    id: 'template-4',
    name: 'Forest Trust',
    description: 'Earthy greens with warm cream backgrounds',
    colors: {
      primary: '#16a34a', primaryHover: '#15803d', primaryLight: 'rgba(22,163,74,0.08)',
      primaryBorder: 'rgba(22,163,74,0.2)', accent: '#ca8a04',
      heroBg: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
      heroText: '#ffffff', heroMuted: '#bbf7d0',
      cardBg: '#ffffff', cardBorder: '#e5e7eb', sectionAltBg: '#f9fafb',
      navBg: '#14532d', navText: '#dcfce7', footerBg: '#14532d', footerText: '#bbf7d0',
      bodyBg: '#fffbeb', bodyText: '#374151', mutedText: '#6b7280', headingText: '#14532d',
    },
    fonts: { heading: '"Palatino Linotype", "Book Antiqua", serif', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem', full: '999px' },
    style: 'light',
  },
  'template-5': {
    id: 'template-5',
    name: 'Royal Indigo',
    description: 'Deep purple elegance with gold touches',
    colors: {
      primary: '#7c3aed', primaryHover: '#6d28d9', primaryLight: 'rgba(124,58,237,0.08)',
      primaryBorder: 'rgba(124,58,237,0.25)', accent: '#f59e0b',
      heroBg: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)',
      heroText: '#ffffff', heroMuted: '#c4b5fd',
      cardBg: '#ffffff', cardBorder: '#e9d5ff', sectionAltBg: '#faf5ff',
      navBg: '#2e1065', navText: '#e9d5ff', footerBg: '#2e1065', footerText: '#c4b5fd',
      bodyBg: '#ffffff', bodyText: '#374151', mutedText: '#6b7280', headingText: '#1e1b4b',
    },
    fonts: { heading: '"Playfair Display", Georgia, serif', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', full: '999px' },
    style: 'mixed',
  },
  'template-6': {
    id: 'template-6',
    name: 'Slate Corporate',
    description: 'Professional gray tones with blue highlight',
    colors: {
      primary: '#3b82f6', primaryHover: '#2563eb', primaryLight: 'rgba(59,130,246,0.08)',
      primaryBorder: 'rgba(59,130,246,0.2)', accent: '#10b981',
      heroBg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      heroText: '#ffffff', heroMuted: '#94a3b8',
      cardBg: '#ffffff', cardBorder: '#e2e8f0', sectionAltBg: '#f8fafc',
      navBg: '#1e293b', navText: '#e2e8f0', footerBg: '#1e293b', footerText: '#94a3b8',
      bodyBg: '#ffffff', bodyText: '#475569', mutedText: '#64748b', headingText: '#0f172a',
    },
    fonts: { heading: 'system-ui, -apple-system, sans-serif', body: 'system-ui, -apple-system, sans-serif' },
    borderRadius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '999px' },
    style: 'mixed',
  },
  'template-7': {
    id: 'template-7',
    name: 'Sunset Warm',
    description: 'Warm oranges and deep browns, inviting feel',
    colors: {
      primary: '#ea580c', primaryHover: '#c2410c', primaryLight: 'rgba(234,88,12,0.08)',
      primaryBorder: 'rgba(234,88,12,0.2)', accent: '#0ea5e9',
      heroBg: 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)',
      heroText: '#ffffff', heroMuted: '#fdba74',
      cardBg: '#ffffff', cardBorder: '#fed7aa', sectionAltBg: '#fff7ed',
      navBg: '#431407', navText: '#fed7aa', footerBg: '#431407', footerText: '#fdba74',
      bodyBg: '#fffbeb', bodyText: '#44403c', mutedText: '#78716c', headingText: '#431407',
    },
    fonts: { heading: 'Georgia, "Times New Roman", serif', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem', full: '999px' },
    style: 'light',
  },
  'template-8': {
    id: 'template-8',
    name: 'Arctic Clean',
    description: 'Ultra-minimal white with ice blue accents',
    colors: {
      primary: '#06b6d4', primaryHover: '#0891b2', primaryLight: 'rgba(6,182,212,0.06)',
      primaryBorder: 'rgba(6,182,212,0.2)', accent: '#8b5cf6',
      heroBg: '#ffffff', heroText: '#0f172a', heroMuted: '#64748b',
      cardBg: '#ffffff', cardBorder: '#f1f5f9', sectionAltBg: '#f8fafc',
      navBg: '#ffffff', navText: '#0f172a', footerBg: '#f8fafc', footerText: '#64748b',
      bodyBg: '#ffffff', bodyText: '#475569', mutedText: '#94a3b8', headingText: '#0f172a',
    },
    fonts: { heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
    borderRadius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '999px' },
    style: 'light',
  },
  'template-9': {
    id: 'template-9',
    name: 'Emerald Night',
    description: 'Dark mode with vivid emerald green',
    colors: {
      primary: '#10b981', primaryHover: '#059669', primaryLight: 'rgba(16,185,129,0.12)',
      primaryBorder: 'rgba(16,185,129,0.3)', accent: '#f59e0b',
      heroBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
      heroText: '#ffffff', heroMuted: '#6ee7b7',
      cardBg: '#1a2e35', cardBorder: '#2d4a4f', sectionAltBg: '#0c1f1a',
      navBg: '#022c22', navText: '#a7f3d0', footerBg: '#022c22', footerText: '#6ee7b7',
      bodyBg: '#0f1f1a', bodyText: '#d1fae5', mutedText: '#6ee7b7', headingText: '#ecfdf5',
    },
    fonts: { heading: '"SF Mono", "Fira Code", monospace', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '999px' },
    style: 'dark',
  },
  'template-10': {
    id: 'template-10',
    name: 'Rose Gold',
    description: 'Elegant pink-gold with warm neutrals',
    colors: {
      primary: '#e11d48', primaryHover: '#be123c', primaryLight: 'rgba(225,29,72,0.06)',
      primaryBorder: 'rgba(225,29,72,0.2)', accent: '#d97706',
      heroBg: 'linear-gradient(135deg, #4c0519 0%, #881337 100%)',
      heroText: '#ffffff', heroMuted: '#fda4af',
      cardBg: '#ffffff', cardBorder: '#fecdd3', sectionAltBg: '#fff1f2',
      navBg: '#4c0519', navText: '#fecdd3', footerBg: '#4c0519', footerText: '#fda4af',
      bodyBg: '#ffffff', bodyText: '#44403c', mutedText: '#78716c', headingText: '#1c1917',
    },
    fonts: { heading: '"Playfair Display", Georgia, serif', body: '"Lato", system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', full: '999px' },
    style: 'mixed',
  },
  'template-classic': {
    id: 'template-classic',
    name: 'Classic Navy',
    description: 'Traditional navy and gold, time-tested trust',
    colors: {
      primary: '#1e40af', primaryHover: '#1e3a8a', primaryLight: 'rgba(30,64,175,0.06)',
      primaryBorder: 'rgba(30,64,175,0.2)', accent: '#b45309',
      heroBg: 'linear-gradient(135deg, #172554 0%, #1e3a8a 100%)',
      heroText: '#ffffff', heroMuted: '#bfdbfe',
      cardBg: '#ffffff', cardBorder: '#dbeafe', sectionAltBg: '#eff6ff',
      navBg: '#172554', navText: '#dbeafe', footerBg: '#172554', footerText: '#93c5fd',
      bodyBg: '#ffffff', bodyText: '#374151', mutedText: '#6b7280', headingText: '#111827',
    },
    fonts: { heading: 'Georgia, "Times New Roman", serif', body: '"Times New Roman", serif' },
    borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '999px' },
    style: 'mixed',
  },
  'template-modern': {
    id: 'template-modern',
    name: 'Modern Stack',
    description: 'Clean SaaS aesthetic with vibrant gradients',
    colors: {
      primary: '#6366f1', primaryHover: '#4f46e5', primaryLight: 'rgba(99,102,241,0.06)',
      primaryBorder: 'rgba(99,102,241,0.2)', accent: '#ec4899',
      heroBg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      heroText: '#ffffff', heroMuted: '#a5b4fc',
      cardBg: '#ffffff', cardBorder: '#e0e7ff', sectionAltBg: '#eef2ff',
      navBg: '#0f172a', navText: '#c7d2fe', footerBg: '#0f172a', footerText: '#a5b4fc',
      bodyBg: '#ffffff', bodyText: '#475569', mutedText: '#64748b', headingText: '#0f172a',
    },
    fonts: { heading: '"Inter", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', full: '999px' },
    style: 'mixed',
  },
  'template-bold': {
    id: 'template-bold',
    name: 'Bold Impact',
    description: 'High-contrast black and yellow, attention-grabbing',
    colors: {
      primary: '#eab308', primaryHover: '#ca8a04', primaryLight: 'rgba(234,179,8,0.1)',
      primaryBorder: 'rgba(234,179,8,0.3)', accent: '#ef4444',
      heroBg: '#000000', heroText: '#ffffff', heroMuted: '#a3a3a3',
      cardBg: '#171717', cardBorder: '#262626', sectionAltBg: '#0a0a0a',
      navBg: '#000000', navText: '#fafafa', footerBg: '#000000', footerText: '#a3a3a3',
      bodyBg: '#000000', bodyText: '#e5e5e5', mutedText: '#a3a3a3', headingText: '#ffffff',
    },
    fonts: { heading: '"Impact", "Haettenschweiler", sans-serif', body: 'system-ui, sans-serif' },
    borderRadius: { sm: '0', md: '0.25rem', lg: '0.375rem', xl: '0.5rem', full: '999px' },
    style: 'dark',
  },
  'template-minimal': {
    id: 'template-minimal',
    name: 'Minimal Zen',
    description: 'Whitespace-driven design with subtle gray accents',
    colors: {
      primary: '#18181b', primaryHover: '#27272a', primaryLight: 'rgba(24,24,27,0.04)',
      primaryBorder: 'rgba(24,24,27,0.1)', accent: '#0ea5e9',
      heroBg: '#fafafa', heroText: '#18181b', heroMuted: '#71717a',
      cardBg: '#ffffff', cardBorder: '#f4f4f5', sectionAltBg: '#fafafa',
      navBg: '#ffffff', navText: '#18181b', footerBg: '#fafafa', footerText: '#71717a',
      bodyBg: '#ffffff', bodyText: '#3f3f46', mutedText: '#71717a', headingText: '#18181b',
    },
    fonts: { heading: '"Inter", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif' },
    borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '999px' },
    style: 'light',
  },
  'template-professional': {
    id: 'template-professional',
    name: 'Executive Suite',
    description: 'Polished corporate look with charcoal and steel blue',
    colors: {
      primary: '#2563eb', primaryHover: '#1d4ed8', primaryLight: 'rgba(37,99,235,0.06)',
      primaryBorder: 'rgba(37,99,235,0.2)', accent: '#059669',
      heroBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      heroText: '#ffffff', heroMuted: '#94a3b8',
      cardBg: '#ffffff', cardBorder: '#e2e8f0', sectionAltBg: '#f1f5f9',
      navBg: '#0f172a', navText: '#e2e8f0', footerBg: '#0f172a', footerText: '#94a3b8',
      bodyBg: '#ffffff', bodyText: '#475569', mutedText: '#64748b', headingText: '#0f172a',
    },
    fonts: { heading: '"Merriweather", Georgia, serif', body: '"Source Sans Pro", system-ui, sans-serif' },
    borderRadius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '999px' },
    style: 'mixed',
  },
  'template-warm': {
    id: 'template-warm',
    name: 'Warm Hearth',
    description: 'Cozy amber tones with soft rounded elements',
    colors: {
      primary: '#d97706', primaryHover: '#b45309', primaryLight: 'rgba(217,119,6,0.08)',
      primaryBorder: 'rgba(217,119,6,0.2)', accent: '#16a34a',
      heroBg: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
      heroText: '#ffffff', heroMuted: '#fcd34d',
      cardBg: '#ffffff', cardBorder: '#fde68a', sectionAltBg: '#fffbeb',
      navBg: '#451a03', navText: '#fde68a', footerBg: '#451a03', footerText: '#fcd34d',
      bodyBg: '#fffbeb', bodyText: '#44403c', mutedText: '#78716c', headingText: '#292524',
    },
    fonts: { heading: '"Nunito", "Rounded Mplus 1c", sans-serif', body: '"Nunito", system-ui, sans-serif' },
    borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', full: '999px' },
    style: 'light',
  },
}

export function getTheme(templateId: string): TemplateTheme | undefined {
  return THEMES[templateId]
}

export function getAllThemes(): TemplateTheme[] {
  return Object.values(THEMES)
}
