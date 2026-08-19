import { Shoe } from '../types';
const luxuryShoeImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786261919723_X4tnZQt81.png';

const newImg1 = 'https://ik.imagekit.io/19imy4f1u/lite_1786264203722_cuv3fgysw.webp';
const newImg2 = 'https://ik.imagekit.io/19imy4f1u/lite_1786264237956_NsCaK9P-R.webp';
const newImg3 = 'https://ik.imagekit.io/19imy4f1u/lite_1786264272058_8vkP9TEdb.webp';
const newImg4 = 'https://ik.imagekit.io/19imy4f1u/lite_1786264288902_mFRWnMHzF.webp';
const newImg5 = 'https://ik.imagekit.io/19imy4f1u/lite_1786264307560_GTXR16vvi.webp';

const exotekNitroImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786258067340_MNbN9lzOW.png';
const fvIvyLeagueImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786258315464_3D9Mv6OkS.png';
const caProLuxImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786258404690_Lm7CPSfUH.png';
const rsxBrandLoveImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786258466147_Fa80Ze-i4.png';
const xcellNovaImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786258606639_s4MECv8NS.png';
const denimShoeImg = 'https://ik.imagekit.io/19imy4f1u/lite_1786259543379_xUwidyq5P.png';

export const PUMA_SHOES: Shoe[] = [
  {
    id: 'slipstream-denim-08',
    brand: 'PUMA',
    model: 'Slipstream Denim',
    fullName: 'Slipstream Lo Denim Retro Sneakers',
    price: 13999,
    originalPrice: 16999,
    rating: 4.9,
    reviewCount: 112,
    category: 'MEN',
    gender: 'Unisex',
    tag: 'LIMITED',
    isHero: true,
    heroSlogan: 'DENIM REDEFINED',
    image: denimShoeImg,
    description: 'A classic 80s basketball silhouette reimagined with premium washed denim overlays and a classic white leather base for ultimate street style. The ultimate collision of vintage court heritage and modern denim trend.',
    specs: {
      upper: 'Premium washed denim with leather accents',
      midsole: 'Anti-fatigue rubber cupsole',
      outsole: 'High-traction rubber tread',
      weight: '320g (UK 8)',
      cushioning: 'Medium Shock Absorption'
    },
    colorways: [
      { name: 'Washed Blue Denim', hex: '#6082B6', secondaryHex: '#ffffff', image: denimShoeImg },
      { name: 'Raw Indigo', hex: '#2c3e50', secondaryHex: '#bdc3c7', image: denimShoeImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    reviews: [
      {
        id: 'r1d',
        userName: 'Hamza A.',
        rating: 5,
        comment: 'The denim finish is insane in person. Super comfortable.',
        date: '2026-08-05',
        verified: true
      }
    ]
  },
  {
    id: 'exotek-nitro-01',
    brand: 'PUMA',
    model: 'Exotek NITRO',
    fullName: 'Exotek NITRO Energy Unisex Sneakers',
    price: 12999,
    originalPrice: 15999,
    rating: 5.0,
    reviewCount: 142,
    category: 'MEN',
    gender: 'Unisex',
    tag: 'FEATURED',
    isHero: true,
    heroSlogan: 'FOREVER FASTER..',
    image: exotekNitroImg,
    description: 'Engineered for relentless performance and futuristic street aesthetic. Features Puma’s pinnacle NITRO™ foam technology in the midsole for lightweight responsiveness, wrapped in a ventilated mesh cage with TPU cage stabilization.',
    specs: {
      upper: 'Breathable engineered textile mesh with heat-pressed overlays',
      midsole: 'PUMA NITRO™ nitrogen-injected foam for ultra-light cushioning',
      outsole: 'PUMAGRIP high-traction rubber outsole',
      weight: '310g (UK 8)',
      cushioning: 'Maximum NITRO'
    },
    colorways: [
      { name: 'Dark Grey / Mint', hex: '#374151', secondaryHex: '#2dd4bf', image: exotekNitroImg },
      { name: 'Stealth Black', hex: '#111827', secondaryHex: '#000000', image: exotekNitroImg },
      { name: 'Cyber White / Neon', hex: '#f3f4f6', secondaryHex: '#a855f7', image: exotekNitroImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    reviews: [
      {
        id: 'r1',
        userName: 'Ahmad K.',
        rating: 5,
        comment: 'Unbelievable comfort and the design turns heads everywhere in Lahore!',
        date: '2026-08-02',
        verified: true
      },
      {
        id: 'r2',
        userName: 'Zainab R.',
        rating: 5,
        comment: 'Nitro foam feels like walking on air. Highly recommended!',
        date: '2026-07-28',
        verified: true
      }
    ]
  },
  {
    id: 'fv-ivyleague-02',
    brand: 'PUMA',
    model: 'FV-Ivy League',
    fullName: 'FV-Ivy League Lace-Up Sneakers',
    price: 8999,
    originalPrice: 10999,
    rating: 5.0,
    reviewCount: 94,
    category: 'MEN',
    gender: 'Men',
    tag: 'NEW',
    image: fvIvyLeagueImg,
    description: 'Nostalgic varsity aesthetic combined with modern street comfort. Soft premium sage leather accents paired with classic Ivy League white quarter panels.',
    specs: {
      upper: 'Full grain leather with hairy suede formstrip',
      midsole: 'CMEVA compression-molded EVA lightweight performance',
      outsole: 'Classic heritage gum rubber tread',
      weight: '290g',
      cushioning: 'Medium'
    },
    colorways: [
      { name: 'Sage Green / White', hex: '#84a98c', secondaryHex: '#ffffff', image: fvIvyLeagueImg },
      { name: 'Navy / Ivory', hex: '#1e3a8a', secondaryHex: '#ffedd5', image: fvIvyLeagueImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: 'ca-pro-lux-03',
    brand: 'PUMA',
    model: 'CA Pro Lux',
    fullName: 'CA Pro Lux Replace Lace-Up Sneakers',
    price: 6799,
    originalPrice: 8499,
    rating: 5.0,
    reviewCount: 86,
    category: 'MEN',
    gender: 'Men',
    tag: 'BEST SELLER',
    isHero: true,
    heroSlogan: 'LUXURY REDEFINED',
    image: caProLuxImg,
    description: 'Inspired by the original California tennis icon, refined with luxurious mustard suede upper and interchangeable heel accents for versatile street elegance.',
    specs: {
      upper: 'Premium suede leather with double-stitched details',
      midsole: 'Stacked rubber midsole for elevated comfort profile',
      outsole: 'Non-marking durable rubber outsole',
      weight: '330g',
      cushioning: 'Medium'
    },
    colorways: [
      { name: 'Mustard Tan / White', hex: '#d97706', secondaryHex: '#ffffff', image: caProLuxImg },
      { name: 'Cognac Brown', hex: '#78350f', secondaryHex: '#fef3c7', image: caProLuxImg }
    ],
    availableSizes: [7, 8, 9, 10, 11]
  },
  {
    id: 'rsx-brandlove-04',
    brand: 'PUMA',
    model: 'RS-X Brand Love',
    fullName: 'RS-X Brand Love Unisex Sneakers',
    price: 10999,
    originalPrice: 12999,
    rating: 5.0,
    reviewCount: 152,
    category: 'SALE',
    gender: 'Unisex',
    tag: 'BEST SELLER',
    isHero: true,
    heroSlogan: 'RETRO FUTURISM',
    image: rsxBrandLoveImg,
    description: 'Extreme retro-futuristic silhouette celebrating PUMA heritage. Bold multi-layer construction with responsive Running System (RS) cushioning technology.',
    specs: {
      upper: 'Mesh upper with synthetic suede and leather overlays',
      midsole: 'PUMA Running System retro cushioning tech',
      outsole: 'Multi-color rubber grip outsole',
      weight: '340g',
      cushioning: 'Soft'
    },
    colorways: [
      { name: 'White / Sunlight Orange', hex: '#ffffff', secondaryHex: '#f97316', image: rsxBrandLoveImg },
      { name: 'Triple White', hex: '#ffffff', secondaryHex: '#e5e7eb', image: rsxBrandLoveImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: 'xcell-nova-05',
    brand: 'PUMA',
    model: 'X-Cell Nova FS Ultra',
    fullName: 'X-Cell Nova FS Ultra Unisex Running Shoes',
    price: 12999,
    originalPrice: 14999,
    rating: 5.0,
    reviewCount: 110,
    category: 'WOMEN',
    gender: 'Unisex',
    tag: 'NEW',
    image: xcellNovaImg,
    description: 'Designed for high-impact running energy return. Packed with X-Cell heel support frame and SoftFoam+ sockliner for instantly plush step-in comfort.',
    specs: {
      upper: 'Ultra-light breathable knit mesh with lock-down lace loop',
      midsole: 'X-Cell cushioning bubble at heel with ProFoam Lite EVA',
      outsole: 'Zoned rubber for durability and road traction',
      weight: '275g',
      cushioning: 'Maximum NITRO'
    },
    colorways: [
      { name: 'Crimson Red / Black', hex: '#dc2626', secondaryHex: '#000000', image: xcellNovaImg },
      { name: 'Electric Royal', hex: '#2563eb', secondaryHex: '#000000', image: xcellNovaImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: 'speedcat-og-06',
    brand: 'PUMA',
    model: 'Speedcat OG',
    fullName: 'Speedcat OG Sparco Driving Shoes',
    price: 9499,
    originalPrice: 11999,
    rating: 4.9,
    reviewCount: 78,
    category: 'MEN',
    gender: 'Men',
    tag: 'LIMITED',
    image: caProLuxImg,
    description: 'The legendary Motorsport icon. Ultra-slim aerodynamic low-profile suede boot designed for precision control and track-side luxury style.',
    specs: {
      upper: 'Ultra-soft suede with classic Sparco badge',
      midsole: 'Low-profile rubber racing midsole',
      outsole: 'Rounded driver heel rubber tread',
      weight: '240g',
      cushioning: 'Soft'
    },
    colorways: [
      { name: 'Puma Black / White', hex: '#18181b', secondaryHex: '#ffffff', image: caProLuxImg },
      { name: 'Fiery Red / White', hex: '#ef4444', secondaryHex: '#ffffff', image: caProLuxImg }
    ],
    availableSizes: [6, 7, 8, 9, 10]
  },
  {
    id: 'suede-classic-07',
    brand: 'PUMA',
    model: 'Suede Classic XXI',
    fullName: 'Suede Classic XXI Unisex Sneakers',
    price: 7499,
    originalPrice: 8999,
    rating: 4.8,
    reviewCount: 210,
    category: 'KIDS',
    gender: 'Unisex',
    tag: 'BEST SELLER',
    image: fvIvyLeagueImg,
    description: 'The all-time icon that started it all in 1968. Soft velvety suede upper with signature formstrip on lateral sides.',
    specs: {
      upper: '100% Suede with synthetic lining',
      midsole: 'Textured rubber midsole',
      outsole: 'Grip rubber outsole',
      weight: '300g',
      cushioning: 'Medium'
    },
    colorways: [
      { name: 'Black / Gum', hex: '#000000', secondaryHex: '#b45309', image: fvIvyLeagueImg },
      { name: 'Peacoat Blue', hex: '#1e3a8a', secondaryHex: '#ffffff', image: fvIvyLeagueImg }
    ],
    availableSizes: [4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: '78-celebrity-lux-09',
    brand: '78 Shoes',
    model: 'Celebrity Lux',
    fullName: '78 Celebrity Lux Edition Sneakers',
    price: 24999,
    originalPrice: 29999,
    rating: 5.0,
    reviewCount: 340,
    category: 'MEN',
    gender: 'Unisex',
    tag: 'LIMITED',
    isHero: false,
    heroSlogan: 'WALK LIKE A CELEBRITY',
    image: luxuryShoeImg,
    description: 'The ultimate statement piece. Handcrafted with premium black Italian leather and adorned with luxurious gold accents, these sneakers are designed for those who command the spotlight.',
    specs: {
      upper: 'Premium black full-grain Italian leather with gold-plated accents',
      midsole: 'Advanced ultra-plush celebrity foam for all-day red carpet comfort',
      outsole: 'Anti-slip designer rubber sole with engraved 78 emblem',
      weight: '350g (UK 8)',
      cushioning: 'Maximum Celebrity Plush'
    },
    colorways: [
      { name: 'Midnight Gold', hex: '#000000', secondaryHex: '#FFD700', image: luxuryShoeImg }
    ],
    availableSizes: [6, 7, 8, 9, 10, 11, 12],
    reviews: [
      {
        id: 'r_lux1',
        userName: 'Zayn M.',
        rating: 5,
        comment: 'These are incredible! I feel like a superstar wearing them.',
        date: '2026-08-08',
        verified: true
      }
    ]
  },
  {
    id: '78-new-style-01',
    brand: '78 Shoes',
    model: 'Street Style v1',
    fullName: '78 Street Style Edition',
    price: 15999,
    originalPrice: 18999,
    rating: 4.8,
    reviewCount: 45,
    category: 'MEN',
    gender: 'Men',
    tag: 'NEW',
    isHero: false,
    image: newImg1,
    description: 'A perfect blend of modern comfort and classic streetwear vibes. Elevate your everyday style with these premium sneakers.',
    specs: {
      upper: 'Premium breathable mesh with synthetic overlays',
      midsole: 'Ultra-cushioned responsive foam',
      outsole: 'High-traction rubber tread',
      weight: '310g',
      cushioning: 'High'
    },
    colorways: [
      { name: 'Classic Street', hex: '#000000', secondaryHex: '#ffffff', image: newImg1 }
    ],
    availableSizes: [7, 8, 9, 10, 11]
  },
  {
    id: '78-urban-walk-02',
    brand: '78 Shoes',
    model: 'Urban Walk',
    fullName: '78 Urban Walk Pro',
    price: 14599,
    originalPrice: 16999,
    rating: 4.9,
    reviewCount: 88,
    category: 'WOMEN',
    gender: 'Women',
    tag: 'TRENDING',
    isHero: false,
    image: newImg2,
    description: 'Designed for the modern city walker. Lightweight construction meets durable materials for all-day urban exploration.',
    specs: {
      upper: 'Lightweight knit upper',
      midsole: 'Energy-returning core',
      outsole: 'Durable anti-slip rubber',
      weight: '280g',
      cushioning: 'Medium'
    },
    colorways: [
      { name: 'City Vibes', hex: '#333333', secondaryHex: '#dddddd', image: newImg2 }
    ],
    availableSizes: [5, 6, 7, 8, 9]
  },
  {
    id: '78-power-run-03',
    brand: '78 Shoes',
    model: 'Power Run',
    fullName: '78 Power Run Athletics',
    price: 18999,
    originalPrice: 21999,
    rating: 5.0,
    reviewCount: 120,
    category: 'MEN',
    gender: 'Men',
    tag: 'BEST SELLER',
    isHero: false,
    image: newImg3,
    description: 'Push your limits with the ultimate running shoe. Maximum energy return and targeted support where you need it most.',
    specs: {
      upper: 'Engineered performance mesh',
      midsole: 'Max-cushion racing foam',
      outsole: 'Aerodynamic tread pattern',
      weight: '250g',
      cushioning: 'Maximum'
    },
    colorways: [
      { name: 'Speed Core', hex: '#111111', secondaryHex: '#ff0000', image: newImg3 }
    ],
    availableSizes: [8, 9, 10, 11, 12]
  },
  {
    id: '78-chill-lounge-04',
    brand: '78 Shoes',
    model: 'Chill Lounge',
    fullName: '78 Chill Lounge Comfort',
    price: 9999,
    originalPrice: 12999,
    rating: 4.7,
    reviewCount: 65,
    category: 'KIDS',
    gender: 'Unisex',
    tag: 'NEW',
    isHero: false,
    image: newImg4,
    description: 'Easy to slip on and ultra-comfortable. The perfect shoe for relaxing weekends or casual hangouts.',
    specs: {
      upper: 'Soft canvas fabric',
      midsole: 'Memory foam footbed',
      outsole: 'Flexible rubber sole',
      weight: '220g',
      cushioning: 'Plush'
    },
    colorways: [
      { name: 'Weekend Casual', hex: '#666666', secondaryHex: '#aaaaaa', image: newImg4 }
    ],
    availableSizes: [4, 5, 6, 7]
  },
  {
    id: '78-elite-court-05',
    brand: '78 Shoes',
    model: 'Elite Court',
    fullName: '78 Elite Court Vintage',
    price: 17499,
    originalPrice: 19999,
    rating: 4.9,
    reviewCount: 205,
    category: 'MEN',
    gender: 'Unisex',
    tag: 'LIMITED',
    isHero: false,
    image: newImg5,
    description: 'Retro court style reborn with modern luxury materials. A timeless silhouette for the fashion-forward sneakerhead.',
    specs: {
      upper: 'Premium full-grain leather',
      midsole: 'Classic cupsole construction',
      outsole: 'Heritage herringbone grip',
      weight: '340g',
      cushioning: 'Firm'
    },
    colorways: [
      { name: 'Vintage Court', hex: '#ffffff', secondaryHex: '#000000', image: newImg5 }
    ],
    availableSizes: [7, 8, 9, 10, 11]
  }
];

export const PROMO_CODES: Record<string, number> = {
  'JOIN10': 0.10,
  'CELEB10': 0.10,
  '78FREE': 0.15,
  'PUMA10': 0.10,
  'FOREVERFASTER': 0.15,
  'WELCOME20': 0.20,
  'VIP25': 0.25,
};

export const PROMO_DETAILS = [
  { code: 'JOIN10', discount: '10% OFF', description: 'Community VIP welcome discount code.', minSpend: 0 },
  { code: 'CELEB10', discount: '10% OFF', description: 'Special celebrity collection discount code.', minSpend: 0 },
  { code: '78FREE', discount: '15% OFF + FREE Express Shipping', description: 'Get 15% discount + priority VIP courier shipping across Pakistan.', minSpend: 0 },
  { code: 'WELCOME20', discount: '20% OFF', description: 'Exclusive first-order discount code for new members.', minSpend: 5000 },
  { code: 'VIP25', discount: '25% OFF', description: 'Special VIP member discount on orders above Rs 15,000.', minSpend: 15000 },
  { code: 'FOREVERFASTER', discount: '15% OFF', description: 'Forever Faster performance series discount code.', minSpend: 0 },
];

