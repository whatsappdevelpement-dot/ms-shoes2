import React, { useState } from 'react';
import { Shoe, CategoryType, ShoeColorway, CurrencyCode } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Banknote, Sparkles, Crown, LayoutGrid, List, Search, X, Scale, Filter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CompareModal } from './CompareModal';

interface ProductGridProps {
  shoes: Shoe[];
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway) => void;
  onQuickView: (shoe: Shoe) => void;
  wishlistIds: string[];
  onToggleWishlist: (shoe: Shoe) => void;
  searchQuery: string;
  currency?: CurrencyCode;
  compareShoes?: Shoe[];
  onToggleCompareShoe?: (shoe: Shoe) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  shoes,
  activeCategory,
  setActiveCategory,
  onAddToCart,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  searchQuery: globalSearchQuery,
  currency = 'PKR',
  compareShoes = [],
  onToggleCompareShoe,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest' | 'best-sellers' | 'trending' | 'rating'>('featured');
  const [categoryTag, setCategoryTag] = useState<'ALL' | 'NEW_ARRIVALS' | 'BEST_SELLERS' | 'TRENDING'>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);

  // Compare shoes state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  const maxAvailablePrice = shoes.length > 0 ? Math.max(...shoes.map((s) => s.price)) : 50000;
  const minAvailablePrice = shoes.length > 0 ? Math.min(...shoes.map((s) => s.price)) : 0;
  
  const [maxPrice, setMaxPrice] = useState<number>(maxAvailablePrice);

  const availableSizesList = [6, 7, 8, 9, 10, 11, 12];

  const handleToggleCompare = (shoe: Shoe) => {
    setCompareIds((prev) => {
      if (prev.includes(shoe.id)) {
        return prev.filter((id) => id !== shoe.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 shoes at a time.');
          return prev;
        }
        return [...prev, shoe.id];
      }
    });
  };

  const activeCompareShoes = shoes.filter((s) => compareIds.includes(s.id));

  // Filter logic
  const effectiveSearch = localSearch.trim() || globalSearchQuery.trim();

  const filteredShoes = shoes.filter((shoe) => {
    // Category check
    if (activeCategory !== 'ALL' && activeCategory !== 'SALE') {
      if (shoe.category !== activeCategory && shoe.gender.toUpperCase() !== activeCategory) {
        return false;
      }
    } else if (activeCategory === 'SALE') {
      if (!shoe.originalPrice) return false;
    }

    if (onSaleOnly && !shoe.originalPrice) {
      return false;
    }

    // Search query check
    if (effectiveSearch) {
      const q = effectiveSearch.toLowerCase();
      const matchesName = shoe.fullName.toLowerCase().includes(q);
      const matchesModel = shoe.model.toLowerCase().includes(q);
      const matchesBrand = shoe.brand.toLowerCase().includes(q);
      const matchesDesc = shoe.description.toLowerCase().includes(q);
      const matchesTag = shoe.tag ? shoe.tag.toLowerCase().includes(q) : false;
      if (!matchesName && !matchesModel && !matchesBrand && !matchesDesc && !matchesTag) return false;
    }

    // Category Tag filter check (New Arrivals, Best Sellers, Trending)
    if (categoryTag === 'NEW_ARRIVALS') {
      const isNew = shoe.tag === 'NEW' || shoe.tag === 'LIMITED' || shoe.tag === 'FEATURED';
      if (!isNew) return false;
    } else if (categoryTag === 'BEST_SELLERS') {
      const isBestSeller = shoe.rating >= 4.8 || shoe.reviewCount >= 80 || shoe.tag === 'FEATURED' || shoe.tag === 'BESTSELLER';
      if (!isBestSeller) return false;
    } else if (categoryTag === 'TRENDING') {
      const isTrending = shoe.isHero || shoe.rating >= 4.9 || shoe.tag === 'FEATURED' || shoe.tag === 'HOT' || shoe.tag === 'LIMITED';
      if (!isTrending) return false;
    }

    // Gender filter check
    if (selectedGender !== 'ALL') {
      if (shoe.gender !== selectedGender && shoe.gender !== 'Unisex') return false;
    }

    // Size filter check
    if (selectedSizeFilter !== null) {
      if (!shoe.availableSizes.includes(selectedSizeFilter)) return false;
    }

    // Price range check
    if (shoe.price > maxPrice) {
      return false;
    }

    return true;
  });

  // Sort shoes
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') {
      const isANew = (a.tag === 'NEW' || a.tag === 'LIMITED') ? 1 : 0;
      const isBNew = (b.tag === 'NEW' || b.tag === 'LIMITED') ? 1 : 0;
      if (isANew !== isBNew) return isBNew - isANew;
      return b.rating - a.rating;
    }
    if (sortBy === 'best-sellers') {
      return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
    }
    if (sortBy === 'trending') {
      const aTrend = (a.isHero ? 100 : 0) + a.rating * 25 + a.reviewCount;
      const bTrend = (b.isHero ? 100 : 0) + b.rating * 25 + b.reviewCount;
      return bTrend - aTrend;
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured order
  });

  const categories: { label: string; value: CategoryType; icon?: boolean }[] = [
    { label: 'ALL LUXURY SNEAKERS', value: 'ALL' },
    { label: "MEN'S BOUTIQUE", value: 'MEN' },
    { label: "WOMEN'S COUTURE", value: 'WOMEN' },
    { label: 'KIDS & YOUTH', value: 'KIDS' },
    { label: '🔥 VIP SPECIAL SALE', value: 'SALE', icon: true },
  ];

  const hasActiveFilters = 
    selectedGender !== 'ALL' || 
    categoryTag !== 'ALL' ||
    selectedSizeFilter !== null || 
    maxPrice < maxAvailablePrice || 
    localSearch.trim() !== '' || 
    onSaleOnly;

  const handleResetFilters = () => {
    setSelectedGender('ALL');
    setCategoryTag('ALL');
    setSelectedSizeFilter(null);
    setMaxPrice(maxAvailablePrice);
    setLocalSearch('');
    setOnSaleOnly(false);
    setActiveCategory('ALL');
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative w-full overflow-hidden">
      
      {/* Luxury Collection Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2 mb-6 sm:mb-10"
      >
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 py-1 bg-black text-amber-400 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-amber-400/30 shadow-md">
          <Crown className="w-3 h-3 text-amber-400" />
          <span>78 SHOES CELEBRITY BOUTIQUE</span>
        </div>
        <h2 className="font-syne text-2xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
          CURATED <span className="text-amber-500">LUXURY</span> FOOTWEAR
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full" />
      </motion.div>

      {/* Main Filter & Control Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-3.5 sm:p-5 rounded-3xl border border-black/10 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2.5 rounded-full text-[11px] font-black tracking-wider transition-all duration-300 whitespace-nowrap flex items-center space-x-1.5 ${
                  activeCategory === cat.value
                    ? 'bg-black text-amber-400 border border-amber-400/50 shadow-lg scale-102'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-black/5'
                }`}
              >
                {cat.icon && <Sparkles className="w-3 h-3 text-amber-400" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Right Action Tools: Search & View Toggle */}
          <div className="flex items-center space-x-3">
            {/* Quick In-Section Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search collection..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-gray-100 border border-black/10 rounded-full text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full border border-black/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'grid' ? 'bg-black text-amber-400 shadow-md' : 'text-gray-500 hover:text-black'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'list' ? 'bg-black text-amber-400 shadow-md' : 'text-gray-500 hover:text-black'
                }`}
                title="Showcase List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Filter Bar: Size Chips, Price, Gender, Sale Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-black/5 text-xs font-bold">
          
          {/* UK Size Quick Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 mr-1 flex items-center space-x-1">
              <Filter className="w-3 h-3 text-black" />
              <span>UK SIZE:</span>
            </span>
            {availableSizesList.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSizeFilter(selectedSizeFilter === size ? null : size)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
                  selectedSizeFilter === size
                    ? 'bg-amber-400 text-black shadow-xs scale-105 ring-2 ring-black'
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-black/10'
                }`}
              >
                UK {size}
              </button>
            ))}
          </div>

          {/* Price Range, Gender & Sorting */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* On Sale Switch */}
            <button
              onClick={() => setOnSaleOnly(!onSaleOnly)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center space-x-1 transition-all ${
                onSaleOnly
                  ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                  : 'bg-white text-gray-700 border-black/10 hover:border-black/30'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>ON SALE ONLY</span>
            </button>

            {/* Price Slider */}
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-black/10">
              <Banknote className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[10px] font-black uppercase text-gray-700">
                MAX: <span className="text-black">Rs {maxPrice.toLocaleString()}</span>
              </span>
              <input
                type="range"
                min={minAvailablePrice}
                max={maxAvailablePrice}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-black cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
              />
            </div>

            {/* Category Filter Dropdown (New Arrivals, Best Sellers, Trending) */}
            <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full border border-black/10 focus-within:border-amber-400 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <select
                value={categoryTag}
                onChange={(e: any) => setCategoryTag(e.target.value)}
                className="bg-transparent text-gray-900 focus:outline-none font-extrabold cursor-pointer text-[11px]"
              >
                <option value="ALL">Category: All Collection</option>
                <option value="NEW_ARRIVALS">✨ New Arrivals</option>
                <option value="BEST_SELLERS">🔥 Best Sellers</option>
                <option value="TRENDING">⚡ Trending Now</option>
              </select>
            </div>

            {/* Gender Dropdown */}
            <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full border border-black/10">
              <SlidersHorizontal className="w-3 h-3 text-gray-600" />
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-transparent text-gray-900 focus:outline-none font-extrabold cursor-pointer text-[11px]"
              >
                <option value="ALL">All Genders</option>
                <option value="Unisex">Unisex Fits</option>
                <option value="Men">Men Only</option>
                <option value="Women">Women Only</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full border border-black/10">
              <ArrowUpDown className="w-3 h-3 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-900 focus:outline-none font-extrabold cursor-pointer text-[11px]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">✨ New Arrivals</option>
                <option value="best-sellers">🔥 Best Sellers</option>
                <option value="trending">⚡ Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Active Filter Chips Row */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 pt-1 flex-wrap gap-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Active Filters:</span>
            {categoryTag !== 'ALL' && (
              <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-xs">
                <span>
                  {categoryTag === 'NEW_ARRIVALS' && '✨ New Arrivals'}
                  {categoryTag === 'BEST_SELLERS' && '🔥 Best Sellers'}
                  {categoryTag === 'TRENDING' && '⚡ Trending'}
                </span>
                <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => setCategoryTag('ALL')} />
              </span>
            )}
            {selectedGender !== 'ALL' && (
              <span className="inline-flex items-center space-x-1 bg-black text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <span>Gender: {selectedGender}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-amber-400" onClick={() => setSelectedGender('ALL')} />
              </span>
            )}
            {selectedSizeFilter !== null && (
              <span className="inline-flex items-center space-x-1 bg-amber-400 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <span>Size: UK {selectedSizeFilter}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setSelectedSizeFilter(null)} />
              </span>
            )}
            {onSaleOnly && (
              <span className="inline-flex items-center space-x-1 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <span>On Sale</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setOnSaleOnly(false)} />
              </span>
            )}
            {maxPrice < maxAvailablePrice && (
              <span className="inline-flex items-center space-x-1 bg-gray-800 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <span>&lt; Rs {maxPrice.toLocaleString()}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(maxAvailablePrice)} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-extrabold text-rose-600 hover:underline ml-2 uppercase tracking-wider"
            >
              Clear All
            </button>
          </div>
        )}
      </motion.div>

      {/* Grid Header Count & Tag */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="font-syne text-lg sm:text-xl font-black text-black tracking-tight uppercase flex items-center space-x-2">
          <span>{activeCategory === 'ALL' ? 'EXCLUSIVE CELEBRITY EDITION' : `${activeCategory} BOUTIQUE`}</span>
          <span className="text-xs bg-black text-amber-400 px-3 py-0.5 rounded-full font-black border border-amber-400/30">
            {sortedShoes.length} ITEMS
          </span>
        </h3>
        <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest hidden sm:inline-block">
          Handcrafted Premium Materials
        </span>
      </div>

      {/* Product List/Grid Rendering */}
      {sortedShoes.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6" : "space-y-4"}>
          {sortedShoes.map((shoe, idx) => (
            <ProductCard
              key={shoe.id}
              shoe={shoe}
              index={idx}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(shoe.id)}
              onToggleWishlist={onToggleWishlist}
              isCompared={compareIds.includes(shoe.id) || compareShoes.some(s => s.id === shoe.id)}
              onToggleCompare={onToggleCompareShoe || handleToggleCompare}
              viewMode={viewMode}
              currency={currency}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/60 rounded-3xl border border-black/10 space-y-3">
          <div className="text-4xl">👟</div>
          <h3 className="font-syne text-xl font-black text-black uppercase">No Shoes Found</h3>
          <p className="text-xs text-gray-600 font-medium max-w-sm mx-auto">
            Try adjusting your search keywords, price filters, or UK size selections.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-6 py-2.5 bg-black text-amber-400 text-xs font-black uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Floating Comparison Tray (Appears when 1+ shoes selected) */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 rounded-full shadow-2xl border border-amber-400/50 flex items-center space-x-4 backdrop-blur-md"
          >
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Comparing {compareIds.length}/4 Shoes
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-1.5 bg-amber-400 text-black text-xs font-black uppercase tracking-wider rounded-full hover:bg-amber-300 shadow-md transition-colors"
              >
                Compare Now
              </button>
              <button
                onClick={() => setCompareIds([])}
                className="p-1 text-gray-400 hover:text-white"
                title="Clear Compare"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Specs Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareShoes={activeCompareShoes}
        onRemoveFromCompare={handleToggleCompare}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        onClearCompare={() => setCompareIds([])}
      />

    </section>
  );
};
