import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ConfirmDealModal({ item, itemType, isOpen, onClose, onConfirmDeal, onGoToDeals, currentUser }) {
  const isTalent = itemType === 'talent';
  const defaultPrice = item ? (isTalent ? item.startingPrice : item.budget) : 0;
  const defaultDeadline = item ? (isTalent ? item.deliveryTime : item.deadline) : "";
  const defaultPerson = item ? (isTalent ? item.studentId : item.postedBy) : "";

  const [price, setPrice] = useState(defaultPrice);
  const [deadline, setDeadline] = useState(defaultDeadline);
  const [paymentTerm, setPaymentTerm] = useState("50% advance, 50% on completion");
  const [notes, setNotes] = useState("");
  const [dealConfirmed, setDealConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dealCode, setDealCode] = useState(() => `DEAL-LPU-${Math.floor(1000 + Math.random() * 9000)}`);

  React.useEffect(() => {
    if (item) {
      setPrice(itemType === 'talent' ? item.startingPrice : item.budget);
      setDeadline(itemType === 'talent' ? item.deliveryTime : item.deadline);
      setDealConfirmed(false);
      setCopied(false);
      setNotes("");
      setDealCode(`DEAL-LPU-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [item, itemType, isOpen]);

  if (!isOpen || !item) return null;

  const initiatorId = currentUser ? currentUser.displayName : 'Verified Student';

  const handleConfirm = (e) => {
    e.preventDefault();
    const newDeal = {
      id: `deal-${Date.now()}`,
      dealCode,
      sourceId: item.id,
      sourceType: itemType, // 'talent' or 'need'
      title: item.title,
      withPerson: defaultPerson,
      initiatedBy: initiatorId,
      category: item.category,
      price: Number(price),
      deadline: deadline || "As agreed",
      paymentTerm,
      freeChanges: "2 free changes included",
      status: "in-progress",
      hasRecommended: false,
      notes: notes.trim(),
      createdAt: "Just now"
    };

    onConfirmDeal(newDeal);
    setDealConfirmed(true);
  };

  const handleCopyForWhatsApp = () => {
    const text = `🤝 *LPU SKILLS FOR HIRE — DEAL CONFIRMATION*\n───────────────────────────────\n📋 *Task:* ${item.title}\n👤 *Peer:* ${defaultPerson}\n✅ *Client / Initiator:* ${initiatorId}${currentUser ? ` (Reg: ${currentUser.maskedRegNo})` : ''}\n💰 *Agreed Price:* ₹${price}\n⏱️ *Deadline:* ${deadline}\n💳 *Payment:* ${paymentTerm}\n🛡️ *Free Changes:* 2 free changes included\n🔖 *Ref Code:* ${dealCode}\n${notes ? `📝 *Notes:* ${notes}\n` : ''}───────────────────────────────\n_LPU Campus Edition • Handcrafted Marketplace_`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleClose = () => {
    setDealConfirmed(false);
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-md w-full overflow-hidden p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#18181B] hover:text-[#E05A47] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {!dealConfirmed ? (
          /* Step 1: Confirmation Form */
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-[#E05A47] uppercase tracking-wider block bg-[#FDF3F1] px-2 py-0.5 rounded border border-[#18181B]">
                  {isTalent ? 'Hire Campus Student' : 'Accept Student Need'}
                </span>
                {currentUser && (
                  <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#18181B]">
                    Reg: {currentUser.regNo}
                  </span>
                )}
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#18181B] leading-snug">
                Confirm Deal
              </h3>
              <p className="text-xs font-mono text-[#52525B] mt-0.5">
                With <strong className="text-[#18181B]">{defaultPerson}</strong>
              </p>
            </div>

            {/* Task summary */}
            <div className="bg-[#F5F2EB] rounded-xl p-3 border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-xs">
              <span className="text-[#71717A] block text-[10px] uppercase font-mono font-bold">Selected Task</span>
              <span className="font-display font-bold text-sm text-[#18181B] block mt-0.5">{item.title}</span>
            </div>

            {/* Final Price & Deadline */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-display font-bold text-[#18181B] mb-1">
                  Final Price (₹):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#18181B]">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full pl-7 pr-3 py-2 text-xs rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono font-bold text-[#18181B] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold text-[#18181B] mb-1">
                  Deadline:
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. In 2 days"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block text-xs font-display font-bold text-[#18181B] mb-1">
                Payment Term:
              </label>
              <select
                value={paymentTerm}
                onChange={(e) => setPaymentTerm(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono font-medium text-[#18181B] focus:outline-none focus:bg-white"
              >
                <option value="50% advance, 50% on completion">50% advance, 50% on completion (Standard)</option>
                <option value="Pay after seeing first draft">Pay after seeing first draft</option>
                <option value="100% on final file delivery">100% on final file delivery</option>
              </select>
            </div>

            {/* Free Changes Note */}
            <div className="bg-[#DCFCE7] p-3 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center space-x-2 text-xs text-[#15803D]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span className="font-mono font-bold">2 Free Changes Included (+₹50 extra).</span>
            </div>

            {/* Optional Instructions */}
            <div>
              <label className="block text-xs font-display font-bold text-[#18181B] mb-1">
                Notes / Google Drive Link (Optional):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Drive link, fest theme color"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <span>Confirm Deal (₹{price})</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Deal Confirmed Receipt with 1-Click "Copy for WhatsApp" */
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] flex items-center justify-center mx-auto mb-2.5">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#18181B]">
                Deal Confirmed!
              </h3>
              <p className="text-xs font-mono text-[#52525B] mt-0.5">
                Saved to your <strong>My Deals</strong> tab.
              </p>
            </div>

            {/* Receipt Summary Index Card */}
            <div className="bg-[#F5F2EB] rounded-xl p-4 border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] text-xs space-y-2 font-mono">
              <div className="flex justify-between pb-2 border-b-[1.5px] border-dashed border-[#18181B]/30">
                <span className="font-display font-bold text-[#18181B]">CAMPUS RECEIPT</span>
                <span className="text-[#E05A47] font-bold">{dealCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Task:</span>
                <span className="text-[#18181B] font-display font-bold text-right truncate max-w-[170px]">{item.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">With:</span>
                <span className="text-[#18181B] font-bold">{defaultPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Price:</span>
                <span className="text-[#18181B] font-extrabold">₹{price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Deadline:</span>
                <span className="text-[#18181B]">{deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Payment:</span>
                <span className="text-[#18181B]">{paymentTerm}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-[1.5px] border-dashed border-[#18181B]/30">
                <span className="text-[#71717A]">Changes:</span>
                <span className="text-[#15803D] font-bold">2 Free Included</span>
              </div>
            </div>

            {/* 1-Click "Copy Details for WhatsApp" Button in Forest Green */}
            <button
              onClick={handleCopyForWhatsApp}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span>Copy Details for WhatsApp</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-1 text-xs font-mono font-bold">
              <button
                onClick={handleClose}
                className="text-[#52525B] hover:text-[#18181B]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onGoToDeals();
                }}
                className="text-[#E05A47] hover:underline"
              >
                View in My Deals →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
