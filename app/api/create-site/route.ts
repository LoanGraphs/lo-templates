import { NextResponse } from 'next/server'
import { registerLO, createLandingPage, setLandingPage, setBasicInfo } from '@/lib/loangraphs-client'

const TEMPLATE_IDS: Record<string, number> = {
  'template-1': 1, 'template-2': 2, 'template-3': 3, 'template-4': 4,
  'template-5': 5, 'template-6': 6, 'template-7': 7, 'template-8': 8,
  'template-9': 9, 'template-10': 10, 'template-11': 11,
  prestige: 1, 'local-hero': 2, 'modern-edge': 3, 'trust-builder': 4, 'team-page': 5, dscr: 4,
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
