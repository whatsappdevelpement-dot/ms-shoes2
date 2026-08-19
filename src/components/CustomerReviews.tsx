import React, { useState } from 'react';
import { ShoeReview } from '../types';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StarRating } from './StarRating';

interface CustomerReviewsProps {
  reviews?: ShoeReview[];
  averageRating: number;
  reviewCount: number;
  onAddReview?: (newReview: ShoeReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews = [],
  averageRating,
  reviewCount,
  onAddReview
}) => {
  const [localReviews, setLocalReviews] = useState<ShoeReview[]>(reviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({});
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});

  // Sync prop reviews with local reviews if external prop changes
  React.useEffect(() => {
    if (reviews && reviews.length > 0) {
      setLocalReviews(reviews);
    }
  }, [reviews]);

  // Calculate star rating distribution breakdown
  const totalCount = localReviews.length || reviewCount || 1;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  localReviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newRev: ShoeReview = {
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      rating: newRating,
      comment: comment.trim(),
      date: 'Just now',
      verified: true
    };

    setLocalReviews([newRev, ...localReviews]);
    if (onAddReview) {
      onAddReview(newRev);
    }

    setUserName('');
    setComment('');
    setNewRating(5);
    setIsFormOpen(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const toggleHelpful = (reviewId: string) => {
    setLikedReviews((prev) => {
      const isLiked = prev[reviewId];
      const newLikedState = !isLiked;
      
      setHelpfulCounts((counts) => ({
        ...counts,
        [reviewId]: (counts[reviewId] || 0) + (newLikedState ? 1 : -1)
      }));

      return { ...prev, [reviewId]: newLikedState };
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Summary & Breakdown */}
      <div className="bg-white/80 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border border-black/5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-center px-3 py-1 bg-black text-white rounded-xl shadow-sm">
              <span className="font-syne font-black text-xl leading-none">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-[9px] text-gray-300 block font-bold uppercase tracking-wider">
                out of 5
              </span>
            </div>
            <div>
              <StarRating rating={averageRating} size="sm" showLabel={false} />
              <p className="text-[11px] font-extrabold text-gray-700 mt-0.5">
                {localReviews.length} Verified Customer Reviews
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-black text-white rounded-full text-[11px] font-extrabold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-sm"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
            <span>{isFormOpen ? 'Cancel' : 'Write Review'}</span>
          </motion.button>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-1.5 pt-2 border-t border-black/5 text-[10px]">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star as keyof typeof ratingCounts] || 0;
            const percentage = Math.round((count / totalCount) * 100);

            return (
              <div key={star} className="flex items-center space-x-2 text-gray-600 font-bold">
                <span className="w-8 flex items-center justify-end space-x-0.5">
                  <span>{star}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400 text-[9px]">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {submittedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-500 text-white p-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-md"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Thank you! Your testimonial has been posted successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write a Review Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmitReview}
            className="bg-white p-4 rounded-2xl border border-black/10 shadow-md space-y-3 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-black flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Rate & Review this Shoe</span>
              </h4>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Official Testimonial</span>
            </div>

            {/* Interactive Star Picker */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase">Your Rating</label>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (hoverRating || newRating) >= star
                          ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                          : 'text-gray-300 fill-transparent'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-black text-gray-800">
                  {hoverRating || newRating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Your Name (e.g., Hamza R.)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Review Comment Textarea */}
            <div>
              <textarea
                placeholder="Share your experience regarding sizing, comfort, and performance..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                maxLength={300}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
              <div className="text-right text-[9px] text-gray-400 font-medium">
                {comment.length}/300
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:bg-gray-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
        {localReviews.length > 0 ? (
          localReviews.map((r) => {
            const initial = r.userName.charAt(0).toUpperCase() || 'U';
            const isLiked = likedReviews[r.id];
            const helpfulCount = (helpfulCounts[r.id] || 0) + (r.verified ? 4 : 2);

            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-black/5 shadow-sm space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    {/* User Avatar Circle */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-black to-gray-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                      {initial}
                    </div>

                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-extrabold text-black">{r.userName}</span>
                        {r.verified && (
                          <span className="inline-flex items-center text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-2.5 h-2.5 mr-0.5 text-emerald-600" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium block">{r.date}</span>
                    </div>
                  </div>

                  <StarRating rating={r.rating} size="sm" showLabel={false} />
                </div>

                <p className="text-[11px] text-gray-700 font-medium leading-relaxed pl-0.5">
                  "{r.comment}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1 border-t border-black/5">
                  <span className="text-gray-500 font-semibold">Was this helpful?</span>
                  <button
                    onClick={() => toggleHelpful(r.id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors ${
                      isLiked
                        ? 'bg-emerald-50 text-emerald-600 font-bold'
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{helpfulCount}</span>
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-6 bg-white/50 rounded-2xl border border-black/5">
            <MessageSquarePlus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-600">No customer reviews yet</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Be the first verified customer to share feedback!</p>
          </div>
        )}
      </div>
    </div>
  );
};
