import React, { useState } from 'react';
import { ShieldCheck, Clock, Lightbulb, ArrowRight, Calculator } from 'lucide-react';
import { CAMPUS_RATES, FAIR_PLAY_TIPS } from '../data/rateCardData';

export default function RateGuideView({ onGoToTalent }) {
  const [selectedServiceId, setSelectedServiceId] = useState(CAMPUS_RATES[0].id);
  const [extraChanges, setExtraChanges] = useState(0);

  const selectedRate = CAMPUS_RATES.find(r => r.id === selectedServiceId) || CAMPUS_RATES[0];
  const calculatedTotal = selectedRate.averagePrice + (extraChanges * 50);

  return (
    <div className="space-y-10 animate-in fade-in duration-150">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs font-mono font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LPU STUDENT FAIR-PRICE STANDARD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#18181B] tracking-tight">
          Fair Rate Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#52525B] mt-1.5 max-w-2xl leading-relaxed font-normal">
          Calibrated benchmarks across LPU — from ₹1,499 full-stack websites and mobile apps to ₹99 poster designs and viva slide decks. Every deal includes 2 free changes guaranteed.
        </p>
      </div>

      {/* Campus Fair-Play Tips Banner */}
      <section className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b-[1.5px] border-[#18181B]">
          <div>
            <h2 className="font-display font-bold text-xl text-[#18181B]">
              Campus Fair-Play Rules
            </h2>
            <p className="text-xs text-[#52525B]">
              Standard guidelines agreed across LPU student clubs and freelance peers
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-md border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] self-start sm:self-auto">
            2 Free Changes • ₹50/Extra Change
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FAIR_PLAY_TIPS.map((tip, idx) => (
            <div key={idx} className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
              <span className="text-[10px] font-bold text-[#E05A47] uppercase tracking-wider block font-mono">
                RULE 0{idx + 1}
              </span>
              <h3 className="font-display font-bold text-sm text-[#18181B] mt-1 mb-1">
                {tip.title}
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed font-normal">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typical Rates Cards Grid */}
      <section>
        <div className="mb-4">
          <h2 className="font-display font-bold text-2xl text-[#18181B]">
            Typical Campus Rate Cards
          </h2>
          <p className="text-xs text-[#52525B]">
            Fair benchmark brackets calibrated for lovely professional university student budgets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_RATES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[5px_5px_0px_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B]">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#52525B] flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[#E05A47]" />
                    {item.turnaround}
                  </span>
                </div>

                <div className="my-2 p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
                  <span className="font-mono font-bold text-2xl text-[#18181B] block">
                    {item.typicalRate}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block mt-0.5">
                    Standard Campus Bracket ({item.unit})
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#18181B] mt-3 mb-1">
                  {item.service}
                </h3>

                <div className="mt-3 pt-3 border-t-[1.5px] border-dashed border-[#18181B]/20 text-xs text-[#52525B] space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#18181B] block">
                    What You Get:
                  </span>
                  <p className="text-xs leading-relaxed text-[#18181B] font-normal">
                    {item.whatYouGet}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-[1.5px] border-[#18181B] bg-[#FFFBEB] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-3 rounded-b-2xl">
                <div className="flex items-start space-x-2 text-[11px] text-[#71717A]">
                  <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <p className="leading-tight text-[#18181B]">
                    <strong className="font-mono font-bold">Pro-Tip:</strong> {item.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quick Rate Calculator */}
      <section className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-6 sm:p-7">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#E05A47] uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Quick Campus Estimator</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-[#18181B]">
          Calculate a Fair Quote
        </h2>
        <p className="text-xs text-[#52525B] mt-0.5 mb-6 font-normal">
          See the recommended price for your task with optional extra change rounds (+₹50 each).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-display font-bold text-[#18181B] mb-1.5">
                Select Service Deliverable:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full text-xs p-3 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-[#18181B] font-display font-bold focus:outline-none focus:bg-white"
              >
                {CAMPUS_RATES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.service} ({r.typicalRate})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#F5F2EB] p-4 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-between">
              <div>
                <span className="text-xs font-display font-bold text-[#18181B] block">Extra Changes (+₹50/ea)</span>
                <span className="text-[11px] font-mono text-[#52525B]">2 free changes included standard</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExtraChanges(Math.max(0, extraChanges - 1))}
                  className="w-8 h-8 rounded-lg bg-white border-[1.5px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-sm font-mono font-bold hover:bg-[#FEF3C7] active:translate-x-0.5 active:translate-y-0.5"
                >
                  -
                </button>
                <span className="text-xs font-mono font-bold w-6 text-center text-[#18181B]">{extraChanges}</span>
                <button
                  onClick={() => setExtraChanges(extraChanges + 1)}
                  className="w-8 h-8 rounded-lg bg-white border-[1.5px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-sm font-mono font-bold hover:bg-[#FEF3C7] active:translate-x-0.5 active:translate-y-0.5"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF3C7] rounded-xl p-6 border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#92400E] block font-bold">Estimated Campus Price</span>
              <div className="font-mono font-extrabold text-4xl text-[#18181B] my-1.5">
                ₹{calculatedTotal}
              </div>
              <span className="text-xs font-mono text-[#15803D] font-bold block bg-white px-2 py-0.5 rounded border border-[#18181B] inline-block shadow-[1px_1px_0px_#18181B]">
                ✓ Includes 2 free changes + {extraChanges} extra (+₹{extraChanges * 50})
              </span>
            </div>

            <button
              onClick={onGoToTalent}
              className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] transition-all self-start active:translate-x-0.5 active:translate-y-0.5"
            >
              <span>Find Students Offering This</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
