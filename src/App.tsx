import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { SearchModal } from './components/SearchModal';
import { CouponsModal } from './components/CouponsModal';
import { CommunityModal } from './components/CommunityModal';
import { LuxuryBanner } from './components/LuxuryBanner';
import { LoaferCollection } from './components/LoaferCollection';
import { ClassicPennyLoafer } from './components/ClassicPennyLoafer';
import { SlideCollection } from './components/SlideCollection';
import { ScrollZoomSection } from './components/ScrollZoomSection';
import { Footer } from './components/Footer';
import { PUMA_SHOES } from './data/shoes';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { RecentlyViewed } from './components/RecentlyViewed';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { CompareModal } from './components/CompareModal';
import { Shoe, CartItem, CategoryType, ShoeColorway, CurrencyCode } from './types';
import { ShieldCheck, Truck, RefreshCw, Mail, ArrowRight, Instagram, Facebook, Twitter, Youtube, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fireAddToCartConfetti, fireWishlistConfetti } from './utils/confetti';

function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-32 h-32 flex items-center justify-center bg-black rounded-full overflow-hidden border-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <span className="font-syne text-[52px] font-black tracking-tighter text-white leading-none mt-1">SV</span>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <h1 className="font-syne text-3xl sm:text-4xl font-black tracking-widest text-white leading-none">
            SAQIB VISUAL
          </h1>
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mt-2">Walk like a celebrity</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [currentHeroIndex, setCurrentHeroIndex] = useState<number>(0);
  
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('puma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('puma_wishlist');
      return saved ? JSON.parse(saved) : ['exotek-nitro-01'];
    } catch {
      return ['exotek-nitro-01'];
    }
  });

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('puma_currency');
      return (saved as CurrencyCode) || 'PKR';
    } catch {
      return 'PKR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('puma_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  // Recently Viewed Shoes State
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('puma_recently_viewed');
      return saved ? JSON.parse(saved) : ['exotek-nitro-01', 'slipstream-denim-02', 'palermo-og-03'];
    } catch {
      return ['exotek-nitro-01', 'slipstream-denim-02', 'palermo-og-03'];
    }
  });

  const recordRecentlyViewed = (shoeId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== shoeId);
      const updated = [shoeId, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('puma_recently_viewed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Compare Shoes State
  const [compareShoes, setCompareShoes] = useState<Shoe[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompareShoe = (shoe: Shoe) => {
    setCompareShoes((prev) => {
      const exists = prev.some((s) => s.id === shoe.id);
      if (exists) {
        showToast(`Removed ${shoe.model} from comparison`);
        return prev.filter((s) => s.id !== shoe.id);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 shoes at once');
          return prev;
        }
        showToast(`Added ${shoe.model} to comparison`);
        return [...prev, shoe];
      }
    });
  };

  // Modal controls
  const [selectedShoeForDetail, setSelectedShoeForDetail] = useState<Shoe | null>(null);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [reviewShoe, setReviewShoe] = useState<Shoe | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenShoeDetail = (shoe: Shoe) => {
    setSelectedShoeForDetail(shoe);
    recordRecentlyViewed(shoe.id);
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger 'Join our community' popup after 5 seconds of browsing
  useEffect(() => {
    if (showWelcome) return;

    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('puma_community_modal_dismissed');
      if (!dismissed) {
        setIsCommunityOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [showWelcome]);

  // Manage body scroll lock when modals or drawers are active
  const isAnyModalOpen = Boolean(
    showWelcome ||
    selectedShoeForDetail ||
    isTrackOrderOpen ||
    reviewShoe ||
    isCompareModalOpen ||
    isCartOpen ||
    isWishlistOpen ||
    isSearchOpen ||
    isCheckoutOpen ||
    isCouponsOpen ||
    isCommunityOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  useEffect(() => {
    try {
      localStorage.setItem('puma_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('puma_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Hero shoes array
  const heroShoes = PUMA_SHOES.filter((s) => s.isHero);

  // Cart operations
  const handleAddToCart = (shoe: Shoe, size: number, color: ShoeColorway, qty: number = 1) => {
    const itemKey = `${shoe.id}-${size}-${color.name}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            shoe,
            selectedSize: size,
            selectedColor: color,
            quantity: qty,
          },
        ];
      }
    });
    showToast(`Added ${shoe.model} (UK ${size}) to your bag!`);
    fireAddToCartConfetti();
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Wishlist operations
  const handleToggleWishlist = (shoe: Shoe) => {
    setWishlistIds((prev) => {
      if (prev.includes(shoe.id)) {
        showToast(`Removed ${shoe.model} from Wishlist`);
        return prev.filter((id) => id !== shoe.id);
      } else {
        showToast(`Saved ${shoe.model} to Wishlist!`);
        fireWishlistConfetti();
        return [...prev, shoe.id];
      }
    });
  };

  const handleBuyNow = (shoe: Shoe, size: number, color: ShoeColorway, qty: number) => {
    handleAddToCart(shoe, size, color, qty);
    setSelectedShoeForDetail(null);
    setIsCartOpen(true);
  };

  const handleProceedToCheckout = (discountPct: number) => {
    setAppliedDiscountPercent(discountPct);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast('Order confirmed successfully!');
  };

  const wishlistShoes = PUMA_SHOES.filter((s) => wishlistIds.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#d8dcde] text-gray-950 font-['Outfit',sans-serif] w-full max-w-full overflow-x-hidden relative">
      
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
      </AnimatePresence>

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={(cat) => setActiveCategory(cat as any)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCoupons={() => setIsCouponsOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        
        {activeCategory === 'ABOUT US' ? (
          <AboutSection />
        ) : activeCategory === 'CONTACT' ? (
          <ContactSection />
        ) : activeCategory === 'FAQ' ? (
          <FaqSection />
        ) : (
          <>
            {/* Hero Section matching provided image design */}
            <HeroSection
              key={showWelcome ? 'hero-welcome' : 'hero-active'}
              heroShoes={heroShoes}
              currentHeroIndex={currentHeroIndex}
              setCurrentHeroIndex={setCurrentHeroIndex}
              onAddToCart={handleAddToCart}
              onQuickView={(shoe) => setSelectedShoeForDetail(shoe)}
            />

            {/* Product Grid Section */}
            <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <ProductGrid
            shoes={PUMA_SHOES}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenShoeDetail}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            currency={currency}
            compareShoes={compareShoes}
            onToggleCompareShoe={handleToggleCompareShoe}
          />
        </motion.div>

        {/* Recently Viewed Shoes Carousel */}
        <RecentlyViewed
          allShoes={PUMA_SHOES}
          recentlyViewedIds={recentlyViewedIds}
          onQuickView={handleOpenShoeDetail}
          currency={currency}
        />

        {/* Luxury Banner */}
        <ScrollZoomSection>
          <LuxuryBanner />
        </ScrollZoomSection>

        {/* Loafer Collection Banner */}
        <ScrollZoomSection>
          <LoaferCollection />
        </ScrollZoomSection>

        {/* Classic Penny Loafer Banner */}
        <ScrollZoomSection>
          <ClassicPennyLoafer />
        </ScrollZoomSection>

        {/* Slide Collection Banner */}
        <ScrollZoomSection>
          <SlideCollection />
        </ScrollZoomSection>

        {/* Brand Highlights Bar */}
        <ScrollZoomSection>
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="my-12 py-12 bg-gradient-to-b from-[#d5d9dc] to-[#c7cbce] border-y border-black/10 shadow-inner"
          >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center space-y-2.5 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-black text-white rounded-full shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-black">Express Doorstep Delivery</h4>
              <p className="text-[11px] text-gray-700 font-medium leading-snug">Fast 2-3 day shipping across Pakistan</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center space-y-2.5 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-black text-white rounded-full shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-black">100% Authentic Guaranteed</h4>
              <p className="text-[11px] text-gray-700 font-medium leading-snug">Direct authorized 78 Shoes distribution</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center space-y-2.5 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-black text-white rounded-full shadow-sm">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-black">Hassle-Free Returns</h4>
              <p className="text-[11px] text-gray-700 font-medium leading-snug">30 days exchange policy for sizing</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center space-y-2.5 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="px-3 py-2 bg-black text-white rounded-full shadow-sm flex items-center justify-center font-syne font-black text-xs tracking-wider">
                NITRO™
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-black">Advanced Cushioning</h4>
              <p className="text-[11px] text-gray-700 font-medium leading-snug">Nitrogen-infused foam innovation</p>
            </motion.div>

          </div>
        </motion.section>
        </ScrollZoomSection>
        </>
        )}

      </main>

      {/* Amazing Footer */}
      <Footer 
        setActiveCategory={setActiveCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Sticky Compare Floating Bar */}
      <CompareFloatingBar
        compareShoes={compareShoes}
        onRemoveShoe={(shoeId) => setCompareShoes((prev) => prev.filter((s) => s.id !== shoeId))}
        onClearAll={() => setCompareShoes([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        shoe={selectedShoeForDetail}
        onClose={() => setSelectedShoeForDetail(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedShoeForDetail ? wishlistIds.includes(selectedShoeForDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onBuyNow={handleBuyNow}
        onOpenWriteReview={(shoe) => setReviewShoe(shoe)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleProceedToCheckout}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistShoes={wishlistShoes}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedDiscountPercent={appliedDiscountPercent}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      <WriteReviewModal
        isOpen={Boolean(reviewShoe)}
        onClose={() => setReviewShoe(null)}
        shoe={reviewShoe}
        onSubmitReview={(shoeId, rating, comment, authorName) => {
          showToast(`Thank you! Your ${rating}-star review for ${reviewShoe?.model} was submitted.`);
        }}
      />

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedShoes={compareShoes}
        onRemoveFromCompare={(shoeId) => setCompareShoes((prev) => prev.filter((s) => s.id !== shoeId))}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        shoes={PUMA_SHOES}
        onSelectShoe={(shoe) => setSelectedShoeForDetail(shoe)}
      />

      <CouponsModal
        isOpen={isCouponsOpen}
        onClose={() => setIsCouponsOpen(false)}
        onApplyCoupon={(code) => {
          setIsCouponsOpen(false);
          setIsCartOpen(true);
          showToast(`Coupon "${code}" copied! Apply it in your bag.`);
        }}
      />

      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => {
          setIsCommunityOpen(false);
          sessionStorage.setItem('puma_community_modal_dismissed', 'true');
        }}
        onClaimDiscount={(code) => {
          setIsCommunityOpen(false);
          setAppliedDiscountPercent(10);
          setIsCartOpen(true);
          showToast(`10% Discount Code "${code}" applied to your bag!`);
          sessionStorage.setItem('puma_community_modal_dismissed', 'true');
        }}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="fixed bottom-6 right-6 z-50 bg-black text-white text-xs font-bold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-2.5 border border-white/20 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
