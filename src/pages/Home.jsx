import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Hand, RotateCcw, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES, img } from '../data';
import { ProductCard } from './Shop';

const QUOTES = [
  { text: 'The linen duvet set is the best thing I bought this year. It gets softer every week.', name: 'Clara M.', place: 'London' },
  { text: 'Beautiful packaging, quick delivery, and the vases look even better in person.', name: 'Rahul D.', place: 'Mumbai' },
  { text: 'Finally a home store that feels considered rather than mass-produced.', name: 'Sophie L.', place: 'Melbourne' },
];

export default function Home() {
  const best = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-12 lg:pt-12">
        <div className="flex flex-col justify-center lg:col-span-5 lg:pr-8">
          <p className="text-xs uppercase tracking-[0.3em] text-clay">Autumn / Winter Collection</p>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] sm:text-7xl">Slow living,<br /><em className="font-normal">beautifully</em> made.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">Linen, stoneware and soft light — objects crafted by independent makers to bring calm to everyday rooms.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/shop" className="inline-flex items-center gap-3 bg-ink px-8 py-4 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-clay">Shop the collection <ArrowRight size={14} /></Link>
            <a href="#about" className="inline-flex items-center px-2 py-4 text-xs uppercase tracking-[0.2em] underline underline-offset-8">Our story</a>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm text-ink/60">
            <div className="flex text-clay">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            4.9 from 2,300+ happy homes
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-6 gap-4 lg:col-span-7" style={{ height: 'min(78vh, 680px)' }}>
          <img src={img('photo-1705321963943-de94bb3f0dd3', 1200)} alt="Living room styled with Lumière pieces" className="col-span-3 row-span-6 h-full w-full object-cover" />
          <img src={img('photo-1597696929736-6d13bed8e6a8', 700)} alt="Stoneware vases" className="col-span-2 row-span-3 h-full w-full object-cover" />
          <img src={img('photo-1634665810235-011d663754e7', 700)} alt="Linen bedding" className="col-span-2 row-span-3 h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 text-sm sm:px-8 lg:grid-cols-4">
          {[[Hand, 'Handmade by independent makers'], [Leaf, 'Natural & recycled materials'], [Truck, 'Free shipping over $150'], [RotateCcw, '60-day easy returns']].map(([I, t]) => (
            <div key={t} className="flex items-center gap-3 text-ink/70"><I size={20} strokeWidth={1.4} className="shrink-0 text-clay" />{t}</div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl font-light sm:text-5xl">Shop by room</h2>
          <Link to="/shop" className="hidden text-xs uppercase tracking-[0.2em] underline underline-offset-8 sm:block">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className={`group relative overflow-hidden ${i % 2 ? 'lg:mt-12' : ''}`}>
              <div className="aspect-[3/4] overflow-hidden"><img src={c.image.replace('w=1000', 'w=700')} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="mt-4 flex items-center justify-between"><div><div className="font-serif text-2xl">{c.name}</div><div className="text-sm text-ink/50">{c.blurb}</div></div><ArrowRight size={18} className="transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-clay">Most loved</p>
          <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">Bestsellers</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{best.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section id="about" className="mt-28 bg-sand/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <img src={img('photo-1595351298020-038700609878', 1000)} alt="A potter shaping clay" className="aspect-[4/5] w-full object-cover" />
          <div className="lg:pl-12">
            <p className="text-xs uppercase tracking-[0.3em] text-clay">Our story</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">Made slowly, by people who care.</h2>
            <p className="mt-6 leading-relaxed text-ink/70">Lumière began in 2019 with a single kiln and a simple belief: the objects we live with every day should be made well, and made to last. Today we partner with 40 independent studios across Portugal, India and Japan.</p>
            <p className="mt-4 leading-relaxed text-ink/70">Every piece is produced in small batches, using natural materials and fair wages — and we offset the carbon of every delivery.</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[['40+', 'Maker studios'], ['12k', 'Homes furnished'], ['100%', 'Carbon-neutral shipping']].map(([n, l]) => (
                <div key={l}><div className="font-serif text-3xl">{n}</div><div className="mt-1 text-xs text-ink/50">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <h2 className="text-center font-serif text-4xl font-light sm:text-5xl">Kind words</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name} className="text-center">
              <div className="flex justify-center text-clay">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <blockquote className="mt-5 font-serif text-xl font-light leading-relaxed">“{q.text}”</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-ink/50">{q.name} · {q.place}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={img('photo-1618220179428-22790b461013', 1800)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-ink/45" />
        <div className="mx-auto max-w-3xl px-5 py-32 text-center text-cream">
          <h2 className="font-serif text-4xl font-light sm:text-6xl">Make home your favourite place.</h2>
          <Link to="/shop?category=bedroom" className="mt-10 inline-flex items-center gap-3 bg-cream px-8 py-4 text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-clay hover:text-cream">Explore the bedroom edit <ArrowRight size={14} /></Link>
        </div>
      </section>
    </main>
  );
}
