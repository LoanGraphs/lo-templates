'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { TemplateTheme } from '@/lib/themes'
import {
  calculateDownPayment, calculateLoanAmount, calculateMonthlyPayment,
  calculatePMI, calculateMonthlyPropertyTax, calculateMonthlyInsurance,
  calculateTotalMonthlyPayment, calculateLTV, formatCurrency, numberWithCommas,
  PMI_RATE_TABLE, calculateFhaLoanAmount, calculateVaLoanAmount, calculateUsdaLoanAmount,
  calculateUsdaMonthlyInsurance, calculateBreakEven,
} from '@/lib/mortgageHelpers'
import { ALL_STATES } from '@/lib/states'

interface Props { theme: TemplateTheme; basePath: string; calcType: string }

const CALC_TITLES: Record<string, string> = {
  conventional: 'Conventional Loan Calculator',
  fha: 'FHA Loan Calculator',
  va: 'VA Loan Calculator',
  usda: 'USDA Loan Calculator',
  jumbo: 'Jumbo Loan Calculator',
  refinance: 'Refinance Calculator',
}

export default function CalculatorDetailPage({ theme, basePath, calcType }: Props) {
  const c = theme.colors
  const title = CALC_TITLES[calcType] || 'Mortgage Calculator'

  const [homePrice, setHomePrice] = useState(calcType === 'jumbo' ? 1200000 : 450000)
  const [downPct, setDownPct] = useState(calcType === 'va' ? 0 : calcType === 'usda' ? 0 : calcType === 'fha' ? 3.5 : 15)
  const [loanTerm, setLoanTerm] = useState(30)
  const [rate, setRate] = useState(calcType === 'va' ? 6.5 : calcType === 'jumbo' ? 7.0 : 6.875)
  const [propTax, setPropTax] = useState(5500)
  const [insurance, setInsurance] = useState(1925)
  const [hoa, setHoa] = useState(0)
  const [creditPMI, setCreditPMI] = useState(0.52)
  const [state, setState] = useState('CA')

  // Refinance-specific
  const [currentBalance, setCurrentBalance] = useState(350000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [refiCosts, setRefiCosts] = useState(6000)

  const dpAmount = useMemo(() => calculateDownPayment(homePrice, downPct, '%'), [homePrice, downPct])

  const loanAmount = useMemo(() => {
    if (calcType === 'fha') return calculateFhaLoanAmount(homePrice, dpAmount)
    if (calcType === 'va') return calculateVaLoanAmount(homePrice, dpAmount, 2.15).vaLoanAmount
    if (calcType === 'usda') return calculateUsdaLoanAmount(homePrice, dpAmount).usdaLoanAmount
    if (calcType === 'refinance') return currentBalance
    return calculateLoanAmount(homePrice, dpAmount)
  }, [homePrice, dpAmount, calcType, currentBalance])

  const ltv = useMemo(() => calculateLTV(calcType === 'refinance' ? currentBalance : loanAmount, homePrice), [loanAmount, homePrice, currentBalance, calcType])
  const pmiApplies = calcType === 'conventional' && ltv > 80

  const monthlyPI = useMemo(() => calculateMonthlyPayment(loanAmount, rate, loanTerm), [loanAmount, rate, loanTerm])
  const monthlyTax = useMemo(() => calculateMonthlyPropertyTax(propTax), [propTax])
  const monthlyIns = useMemo(() => calculateMonthlyInsurance(insurance), [insurance])
  const monthlyPMI = useMemo(() => {
    if (calcType === 'fha') return (loanAmount * 0.0055) / 12
    if (calcType === 'usda') return calculateUsdaMonthlyInsurance(loanAmount)
    if (pmiApplies) return calculatePMI(loanAmount, creditPMI)
    return 0
  }, [loanAmount, creditPMI, pmiApplies, calcType])

  const totalMonthly = useMemo(() => calculateTotalMonthlyPayment(monthlyPI, monthlyTax, monthlyIns, hoa, monthlyPMI), [monthlyPI, monthlyTax, monthlyIns, hoa, monthlyPMI])

  // Refinance savings
  const currentPayment = useMemo(() => calcType === 'refinance' ? calculateMonthlyPayment(currentBalance, currentRate, 30) : 0, [currentBalance, currentRate, calcType])
  const monthlySavings = calcType === 'refinance' ? currentPayment - monthlyPI : 0
  const breakEven = calcType === 'refinance' ? calculateBreakEven(refiCosts, monthlySavings) : null

  const inputStyle: React.CSSProperties = {
    backgroundColor: theme.style === 'dark' ? '#0f172a' : '#f8fafc',
    border: `1px solid ${c.cardBorder}`,
    borderRadius: theme.borderRadius.sm,
    padding: '0.5rem 0.625rem',
    width: '100%',
    fontSize: '0.875rem',
    color: c.bodyText,
    outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    color: c.mutedText, fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem',
    textTransform: 'uppercase', letterSpacing: '0.04em',
  }

  return (
    <div style={{ backgroundColor: c.bodyBg, minHeight: '100vh' }}>
      <div style={{ background: c.heroBg }} className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <Link href={`${basePath}/calculators`} style={{ color: c.primary, fontSize: '0.85rem', textDecoration: 'none' }}>← All Calculators</Link>
          <h1 style={{ color: c.heroText, fontSize: '1.75rem', fontWeight: 800, fontFamily: theme.fonts.heading, marginTop: '0.5rem' }}>{title}</h1>
          <p style={{ color: c.heroMuted, marginTop: '0.5rem', maxWidth: '540px' }}>Live calculations update as you type.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div style={{ backgroundColor: c.cardBg, borderRadius: theme.borderRadius.lg, padding: '1.5rem', border: `1px solid ${c.cardBorder}` }}>
            <h2 style={{ color: c.headingText, fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Loan Details</h2>
            <div className="flex flex-col gap-4">
              {calcType === 'refinance' ? (
                <>
                  <div>
                    <label style={labelStyle}>Current Loan Balance</label>
                    <input type="number" value={currentBalance} onChange={e => setCurrentBalance(+e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Current Rate (%)</label>
                    <input type="number" step={0.125} value={currentRate} onChange={e => setCurrentRate(+e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>New Rate (%)</label>
                    <input type="number" step={0.125} value={rate} onChange={e => setRate(+e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Refinance Costs ($)</label>
                    <input type="number" value={refiCosts} onChange={e => setRefiCosts(+e.target.value)} style={inputStyle} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={labelStyle}>Home Price</label>
                    <input type="number" min={50000} max={5000000} step={5000} value={homePrice} onChange={e => setHomePrice(+e.target.value)} style={inputStyle} />
                    <input type="range" min={100000} max={calcType === 'jumbo' ? 5000000 : 2000000} step={10000} value={homePrice} onChange={e => setHomePrice(+e.target.value)} style={{ width: '100%', accentColor: c.primary, marginTop: '0.4rem' }} />
                  </div>
                  {calcType !== 'va' && (
                    <div>
                      <label style={labelStyle}>Down Payment (%)</label>
                      <input type="number" min={0} max={50} step={0.5} value={downPct} onChange={e => setDownPct(+e.target.value)} style={inputStyle} />
                      <p style={{ color: c.mutedText, fontSize: '0.75rem', marginTop: '0.25rem' }}>= {formatCurrency(dpAmount)}</p>
                    </div>
                  )}
                  <div>
                    <label style={labelStyle}>Interest Rate (%)</label>
                    <input type="number" min={1} max={20} step={0.125} value={rate} onChange={e => setRate(+e.target.value)} style={inputStyle} />
                  </div>
                </>
              )}

              <div>
                <label style={labelStyle}>Loan Term</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[15, 20, 30].map(yr => (
                    <button key={yr} onClick={() => setLoanTerm(yr)} style={{
                      flex: 1, padding: '0.5rem', borderRadius: theme.borderRadius.sm,
                      border: loanTerm === yr ? `2px solid ${c.primary}` : `2px solid ${c.cardBorder}`,
                      backgroundColor: loanTerm === yr ? c.primaryLight : 'transparent',
                      color: loanTerm === yr ? c.primary : c.mutedText,
                      fontWeight: loanTerm === yr ? 700 : 500, cursor: 'pointer', fontSize: '0.875rem',
                    }}>{yr} yr</button>
                  ))}
                </div>
              </div>

              {calcType === 'conventional' && (
                <div>
                  <label style={labelStyle}>Credit Score Range</label>
                  <select value={creditPMI} onChange={e => setCreditPMI(+e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {PMI_RATE_TABLE.map(o => (
                      <option key={o.label} value={o.pmiRate}>{o.label} — PMI {o.pmiRate}%</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label style={labelStyle}>Property State</label>
                <select value={state} onChange={e => setState(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {ALL_STATES.map(s => <option key={s.slug} value={s.abbreviation}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Property Tax (Annual $)</label>
                <input type="number" value={propTax} onChange={e => setPropTax(+e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Insurance (Annual $)</label>
                <input type="number" value={insurance} onChange={e => setInsurance(+e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>HOA (Monthly $)</label>
                <input type="number" value={hoa} onChange={e => setHoa(+e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <div style={{ backgroundColor: c.cardBg, borderRadius: theme.borderRadius.lg, padding: '1.5rem', border: `1px solid ${c.cardBorder}`, textAlign: 'center' }}>
              <p style={{ color: c.mutedText, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                {calcType === 'refinance' ? 'New Monthly Payment' : 'Total Monthly Payment'}
              </p>
              <p style={{ color: c.primary, fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>
                ${numberWithCommas(calcType === 'refinance' ? monthlyPI : totalMonthly)}
              </p>
              <p style={{ color: c.mutedText, fontSize: '0.8rem', marginTop: '0.5rem' }}>/month</p>
            </div>

            {calcType === 'refinance' && monthlySavings > 0 && (
              <div style={{ backgroundColor: c.cardBg, borderRadius: theme.borderRadius.lg, padding: '1.5rem', border: `1px solid ${c.cardBorder}` }}>
                <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.75rem' }}>Refinance Savings</h3>
                <div className="grid grid-cols-2 gap-4" style={{ fontSize: '0.85rem' }}>
                  <div><p style={{ color: c.mutedText, fontSize: '0.75rem' }}>Current Payment</p><p style={{ color: c.bodyText, fontWeight: 600 }}>{formatCurrency(currentPayment)}/mo</p></div>
                  <div><p style={{ color: c.mutedText, fontSize: '0.75rem' }}>New Payment</p><p style={{ color: c.bodyText, fontWeight: 600 }}>{formatCurrency(monthlyPI)}/mo</p></div>
                  <div><p style={{ color: c.mutedText, fontSize: '0.75rem' }}>Monthly Savings</p><p style={{ color: '#10b981', fontWeight: 600 }}>{formatCurrency(monthlySavings)}/mo</p></div>
                  <div><p style={{ color: c.mutedText, fontSize: '0.75rem' }}>Break-Even</p><p style={{ color: c.bodyText, fontWeight: 600 }}>{breakEven ?? '—'} months</p></div>
                </div>
              </div>
            )}

            {/* Breakdown */}
            {calcType !== 'refinance' && (
              <div style={{ backgroundColor: c.cardBg, borderRadius: theme.borderRadius.lg, padding: '1.5rem', border: `1px solid ${c.cardBorder}` }}>
                <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.75rem' }}>Payment Breakdown</h3>
                <div className="flex flex-col gap-2" style={{ fontSize: '0.85rem' }}>
                  {[
                    { label: 'Principal & Interest', value: monthlyPI, color: c.primary },
                    { label: 'Property Tax', value: monthlyTax, color: '#8b5cf6' },
                    { label: 'Insurance', value: monthlyIns, color: '#10b981' },
                    { label: 'HOA', value: hoa, color: '#f59e0b' },
                    { label: calcType === 'fha' ? 'MIP' : calcType === 'usda' ? 'Annual Fee' : 'PMI', value: monthlyPMI, color: '#ef4444' },
                  ].filter(s => s.value > 0).map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: s.color, flexShrink: 0 }} />
                      <span style={{ color: c.mutedText, flex: 1 }}>{s.label}</span>
                      <span style={{ color: c.bodyText, fontWeight: 600 }}>{formatCurrency(s.value)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loan Details */}
            <div style={{ backgroundColor: c.cardBg, borderRadius: theme.borderRadius.lg, padding: '1.5rem', border: `1px solid ${c.cardBorder}` }}>
              <h3 style={{ color: c.headingText, fontWeight: 700, marginBottom: '0.75rem' }}>Loan Details</h3>
              <div className="grid grid-cols-2 gap-3" style={{ fontSize: '0.85rem' }}>
                {[
                  ['Loan Amount', formatCurrency(loanAmount)],
                  ['LTV Ratio', `${ltv.toFixed(1)}%`],
                  ['Monthly P&I', formatCurrency(monthlyPI)],
                  ['Total Monthly', formatCurrency(totalMonthly)],
                ].map(([k, v]) => (
                  <div key={k as string}><p style={{ color: c.mutedText, fontSize: '0.75rem' }}>{k}</p><p style={{ color: c.bodyText, fontWeight: 600 }}>{v}</p></div>
                ))}
              </div>
            </div>

            <Link href={`${basePath}/get-started/purchase`} style={{ backgroundColor: c.primary, color: '#fff', padding: '1rem', borderRadius: theme.borderRadius.lg, fontWeight: 700, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Get Pre-Approved →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
