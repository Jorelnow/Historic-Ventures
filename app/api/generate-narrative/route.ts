import { NextResponse } from 'next/server';
import { generateNarrativeFromRawText } from '@/lib/gemini';
import { updateReportNarrative } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { propertyId, rawText } = (await request.json()) as { propertyId?: string; rawText?: string };

    if (!propertyId || !rawText) {
      return NextResponse.json({ error: 'propertyId and rawText are required.' }, { status: 400 });
    }

    const narrative = await generateNarrativeFromRawText(rawText);
    await updateReportNarrative(propertyId, rawText, narrative);

    return NextResponse.json({ narrative });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
