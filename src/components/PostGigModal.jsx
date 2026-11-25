import React, { useState } from 'react';
import { X, Plus, ShieldCheck, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import { FAIR_PRICE_RATES } from '../data/rateCardData';

export default function PostGigModal({ isOpen, onClose, onAddGig, defaultRole }) {
  if (!isOpen) return null;

  const [listingType, setListingType] = useState(
    defaultRole === 'freelancer' ? 'freelancer' : 'client'
  );
  const [category, setCategory] = useState("Poster & UI Design");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("350");
  const [turnaround, setTurnaround] = useState("24 Hours");
  const [anonymizedId, setAnonymizedId] = useState(
    listingType === 'freelancer' 
      ? 'Freelancer F' + Math.floor(10 + Math.random() * 90) + ' • CSE'
      : 'Client C' + Math.floor(10 + Math.random() * 90) + ' • Cultural Lead'
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !price) {
      setError("Please fill in title, description, and price.");
      return;
    }

    const newGig = {
      id: `gig-${Date.now()}`,
      type: listingType,
      anonymizedId: anonymizedId.trim() || 'Freelancer F9 • CSE',
      title: title.trim(),
      category,
      description: description.trim(),
      vouchedBadge: "✓ 3 Vouches",
      price: Number(price),
      turnaround: turnaround.trim() || "24 Hours",
      status: "available",
      postedDate: "Just now"
    };

    onAddGig(newGig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-lg max-w-md w-full overflow-hidden p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#78716C] hover:text-[#1C1917] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <span className="text-[11px] font-semibold text-[#D95D39] uppercase tracking-wider block mb-0.5">
            LPU Campus Exchange
          </span>
          <h3 className="font-serif font-bold text-xl text-[#1C1917]">
            Post a New Gig
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Type Toggle Pill */}
          <div className="inline-flex p-1 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-xs w-full">
            <button
              type="button"
              onClick={() => {
                setListingType('freelancer');
                setAnonymizedId('Freelancer F' + Math.floor(10 + Math.random() * 90) + ' • CSE');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                listingType === 'freelancer'
                  ? 'bg-white text-[#1C1917] shadow-sm font-semibold'
                  : 'text-[#78716C]'
              }`}
            >
              Offering a Skill
            </button>
            <button
              type="button"
              onClick={() => {
                setListingType('client');
                setAnonymizedId('Client C' + Math.floor(10 + Math.random() * 90) + ' • Club Lead');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                listingType === 'client'
                  ? 'bg-white text-[#1C1917] shadow-sm font-semibold'
                  : 'text-[#78716C]'
              }`}
            >
              Hiring / Open Gig
            </button>
          </div>

          {/* Anonymized ID Field */}
          <div>
            <label className="block text-xs font-medium text-[#1C1917] mb-1">
              Anonymized ID (No phone numbers/names):
            </label>
            <input
              type="text"
              value={anonymizedId}
              onChange={(e) => setAnonymizedId(e.target.value)}
              placeholder="e.g. Freelancer F5 • CSE"
              className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-[#1C1917] mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
            >
              {CATEGORIES.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#1C1917] mb-1">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Official YouthVibe Fest Poster Design"
              className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-medium text-[#1C1917] mb-1">
              Short Description (1 sentence):
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Print CMYK + Instagram formats with Figma file handover."
              className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
            />
          </div>

          {/* Price & Turnaround */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#1C1917] mb-1">
                Price in INR (₹):
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] font-semibold focus:outline-none focus:border-[#D95D39]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1C1917] mb-1">
                Turnaround:
              </label>
              <input
                type="text"
                value={turnaround}
                onChange={(e) => setTurnaround(e.target.value)}
                placeholder="24 Hours"
                className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] text-[#1C1917] focus:outline-none focus:border-[#D95D39]"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#D95D39] hover:bg-[#C24F2D] text-white text-xs font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
              Publish to Board
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
