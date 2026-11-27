import React, { useState } from 'react';
import { CAMPUS_RATES, FAIR_PLAY_TIPS } from '../data/rateCardData';

export default function RateGuideView({ onGoToTalent }) {
  const [selectedServiceId, setSelectedServiceId] = useState(CAMPUS_RATES[0].id);
  const [extraChanges, setExtraChanges] = useState(0);

  const selectedRate = CAMPUS_RATES.find(r => r.id === selectedServiceId) || CAMPUS_RATES[0];
  const calculatedTotal = selectedRate.averagePrice + (extraChanges * 50);

  return (
    <div className="space-y-12 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#EBEBEB]">
        <h1 className="text-3xl font-semibold text-[#111111] tracking-tight">
          Fair Rate Guide
        </h1>
        <p className="text-sm text-[#666666] mt-2 max-w-2xl leading-relaxed">
          Calibrated benchmarks across LPU — from ₹1,499 full-stack websites and mobile apps to ₹99 posters and PPT formatting. Every deal includes 2 free revisions.
        </p>
      </div>

      {/* Campus Fair-Play Rules */}
      <section className="bg-white rounded-xl border border-[#EBEBEB] p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-[#F2F2F2]">
          <div>
            <h2 className="text-lg font-semibold text-[#111111]">
              Campus Fair-Play Rules
            </h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Standard guidelines agreed across LPU student clubs and peers
            </p>
          </div>
          <span className="text-xs text-[#666666]">
            2 Free Changes · ₹50/Extra Change
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FAIR_PLAY_TIPS.map((tip, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[11px] font-mono text-[#888888] block">
                0{idx + 1}
              </span>
              <h3 className="text-sm font-semibold text-[#111111]">
                {tip.title}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typical Rates Grid */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-[#111111]">
            Typical Campus Rate Brackets
          </h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Transparent pricing for both flagship tech projects and pocket-money student tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CAMPUS_RATES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                  <span>{item.category}</span>
                  <span>{item.turnaround}</span>
                </div>
                <h3 className="text-base font-semibold text-[#111111]">
                  {item.service}
                </h3>
                <p className="text-xl font-semibold text-[#111111] mt-2">
                  {item.typicalRate} <span className="text-xs font-normal text-[#666666]">({item.unit})</span>
                </p>
                <p className="text-xs text-[#666666] mt-3 leading-relaxed">
                  {item.whatYouGet}
                </p>
              </div>
              <p className="text-[11px] text-[#888888] pt-3 border-t border-[#F2F2F2]">
                Tip: {item.tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quick Rate Calculator */}
      <section className="bg-white rounded-xl border border-[#EBEBEB] p-7 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#111111]">
            Quick Quote Estimator
          </h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Estimate a fair campus price with optional extra revision rounds (+₹50 each).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#111111] mb-1.5">
                Select Service
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#EBEBEB] text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                {CAMPUS_RATES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.service} ({r.typicalRate})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#111111] block">Extra Revisions (+₹50/ea)</span>
                <span className="text-[11px] text-[#666666]">2 free revisions included</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExtraChanges(Math.max(0, extraChanges - 1))}
                  className="w-7 h-7 rounded-md bg-white border border-[#EBEBEB] text-xs font-medium hover:border-[#CCCCCC]"
                >
                  -
                </button>
                <span className="text-xs font-mono w-5 text-center text-[#111111]">{extraChanges}</span>
                <button
                  onClick={() => setExtraChanges(extraChanges + 1)}
                  className="w-7 h-7 rounded-md bg-white border border-[#EBEBEB] text-xs font-medium hover:border-[#CCCCCC]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#EBEBEB] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-[#666666] block">Estimated Campus Price</span>
              <div className="text-3xl font-semibold text-[#111111] mt-1">
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-[#666666] block mt-1">
                Includes 2 free changes + {extraChanges} extra (+₹{extraChanges * 50})
              </span>
            </div>

            <button
              onClick={onGoToTalent}
              className="px-4 py-2.5 rounded-lg bg-[#111111] hover:bg-[#2A2A2A] text-white text-xs font-medium transition-colors self-start"
            >
              Explore categories →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
