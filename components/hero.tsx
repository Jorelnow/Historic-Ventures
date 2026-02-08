import { SearchIcon } from '@/components/icons';

export function Hero() {
  return (
    <section className="rounded-3xl border border-[#C5A059]/30 bg-[#1A1A1A] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <p className="text-xs uppercase tracking-[0.35em] text-[#C5A059]">The Property Narrative</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl text-[#F5EBD7] md:text-6xl">Where archival truth becomes a timeless homeowner heirloom.</h1>
      <p className="mt-4 max-w-2xl text-[#DDCFB2]">Commission a premium home biography blending architectural scholarship, social context, and neighborhood legacy.</p>
      <div className="mt-8 flex items-center gap-3 rounded-full border border-[#C5A059]/40 bg-black/40 p-2 pl-4">
        <SearchIcon className="h-5 w-5 text-[#C5A059]" />
        <input
          defaultValue="847 12th St NE"
          aria-label="Property address"
          className="w-full bg-transparent font-serif text-lg text-[#F5EBD7] outline-none"
        />
        <button className="rounded-full bg-[#C5A059] px-5 py-2 text-sm font-semibold text-[#1A1A1A]">Begin Narrative</button>
      </div>
    </section>
  );
}
