import { NextResponse } from 'next/server';
import { updateReportStatus } from '@/lib/supabase';

type StripeCheckoutEvent = {
  type: string;
  data?: {
    object?: {
      metadata?: {
        propertyId?: string;
      };
    };
  };
};

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as StripeCheckoutEvent;

    if (event.type === 'checkout.session.completed') {
      const propertyId = event.data?.object?.metadata?.propertyId;
      if (propertyId) {
        await updateReportStatus(propertyId, 'researching');
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
