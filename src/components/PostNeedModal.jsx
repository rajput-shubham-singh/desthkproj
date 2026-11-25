import React, { useState, useEffect } from 'react';
import { X, Plus, ShieldCheck, Users } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export default function PostNeedModal({ isOpen, onClose, onAddNeed, currentUser }) {
  const [postedBy, setPostedBy] = useState(() => 
    currentUser 
      ? currentUser.displayName 
      : 'Club Lead C' + Math.floor(10 + Math.random() * 90) + ' • Campus Society'
  );
  const [category, setCategory] = useState("Website Building & Full-Stack Dev");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("Needed in 3 days");
  const [budget, setBudget] = useState("1800");
  const [campusLocation, setCampusLocation] = useState("Block 34 Hub");
  const [neededCount, setNeededCount] = useState(1); // 1 Person or 2 People (Default: 1 Person)
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setPostedBy(currentUser.displayName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !budget) {
      setError("Please fill in the title, description, and budget.");
      return;
    }

    const newNeed = {
      id: `need-${Date.now()}`,
      postedBy: postedBy.trim(),
      category,
      title: title.trim(),
      description: description.trim(),
      deadline: deadline.trim() || "Needed soon",
      budget: Number(budget),
      campusLocation: campusLocation.trim() || "LPU Campus",
      neededCount: Number(neededCount),
      filledCount: 0
    };

    onAddNeed(newNeed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border-[1.5px] border-[#18181B] shadow-[6px_6px_0px_#18181B] max-w-md w-full overflow-hidden p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#18181B] hover:text-[#E05A47] p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="mb-4">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border-[1.2px] border-[#18181B] shadow-[1.5px_1.5px_0px_#18181B] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
            <Plus className="w-3 h-3 stroke-[3]" />
            <span>Open Requirement</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-[#18181B]">
            Post a Need
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5 font-normal">
            Describe what help your club or project needs from skilled students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Posted By Campus ID */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-display font-bold text-[#18181B]">
                Your Campus ID:
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
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              placeholder="e.g. Club Lead C3 • Cultural Club"
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* How Many Students Do You Need? */}
          <div className="bg-[#FEF3C7] p-3 rounded-xl border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B]">
            <label className="block font-display font-bold text-[#18181B] mb-1.5 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-[#92400E]" />
              <span>How many students do you need?</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[1, 2].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setNeededCount(num)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold border-[1.5px] border-[#18181B] transition-all ${
                    neededCount === num
                      ? 'bg-[#18181B] text-white shadow-[2px_2px_0px_#18181B]'
                      : 'bg-white text-[#18181B] hover:bg-[#F5F2EB]'
                  }`}
                >
                  {num} {num === 1 ? 'Person' : 'People'}
                </button>
              ))}
            </div>
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
              Requirement Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Need urgent 60s teaser reel for Spectra auditions"
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-display font-bold text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Detailed Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Explain raw files provided, exact output required, and expectations..."
              required
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Budget & Deadline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-display font-bold text-[#18181B] mb-1">
                Budget in INR (₹):
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono font-bold text-[#18181B] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-display font-bold text-[#18181B] mb-1">
                Deadline:
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Needed by Friday 5 PM"
                required
                className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Campus Location */}
          <div>
            <label className="block font-display font-bold text-[#18181B] mb-1">
              Campus Location:
            </label>
            <input
              type="text"
              value={campusLocation}
              onChange={(e) => setCampusLocation(e.target.value)}
              placeholder="e.g. UniMall Student Center"
              className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] font-mono text-[#18181B] focus:outline-none focus:bg-white"
            />
          </div>

          {error && <p className="text-xs font-mono text-red-600">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#E05A47] hover:bg-[#D04936] text-white text-xs font-display font-bold border-[1.5px] border-[#18181B] shadow-[2.5px_2.5px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
              Publish Requirement ({neededCount} {neededCount === 1 ? 'Person' : 'People'})
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
