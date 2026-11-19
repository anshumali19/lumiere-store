import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Star, Truck, RotateCcw, Leaf } from 'lucide-react';
import { PRODUCTS, CATEGORIES, COLOR_SWATCH } from '../data';
import { money2 } from '../kit/format';
import { useStore } from '../App';
import { ProductCard } from './Shop';

export default function Product() {
  const { slug } = useParams();
  const p = PRODUCTS.find((x) => x.slug === slug);
  const { addToCart, wishlist, toggleWish } = useStore();
  const [img, setImg] = useState(0);
  const [color, setColor] = useState(p?.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');
  useEffect(() => { setImg(0); setColor(p?.colors[0]); setQty(1); }, [slug]); // eslint-disable-line
  if (!p) return <div className="py-40 text-center"><h1 className="font-serif text-4xl">Piece not found</h1><Link to="/shop" className="mt-6 inline-block underline">Back to shop</Link></div>;
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const liked = wishlist.includes(p.id);
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav className="mb-8 text-xs uppercase tracking-[0.15em] text-ink/50"><Link to="/" className="hover:text-ink">Home</Link> / <Link to={`/shop?category=${p.category}`} className="hover:text-ink">{cat.name}</Link> / <span className="text-ink">{p.name}</span></nav>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-sand"><img src={p.images[img].replace('w=900', 'w=1400')} alt={p.name} className="h-full w-full object-cover" /></div>
          {p.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {p.images.map((src, i) => <button key={i} onClick={() => setImg(i)} className={`aspect-square overflow-hidden cursor-pointer ${i === img ? 'ring-1 ring-ink ring-offset-2 ring-offset-cream' : 'opacity-60 hover:opacity-100'}`}><img src={src.replace('w=900', 'w=200')} alt="" className="h-full w-full object-cover" /></button>)}
            </div>
          )}
        </div>
        <div className="lg:col-span-5 lg:pt-6">
          <div className="lg:sticky lg:top-28">
            {p.isNew && <span className="mb-3 inline-block text-xs uppercase tracking-[0.25em] text-clay">New arrival</span>}
            <h1 className="font-serif text-4xl font-light leading-tight sm:text-5xl">{p.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-ink/60"><span className="flex text-clay">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}</span>{p.rating} · {p.reviews} reviews</div>
            <div className="mt-6 flex items-baseline gap-3 text-2xl">{money2(p.price)}{p.compareAt && <span className="text-base text-ink/40 line-through">{money2(p.compareAt)}</span>}</div>
            <p className="mt-6 leading-relaxed text-ink/70">{p.description}</p>
            <div className="mt-8">
              <div className="mb-3 text-xs uppercase tracking-[0.2em]">Colour — <span className="text-ink/60">{color}</span></div>
              <div className="flex gap-3">
                {p.colors.map((c) => <button key={c} onClick={() => setColor(c)} title={c} aria-label={c} className={`h-9 w-9 rounded-full border border-ink/15 cursor-pointer ${color === c ? 'ring-1 ring-ink ring-offset-2 ring-offset-cream' : ''}`} style={{ background: COLOR_SWATCH[c] || '#ddd' }} />)}
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <div className="flex items-center border border-ink/20">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-4 cursor-pointer" aria-label="Decrease"><Minus size={14} /></button>
                <span className="w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-4 cursor-pointer" aria-label="Increase"><Plus size={14} /></button>
              </div>
              <button onClick={() => addToCart(p, color, qty)} className="flex-1 bg-ink text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-clay cursor-pointer">Add to bag · {money2(p.price * qty)}</button>
              <button onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="border border-ink/20 px-4 cursor-pointer"><Heart size={18} strokeWidth={1.5} className={liked ? 'fill-clay text-clay' : ''} /></button>
            </div>
            <div className="mt-8 space-y-3 border-y border-ink/10 py-6 text-sm text-ink/70">
              <div className="flex items-center gap-3"><Truck size={17} strokeWidth={1.5} /> Free shipping on orders over $150 · dispatched in 1–2 days</div>
              <div className="flex items-center gap-3"><RotateCcw size={17} strokeWidth={1.5} /> 60-day returns, no questions asked</div>
              <div className="flex items-center gap-3"><Leaf size={17} strokeWidth={1.5} /> Made from natural, responsibly sourced materials</div>
            </div>
            <div className="mt-6">
              <div className="flex gap-6 border-b border-ink/10 text-xs uppercase tracking-[0.2em]">
                {['details', 'care', 'shipping'].map((t) => <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b pb-3 cursor-pointer ${tab === t ? 'border-ink' : 'border-transparent text-ink/50'}`}>{t}</button>)}
              </div>
              <p className="pt-5 text-sm leading-relaxed text-ink/70">
                {tab === 'details' && `${p.description} Designed in our studio and produced in small batches by independent makers.`}
                {tab === 'care' && 'Wipe clean with a soft, damp cloth. For textiles, wash cool on a gentle cycle and line dry. Avoid harsh detergents.'}
                {tab === 'shipping' && 'We ship worldwide. Orders over $150 ship free; otherwise a flat $12 rate applies. Returns are free within 60 days.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="mb-10 font-serif text-4xl font-light">Complete the look</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </main>
  );
}
