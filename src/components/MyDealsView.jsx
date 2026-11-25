import React, { useState } from 'react';
import { Check, Copy, Star, Clock, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

export default function MyDealsView({ deals, onToggleStatus, onReopenSlot, onRecommendStudent, onGoToTalent }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (deal) => {
    const text = `🤝 *LPU SKILLS FOR HIRE — DEAL DETAILS*\n───────────────────────────────\n📋 *Task:* ${deal.title}\n👤 *With:* ${deal.withPerson}\n💰 *Price:* ₹${deal.price}\n⏱️ *Deadline:* ${deal.deadline}\n💳 *Payment Term:* ${deal.paymentTerm}\n🛡️ *Changes:* ${deal.freeChanges}\n🔖 *Ref Code:* ${deal.dealCode}\n───────────────────────────────\n_LPU Student-to-Student Marketplace_`;
    navigator.clipboard.writeText(text);
    setCopiedId(deal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#18181B] tracking-tight">
          My Deals
        </h1>
        <p className="text-xs sm:text-sm text-[#52525B] mt-1 font-medium">
          Track your campus tasks, agreed deadlines, and recommend peers after work is completed.
        </p>
      </div>

      {deals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => {
            const isCompleted = deal.status === 'completed';
            const isCopied = copiedId === deal.id;

            return (
              <article
                key={deal.id}
                className={`bg-white rounded-2xl border-[1.5px] border-[#18181B] p-5 sm:p-6 transition-all flex flex-col justify-between shadow-[3px_3px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] ${
                  isCompleted ? 'bg-[#F0FDF4]/50' : 'bg-white'
                }`}
              >
                <div>
                  {/* Top Bar: Code + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-[#18181B] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B]">
                      {deal.dealCode}
                    </span>
                    
                    {/* Status Pill Toggle */}
                    <button
                      onClick={() => onToggleStatus(deal.id)}
                      className={`inline-flex items-center text-xs font-mono font-bold px-2.5 py-1 rounded-md border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                        isCompleted
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#F5F2EB] text-[#18181B] hover:bg-[#FEF3C7]'
                      }`}
                      title="Click to toggle status between In Progress and Completed"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#15803D]" />
                          Completed (Reopen)
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 mr-1 text-[#E05A47]" />
                          In Progress
                        </>
                      )}
                    </button>
                  </div>

                  {/* Task Title */}
                  <h3 className="font-display font-bold text-lg text-[#18181B] leading-snug">
                    {deal.title}
                  </h3>
                  <p className="text-xs font-mono text-[#52525B] mt-1">
                    With <strong className="text-[#18181B]">{deal.withPerson}</strong>
                  </p>

                  {/* Deal Specs Index Box */}
                  <div className="mt-4 bg-[#F5F2EB] rounded-xl p-3.5 border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#71717A]">Agreed Price:</span>
                      <span className="font-bold text-sm text-[#18181B]">₹{deal.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717A]">Deadline:</span>
                      <span className="text-[#18181B] font-semibold">{deal.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717A]">Payment:</span>
                      <span className="text-[#18181B]">{deal.paymentTerm}</span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t-[1px] border-dashed border-[#18181B]/40">
                      <span className="text-[#71717A]">Free Changes:</span>
                      <span className="text-[#15803D] font-bold">{deal.freeChanges}</span>
                    </div>
                  </div>

                  {deal.notes && (
                    <p className="text-[11px] font-mono text-[#71717A] mt-2 italic">
                      Note: "{deal.notes}"
                    </p>
                  )}

                  {/* Restock Notification on Completed Deals */}
                  {isCompleted && (
                    <div className="mt-3.5 p-2.5 rounded-xl bg-[#DCFCE7] border-[1.2px] border-[#18181B] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#15803D]">
                      <span className="font-bold flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                        Deal Completed • +1 Slot Restocked Live
                      </span>
                      {onReopenSlot && (
                        <button
                          onClick={() => onReopenSlot(deal)}
                          className="inline-flex items-center text-[10px] font-bold text-[#18181B] bg-white px-2 py-1 rounded-md border border-[#18181B] hover:bg-[#FEF3C7] shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                          title="1-click to restore an extra booking slot for this skill"
                        >
                          <RotateCcw className="w-3 h-3 mr-1 text-[#E05A47]" />
                          Re-open Extra Slot
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions: WhatsApp Copy & Live "Recommend Student" */}
                <div className="mt-5 pt-4 border-t-[1.5px] border-[#18181B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  
                  {/* WhatsApp Copy */}
                  <button
                    onClick={() => handleCopy(deal)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-white hover:bg-[#FEF3C7] text-xs font-mono font-bold text-[#18181B] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-[#15803D]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-[#18181B]" />
                        <span>Copy for WhatsApp</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center space-x-2">
                    {/* Toggle button */}
                    <button
                      onClick={() => onToggleStatus(deal.id)}
                      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                        isCompleted
                          ? 'bg-[#F5F2EB] hover:bg-[#E5E2DC] text-[#52525B]'
                          : 'bg-[#E05A47] hover:bg-[#D04936] text-white'
                      }`}
                    >
                      {isCompleted ? 'Mark In Progress' : 'Mark Completed'}
                    </button>

                    {/* Recommend Student Button (Active when completed) */}
                    {isCompleted && (
                      <button
                        onClick={() => onRecommendStudent(deal.id, deal.withPerson)}
                        disabled={deal.hasRecommended}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-display font-bold border-[1.5px] border-[#18181B] transition-all ${
                          deal.hasRecommended
                            ? 'bg-[#DCFCE7] text-[#15803D] shadow-[1.5px_1.5px_0px_#18181B] cursor-default'
                            : 'bg-[#15803D] hover:bg-[#166534] text-white shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 mr-1 ${deal.hasRecommended ? 'fill-[#15803D]' : 'fill-white'}`} />
                        {deal.hasRecommended ? 'Recommended! (+1)' : '★ Recommend'}
                      </button>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[4px_4px_0px_#18181B] p-12 text-center">
          <p className="text-lg font-display font-bold text-[#18181B]">No active deals yet</p>
          <p className="text-xs text-[#52525B] mt-1 max-w-sm mx-auto font-normal">
            When you hire a student or accept a requirement, your confirmed deal will appear here.
          </p>
          <button
            onClick={onGoToTalent}
            className="mt-5 inline-flex items-center px-4 py-2 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>Browse Student Talent</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
          </button>
        </div>
      )}

    </div>
  );
}
