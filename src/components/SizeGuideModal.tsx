import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  genderCategory?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  genderCategory = 'Men'
}) => {
  const [activeGender, setActiveGender] = useState<'men' | 'women' | 'kids'>(
    genderCategory.toLowerCase().includes('women')
      ? 'women'
      : genderCategory.toLowerCase().includes('kid')
      ? 'kids'
      : 'men'
  );

  if (!isOpen) return null;

  const menSizes = [
    { uk: '6', us: '7', eu: '40', cm: '25.0', inch: '9.8' },
    { uk: '7', us: '8', eu: '41', cm: '25.8', inch: '10.1' },
    { uk: '8', us: '9', eu: '42', cm: '26.7', inch: '10.5' },
    { uk: '9', us: '10', eu: '43', cm: '27.5', inch: '10.8' },
    { uk: '10', us: '11', eu: '44', cm: '28.3', inch: '11.1' },
    { uk: '11', us: '12', eu: '45', cm: '29.2', inch: '11.5' },
    { uk: '12', us: '13', eu: '46', cm: '30.0', inch: '11.8' },
  ];

  const womenSizes = [
    { uk: '3', us: '5.5', eu: '35.5', cm: '22.0', inch: '8.7' },
    { uk: '4', us: '6.5', eu: '37', cm: '23.0', inch: '9.1' },
    { uk: '5', us: '7.5', eu: '38', cm: '24.0', inch: '9.4' },
    { uk: '6', us: '8.5', eu: '39', cm: '25.0', inch: '9.8' },
    { uk: '7', us: '9.5', eu: '40.5', cm: '26.0', inch: '10.2' },
    { uk: '8', us: '10.5', eu: '42', cm: '27.0', inch: '10.6' },
  ];

  const kidsSizes = [
    { uk: '10K', us: '11K', eu: '28', cm: '17.0', inch: '6.7' },
    { uk: '11K', us: '12K', eu: '29', cm: '18.0', inch: '7.1' },
    { uk: '12K', us: '13K', eu: '31', cm: '19.0', inch: '7.5' },
    { uk: '1', us: '2', eu: '33', cm: '20.5', inch: '8.1' },
    { uk: '2', us: '3', eu: '34', cm: '21.5', inch: '8.5' },
    { uk: '3', us: '4', eu: '35.5', cm: '22.5', inch: '8.9' },
  ];

  const currentSizes = activeGender === 'women' ? womenSizes : activeGender === 'kids' ? kidsSizes : menSizes;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#e6e9eb] rounded-3xl border border-white/80 shadow-2xl p-6 sm:p-8 my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-sm transition-transform active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-syne text-2xl font-black text-black tracking-wider uppercase">
                SIZE CONVERSION GUIDE
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                Find your perfect fit for 78 Shoes footwear
              </p>
            </div>
          </div>

          {/* Gender Tabs */}
          <div className="flex bg-white/60 p-1 rounded-2xl border border-black/5">
            {(['men', 'women', 'kids'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setActiveGender(gender)}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeGender === gender
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {gender}'s sizing
              </button>
            ))}
          </div>

          {/* Conversion Table */}
          <div className="bg-white/80 rounded-2xl border border-black/5 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-black text-white font-extrabold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">UK Size</th>
                    <th className="py-3 px-4">US Size</th>
                    <th className="py-3 px-4">EU Size</th>
                    <th className="py-3 px-4">Heel-to-Toe (CM)</th>
                    <th className="py-3 px-4">Inches</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-semibold text-gray-800">
                  {currentSizes.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-50/80 transition-colors ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="py-3 px-4 font-black text-black">{row.uk}</td>
                      <td className="py-3 px-4">{row.us}</td>
                      <td className="py-3 px-4">{row.eu}</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">{row.cm} cm</td>
                      <td className="py-3 px-4 text-gray-600">{row.inch}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="bg-white/60 p-4 rounded-2xl border border-black/5 space-y-2">
            <h4 className="text-xs font-black text-black uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>How to Measure Your Feet</span>
            </h4>
            <ol className="text-[11px] text-gray-600 font-medium space-y-1 list-decimal list-inside leading-relaxed">
              <li>Place a sheet of paper on a hard floor against a wall and stand on it with your heel lightly touching the wall.</li>
              <li>Mark the longest part of your foot (heel-to-toe distance) on the paper.</li>
              <li>Measure the distance with a ruler and compare it with the <strong>CM column</strong> in the table above.</li>
              <li>If you are between two sizes, we recommend selecting the <strong>larger size</strong> for optimal comfort.</li>
            </ol>
          </div>

          {/* Footer Action */}
          <div className="pt-2 border-t border-black/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white text-xs font-extrabold rounded-full hover:bg-gray-800 transition-colors uppercase tracking-wider"
            >
              GOT IT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
