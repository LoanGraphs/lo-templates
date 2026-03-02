'use client'

import { useState } from 'react'
import type { TemplateTheme } from '@/lib/themes'

interface Props { theme: TemplateTheme; basePath: string; funnelType: string }

const funnelConfig: Record<string, { title: string; subtitle: string; steps: { label: string; options: string[] }[] }> = {
  purchase: {
    title: 'Get Pre-Approved for a Home Purchase',
    subtitle: 'Answer a few questions to get started. Takes about 2 minutes.',
    steps: [
      { label: 'What type of home are you looking for?', options: ['Single Family', 'Condo/Townhouse', 'Multi-Family (2-4 units)', 'New Construction'] },
      { label: 'Is this your first home?', options: ['Yes, first-time buyer', 'No, I have owned before', 'Currently own, buying another'] },
      { label: 'Estimated purchase price?', options: ['Under $250K', '$250K - $400K', '$400K - $600K', '$600K - $1M', 'Over $1M'] },
      { label: 'How much do you have for a down payment?', options: ['Less than 3%', '3% - 5%', '5% - 10%', '10% - 20%', '20% or more'] },
      { label: 'Estimated credit score?', options: ['760+', '720 - 759', '680 - 719', '640 - 679', 'Below 640', 'Not sure'] },
    ],
  },
  refinance: {
    title: 'See If Refinancing Makes Sense',
    subtitle: 'Quick check to see if you could save money.',
    steps: [
      { label: 'What is your goal?', options: ['Lower my rate', 'Cash out equity', 'Shorter loan term', 'Remove PMI', 'Consolidate debt'] },
      { label: 'Current loan type?', options: ['Conventional', 'FHA', 'VA', 'Other / Not sure'] },
      { label: 'Estimated home value?', options: ['Under $250K', '$250K - $400K', '$400K - $600K', '$600K - $1M', 'Over $1M'] },
      { label: 'Current interest rate?', options: ['Below 5%', '5% - 6%', '6% - 7%', '7% - 8%', 'Above 8%', 'Not sure'] },
      { label: 'Estimated credit score?', options: ['760+', '720 - 759', '680 - 719', '640 - 679', 'Below 640', 'Not sure'] },
    ],
  },
  investment: {
    title: 'Finance Your Investment Property',
    subtitle: 'DSCR and investor-friendly loan options.',
    steps: [
      { label: 'Property type?', options: ['Single Family Rental', 'Small Multi-Family (2-4)', 'Short-Term Rental (Airbnb)', 'Fix & Flip', 'Commercial'] },
      { label: 'How many investment properties do you own?', options: ['0 - First one', '1-4', '5-10', '10+'] },
      { label: 'Estimated purchase price?', options: ['Under $250K', '$250K - $500K', '$500K - $1M', 'Over $1M'] },
      { label: 'Down payment available?', options: ['15% - 20%', '20% - 25%', '25% or more'] },
      { label: 'Do you need to qualify on rental income (DSCR)?', options: ['Yes, no W-2 / self-employed', 'No, I can provide full income docs', 'Not sure'] },
    ],
  },
}

export default function GetStartedPage({ theme, basePath: _basePath, funnelType }: Props) {
  void _basePath
  const c = theme.colors
  const config = funnelConfig[funnelType] || funnelConfig.purchase
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const done = step >= config.steps.length

  const selectOption = (option: string) => {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)
    setStep(step + 1)
  }

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 style={{ color: c.heroText, fontSize: '1.75rem', fontWeight: 800, fontFamily: theme.fonts.heading }}>{config.title}</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.5rem' }}>{config.subtitle}</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">
        {/* Progress */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem' }}>
          {config.steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: i <= step ? c.primary : c.cardBorder }} />
          ))}
        </div>

        {!done ? (
          <div>
            <h2 style={{ color: c.headingText, fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
              {config.steps[step].label}
            </h2>
            <div className="flex flex-col gap-3">
              {config.steps[step].options.map(opt => (
                <button key={opt} onClick={() => selectOption(opt)} style={{
                  backgroundColor: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.md,
                  padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: c.bodyText, fontSize: '0.95rem',
                  fontWeight: 500, width: '100%',
                }} className="hover:shadow-md transition-shadow">
                  {opt}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)) }} style={{ color: c.mutedText, background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem', fontSize: '0.85rem' }}>
                ← Back
              </button>
            )}
          </div>
        ) : (
          <div>
            <h2 style={{ color: c.headingText, fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Almost there! Enter your contact info.</h2>
            <p style={{ color: c.mutedText, fontSize: '0.85rem', marginBottom: '1.5rem' }}>A loan officer will review your answers and reach out within 24 hours.</p>
            <div className="flex flex-col gap-3">
              {(['name', 'email', 'phone'] as const).map(field => (
                <input key={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
                  value={contact[field]} onChange={e => setContact({ ...contact, [field]: e.target.value })}
                  style={{
                    backgroundColor: theme.style === 'dark' ? '#0f172a' : '#f8fafc',
                    border: `1px solid ${c.cardBorder}`, borderRadius: theme.borderRadius.sm,
                    padding: '0.75rem 1rem', fontSize: '0.9rem', color: c.bodyText, width: '100%',
                  }}
                />
              ))}
              <button style={{
                backgroundColor: c.primary, color: '#fff', padding: '0.875rem', borderRadius: theme.borderRadius.md,
                fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem',
              }}>
                Submit Application →
              </button>
            </div>
            <button onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)) }} style={{ color: c.mutedText, background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem', fontSize: '0.85rem' }}>
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
