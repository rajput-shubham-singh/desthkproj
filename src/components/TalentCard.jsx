import React from 'react';
import { Clock, Star, ArrowRight, Ban, Eye } from 'lucide-react';

export default function TalentCard({ talent, onHireNow, onViewSamples }) {
  const isAvailable = !talent.isPaused && talent.slots > 0;
  const samplesCount = (talent.samples && talent.samples.length) || 0;

  return (
    <article 
      className={`rounded-2xl border-[1.5px] border-[#18181B] p-5 sm:p-6 flex flex-col justify-between transition-all ${
        isAvailable 
          ? 'bg-white shadow-[3px_3px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5 group' 
          : 'bg-[#F9F8F6] opacity-85 shadow-[1.5px_1.5px_0px_#18181B]'
      }`}
    >
      <div>
        {/* Top Row: Category Tag + Live Availability Badge + Recommendations */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3.5">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
              {talent.category}
            </span>

            {/* Live Slot Availability Badge */}
            {talent.isPaused ? (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border-[1.2px] border-[#18181B]">
                <Ban className="w-2.5 h-2.5 mr-1" />
                Paused (Busy)
              </span>
            ) : talent.slots > 0 ? (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] mr-1 animate-pulse" />
                {talent.slots} {talent.slots === 1 ? 'Slot' : 'Slots'} Left
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] border-[1.2px] border-[#18181B]">
                ✕ Currently Booked
              </span>
            )}
          </div>

          <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-[#15803D] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
            <Star className="w-3 h-3 mr-1 fill-[#15803D] stroke-none" />
            ★ {talent.recommendations}
          </span>
        </div>

        {/* High-Contrast Bold Geometric Heading */}
        <h3 className={`font-display font-bold text-lg leading-snug transition-colors ${
          isAvailable ? 'text-[#18181B] group-hover:text-[#E05A47]' : 'text-[#52525B]'
        }`}>
          {talent.title}
        </h3>

        {/* Short 2-Line Description */}
        <p className="text-xs text-[#52525B] mt-2 line-clamp-2 leading-relaxed font-normal">
          {talent.description}
        </p>

        {/* Campus Student ID & Delivery Time */}
        <div className="mt-4 pt-3 border-t-[1.5px] border-dashed border-[#18181B]/20 flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-[#18181B] truncate max-w-[170px]" title={talent.studentId}>
            {talent.studentId}
          </span>
          <span className="flex items-center text-[11px] text-[#71717A] flex-shrink-0">
            <Clock className="w-3 h-3 mr-1 text-[#E05A47]" />
            {talent.deliveryTime}
          </span>
        </div>
      </div>

      {/* Bottom Row: Monospaced Price Badge + "View Samples" & "Hire Now" */}
      <div className="mt-5 pt-4 border-t-[1.5px] border-[#18181B] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase text-[#71717A] block">Starts at</span>
          <div className="inline-flex items-baseline space-x-1 px-2 py-0.5 rounded-md bg-[#F5F2EB] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
            <span className="font-mono font-bold text-lg text-[#18181B]">
              ₹{Number(talent.startingPrice).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] font-mono text-[#71717A]">
              {talent.priceUnit ? `/${talent.priceUnit.replace('per ', '')}` : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {samplesCount > 0 && (
            <button
              type="button"
              onClick={() => onViewSamples && onViewSamples(talent)}
              className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white hover:bg-[#FEF3C7] text-[#18181B] text-xs font-mono font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              title="View past work samples & portfolio proofs"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5 text-[#18181B]" />
              <span>Sample Work ({samplesCount})</span>
            </button>
          )}

          {isAvailable ? (
            <button
              onClick={() => onHireNow(talent)}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex-shrink-0"
            >
              <span>Hire Now</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 stroke-[2.5]" />
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-[#E5E2DC] text-[#71717A] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/40 cursor-not-allowed select-none flex-shrink-0"
            >
              <span>Booked Out</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
