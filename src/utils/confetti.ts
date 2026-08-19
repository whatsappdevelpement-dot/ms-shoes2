import confetti from 'canvas-confetti';

/**
 * Grand celebratory confetti cannon for order success / checkout completion
 */
export const fireCheckoutConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-phase burst with gold, emerald, luxury black, and silver foil
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: ['#000000', '#10B981', '#F59E0B', '#3B82F6', '#FFFFFF'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#10B981', '#F59E0B', '#000000', '#E5E7EB'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.85,
    colors: ['#10B981', '#F59E0B', '#6366F1', '#EC4899', '#FFFFFF'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.25,
    colors: ['#000000', '#F59E0B', '#10B981'],
  });

  fire(0.1, {
    spread: 130,
    startVelocity: 45,
    colors: ['#10B981', '#3B82F6', '#F59E0B', '#FFFFFF'],
  });
};

/**
 * Gentle celebratory pop for Add To Cart action
 */
export const fireAddToCartConfetti = (x?: number, y?: number) => {
  const originX = x !== undefined && x > 0 ? x / window.innerWidth : 0.85;
  const originY = y !== undefined && y > 0 ? y / window.innerHeight : 0.85;

  confetti({
    particleCount: 30,
    spread: 50,
    startVelocity: 28,
    origin: { x: Math.min(Math.max(originX, 0.1), 0.9), y: Math.min(Math.max(originY, 0.1), 0.9) },
    zIndex: 9999,
    colors: ['#000000', '#10B981', '#F59E0B', '#FFFFFF'],
    scalar: 0.8,
  });
};

/**
 * Heart/sparkle celebratory burst for Wishlist action
 */
export const fireWishlistConfetti = () => {
  confetti({
    particleCount: 25,
    spread: 45,
    startVelocity: 25,
    origin: { x: 0.88, y: 0.12 },
    zIndex: 9999,
    colors: ['#E11D48', '#F43F5E', '#FB7185', '#000000', '#FFFFFF'],
    scalar: 0.75,
  });
};
