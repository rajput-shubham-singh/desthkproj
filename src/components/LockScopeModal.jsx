import React, { useState } from 'react';
import { X, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LockScopeModal({ gig, isOpen, onClose, onConfirmLock }) {
  const [step, setStep] = useState(1); // 1 = confirm, 2 = receipt
  const [copied, setCopied] = useState(false);
  const [agreementId] = useState(() => `LPU-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isOpen || !gig) return null;

  const halfPrice = Math.round(gig.price / 2);

  const handleConfirm = () => {
    onConfirmLock(gig.id, {
      agreementId,
      lockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: gig.price,
      halfPrice
    });
    setStep(2);
  };

  const handleCopyForWhatsApp = () => {
    const text = `🤝 *LPU SKILLS FOR HIRE — SCOPE LOCK*\n────────────────────────\n📋 *Item:* ${gig.title}\n👤 *Peer:* ${gig.anonymizedId}\n💰 *Rate:* ₹${gig.price} (50% Escrow: ₹${halfPrice})\n⏱️ *Turnaround:* ${gig.turnaround}\n🛡️ *Revisions:* 2 Free Included (+₹50 per extra)\n🔖 *Ref Code:* ${agreementId}\n────────────────────────\n_Design Thinking Project P25 • Campus Fair-Play Verified_`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCloseModal = () => {
    setStep(1);
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-lg max-w-md w-full overflow-hidden p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 text-[#78716C] hover:text-[#1C1917] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 1 ? (
          /* Step 1: Minimal Scope Review */
          <div className="space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-[#D95D39] uppercase tracking-wider block mb-1">
                Lock Scope & Escrow
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1C1917] leading-snug">
                {gig.title}
              </h3>
              <p className="text-xs text-[#78716C] mt-1">
                With {gig.anonymizedId}
              </p>
            </div>

            {/* Scope Summary Box */}
            <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#EAE6DF] space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#EAE6DF]">
                <span className="text-[#57534E]">Total Agreed Price</span>
                <span className="font-serif font-bold text-base text-[#1C1917]">₹{gig.price}</span>
              </div>
              <div className="flex justify-between items-center text-[#57534E]">
                <span>50% Upfront Escrow</span>
                <span className="font-semibold text-[#1C1917]">₹{halfPrice}</span>
              </div>
              <div className="flex justify-between items-center text-[#57534E]">
                <span>Turnaround Window</span>
                <span className="font-semibold text-[#1C1917]">{gig.turnaround}</span>
              </div>
              <div className="flex justify-between items-center text-[#57534E]">
                <span>Revisions Policy</span>
                <span className="font-semibold text-[#2D6A4F]">2 Free (+₹50 extra)</span>
              </div>
            </div>

            {/* Fair-Play Protection Note */}
            <div className="flex items-center space-x-2 text-[11px] text-[#57534E] bg-[#F0F5F2] px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
              <span>Campus Fair-Play: 50% released only after milestone signoff.</span>
            </div>

            {/* Confirm Action */}
            <button
              onClick={handleConfirm}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#D95D39] hover:bg-[#C24F2D] text-white text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <span>Confirm & Lock Scope</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        ) : (
          /* Step 2: Neat Crisp Receipt Card with "Copy for WhatsApp" */
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-9 h-9 rounded-full bg-[#F0F5F2] text-[#2D6A4F] flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                Scope Locked Successfully
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Milestone handshake active under LPU P25 guidelines.
              </p>
            </div>

            {/* Crisp Receipt Card */}
            <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#EAE6DF] space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between pb-2 border-b border-dashed border-[#EAE6DF] text-xs">
                <span className="font-serif font-bold text-[#1C1917]">RECEIPT / AGREEMENT</span>
                <span className="text-[#D95D39] font-bold">{agreementId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Deliverable:</span>
                <span className="text-[#1C1917] font-sans font-medium text-right truncate max-w-[170px]">{gig.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Peer ID:</span>
                <span className="text-[#1C1917] font-sans font-medium">{gig.anonymizedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Total Price:</span>
                <span className="text-[#1C1917] font-sans font-bold">₹{gig.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">50% Escrow:</span>
                <span className="text-[#2D6A4F] font-sans font-bold">₹{halfPrice} (Committed)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-[#EAE6DF]">
                <span className="text-[#78716C]">Revision Rule:</span>
                <span className="text-[#1C1917] font-sans">2 Free (+₹50 extra)</span>
              </div>
            </div>

            {/* Single "Copy for WhatsApp" Button */}
            <button
              onClick={handleCopyForWhatsApp}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#245640] text-white text-xs font-semibold shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
                  <span>Copied for WhatsApp!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span>Copy for WhatsApp</span>
                </>
              )}
            </button>

            <button
              onClick={handleCloseModal}
              className="w-full text-center text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              Done & Return to Gigs
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
