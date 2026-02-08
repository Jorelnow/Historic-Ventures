const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getHeaders() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.');
  }

  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json'
  };
}

export async function updateReportStatus(id: string, status: 'pending' | 'researching' | 'completed') {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/reports?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...getHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(`Failed status update: ${await response.text()}`);
  }
}

export async function updateReportNarrative(id: string, rawText: string, narrative: unknown) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/reports?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...getHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify({ raw_research_text: rawText, ai_narrative_json: narrative, status: 'completed' })
  });

  if (!response.ok) {
    throw new Error(`Failed narrative update: ${await response.text()}`);
  }
}

export async function getReport(id: string) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/reports?id=eq.${id}&select=id,address,status,raw_research_text,ai_narrative_json,customer_email`,
    { headers: getHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed report fetch: ${await response.text()}`);
  }

  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows[0];
}

export async function getActiveReports() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/reports?status=in.(pending,researching)&select=id,address,status,raw_research_text,ai_narrative_json,customer_email&order=id.desc`,
    { headers: getHeaders() }
  );

  if (!response.ok) {
    throw new Error(`Failed active reports fetch: ${await response.text()}`);
  }

  return response.json();
}
