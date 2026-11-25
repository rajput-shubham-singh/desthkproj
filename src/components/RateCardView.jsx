import React, { useState } from 'react';
import { ShieldCheck, Check, Clock, ArrowRight } from 'lucide-react';
import { FAIR_PRICE_RATES, FAIR_PLAY_RULES } from '../data/rateCardData';

export default function RateCardView({ onNavigateToBoard }) {
  const [extraRevisions, setExtraRevisions] = useState(0);
  const [selectedService, setSelectedService] = useState('poster-design');

  const currentRate = FAIR_PRICE_RATES.find(r => r.id === selectedService) || FAIR_PRICE_RATES[0];
  const calculatedTotal = currentRate.median + (extraRevisions * 50);

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
          Campus Fair-Price Rate Guide
        </h1>
        <p className="text-sm text-[#57534E] mt-1">
          Standardized student compensation benchmarks and fair-play scope rules for LPU.
        </p>
      </div>

      {/* Campus Fair-Play Rules Box (Mandated by Prompt) */}
      <section className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EAE6DF]">
          <div>
            <span className="text-[11px] font-semibold text-[#D95D39] uppercase tracking-wider block mb-0.5">
              Design Thinking Guardrails
            </span>
            <h2 className="font-serif font-bold text-xl text-[#1C1917]">
              Campus Fair-Play Rules
            </h2>
          </div>
          <span className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-[#F0F5F2] text-[#2D6A4F] self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            2 Free Revisions • ₹50/Extra Round
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
            <span className="text-xs font-bold text-[#D95D39] font-mono">RULE 01</span>
            <h3 className="font-serif font-bold text-sm text-[#1C1917] mt-1">
              2 Free Revisions Included
            </h3>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              Every locked scope comes standard with 2 rounds of creative revisions to protect student-club collaboration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
            <span className="text-xs font-bold text-[#D95D39] font-mono">RULE 02</span>
            <h3 className="font-serif font-bold text-sm text-[#1C1917] mt-1">
              ₹50 Fixed Extra Revision Fee
            </h3>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              Revisions beyond the 2 included passes are strictly ₹50 per round, stopping endless unpaid scope creep.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
            <span className="text-xs font-bold text-[#D95D39] font-mono">RULE 03</span>
            <h3 className="font-serif font-bold text-sm text-[#1C1917] mt-1">
              Anonymized Peer Privacy
            </h3>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              IDs remain anonymized (F1, C1) to eliminate hostel seniority bias and uncompensated personal pressure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF]">
            <span className="text-xs font-bold text-[#D95D39] font-mono">RULE 04</span>
            <h3 className="font-serif font-bold text-sm text-[#1C1917] mt-1">
              50% Upfront Escrow Handshake
            </h3>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              50% is locked upon kickoff; remaining 50% releases only when final deliverables pass checklist.
            </p>
          </div>
        </div>
      </section>

      {/* Standard LPU Rates Grid (Clean 2-Column on Desktop) */}
      <section>
        <div className="mb-6">
          <h2 className="font-serif font-bold text-xl text-[#1C1917]">
            Standard Campus Rate Schedules
          </h2>
          <p className="text-xs text-[#78716C] mt-1">
            Official benchmark rates agreed across Lovely Professional University student organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAIR_PRICE_RATES.map((rate) => (
            <div
              key={rate.id}
              className="bg-white rounded-2xl border border-[#EAE6DF] p-6 hover:border-[#D6D0C5] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[#57534E] bg-[#FAF9F6] px-2.5 py-0.5 rounded-full border border-[#EAE6DF]">
                    {rate.category}
                  </span>
                  <span className="text-xs text-[#78716C] flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {rate.standardTurnaround}
                  </span>
                </div>

                <div className="flex items-baseline space-x-2 my-2">
                  <span className="text-2xl font-serif font-bold text-[#1C1917]">
                    ₹{rate.minPrice}–₹{rate.maxPrice}
                  </span>
                  <span className="text-xs text-[#78716C]">
                    ({rate.unit})
                  </span>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed mt-2 mb-4">
                  {rate.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#EAE6DF]">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#78716C] block mb-1">
                    Standard Scope Handover:
                  </span>
                  {rate.standardScope.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center text-xs text-[#1C1917]">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F] mr-1.5 flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE6DF] flex items-center justify-between text-xs text-[#78716C]">
                <span>2 Free Revisions</span>
                <span className="text-[#2D6A4F] font-medium">+₹50/extra round</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Fair-Price Estimator */}
      <section className="bg-white rounded-2xl border border-[#EAE6DF] p-6 sm:p-8">
        <h2 className="font-serif font-bold text-xl text-[#1C1917]">
          Quick Rate Calculator
        </h2>
        <p className="text-xs text-[#78716C] mt-1 mb-6">
          Select a service and calculate fair pricing with additional revision rounds (+₹50 each).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Service Deliverable:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
              >
                {FAIR_PRICE_RATES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.category} (Standard ₹{r.minPrice}–₹{r.maxPrice})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EAE6DF] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#1C1917] block">Extra Revisions (+₹50/ea)</span>
                <span className="text-[11px] text-[#78716C]">2 free revisions included</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExtraRevisions(Math.max(0, extraRevisions - 1))}
                  className="w-6 h-6 rounded-md bg-white border border-[#EAE6DF] text-xs font-bold hover:bg-[#FAF9F6]"
                >
                  -
                </button>
                <span className="text-xs font-bold w-5 text-center text-[#1C1917]">{extraRevisions}</span>
                <button
                  onClick={() => setExtraRevisions(extraRevisions + 1)}
                  className="w-6 h-6 rounded-md bg-white border border-[#EAE6DF] text-xs font-bold hover:bg-[#FAF9F6]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF9F6] rounded-xl p-6 border border-[#EAE6DF] text-center sm:text-left flex flex-col justify-between h-full">
            <div>
              <span className="text-xs text-[#78716C] block">Recommended Quote</span>
              <div className="font-serif font-bold text-3xl text-[#1C1917] my-1">
                ₹{calculatedTotal}
              </div>
              <span className="text-[11px] text-[#2D6A4F] font-medium block">
                50% Escrow Kickoff: ₹{Math.round(calculatedTotal / 2)}
              </span>
            </div>

            <button
              onClick={onNavigateToBoard}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#D95D39] hover:bg-[#C24F2D] text-white text-xs font-semibold transition-all self-start"
            >
              <span>Explore Matching Gigs</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
