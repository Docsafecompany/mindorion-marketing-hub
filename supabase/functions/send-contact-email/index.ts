import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const BodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(200),
  products: z.array(z.string().trim().min(1).max(60)).min(1).max(10),
  teamSize: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''),
  locale: z.string().trim().max(10).optional().default('fr'),
  // Honeypot: must stay empty for real humans.
  website: z.string().max(200).optional().default(''),
})

// Simple in-memory rate limit per isolate (best-effort abuse guard).
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_PER_WINDOW
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  if (req.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405)
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return json({ ok: false, error: 'invalid_input', details: parsed.error.flatten().fieldErrors }, 400)
    }

    const data = parsed.data

    // Honeypot filled => silently accept without sending.
    if (data.website.trim().length > 0) {
      return json({ ok: true }, 200)
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return json({ ok: false, error: 'rate_limited' }, 429)
    }

    const result = await sendTemplateEmail('contact-request', 'contact@mindorion.com', {
      replyTo: data.email,
      templateData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        products: data.products.join(', '),
        teamSize: data.teamSize,
        message: data.message,
        locale: data.locale,
      },
    })

    if (!result.sent) {
      console.error('contact email not sent:', result.reason)
      return json({ ok: false, error: result.reason }, 502)
    }

    return json({ ok: true }, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('send-contact-email failed:', message)
    return json({ ok: false, error: 'send_failed', details: message }, 502)
  }
})
