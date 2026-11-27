import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, getCategoryFallbackImage } from '../data/initialData';

export default function OfferSkillModal({ isOpen, onClose, onAddTalent, currentUser, onOpenRateGuide }) {
  const [category, setCategory] = useState("Website Building & Full-Stack Dev");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("1499");
  const [deliveryTime, setDeliveryTime] = useState("2 days");
  const [gearTag, setGearTag] = useState("Laptop + Figma / VS Code");
  const [hostelTag, setHostelTag] = useState("BH-4");
  const [juniorAssistantOpen, setJuniorAssistantOpen] = useState(false);
  const [slots, setSlots] = useState(1);

  const [sample1Title, setSample1Title] = useState("");
  const [sample1Link, setSample1Link] = useState("");
  const [sample1Price, setSample1Price] = useState("");
  const [error, setError] = useState("");

  const studentId = currentUser
    ? currentUser.displayName
    : 'Student • LPU';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !startingPrice) {
      setError("Please fill in title, description, and price.");
      return;
    }

    const samples = [];
    if (sample1Title.trim() || sample1Link.trim()) {
      samples.push({
        title: sample1Title.trim() || `${category} Sample`,
        context: "Campus Project",
        chargedPrice: sample1Price ? Number(sample1Price) : Number(startingPrice),
        link: sample1Link.trim() || "https://drive.google.com/",
        image: getCategoryFallbackImage(category),
        note: ""
      });
    }

    const newTalent = {
      id: `talent-${Date.now()}`,
      studentId,
      category,
      title: title.trim(),
      description: description.trim(),
      recommendations: 1,
      startingPrice: Number(startingPrice),
      priceUnit: "per task",
      deliveryTime: deliveryTime.trim() || "2 days",
      campusLocation: hostelTag.trim() || "LPU",
      gearTag: gearTag.trim(),
      hostelTag: hostelTag.trim(),
      juniorAssistantOpen,
      freeChanges: "Max 2 Free Revisions",
      slots: Number(slots),
      totalSlots: Number(slots),
      isPaused: false,
      samples
    };

    onAddTalent(newTalent);
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
            Offer a Skill
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
          
          {/* Row 1: Category + Starting Price */}
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
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-[#18181B]">Starting Price (₹)</label>
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
              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] font-mono font-bold text-[#18181B] focus:outline-none focus:border-[#18181B]"
              />
            </div>
          </div>

          {/* Row 2: Skill Title */}
          <div>
            <label className="block font-semibold text-[#18181B] mb-1">Skill Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Club Websites & React Portals"
              required
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>

          {/* Row 3: Short Description */}
          <div>
            <label className="block font-semibold text-[#18181B] mb-1">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Tools used and what is included..."
              required
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>

          {/* Row 4: Delivery + Hostel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Delivery Time</label>
              <input
                type="text"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="e.g. 2 days"
                required
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Hostel / Block</label>
              <input
                type="text"
                value={hostelTag}
                onChange={(e) => setHostelTag(e.target.value)}
                placeholder="e.g. BH-4"
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
              />
            </div>
          </div>

          {/* Row 5: Gear + Slots & Junior Shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-end">
            <div>
              <label className="block font-semibold text-[#18181B] mb-1">Gear / Setup</label>
              <select
                value={gearTag}
                onChange={(e) => setGearTag(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
              >
                <option value="Laptop + Figma / VS Code">Laptop + Figma / VS Code</option>
                <option value="Flutter + Android Studio">Flutter + Android Studio</option>
                <option value="DSLR + Gimbal">DSLR + Gimbal</option>
                <option value="Mobile Creator">Mobile Creator</option>
                <option value="Laptop + Canva / PPT">Laptop + Canva / PPT</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-[#18181B] mb-1">Slots</label>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSlots(num)}
                      className={`py-2 rounded-lg border text-xs font-medium ${
                        slots === num
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#52525B] border-[#D4D4D8]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => setJuniorAssistantOpen(!juniorAssistantOpen)}
                  className={`py-2 px-2 rounded-lg border text-[11px] font-medium ${
                    juniorAssistantOpen
                      ? 'bg-[#DCFCE7] border-[#15803D] text-[#15803D] font-bold'
                      : 'bg-white border-[#D4D4D8] text-[#52525B]'
                  }`}
                >
                  Shadow: {juniorAssistantOpen ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Sample Work Row */}
          <div className="pt-2 border-t border-[#E4E4E7] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              value={sample1Title}
              onChange={(e) => setSample1Title(e.target.value)}
              placeholder="Sample title (optional)"
              className="px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
            <input
              type="url"
              value={sample1Link}
              onChange={(e) => setSample1Link(e.target.value)}
              placeholder="Sample link"
              className="px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
            <input
              type="number"
              value={sample1Price}
              onChange={(e) => setSample1Price(e.target.value)}
              placeholder="Price (₹)"
              className="px-3 py-2 rounded-lg bg-white border border-[#D4D4D8] font-mono text-[#18181B] focus:outline-none focus:border-[#18181B]"
            />
          </div>

          {error && <p className="text-xs font-mono text-red-600">{error}</p>}

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#D95D39] hover:bg-[#C24E2C] text-white text-sm font-bold border-[1.5px] border-[#18181B] transition-colors"
            >
              Publish Skill →
            </button>
          </div>

        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
