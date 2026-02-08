import { NextResponse } from 'next/server';
import { getActiveReports } from '@/lib/supabase';

export async function GET() {
  try {
    const reports = await getActiveReports();
    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
