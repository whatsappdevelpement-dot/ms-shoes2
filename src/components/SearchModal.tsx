import React from 'react';
import { Shoe } from '../types';
import { Search, X, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  shoes: Shoe[];
  onSelectShoe: (shoe: Shoe) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  shoes,
  onSelectShoe,
}) => {
  if (!isOpen) return null;

  const popularSearches = ['Exotek Nitro', 'RS-X', 'CA Pro', 'Ivy League', 'X-Cell Nova', 'Running'];

  const results = searchQuery.trim()
    ? shoes.filter(
        (s) =>
          s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#e6e9eb] rounded-3xl border border-white/80 shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input */}
        <div className="relative flex items-center bg-white rounded-2xl border border-black/10 px-4 py-3 shadow-inner">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search 78 Shoes sneakers, models, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm font-bold text-black placeholder-gray-400 focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-xs font-bold text-gray-400 hover:text-black">
              Clear
            </button>
          )}
        </div>

        {/* Popular Tags */}
        {!searchQuery && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-gray-500 uppercase">
              <TrendingUp className="w-4 h-4 text-black" />
              <span>POPULAR SEARCHES</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3.5 py-1.5 bg-white/80 hover:bg-white border border-black/10 rounded-full text-xs font-bold text-gray-800 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searchQuery && (
          <div className="mt-6 space-y-3 max-h-80 overflow-y-auto">
            <div className="text-xs font-extrabold text-gray-500 uppercase">
              FOUND ({results.length}) RESULTS
            </div>

            {results.length > 0 ? (
              results.map((shoe) => (
                <div
                  key={shoe.id}
                  onClick={() => {
                    onSelectShoe(shoe);
                    onClose();
                  }}
                  className="bg-white/80 hover:bg-white p-3 rounded-2xl border border-black/5 flex items-center space-x-3 cursor-pointer transition-all shadow-sm hover:shadow"
                >
                  <div className="w-14 h-14 bg-[#dcdfe1] rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={shoe.image}
                      alt={shoe.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-extrabold text-gray-500 uppercase">{shoe.brand}</div>
                    <h4 className="text-xs font-bold text-black truncate">{shoe.fullName}</h4>
                    <div className="text-xs font-black text-black mt-0.5">Rs{shoe.price.toLocaleString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-gray-500 text-center py-6">
                No sneakers found matching "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
