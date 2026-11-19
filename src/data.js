export const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES = [
  { id: 'living', name: 'Living', image: img('photo-1724582586529-62622e50c0b3', 1000), blurb: 'Soft textures and sculptural lighting' },
  { id: 'bedroom', name: 'Bedroom', image: img('photo-1616594039964-ae9021a400a0', 1000), blurb: 'Linen, layers and calm' },
  { id: 'dining', name: 'Kitchen & Dining', image: img('photo-1571987530791-58e3e7744d99', 1000), blurb: 'Stoneware made for everyday rituals' },
  { id: 'decor', name: 'Decor', image: img('photo-1631125915902-d8abe9225ff2', 1000), blurb: 'Handmade objects with character' },
];

const P = [
  ['Terra Stoneware Vase Set', 'decor', 86, null, ['photo-1631125915902-d8abe9225ff2', 'photo-1597696929736-6d13bed8e6a8'], ['Sand', 'Bone'], 'A trio of hand-thrown stoneware vases in earthy, matte glazes. Each piece is unique, with subtle variations from the kiln.', true],
  ['Alba Ceramic Vase', 'decor', 58, null, ['photo-1612196808214-b8e1d6145a8c'], ['Chalk'], 'A rounded silhouette with a soft chalk finish — beautiful alone or with a single dried stem.', false],
  ['Amber Glass Candle', 'decor', 34, 42, ['photo-1528351655744-27cc30462816'], ['Cedar & Fig', 'Amber Musk'], 'Hand-poured soy wax in recycled glass. 55-hour burn time with a cotton wick for a clean, even flame.', true],
  ['Moon Glow Table Lamp', 'living', 148, null, ['photo-1580130281320-0ef0754f2bf7'], ['Ivory'], 'A textured ceramic base topped with a linen shade, casting a warm, diffused light.', true],
  ['Tripod Linen Lamp', 'living', 129, 159, ['photo-1517991104123-1d56a6e81ed9'], ['Natural Oak'], 'Solid oak tripod legs and a pleated linen shade. Mid-century lines for modern spaces.', false],
  ['Opal Globe Lamp', 'living', 112, null, ['photo-1585128719715-46776b56a0d1'], ['Brass'], 'A hand-blown opal glass globe on a brushed brass base. Dimmable warm LED included.', false],
  ['Cloud Knit Throw', 'living', 98, null, ['photo-1602891867080-1d56348202a3', 'photo-1600369672770-985fd30004eb'], ['Stone', 'Oat'], 'Chunky knit from recycled cotton blend, impossibly soft and generously sized at 130 × 170 cm.', true],
  ['Linen Cushion Cover', 'living', 39, null, ['photo-1629949009765-40fc74c9ec21', 'photo-1629949009710-2df14c41a72e'], ['Ivory', 'Charcoal'], 'Stonewashed European flax with a hidden zip. Fits a 50 × 50 cm insert.', false],
  ['Lounge Accent Chair', 'living', 489, 560, ['photo-1598300042247-d088f8ab3a91'], ['Dove Grey'], 'A sculpted shell upholstered in performance bouclé, on solid ash legs. Comfortable for hours.', true],
  ['Washed Linen Duvet Set', 'bedroom', 229, null, ['photo-1634665810235-011d663754e7', 'photo-1617325247661-675ab4b64ae2'], ['Oat', 'White', 'Clay'], 'Pre-washed French linen that gets softer with every wash. Includes duvet cover and two pillowcases.', true],
  ['Linen Sheet Bundle', 'bedroom', 179, null, ['photo-1596433904500-97b901c5d274'], ['Oat', 'White'], 'Fitted sheet, flat sheet and pillowcases in breathable, temperature-regulating linen.', false],
  ['Woven Storage Basket', 'bedroom', 46, null, ['photo-1601241275443-c8e71e7daae4'], ['Natural'], 'Handwoven seagrass basket — perfect for throws, toys or plants.', false],
  ['Arch Wall Mirror', 'bedroom', 168, 199, ['photo-1592048401715-d18c53553bd0'], ['Brass'], 'A slim brass frame with gently rounded corners that opens up any room.', false],
  ['Morning Stoneware Mug', 'dining', 24, null, ['photo-1616241673111-508b4662c707', 'photo-1570784332176-fdd73da66f03'], ['Speckled White', 'Ink'], 'A generous 350ml mug with a comfortable handle. Dishwasher and microwave safe.', true],
  ['Dinner Plate Set of 4', 'dining', 92, null, ['photo-1591632288574-a387f820a1ca', 'photo-1614548539644-ef528186523a'], ['Bone'], 'Reactive-glaze stoneware plates, 27cm. Made in Portugal by a family-run pottery.', false],
  ['Glass Water Carafe', 'dining', 38, null, ['photo-1589807502973-c7be2ee95d99'], ['Clear'], 'Mouth-blown borosilicate glass with a cork-and-glass stopper. 1 litre.', false],
  ['Potted Aloe in Ceramic', 'decor', 32, null, ['photo-1485955900006-10f4d324d411'], ['Mint'], 'A hardy aloe in a glazed ceramic pot with drainage saucer. Low maintenance, high impact.', false],
  ['Planter Trio', 'decor', 64, null, ['photo-1463320898484-cdee8141c787'], ['Concrete'], 'Three cast planters in graduated sizes for herbs, succulents or trailing plants.', false],
];

export const PRODUCTS = P.map(([name, category, price, compareAt, images, colors, description, best], i) => ({
  id: `l${i}`, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), name, category, price, compareAt,
  images: images.map((x) => img(x)), colors, description, bestseller: best, rating: [4.8, 4.9, 4.7, 5.0][i % 4], reviews: 24 + ((i * 37) % 180), isNew: i % 5 === 1,
}));

export const COLOR_SWATCH = { Sand: '#d9c7ab', Bone: '#ece4d6', Chalk: '#f4f1ea', 'Cedar & Fig': '#7a5b3e', 'Amber Musk': '#c58b3a', Ivory: '#f6f0e3', 'Natural Oak': '#c49a6c', Brass: '#b8913f', Stone: '#a8a29e', Oat: '#e6d9c3', Charcoal: '#3f3f46', 'Dove Grey': '#9ca3af', White: '#ffffff', Clay: '#b5653a', Natural: '#cfb68a', 'Speckled White': '#f1ede6', Ink: '#1f2937', Clear: '#e0f2fe', Mint: '#a7f3d0', Concrete: '#a1a1aa' };

export const PROMOS = { LUMIERE10: { type: 'percent', value: 10, label: '10% off' }, FREESHIP: { type: 'ship', value: 0, label: 'Free shipping' } };

export const seed = () => ({ cart: [], wishlist: [], orders: [] });
