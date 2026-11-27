import React from 'react';
import { motion } from 'framer-motion';

export default function NeedCard({ need, onICanDoThis, onOpenMatches, talentList = [] }) {
  const isFilled = (need.filledCount || 0) >= (need.neededCount || 1);
  const spotsLeft = (need.neededCount || 1) - (need.filledCount || 0);
  const isBarter = need.paymentType === 'barter';

  const matchingStudentsCount = talentList.filter(
    (t) => t.category === need.category && !t.isPaused && (t.slots || 0) > 0
  ).length;

  return (
    <motion.article
      whileHover={{ y: -2, boxShadow: '3px 3px 0px #18181B' }}
      whileTap={{ y: 1, boxShadow: '1px 1px 0px #18181B' }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            {need.isUrgent && (
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-bold border border-[#18181B]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D97706]" />
                </span>
                <span>Urgent 24-Hr</span>
              </span>
            )}
            <span className="inline-flex items-center space-x-1.5">
              {!isFilled ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#15803D]" />
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
              )}
              <span className={isFilled ? 'text-[#71717A]' : 'text-[#15803D] font-bold'}>
                {isFilled ? 'Filled' : `${spotsLeft} open`}
              </span>
            </span>
          </div>

          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#F6F4EF] text-[#18181B] border-[1.5px] border-[#18181B] flex-shrink-0">
            {isBarter ? 'Skill Barter' : `Budget ₹${Number(need.budget).toLocaleString('en-IN')}`}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#18181B] leading-snug">
          {need.title}
        </h3>

        <p className="text-xs text-[#52525B] mt-2 line-clamp-2 leading-relaxed">
          {need.description}
        </p>

        {isBarter && need.barterOffer && (
          <p className="text-xs font-mono text-[#18181B] bg-[#F6F4EF] border border-[#18181B]/40 rounded-lg p-2.5 mt-3">
            Swap: {need.barterOffer}
          </p>
        )}

        <div className="mt-3 text-xs font-mono text-[#71717A] flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{need.category}</span>
          <span>·</span>
          <span>{need.deadline}</span>
          {onOpenMatches && (
            <>
              <span>·</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenMatches(need);
                }}
                className="text-[#D95D39] font-bold hover:underline"
              >
                {matchingStudentsCount} matching
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#18181B]/15 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-[#52525B] truncate max-w-[160px]" title={need.postedBy}>
          {need.postedBy}
        </span>

        {!isFilled ? (
          <button
            onClick={() => onICanDoThis(need)}
            className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors flex-shrink-0"
          >
            I Can Do This →
          </button>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-[#F3F4F6] text-[#9CA3AF] text-xs font-mono font-bold border-[1.5px] border-[#18181B]/30 cursor-not-allowed flex-shrink-0"
          >
            Filled
          </button>
        )}
      </div>
    </motion.article>
  );
}
