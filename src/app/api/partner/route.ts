import { NextRequest, NextResponse } from 'next/server'

const NOTIFICATION_EMAIL = 'suisyola44@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.honeypot) {
      return NextResponse.json({ message: 'OK' }, { status: 200 })
    }

    if (!body.orgName || !body.contactName || !body.contactEmail || !body.message) {
      return NextResponse.json({ message: 'Required fields are missing.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ message: 'Email service not configured.' }, { status: 500 })
    }

    const { sendEmail } = await import('@/lib/email/client')

    await sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: `New partner inquiry: ${body.orgName}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2>New Partner Inquiry: ${body.orgName}</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 40%;">Organisation</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${body.orgName}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Contact</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${body.contactName}${body.contactTitle ? ` (${body.contactTitle})` : ''}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${body.contactEmail}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Partnership Type</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${body.partnershipType || 'Not specified'}</td></tr>
    <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Budget</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${body.budget || 'Not specified'}</td></tr>
  </table>
  <h3>Message</h3>
  <p>${body.message}</p>
</body>
</html>`,
    })

    return NextResponse.json({ message: 'Inquiry submitted.' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 })
  }
}
