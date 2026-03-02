import stockData from '@/data/stock-data.json'
import { templates } from '@/components/templates/registry'
import { getTheme } from '@/lib/themes'
import type { TemplateProps } from '@/components/templates/types'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('@/components/pages/HomePage'))
const ThemedNav = dynamic(() => import('@/components/pages/ThemedNav'))
const ThemedFooter = dynamic(() => import('@/components/pages/ThemedFooter'))

interface PageProps {
  params: Promise<{
    'template-name': string
    viewMode: string
  }>
}

export default async function TemplatePreviewPage({ params }: PageProps) {
  const { 'template-name': templateName, viewMode } = await params
  const template = stockData.templates.find(t => t.id === templateName)
  const templateEntry = templates[templateName]
  const theme = getTheme(templateName)

  if (!template || !templateEntry || !theme) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Template not found</h1>
      </div>
    )
  }

  const basePath = `/${templateName}/${viewMode}`
  const props: TemplateProps = {
    loanOfficer: stockData.loanOfficer as TemplateProps['loanOfficer'],
    company: stockData.company as TemplateProps['company'],
    blogPosts: stockData.content.blogPosts as TemplateProps['blogPosts'],
  }
  const lo = { name: props.loanOfficer.name, phone: props.loanOfficer.phone, email: props.loanOfficer.email, nmls: props.loanOfficer.nmls }

  return (
    <div style={{ fontFamily: theme.fonts.body }}>
      <ThemedNav theme={theme} lo={lo} basePath={basePath} />
      <HomePage theme={theme} data={props} basePath={basePath} />
      <ThemedFooter theme={theme} lo={lo} company={{ name: props.company.name }} basePath={basePath} />
    </div>
  )
}
