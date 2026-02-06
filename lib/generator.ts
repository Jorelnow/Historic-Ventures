import { MODE_TEMPLATES, Mode } from './modes';

const cleanLine = (line: string) => line.trim().replace(/^[-*\d.\s]+/, '');

export type GeneratedOutput = {
  article: string;
  headlines: { safe: string[]; spicy: string[]; curiosity: string[] };
  screenshotLines: string[];
  xPost: string;
  xThread: string[];
  receiptsChecklist: string[];
};

export function generateOutput(notes: string, mode: Mode): GeneratedOutput {
  const template = MODE_TEMPLATES[mode];
  const lines = notes
    .split('\n')
    .map(cleanLine)
    .filter(Boolean)
    .slice(0, 12);

  const keyPoints = lines.length ? lines : ['Core update still needed: add concrete details from your notes.'];

  const article = [
    `# ${mode}: Publish-Ready Draft`,
    '',
    `**Tone:** ${template.tone}`,
    `**Structure:** ${template.structure}`,
    '',
    '## Draft',
    `${keyPoints[0]} This is the most important signal from the draft and should frame the narrative.`,
    ...keyPoints.slice(1).map((point) => `- ${point}`),
    '',
    `In this ${mode.toLowerCase()} approach, we prioritize ${template.priorities.join(', ')} while keeping the story grounded in verifiable facts.`
  ].join('\n');

  const mkHeadline = (prefix: string, idx: number) =>
    `${prefix} ${idx + 1}: ${keyPoints[idx % keyPoints.length].slice(0, 68)}`;

  const headlines = {
    safe: Array.from({ length: 4 }, (_, i) => mkHeadline('SAFE', i)),
    spicy: Array.from({ length: 3 }, (_, i) => mkHeadline('SPICY', i + 2)),
    curiosity: Array.from({ length: 3 }, (_, i) => mkHeadline('CURIOSITY', i + 4))
  };

  const screenshotLines = Array.from({ length: 5 }, (_, i) =>
    `Screenshot ${i + 1}: ${keyPoints[i % keyPoints.length]}`
  );

  const xPost = `${keyPoints[0]}\n\nMode: ${mode}. Big takeaway: ${template.priorities[0]} matters most right now.`;

  const xThread = Array.from({ length: 8 }, (_, i) => {
    if (i === 0) return `1/${8} ${keyPoints[0]}`;
    if (i === 7) return `8/${8} Bottom line: ${template.priorities.join(' + ')}.`;
    return `${i + 1}/${8} ${keyPoints[i % keyPoints.length]}`;
  });

  const receiptsChecklist = keyPoints.map(
    (point, i) => `Claim ${i + 1}: Verify source and date for \"${point.slice(0, 80)}\"`
  );

  return { article, headlines, screenshotLines, xPost, xThread, receiptsChecklist };
}

export function renderMarkdown(output: GeneratedOutput, mode: Mode): string {
  return [
    `# Historic Ventures Editor Output (${mode})`,
    '',
    '## Publish-ready article',
    output.article,
    '',
    '## Headlines',
    '### SAFE',
    ...output.headlines.safe.map((line) => `- ${line}`),
    '',
    '### SPICY',
    ...output.headlines.spicy.map((line) => `- ${line}`),
    '',
    '### CURIOSITY',
    ...output.headlines.curiosity.map((line) => `- ${line}`),
    '',
    '## Screenshot lines',
    ...output.screenshotLines.map((line) => `- ${line}`),
    '',
    '## X post',
    output.xPost,
    '',
    '## X thread',
    ...output.xThread.map((line) => `- ${line}`),
    '',
    '## Receipts checklist',
    ...output.receiptsChecklist.map((line) => `- [ ] ${line}`)
  ].join('\n');
}
