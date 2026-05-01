import { Resend } from 'resend'

let resendClient: Resend | null = null

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set.')
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string | string[]
  subject: string
  html: string
  from?: string
}) {
  const resend = getResendClient()
  const fromAddress = from || process.env.RESEND_FROM_ADDRESS || 'noreply@solomonatah.com'

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw error
  }

  return data
}
