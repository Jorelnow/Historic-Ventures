'use client';

import { useEffect, useState } from 'react';
import { ScrollIcon, SendIcon } from '@/components/icons';
import type { Report } from '@/lib/types';

type ContextMap = Record<string, string>;

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [context, setContext] = useState<ContextMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void loadReports();
  }, []);

  const loadReports = async () => {
    const res = await fetch('/api/admin/reports');
    const data = await res.json();
    setReports(data.reports || []);
  };

  const finalizeAndSend = async (report: Report) => {
    setLoading(true);
    const rawText = [report.raw_research_text, context[report.id]].filter(Boolean).join('\n\n');

    await fetch('/api/generate-narrative', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: report.id, rawText })
    });

    await fetch('/api/delivery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: report.id, pdfUrl: `https://example.com/reports/${report.id}.pdf` })
    });

    await loadReports();
    setLoading(false);
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <h1 className="font-serif text-5xl text-[#F5EBD7]">Research Pipeline</h1>
      <p className="mt-2 text-[#D8C8A8]">Protected admin workspace for active historical orders.</p>

      <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {reports.map((report) => (
            <article key={report.id} className="rounded-2xl border border-[#C5A059]/30 bg-[#141414] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl">{report.address}</p>
                  <p className="text-sm uppercase tracking-widest text-[#C5A059]">Status: {report.status}</p>
                </div>
                <button
                  disabled={loading}
                  onClick={() => finalizeAndSend(report)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#C5A059] px-4 py-2 font-semibold text-[#1A1A1A] disabled:opacity-60"
                >
                  <SendIcon className="h-4 w-4" />
                  Finalize &amp; Send
                </button>
              </div>

              <label className="mb-2 block text-sm uppercase tracking-wide text-[#D8C8A8]">Context Injector</label>
              <textarea
                className="min-h-28 w-full rounded-lg border border-[#C5A059]/30 bg-black/30 p-3"
                placeholder="Paste additional findings, citations, social context..."
                value={context[report.id] ?? ''}
                onChange={(event) => setContext((prev) => ({ ...prev, [report.id]: event.target.value }))}
              />
            </article>
          ))}
          {!reports.length && <p className="text-zinc-400">No active orders in pipeline.</p>}
        </div>

        <aside className="rounded-2xl border border-[#C5A059]/40 bg-[#111111] p-5">
          <div className="mb-3 flex items-center gap-2 text-[#C5A059]">
            <ScrollIcon className="h-5 w-5" />
            <h2 className="font-serif text-2xl">SOP Sidebar</h2>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-[#E7DAC2]">
            <li>Check Newspapers.com for Cedar Rapids &quot;House Moving&quot; permits tied to the parcel and adjacent lots.</li>
            <li>Search Cedar Rapids social columns for family names, receptions, charity events, and club mentions.</li>
            <li>Cross-reference city directories against tax records before finalizing narrative claims.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
