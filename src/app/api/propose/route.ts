import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ message: 'OK' }, { status: 200 })
    }

    // Basic validation
    if (!body.proposerName || !body.proposerEmail || !body.topicTitle || !body.topicSummary) {
      return NextResponse.json({ message: 'Required fields are missing.' }, { status: 400 })
    }

    const payload = await getPayload()

    await payload.create({
      collection: 'proposals',
      data: {
        proposerName: body.proposerName,
        proposerEmail: body.proposerEmail,
        proposerRelation: body.proposerRelation || 'self',
        guestName: body.guestName,
        guestEmail: body.guestEmail,
        guestRole: body.guestRole,
        guestInstitution: body.guestInstitution,
        discipline: body.discipline,
        topicTitle: body.topicTitle,
        topicSummary: body.topicSummary,
        publicRelevance: body.publicRelevance,
        links: body.links,
        availability: body.availability,
        honeypot: body.honeypot || '',
        status: 'new',
      },
    })

    // Send confirmation email (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendEmail } = await import('@/lib/email/client')
        await sendEmail({
          to: body.proposerEmail,
          subject: `Proposal received — The Solomon Atah Podcast`,
          html: proposalConfirmationEmail(body.proposerName, body.topicTitle),
        })
        if (process.env.RESEND_TEAM_EMAIL) {
          await sendEmail({
            to: process.env.RESEND_TEAM_EMAIL,
            subject: `New proposal: ${body.topicTitle}`,
            html: proposalNotificationEmail(body),
          })
        }
      } catch (emailErr) {
        console.error('Failed to send confirmation email:', emailErr)
        // Don't fail the submission if email fails
      }
    }

    return NextResponse.json({ message: 'Proposal submitted successfully.' }, { status: 200 })
  } catch (err) {
    console.error('Proposal submission error:', err)
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

function proposalConfirmationEmail(name: string, topicTitle: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1108;">
  <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #C9A84C; margin-bottom: 24px;">The Solomon Atah Podcast</p>
  <p>Dear ${name},</p>
  <p>We have received your proposal: <em>${topicTitle}</em>.</p>
  <p>Thank you for taking the time to propose a conversation. We review every submission personally and will be in touch if your research is a strong fit for the archive.</p>
  <p>We aim to respond within two to four weeks.</p>
  <p style="margin-top: 32px;">With regards,<br /><strong>The Solomon Atah Podcast</strong><br /><em>Know Tomorrow Today.</em></p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 11px; color: #999;">You are receiving this because you submitted a proposal at solomonatah.com.</p>
</body>
</html>`
}

function proposalNotificationEmail(data: Record<string, string>): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2>New Proposal: ${data.topicTitle}</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 40%;">Proposer</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.proposerName} &lt;${data.proposerEmail}&gt;</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Position</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.guestRole || 'Not specified'}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Institution</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.guestInstitution || 'Not specified'}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Discipline</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.discipline}</td></tr>
  </table>
  <h3>Abstract</h3>
  <p>${data.topicSummary}</p>
  <h3>Public Relevance</h3>
  <p>${data.publicRelevance}</p>
  ${data.links ? `<h3>Links</h3><p>${data.links.replace(/\n/g, '<br/>')}</p>` : ''}
</body>
</html>`
}
