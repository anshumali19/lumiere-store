import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Lock, Check, ArrowLeft } from 'lucide-react';
import { PROMOS } from '../data';
import { money2 } from '../kit/format';
import { useStore } from '../App';

const field = 'h-12 w-full border border-ink/20 bg-transparent px-4 text-sm outline-none transition focus:border-ink';
const STEPS = ['Bag', 'Details', 'Delivery', 'Payment'];

export default function Cart() {
  const { cart, setQty, clearCart, saveOrder } = useStore();
  const [step, setStep] = useState(0);
  const [promo, setPromo] = useState('');
  const [applied, setApplied] = useState(null);
  const [promoMsg, setPromoMsg] = useState('');
  const [info, setInfo] = useState({ email: '', name: '', address: '', city: '', zip: '', country: 'United States', phone: '' });
  const [delivery, setDelivery] = useState('standard');
  const [done, setDone] = useState(null);

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const discount = applied?.type === 'percent' ? Math.round(subtotal * applied.value) / 100 : 0;
  const shipBase = delivery === 'express' ? 24 : subtotal - discount >= 150 || applied?.type === 'ship' ? 0 : 12;
  const tax = Math.round((subtotal - discount) * 7) / 100;
  const total = Math.round((subtotal - discount + shipBase + tax) * 100) / 100;
  const set = (k) => (e) => setInfo({ ...info, [k]: e.target.value });

  const applyPromo = () => {
    const p = PROMOS[promo.trim().toUpperCase()];
    if (!p) { setApplied(null); return setPromoMsg('That code isn’t valid.'); }
    setApplied(p);
    setPromoMsg(`${p.label} applied`);
  };
  const placeOrder = (e) => {
    e.preventDefault();
    const order = { id: `LM-${Math.floor(100000 + Math.random() * 900000)}`, items: cart, total, email: info.email, name: info.name, date: new Date().toISOString() };
    saveOrder(order);
    clearCart();
    setDone(order);
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay text-cream"><Check size={28} /></div>
        <h1 className="mt-8 font-serif text-5xl font-light">Thank you, {done.name.split(' ')[0]}.</h1>
        <p className="mt-4 text-ink/60">Your order <b className="text-ink">{done.id}</b> is confirmed. We’ve sent a receipt to {done.email} and will let you know when it ships.</p>
        <div className="mt-10 border-y border-ink/10 py-6 text-left text-sm">
          {done.items.map((i) => <div key={i.key} className="flex justify-between py-1.5"><span>{i.qty} × {i.name} <span className="text-ink/50">({i.color})</span></span><span>{money2(i.qty * i.price)}</span></div>)}
          <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 font-medium"><span>Total</span><span>{money2(done.total)}</span></div>
        </div>
        <Link to="/shop" className="mt-10 inline-block bg-ink px-8 py-4 text-xs uppercase tracking-[0.2em] text-cream hover:bg-clay">Continue shopping</Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-8">
        <h1 className="font-serif text-5xl font-light">Your bag is empty</h1>
        <p className="mt-4 text-ink/60">Discover pieces made to be lived with.</p>
        <Link to="/shop" className="mt-10 inline-block bg-ink px-8 py-4 text-xs uppercase tracking-[0.2em] text-cream hover:bg-clay">Shop the collection</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <h1 className="font-serif text-5xl font-light">{step === 0 ? 'Your bag' : 'Checkout'}</h1>
      <ol className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <button disabled={i > step} onClick={() => setStep(i)} className={`flex items-center gap-2 disabled:cursor-default cursor-pointer ${i === step ? 'text-ink' : i < step ? 'text-clay' : 'text-ink/30'}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${i < step ? 'border-clay bg-clay text-cream' : i === step ? 'border-ink' : 'border-ink/20'}`}>{i < step ? <Check size={11} /> : i + 1}</span>{s}
            </button>
            {i < STEPS.length - 1 && <span className="h-px w-8 bg-ink/20" />}
          </li>
        ))}
      </ol>
      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === 0 && (
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {cart.map((i) => (
                <li key={i.key} className="flex gap-5 py-6">
                  <Link to={`/product/${i.slug}`} className="shrink-0"><img src={i.image.replace('w=900', 'w=300')} alt="" className="h-36 w-28 object-cover" /></Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4"><Link to={`/product/${i.slug}`} className="font-serif text-xl hover:underline">{i.name}</Link><button onClick={() => setQty(i.key, 0)} aria-label="Remove" className="text-ink/40 hover:text-ink cursor-pointer"><X size={18} /></button></div>
                    <div className="mt-1 text-sm text-ink/50">{i.color} · {money2(i.price)}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-ink/20"><button onClick={() => setQty(i.key, i.qty - 1)} className="px-3 py-2 cursor-pointer" aria-label="Decrease"><Minus size={12} /></button><span className="w-6 text-center text-sm">{i.qty}</span><button onClick={() => setQty(i.key, i.qty + 1)} className="px-3 py-2 cursor-pointer" aria-label="Increase"><Plus size={12} /></button></div>
                      <span>{money2(i.qty * i.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {step === 1 && (
            <form id="step" onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="grid gap-4 sm:grid-cols-2">
              <input required type="email" placeholder="Email address" value={info.email} onChange={set('email')} className={`${field} sm:col-span-2`} />
              <input required placeholder="Full name" value={info.name} onChange={set('name')} className={`${field} sm:col-span-2`} />
              <input required placeholder="Street address" value={info.address} onChange={set('address')} className={`${field} sm:col-span-2`} />
              <input required placeholder="City" value={info.city} onChange={set('city')} className={field} />
              <input required placeholder="Postal code" value={info.zip} onChange={set('zip')} className={field} />
              <select value={info.country} onChange={set('country')} className={field}>{['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'United Arab Emirates'].map((c) => <option key={c}>{c}</option>)}</select>
              <input placeholder="Phone (optional)" value={info.phone} onChange={set('phone')} className={field} />
            </form>
          )}
          {step === 2 && (
            <form id="step" onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-3">
              {[['standard', 'Standard delivery', '3–5 business days', subtotal - discount >= 150 || applied?.type === 'ship' ? 'Free' : '$12.00'], ['express', 'Express delivery', '1–2 business days', '$24.00']].map(([v, l, d, price]) => (
                <label key={v} className={`flex cursor-pointer items-center gap-4 border p-5 ${delivery === v ? 'border-ink' : 'border-ink/20'}`}>
                  <input type="radio" name="d" checked={delivery === v} onChange={() => setDelivery(v)} className="accent-clay" />
                  <div className="flex-1"><div>{l}</div><div className="text-sm text-ink/50">{d}</div></div><span>{price}</span>
                </label>
              ))}
              <div className="border border-ink/10 bg-sand/50 p-5 text-sm text-ink/70">Shipping to: {info.name}, {info.address}, {info.city} {info.zip}, {info.country}</div>
            </form>
          )}
          {step === 3 && (
            <form id="step" onSubmit={placeOrder} className="space-y-4">
              <div className="flex items-center gap-2 border border-ink/10 bg-sand/50 p-4 text-sm text-ink/70"><Lock size={15} /> This is a demo store — no card details are requested and you will not be charged.</div>
              <label className="flex cursor-pointer items-center gap-4 border border-ink p-5"><input type="radio" defaultChecked className="accent-clay" /><div className="flex-1"><div>Demo payment</div><div className="text-sm text-ink/50">Simulates a successful payment</div></div></label>
              <label className="flex items-center gap-3 text-sm text-ink/70"><input type="checkbox" required className="accent-clay" /> I agree to the terms of sale</label>
            </form>
          )}
          {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink cursor-pointer"><ArrowLeft size={13} /> Back</button>}
        </div>
        <aside className="h-fit bg-sand/60 p-8 lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="font-serif text-2xl">Order summary</h2>
          {step > 0 && (
            <ul className="mt-6 space-y-3">
              {cart.map((i) => <li key={i.key} className="flex items-center gap-3 text-sm"><img src={i.image.replace('w=900', 'w=120')} alt="" className="h-14 w-12 object-cover" /><span className="flex-1">{i.name} <span className="text-ink/50">× {i.qty}</span></span><span>{money2(i.qty * i.price)}</span></li>)}
            </ul>
          )}
          <div className="mt-6 flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="h-11 flex-1 border border-ink/20 bg-cream px-3 text-sm uppercase outline-none" />
            <button onClick={applyPromo} className="border border-ink px-4 text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-cream cursor-pointer">Apply</button>
          </div>
          {promoMsg && <p className={`mt-2 text-xs ${applied ? 'text-emerald-700' : 'text-rose-700'}`}>{promoMsg}</p>}
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{money2(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-clay"><dt>Discount</dt><dd>−{money2(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-ink/60">Shipping</dt><dd>{shipBase ? money2(shipBase) : 'Free'}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/60">Tax (7%)</dt><dd>{money2(tax)}</dd></div>
            <div className="flex justify-between border-t border-ink/10 pt-4 text-lg"><dt>Total</dt><dd>{money2(total)}</dd></div>
          </dl>
          {subtotal < 150 && step === 0 && <p className="mt-4 text-xs text-ink/50">Add {money2(150 - subtotal)} more for free shipping.</p>}
          {step === 0 ? (
            <button onClick={() => setStep(1)} className="mt-8 h-14 w-full bg-ink text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-clay cursor-pointer">Checkout</button>
          ) : (
            <button type="submit" form="step" className="mt-8 h-14 w-full bg-ink text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-clay cursor-pointer">{step === 3 ? `Place order · ${money2(total)}` : 'Continue'}</button>
          )}
          <p className="mt-4 text-center text-xs text-ink/40">Try code LUMIERE10 or FREESHIP</p>
        </aside>
      </div>
    </main>
  );
}
