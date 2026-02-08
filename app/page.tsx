import { Hero } from '@/components/hero';
import { NarrativeViewer } from '@/components/narrative-viewer';
import { OrderStatusTracker } from '@/components/order-status-tracker';

const demoNarrative = {
  genesis_era:
    'Raised in Cedar Rapids\' post-Victorian expansion, the home emerged during a period when streetcar lines and neighborhood schools reshaped daily life.',
  original_guardians:
    'Tax rolls and city directories suggest a family of merchants and civic volunteers who treated the residence as both home and social salon.',
  architectural_soul:
    'Its massing carries Midwestern restraint, while preserved trim work and stair geometry reveal a quietly ambitious hand in the original craft.',
  neighborhood_legacy:
    'From flood recovery to block-level preservation efforts, this address reflects a district defined by resilience, continuity, and community memory.'
};

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 px-6 py-10">
      <Hero />
      <section className="grid gap-6 lg:grid-cols-2">
        <NarrativeViewer narrative={demoNarrative} />
        <OrderStatusTracker status="researching" />
      </section>
    </main>
  );
}
