import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function GigCard({ gig, onLockScope }) {
  const isLocked = gig.status === 'locked';

  // Format vouch count into clean "✓ X Vouches"
  const vouchMatch = gig.vouchedBadge ? gig.vouchedBadge.match(/\d+/) : null;
  const vouchText = vouchMatch ? `✓ ${vouchMatch[0]} Vouches` : '✓ 3 Vouches';

  // Format anonymized ID for clean display e.g. "Freelancer F1 • CSE"
  const cleanId = gig.anonymizedId
    ? gig.anonymizedId.replace('B.Tech ', '').replace(' (3rd Yr)', '').replace(' & Multimedia', '')
    : 'Freelancer';

  return (
    <article className="bg-white rounded-2xl border border-[#EAE6DF] p-6 hover:border-[#D6D0C5] transition-all flex flex-col justify-between group">
      <div>
        {/* Top Row: Category Pill + Sage Green Peer-Vouch Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#FAF9F6] text-[#57534E] border border-[#EAE6DF]">
            {gig.category}
          </span>
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F0F5F2] text-[#2D6A4F]">
            {vouchText}
          </span>
        </div>

        {/* Middle: Crisp Bold Title + 1-Line Short Description */}
        <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] leading-snug group-hover:text-[#D95D39] transition-colors line-clamp-1">
          {gig.title}
        </h3>
        <p className="text-xs text-[#57534E] mt-1.5 line-clamp-1 leading-relaxed">
          {gig.description}
        </p>
      </div>

      {/* Bottom Row (Separated by thin divider): Anonymized ID on left, Price + Lock Scope on right */}
      <div className="mt-5 pt-4 border-t border-[#EAE6DF] flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[#78716C] truncate max-w-[170px]" title={gig.anonymizedId}>
          {cleanId}
        </span>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="font-serif font-bold text-base text-[#1C1917]">
            ₹{gig.price}
          </span>

          {isLocked ? (
            <span className="inline-flex items-center text-xs font-medium text-[#2D6A4F] bg-[#F0F5F2] px-2.5 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
              Locked
            </span>
          ) : (
            <button
              onClick={() => onLockScope(gig)}
              className="inline-flex items-center text-xs font-semibold text-[#D95D39] hover:text-[#C24F2D] transition-colors group-hover:translate-x-0.5 duration-150"
            >
              <span>Lock Scope</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
