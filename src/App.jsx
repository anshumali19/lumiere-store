import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search, Instagram, Facebook, Mail } from 'lucide-react';
import { useDB } from './kit/db';
import { useToast } from './kit/ui';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';

export function useStore() {
  const { db, setKey } = useDB();
  const toast = useToast();
  return {
    cart: db.cart,
    wishlist: db.wishlist,
    count: db.cart.reduce((s, i) => s + i.qty, 0),
    addToCart: (p, color, qty = 1) => {
      const key = `${p.id}:${color}`;
      setKey('cart', (c) => (c.find((i) => i.key === key) ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)) : [...c, { key, id: p.id, slug: p.slug, name: p.name, image: p.images[0], price: p.price, color, qty }]));
      toast(`${p.name} added to your bag`);
    },
    setQty: (key, qty) => setKey('cart', (c) => (qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i)))),
    toggleWish: (id) => setKey('wishlist', (w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    clearCart: () => setKey('cart', []),
    saveOrder: (o) => setKey('orders', (os) => [o, ...os]),
  };
}

function Header() {
  const { count, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const home = loc.pathname === '/';
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const solid = !home || scrolled;
  const links = [{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }, { to: '/shop?category=living', label: 'Living' }, { to: '/shop?category=bedroom', label: 'Bedroom' }, { to: '/shop?category=dining', label: 'Dining' }];
  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-[11px] uppercase tracking-[0.2em] text-cream/90">Complimentary shipping over $150 · Use code <b>LUMIERE10</b> for 10% off</div>
      <header className={`sticky top-0 z-40 transition-colors duration-300 ${solid ? 'border-b border-ink/10 bg-cream/95 backdrop-blur' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-18 max-w-7xl items-center px-5 sm:px-8">
          <button className="mr-3 lg:hidden cursor-pointer" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {links.map((l) => <NavLink key={l.label} to={l.to} end className="text-[13px] uppercase tracking-[0.15em] text-ink/70 transition hover:text-ink">{l.label}</NavLink>)}
          </nav>
          <Link to="/" className="font-serif text-3xl tracking-tight lg:absolute lg:left-1/2 lg:-translate-x-1/2">Lumière</Link>
          <div className="ml-auto flex flex-1 items-center justify-end gap-5">
            <Link to="/shop" aria-label="Search" className="hidden sm:block"><Search size={19} strokeWidth={1.6} /></Link>
            <Link to="/shop?wishlist=1" aria-label="Wishlist" className="relative"><Heart size={19} strokeWidth={1.6} />{wishlist.length > 0 && <span className="absolute -right-2 -top-1.5 h-4 min-w-4 rounded-full bg-clay px-1 text-center text-[10px] leading-4 text-white">{wishlist.length}</span>}</Link>
            <Link to="/cart" aria-label="Bag" className="relative flex items-center gap-2"><ShoppingBag size={19} strokeWidth={1.6} /><span className="hidden text-[13px] sm:inline">Bag ({count})</span>{count > 0 && <span className="absolute -right-2 -top-1.5 h-4 min-w-4 rounded-full bg-clay px-1 text-center text-[10px] leading-4 text-white sm:hidden">{count}</span>}</Link>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 bg-cream p-8 animate-slide-left">
            <button onClick={() => setOpen(false)} className="mb-10 cursor-pointer" aria-label="Close menu"><X size={22} /></button>
            <nav className="flex flex-col gap-6">{links.map((l) => <Link key={l.label} to={l.to} className="font-serif text-3xl">{l.label}</Link>)}</nav>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  const toast = useToast();
  return (
    <footer className="mt-28 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-serif text-4xl">Lumière</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">Thoughtfully made home goods from independent makers. Designed to be lived with, loved and kept.</p>
          <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Welcome to Lumière — check your inbox for 10% off'); }} className="mt-8 flex max-w-sm border-b border-cream/30">
            <input type="email" required placeholder="Your email" className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-cream/40" />
            <button className="text-xs uppercase tracking-[0.2em] cursor-pointer">Subscribe</button>
          </form>
        </div>
        <div className="md:col-span-2 md:col-start-7">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">Shop</div>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link to="/shop?category=living">Living</Link></li><li><Link to="/shop?category=bedroom">Bedroom</Link></li><li><Link to="/shop?category=dining">Kitchen & Dining</Link></li><li><Link to="/shop?category=decor">Decor</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">Help</div>
          <ul className="space-y-2.5 text-sm text-cream/80"><li><a href="/#about">Our story</a></li><li><Link to="/cart">Shipping</Link></li><li><Link to="/cart">Returns</Link></li><li><a href="mailto:hello@lumiere.example">Contact</a></li></ul>
        </div>
        <div className="md:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50">Follow</div>
          <div className="flex gap-4 text-cream/80"><Instagram size={18} /><Facebook size={18} /><Mail size={18} /></div>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-6 text-center text-xs text-cream/40">© {new Date().getFullYear()} Lumière Home. All rights reserved. · Demo storefront</div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div className="py-40 text-center"><h1 className="font-serif text-5xl">Page not found</h1><Link to="/" className="mt-6 inline-block underline">Return home</Link></div>} />
      </Routes>
      <Footer />
    </div>
  );
}
