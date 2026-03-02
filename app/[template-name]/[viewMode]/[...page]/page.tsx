import { getTheme } from '@/lib/themes'
import { templates } from '@/components/templates/registry'
import stockData from '@/data/stock-data.json'
import type { TemplateProps } from '@/components/templates/types'
import dynamic from 'next/dynamic'

// Dynamic imports for page components
const AboutPage = dynamic(() => import('@/components/pages/AboutPage'))
const CalculatorsPage = dynamic(() => import('@/components/pages/CalculatorsPage'))
const CalculatorDetailPage = dynamic(() => import('@/components/pages/CalculatorDetailPage'))
const BlogListPage = dynamic(() => import('@/components/pages/BlogListPage'))
const BlogDetailPage = dynamic(() => import('@/components/pages/BlogDetailPage'))
const ResourcesListPage = dynamic(() => import('@/components/pages/ResourcesListPage'))
const ResourceDetailPage = dynamic(() => import('@/components/pages/ResourceDetailPage'))
const LoansPage = dynamic(() => import('@/components/pages/LoansPage'))
const LoanProgramPage = dynamic(() => import('@/components/pages/LoanProgramPage'))
const LicensedStatesPage = dynamic(() => import('@/components/pages/LicensedStatesPage'))
const MarketsPage = dynamic(() => import('@/components/pages/MarketsPage'))
const MarketStatePage = dynamic(() => import('@/components/pages/MarketStatePage'))
const GetStartedPage = dynamic(() => import('@/components/pages/GetStartedPage'))
const AccessibilityPage = dynamic(() => import('@/components/pages/AccessibilityPage'))
const ThemedNav = dynamic(() => import('@/components/pages/ThemedNav'))
const ThemedFooter = dynamic(() => import('@/components/pages/ThemedFooter'))

interface PageProps {
  params: Promise<{
    'template-name': string
    viewMode: string
    page: string[]
  }>
}

export default async function SubPage({ params }: PageProps) {
  const { 'template-name': templateName, viewMode, page } = await params
  const theme = getTheme(templateName)
  const templateEntry = templates[templateName]

  if (!theme || !templateEntry) {
    return <div className="py-20 text-center"><h1>Template not found</h1></div>
  }

  const basePath = `/${templateName}/${viewMode}`
  const props: TemplateProps = {
    loanOfficer: stockData.loanOfficer as TemplateProps['loanOfficer'],
    company: stockData.company as TemplateProps['company'],
    blogPosts: stockData.content.blogPosts as TemplateProps['blogPosts'],
  }
  const lo = { name: props.loanOfficer.name, phone: props.loanOfficer.phone, email: props.loanOfficer.email, nmls: props.loanOfficer.nmls }

  // Route matching
  const path = page.join('/')
  let content: React.ReactNode

  if (path === 'about') {
    content = <AboutPage theme={theme} data={props} basePath={basePath} />
  } else if (path === 'calculators') {
    content = <CalculatorsPage theme={theme} basePath={basePath} />
  } else if (path.startsWith('calculators/')) {
    const calcType = page[1]
    content = <CalculatorDetailPage theme={theme} basePath={basePath} calcType={calcType} />
  } else if (path === 'blog') {
    content = <BlogListPage theme={theme} basePath={basePath} />
  } else if (path.startsWith('blog/')) {
    content = <BlogDetailPage theme={theme} basePath={basePath} slug={page[1]} />
  } else if (path === 'resources') {
    content = <ResourcesListPage theme={theme} basePath={basePath} />
  } else if (path.startsWith('resources/')) {
    content = <ResourceDetailPage theme={theme} basePath={basePath} slug={page[1]} />
  } else if (path === 'loans') {
    content = <LoansPage theme={theme} basePath={basePath} />
  } else if (page[0] === 'loans' && page.length === 2) {
    content = <LoanProgramPage theme={theme} basePath={basePath} programSlug={page[1]} />
  } else if (page[0] === 'loans' && page.length === 3) {
    content = <LoanProgramPage theme={theme} basePath={basePath} programSlug={page[1]} stateSlug={page[2]} />
  } else if (path === 'licensed-states') {
    content = <LicensedStatesPage theme={theme} data={props} basePath={basePath} />
  } else if (path === 'markets') {
    content = <MarketsPage theme={theme} basePath={basePath} />
  } else if (page[0] === 'markets' && page.length === 2) {
    content = <MarketStatePage theme={theme} basePath={basePath} stateSlug={page[1]} />
  } else if (page[0] === 'markets' && page.length === 3) {
    content = <MarketStatePage theme={theme} basePath={basePath} stateSlug={page[1]} countySlug={page[2]} />
  } else if (page[0] === 'get-started') {
    content = <GetStartedPage theme={theme} basePath={basePath} funnelType={page[1] || 'purchase'} />
  } else if (path === 'accessibility-statement') {
    content = <AccessibilityPage theme={theme} />
  } else {
    content = (
      <div className="py-20 text-center">
        <h1 style={{ color: theme.colors.headingText, fontSize: '1.5rem', fontWeight: 700 }}>Page Not Found</h1>
        <p style={{ color: theme.colors.mutedText, marginTop: '0.5rem' }}>The page &quot;{path}&quot; does not exist in this template.</p>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: theme.fonts.body }}>
      <ThemedNav theme={theme} lo={lo} basePath={basePath} />
      {content}
      <ThemedFooter theme={theme} lo={lo} company={{ name: props.company.name }} basePath={basePath} />
    </div>
  )
}
