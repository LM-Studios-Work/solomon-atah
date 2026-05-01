import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.honeypot) {
      return NextResponse.json({ message: 'OK' }, { status: 200 })
    }

    if (!body.orgName || !body.contactName || !body.contactEmail || !body.message) {
      return NextResponse.json({ message: 'Required fields are missing.' }, { status: 400 })
    }

    const payload = await getPayload()

    await payload.create({
      collection: 'partner-inquiries',
      data: {
        orgName: body.orgName,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        contactTitle: body.contactTitle,
        partnershipType: body.partnershipType,
        budget: body.budget,
        message: body.message,
        honeypot: body.honeypot || '',
        status: 'new',
      },
    })

    if (process.env.RESEND_API_KEY && process.env.RESEND_TEAM_EMAIL) {
      try {
        const { sendEmail } = await import('@/lib/email/client')
        await sendEmail({
          to: process.env.RESEND_TEAM_EMAIL,
          subject: `New partner inquiry: ${body.orgName}`,
          html: `<p><strong>${body.contactName}</strong> from <strong>${body.orgName}</strong> sent a partner inquiry.<br/>Type: ${body.partnershipType}<br/>Email: ${body.contactEmail}</p><p>${body.message}</p>`,
        })
      } catch (e) {
        console.error('Email error:', e)
      }
    }

    return NextResponse.json({ message: 'Inquiry submitted.' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 })
  }
}
