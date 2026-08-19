export type CategoryType = 'ALL' | 'MEN' | 'WOMEN' | 'KIDS' | 'SALE';
export type CurrencyCode = 'PKR' | 'USD' | 'AED' | 'EUR';

export interface ShoeColorway {
  name: string;
  hex: string;
  secondaryHex?: string;
  image: string;
}

export interface ShoeReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Shoe {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: CategoryType;
  gender: 'Unisex' | 'Men' | 'Women' | 'Kids';
  tag?: string;
  image: string;
  images?: string[];
  description: string;
  specs: {
    upper: string;
    midsole: string;
    outsole: string;
    weight: string;
    cushioning: string;
  };
  colorways: ShoeColorway[];
  availableSizes: number[];
  isHero?: boolean;
  heroSlogan?: string;
  reviews?: ShoeReview[];
}

export interface CartItem {
  id: string; // unique cart item key: shoeId-size-color
  shoe: Shoe;
  selectedSize: number;
  selectedColor: ShoeColorway;
  quantity: number;
}

export interface FilterState {
  category: CategoryType;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  selectedSize: number | null;
  genderFilter: string | null;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}
