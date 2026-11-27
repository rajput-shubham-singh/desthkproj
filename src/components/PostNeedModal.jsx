import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../data/initialData';

export default function PostNeedModal({ isOpen, onClose, onAddNeed, currentUser, onOpenRateGuide }) {
  const [category, setCategory] = useState("Website Building & Full-Stack Dev");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("In 3 days");
  const [isUrgent, setIsUrgent] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [budget, setBudget] = useState("1800");
  const [barterOffer, setBarterOffer] = useState("");
  const [neededCount, setNeededCount] = useState(1);
  const [error, setError] = useState("");

  const postedBy = currentUser
    ? currentUser.displayName
    : 'Student • LPU';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please fill in title and description.");
      return;
    }
    if (paymentType === 'cash' && (!budget || Number(budget) <= 0)) {
      setError("Please enter a valid cash budget in ₹.");
      return;
    }
    if (paymentType === 'barter' && !barterOffer.trim()) {
      setError("Please describe the skill you offer in exchange.");
      return;
    }

    const newNeed = {
      id: `need-${Date.now()}`,
      postedBy,
      category,
      title: title.trim(),
      description: description.trim(),
      deadline: isUrgent ? `Urgent · ${deadline.trim() || "24 Hours"}` : (deadline.trim() || "Soon"),
      isUrgent,
      paymentType,
      budget: paymentType === 'cash' ? Number(budget) : 0,
      barterOffer: paymentType === 'barter' ? barterOffer.trim() : "",
      campusLocation: currentUser?.hostelBlock ? `Hostel ${currentUser.hostelBlock}` : "LPU",
      neededCount: Number(neededCount),
      filledCount: 0
    };

    onAddNeed(newNeed);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-[#18181B]/40 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[5px_5px_0px_#18181B] w-[95vw] sm:max-w-xl max-h-[88vh] overflow-y-auto p-4 sm:p-6 relative"
          >
        
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E4E4E7]">
          <h3 className="text-lg sm:text-xl font-bold text-[#18181B] tracking-tight">
            Post a Need
          </h3>

          <div className="flex items-center space-x-2">
            {currentUser && (
              <span className="text-[11px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#18181B]">
                Reg: {currentUser.regNo}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-[#52525B] hover:text-[#18181B] p-1 rounded-lg hover:bg-[#F6F4EF] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Row 1: Category + Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
              >
                {CATEGORIES.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Friday 5 PM"
                required
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
              />
            </div>
          </div>

          {/* Row 2: Title */}
          <div>
            <label className="block font-semibold text-[#18181B] mb-1">Requirement Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Club website with Google Sheets RSVP"
              required
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="block font-semibold text-[#18181B] mb-1">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Deliverables and raw files provided..."
              required
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>

          {/* Row 4: Payment Type + Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-[#18181B]">Payment Type</label>
                {onOpenRateGuide && (
                  <button
                    type="button"
                    onClick={onOpenRateGuide}
                    className="text-[11px] font-medium text-[#D95D39] hover:underline"
                  >
                    Rate Guide →
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType('cash')}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium ${
                    paymentType === 'cash'
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#52525B] border-[#D4D4D8]'
                  }`}
                >
                  ₹ Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('barter')}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium ${
                    paymentType === 'barter'
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#52525B] border-[#D4D4D8]'
                  }`}
                >
                  Skill Barter
                </button>
              </div>
            </div>

            <div>
              {paymentType === 'cash' ? (
                <>
                  <label className="block font-semibold text-[#18181B] mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] font-mono font-bold text-[#18181B] focus:outline-none focus:border-[#18181B]"
                  />
                </>
              ) : (
                <>
                  <label className="block font-semibold text-[#18181B] mb-1">Skill Swapped</label>
                  <input
                    type="text"
                    value={barterOffer}
                    onChange={(e) => setBarterOffer(e.target.value)}
                    placeholder="e.g. Portfolio site for 45s reel"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
                  />
                </>
              )}
            </div>
          </div>

          {/* Row 5: Students Needed + Urgent 24-Hr */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Students Needed</label>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNeededCount(num)}
                    className={`py-2 px-2 rounded-lg border text-xs font-medium ${
                      neededCount === num
                        ? 'bg-[#18181B] text-white border-[#18181B]'
                        : 'bg-white text-[#52525B] border-[#D4D4D8]'
                    }`}
                  >
                    {num} {num === 1 ? 'Person' : 'People'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const next = !isUrgent;
                setIsUrgent(next);
                if (next && deadline === "In 3 days") setDeadline("24 Hours");
              }}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-between ${
                isUrgent
                  ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E] font-bold'
                  : 'bg-white border-[#D4D4D8] text-[#52525B]'
              }`}
            >
              <span>Urgent (24-Hr)</span>
              <span>{isUrgent ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {error && <p className="text-xs font-mono text-red-600">{error}</p>}

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-sm font-bold border-[1.5px] border-[#18181B] transition-colors"
            >
              Post Requirement →
            </button>
          </div>

        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
