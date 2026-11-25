import React, { useState } from 'react';
import { Check, Copy, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function ActiveDealsView({ gigs, onNavigateToBoard }) {
  const [copiedId, setCopiedId] = useState(null);

  const lockedGigs = gigs.filter(g => g.status === 'locked');

  const handleCopy = (gig) => {
    const text = `🤝 *LPU SKILLS SCOPE LOCK*\nRef: ${gig.lockDetails?.agreementId || 'LPU-P25'}\nItem: ${gig.title}\nPeer: ${gig.anonymizedId}\nRate: ₹${gig.price} (50% Escrow: ₹${Math.round(gig.price / 2)})\nTurnaround: ${gig.turnaround}\nRevision Rule: 2 Free Included (+₹50 extra)\nStatus: In Progress`;
    navigator.clipboard.writeText(text);
    setCopiedId(gig.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
          Active Deals & Contracts
        </h1>
        <p className="text-sm text-[#57534E] mt-1">
          Peer milestone agreements with locked campus escrow and protected 2-revision policies.
        </p>
      </div>

      {lockedGigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lockedGigs.map((gig) => {
            const halfPrice = Math.round(gig.price / 2);
            const ref = gig.lockDetails?.agreementId || 'LPU-P25-ESCROW';
            const isCopied = copiedId === gig.id;

            return (
              <div
                key={gig.id}
                className="bg-white rounded-2xl border border-[#EAE6DF] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold text-[#D95D39] bg-[#FAF9F6] px-2.5 py-0.5 rounded border border-[#EAE6DF]">
                      {ref}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-[#F0F5F2] text-[#2D6A4F]">
                      <Clock className="w-3 h-3 mr-1" />
                      In Progress
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] leading-snug">
                    {gig.title}
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    With {gig.anonymizedId} • Turnaround: {gig.turnaround}
                  </p>

                  {/* Receipt breakdown */}
                  <div className="mt-4 bg-[#FAF9F6] rounded-xl p-3 border border-[#EAE6DF] text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Total Price:</span>
                      <span className="text-[#1C1917] font-sans font-bold">₹{gig.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">50% Escrow:</span>
                      <span className="text-[#2D6A4F] font-sans font-bold">₹{halfPrice} (Locked)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Revisions:</span>
                      <span className="text-[#1C1917] font-sans">2 Free (+₹50 extra)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                  <span className="text-xs text-[#78716C] flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] mr-1" />
                    P25 Escrow Safe
                  </span>
                  <button
                    onClick={() => handleCopy(gig)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-[#F0F5F2] text-xs font-semibold text-[#1C1917] border border-[#EAE6DF] transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-[#2D6A4F]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-[#78716C]" />
                        <span>Copy for WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-12 text-center">
          <p className="text-base font-serif font-bold text-[#1C1917]">No active deals yet</p>
          <p className="text-xs text-[#78716C] mt-1 max-w-sm mx-auto">
            When you click "Lock Scope" on any gig, a milestone escrow agreement will be generated and shown here.
          </p>
          <button
            onClick={onNavigateToBoard}
            className="mt-5 inline-flex items-center px-4 py-2 rounded-xl bg-[#D95D39] hover:bg-[#C24F2D] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span>Explore Campus Gigs</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>
      )}
    </div>
  );
}

