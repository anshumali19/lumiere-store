import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import { money2 } from '../kit/format';
import { useStore } from '../App';

export function ProductCard({ p }) {
  const { wishlist, toggleWish, addToCart } = useStore();
  const liked = wishlist.includes(p.id);
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link to={`/product/${p.slug}`}>
          <img src={p.images[0].replace('w=900', 'w=640')} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {p.images[1] && <img src={p.images[1].replace('w=900', 'w=640')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100" />}
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.compareAt && <span className="bg-clay px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white">Sale</span>}
          {p.isNew && <span className="bg-cream px-2 py-1 text-[10px] uppercase tracking-[0.15em]">New</span>}
        </div>
        <button onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 transition hover:scale-110 cursor-pointer">
          <Heart size={16} strokeWidth={1.6} className={liked ? 'fill-clay text-clay' : ''} />
        </button>
        <button onClick={() => addToCart(p, p.colors[0])} className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 bg-ink py-3 text-xs uppercase tracking-[0.15em] text-cream opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer">
          <Plus size={14} /> Quick add
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${p.slug}`} className="text-[15px] hover:underline">{p.name}</Link>
          <div className="mt-0.5 text-xs text-ink/50">{p.colors.length > 1 ? `${p.colors.length} colours` : p.colors[0]}</div>
        </div>
        <div className="text-right text-[15px]">
          {money2(p.price)}
          {p.compareAt && <div className="text-xs text-ink/40 line-through">{money2(p.compareAt)}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { wishlist } = useStore();
  const cat = params.get('category') || 'all';
  const wishOnly = params.get('wishlist') === '1';
  const [sort, setSort] = useState('featured');
  const [q, setQ] = useState('');
  const [onSale, setOnSale] = useState(false);
  const items = useMemo(() => {
    let x = PRODUCTS.filter((p) => (cat === 'all' || p.category === cat) && (!wishOnly || wishlist.includes(p.id)) && (!onSale || p.compareAt) && (!q || p.name.toLowerCase().includes(q.toLowerCase())));
    if (sort === 'low') x = [...x].sort((a, b) => a.price - b.price);
    if (sort === 'high') x = [...x].sort((a, b) => b.price - a.price);
    if (sort === 'rating') x = [...x].sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') x = [...x].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    return x;
  }, [cat, sort, q, onSale, wishOnly, wishlist]);
  const current = CATEGORIES.find((c) => c.id === cat);
  const setCat = (id) => setParams(id === 'all' ? {} : { category: id });

  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-8">
      <section className="py-14 text-center sm:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-clay">{wishOnly ? 'Saved for later' : 'The collection'}</p>
        <h1 className="mt-3 font-serif text-5xl font-light sm:text-6xl">{wishOnly ? 'Your wishlist' : current ? current.name : 'Shop all'}</h1>
        <p className="mx-auto mt-4 max-w-md text-ink/60">{wishOnly ? 'Pieces you love, all in one place.' : current ? current.blurb : 'Every piece, made by hand by independent makers.'}</p>
      </section>
      <div className="sticky top-[72px] z-30 -mx-5 mb-10 border-y border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {[{ id: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] transition cursor-pointer ${cat === c.id && !wishOnly ? 'border-ink bg-ink text-cream' : 'border-ink/20 hover:border-ink'}`}>{c.name}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[13px]">
            <div className="relative"><Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/40" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-36 border-b border-ink/20 bg-transparent py-1 pl-5 outline-none focus:border-ink" /></div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={onSale} onChange={(e) => setOnSale(e.target.checked)} className="accent-clay" /> On sale</label>
            <span className="flex items-center gap-2"><SlidersHorizontal size={14} /><select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></span>
          </div>
        </div>
      </div>
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-ink/50">{items.length} pieces</p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {items.length === 0 && <div className="py-24 text-center text-ink/50">{wishOnly ? 'Your wishlist is empty — tap the heart on any piece to save it.' : 'Nothing matches those filters.'}</div>}
    </main>
  );
}
