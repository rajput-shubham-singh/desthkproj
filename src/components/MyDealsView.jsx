import React, { useState } from 'react';
import { Check, Copy, Award, X, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEAL_STAGES = [
  { step: 1, label: 'Brief Locked' },
  { step: 2, label: 'Watermarked Draft' },
  { step: 3, label: 'Revision 1/2' },
  { step: 4, label: 'Final Handover' }
];

export default function MyDealsView({ 
  deals, 
  currentUser,
  onAdvanceStep,
  onToggleStatus, 
  onReopenSlot, 
  onRecommendStudent, 
  onGoToTalent 
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [badgeModalDeal, setBadgeModalDeal] = useState(null);
  const [badgeCopied, setBadgeCopied] = useState(false);

  const handleCopy = (deal) => {
    const paymentLine = deal.paymentType === 'barter' 
      ? `Skill Barter: ${deal.barterOffer || deal.paymentTerm}`
      : `Price: ₹${deal.price} (${deal.paymentTerm})`;
    const text = `LPU Skills for Hire — Deal Details\nTask: ${deal.title}\nWith: ${deal.withPerson}\n${paymentLine}\nDeadline: ${deal.deadline}\nRevisions: ${deal.freeChanges}\nRef: ${deal.dealCode}`;
    navigator.clipboard.writeText(text);
    setCopiedId(deal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyBadge = (deal) => {
    const studentId = currentUser ? `${currentUser.fullName} (Reg: ${currentUser.regNo})` : (deal.initiatedBy || 'Verified LPU Student');
    const text = `Verified Campus Proof-of-Work — Skills for Hire (LPU)\nStudent: ${studentId}\nSkill Delivered: ${deal.title} (${deal.category})\nClient / Club Sign-off: ${deal.withPerson}\nStatus: On-Time Completion • Ref ${deal.dealCode}`;
    navigator.clipboard.writeText(text);
    setBadgeCopied(true);
    setTimeout(() => setBadgeCopied(false), 2200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-6 sm:p-7">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
          My Deals
        </h1>
        <p className="text-sm text-[#52525B] mt-1">
          Track active campus deals through all 4 stages and unlock Verified Certificates at Final Handover.
        </p>
      </div>

      {deals.length > 0 ? (
        <div className="space-y-6">
          {deals.map((deal) => {
            const currentStep = deal.trackerStep || (deal.status === 'completed' ? 4 : 1);
            const isCompleted = currentStep === 4 || deal.status === 'completed';
            const isCopied = copiedId === deal.id;
            const isBarter = deal.paymentType === 'barter';

            return (
              <article
                key={deal.id}
                className="bg-white rounded-2xl border-[1.5px] border-[#18181B] hover:shadow-[3px_3px_0px_#18181B] transition-shadow p-6 sm:p-7 space-y-5"
              >
                {/* Top Metadata + Bold Rate Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#F6F4EF] border border-[#18181B] font-bold text-[#18181B]">
                      {deal.dealCode}
                    </span>
                    <span className="text-[#52525B]">{deal.category}</span>
                  </div>

                  <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold">
                    <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#15803D]' : 'bg-[#F59E0B]'}`} />
                    <span className={isCompleted ? 'text-[#15803D]' : 'text-[#18181B]'}>
                      {isCompleted ? '4. Final Handover' : `Stage ${currentStep} of 4`}
                    </span>
                  </span>
                </div>

                {/* Title & Collaborator */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#18181B]">
                      {deal.title}
                    </h3>
                    <p className="text-xs font-mono text-[#52525B] mt-1">
                      With <strong className="text-[#18181B]">{deal.withPerson}</strong>
                    </p>
                  </div>

                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#F6F4EF] text-[#18181B] border-[1.5px] border-[#18181B] self-start">
                    {isBarter ? 'Skill Barter' : `₹${Number(deal.price).toLocaleString('en-IN')}`}
                  </span>
                </div>

                {/* 4-Stage Visual Progress Stepper */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {DEAL_STAGES.map((s) => {
                    const done = currentStep > s.step || (currentStep === 4 && s.step === 4);
                    const active = currentStep === s.step && !isCompleted;

                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => onAdvanceStep ? onAdvanceStep(deal.id, s.step) : null}
                        className={`text-left px-3 py-2.5 rounded-lg border-[1.5px] text-xs font-mono transition-colors ${
                          done
                            ? 'bg-[#DCFCE7] border-[#18181B] text-[#15803D] font-bold'
                            : active
                              ? 'bg-[#FEF3C7] border-[#18181B] text-[#18181B] font-bold shadow-[2px_2px_0px_#18181B]'
                              : 'bg-[#F6F4EF] border-[#18181B]/30 text-[#52525B] hover:border-[#18181B]'
                        }`}
                      >
                        {s.step}. {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* 3-Point Upfront Terms Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#18181B]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#71717A] block">{isBarter ? 'Skill Barter' : 'Budget'}</span>
                    <span className="font-bold text-[#18181B] mt-0.5 block">
                      {isBarter ? (deal.barterOffer || deal.paymentTerm) : `₹${Number(deal.price).toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block">Deadline</span>
                    <span className="font-bold text-[#18181B] mt-0.5 block">{deal.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block">Revisions Lock</span>
                    <span className="font-bold text-[#15803D] mt-0.5 block">{deal.freeChanges || 'Max 2 Free Revisions'}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-[#18181B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <button
                      onClick={() => handleCopy(deal)}
                      className="inline-flex items-center text-[#52525B] hover:text-[#18181B] font-bold transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-[#15803D]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          <span>Copy for WhatsApp</span>
                        </>
                      )}
                    </button>

                    {isCompleted && (
                      <button
                        type="button"
                        onClick={() => {
                          setBadgeCopied(false);
                          setBadgeModalDeal(deal);
                        }}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] font-bold border-[1.5px] border-[#18181B] transition-colors"
                      >
                        <Award className="w-3.5 h-3.5 mr-1.5" />
                        <span>View Verified Certificate</span>
                      </button>
                    )}

                    {isCompleted && onReopenSlot && (
                      <button
                        onClick={() => onReopenSlot(deal)}
                        className="text-[#52525B] hover:text-[#18181B] underline underline-offset-4"
                      >
                        Re-open slot
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {!isCompleted ? (
                      <button
                        onClick={() => onAdvanceStep ? onAdvanceStep(deal.id, currentStep + 1) : onToggleStatus(deal.id)}
                        className="px-4 py-2 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] hover:shadow-[2px_2px_0px_#18181B] transition-all"
                      >
                        Advance Stage →
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onToggleStatus(deal.id)}
                          className="px-3.5 py-2 rounded-lg border-[1.5px] border-[#18181B] bg-[#F6F4EF] text-xs font-bold text-[#52525B] hover:text-[#18181B]"
                        >
                          Reopen
                        </button>
                        <button
                          onClick={() => onRecommendStudent(deal.id, deal.withPerson)}
                          disabled={deal.hasRecommended}
                          className={`px-4 py-2 rounded-lg text-xs font-bold border-[1.5px] border-[#18181B] transition-colors ${
                            deal.hasRecommended
                              ? 'bg-[#DCFCE7] text-[#15803D] cursor-default'
                              : 'bg-[#15803D] hover:bg-[#166534] text-white'
                          }`}
                        >
                          {deal.hasRecommended ? 'Recommended' : 'Recommend Student'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] p-12 text-center">
          <p className="text-base font-bold text-[#18181B]">No active deals yet</p>
          <p className="text-sm text-[#52525B] mt-1">
            When you hire a student or accept a requirement, your deal will appear here.
          </p>
          <button
            onClick={onGoToTalent}
            className="mt-5 px-4 py-2 rounded-lg bg-[#D95D39] text-white text-xs font-bold border-[1.5px] border-[#18181B]"
          >
            Explore categories
          </button>
        </div>
      )}

      {/* Printable / Shareable Campus Proof-of-Work Certificate Modal */}
      <AnimatePresence>
        {badgeModalDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/45 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-md w-full p-7 relative"
            >
            <button
              onClick={() => setBadgeModalDeal(null)}
              className="absolute top-5 right-5 text-[#52525B] hover:text-[#18181B] p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] border-[1.5px] border-[#18181B] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-[#15803D]" />
              </div>

              <div>
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#18181B]">
                  Verified Campus Proof-of-Work
                </span>
                <h3 className="text-xl font-bold text-[#18181B] mt-2">
                  Completion Certificate
                </h3>
                <p className="text-xs font-mono text-[#52525B] mt-0.5">
                  Skills for Hire · Lovely Professional University
                </p>
              </div>

              <div className="bg-[#F6F4EF] rounded-xl p-4 border-[1.5px] border-[#18181B] text-left text-xs font-mono space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Student ID</span>
                  <span className="text-[#18181B] font-bold">
                    {currentUser ? `${currentUser.fullName} (${currentUser.regNo})` : (badgeModalDeal.initiatedBy || 'Verified LPU Student')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Skill Delivered</span>
                  <span className="text-[#18181B] font-bold text-right max-w-[200px]">
                    {badgeModalDeal.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Client / Club Sign-off</span>
                  <span className="text-[#18181B] font-bold">{badgeModalDeal.withPerson}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#18181B]/20">
                  <span className="text-[#71717A]">Sign-off Status</span>
                  <span className="text-[#15803D] font-bold">✓ On-Time Completion</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Verification ID</span>
                  <span className="text-[#D95D39] font-bold">{badgeModalDeal.dealCode}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyBadge(badgeModalDeal)}
                  className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-xs font-bold border-[1.5px] border-[#18181B] transition-colors"
                >
                  {badgeCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5" />
                      <span>Copied for Resume</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      <span>Copy Proof Text</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center py-2.5 px-3.5 rounded-lg bg-white hover:bg-[#F6F4EF] text-[#18181B] text-xs font-bold border-[1.5px] border-[#18181B] transition-colors"
                  title="Print Certificate"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
