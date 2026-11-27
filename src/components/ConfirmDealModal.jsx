import React, { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDealModal({ item, itemType, isOpen, onClose, onConfirmDeal, onGoToDeals, currentUser }) {
  const isTalent = itemType === 'talent';
  const isBarter = !isTalent && item?.paymentType === 'barter';
  const defaultPrice = item ? (isTalent ? item.startingPrice : item.budget) : 0;
  const defaultDeadline = item ? (isTalent ? item.deliveryTime : item.deadline) : "";
  const defaultPerson = item ? (isTalent ? item.studentId : item.postedBy) : "";

  const [price, setPrice] = useState(defaultPrice);
  const [deadline, setDeadline] = useState(defaultDeadline);
  const [paymentTerm, setPaymentTerm] = useState(isBarter ? `Skill Barter: ${item?.barterOffer || 'Skill Swap'}` : "50% advance, 50% on completion");
  const [notes, setNotes] = useState("");
  const [dealConfirmed, setDealConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dealCode, setDealCode] = useState(() => `DEAL-LPU-${Math.floor(1000 + Math.random() * 9000)}`);

  React.useEffect(() => {
    if (item) {
      const barter = itemType !== 'talent' && item.paymentType === 'barter';
      setPrice(itemType === 'talent' ? item.startingPrice : (item.budget || 0));
      setDeadline(itemType === 'talent' ? item.deliveryTime : item.deadline);
      setPaymentTerm(barter ? `Skill Barter: ${item.barterOffer || 'Skill Swap'}` : "50% advance, 50% on completion");
      setDealConfirmed(false);
      setCopied(false);
      setNotes("");
      setDealCode(`DEAL-LPU-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [item, itemType, isOpen]);

  const initiatorId = currentUser ? currentUser.displayName : 'Verified Student';

  const handleConfirm = (e) => {
    e.preventDefault();
    const newDeal = {
      id: `deal-${Date.now()}`,
      dealCode,
      sourceId: item.id,
      sourceType: itemType,
      title: item.title,
      withPerson: defaultPerson,
      initiatedBy: initiatorId,
      category: item.category,
      paymentType: isBarter ? 'barter' : 'cash',
      barterOffer: isBarter ? item.barterOffer : '',
      price: isBarter ? 0 : Number(price),
      deadline: deadline || "As agreed",
      paymentTerm,
      freeChanges: "Max 2 Free Revisions included",
      trackerStep: 1,
      status: "in-progress",
      hasRecommended: false,
      notes: notes.trim(),
      createdAt: "Just now"
    };
    onConfirmDeal(newDeal);
    setDealConfirmed(true);
  };

  const handleCopyForWhatsApp = () => {
    const terms = isBarter ? `Skill Barter: ${item.barterOffer}` : `Final Price: ₹${price} (${paymentTerm})`;
    const text = `LPU Skills for Hire — Deal Confirmed\nTask: ${item.title}\nWith: ${defaultPerson}\n${terms}\nDelivery Deadline: ${deadline}\nRevision Limit: Max 2 Free Revisions included\nRef: ${dealCode}`;
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
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/40 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[5px_5px_0px_#18181B] max-w-md w-full overflow-hidden p-6 sm:p-7 relative"
          >
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#999999] hover:text-[#111111] p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!dealConfirmed ? (
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <span className="text-xs text-[#888888] block">
                {isTalent ? 'Hire Campus Student' : 'Accept Student Need'}
              </span>
              <h3 className="text-xl font-semibold text-[#111111] mt-0.5">
                Confirm Deal
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                With {defaultPerson}
              </p>
            </div>

            <div className="bg-[#FAFAFA] rounded-lg p-3.5 border border-[#EBEBEB] text-xs">
              <span className="text-[#888888] block">Deliverable</span>
              <span className="font-medium text-[#111111] block mt-0.5">{item.title}</span>
            </div>

            {isBarter ? (
              <div className="space-y-3">
                <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#EBEBEB] text-xs">
                  <span className="text-[#888888] block">Skill Barter Terms</span>
                  <span className="font-medium text-[#111111] mt-0.5 block">{item.barterOffer || paymentTerm}</span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111111] mb-1">
                    Delivery Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#EBEBEB] text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111111] mb-1">
                    Final Price (₹)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#EBEBEB] text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111111] mb-1">
                    Delivery Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#EBEBEB] text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            )}

            {/* Clear 3-Point Terms Box */}
            <div className="bg-[#FAFAFA] p-3.5 rounded-lg border border-[#EBEBEB] text-xs text-[#666666] space-y-1">
              <span className="font-medium text-[#111111] block">3-Point Terms Locked</span>
              <p>1. {isBarter ? 'Skill Barter Exchange' : `Final Price: ₹${price}`}</p>
              <p>2. Delivery Deadline: {deadline || 'As agreed'}</p>
              <p>3. Revision Limit: <strong className="text-[#111111] font-medium">Max 2 Free Revisions included</strong></p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111111] mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Drive link or brief notes"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#EBEBEB] text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#111111] hover:bg-[#2A2A2A] text-white text-xs font-medium transition-colors"
            >
              Confirm Deal ({isBarter ? 'Skill Barter' : `₹${price}`})
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#16A34A] mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                <span>Confirmed · {dealCode}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111111]">
                Deal Locked
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                Saved to My Deals.
              </p>
            </div>

            <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#EBEBEB] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#888888]">Task</span>
                <span className="text-[#111111] font-medium text-right max-w-[190px] truncate">{item.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">{isBarter ? 'Barter' : 'Final Price'}</span>
                <span className="text-[#111111] font-medium">{isBarter ? 'Skill Swap' : `₹${price}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Deadline</span>
                <span className="text-[#111111]">{deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Revision Limit</span>
                <span className="text-[#111111]">Max 2 Free Revisions included</span>
              </div>
            </div>

            <button
              onClick={handleCopyForWhatsApp}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-[#111111] hover:bg-[#2A2A2A] text-white text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span>Copy Details for WhatsApp</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs">
              <button onClick={handleClose} className="text-[#666666] hover:text-[#111111]">
                Close
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onGoToDeals();
                }}
                className="text-[#111111] font-medium underline underline-offset-4"
              >
                View in My Deals →
              </button>
            </div>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
