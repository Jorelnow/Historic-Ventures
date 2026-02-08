import { NextResponse } from 'next/server';
import { getReport } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { propertyId, pdfUrl, email } = (await request.json()) as { propertyId?: string; pdfUrl?: string; email?: string };

    if (!propertyId || !pdfUrl) {
      return NextResponse.json({ error: 'propertyId and pdfUrl are required.' }, { status: 400 });
    }

    const report = await getReport(propertyId);
    const to = email || report?.customer_email;

    if (!to) {
      return NextResponse.json({ error: 'No destination email found.' }, { status: 400 });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'The Property Narrative <narratives@your-domain.com>',
        to,
        subject: `Your Property Narrative for ${report?.address ?? 'your property'}`,
        html: `<p>Your final narrative is ready.</p><p><a href="${pdfUrl}">Download PDF</a></p>`
      })
    });

    if (!resendResponse.ok) {
      return NextResponse.json({ error: await resendResponse.text() }, { status: 500 });
    }

    return NextResponse.json({ delivered: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
