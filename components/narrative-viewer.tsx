import type { NarrativePayload } from '@/lib/types';

type Props = {
  narrative: NarrativePayload;
};

export function NarrativeViewer({ narrative }: Props) {
  return (
    <article className="rounded-3xl border border-[#b79c67] bg-[radial-gradient(circle_at_top,_#f4e6cb,_#ecd9b5_40%,_#e2c89a)] p-8 text-[#2B2113] shadow-xl">
      <h2 className="font-serif text-3xl">Property Narrative</h2>
      <div className="mt-6 space-y-5 font-serif leading-relaxed">
        <Section title="Genesis Era" value={narrative.genesis_era} />
        <Section title="Original Guardians" value={narrative.original_guardians} />
        <Section title="Architectural Soul" value={narrative.architectural_soul} />
        <Section title="Neighborhood Legacy" value={narrative.neighborhood_legacy} />
      </div>
    </article>
  );
}

function Section({ title, value }: { title: string; value: string }) {
  return (
    <section>
      <h3 className="mb-1 text-lg font-semibold text-[#6F5221]">{title}</h3>
      <p>{value}</p>
    </section>
  );
}
