import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Clock, 
  Layers, 
  RotateCcw,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';
import { FAIR_PRICE_RATES } from '../data/rateCardData';
import { formatINR } from '../utils/helpers';

export default function RateEstimator() {
  const [selectedService, setSelectedService] = useState(FAIR_PRICE_RATES[0].id);
  const [extraRevisions, setExtraRevisions] = useState(0);
  const [isExpress, setIsExpress] = useState(false);
  const [includeRawFiles, setIncludeRawFiles] = useState(false);

  const currentRate = FAIR_PRICE_RATES.find(r => r.id === selectedService) || FAIR_PRICE_RATES[0];

  // Base median price
  const basePrice = currentRate.median;
  const extraRevisionCost = extraRevisions * 50; // Mandated ₹50 per extra revision!
  const expressCost = isExpress ? 100 : 0;
  const rawFilesCost = includeRawFiles ? (selectedService === 'web-code' ? 0 : 50) : 0;
  const totalEstimatedPrice = basePrice + extraRevisionCost + expressCost + rawFilesCost;

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2D8] p-5 sm:p-6 shadow-warm">
      <div className="flex items-center space-x-2 text-xs font-bold text-[#D95D39] uppercase tracking-wider mb-1">
        <Calculator className="w-4 h-4" />
        <span>Campus Budget Calculator</span>
      </div>
      <h3 className="font-serif font-bold text-xl text-[#1C1917]">
        Interactive Fair-Price Estimator
      </h3>
      <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
        Plan your student club budget or freelancer quote with standardized campus benchmarks and transparent revision caps.
      </p>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              Select Required Deliverable:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FAIR_PRICE_RATES.map((rate) => (
                <button
                  key={rate.id}
                  onClick={() => setSelectedService(rate.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    selectedService === rate.id
                      ? 'bg-[#FAF9F6] border-[#D95D39] text-[#1C1917] shadow-warm-sm font-semibold'
                      : 'bg-white border-[#E6E2D8] text-[#57534E] hover:border-[#D8D2C5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{rate.category}</span>
                    <span className="font-bold text-[#1C1917]">₹{rate.minPrice}–₹{rate.maxPrice}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Revisions Counter (2 Free Included, ₹50 extra) */}
          <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E6E2D8]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1C1917] block">
                  Revisions Policy (2 Free Included)
                </span>
                <span className="text-[11px] text-[#57534E]">
                  Campus Fair-Play rule: strictly ₹50 per extra round
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExtraRevisions(Math.max(0, extraRevisions - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-[#E6E2D8] text-xs font-bold hover:bg-[#F5F3EE] flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xs font-bold w-6 text-center text-[#1C1917]">
                  {extraRevisions}
                </span>
                <button
                  onClick={() => setExtraRevisions(extraRevisions + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-[#E6E2D8] text-xs font-bold hover:bg-[#F5F3EE] flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            {extraRevisions > 0 && (
              <p className="text-[11px] text-[#D95D39] font-medium mt-2">
                + {extraRevisions} additional revision rounds = +₹{extraRevisionCost}
              </p>
            )}
          </div>

          {/* Add-on Options */}
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E6E2D8] cursor-pointer hover:bg-[#FAF9F6] transition-colors">
              <div className="flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="rounded text-[#D95D39] focus:ring-[#D95D39]"
                />
                <span className="text-xs font-medium text-[#1C1917]">
                  Express Turnaround (&lt; 12–24h Rush Delivery)
                </span>
              </div>
              <span className="text-xs font-semibold text-[#1C1917]">+₹100</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E6E2D8] cursor-pointer hover:bg-[#FAF9F6] transition-colors">
              <div className="flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  checked={includeRawFiles}
                  onChange={(e) => setIncludeRawFiles(e.target.checked)}
                  className="rounded text-[#D95D39] focus:ring-[#D95D39]"
                />
                <span className="text-xs font-medium text-[#1C1917]">
                  Raw / Uncompressed Source Package (.RAW, .AE Project, Full Vector)
                </span>
              </div>
              <span className="text-xs font-semibold text-[#1C1917]">+₹50</span>
            </label>
          </div>

        </div>

        {/* Right Output Summary Box */}
        <div className="lg:col-span-5 bg-[#FAF9F6] rounded-xl p-5 border border-[#E6E2D8] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E2D8]">
              <span className="text-xs text-[#57534E]">Standard Campus Base</span>
              <span className="font-semibold text-xs text-[#1C1917]">₹{basePrice}</span>
            </div>

            <div className="py-3 border-b border-[#E6E2D8] space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Standard Revisions (2 free):</span>
                <span className="text-[#2D6A4F] font-semibold">₹0 (Free)</span>
              </div>
              {extraRevisions > 0 && (
                <div className="flex justify-between text-[#D95D39]">
                  <span>Extra Revisions ({extraRevisions} × ₹50):</span>
                  <span>+₹{extraRevisionCost}</span>
                </div>
              )}
              {isExpress && (
                <div className="flex justify-between text-[#1C1917]">
                  <span>Express Timeline Addon:</span>
                  <span>+₹100</span>
                </div>
              )}
              {includeRawFiles && (
                <div className="flex justify-between text-[#1C1917]">
                  <span>Raw Asset Archive Handover:</span>
                  <span>+₹50</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-wider text-[#57534E] font-semibold block">
                Total Recommended Fair Price
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-serif font-bold text-[#1C1917]">
                  ₹{totalEstimatedPrice}
                </span>
                <span className="text-xs text-[#57534E]">
                  ({currentRate.unit})
                </span>
              </div>
              <span className="inline-block mt-1 text-[11px] font-semibold text-[#2D6A4F] bg-[#EAF3EE] px-2 py-0.5 rounded border border-[#C2DFCF]">
                ✓ 100% Campus Fair-Play Protected
              </span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#E6E2D8] text-[11px] text-[#57534E] flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
            <span>Escrow handshake locks 50% (₹{Math.round(totalEstimatedPrice / 2)}) upon scope kickoff.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
