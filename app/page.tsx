'use client';

import { useEffect, useMemo, useState } from 'react';
import { generateOutput, renderMarkdown, type GeneratedOutput } from '@/lib/generator';
import { MODES, MODE_TEMPLATES, SAMPLE_CONTEXT_PACK, type Mode } from '@/lib/modes';

type Project = {
  id: string;
  title: string;
  date: string;
  mode: Mode;
  notes: string;
  output: GeneratedOutput;
};

const STORAGE_KEY = 'historic-ventures-projects-v1';

export default function HomePage() {
  const [title, setTitle] = useState('Untitled Project');
  const [notes, setNotes] = useState('Paste your rough notes here...');
  const [mode, setMode] = useState<Mode>('HUMANIZER');
  const [projects, setProjects] = useState<Project[]>([]);
  const [generated, setGenerated] = useState<GeneratedOutput | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProjects(JSON.parse(raw));
      } catch {
        setProjects([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const markdown = useMemo(() => (generated ? renderMarkdown(generated, mode) : ''), [generated, mode]);

  const handleGenerate = () => {
    setGenerated(generateOutput(notes, mode));
  };

  const handleSave = () => {
    if (!generated) return;
    const now = new Date();
    const project: Project = {
      id: crypto.randomUUID(),
      title,
      date: now.toLocaleString(),
      mode,
      notes,
      output: generated
    };
    setProjects((prev) => [project, ...prev]);
  };

  const loadProject = (project: Project) => {
    setTitle(project.title);
    setMode(project.mode);
    setNotes(project.notes);
    setGenerated(project.output);
  };

  const downloadMarkdown = () => {
    if (!generated) return;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-') || 'historic-ventures-output'}.md`;
    a.click();
    URL.revokeObjectURL(href);
  };

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl p-6">
      <h1 className="text-3xl font-bold">Historic Ventures Editor</h1>
      <p className="mt-2 text-slate-600">Turn rough notes into publish-ready outputs in one local-first workspace.</p>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow lg:col-span-2">
          <label className="mb-2 block text-sm font-semibold">Project Title</label>
          <input
            className="mb-4 w-full rounded border border-slate-300 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="mb-2 block text-sm font-semibold">Mode</label>
          <select
            className="mb-4 w-full rounded border border-slate-300 p-2"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            {MODES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <p className="mb-4 rounded bg-slate-50 p-3 text-sm text-slate-700">
            <span className="font-semibold">Template:</span> {MODE_TEMPLATES[mode].tone} Priorities: {MODE_TEMPLATES[mode].priorities.join(', ')}.
          </p>

          <label className="mb-2 block text-sm font-semibold">Input Notes / Draft</label>
          <textarea
            className="min-h-52 w-full rounded border border-slate-300 p-3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={handleGenerate}>
              Generate Output
            </button>
            <button className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50" onClick={handleSave} disabled={!generated}>
              Save Project
            </button>
            <button className="rounded bg-sky-600 px-4 py-2 text-white disabled:opacity-50" onClick={downloadMarkdown} disabled={!generated}>
              Download .md
            </button>
            <button
              className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
              onClick={() => generated && copy(markdown)}
              disabled={!generated}
            >
              Copy Markdown
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Settings</h2>
          <div className="mt-3 rounded border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{SAMPLE_CONTEXT_PACK.name}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {SAMPLE_CONTEXT_PACK.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            <p className="font-semibold">Do Not Mention</p>
            <p>Dash, Dee</p>
          </div>

          <h3 className="mt-5 text-lg font-semibold">Saved Projects</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  className="w-full rounded border border-slate-200 p-2 text-left hover:bg-slate-50"
                  onClick={() => loadProject(project)}
                >
                  <p className="font-medium">{project.title}</p>
                  <p className="text-slate-500">{project.date}</p>
                </button>
              </li>
            ))}
            {!projects.length && <li className="text-slate-500">No saved projects yet.</li>}
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-lg bg-white p-4 shadow">
        <h2 className="text-2xl font-semibold">Generated Output</h2>
        {!generated && <p className="mt-2 text-slate-600">Generate output to see publish-ready content.</p>}
        {generated && (
          <div className="mt-4 space-y-5">
            <OutputBlock title="Publish-ready article" content={generated.article} onCopy={copy} />
            <OutputBlock
              title="10 headlines (SAFE/SPICY/CURIOSITY)"
              content={[
                'SAFE:',
                ...generated.headlines.safe.map((x) => `- ${x}`),
                '',
                'SPICY:',
                ...generated.headlines.spicy.map((x) => `- ${x}`),
                '',
                'CURIOSITY:',
                ...generated.headlines.curiosity.map((x) => `- ${x}`)
              ].join('\n')}
              onCopy={copy}
            />
            <OutputBlock title="5 screenshot lines" content={generated.screenshotLines.join('\n')} onCopy={copy} />
            <OutputBlock title="X post" content={generated.xPost} onCopy={copy} />
            <OutputBlock title="X thread (8 tweets)" content={generated.xThread.join('\n')} onCopy={copy} />
            <OutputBlock title="Receipts checklist" content={generated.receiptsChecklist.join('\n')} onCopy={copy} />
          </div>
        )}
      </section>
    </main>
  );
}

function OutputBlock({ title, content, onCopy }: { title: string; content: string; onCopy: (text: string) => Promise<void> }) {
  return (
    <article className="rounded border border-slate-200 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-semibold">{title}</h3>
        <button className="rounded border border-slate-300 px-2 py-1 text-sm" onClick={() => onCopy(content)}>
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm text-slate-700">{content}</pre>
    </article>
  );
}
