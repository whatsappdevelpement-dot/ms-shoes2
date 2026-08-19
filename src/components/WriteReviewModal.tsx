import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { Shoe } from '../types';
import { fireAddToCartConfetti } from '../utils/confetti';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoe: Shoe | null;
  onSubmitReview: (shoeId: string, review: { userName: string; rating: number; comment: string }) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  shoe,
  onSubmitReview,
}) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !shoe) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    onSubmitReview(shoe.id, {
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    fireAddToCartConfetti();
    setTimeout(() => {
      setSubmitted(false);
      setUserName('');
      setComment('');
      setRating(5);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white w-full max-w-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto p-5 sm:p-7 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-amber-400 text-black rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="font-syne text-2xl font-black uppercase tracking-tight text-white">
                  WRITE A <span className="text-amber-400">REVIEW</span>
                </h2>
                <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto">
                  Share your experience with <strong className="text-white">{shoe.fullName}</strong>
                </p>
              </div>

              {/* Shoe Mini Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center space-x-3">
                <img
                  src={shoe.image}
                  alt={shoe.model}
                  className="w-14 h-14 object-contain bg-white/10 rounded-xl p-1"
                />
                <div>
                  <h4 className="font-syne text-xs font-black uppercase text-white">{shoe.model}</h4>
                  <p className="text-[11px] text-gray-400">{shoe.brand} • {shoe.category}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    YOUR OVERALL RATING
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (hoverRating !== null ? star <= hoverRating : star <= rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-black text-amber-400 ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., Usman Tariq"
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                {/* Review Comment Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    YOUR REVIEW / FEEDBACK
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the comfort, cushioning, fit, and style..."
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
                >
                  SUBMIT VERIFIED REVIEW
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-500 text-black rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-syne text-xl font-black uppercase text-white">
                THANK YOU FOR YOUR REVIEW!
              </h3>
              <p className="text-xs text-gray-300">
                Your verified review has been published successfully.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
