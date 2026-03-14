import { NextResponse } from 'next/server'
import { registerLO, createLandingPage, setLandingPage, setBasicInfo } from '@/lib/loangraphs-client'

// Laravel template IDs — verified via GET /api/user/website/templates (2026-03-13)
// 1=Minimalist, 2=Creative, 3=Dynamic, 4=DSCR
// Only 4 templates in Laravel currently — new lo-templates designs pending backend seeding
const TEMPLATE_IDS: Record<string, number> = {
  // lo-templates gallery slugs → nearest Laravel template
  'template-1': 2,   // Modern Dark → Creative
  'template-2': 1,   // Classic Pro → Minimalist
  'template-3': 1,   // Minimal Clean → Minimalist
  'template-4': 3,   // Corporate Plus → Dynamic
  'template-5': 3,   // Dynamic Blue → Dynamic
  'template-6': 1,   // Elegant White → Minimalist
  'template-7': 3,   // Bold Orange → Dynamic
  'template-8': 2,   // Nathan Pro → Creative
  'template-9': 3,   // Horizon → Dynamic
  'template-10': 2,  // (future)
  'template-11': 2,  // Liquid Glass → Creative
  // lo-react-template theme slugs
  prestige: 1,
  'local-hero': 2,
  'modern-edge': 3,
  'trust-builder': 1,
  'team-page': 2,
  // DSCR-focused templates
  dscr: 4,
}

export async function POST(req: Request) {
  const { name, email, subdomain, templateSlug, nmls, phone, states, primaryColor } =
    await req.json()

  // 1. Generate a random password
  const password = crypto.randomUUID()

  // 2. Register the loan officer
  let token: string
  try {
    const result = await registerLO({ name, email, password, nmls, phone, licensed_states: states })
    token = result.token
  } catch {
    return NextResponse.json(
      { ok: false, error: 'An account with this email already exists.' },
      { status: 400 }
    )
  }

  // 3. Create the landing page record
  await createLandingPage(token)

  // 4. Map templateSlug → template_id
  const template_id = TEMPLATE_IDS[templateSlug] ?? 1

  // 5. Set landing page config
  await setLandingPage(token, { subdomain, template_id, primary_color: primaryColor })

  // 6. Set basic info
  await setBasicInfo(token, { nmls, phone_number: phone, licensed_states: states })

  // 7. Return success
  return NextResponse.json({ ok: true, token, subdomain })
}
