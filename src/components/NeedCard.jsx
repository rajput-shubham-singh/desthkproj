import React from 'react';
import { Clock, MapPin, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export default function NeedCard({ need, onICanDoThis, onOpenMatches, talentList = [] }) {
  const isFilled = (need.filledCount || 0) >= (need.neededCount || 1);
  const spotsLeft = (need.neededCount || 1) - (need.filledCount || 0);

  // Calculate live matching students available for this need's category
  const matchingStudentsCount = talentList.filter(
    (t) => t.category === need.category && !t.isPaused && (t.slots || 0) > 0
  ).length;

  return (
    <article 
      className={`rounded-2xl border-[1.5px] border-[#18181B] p-5 sm:p-6 flex flex-col justify-between transition-all ${
        !isFilled
          ? 'bg-white shadow-[3px_3px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] hover:-translate-x-0.5 hover:-translate-y-0.5 group'
          : 'bg-[#F9F8F6] opacity-85 shadow-[1.5px_1.5px_0px_#18181B]'
      }`}
    >
      <div>
        {/* Top Row: Deadline Tag + Budget Monospace Pill + Availability */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3.5">
          <div className="flex items-center space-x-1.5">
            <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FDF3F1] text-[#E05A47] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
              <Clock className="w-3 h-3 mr-1" />
              {need.deadline}
            </span>

            {/* Capacity / Spot Badge */}
            {isFilled ? (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] border-[1.2px] border-[#18181B]">
                <CheckCircle2 className="w-3 h-3 mr-1 text-[#15803D]" />
                ✓ Position Filled
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1px_1px_0px_#18181B]">
                ● {spotsLeft} {spotsLeft === 1 ? 'Spot' : 'Spots'} Open
              </span>
            )}
          </div>

          <span className="inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white text-[#18181B] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
            Budget: ₹{Number(need.budget).toLocaleString('en-IN')}
          </span>
        </div>

        {/* High-Contrast Bold Geometric Heading */}
        <h3 className={`font-display font-bold text-lg leading-snug transition-colors ${
          !isFilled ? 'text-[#18181B] group-hover:text-[#E05A47]' : 'text-[#52525B]'
        }`}>
          {need.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#52525B] mt-2 line-clamp-2 leading-relaxed font-normal">
          {need.description}
        </p>

        {/* Category & Campus Location + Live Match Pill Badge */}
        <div className="mt-4 pt-3 border-t-[1.5px] border-dashed border-[#18181B]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5F2EB] border-[1px] border-[#18181B] text-[#18181B]">
              {need.category}
            </span>
            {need.campusLocation && (
              <span className="flex items-center text-[10px] text-[#71717A]">
                <MapPin className="w-3 h-3 mr-0.5 text-[#E05A47]" />
                {need.campusLocation}
              </span>
            )}
          </div>

          {/* Clickable Live Match Badge */}
          {onOpenMatches && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenMatches(need);
              }}
              className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border-[1.2px] border-[#18181B] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                matchingStudentsCount > 0
                  ? 'bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] shadow-[1px_1px_0px_#18181B]'
                  : 'bg-[#F5F2EB] hover:bg-[#E5E2DC] text-[#71717A]'
              }`}
              title="Click to view students on campus ready for this skill"
            >
              <Zap className="w-2.5 h-2.5 mr-1 text-[#D97706] fill-[#D97706]" />
              <span>⚡ {matchingStudentsCount} {matchingStudentsCount === 1 ? 'Matching Student' : 'Matching Students'} Available</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Posted By + "I Can Do This" Button */}
      <div className="mt-5 pt-4 border-t-[1.5px] border-[#18181B] flex items-center justify-between gap-3">
        <div className="truncate max-w-[160px]">
          <span className="text-[10px] font-mono font-semibold uppercase text-[#71717A] block">Posted By</span>
          <span className="text-xs font-mono font-bold text-[#18181B] truncate block" title={need.postedBy}>
            {need.postedBy}
          </span>
        </div>

        {!isFilled ? (
          <button
            onClick={() => onICanDoThis(need)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex-shrink-0"
          >
            <span>I Can Do This</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 stroke-[2.5]" />
          </button>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-[#E5E2DC] text-[#71717A] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/40 cursor-not-allowed select-none flex-shrink-0"
          >
            <span>Position Filled</span>
          </button>
        )}
      </div>
    </article>
  );
}
