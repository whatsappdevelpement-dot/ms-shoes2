import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
}

interface MockOrder {
  orderId: string;
  customerName: string;
  status: 'Order Placed' | 'Quality Check' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  courierName: string;
  trackingNumber: string;
  estimatedDelivery: string;
  destinationCity: string;
  itemTitle: string;
  price: number;
  steps: { title: string; desc: string; date: string; completed: boolean; current: boolean }[];
}

const SAMPLE_ORDERS: Record<string, MockOrder> = {
  'SV-8291': {
    orderId: 'SV-8291',
    customerName: 'Ahmad Khan',
    status: 'Dispatched',
    courierName: 'TCS VIP Express Courier',
    trackingNumber: 'TCS-99482012-PK',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    destinationCity: 'Lahore, Punjab',
    itemTitle: 'Exotek NITRO Energy Unisex Sneakers (UK 9)',
    price: 12999,
    steps: [
      { title: 'Order Confirmed', desc: 'Order verified & payment authorized', date: 'Aug 14, 10:30 AM', completed: true, current: false },
      { title: 'Quality Assurance', desc: 'Passed 12-point authentic luxury inspection', date: 'Aug 14, 02:15 PM', completed: true, current: false },
      { title: 'In Transit / Dispatched', desc: 'Package departed TCS Central Warehouse', date: 'Aug 15, 08:45 AM', completed: true, current: true },
      { title: 'Out for Delivery', desc: 'Assigned to local TCS rider', date: 'Pending', completed: false, current: false },
      { title: 'Delivered', desc: 'Signed by recipient', date: 'Pending', completed: false, current: false },
    ],
  },
  'SV-1049': {
    orderId: 'SV-1049',
    customerName: 'Zainab Rehman',
    status: 'Out for Delivery',
    courierName: 'Leopard Courier VIP',
    trackingNumber: 'LPR-8839201-PK',
    estimatedDelivery: 'Today by 6:00 PM',
    destinationCity: 'Karachi, Sindh',
    itemTitle: 'Slipstream Lo Denim Retro Sneakers (UK 7)',
    price: 13999,
    steps: [
      { title: 'Order Confirmed', desc: 'Order verified & payment authorized', date: 'Aug 13, 11:00 AM', completed: true, current: false },
      { title: 'Quality Assurance', desc: 'Passed 12-point inspection', date: 'Aug 13, 03:00 PM', completed: true, current: false },
      { title: 'In Transit / Dispatched', desc: 'Arrived at Karachi Sorting Hub', date: 'Aug 14, 09:00 PM', completed: true, current: false },
      { title: 'Out for Delivery', desc: 'Rider Farhan is en route to address', date: 'Aug 16, 09:15 AM', completed: true, current: true },
      { title: 'Delivered', desc: 'Signed by recipient', date: 'Pending', completed: false, current: false },
    ],
  },
};

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  currency = 'PKR' as CurrencyCode,
}) => {
  const [searchId, setSearchId] = useState('78-8291');
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(SAMPLE_ORDERS['78-8291']);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().replace('#', '');
    if (SAMPLE_ORDERS[cleanId]) {
      setActiveOrder(SAMPLE_ORDERS[cleanId]);
      setErrorMsg('');
    } else {
      // Dynamic fallback for any search order
      setActiveOrder({
        orderId: cleanId.toUpperCase(),
        customerName: 'Valued Customer',
        status: 'Quality Check',
        courierName: 'Puma Express Logistics',
        trackingNumber: `PUMA-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: '2-3 Business Days',
        destinationCity: 'Pakistan Nationwide',
        itemTitle: 'Luxury Celebrity Footwear Order',
        price: 12999,
        steps: [
          { title: 'Order Confirmed', desc: 'Order placed successfully', date: 'Just now', completed: true, current: false },
          { title: 'Quality Assurance', desc: 'Preparing luxury packaging', date: 'In Progress', completed: true, current: true },
          { title: 'In Transit / Dispatched', desc: 'Handover to express courier', date: 'Pending', completed: false, current: false },
          { title: 'Out for Delivery', desc: 'Local doorstep delivery', date: 'Pending', completed: false, current: false },
          { title: 'Delivered', desc: 'Delivered to address', date: 'Pending', completed: false, current: false },
        ]
      });
      setErrorMsg('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto p-5 sm:p-7 relative max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 pb-5 border-b border-white/10">
            <div className="w-12 h-12 bg-amber-400 text-black rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="font-syne text-2xl font-black uppercase tracking-tight text-white">
              TRACK YOUR <span className="text-amber-400">ORDER</span>
            </h2>
            <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto">
              Enter your Order ID or phone number to view live courier tracking updates.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-5 space-y-2">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl p-1.5 focus-within:border-amber-400 transition-all">
              <Search className="w-4 h-4 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID e.g. 78-8291..."
                className="bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 px-3 py-2 focus:outline-none w-full font-medium"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider shrink-0 cursor-pointer"
              >
                TRACK
              </button>
            </div>

            {/* Quick Sample Buttons */}
            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 pt-1">
              <span>Try Sample Order:</span>
              <button
                type="button"
                onClick={() => { setSearchId('78-8291'); setActiveOrder(SAMPLE_ORDERS['78-8291']); }}
                className="text-amber-400 hover:underline font-bold"
              >
                #78-8291
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => { setSearchId('78-1049'); setActiveOrder(SAMPLE_ORDERS['78-1049']); }}
                className="text-amber-400 hover:underline font-bold"
              >
                #78-1049
              </button>
            </div>
          </form>

          {/* Order Details Body */}
          {activeOrder && (
            <div className="mt-5 overflow-y-auto pr-1 space-y-4">
              {/* Status Header Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-syne text-sm font-black text-amber-400 tracking-wider">
                      #{activeOrder.orderId}
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      {activeOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-medium mt-1">
                    {activeOrder.itemTitle}
                  </p>
                  <p className="text-xs font-bold text-amber-300 mt-0.5">
                    Total: {formatPrice(activeOrder.price, currency)}
                  </p>
                </div>

                <div className="text-left sm:text-right text-[11px] text-gray-400 space-y-1">
                  <div className="flex items-center sm:justify-end space-x-1 text-gray-300">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{activeOrder.courierName}</span>
                  </div>
                  <p className="font-mono text-gray-400">{activeOrder.trackingNumber}</p>
                  <div className="text-emerald-400 font-bold flex items-center sm:justify-end space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Est: {activeOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Visual Stepper Timeline */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider mb-4 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>LIVE SHIPMENT PROGRESS ({activeOrder.destinationCity})</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/20">
                  {activeOrder.steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Step Circle Indicator */}
                      <div
                        className={`absolute -left-[23px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.current
                            ? 'bg-amber-400 text-black ring-4 ring-amber-400/20 animate-pulse'
                            : step.completed
                            ? 'bg-emerald-500 text-black'
                            : 'bg-gray-800 text-gray-500 border border-white/20'
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className={`text-xs font-extrabold ${step.current ? 'text-amber-300' : step.completed ? 'text-white' : 'text-gray-500'}`}>
                            {step.title}
                          </h5>
                          <p className="text-[11px] text-gray-400 font-medium">
                            {step.desc}
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono shrink-0 ml-2">
                          {step.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
