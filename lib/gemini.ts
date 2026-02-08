import type { NarrativePayload } from '@/lib/types';

const SYSTEM_PROMPT = `You are a high-end Historical Biographer for luxury property storytelling.
Synthesize archival notes into elegant and factual language.
Return strict JSON only with keys: genesis_era, original_guardians, architectural_soul, neighborhood_legacy.`;

export async function generateNarrativeFromRawText(rawText: string): Promise<NarrativePayload> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required.');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nRaw text:\n${rawText}` }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini call failed: ${await response.text()}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned empty response.');
  }

  return JSON.parse(text) as NarrativePayload;
}
