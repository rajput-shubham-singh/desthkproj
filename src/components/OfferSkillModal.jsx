import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, ShieldCheck, Users, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES, getCategoryFallbackImage } from '../data/initialData';

export default function OfferSkillModal({ isOpen, onClose, onAddTalent, currentUser }) {
  const [studentId, setStudentId] = useState(() =>
    currentUser 
      ? currentUser.displayName 
      : 'Student S' + Math.floor(10 + Math.random() * 90) + ' • B.Tech CSE'
  );
  const [category, setCategory] = useState("Website Building & Full-Stack Dev");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("1499");
  const [deliveryTime, setDeliveryTime] = useState("Delivers in 2 days");
  const [campusLocation, setCampusLocation] = useState("Block 34 / Central Library");
  const [slots, setSlots] = useState(1); // 1, 2, or 3 slots (Default: 1 Slot)
  
  // Sample Work Fields (up to 2 sample items with specific project rates)
  const [sample1Title, setSample1Title] = useState("");
  const [sample1Link, setSample1Link] = useState("");
  const [sample1Price, setSample1Price] = useState("");
  const [sample1Context, setSample1Context] = useState("");
  const [sample1Image, setSample1Image] = useState("");

  const [showSample2, setShowSample2] = useState(false);
  const [sample2Title, setSample2Title] = useState("");
  const [sample2Link, setSample2Link] = useState("");
  const [sample2Price, setSample2Price] = useState("");
  const [sample2Context, setSample2Context] = useState("");
  const [sample2Image, setSample2Image] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setStudentId(currentUser.displayName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !startingPrice) {
      setError("Please fill in the title, description, and price.");
      return;
    }

    // Process sample work items with distinct charged rates
    const samples = [];
    if (sample1Title.trim() || sample1Link.trim()) {
      samples.push({
        title: sample1Title.trim() || `${category} Work Sample`,
        context: sample1Context.trim() || "Campus Student Project",
        chargedPrice: sample1Price ? Number(sample1Price) : Number(startingPrice),
        link: sample1Link.trim() || "https://drive.google.com/",
        image: sample1Image.trim() || getCategoryFallbackImage(category),
        note: `Sample work delivered on campus for ₹${sample1Price || startingPrice}.`
      });
    }
    if (showSample2 && (sample2Title.trim() || sample2Link.trim())) {
      samples.push({
        title: sample2Title.trim() || `Additional ${category} Sample`,
        context: sample2Context.trim() || "Campus Student Project",
        chargedPrice: sample2Price ? Number(sample2Price) : Number(startingPrice),
        link: sample2Link.trim() || "https://drive.google.com/",
        image: sample2Image.trim() || getCategoryFallbackImage(category),
        note: `Sample work delivered on campus for ₹${sample2Price || startingPrice}.`
      });
    }

    const newTalent = {
      id: `talent-${Date.now()}`,
      studentId: studentId.trim(),
      category,
      title: title.trim(),
      description: description.trim(),
      recommendations: 1,
      startingPrice: Number(startingPrice),
      priceUnit: "per task",
      deliveryTime: deliveryTime.trim() || "Delivers in 2 days",
      campusLocation: campusLocation.trim() || "LPU Campus",
      freeChanges: "2 free changes included",
      slots: Number(slots),
      totalSlots: Number(slots),
      isPaused: false,
      samples
    };

    onAddTalent(newTalent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#18181B] hover:text-[#E05A47] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="mb-4">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            <span>List on Campus</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-[#18181B]">
            Offer a Skill
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5 font-normal">
            Earn by helping clubs and fellow LPU students with your skills.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Campus ID */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-display font-bold text-[#18181B]">
                Campus Student ID:
              </label>
              {currentUser && (
                <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.2 rounded border border-[#18181B] flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" />
                  Reg: {currentUser.maskedRegNo}
                </span>
              )}
            </div>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. Student S8 • B.Tech CSE"
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Slot / Capacity Selector (Mandatory) */}
          <div className="bg-[#FEF3C7] p-3 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <label className="block font-display font-bold text-[#18181B] mb-1.5 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-[#92400E]" />
              <span>How many people can hire you right now?</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSlots(num)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border-[1.5px] border-[#18181B] transition-all ${
                    slots === num
                      ? 'bg-[#18181B] text-white shadow-[2px_2px_0px_#18181B]'
                      : 'bg-white text-[#18181B] hover:bg-[#F5F2EB]'
                  }`}
                >
                  {num} {num === 1 ? 'Slot' : 'Slots'}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#92400E] block mt-1">
              *When all slots are booked, your card automatically shows "Currently Booked".
            </span>
          </div>

          {/* Category */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-display font-bold text-[#18181B] focus:outline-none focus:bg-white"
            >
              {CATEGORIES.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Skill Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Event Posters & Club Social Media Creatives"
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-display font-bold text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Short Description (What do you deliver?):
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="e.g. I design clean A3 print posters and 1:1 Instagram creatives with Figma source files."
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Starting Price & Delivery Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display font-bold text-[#18181B] mb-1">
                Starting Price (₹):
              </label>
              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono font-bold text-[#18181B] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-display font-bold text-[#18181B] mb-1">
                Delivery Time:
              </label>
              <input
                type="text"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="e.g. Delivers in 2 days"
                required
                className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Campus Location */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Campus Spot / Block:
            </label>
            <input
              type="text"
              value={campusLocation}
              onChange={(e) => setCampusLocation(e.target.value)}
              placeholder="e.g. Block 34 / Central Library"
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Sample Work (Show Proof of Your Skill) Section */}
          <div className="bg-[#F5F2EB] p-3.5 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-display font-bold text-[#18181B] flex items-center text-xs">
                <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-[#E05A47]" />
                <span>Sample Work (Proof of Skill)</span>
              </label>
              <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#18181B]">
                Boosts Hires
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#52525B]">
              Add up to 2 past project links so fellow students can preview your style before hiring.
            </p>

            {/* Sample #1 */}
            <div className="bg-white p-3 rounded-lg border border-[#18181B] space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#18181B] block">
                Sample #1
              </span>
              <input
                type="text"
                value={sample1Title}
                onChange={(e) => setSample1Title(e.target.value)}
                placeholder="Sample Title (e.g. TechFest 2026 Event Poster)"
                className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#18181B]">₹</span>
                  <input
                    type="number"
                    value={sample1Price}
                    onChange={(e) => setSample1Price(e.target.value)}
                    placeholder="Rate charged (e.g. 400)"
                    className="w-full pl-6 pr-2 py-1.5 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono font-bold text-[#18181B] focus:outline-none focus:bg-white"
                  />
                </div>
                <input
                  type="text"
                  value={sample1Context}
                  onChange={(e) => setSample1Context(e.target.value)}
                  placeholder="Campus Context (e.g. Block 34 Fest)"
                  className="w-full p-1.5 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white text-[11px]"
                />
              </div>
              <input
                type="url"
                value={sample1Link}
                onChange={(e) => setSample1Link(e.target.value)}
                placeholder="Google Drive / GitHub / Behance / YouTube link"
                className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
              />
              <input
                type="url"
                value={sample1Image}
                onChange={(e) => setSample1Image(e.target.value)}
                placeholder="Preview Image URL (Optional — auto-fallback thumbnail applied)"
                className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white text-[11px]"
              />
            </div>

            {/* Sample #2 Toggle */}
            {showSample2 ? (
              <div className="bg-white p-3 rounded-lg border border-[#18181B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#18181B] block">
                    Sample #2
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSample2(false);
                      setSample2Title("");
                      setSample2Link("");
                      setSample2Price("");
                      setSample2Context("");
                      setSample2Image("");
                    }}
                    className="text-[10px] font-mono font-bold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={sample2Title}
                  onChange={(e) => setSample2Title(e.target.value)}
                  placeholder="Sample Title (e.g. Club Website Demo)"
                  className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white font-medium"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#18181B]">₹</span>
                    <input
                      type="number"
                      value={sample2Price}
                      onChange={(e) => setSample2Price(e.target.value)}
                      placeholder="Rate charged (e.g. 500)"
                      className="w-full pl-6 pr-2 py-1.5 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono font-bold text-[#18181B] focus:outline-none focus:bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={sample2Context}
                    onChange={(e) => setSample2Context(e.target.value)}
                    placeholder="Campus Context (e.g. Cultural Club)"
                    className="w-full p-1.5 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] text-[#18181B] focus:outline-none focus:bg-white text-[11px]"
                  />
                </div>
                <input
                  type="url"
                  value={sample2Link}
                  onChange={(e) => setSample2Link(e.target.value)}
                  placeholder="Drive / GitHub / Behance / YouTube link"
                  className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
                />
                <input
                  type="url"
                  value={sample2Image}
                  onChange={(e) => setSample2Image(e.target.value)}
                  placeholder="Preview Image URL (Optional)"
                  className="w-full p-2 text-xs rounded-lg bg-[#F5F2EB] border border-[#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white text-[11px]"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSample2(true)}
                className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-[#FEF3C7] text-[#18181B] text-[11px] font-mono font-bold border border-[#18181B] shadow-[1px_1px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center block"
              >
                + Add Second Work Sample (Optional)
              </button>
            )}
          </div>

          {error && <p className="text-xs font-mono text-red-600">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
              Publish with {slots} {slots === 1 ? 'Slot' : 'Slots'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
