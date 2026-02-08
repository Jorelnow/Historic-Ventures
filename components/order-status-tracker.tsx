import type { ReportStatus } from '@/lib/types';

const statusSteps: Array<{ key: ReportStatus; label: string }> = [
  { key: 'pending', label: 'Order received and queued' },
  { key: 'researching', label: 'Analyzing 1913 Sanborn Maps and city archives' },
  { key: 'completed', label: 'Narrative composed and ready for delivery' }
];

export function OrderStatusTracker({ status }: { status: ReportStatus }) {
  const activeIdx = statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="rounded-2xl border border-[#C5A059]/40 bg-[#121212] p-6 text-[#EDE2CF]">
      <h2 className="font-serif text-2xl">Order Status</h2>
      <ol className="mt-4 space-y-4">
        {statusSteps.map((step, idx) => {
          const active = idx <= activeIdx;
          return (
            <li key={step.key} className="flex items-start gap-3">
              <span className={`mt-1 h-3 w-3 rounded-full ${active ? 'bg-[#C5A059]' : 'bg-zinc-700'}`} />
              <p className={active ? 'text-[#F5EBD7]' : 'text-zinc-500'}>{step.label}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
